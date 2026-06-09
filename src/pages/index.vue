<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { defineLocalBusiness, defineWebPage, defineWebSite, useSchemaOrg } from '@vueuse/schema-org'

defineOptions({
  name: 'IndexPage',
})

// ✅ FAQ Schema (JSON-LD)
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Какая марка бетона подходит для фундамента?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Для фундамента частного дома чаще всего используют бетон М300 или М350, так как они обеспечивают прочность и долговечность конструкции.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Сколько стоит бетон в Алматы?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Цена бетона зависит от марки и объема. Уточните стоимость у наших специалистов — мы предложим выгодные условия с доставкой.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Доставляете ли вы бетон по Алматы?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, компания TAUBETON осуществляет доставку бетона по Алматы и области собственным транспортом точно в срок.',
      },
    },
    {
      '@type': 'Question',
      'name': 'Соответствует ли бетон ГОСТ?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Да, весь бетон производится по ГОСТ и сопровождается паспортом качества.',
      },
    },
  ],
}

// ✅ Head (GA + FAQ)
useHead({
  script: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-EK35CW4WFV',
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        window.gtag = function(){ dataLayer.push(arguments); };

        gtag('js', new Date());

        gtag('config', 'G-EK35CW4WFV', {
          page_path: window.location.pathname
        });

        gtag('config', 'AW-17169847962');
      `,
      type: 'text/javascript',
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema),
    },
  ],
})

// ✅ SEO Meta (под TAUBETON)
useSeoMeta({
  title: 'Купить бетон в Алматы с доставкой — TAUBETON',
  description: 'Купить бетон в Алматы с доставкой от производителя TAUBETON. Все марки бетона по ГОСТ, выгодные цены и быстрая доставка.',
  ogTitle: 'Бетон с доставкой в Алматы — TAUBETON',
  ogDescription: 'Производство и доставка бетона по Алматы. Марки М200–М350, гарантия качества.',
  ogUrl: 'https://taubeton.kz',
  ogSiteName: 'TAUBETON',
  twitterCard: 'summary',
  twitterTitle: 'Купить бетон в Алматы — TAUBETON',
  twitterDescription: 'Бетон с доставкой по Алматы по выгодной цене.',
})

// ✅ Schema.org
useSchemaOrg([
  defineWebPage({
    name: 'Купить бетон в Алматы | TAUBETON',
    description: 'Купить бетон в Алматы с доставкой от производителя TAUBETON. Продажа бетона всех марок.',
  }),

  defineWebSite({
    name: 'TAUBETON',
    url: 'https://taubeton.kz',
    description: 'Производство и доставка бетона по Алматы и Казахстану.',
  }),

  defineLocalBusiness({
    name: 'TAUBETON',
    url: 'https://taubeton.kz',
    image: 'https://taubeton.kz/logo.png',
    telephone: '+77074852328',
    description: 'Производство и доставка бетона по Алматы. Все марки бетона с гарантией качества.',
    address: {
      streetAddress: 'Алматы',
      addressLocality: 'Алматы',
      addressCountry: 'KZ',
    },
    openingHours: ['Mo-Sa 08:00-20:00'],
  }),
])
</script>

<template>
  <!-- Hero -->
  <section
    id="hero"
    class="bg-[url('/background.png')] flex min-h-[calc(100vh-96px)] items-center relative overflow-hidden bg-cover bg-center scroll-mt-16"
  >
    <div class="bg-gray-950/55 inset-0 absolute z-0" aria-hidden="true" />
    <div class="bg-gradient-to-r inset-0 absolute z-0 from-gray-950/72 to-gray-800/15 via-gray-900/45" aria-hidden="true" />
    <div class="mx-auto px-4 relative z-10 container">
      <div class="md:items-left text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:text-left md:w-[58%]">
        <div class="text-center w-full space-y-6 md:text-left">
          <div class="text-sm text-blue-200 tracking-wide font-semibold uppercase">
            Натяжные потолки в Алматы
          </div>
          <h1 class="text-3xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Натяжные потолки с гарантией качества от 5 лет
          </h1>
          <p class="text-base text-gray-100 leading-relaxed sm:text-lg">
            Компания «ДЯДЯ Вова» занимается установкой натяжных потолков в Алматы, гарантируя высокое качество и соблюдение сроков!
          </p>
          <div class="text-sm text-gray-100 flex flex-wrap gap-3 justify-center md:justify-start">
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Бесплатный замер</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Монтаж за 1 день</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Гарантия 5 лет</span>
          </div>
          <div class="mt-6">
            <RequestModal />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Калькулятор -->
  <section id="calc" class="scroll-mt-16">
    <CalcTabs />
  </section>

  <!-- Ассортимент -->
  <section id="assortiment" class="scroll-mt-16">
    <ProductGrid />
  </section>

  <!-- Автобетононасосы -->
  <section id="pumps" class="scroll-mt-16">
    <Pumps />
  </section>

  <!-- О компании -->
  <section id="about" class="scroll-mt-16">
    <div class="py-14 bg-white lg:py-20 sm:py-16">
      <div class="mx-auto px-4 max-w-6xl container">
        <div class="gap-8 grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div>
            <p class="text-xs text-blue-600 tracking-wide font-semibold uppercase">
              О нас
            </p>
            <h2 class="text-2xl text-gray-950 leading-tight font-bold mt-2 lg:text-4xl sm:text-3xl">
              Делаем натяжные потолки под ключ — от бесплатного замера до аккуратного монтажа.
            </h2>
            <p class="text-base text-gray-600 leading-relaxed mt-4 max-w-3xl">
              Мы занимаемся установкой натяжных потолков для квартир, домов, офисов и коммерческих помещений. Помогаем подобрать подходящее полотно, освещение, карнизы и дополнительные решения под интерьер и бюджет клиента.
            </p>
          </div>

          <div class="p-5 border border-blue-100 rounded-2xl bg-blue-50/70 shadow-blue-950/5 shadow-sm">
            <div class="flex gap-3 items-start">
              <span class="text-blue-600 rounded-xl bg-white flex shrink-0 h-11 w-11 shadow-sm items-center justify-center">
                <span class="text-lg font-bold">✓</span>
              </span>
              <div>
                <h3 class="text-lg text-gray-950 font-semibold">
                  Работаем аккуратно и прозрачно
                </h3>
                <p class="text-sm text-gray-600 leading-relaxed mt-1.5">
                  Замеряем помещение, объясняем варианты, фиксируем стоимость и выполняем монтаж без лишней суеты.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 gap-5 grid lg:grid-cols-4 sm:grid-cols-2">
          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">01</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Бесплатный замер и консультация
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Выезжаем на объект и помогаем подобрать лучшее решение под ваш интерьер.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">02</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Установка в ближайшее время
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Оперативно согласовываем дату и выполняем монтаж в удобный день.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">03</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Работаем с физ. и юр. лицами
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Берём частные и коммерческие заказы, готовим необходимые документы.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">04</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Без выходных
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Принимаем заявки ежедневно и остаёмся на связи на всех этапах работы.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">05</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Опыт в потолках и строительстве
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Многолетний опыт монтажа помогает учитывать нюансы ремонта и отделки.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">06</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Надёжные партнёры
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Используем проверенные полотна, профили и комплектующие для монтажа.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">07</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Команда профессионалов
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Монтаж выполняют опытные специалисты с аккуратным подходом.
            </p>
          </div>

          <div class="group p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 relative overflow-hidden hover:border-blue-200 hover:shadow-[0_24px_60px_rgba(37,99,235,0.14)] hover:-translate-y-1">
            <div class="bg-gradient-to-r h-1 inset-x-0 top-0 absolute from-blue-600 to-transparent via-blue-200" />
            <span class="text-blue-700 rounded-xl bg-blue-50 flex h-12 w-12 ring-1 ring-blue-100 transition items-center justify-center group-hover:bg-blue-100">
              <span class="text-sm font-bold">08</span>
            </span>
            <h3 class="text-lg text-gray-950 leading-snug font-semibold mt-5">
              Сертификаты качества
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Используем сертифицированные материалы и предоставляем подтверждения.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- FAQ -->
  <section class="py-12 bg-gray-50">
    <div class="mx-auto px-4 max-w-4xl container">
      <h2 class="text-2xl font-bold mb-8 md:text-3xl">
        Часто задаваемые вопросы о бетоне
      </h2>

      <div class="border rounded-xl bg-white shadow-sm divide-y">
        <!-- Item -->
        <details class="group p-5 cursor-pointer">
          <summary class="text-lg font-semibold list-none flex items-center justify-between">
            Какая марка бетона подходит для фундамента?

            <span class="transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <p class="text-gray-600 leading-relaxed mt-3">
            Для фундамента частного дома чаще всего используют бетон М300 или М350. Эти марки обеспечивают высокую прочность и устойчивость к нагрузкам.
          </p>
        </details>

        <!-- Item -->
        <details class="group p-5 cursor-pointer">
          <summary class="text-lg font-semibold list-none flex items-center justify-between">
            Сколько стоит бетон в Алматы?

            <span class="transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <p class="text-gray-600 leading-relaxed mt-3">
            Цена зависит от марки и объема. В среднем стоимость начинается от 15 000 ₸ за м³ с доставкой. Для точного расчета оставьте заявку.
          </p>
        </details>

        <!-- Item -->
        <details class="group p-5 cursor-pointer">
          <summary class="text-lg font-semibold list-none flex items-center justify-between">
            Есть ли доставка бетона?

            <span class="transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <p class="text-gray-600 leading-relaxed mt-3">
            Да, компания TAUBETON осуществляет доставку бетона по Алматы и области собственным транспортом точно в срок.
          </p>
        </details>

        <!-- Item -->
        <details class="group p-5 cursor-pointer">
          <summary class="text-lg font-semibold list-none flex items-center justify-between">
            Соответствует ли бетон ГОСТ?

            <span class="transition-transform duration-300 group-open:rotate-180">
              ▼
            </span>
          </summary>

          <p class="text-gray-600 leading-relaxed mt-3">
            Да, весь бетон производится по ГОСТ и сопровождается паспортом качества.
          </p>
        </details>
      </div>
    </div>
  </section>
  <!-- Контакты -->
  <section id="contacts" class="scroll-mt-16">
    <Contacs />
  </section>
</template>
