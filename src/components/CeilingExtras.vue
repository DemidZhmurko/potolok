<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

interface ServiceItem {
  title: string
  description: string
  image: string
  items: string[]
  detail: string
  variants: string[]
  suitableFor: string[]
}

const services: ServiceItem[] = [
  {
    title: 'Освещение для натяжных потолков',
    description: 'Подберём освещение под любой интерьер: от классических светильников до современных световых линий.',
    image: '/ceiling-extras/ceiling-lighting.webp',
    items: ['Точечные светильники', 'Световые линии', 'LED-подсветка', 'Трековые системы'],
    detail: 'Продумываем освещение до монтажа потолка: учитываем зоны комнаты, высоту, мебель, желаемую яркость и стиль интерьера. Поможем выбрать светильники, линии или подсветку так, чтобы потолок выглядел аккуратно и был удобен каждый день.',
    variants: ['Основной свет', 'Декоративная подсветка', 'Акцентные зоны', 'Комбинация люстры и точек'],
    suitableFor: ['Гостиные', 'Кухни', 'Спальни', 'Коридоры'],
  },
  {
    title: 'Карнизы и ниши для штор',
    description: 'Скрытые карнизы и ниши делают интерьер аккуратным, а шторы визуально выше и современнее.',
    image: '/ceiling-extras/curtain-niche.webp',
    items: ['Скрытый карниз', 'Ниша под шторы', 'Гардина от потолка', 'Аккуратный монтаж'],
    detail: 'Ниша под шторы скрывает карниз и делает линию окна визуально чище. Такое решение помогает интерьеру выглядеть дороже, а шторам — начинаться прямо из потолка без лишних деталей.',
    variants: ['Скрытая ниша', 'Профильный карниз', 'Подсветка зоны штор', 'Гардина от потолка'],
    suitableFor: ['Спальни', 'Гостиные', 'Детские', 'Панорамные окна'],
  },
  {
    title: 'Современное примыкание к стене',
    description: 'Сравните классическую галтель, аккуратную вставочную ленту и современный теневой профиль.',
    image: '/ceiling-extras/shadow-profile.webp',
    items: ['Вставочная лента', 'Теневой профиль', 'Без галтелей', 'Минимализм'],
    detail: 'Подберём примыкание под стиль ремонта: классическую вставочную ленту, теневой профиль или минималистичное решение без галтелей. Это влияет на то, насколько современно и чисто выглядит периметр потолка.',
    variants: ['Вставочная лента', 'Теневой профиль', 'Профиль без плинтуса', 'Минималистичный периметр'],
    suitableFor: ['Современные квартиры', 'Офисы', 'Минималистичные интерьеры', 'Ремонт без галтелей'],
  },
  {
    title: 'Премиум решения',
    description: 'Эффектные решения для современного интерьера: парящие потолки, RGB-подсветка и сценарии освещения.',
    image: '/ceiling-extras/premium-lighting.webp',
    items: ['Парящий потолок', 'RGB-подсветка', 'Умное освещение', 'Световые сценарии'],
    detail: 'Премиум-решения превращают потолок в полноценный элемент дизайна: можно добавить парящий контур, RGB-подсветку, разные сценарии света и управление со смартфона.',
    variants: ['Парящий контур', 'RGB-лента', 'Умные выключатели', 'Сценарии вечернего света'],
    suitableFor: ['Гостиные', 'Студии', 'Салоны', 'Современные спальни'],
  },
]
</script>

