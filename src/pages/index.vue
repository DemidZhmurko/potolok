<script setup lang="ts">
import { useHead, useSeoMeta } from '@unhead/vue'
import { defineLocalBusiness, defineWebPage, defineWebSite, useSchemaOrg } from '@vueuse/schema-org'
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from 'reka-ui'

defineOptions({
  name: 'IndexPage',
})

const faqItems = [
  {
    question: 'Сколько стоит натяжной потолок в Алматы?',
    answer: 'Цена зависит от площади комнаты, типа полотна, количества углов, светильников, карнизов и профиля. Базовый расчёт можно сделать в калькуляторе, а точную стоимость фиксируем после бесплатного замера.',
  },
  {
    question: 'Сколько длится монтаж натяжного потолка?',
    answer: 'Обычную комнату чаще всего устанавливаем за несколько часов. Квартиру с несколькими помещениями часто можно закрыть за 1 день, а сложные решения с подсветкой, магнитными треками и теневым профилем согласуем по срокам отдельно.',
  },
  {
    question: 'Какая гарантия на потолки и монтаж?',
    answer: 'Даём гарантию до 15 лет на полотно и монтажные работы. Используем сертифицированные материалы и объясняем условия гарантии до начала работ.',
  },
  {
    question: 'Можно ли установить натяжной потолок после ремонта?',
    answer: 'Да, монтаж возможен после ремонта. Мастера работают аккуратно, закрывают чувствительные зоны и заранее предупреждают, что лучше убрать или защитить перед установкой.',
  },
  {
    question: 'Какие потолки лучше выбрать для квартиры?',
    answer: 'Для спокойного интерьера чаще выбирают матовые потолки, для визуального расширения пространства — глянцевые, для мягкого премиального эффекта — сатиновые. На замере подскажем вариант под освещение, стены и бюджет.',
  },
  {
    question: 'Можно ли встроить подсветку в натяжной потолок?',
    answer: 'Да. Делаем точечные светильники, световые линии, скрытую LED-подсветку, парящий контур и сценарии света под разные зоны комнаты.',
  },
  {
    question: 'Что такое теневой профиль?',
    answer: 'Теневой профиль создаёт аккуратный зазор между потолком и стеной без классического плинтуса. Решение подходит для современных интерьеров и чистой геометрии.',
  },
  {
    question: 'Можно ли установить магнитные треки?',
    answer: 'Да, проектируем и монтируем магнитные трековые системы вместе с натяжным потолком. Важно заранее рассчитать расположение треков, питание и сценарии освещения.',
  },
  {
    question: 'Делаете ли вы скрытые карнизы?',
    answer: 'Да, устанавливаем скрытые карнизы и ниши под шторы. Такое решение визуально поднимает потолок и делает окно аккуратнее.',
  },
  {
    question: 'Выезд замерщика по Алматы бесплатный?',
    answer: 'Да, замер и консультация по Алматы бесплатные. На месте проверяем размеры, стены, электрику, обсуждаем материалы и называем понятную смету.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': faqItems.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer,
    },
  })),
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': 'Kontur',
  'url': 'https://kontur-v.kz/',
  'image': 'https://kontur-v.kz/background.png',
  'logo': 'https://kontur-v.kz/favicon_io/web-app-manifest-512x512.png',
  'telephone': '+77082043024',
  'email': 'konturpotolok@mail.ru',
  'priceRange': '₸₸',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Алматы',
    'addressLocality': 'Алматы',
    'addressRegion': 'Алматы',
    'addressCountry': 'KZ',
  },
  'areaServed': {
    '@type': 'City',
    'name': 'Алматы',
  },
  'makesOffer': {
    '@type': 'Offer',
    'itemOffered': {
      '@type': 'Service',
      'name': 'Монтаж натяжных потолков',
      'areaServed': 'Алматы',
    },
  },
}

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://kontur-v.kz/',
    },
  ],
  meta: [
    {
      name: 'keywords',
      content: 'натяжные потолки алматы, натяжной потолок алматы, установка натяжных потолков, теневые потолки, парящие потолки, потолки с подсветкой',
    },
    {
      property: 'og:image:width',
      content: '1671',
    },
    {
      property: 'og:image:height',
      content: '941',
    },
    {
      property: 'og:image:alt',
      content: 'Натяжные потолки Kontur в Алматы',
    },
    {
      name: 'twitter:image:alt',
      content: 'Натяжные потолки Kontur в Алматы',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(faqSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema),
    },
  ],
})

