<script setup lang="ts">
import { sendGoogleAdsPhoneConversion } from '~/composables/useGoogleAdsConversion'
</script>

<template>
  <div class="bottom-4 left-4 fixed z-50">
    <!-- Плавающая кнопка -->
    <div class="p-4 rounded-full bg-blue-600 shadow-blue-900/20 shadow-lg transition-all duration-300 relative hover:bg-blue-700 hover:shadow-xl">
      <a
        href="tel:+7(708)204-30-24"
        aria-label="Позвонить в KONTUR и заказать бесплатный замер"
        @click="sendGoogleAdsPhoneConversion"
      >
        <div class="i-mdi:phone text-3xl text-white" />
      </a>
    </div>
  </div>
</template>
