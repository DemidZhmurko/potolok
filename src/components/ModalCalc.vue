<script setup lang="ts">
import { useTelegram } from '~/composables/useTelegramApi'

const props = defineProps<{
  totalArea: number
  totalPrice: number
  btnName: string
}>()

const { sendMessage } = useTelegram()

const name = ref('')
const phone = ref('')
const isOpen = ref(false)

const roundedPrice = computed(() => Math.round(props.totalPrice))
const formattedArea = computed(() => props.totalArea.toLocaleString('ru-RU', {
  maximumFractionDigits: 2,
}))
const formattedPrice = computed(() => roundedPrice.value.toLocaleString('ru-RU'))
const canSend = computed(() => Boolean(name.value.trim() && phone.value.trim()))

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

onMounted(() => {
  window.addEventListener('keydown', onEsc)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onEsc)
})

function handleSend() {
  if (!canSend.value)
    return

  const message = `📝 Заявка\n👤 Имя: ${name.value}\n📞 Телефон: ${phone.value}\n 💵 Расчет: ${formattedArea.value} м²\n 🥳 Ориентировочная цена: ${formattedPrice.value} ₸`
  sendMessage(message)

  name.value = ''
  phone.value = ''

  closeModal()
}
</script>

<template>
  <button
    class="group text-white px-5 py-4 rounded-lg bg-[#0F66D6] flex gap-4 w-full shadow-[0_16px_36px_rgba(15,102,214,0.24)] transition-all duration-300 items-center justify-between hover:text-[#121826] hover:bg-[#F2B705] hover:shadow-[0_18px_40px_rgba(242,183,5,0.28)] active:translate-y-0.5"
    @click="openModal"
  >
    <span class="text-left min-w-0">
      <span class="font-semibold block truncate">{{ props.btnName }}</span>
      <span class="text-sm text-white/75 block transition-colors group-hover:text-[#121826]/70">
        расчет за {{ formattedArea }} м²
      </span>
    </span>

    <span class="rounded-lg bg-white/15 flex shrink-0 h-11 w-11 transition-colors items-center justify-center group-hover:bg-[#121826]/10">
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
          class="rounded-lg bg-white max-h-[calc(100vh-2rem)] max-w-[520px] w-full shadow-[0_28px_80px_rgba(0,0,0,0.32)] relative overflow-hidden"
          role="document"
        >
          <button
            class="text-slate-500 rounded-lg flex h-10 w-10 transition-colors items-center right-4 top-4 justify-center absolute z-10 hover:text-slate-950 hover:bg-slate-100"
            aria-label="Закрыть окно"
            @click="closeModal"
          >
            <span class="i-mdi:close text-2xl" />
          </button>

          <div class="text-white px-5 pb-6 pt-14 bg-[#101828] relative overflow-hidden sm:px-7 sm:pt-8">
            <div class="rounded-full bg-[#F2B705]/20 h-24 w-24 right-[-34px] top-[-34px] absolute" />
            <div class="rounded-full bg-[#2EC4B6]/18 h-16 w-16 bottom-[-26px] left-[-24px] absolute" />

            <div class="relative">
              <p class="text-sm text-[#F2B705] tracking-wide font-semibold uppercase">
                Финальный шаг
              </p>

              <h2 id="modal-title" class="text-2xl leading-tight font-bold mt-2 sm:text-3xl">
                Зафиксируем расчет и свяжемся с вами
              </h2>

              <p class="text-white/70 mt-3">
                Передадим мастеру площадь, ориентировочную сумму и ваши контакты.
              </p>
            </div>
          </div>

          <div class="p-5 space-y-5 sm:p-7">
            <div class="gap-3 grid grid-cols-2">
              <div class="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div class="text-sm text-slate-500 flex gap-2 items-center">
                  <span class="i-mdi:ruler-square text-lg text-[#0F66D6]" />
                  Площадь
                </div>

                <div class="text-2xl text-slate-950 font-bold mt-2">
                  {{ formattedArea }} м²
                </div>
              </div>

              <div class="p-4 border border-slate-200 rounded-lg bg-[#FFF8DF]">
                <div class="text-sm text-slate-600 flex gap-2 items-center">
                  <span class="i-mdi:cash text-lg text-[#B7791F]" />
                  Стоимость
                </div>

                <div class="text-2xl text-[#121826] font-bold mt-2">
                  ~{{ formattedPrice }} ₸
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <UsernameInput v-model="name" />
              <PhoneInput v-model="phone" />
            </div>

            <div class="p-4 border border-slate-200 rounded-lg bg-white flex gap-3">
              <div class="text-[#0E8F80] rounded-lg bg-[#E8F7F5] flex shrink-0 h-10 w-10 items-center justify-center">
                <span class="i-mdi:shield-check text-xl" />
              </div>

              <p class="text-sm text-slate-500 leading-relaxed">
                Заявка уйдет напрямую в Telegram. Точная цена подтверждается после замера.
              </p>
            </div>

            <button
              class="text-white font-semibold py-4 rounded-lg bg-[#0F66D6] flex gap-2 w-full transition-all duration-300 items-center justify-center disabled:text-slate-500 disabled:bg-slate-300 hover:bg-[#0B55B5] disabled:cursor-not-allowed"
              :disabled="!canSend"
              @click="handleSend"
            >
              <span class="i-mdi:send text-xl" />
              Отправить заявку
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