<template>
  <section id="ceiling-extras" class="py-20 bg-white">
    <div class="mx-auto px-4 container">
      <h2 class="text-3xl text-gray-900 font-bold mb-4 text-center">
        Дополнительные услуги
      </h2>
      <p class="text-gray-600 mx-auto mb-12 text-center max-w-2xl">
        Дополняем натяжные потолки светом, нишами, аккуратным примыканием и премиум-решениями под ваш интерьер.
      </p>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <DialogRoot v-for="service in services" :key="service.title">
          <article class="group rounded-xl bg-gray-900 min-h-[360px] shadow-sm transition duration-300 relative overflow-hidden hover:shadow-gray-900/20 hover:shadow-xl hover:-translate-y-1">
            <img
              :src="service.image"
              :alt="service.title"
              class="h-full w-full transition duration-500 inset-0 absolute object-cover group-hover:scale-105"
              loading="lazy"
            >
            <div class="bg-gradient-to-t inset-0 absolute from-gray-950 to-gray-950/20 via-gray-950/72" />
            <div class="p-6 flex flex-col h-full min-h-[360px] justify-end relative z-10 sm:p-7">
              <div>
                <h3 class="text-2xl text-white leading-tight font-bold">
                  {{ service.title }}
                </h3>
                <p class="text-sm text-gray-100 leading-relaxed mt-3 max-w-xl">
                  {{ service.description }}
                </p>

                <ul class="mt-5 flex flex-wrap gap-2">
                  <li
                    v-for="item in service.items"
                    :key="item"
                    class="text-xs text-white px-3 py-1.5 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    {{ item }}
                  </li>
                </ul>

                <DialogTrigger class="text-sm text-white font-semibold mt-6 px-5 py-2.5 rounded-lg bg-blue-600 inline-flex shadow shadow-blue-900/20 transition hover:bg-blue-700">
                  Подробнее
                </DialogTrigger>
              </div>
            </div>
          </article>

          <DialogPortal>
            <DialogOverlay class="bg-gray-950/60 inset-0 fixed z-[9998] backdrop-blur-sm" />
            <DialogContent class="p-0 border border-gray-200 rounded-xl bg-white max-h-[calc(100vh-2rem)] max-w-2xl w-[calc(100%-2rem)] shadow-2xl shadow-gray-950/25 left-1/2 top-1/2 fixed z-[9999] overflow-y-auto -translate-x-1/2 -translate-y-1/2">
              <div class="h-48 relative overflow-hidden">
                <img
                  :src="service.image"
                  :alt="service.title"
                  class="h-full w-full object-cover"
                  loading="lazy"
                >
                <div class="bg-gradient-to-t inset-0 absolute from-gray-950/80 to-gray-950/10" />
                <DialogClose
                  class="text-white rounded-lg bg-gray-950/35 flex h-10 w-10 transition items-center right-4 top-4 justify-center absolute hover:bg-gray-950/55"
                  aria-label="Закрыть"
                >
                  ×
                </DialogClose>
              </div>

              <div class="p-6 space-y-6 sm:p-8">
                <div>
                  <DialogTitle class="text-2xl text-gray-900 font-bold">
                    {{ service.title }}
                  </DialogTitle>
                  <DialogDescription class="text-gray-600 leading-relaxed mt-3">
                    {{ service.detail }}
                  </DialogDescription>
                </div>

                <div class="gap-5 grid md:grid-cols-2">
                  <div>
                    <h4 class="text-sm text-gray-900 tracking-wide font-semibold mb-3 uppercase">
                      Варианты решений
                    </h4>
                    <ul class="space-y-2">
                      <li
                        v-for="variant in service.variants"
                        :key="variant"
                        class="text-sm text-gray-700 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 flex gap-2 items-center"
                      >
                        <span class="rounded-full bg-blue-600 shrink-0 h-1.5 w-1.5" />
                        <span>{{ variant }}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 class="text-sm text-gray-900 tracking-wide font-semibold mb-3 uppercase">
                      Подходит для
                    </h4>
                    <ul class="space-y-2">
                      <li
                        v-for="place in service.suitableFor"
                        :key="place"
                        class="text-sm text-gray-700 px-3 py-2 border border-gray-200 rounded-lg bg-white flex gap-2 items-center"
                      >
                        <span class="rounded-full bg-gray-400 shrink-0 h-1.5 w-1.5" />
                        <span>{{ place }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="p-4 border border-gray-200 rounded-xl bg-gray-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div class="text-sm text-gray-500">
                      Консультация и расчёт
                    </div>
                    <div class="text-lg text-gray-900 font-semibold">
                      Подберём решение под ваш интерьер
                    </div>
                  </div>
                  <RequestModal />
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      </div>
    </div>
  </section>
</template>
