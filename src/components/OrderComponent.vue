<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import PhoneInput from '~/components/Inputs/PhoneInput.vue'
import UsernameInput from '~/components/Inputs/UsernameInput.vue'
import { useAppToast } from '~/composables/useAppToast'
import { useTelegram } from '~/composables/useTelegramApi'

const { sendMessage } = useTelegram()
const { showErrorToast, showSuccessToast } = useAppToast()

const isOpen = ref(false)
const name = ref('')
const phone = ref('')
const isSending = ref(false)

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

async function handleSend() {
  if (!name.value.trim() || !phone.value.trim() || isSending.value)
    return

  isSending.value = true

  const message = [
    '<b>Заявка с сайта натяжных потолков</b>',
    '',
    `<b>Имя клиента:</b> ${name.value.trim()}`,
    `<b>Телефон:</b> ${phone.value.trim()}`,
  ].join('\n')

  const ok = await sendMessage(message)
  isSending.value = false

  if (ok) {
    name.value = ''
    phone.value = ''
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
    class="text-sm text-white font-semibold px-5 py-2 rounded-lg bg-blue-600 inline-flex gap-2 shadow shadow-blue-900/15 transition items-center hover:bg-blue-700"
    @click="openModal"
  >
    Заказать
    <div class="i-mdi-arrow-right" />
  </button>

  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="bg-black/40 flex items-center inset-0 justify-center fixed z-[9999] backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="p-6 border border-gray-200 rounded-xl bg-white max-w-md w-full shadow-gray-900/15 shadow-xl relative">
          <button
            class="text-2xl text-gray-400 right-3 top-3 absolute hover:text-gray-900"
            aria-label="Закрыть"
            @click="closeModal"
          >
            &times;
          </button>

          <h2 id="modal-title" class="text-xl font-bold mb-4 text-center">
            Оставьте заявку
          </h2>

          <div class="space-y-4">
            <UsernameInput v-model="name" />
            <PhoneInput v-model="phone" />
          </div>

          <button
            class="text-white font-semibold mt-6 py-3 rounded-lg bg-blue-600 w-full transition disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed"
            :disabled="isSending"
            @click="handleSend"
          >
            {{ isSending ? 'Отправляем...' : 'Отправить заявку' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
