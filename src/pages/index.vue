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
    class="bg-[url('/background.png')] flex min-h-screen items-center relative bg-cover bg-center scroll-mt-16"
  >
    <div class="bg-black/60 inset-0 absolute z-0" aria-hidden="true" />
    <div class="mx-auto px-4 relative z-10 container">
      <div class="md:items-left text-white py-12 flex flex-col min-h-[70vh] items-start justify-center md:text-left md:w1/2">
        <div class="text-center w-full space-y-6 md:text-left">
          <h1 class="text-2xl leading-tight font-bold md:text-6xl sm:text-5xl">
            Купить бетон с доставкой в Алматы по самым выгодным ценам
          </h1>
          <p class="text-base sm:text-lg">
            Компания «TAUBETON» занимается производством и доставкой бетона и строительных растворов по всей территории Казахстана, гарантируя высокое качество продукции и соблюдение сроков
          </p>
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
    <AboutUs />
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
