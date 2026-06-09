<script setup lang="ts">
import {
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui'
import { useAppToast } from '~/composables/useAppToast'

const { closeToast, removeToast, toasts } = useAppToast()

function handleOpenChange(id: number, open: boolean) {
  if (open)
    return

  closeToast(id)
}
</script>

<template>
  <ToastProvider swipe-direction="right" :duration="4200">
    <ToastRoot
      v-for="toast in toasts"
      :key="toast.id"
      :open="toast.open"
      class="data-[state=closed]:animate-out data-[state=open]:animate-in p-4 border rounded-xl bg-white max-w-[calc(100vw-2rem)] w-[360px] shadow-2xl shadow-gray-950/15 data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--reka-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=cancel]:transition-transform"
      :class="toast.type === 'success' ? 'border-blue-100' : 'border-gray-200'"
      @update:open="handleOpenChange(toast.id, $event)"
      @animationend="!toast.open && removeToast(toast.id)"
    >
      <ToastTitle class="text-base text-gray-950 font-semibold">
        {{ toast.title }}
      </ToastTitle>
      <ToastDescription class="text-sm text-gray-600 leading-relaxed mt-1">
        {{ toast.description }}
      </ToastDescription>
    </ToastRoot>

    <ToastViewport class="p-4 outline-none flex flex-col gap-3 max-w-full right-0 top-0 fixed z-[10000] sm:right-4 sm:top-4" />
  </ToastProvider>
</template>
