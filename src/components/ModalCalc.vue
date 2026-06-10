<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import PhoneInput from '~/components/Inputs/PhoneInput.vue'
import UsernameInput from '~/components/Inputs/UsernameInput.vue'
import { useAppToast } from '~/composables/useAppToast'
import { useTelegram } from '~/composables/useTelegramApi'

const props = defineProps<{
  totalArea: number
  totalPrice: number
  btnName: string
  length: number
  width: number
  roomArea: number
  hasAdditionalElements: boolean
  additionalElementType: string
  additionalElementLength: number
  additionalElementWidth: number
  additionalElementArea: number
  cutoutArea: number
  projectionArea: number
  lights: number
  lightingPrice: number
  basePricePerM2: number
  ceilingPrice: number
}>()

const { sendMessage } = useTelegram()
const { showErrorToast, showSuccessToast } = useAppToast()

const name = ref('')
const phone = ref('')
const comment = ref('')
const isOpen = ref(false)
const isSending = ref(false)

const roundedPrice = computed(() => Math.round(props.totalPrice))
const formattedArea = computed(() => formatNumber(props.totalArea))
const formattedPrice = computed(() => formatPrice(roundedPrice.value))
const canSend = computed(() => Boolean(name.value.trim() && phone.value.trim()))

function formatNumber(value: number) {
  return value.toLocaleString('ru-RU', {
    maximumFractionDigits: 2,
  })
}

function formatPrice(value: number) {
  return Math.round(value).toLocaleString('ru-RU')
}

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape')
    closeModal()
}

function getPageUrl() {
  if (typeof window === 'undefined')
    return 'URL недоступен'

  return window.location.href
}

onMounted(() => {
  window.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
})

async function handleSend() {
  if (!canSend.value || isSending.value)
    return

  isSending.value = true

  const requestedAt = new Date().toLocaleString('ru-RU')
  const userComment = comment.value.trim() || 'Без комментария'

  const message = [
    '<b>Заявка с калькулятора натяжных потолков</b>',
    '',
    `<b>Длина комнаты:</b> ${formatNumber(props.length)} м`,
    `<b>Ширина комнаты:</b> ${formatNumber(props.width)} м`,
    `<b>Площадь комнаты:</b> ${formatNumber(props.roomArea)} м²`,
    `<b>Дополнительные элементы:</b> ${props.hasAdditionalElements ? 'да' : 'нет'}`,
    `<b>Тип дополнительного элемента:</b> ${props.additionalElementType}`,
    `<b>Длина дополнительного элемента:</b> ${formatNumber(props.additionalElementLength)} м`,
    `<b>Ширина дополнительного элемента:</b> ${formatNumber(props.additionalElementWidth)} м`,
    `<b>Площадь дополнительного элемента:</b> ${formatNumber(props.additionalElementArea)} м²`,
    `<b>Площадь вырезов:</b> ${formatNumber(props.cutoutArea)} м²`,
    `<b>Площадь выступов:</b> ${formatNumber(props.projectionArea)} м²`,
    `<b>Итоговая площадь:</b> ${formattedArea.value} м²`,
    `<b>Количество точек освещения:</b> ${props.lights}`,
    `<b>Стоимость освещения:</b> ${formatPrice(props.lightingPrice)} ₸`,
    `<b>Базовая цена за м²:</b> ${formatPrice(props.basePricePerM2)} ₸`,
    `<b>Стоимость потолка:</b> ${formatPrice(props.ceilingPrice)} ₸`,
    `<b>Итоговая ориентировочная стоимость:</b> ${formattedPrice.value} ₸`,
    '',
    `<b>Имя клиента:</b> ${name.value.trim()}`,
    `<b>Телефон:</b> ${phone.value.trim()}`,
    `<b>Комментарий:</b> ${userComment}`,
    `<b>URL страницы:</b> ${getPageUrl()}`,
    `<b>Дата и время:</b> ${requestedAt}`,
  ].join('\n')

  const ok = await sendMessage(message)
  isSending.value = false

  if (ok) {
    name.value = ''
    phone.value = ''
    comment.value = ''
    closeModal()
    showSuccessToast()
  }
  else {
    showErrorToast()
  }
}
</script>

