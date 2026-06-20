<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { ref } from 'vue'
import PhoneInput from '~/components/Inputs/PhoneInput.vue'
import UsernameInput from '~/components/Inputs/UsernameInput.vue'
import { useAppToast } from '~/composables/useAppToast'
import { sendGoogleAdsLeadConversion } from '~/composables/useGoogleAdsConversion'
import { useTelegram } from '~/composables/useTelegramApi'

const props = withDefaults(defineProps<{
  interest?: string
}>(), {
  interest: 'Бесплатный замер натяжного потолка в Алматы',
})

const { sendMessage } = useTelegram()
const { showErrorToast, showSuccessToast } = useAppToast()

const isOpen = ref(false)
const name = ref('')
const phone = ref('')
const isSending = ref(false)

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;')
}

async function handleSend() {
  if (!name.value.trim() || !phone.value.trim() || isSending.value)
    return

  isSending.value = true

  const message = [
    '<b>Заявка с сайта натяжных потолков</b>',
    '',
    `<b>Имя клиента:</b> ${escapeHtml(name.value.trim())}`,
    `<b>Телефон:</b> ${escapeHtml(phone.value.trim())}`,
    `<b>Интерес:</b> ${escapeHtml(props.interest)}`,
  ].join('\n')

  const ok = await sendMessage(message)
  isSending.value = false

  if (ok) {
    name.value = ''
    phone.value = ''
    isOpen.value = false
    showSuccessToast()
    sendGoogleAdsLeadConversion()
  }
  else {
    showErrorToast()
  }
}
</script>

<template>
  <DialogRoot v-model:open="isOpen">
    <DialogTrigger as-child>
      <button
        class="text-white px-6 py-3 rounded-lg bg-blue-600 shadow-blue-900/15 shadow-md transition hover:bg-blue-700 hover:shadow-lg"
        type="button"
        aria-label="Оставить заявку на бесплатный замер"
      >
        Бесплатный замер
      </button>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="bg-black/40 inset-0 fixed z-[10000] backdrop-blur-sm" />
      <DialogContent
        class="p-6 border border-gray-200 rounded-xl bg-white max-w-md w-[calc(100%-2rem)] shadow-gray-900/15 shadow-xl left-1/2 top-1/2 fixed z-[10001] -translate-x-1/2 -translate-y-1/2"
        aria-describedby="request-modal-description"
      >
        <DialogClose as-child>
          <button
            class="text-2xl text-gray-400 transition right-3 top-3 absolute hover:text-gray-900"
            type="button"
            aria-label="Закрыть окно"
          >
            &times;
          </button>
        </DialogClose>

        <DialogTitle class="text-xl font-semibold mb-4 text-center">
          Оставьте заявку на бесплатный замер
        </DialogTitle>
        <p id="request-modal-description" class="sr-only">
          Укажите имя и номер телефона для обратной связи.
        </p>

        <form class="space-y-4" @submit.prevent="handleSend">
          <UsernameInput v-model="name" />
          <PhoneInput v-model="phone" />

          <button
            class="text-white font-semibold mt-6 py-3 rounded-lg bg-blue-600 w-full transition-all disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed"
            :disabled="!name.trim() || !phone.trim() || isSending"
            type="submit"
            aria-label="Отправить заявку на бесплатный замер"
          >
            {{ isSending ? 'Отправляем...' : 'Отправить' }}
          </button>
        </form>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
