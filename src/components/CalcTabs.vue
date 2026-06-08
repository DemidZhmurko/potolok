<script setup lang="ts">
import {
  Label,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * INPUTS
 */
const length = ref<number | null>(null)
const width = ref<number | null>(null)

const hasExtra = ref(false)
const extraLength = ref<number | null>(null)
const extraWidth = ref<number | null>(null)
const extraMode = ref<'add' | 'cut'>('add')

/**
 * LIGHTS
 */
const lights = ref<number | null>(0)

/**
 * MATERIAL
 */
const material = ref<'basic' | 'premium'>('basic')

/**
 * MOBILE
 */
const isMobile = ref(false)

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

/**
 * LIMIT 15m
 */
function clamp(val: number | null, min: number, max: number) {
  if (val === null)
    return null
  return Math.min(Math.max(val, min), max)
}

watch(length, (v: number | null) => (length.value = clamp(v, 1, 15)))
watch(width, (v: number | null) => (width.value = clamp(v, 1, 15)))
watch(extraLength, (v: number | null) => (extraLength.value = clamp(v, 0, 10)))
watch(extraWidth, (v: number | null) => (extraWidth.value = clamp(v, 0, 10)))

/**
 * AREA
 */
const mainArea = computed(() => {
  if (!length.value || !width.value)
    return 0
  return length.value * width.value
})

const extraArea = computed(() => {
  if (!hasExtra.value)
    return 0
  if (!extraLength.value || !extraWidth.value)
    return 0
  return extraLength.value * extraWidth.value
})

const totalArea = computed(() => {
  return extraMode.value === 'add'
    ? mainArea.value + extraArea.value
    : mainArea.value - extraArea.value
})

/**
 * MATERIAL
 */
const materialMultiplier = computed(() => {
  if (material.value === 'basic')
    return 1
  if (material.value === 'premium')
    return 1.4
  return 1
})

/**
 * LIGHTS
 */
const lightsPrice = computed(() => {
  return (lights.value || 0) * 2500
})

/**
 * BASE PRICE
 */
const baseRate = 2500

/**
 * TOTAL PRICE
 */
const totalPrice = computed(() => {
  return (
    totalArea.value
    * baseRate
    * materialMultiplier.value
    + lightsPrice.value
  )
})

/**
 * SCALE
 */
const scale = computed(() => {
  const maxSide = Math.max(length.value || 0, width.value || 0)

  if (maxSide <= 5)
    return 30
  if (maxSide <= 10)
    return 22
  return 16
})

const visualW = computed(() => (width.value || 10) * scale.value)
const visualH = computed(() => (length.value || 10) * scale.value)

const extraW = computed(() => (extraWidth.value || 0) * scale.value)
const extraH = computed(() => (extraLength.value || 0) * scale.value)
</script>

<template>
  <div class="px-4 py-8 bg-gray-50 min-h-screen">
    <div class="mx-auto p-4 border border-gray-200 rounded-2xl bg-white max-w-6xl shadow-sm md:p-10">
      <!-- HEADER -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold md:text-4xl">
          Калькулятор натяжных потолков
        </h1>

        <p class="text-gray-500 mt-2">
          Предварительный расчёт площади и стоимости
        </p>
      </div>

      <div class="flex flex-col gap-10 md:flex-row">
        <!-- LEFT -->
        <div class="mx-auto p-4 border border-gray-200 rounded-xl bg-white max-w-md w-full shadow-sm space-y-6 md:mx-0">
          <div>
            <Label class="text-sm text-slate-600 font-medium mb-2 block">Длина комнаты</Label>
            <NumberFieldRoot
              v-model="length"
              :min="1"
              :max="15"
              :step="0.1"
              class="p-1 border border-slate-200 rounded-2xl bg-slate-50 flex gap-2 shadow-sm items-center"
            >
              <NumberFieldDecrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                −
              </NumberFieldDecrement>
              <NumberFieldInput
                placeholder="1–15 м"
                class="text-lg text-slate-900 font-semibold px-4 py-3 outline-none border border-transparent rounded-xl bg-white flex-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
              <NumberFieldIncrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                +
              </NumberFieldIncrement>
            </NumberFieldRoot>
          </div>

          <div>
            <Label class="text-sm text-slate-600 font-medium mb-2 block">Ширина комнаты</Label>
            <NumberFieldRoot
              v-model="width"
              :min="1"
              :max="15"
              :step="0.1"
              class="p-1 border border-slate-200 rounded-2xl bg-slate-50 flex gap-2 shadow-sm items-center"
            >
              <NumberFieldDecrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                −
              </NumberFieldDecrement>
              <NumberFieldInput
                placeholder="1–15 м"
                class="text-lg text-slate-900 font-semibold px-4 py-3 outline-none border border-transparent rounded-xl bg-white flex-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
              <NumberFieldIncrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                +
              </NumberFieldIncrement>
            </NumberFieldRoot>
          </div>

          <!-- MATERIAL -->
          <div>
            <Label class="text-sm text-slate-600 font-medium mb-2 block">Материал полотна</Label>
            <SelectRoot v-model="material" class="w-full relative">
              <SelectTrigger class="text-slate-900 px-4 py-3 text-left border border-slate-200 rounded-2xl bg-white flex w-full shadow-sm transition items-center justify-between focus:outline-none hover:border-slate-300 focus:ring-2 focus:ring-blue-200">
                <div class="min-w-0">
                  <SelectValue placeholder="Выберите материал" class="truncate" />
                </div>
                <SelectIcon class="text-slate-400 ml-3" />
              </SelectTrigger>
              <SelectContent class="mt-2 border border-slate-200 rounded-2xl bg-white w-full shadow-xl overflow-hidden">
                <SelectViewport class="p-2 max-h-60 space-y-1">
                  <SelectItem value="basic" class="text-sm text-slate-800 px-3 py-3 rounded-xl transition data-[state=checked]:bg-sky-50 hover:bg-slate-100">
                    <SelectItemText>Базовое ПВХ полотно</SelectItemText>
                  </SelectItem>
                  <SelectItem value="premium" class="text-sm text-slate-800 px-3 py-3 rounded-xl transition data-[state=checked]:bg-sky-50 hover:bg-slate-100">
                    <SelectItemText>Премиум (сатин / мат / глянец)</SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectRoot>
            <p class="text-xs text-gray-400 mt-1">
              Расчёт выполнен по базовой стоимости 2500 ₸/м²
            </p>
          </div>

          <!-- LIGHTS -->
          <div>
            <Label class="text-sm text-slate-600 font-medium mb-2 block">Точки освещения</Label>
            <NumberFieldRoot
              v-model="lights"
              :min="0"
              :step="1"
              class="p-1 border border-slate-200 rounded-2xl bg-slate-50 flex gap-2 shadow-sm items-center"
            >
              <NumberFieldDecrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                −
              </NumberFieldDecrement>
              <NumberFieldInput
                placeholder="Количество точек"
                class="text-lg text-slate-900 font-semibold px-4 py-3 outline-none border border-transparent rounded-xl bg-white flex-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              />
              <NumberFieldIncrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                +
              </NumberFieldIncrement>
            </NumberFieldRoot>
            <p class="text-xs text-gray-400 mt-1">
              1 точка = 2500 ₸
            </p>
          </div>

          <!-- EXTRA -->
          <div class="mt-2 flex gap-2 items-center">
            <input v-model="hasExtra" type="checkbox" class="text-blue-600 border-slate-300 rounded h-4 w-4 focus:ring-blue-500">
            <span class="text-sm text-slate-700">Добавить выступ / вырез</span>
          </div>

          <div v-if="hasExtra" class="space-y-4">
            <SelectRoot v-model="extraMode" class="w-full relative">
              <SelectTrigger class="text-slate-900 px-4 py-3 text-left border border-slate-200 rounded-2xl bg-white flex w-full shadow-sm transition items-center justify-between focus:outline-none hover:border-slate-300 focus:ring-2 focus:ring-blue-200">
                <div class="min-w-0">
                  <SelectValue placeholder="Тип участка" class="truncate" />
                </div>
                <SelectIcon class="text-slate-400 ml-3" />
              </SelectTrigger>
              <SelectContent class="mt-2 border border-slate-200 rounded-2xl bg-white w-full shadow-xl overflow-hidden">
                <SelectViewport class="p-2 max-h-60 space-y-1">
                  <SelectItem value="add" class="text-sm text-slate-800 px-3 py-3 rounded-xl transition data-[state=checked]:bg-sky-50 hover:bg-slate-100">
                    <SelectItemText>Выступ (наружу)</SelectItemText>
                  </SelectItem>
                  <SelectItem value="cut" class="text-sm text-slate-800 px-3 py-3 rounded-xl transition data-[state=checked]:bg-sky-50 hover:bg-slate-100">
                    <SelectItemText>Вырез (внутрь)</SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectRoot>

            <div class="gap-4 grid">
              <div>
                <Label class="text-sm text-slate-600 font-medium mb-2 block">Длина участка</Label>
                <NumberFieldRoot
                  v-model="extraLength"
                  :min="0"
                  :max="10"
                  :step="0.1"
                  class="p-1 border border-slate-200 rounded-2xl bg-slate-50 flex gap-2 shadow-sm items-center"
                >
                  <NumberFieldDecrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                    −
                  </NumberFieldDecrement>
                  <NumberFieldInput
                    placeholder="Длина участка"
                    class="text-lg text-slate-900 font-semibold px-4 py-3 outline-none border border-transparent rounded-xl bg-white flex-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                  <NumberFieldIncrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                    +
                  </NumberFieldIncrement>
                </NumberFieldRoot>
              </div>

              <div>
                <Label class="text-sm text-slate-600 font-medium mb-2 block">Ширина участка</Label>
                <NumberFieldRoot
                  v-model="extraWidth"
                  :min="0"
                  :max="10"
                  :step="0.1"
                  class="p-1 border border-slate-200 rounded-2xl bg-slate-50 flex gap-2 shadow-sm items-center"
                >
                  <NumberFieldDecrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                    −
                  </NumberFieldDecrement>
                  <NumberFieldInput
                    placeholder="Ширина участка"
                    class="text-lg text-slate-900 font-semibold px-4 py-3 outline-none border border-transparent rounded-xl bg-white flex-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  />
                  <NumberFieldIncrement class="text-slate-700 rounded-xl bg-white inline-flex h-11 w-11 transition items-center justify-center hover:bg-slate-100">
                    +
                  </NumberFieldIncrement>
                </NumberFieldRoot>
              </div>
            </div>
          </div>

          <!-- RESULT -->
          <div class="p-4 border border-gray-200 rounded bg-gray-50">
            <p><b>Площадь:</b> {{ totalArea }} м²</p>

            <p class="mt-2">
              <b>Цена:</b>
              <span class="text-blue-700 font-bold">
                ~ {{ Math.round(totalPrice) }} ₸
              </span>
            </p>

            <p class="text-xs text-gray-400 mt-1">
              2500 ₸/м² + свет + материал
            </p>

            <!-- DISCLAIMER -->
            <div class="text-xs text-gray-500 mt-3 p-3 rounded bg-gray-50">
              * Расчёт является предварительным и носит ориентировочный характер.
              Итоговая стоимость может отличаться как в меньшую, так и в большую сторону
              в зависимости от особенностей помещения, сложности монтажа и выбранных материалов.
              Точная цена определяется после бесплатного замера специалистом.
            </div>
          </div>
          <ModalCalc :total-area="totalArea" :total-price="totalPrice" btn-name="Оставить заявку" />
        </div>

        <!-- RIGHT -->
        <div class="px-2 flex flex-col w-full items-center md:px-0">
          <p class="text-gray-500 mb-3">
            Схема комнаты
          </p>

          <div
            class="transition-all duration-300 relative"
            :style="{
              width: `${visualW + (hasExtra && extraMode === 'add' ? extraW : 0)}px`,
              height: `${visualH + (hasExtra && extraMode === 'add' ? extraH : 0)}px`,
              transform: isMobile
                ? 'perspective(1000px) scale(0.65) rotateX(60deg) rotateZ(8deg)'
                : 'perspective(1000px) rotateX(60deg) rotateZ(8deg)',
              transformOrigin: 'center',
            }"
          >
            <div
              class="border border-blue-400 bg-blue-100 absolute"
              :style="{ width: `${visualW}px`, height: `${visualH}px`, left: 0, top: 0 }"
            />

            <div
              v-if="hasExtra && extraMode === 'add'"
              class="border border-blue-500 bg-blue-200 absolute"
              :style="{
                width: `${extraW}px`,
                height: `${extraH}px`,
                left: `${visualW}px`,
                top: `${visualH - extraH}px`,
              }"
            />

            <div
              v-if="hasExtra && extraMode === 'cut'"
              class="border border-blue-400 bg-white absolute"
              :style="{
                width: `${extraW}px`,
                height: `${extraH}px`,
                right: 0,
                bottom: 0,
              }"
            />

            <div class="text-blue-700 font-bold flex items-center inset-0 justify-center absolute">
              {{ totalArea }} m²
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
