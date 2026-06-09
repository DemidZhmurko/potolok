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
    question: 'Сколько примерно будет стоить мой потолок?',
    answer: 'Стоимость зависит от площади помещения, освещения, выбранного полотна и дополнительных элементов. Для удобства на сайте доступен предварительный калькулятор расчёта стоимости.',
  },
  {
    question: 'Какие потолки лучше выбрать для квартиры?',
    answer: 'Самыми популярными остаются матовые потолки — они выглядят аккуратно, подходят под любой интерьер и не создают лишних отражений. Для современных интерьеров также часто выбирают теневые потолки, скрытые гардины и магнитные треки.',
  },
  {
    question: 'Сколько времени занимает установка?',
    answer: 'В большинстве случаев монтаж одной комнаты занимает несколько часов. Более сложные проекты с подсветкой, треками или многоуровневыми конструкциями требуют дополнительного времени.',
  },
  {
    question: 'Какие гарантии вы предоставляете?',
    answer: 'Мы используем сертифицированные материалы от проверенных поставщиков и предоставляем гарантию как на полотно, так и на выполненные монтажные работы.',
  },
  {
    question: 'Что входит в стоимость потолка под ключ?',
    answer: 'В стоимость обычно входят материалы, комплектующие, монтажные работы и базовая установка потолка. Итоговая цена зависит от площади помещения, освещения и выбранных дополнительных решений.',
  },
]

// ✅ FAQ Schema (JSON-LD)
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
    class="bg-[url(/background.png)] flex min-h-[calc(82vh-64px)] items-center relative overflow-hidden bg-cover bg-center scroll-mt-16 lg:min-h-[86vh] sm:min-h-[78vh]"
  >
    <div class="bg-gray-950/58 inset-0 absolute z-0" aria-hidden="true" />
    <div class="bg-gradient-to-r inset-0 absolute z-0 from-gray-950/86 to-gray-950/18 via-gray-950/58" aria-hidden="true" />
    <div class="bg-gradient-to-t h-1/2 inset-x-0 bottom-0 absolute z-0 from-gray-950/55 to-transparent" aria-hidden="true" />

    <div class="mx-auto px-4 w-full relative z-10 container">
      <div class="text-white py-16 flex min-h-[calc(82vh-64px)] items-center lg:min-h-[86vh] sm:min-h-[78vh]">
        <div class="mx-auto text-center max-w-3xl space-y-6 md:mx-0 md:text-left lg:max-w-3xl md:max-w-2xl">
          <div class="text-sm text-blue-200 tracking-wide font-semibold uppercase">
            Натяжные потолки в Алматы под ключ
          </div>
          <h1 class="text-4xl leading-tight font-bold lg:text-6xl sm:text-5xl">
            Натяжные потолки под ключ в Алматы
          </h1>
          <p class="text-base text-gray-100 leading-relaxed mx-auto max-w-2xl sm:text-lg md:mx-0">
            Устанавливаем современные натяжные потолки с теневым профилем, магнитными треками, скрытыми гардинами и подсветкой — с материалами, монтажом и гарантией.
          </p>
          <div class="text-sm text-gray-100 flex flex-wrap gap-2.5 justify-center md:justify-start">
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Бесплатный замер</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Монтаж в ближайшее время</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Работаем без выходных</span>
            <span class="px-3 py-2 border border-white/18 rounded-lg bg-gray-950/35 shadow-sm backdrop-blur-sm">Сертифицированные полотна</span>
          </div>
          <div class="pt-2 flex flex-col gap-3 justify-center sm:flex-row md:justify-start">
            <a
              href="#contacts"
              class="text-white font-semibold px-6 py-3.5 rounded-xl bg-blue-600 inline-flex min-h-12 shadow-blue-900/15 shadow-md transition items-center justify-center hover:bg-blue-700 hover:shadow-lg"
            >
              Получить консультацию
            </a>
            <a
              href="#calc"
              class="text-white font-semibold px-6 py-3.5 border border-white/22 rounded-xl bg-white/10 inline-flex min-h-12 shadow-sm transition items-center justify-center backdrop-blur-sm hover:border-white/35 hover:bg-white/18"
            >
              Рассчитать стоимость
            </a>
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
          class="group border border-gray-200 rounded-2xl bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-all duration-300 overflow-hidden data-[state=open]:border-blue-100 hover:border-blue-200 data-[state=open]:bg-blue-50/70 data-[state=open]:shadow-[0_22px_52px_rgba(37,99,235,0.14)] hover:shadow-[0_20px_46px_rgba(37,99,235,0.12)]"
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

      <div class="mx-auto mt-8 p-5 border border-blue-100 rounded-2xl bg-white flex flex-col gap-4 max-w-4xl shadow-[0_18px_42px_rgba(15,23,42,0.06)] items-start justify-between sm:p-6 sm:flex-row sm:items-center">
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
