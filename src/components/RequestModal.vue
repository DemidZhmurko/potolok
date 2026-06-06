<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import PhoneInput from '~/components/Inputs/PhoneInput.vue'
import UsernameInput from '~/components/Inputs/UsernameInput.vue'
import { useTelegram } from '~/composables/useTelegramApi'

const { sendMessage } = useTelegram()

const isOpen = ref(false)
const name = ref('')
const phone = ref('')

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
  if (!name.value.trim() || !phone.value.trim())
    return

  const message = `📝 Заявка\n👤 Имя: ${name.value}\n📞 Телефон: ${phone.value}`
  sendMessage(message)

  name.value = ''
  phone.value = ''
  closeModal()
}
</script>

<template>
  <!-- Кнопка открытия -->
  <button
    class="text-white px-6 py-3 rounded-lg bg-blue-600 shadow-md transition-500 hover:bg-yellow-500 hover:opacity-90"
    @click="openModal"
  >
    Оставить заявку
  </button>

  <!-- Teleport для модалки -->
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
        <div class="p-6 rounded-xl bg-white max-w-md w-full shadow-xl relative" role="document">
          <!-- Закрыть -->
          <button
            class="text-2xl text-gray-400 transition right-3 top-3 absolute hover:text-red-500"
            aria-label="Закрыть окно"
            @click="closeModal"
          >
            &times;
          </button>

          <!-- Заголовок -->
          <h2 id="modal-title" class="text-xl font-semibold mb-4 text-center">
            Оставьте заявку
          </h2>

          <!-- Поля -->
          <div class="space-y-4">
            <UsernameInput v-model="name" />
            <PhoneInput v-model="phone" />
          </div>

          <!-- Кнопка -->
          <button
            class="text-white font-semibold mt-6 py-3 rounded-lg bg-blue-600 w-full transition-all hover:opacity-90"
            @click="handleSend"
          >
            Отправить
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
