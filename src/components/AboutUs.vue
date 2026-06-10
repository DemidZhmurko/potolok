<script setup lang="ts">
interface AboutCard {
  icon: 'ruler' | 'timer' | 'briefcase' | 'calendar' | 'tools' | 'handshake' | 'shield'
  title: string
  description: string
}

const aboutCards: AboutCard[] = [
  {
    icon: 'ruler',
    title: 'Бесплатный замер',
    description: 'Выезжаем на объект, консультируем и помогаем выбрать решение под ваш интерьер.',
  },
  {
    icon: 'timer',
    title: 'Быстрый монтаж',
    description: 'Согласовываем удобную дату и выполняем монтаж аккуратно, без лишней суеты.',
  },
  {
    icon: 'briefcase',
    title: 'Работаем с юр. и физ. лицами',
    description: 'Подготовим документы и предложим удобную форму оплаты для частных и коммерческих заказов.',
  },
  {
    icon: 'calendar',
    title: 'Без выходных',
    description: 'Принимаем заявки ежедневно и остаёмся на связи на всех этапах проекта.',
  },
  {
    icon: 'tools',
    title: 'Опыт в потолках',
    description: 'Знаем нюансы монтажа, освещения, теневых профилей и современных потолочных систем.',
  },
  {
    icon: 'handshake',
    title: 'Надёжные партнёры',
    description: 'Работаем с проверенными поставщиками полотен, профилей и комплектующих.',
  },
  {
    icon: 'shield',
    title: 'Сертификаты качества',
    description: 'Используем сертифицированные полотна и комплектующие для натяжных потолков.',
  },
]
</script>

<template>
  <section id="about" class="py-16 bg-[#FAF8F4] sm:py-20">
    <div class="mx-auto px-4 max-w-7xl container">
      <div class="mx-auto text-center max-w-3xl">
        <p class="text-xs text-[#B89A72] tracking-[0.18em] font-semibold uppercase">
          KONTUR
        </p>
        <h2 class="text-3xl text-[#2F2A24] leading-tight font-bold mt-3 lg:text-5xl sm:text-4xl">
          О KONTUR и наших решениях
        </h2>
        <p class="text-base text-[#6F675F] leading-relaxed mx-auto mt-4 max-w-2xl sm:text-lg">
          Берём на себя замер, подбор материалов и аккуратный монтаж натяжных потолков под ключ.
        </p>
      </div>

      <div class="mt-10 gap-5 grid grid-cols-1 sm:mt-12 lg:gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="card in aboutCards"
          :key="card.title"
          class="group p-6 border border-[#2F2A24]/10 rounded-[22px] bg-white/90 flex flex-col h-full min-h-[238px] shadow-[0_18px_48px_rgba(47,42,36,0.07)] transition-all duration-300 relative overflow-hidden sm:p-7 hover:border-[#B89A72]/55 hover:shadow-[0_26px_70px_rgba(47,42,36,0.13)] hover:-translate-y-1.5"
        >
          <div class="bg-gradient-to-br rounded-full h-28 w-28 transition-transform duration-300 right-[-34px] top-[-34px] absolute from-[#B89A72]/18 to-transparent group-hover:scale-110" aria-hidden="true" />

          <div class="text-[#B89A72] rounded-2xl bg-[#F4EFE7] flex h-14 w-14 ring-1 ring-[#B89A72]/18 shadow-[0_10px_24px_rgba(184,154,114,0.18)] items-center justify-center relative z-10">
            <span v-if="card.icon === 'ruler'" class="i-mdi:ruler-square text-2xl" aria-hidden="true" />
            <span v-else-if="card.icon === 'timer'" class="i-mdi:timer-outline text-2xl" aria-hidden="true" />
            <span v-else-if="card.icon === 'briefcase'" class="i-mdi:briefcase-outline text-2xl" aria-hidden="true" />
            <span v-else-if="card.icon === 'calendar'" class="i-mdi:calendar-clock-outline text-2xl" aria-hidden="true" />
            <span v-else-if="card.icon === 'tools'" class="i-mdi:tools text-2xl" aria-hidden="true" />
            <span v-else-if="card.icon === 'handshake'" class="i-mdi:handshake-outline text-2xl" aria-hidden="true" />
            <span v-else class="i-mdi:shield-check-outline text-2xl" aria-hidden="true" />
          </div>

          <div class="mt-6 flex flex-1 flex-col relative z-10">
            <h3 class="text-xl text-[#2F2A24] leading-snug font-semibold">
              {{ card.title }}
            </h3>
            <p class="text-sm text-[#6F675F] leading-relaxed mt-3">
              {{ card.description }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
