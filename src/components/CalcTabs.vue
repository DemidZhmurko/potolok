<script setup lang="ts">
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  Label,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const length = ref<number | null>(null)
const width = ref<number | null>(null)

const hasCutout = ref(false)
const cutoutLength = ref<number | null>(null)
const cutoutWidth = ref<number | null>(null)

const hasProjection = ref(false)
const projectionLength = ref<number | null>(null)
const projectionWidth = ref<number | null>(null)

const lights = ref(0)
const isOpen = ref(false)
const isMobile = ref(false)

const basePricePerM2 = 2500
const lightPointPrice = 1500

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function clamp(value: number | null, min: number, max: number) {
  if (value === null)
    return null

  return Math.min(Math.max(value, min), max)
}

watch(length, value => (length.value = clamp(value, 1, 15)))
watch(width, value => (width.value = clamp(value, 1, 15)))
watch(cutoutLength, value => (cutoutLength.value = clamp(value, 0, 10)))
watch(cutoutWidth, value => (cutoutWidth.value = clamp(value, 0, 10)))
watch(projectionLength, value => (projectionLength.value = clamp(value, 0, 10)))
watch(projectionWidth, value => (projectionWidth.value = clamp(value, 0, 10)))
watch(lights, value => (lights.value = clamp(value, 0, 60) || 0))

const roomArea = computed(() => {
  if (!length.value || !width.value)
    return 0

  return length.value * width.value
})

const cutoutArea = computed(() => {
  if (!hasCutout.value || !cutoutLength.value || !cutoutWidth.value)
    return 0

  return cutoutLength.value * cutoutWidth.value
})

const projectionArea = computed(() => {
  if (!hasProjection.value || !projectionLength.value || !projectionWidth.value)
    return 0

  return projectionLength.value * projectionWidth.value
})

const totalArea = computed(() => {
  return Math.max(roomArea.value - cutoutArea.value + projectionArea.value, 0)
})

const ceilingPrice = computed(() => totalArea.value * basePricePerM2)
const lightingPrice = computed(() => lights.value * lightPointPrice)
const totalPrice = computed(() => ceilingPrice.value + lightingPrice.value)
const isLargeRoom = computed(() => totalArea.value > 15)

function formatNumber(value: number) {
  return value.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
  })
}

function formatPrice(value: number) {
  return Math.round(value).toLocaleString('ru-RU')
}

const scale = computed(() => {
  const maxSide = Math.max(length.value || 0, width.value || 0)

  if (isMobile.value)
    return maxSide <= 5 ? 14 : 10
  if (maxSide <= 5)
    return 18
  if (maxSide <= 10)
    return 14
  return 11
})

const visualW = computed(() => (width.value || 8) * scale.value)
const visualH = computed(() => (length.value || 8) * scale.value)
const cutoutW = computed(() => (cutoutWidth.value || 0) * scale.value)
const cutoutH = computed(() => (cutoutLength.value || 0) * scale.value)
const projectionW = computed(() => (projectionWidth.value || 0) * scale.value)
const projectionH = computed(() => (projectionLength.value || 0) * scale.value)
</script>