<template>
  <button
    class="group text-white px-5 py-4 rounded-xl bg-blue-600 flex gap-4 w-full shadow-[0_16px_36px_rgba(184,154,114,0.22)] transition-all duration-300 items-center justify-between hover:bg-blue-700 hover:shadow-[0_18px_40px_rgba(184,154,114,0.28)] active:translate-y-0.5"
    type="button"
    aria-label="Оставить заявку по расчёту натяжного потолка"
    @click="openModal"
  >
    <span class="text-left min-w-0">
      <span class="font-semibold block truncate">{{ props.btnName }}</span>
      <span class="text-sm text-white/75 block transition-colors group-hover:text-white/80">
        бесплатный замер после расчёта {{ formattedArea }} м²
      </span>
    </span>

    <span class="rounded-lg bg-white/15 flex shrink-0 h-11 w-11 transition-colors items-center justify-center group-hover:bg-white/20">
      <span class="i-mdi:arrow-right text-2xl" />
    </span>
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="p-4 bg-[#07111F]/68 flex items-center inset-0 justify-center fixed z-[9999] backdrop-blur-md sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.self="closeModal"
      >
        <div
          class="rounded-xl bg-white max-h-[calc(100vh-2rem)] max-w-[540px] w-full shadow-[0_28px_80px_rgba(0,0,0,0.32)] relative overflow-y-auto"
          role="document"
        >
          <button
            class="text-slate-500 rounded-lg flex h-10 w-10 transition-colors items-center right-4 top-4 justify-center absolute z-10 hover:text-slate-950 hover:bg-slate-100"
            aria-label="Закрыть окно"
            @click="closeModal"
          >
            <span class="i-mdi:close text-2xl" />
          </button>

          <div class="text-white px-5 pb-6 pt-14 bg-gray-900 relative overflow-hidden sm:px-7 sm:pt-8">
            <p class="text-sm text-blue-200 tracking-wide font-semibold uppercase">
              4. Оставить заявку
            </p>

            <h2 id="modal-title" class="text-2xl leading-tight font-bold mt-2 sm:text-3xl">
              Отправим расчёт мастеру
            </h2>

            <p class="text-white/70 mt-3">
              Передадим размеры, ориентировочную стоимость и ваши контакты мастеру KONTUR.
            </p>
          </div>

          <div class="p-5 space-y-5 sm:p-7">
            <div class="gap-3 grid grid-cols-2">
              <div class="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div class="text-sm text-slate-500 flex gap-2 items-center">
                  <span class="i-mdi:ruler-square text-lg text-blue-600" />
                  Площадь
                </div>

                <div class="text-2xl text-slate-950 font-bold mt-2">
                  {{ formattedArea }} м²
                </div>
              </div>

              <div class="p-4 border border-slate-200 rounded-lg bg-gray-50">
                <div class="text-sm text-slate-600 flex gap-2 items-center">
                  <span class="i-mdi:cash text-lg text-blue-600" />
                  Стоимость
                </div>

                <div class="text-2xl text-slate-950 font-bold mt-2">
                  ~{{ formattedPrice }} ₸
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <UsernameInput v-model="name" />
              <PhoneInput v-model="phone" />
              <textarea
                v-model="comment"
                class="text-base text-gray-900 px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-22 w-full resize-y transition focus:outline-none focus:border-blue-500 hover:border-blue-400 focus:ring-2 focus:ring-blue-200"
                placeholder="Комментарий: адрес, удобное время, пожелания"
                aria-label="Комментарий к заявке"
              />
            </div>

            <button
              class="text-white font-semibold py-4 rounded-lg bg-blue-600 flex gap-2 w-full transition-all duration-300 items-center justify-center disabled:text-slate-500 disabled:bg-slate-300 hover:bg-blue-700 disabled:cursor-not-allowed"
              :disabled="!canSend || isSending"
              type="button"
              aria-label="Отправить заявку по расчёту"
              @click="handleSend"
            >
              <span class="i-mdi:send text-xl" />
              {{ isSending ? 'Отправляем...' : 'Отправить заявку' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
