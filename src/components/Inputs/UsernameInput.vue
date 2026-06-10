<script setup lang="ts">
const name = defineModel<string>()
</script>

<template>
  <div class="w-full relative">
    <!-- Иконка -->
    <div
      class="i-mdi:account text-xl text-gray-400 transition-colors duration-300 left-4 top-1/2 absolute peer-focus:text-blue-600 -translate-y-1/2"
    />

    <!-- Инпут -->
    <input
      v-model="name"
      type="text"
      placeholder="Ваше имя"
      autocomplete="name"
      aria-label="Ваше имя"
      class="peer text-lg text-gray-900 py-3 pl-12 pr-4 border border-gray-300 rounded-lg bg-white w-full transition-all duration-300 focus:outline-none focus:border-blue-500 hover:border-blue-400 focus:ring-2 focus:ring-blue-200 hover:shadow-sm"
    >
  </div>
</template>