<template>
  <section id="calculator" class="px-4 py-10 bg-gray-50 sm:py-12">
    <div class="mx-auto max-w-6xl">
      <CollapsibleRoot v-model:open="isOpen" class="border border-gray-200 rounded-2xl bg-white shadow-gray-950/5 shadow-lg overflow-hidden">
        <div class="p-5 text-center sm:p-7">
          <p class="text-xs text-blue-600 tracking-wide font-semibold uppercase">
            Быстрый расчёт
          </p>
          <h2 class="text-2xl text-gray-950 font-bold mt-1 sm:text-3xl">
            Калькулятор стоимости натяжного потолка
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed mx-auto mt-2 max-w-2xl">
            Предварительно рассчитайте квадратуру комнаты и узнайте ориентировочную стоимость натяжного потолка под ключ — с материалами и работой по минимальной базовой цене.
          </p>

          <CollapsibleTrigger
            class="text-white font-semibold mt-5 px-5 py-3 rounded-xl bg-blue-600 inline-flex gap-2 min-h-12 shadow-blue-900/15 shadow-md transition items-center justify-center hover:bg-blue-700"
          >
            {{ isOpen ? 'Скрыть калькулятор' : 'Открыть калькулятор' }}
            <span class="text-lg transition" :class="isOpen ? 'rotate-180' : ''">⌄</span>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent
          class="data-[state=closed]:animate-out data-[state=open]:animate-in overflow-hidden"
        >
          <div class="p-3 border-t border-gray-200 bg-gray-50/70 sm:p-5">
            <div class="gap-4 grid lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.86fr)]">
              <div class="p-4 rounded-2xl bg-white shadow-sm space-y-4 sm:p-5">
                <div class="gap-4 grid md:grid-cols-[minmax(0,0.95fr)_minmax(220px,0.8fr)]">
                  <div>
                    <div class="mb-3 flex gap-3 items-end justify-between">
                      <div>
                        <h3 class="text-base text-gray-950 font-semibold">
                          1. Размеры помещения
                        </h3>
                        <p class="text-xs text-gray-500 mt-0.5">
                          Длина и ширина комнаты в метрах.
                        </p>
                      </div>
                      <span class="text-xs text-gray-500 px-2.5 py-1 rounded-full bg-gray-100">
                        {{ formatNumber(roomArea) }} м²
                      </span>
                    </div>

                    <div class="gap-3 grid sm:grid-cols-2">
                      <div>
                        <Label class="text-sm text-slate-700 font-medium mb-1.5 block">Длина комнаты</Label>
                        <NumberFieldRoot v-model="length" :min="1" :max="15" :step="0.1" class="p-1 border border-slate-200 rounded-xl bg-white flex gap-1.5 shadow-sm items-center">
                          <NumberFieldDecrement class="text-slate-700 rounded-lg bg-slate-50 inline-flex h-10 w-10 transition items-center justify-center hover:bg-slate-100">
                            −
                          </NumberFieldDecrement>
                          <NumberFieldInput placeholder="5.2 м" class="text-base text-slate-900 font-semibold px-2 py-2.5 outline-none border border-transparent rounded-lg bg-white flex-1 min-w-0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                          <NumberFieldIncrement class="text-slate-700 rounded-lg bg-slate-50 inline-flex h-10 w-10 transition items-center justify-center hover:bg-slate-100">
                            +
                          </NumberFieldIncrement>
                        </NumberFieldRoot>
                      </div>

                      <div>
                        <Label class="text-sm text-slate-700 font-medium mb-1.5 block">Ширина комнаты</Label>
                        <NumberFieldRoot v-model="width" :min="1" :max="15" :step="0.1" class="p-1 border border-slate-200 rounded-xl bg-white flex gap-1.5 shadow-sm items-center">
                          <NumberFieldDecrement class="text-slate-700 rounded-lg bg-slate-50 inline-flex h-10 w-10 transition items-center justify-center hover:bg-slate-100">
                            −
                          </NumberFieldDecrement>
                          <NumberFieldInput placeholder="3.8 м" class="text-base text-slate-900 font-semibold px-2 py-2.5 outline-none border border-transparent rounded-lg bg-white flex-1 min-w-0 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200" />
                          <NumberFieldIncrement class="text-slate-700 rounded-lg bg-slate-50 inline-flex h-10 w-10 transition items-center justify-center hover:bg-slate-100">
                            +
                          </NumberFieldIncrement>
                        </NumberFieldRoot>
                      </div>
                    </div>
                  </div>

                  <div class="p-3 border border-gray-200 rounded-xl bg-gray-50">
                    <div class="mb-2 flex gap-3 items-center justify-between">
                      <h3 class="text-sm text-gray-950 font-semibold">
                        Модель комнаты
                      </h3>
                      <span class="text-xs text-gray-500">{{ formatNumber(totalArea) }} м²</span>
                    </div>
                    <div class="flex h-[132px] items-center justify-center overflow-hidden sm:h-[150px]">
                      <div
                        class="transition-all duration-300 relative"
                        :style="{
                          width: `${visualW + (hasProjection ? projectionW : 0)}px`,
                          height: `${visualH + (hasProjection ? projectionH : 0)}px`,
                          transform: isMobile
                            ? 'perspective(1000px) scale(0.78) rotateX(60deg) rotateZ(8deg)'
                            : 'perspective(1000px) rotateX(60deg) rotateZ(8deg)',
                          transformOrigin: 'center',
                        }"
                      >
                        <div class="border border-blue-400 rounded-sm bg-blue-100 shadow-inner absolute" :style="{ width: `${visualW}px`, height: `${visualH}px`, left: 0, top: 0 }" />

                        <div
                          v-if="hasProjection"
                          class="border border-blue-500 rounded-sm bg-blue-200 absolute"
                          :style="{
                            width: `${projectionW}px`,
                            height: `${projectionH}px`,
                            left: `${visualW}px`,
                            top: `${visualH - projectionH}px`,
                          }"
                        />

                        <div
                          v-if="hasCutout"
                          class="border border-blue-400 rounded-sm bg-white absolute"
                          :style="{
                            width: `${cutoutW}px`,
                            height: `${cutoutH}px`,
                            right: 0,
                            bottom: 0,
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pt-4 border-t border-gray-100">
                  <div class="mb-3">
                    <h3 class="text-base text-gray-950 font-semibold">
                      2. Дополнительные параметры
                    </h3>
                    <p class="text-xs text-gray-500 mt-0.5">
                      Вырезы, выступы и точки освещения.
                    </p>
                  </div>

                  <div class="gap-3 grid sm:grid-cols-2 xl:grid-cols-3">
                    <div
                      class="p-3 border rounded-xl bg-gray-50 transition"
                      :class="hasCutout ? 'border-blue-300 bg-blue-50/70' : 'border-gray-200'"
                    >
                      <button
                        type="button"
                        class="text-left flex gap-3 w-full items-center justify-between"
                        :aria-pressed="hasCutout"
                        @click="hasCutout = !hasCutout"
                      >
                        <span>
                          <span class="text-sm text-gray-950 font-semibold block">Есть вырез</span>
                          <span class="text-xs text-gray-500">Вычитается из площади</span>
                        </span>
                        <span
                          class="text-xs font-semibold px-2.5 py-1 rounded-full"
                          :class="hasCutout ? 'text-blue-700 bg-white' : 'text-gray-500 bg-white'"
                        >
                          {{ hasCutout ? 'Добавлено' : 'Нет' }}
                        </span>
                      </button>

                      <div v-if="hasCutout" class="mt-3 gap-2 grid grid-cols-2">
                        <div>
                          <Label class="text-xs text-slate-600 mb-1 block">Длина</Label>
                          <NumberFieldRoot v-model="cutoutLength" :min="0" :max="10" :step="0.1" class="p-1 border border-slate-200 rounded-lg bg-white flex gap-1 items-center">
                            <NumberFieldDecrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              −
                            </NumberFieldDecrement>
                            <NumberFieldInput placeholder="0" class="text-sm text-slate-900 font-semibold py-2 text-center outline-none bg-white flex-1 min-w-0" />
                            <NumberFieldIncrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              +
                            </NumberFieldIncrement>
                          </NumberFieldRoot>
                        </div>
                        <div>
                          <Label class="text-xs text-slate-600 mb-1 block">Ширина</Label>
                          <NumberFieldRoot v-model="cutoutWidth" :min="0" :max="10" :step="0.1" class="p-1 border border-slate-200 rounded-lg bg-white flex gap-1 items-center">
                            <NumberFieldDecrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              −
                            </NumberFieldDecrement>
                            <NumberFieldInput placeholder="0" class="text-sm text-slate-900 font-semibold py-2 text-center outline-none bg-white flex-1 min-w-0" />
                            <NumberFieldIncrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              +
                            </NumberFieldIncrement>
                          </NumberFieldRoot>
                        </div>
                      </div>
                    </div>

                    <div
                      class="p-3 border rounded-xl bg-gray-50 transition"
                      :class="hasProjection ? 'border-blue-300 bg-blue-50/70' : 'border-gray-200'"
                    >
                      <button
                        type="button"
                        class="text-left flex gap-3 w-full items-center justify-between"
                        :aria-pressed="hasProjection"
                        @click="hasProjection = !hasProjection"
                      >
                        <span>
                          <span class="text-sm text-gray-950 font-semibold block">Есть выступ</span>
                          <span class="text-xs text-gray-500">Добавляется к площади</span>
                        </span>
                        <span
                          class="text-xs font-semibold px-2.5 py-1 rounded-full"
                          :class="hasProjection ? 'text-blue-700 bg-white' : 'text-gray-500 bg-white'"
                        >
                          {{ hasProjection ? 'Добавлено' : 'Нет' }}
                        </span>
                      </button>

                      <div v-if="hasProjection" class="mt-3 gap-2 grid grid-cols-2">
                        <div>
                          <Label class="text-xs text-slate-600 mb-1 block">Длина</Label>
                          <NumberFieldRoot v-model="projectionLength" :min="0" :max="10" :step="0.1" class="p-1 border border-slate-200 rounded-lg bg-white flex gap-1 items-center">
                            <NumberFieldDecrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              −
                            </NumberFieldDecrement>
                            <NumberFieldInput placeholder="0" class="text-sm text-slate-900 font-semibold py-2 text-center outline-none bg-white flex-1 min-w-0" />
                            <NumberFieldIncrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              +
                            </NumberFieldIncrement>
                          </NumberFieldRoot>
                        </div>
                        <div>
                          <Label class="text-xs text-slate-600 mb-1 block">Ширина</Label>
                          <NumberFieldRoot v-model="projectionWidth" :min="0" :max="10" :step="0.1" class="p-1 border border-slate-200 rounded-lg bg-white flex gap-1 items-center">
                            <NumberFieldDecrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              −
                            </NumberFieldDecrement>
                            <NumberFieldInput placeholder="0" class="text-sm text-slate-900 font-semibold py-2 text-center outline-none bg-white flex-1 min-w-0" />
                            <NumberFieldIncrement class="text-slate-700 rounded-md bg-slate-50 h-9 w-8">
                              +
                            </NumberFieldIncrement>
                          </NumberFieldRoot>
                        </div>
                      </div>
                    </div>

                    <div class="p-3 border border-gray-200 rounded-xl bg-gray-50 sm:col-span-2 xl:col-span-1">
                      <div class="flex gap-3 items-start justify-between">
                        <div>
                          <Label class="text-sm text-gray-950 font-semibold block">Точки освещения</Label>
                          <p class="text-xs text-gray-500 mt-0.5">
                            {{ lightPointPrice.toLocaleString('ru-RU') }} ₸ за точку
                          </p>
                        </div>
                        <span class="text-xs text-gray-500 px-2 py-1 rounded-full bg-white">
                          {{ lights }} шт.
                        </span>
                      </div>

                      <NumberFieldRoot v-model="lights" :min="0" :max="60" :step="1" class="mt-3 p-1 border border-slate-200 rounded-lg bg-white flex gap-1 items-center">
                        <NumberFieldDecrement class="text-slate-700 rounded-md bg-slate-50 h-10 w-11">
                          −
                        </NumberFieldDecrement>
                        <NumberFieldInput placeholder="0" class="text-base text-slate-900 font-semibold py-2.5 text-center outline-none bg-white flex-1 min-w-0" />
                        <NumberFieldIncrement class="text-slate-700 rounded-md bg-slate-50 h-10 w-11">
                          +
                        </NumberFieldIncrement>
                      </NumberFieldRoot>
                    </div>
                  </div>
                </div>
              </div>

              <aside class="p-4 rounded-2xl bg-white shadow-sm space-y-3 sm:p-5">
                <div class="text-white p-4 rounded-2xl bg-gray-950 shadow-gray-950/15 shadow-lg">
                  <p class="text-xs text-blue-200 font-semibold uppercase">
                    3. Результат расчёта
                  </p>
                  <div class="text-3xl font-bold mt-1">
                    ~{{ formatPrice(totalPrice) }} ₸
                  </div>
                  <p class="text-xs text-white/65 mt-1">
                    Итоговая ориентировочная стоимость
                  </p>
                </div>

                <div v-if="isLargeRoom" class="text-sm text-amber-900 p-3 border border-amber-200 rounded-xl bg-amber-50">
                  Для помещений больше 15 м² рекомендуем оставить заявку для точного расчёта стоимости.
                </div>

                <div class="p-4 border border-gray-200 rounded-2xl bg-gray-50/80 space-y-2.5">
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Площадь комнаты</span>
                    <span class="text-gray-950 font-semibold">{{ formatNumber(roomArea) }} м²</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Площадь вырезов</span>
                    <span class="text-gray-950 font-semibold">−{{ formatNumber(cutoutArea) }} м²</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Площадь выступов</span>
                    <span class="text-gray-950 font-semibold">+{{ formatNumber(projectionArea) }} м²</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Итоговая площадь</span>
                    <span class="text-gray-950 font-semibold">{{ formatNumber(totalArea) }} м²</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Точек освещения</span>
                    <span class="text-gray-950 font-semibold">{{ lights }}</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Стоимость освещения</span>
                    <span class="text-gray-950 font-semibold">{{ formatPrice(lightingPrice) }} ₸</span>
                  </div>
                  <div class="text-sm text-gray-600 flex gap-3 justify-between">
                    <span>Стоимость потолка</span>
                    <span class="text-gray-950 font-semibold">{{ formatPrice(ceilingPrice) }} ₸</span>
                  </div>
                </div>

                <div class="p-3 border border-blue-100 rounded-xl bg-blue-50/80">
                  <p class="text-sm text-blue-950 font-semibold">
                    Все цены указаны с работой.
                  </p>
                  <p class="text-xs text-blue-900/75 leading-relaxed mt-1.5">
                    Расчёт является предварительным и показывает ориентировочную минимальную стоимость потолка под ключ с материалами и монтажом.
                  </p>
                  <p class="text-xs text-blue-900/75 leading-relaxed mt-1">
                    Стоимость освещения рассчитана по минимальной цене {{ lightPointPrice.toLocaleString('ru-RU') }} ₸ за точку.
                  </p>
                  <p class="text-xs text-blue-900/75 leading-relaxed mt-1">
                    Итоговая стоимость может измениться в зависимости от сложности помещения, выбранного полотна, количества вырезов, выступов, освещения и дополнительных работ.
                  </p>
                </div>

                <ModalCalc
                  :base-price-per-m2="basePricePerM2"
                  :ceiling-price="ceilingPrice"
                  :cutout-area="cutoutArea"
                  :length="length || 0"
                  :lighting-price="lightingPrice"
                  :lights="lights"
                  :projection-area="projectionArea"
                  :room-area="roomArea"
                  :total-area="totalArea"
                  :total-price="totalPrice"
                  :width="width || 0"
                  btn-name="Оставить заявку"
                />
              </aside>
            </div>
          </div>
        </CollapsibleContent>
      </CollapsibleRoot>
    </div>
  </section>
</template>
