<script setup lang="ts">
const message = 'Здравствуйте! Я хочу заказать Бетон. Подскажите, пожалуйста, как оформить заказ?'
</script>

<template>
  <div class="bottom-4 right-4 fixed z-50">
    <!-- Кнопка -->
    <div class="p-4 rounded-full bg-[#25D366] shadow-[0_16px_36px_rgba(37,211,102,0.24)] transition-all duration-300 relative hover:bg-[#1EBE5D] hover:shadow-[0_18px_42px_rgba(37,211,102,0.32)]">
      <a
        target="_blank"
        :href="`https://wa.me/77074852328?text=${encodeURIComponent(message)}`"

        aria-label="Открыть чат в WhatsApp"
      >
        <div class="i-mdi:whatsapp text-3xl text-white" />
      </a>
    </div>
  </div>
</template>