useSeoMeta({
  title: 'Натяжные потолки в Алматы | Монтаж под ключ | Kontur',
  description: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
  ogTitle: 'Натяжные потолки в Алматы | Монтаж под ключ | Kontur',
  ogDescription: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
  ogType: 'website',
  ogUrl: 'https://kontur-v.kz/',
  ogImage: 'https://kontur-v.kz/background.png',
  ogImageAlt: 'Натяжные потолки Kontur в Алматы',
  ogSiteName: 'Kontur',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Натяжные потолки в Алматы | Монтаж под ключ | Kontur',
  twitterDescription: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
  twitterImage: 'https://kontur-v.kz/background.png',
  twitterImageAlt: 'Натяжные потолки Kontur в Алматы',
})

useSchemaOrg([
  defineWebPage({
    name: 'Натяжные потолки в Алматы | Монтаж под ключ | Kontur',
    description: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
  }),

  defineWebSite({
    name: 'Kontur',
    url: 'https://kontur-v.kz/',
    description: 'KONTUR — монтаж натяжных потолков в Алматы под ключ.',
  }),

  defineLocalBusiness({
    name: 'Kontur',
    url: 'https://kontur-v.kz/',
    image: 'https://kontur-v.kz/background.png',
    logo: 'https://kontur-v.kz/favicon_io/web-app-manifest-512x512.png',
    telephone: '+77082043024',
    email: 'konturpotolok@mail.ru',
    description: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
    address: {
      streetAddress: 'Алматы',
      addressLocality: 'Алматы',
      addressRegion: 'Алматы',
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
    class="bg-[url(/background.png)] flex min-h-[calc(82vh-64px)] items-center relative overflow-hidden bg-cover bg-center scroll-mt-16 lg:min-h-[86vh] sm:min-h-[78vh]"
  >
    <div class="bg-gray-950/58 inset-0 absolute z-0" aria-hidden="true" />
    <div class="bg-gradient-to-r inset-0 absolute z-0 from-gray-950/86 to-gray-950/18 via-gray-950/58" aria-hidden="true" />
    <div class="bg-gradient-to-t h-1/2 inset-x-0 bottom-0 absolute z-0 from-gray-950/55 to-transparent" aria-hidden="true" />

    <div class="mx-auto px-4 w-full relative z-10 container">
      <div class="text-white py-16 flex min-h-[calc(82vh-64px)] items-center lg:min-h-[86vh] sm:min-h-[78vh]">
        <div class="mx-auto text-center max-w-3xl space-y-6 md:mx-0 md:text-left md:max-w-2xl">
          <div class="text-sm text-blue-200 tracking-wide font-semibold uppercase">
            KONTUR — современные потолочные решения
          </div>
          <h1 class="text-4xl leading-tight font-bold lg:text-6xl sm:text-5xl">
            Натяжные потолки в Алматы
          </h1>
          <p class="text-base text-gray-100 leading-relaxed mx-auto max-w-2xl sm:text-lg md:mx-0">
            Устанавливаем натяжные потолки под ключ: матовые, глянцевые и сатиновые полотна, подсветка, теневой профиль, магнитные треки и скрытые карнизы. Бесплатно замеряем, считаем понятную смету и даём гарантию до 15 лет.
          </p>
          <div class="text-sm text-gray-100 flex flex-wrap gap-2.5 justify-center md:justify-start">
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Бесплатный замер</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Монтаж за 1 день</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Работаем без выходных</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Сертифицированные полотна</span>
          </div>
          <div class="pt-2 flex flex-col gap-3 justify-center sm:flex-row md:justify-start">
            <a
              href="#contacts"
              aria-label="Получить консультацию по натяжным потолкам в Алматы"
              class="text-white font-semibold px-6 py-3.5 rounded-xl bg-blue-600 inline-flex min-h-12 shadow-blue-900/15 shadow-md transition items-center justify-center hover:bg-blue-700 hover:shadow-lg"
            >
              Получить консультацию
            </a>
            <a
              href="#calc"
              aria-label="Рассчитать стоимость натяжного потолка"
              class="text-white font-semibold px-6 py-3.5 border border-white/22 rounded-xl bg-white/10 inline-flex min-h-12 shadow-sm transition items-center justify-center backdrop-blur-sm hover:border-white/35 hover:bg-white/18"
            >
              Рассчитать стоимость
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Ассортимент -->
  <section id="assortiment" class="scroll-mt-16">
    <ProductGrid />
  </section>

  <!-- Дополнительные решения -->
  <section id="ceiling-extras" class="scroll-mt-16">
    <CeilingExtras />
  </section>

  <!-- О компании -->
  <section id="about" class="scroll-mt-16">
    <AboutUs />
  </section>

  <!-- Калькулятор -->
  <section id="calc" class="scroll-mt-16">
    <CalcTabs />
  </section>

  <!-- Преимущества -->
  <section id="advantages" class="scroll-mt-16">
    <div class="py-14 bg-white lg:py-20 sm:py-16">
      <div class="mx-auto px-4 max-w-6xl container">
        <div class="mx-auto text-center max-w-3xl">
          <p class="text-xs text-blue-600 tracking-wide font-semibold uppercase">
            Преимущества
          </p>
          <h2 class="text-2xl text-gray-950 leading-tight font-bold mt-2 lg:text-4xl sm:text-3xl">
            Почему выбирают KONTUR
          </h2>
        </div>

        <div class="mt-10 gap-5 grid lg:grid-cols-4 sm:grid-cols-2">
          <div class="p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(47,42,36,0.06)]">
            <h3 class="text-lg text-gray-950 leading-snug font-semibold">
              Бесплатный замер и консультация
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Выезжаем на объект и помогаем подобрать решение под интерьер.
            </p>
          </div>

          <div class="p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(47,42,36,0.06)]">
            <h3 class="text-lg text-gray-950 leading-snug font-semibold">
              Монтаж за 1 день
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Для большинства комнат выполняем монтаж в день установки.
            </p>
          </div>

          <div class="p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(47,42,36,0.06)]">
            <h3 class="text-lg text-gray-950 leading-snug font-semibold">
              Сертифицированные материалы
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Используем проверенные полотна, профили и комплектующие.
            </p>
          </div>

          <div class="p-6 border border-gray-200 rounded-2xl bg-white min-h-[220px] shadow-[0_18px_45px_rgba(47,42,36,0.06)]">
            <h3 class="text-lg text-gray-950 leading-snug font-semibold">
              Гарантия до 15 лет
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-2.5">
              Даём гарантию на полотно и выполненные монтажные работы.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- FAQ -->
  <section class="py-14 bg-gray-50 sm:py-16">
    <div class="mx-auto px-4 max-w-5xl container">
      <div class="mx-auto text-center max-w-3xl">
        <p class="text-xs text-blue-600 tracking-wide font-semibold uppercase">
          FAQ
        </p>
        <h2 class="text-2xl text-gray-950 leading-tight font-bold mt-2 md:text-4xl">
          Часто задаваемые вопросы
        </h2>
        <p class="text-base text-gray-600 leading-relaxed mt-4">
          Ответили на главные вопросы, которые помогают заранее понять стоимость, сроки и особенности установки натяжных потолков.
        </p>
      </div>

      <AccordionRoot
        class="mx-auto mt-9 max-w-4xl space-y-3"
        collapsible
        default-value="faq-0"
        type="single"
      >
        <AccordionItem
          v-for="(item, index) in faqItems"
          :key="item.question"
          :value="`faq-${index}`"
          class="group border border-gray-200 rounded-2xl bg-white shadow-[0_14px_34px_rgba(47,42,36,0.06)] transition-all duration-300 overflow-hidden data-[state=open]:border-blue-100 hover:border-blue-200 data-[state=open]:bg-blue-50/70 data-[state=open]:shadow-[0_22px_52px_rgba(184,154,114,0.16)] hover:shadow-[0_20px_46px_rgba(184,154,114,0.12)]"
        >
          <AccordionHeader>
            <AccordionTrigger class="px-5 py-5 text-left flex gap-4 min-h-18 w-full items-center justify-between sm:px-6 sm:py-5">
              <span class="text-base text-gray-950 leading-snug font-semibold sm:text-lg">
                {{ item.question }}
              </span>
              <span class="text-blue-600 rounded-full bg-blue-50 flex shrink-0 h-9 w-9 transition items-center justify-center group-data-[state=open]:bg-white group-data-[state=open]:rotate-45">
                +
              </span>
            </AccordionTrigger>
          </AccordionHeader>

          <AccordionContent class="data-[state=closed]:animate-out data-[state=open]:animate-in overflow-hidden">
            <div class="px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
              <p class="text-sm text-gray-600 leading-relaxed pt-4 border-t border-blue-100 sm:text-base">
                {{ item.answer }}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>

      <div class="mx-auto mt-8 p-5 border border-blue-100 rounded-2xl bg-white flex flex-col gap-4 max-w-4xl shadow-[0_18px_42px_rgba(47,42,36,0.06)] items-start justify-between sm:p-6 sm:flex-row sm:items-center">
        <p class="text-sm text-gray-600 leading-relaxed sm:text-base">
          Не нашли ответ на свой вопрос? Оставьте заявку — бесплатно проконсультируем и подскажем оптимальное решение.
        </p>
        <a
          href="#contacts"
          class="text-white font-semibold px-5 py-3 rounded-xl bg-blue-600 inline-flex shrink-0 shadow-blue-900/15 shadow-md transition hover:bg-blue-700 hover:shadow-lg"
        >
          Получить консультацию
        </a>
      </div>
    </div>
  </section>
  <!-- Контакты -->
  <section id="contacts" class="scroll-mt-16">
    <Contacs />
  </section>
</template>
