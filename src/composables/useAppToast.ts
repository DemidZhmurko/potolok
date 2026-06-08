import { ref } from 'vue'

type ToastType = 'success' | 'error'

interface AppToast {
  id: number
  title: string
  description: string
  type: ToastType
  open: boolean
}

const toasts = ref<AppToast[]>([])

function removeToast(id: number) {
  toasts.value = toasts.value.filter(toast => toast.id !== id)
}

function closeToast(id: number) {
  const toast = toasts.value.find(item => item.id === id)

  if (!toast)
    return

  toast.open = false
  window.setTimeout(() => removeToast(id), 150)
}

function showToast(payload: Omit<AppToast, 'id' | 'open'>) {
  const id = Date.now() + Math.random()

  toasts.value.push({
    ...payload,
    id,
    open: true,
  })
}

function showSuccessToast() {
  showToast({
    title: '✅ Заявка отправлена',
    description: 'Мы получили вашу заявку и скоро свяжемся с вами.',
    type: 'success',
  })
}

function showErrorToast() {
  showToast({
    title: '❌ Ошибка отправки',
    description: 'Не удалось отправить заявку. Попробуйте ещё раз.',
    type: 'error',
  })
}

export function useAppToast() {
  return {
    closeToast,
    removeToast,
    showErrorToast,
    showSuccessToast,
    toasts,
  }
}
