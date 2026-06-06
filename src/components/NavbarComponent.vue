<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface NavItem {
  name: string
  href: string
}

const navItems = ref<NavItem[]>([
  { name: 'Бетон', href: '#assortiment' },
  { name: 'О нас', href: '#about' },
  { name: 'Услуги', href: '#pumps' },
  { name: 'Контакты', href: '#contacts' },
])

const isMobileMenuOpen = ref(false)
const isReady = ref(false)
const isScrolled = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 100)

  window.addEventListener('scroll', onScroll)
})
</script>

<template>
  <header
    class="bg-gray-100 w-full transition-all duration-500 top-0 sticky z-50"
    :class="[
      isReady ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
      isScrolled ? 'shadow-lg' : 'shadow-md',
    ]"
  >
    <div class="mx-auto px-4 py-1 flex items-center justify-between container">
      <!-- Логотип -->
      <a href="/" class="flex items-center">
        <div class="p-2 rounded bg-blue-500 overflow-hidden">
          <img src="/logo.png" alt="Logo" class="h-20 w-35 scale-140 transform object-cover">
        </div>
      </a>

      <div class="w-[70%] block">
        <div class="border-concrete pb-2 border-b-2 border-gray-300 hidden md:block">
          <ul class="text-sm text-gray-700 flex justify-between space-x-4">
            <li>РК, г. Алматы, Улица Казыбаева, 262</li>
            <li class="flex items-center">
              <div class="i-mdi-phone text-xs text-green-500 mr-2" />
              <a href="tel:+77074852328" class="transition hover:underline">
                +7 (707) 485-23-28
              </a>
            </li>
            <!-- почта -->
            <li><a href="malto:demidbeton@mail.ru" class="hover:underline" />taubetonkz@mail.ru</li>
          </ul>
        </div>
        <!-- Десктоп-навигация -->
        <nav class="ml-auto pt-2 w-[70%] hidden space-x-8 md:flex md:justify-between">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="text-gray-700 transition hover:text-blue-600"
          >
            {{ item.name }}
          </a>
        </nav>
      </div>

      <!-- Десктоп-кнопка -->
      <!-- <div class="hidden md:block">
        <a href="tel:+77074852328" class="text-gray-700 mt-2 flex items-center">
          <div class="i-mdi-phone text-xs text-green-500 mr-2" />
          <span class="text-sm">+7 (707) 485-23-28 </span>
        </a>
      </div> -->

      <!-- Мобильный блок -->
      <div class="flex items-center space-x-4 md:hidden">
        <a
          href="tel:+7(707)485-23-28"
          class="text-gray-700 font-semibold flex transition items-center hover:text-blue-600"
        >
          <div class="i-mdi-phone text-lg text-green-500 mr-1" />
          <span class="text-sm">Позвонить</span>
        </a>

        <!-- Бургер -->
        <div
          class="text-3xl text-gray-700 flex h-8 w-8 cursor-pointer transition-all duration-300 items-center justify-center"
          @click="toggleMobileMenu"
        >
          <div :class="isMobileMenuOpen ? 'i-mdi-close' : 'i-mdi-menu'" />
        </div>
      </div>
    </div>

    <!-- Мобильное меню -->
    <transition name="fade-scale">
      <nav
        v-if="isMobileMenuOpen"
        class="bg-white shadow-lg md:hidden"
      >
        <ul class="py-6 flex flex-col items-center space-y-6">
          <li v-for="item in navItems" :key="item.href">
            <a
              :href="item.href"
              class="text-lg text-gray-700 transition hover:text-red-600"
              @click="toggleMobileMenu"
            >
              {{ item.name }}
            </a>
          </li>
          <li>
            <RequestModal />
          </li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
/* Плавная анимация fade + scale для мобильного меню */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Плавная анимация появления хедера */
</style>
