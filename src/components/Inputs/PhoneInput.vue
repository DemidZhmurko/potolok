<script setup lang="ts">
import Inputmask from 'inputmask'
import { onMounted, ref } from 'vue'

const phone = defineModel<string>()
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (input.value) {
    Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true,
      placeholder: '_',
      clearIncomplete: true,
    }).mask(input.value)
  }
})
</script>

<template>
  <div class="w-full relative">
    <!-- Иконка -->
    <div
      class="i-mdi:phone text-xl text-gray-400 transition-colors duration-300 left-4 top-1/2 absolute peer-focus:text-blue-600 -translate-y-1/2"
    />

    <!-- Инпут -->
    <input
      ref="input"
      v-model="phone"
      type="tel"
      placeholder="Номер телефона"
      autocomplete="tel"
      aria-label="Номер телефона"
      class="peer text-lg text-gray-900 py-3 pl-12 pr-4 border border-gray-300 rounded-lg bg-white w-full transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-400 focus:ring-2 focus:ring-blue-200 hover:shadow-sm"
    >
  </div>
</template>
