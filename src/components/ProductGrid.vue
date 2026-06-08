<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { computed, ref } from 'vue'
import PhoneInput from '~/components/Inputs/PhoneInput.vue'
import UsernameInput from '~/components/Inputs/UsernameInput.vue'
import { useTelegram } from '~/composables/useTelegramApi'

interface CeilingItem {
  title: string
  description: string
  detail: string
  price: string
  image: string
  benefits: string[]
  variants: string[]
}

const ceilings: CeilingItem[] = [
  {
    title: 'Матовые потолки',
    description: 'Спокойная классика без бликов для жилых комнат и офисов.',
    detail: 'Матовые потолки дают ровную спокойную поверхность и не отвлекают внимание от интерьера. Хороший выбор, если нужен чистый визуал без отражений и лишнего блеска.',
    price: 'от 2 500 ₸/м²',
    image: '/images/ceilings/matte.webp',
    benefits: ['Не бликуют', 'Подходят к большинству интерьеров', 'Визуально выравнивают потолок'],
    variants: ['Белое матовое полотно', 'Цветное матовое полотно', 'Матовый потолок со светильниками'],
  },
  {
    title: 'Глянцевые потолки',
    description: 'Отражающая поверхность, которая визуально добавляет высоту.',
    detail: 'Глянец помогает сделать комнату визуально выше и светлее. Особенно хорошо работает в небольших помещениях, коридорах, кухнях и ванных комнатах.',
    price: 'от 2 800 ₸/м²',
    image: '/images/ceilings/glossy.webp',
    benefits: ['Расширяют пространство', 'Легко очищаются', 'Хорошо отражают свет'],
    variants: ['Белый глянец', 'Цветной глянец', 'Глянец с точечным освещением'],
  },
  {
    title: 'Сатиновые потолки',
    description: 'Мягкий полуглянец с аккуратным светорассеиванием.',
    detail: 'Сатиновое полотно выглядит мягче глянца, но живее матовой поверхности. Это универсальный вариант для спокойного современного ремонта.',
    price: 'от 2 700 ₸/м²',
    image: '/images/ceilings/satin.webp',
    benefits: ['Деликатный блеск', 'Комфортны при вечернем освещении', 'Выглядят премиально'],
    variants: ['Сатин белый', 'Сатин цветной', 'Сатин с люстрой или треками'],
  },
  {
    title: 'Тканевые потолки',
    description: 'Фактурное полотно с ощущением окрашенной поверхности.',
    detail: 'Тканевые потолки выбирают за плотную фактуру и аккуратный внешний вид. Они хорошо подходят для жилых помещений и интерьеров, где важна благородная текстура.',
    price: 'от 4 500 ₸/м²',
    image: '/images/ceilings/fabric.webp',
    benefits: ['Благородная фактура', 'Не требуют нагрева при монтаже', 'Подходят для спокойных интерьеров'],
    variants: ['Классическое тканевое полотно', 'Фактурное полотно', 'Тканевый потолок со скрытым светом'],
  },
  {
    title: 'Парящие потолки',
    description: 'Световой контур по периметру создаёт эффект отделения от стен.',
    detail: 'Парящий потолок создаёт лёгкий современный эффект за счёт подсветки по периметру. Комната выглядит технологично, но без визуального перегруза.',
    price: 'от 5 500 ₸/м²',
    image: '/images/ceilings/floating.webp',
    benefits: ['Современный эффект', 'Мягкая вечерняя подсветка', 'Аккуратный стык со стенами'],
    variants: ['Парящий контур', 'Парящий потолок с RGB', 'Парящий потолок с матовым полотном'],
  },
  {
    title: 'Двухуровневые потолки',
    description: 'Комбинация уровней для зонирования и выразительной геометрии.',
    detail: 'Двухуровневые потолки помогают выделить зоны, скрыть коммуникации и сделать освещение более выразительным. Хорошо подходят для кухонь-гостиных и просторных комнат.',
    price: 'от 6 000 ₸/м²',
    image: '/images/ceilings/two-level.webp',
    benefits: ['Зонируют пространство', 'Скрывают коммуникации', 'Подчеркивают световые сценарии'],
    variants: ['Прямой второй уровень', 'Ниша под подсветку', 'Комбинация матового и глянцевого полотна'],
  },
  {
    title: 'Многоуровневые потолки',
    description: 'Сложная композиция для интерьеров с акцентной архитектурой.',
    detail: 'Многоуровневые решения делают потолок самостоятельной частью дизайна. Их используют там, где нужна выразительная геометрия, сложный свет и заметный интерьерный акцент.',
    price: 'от 7 500 ₸/м²',
    image: '/images/ceilings/multi-level.webp',
    benefits: ['Выразительный дизайн', 'Гибкая работа со светом', 'Подходит для сложных планировок'],
    variants: ['Несколько уровней', 'Комбинация форм', 'Многоуровневый потолок с подсветкой'],
  },
  {
    title: 'Теневые потолки',
    description: 'Минималистичный теневой зазор вместо классического плинтуса.',
    detail: 'Теневой профиль создаёт чистое современное примыкание к стене без галтелей. Это решение часто выбирают для минималистичных квартир и дизайнерских ремонтов.',
    price: 'от 5 000 ₸/м²',
    image: '/images/ceilings/shadow.webp',
    benefits: ['Без потолочного плинтуса', 'Чистая линия по периметру', 'Современный минимализм'],
    variants: ['Теневой профиль', 'Черный теневой зазор', 'Теневой потолок со скрытым светом'],
  },
  {
    title: 'Потолки с подсветкой',
    description: 'Скрытая или линейная подсветка для мягкого света без перегруза.',
    detail: 'Подсветка помогает создать несколько сценариев света: основной, вечерний, декоративный. Можно использовать световые линии, LED-ленты или скрытые ниши.',
    price: 'от 5 800 ₸/м²',
    image: '/images/ceilings/lighting.webp',
    benefits: ['Комфортный сценарный свет', 'Можно выделить зоны', 'Сочетается с современным интерьером'],
    variants: ['Световые линии', 'Скрытая LED-подсветка', 'Подсветка по периметру'],
  },
  {
    title: 'Фотопечать на потолке',
    description: 'Индивидуальное изображение на полотне для акцентного решения.',
    detail: 'Фотопечать позволяет сделать потолок индивидуальным: от спокойного неба до декоративного изображения. Подходит для детских, тематических комнат и акцентных зон.',
    price: 'от 6 500 ₸/м²',
    image: '/images/ceilings/photo-print.webp',
    benefits: ['Индивидуальный дизайн', 'Можно подобрать любой сюжет', 'Подходит для акцентных зон'],
    variants: ['Небо', 'Абстракция', 'Индивидуальный макет'],
  },
]

const { sendMessage } = useTelegram()

const isDialogOpen = ref(false)
const selectedIndex = ref(0)
const leadName = ref('')
const leadPhone = ref('')
const leadComment = ref('')
const isSending = ref(false)
const sendStatus = ref<'idle' | 'success' | 'error'>('idle')

const selectedCeiling = computed(() => ceilings[selectedIndex.value])
const canGoPrev = computed(() => selectedIndex.value > 0)
const canGoNext = computed(() => selectedIndex.value < ceilings.length - 1)
const canSend = computed(() => Boolean(leadName.value.trim() && leadPhone.value.trim()))

function openCeiling(index: number) {
  selectedIndex.value = index
  sendStatus.value = 'idle'
  isDialogOpen.value = true
}

function goPrev() {
  if (canGoPrev.value) {
    selectedIndex.value -= 1
    sendStatus.value = 'idle'
  }
}

function goNext() {
  if (canGoNext.value) {
    selectedIndex.value += 1
    sendStatus.value = 'idle'
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;')
}

function getPageUrl() {
  if (typeof window === 'undefined')
    return ''

  return window.location.href
}

function resetLeadForm() {
  leadName.value = ''
  leadPhone.value = ''
  leadComment.value = ''
}

async function sendCeilingRequest() {
  if (!canSend.value || isSending.value)
    return

  const item = selectedCeiling.value
  isSending.value = true
  sendStatus.value = 'idle'

  const requestedAt = new Date().toLocaleString('ru-RU')
  const comment = leadComment.value.trim() || 'Без комментария'
  const pageUrl = getPageUrl() || 'URL недоступен'

  const message = [
    '<b>Заявка с сайта натяжных потолков</b>',
    '',
    `<b>Тип потолка:</b> ${escapeHtml(item.title)}`,
    `<b>Имя клиента:</b> ${escapeHtml(leadName.value.trim())}`,
    `<b>Телефон:</b> ${escapeHtml(leadPhone.value.trim())}`,
    `<b>Комментарий:</b> ${escapeHtml(comment)}`,
    `<b>Страница заявки:</b> ${escapeHtml(pageUrl)}`,
    `<b>Дата и время:</b> ${escapeHtml(requestedAt)}`,
  ].join('\n')

  const ok = await sendMessage(message)

  isSending.value = false
  sendStatus.value = ok ? 'success' : 'error'

  if (ok)
    resetLeadForm()
}
</script>

<template>
  <section id="assortment" class="py-14 bg-gray-50 sm:py-16">
    <div class="mx-auto px-4 sm:px-6 container">
      <div class="mx-auto mb-10 text-center max-w-2xl">
        <h2 class="text-3xl text-gray-900 font-bold mb-4">
          Каталог натяжных потолков
        </h2>
        <p class="text-gray-600 leading-relaxed">
          Подберём полотно, профиль и освещение под интерьер, бюджет и особенности помещения.
        </p>
      </div>

      <div class="gap-5 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(item, index) in ceilings"
          :key="item.title"
          class="group border border-gray-200 rounded-xl bg-white flex flex-col h-full min-h-[350px] cursor-pointer shadow-sm transition overflow-hidden sm:min-h-[370px] hover:shadow-gray-900/12 hover:shadow-xl"
          role="button"
          tabindex="0"
          @click="openCeiling(index)"
          @keydown.enter.prevent="openCeiling(index)"
          @keydown.space.prevent="openCeiling(index)"
        >
          <div class="bg-gray-200 shrink-0 aspect-[16/10] relative overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full transition duration-500 object-cover group-hover:scale-105"
              loading="lazy"
            >
            <div class="bg-gradient-to-t inset-0 absolute from-gray-950/50 to-transparent via-gray-950/10" />
          </div>

          <div class="p-4 flex flex-1 flex-col">
            <h3 class="text-lg text-gray-900 leading-snug font-semibold">
              {{ item.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed mt-1.5 truncate">
              {{ item.description }}
            </p>
            <div class="text-gray-900 font-semibold mt-4">
              {{ item.price }}
            </div>

            <button
              class="text-sm text-white font-semibold mt-4 px-4 py-2.5 rounded-lg bg-blue-600 inline-flex shadow shadow-blue-900/15 transition justify-center sm:py-3 hover:bg-blue-700"
              type="button"
              @click.stop="openCeiling(index)"
            >
              Подробнее
            </button>
          </div>
        </article>
      </div>

      <DialogRoot v-model:open="isDialogOpen">
        <DialogPortal>
          <DialogOverlay class="bg-gray-950/60 inset-0 fixed z-[9998] backdrop-blur-sm" />
          <DialogContent
            class="p-0 border border-gray-200 rounded-xl bg-white max-h-[calc(100dvh-1rem)] max-w-4xl w-[calc(100vw-1rem)] shadow-2xl shadow-gray-950/25 left-1/2 top-1/2 fixed z-[9999] overflow-y-auto sm:max-h-[calc(100vh-2rem)] sm:w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2"
          >
            <div class="relative">
              <DialogClose
                class="text-gray-700 rounded-lg bg-white/90 flex h-10 w-10 shadow-md transition items-center right-3 top-3 justify-center absolute z-10 hover:text-gray-950 hover:bg-white"
                aria-label="Закрыть"
              >
                ×
              </DialogClose>

              <div class="p-4 gap-4 grid sm:p-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div class="border border-gray-200 rounded-xl bg-gray-100 max-h-[240px] aspect-[4/3] overflow-hidden md:max-h-[340px] sm:max-h-[300px]">
                  <img
                    :src="selectedCeiling.image"
                    :alt="selectedCeiling.title"
                    class="h-full w-full object-contain object-center"
                  >
                </div>

                <div class="min-w-0 space-y-4 md:pr-2">
                  <div>
                    <DialogTitle class="text-2xl text-gray-900 leading-tight font-bold sm:text-3xl">
                      {{ selectedCeiling.title }}
                    </DialogTitle>
                    <DialogDescription class="text-sm text-gray-600 leading-relaxed mt-2 sm:text-base">
                      {{ selectedCeiling.detail }}
                    </DialogDescription>
                  </div>

                  <div class="p-3 border border-blue-100 rounded-xl bg-blue-50/70">
                    <div class="text-xs text-blue-700 font-medium">
                      Примерная цена
                    </div>
                    <div class="text-xl text-gray-950 font-bold">
                      {{ selectedCeiling.price }}
                    </div>
                  </div>

                  <div class="gap-4 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2">
                    <div>
                      <h4 class="text-xs text-gray-900 tracking-wide font-semibold mb-2 uppercase">
                        Преимущества
                      </h4>
                      <ul class="space-y-1.5">
                        <li v-for="benefit in selectedCeiling.benefits" :key="benefit" class="text-sm text-gray-700 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 flex gap-2 items-center">
                          <span class="rounded-full bg-blue-600 shrink-0 h-1.5 w-1.5" />
                          <span>{{ benefit }}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 class="text-xs text-gray-900 tracking-wide font-semibold mb-2 uppercase">
                        Варианты
                      </h4>
                      <ul class="space-y-1.5">
                        <li v-for="variant in selectedCeiling.variants" :key="variant" class="text-sm text-gray-700 px-3 py-2 border border-gray-200 rounded-lg bg-white flex gap-2 items-center">
                          <span class="rounded-full bg-gray-400 shrink-0 h-1.5 w-1.5" />
                          <span>{{ variant }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-4 pb-4 space-y-3 sm:px-5 sm:pb-5">
                <div class="gap-2 grid grid-cols-2">
                  <button
                    class="text-sm text-gray-700 px-3 py-3 border border-gray-200 rounded-lg bg-white shadow-sm transition hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
                    type="button"
                    :disabled="!canGoPrev"
                    @click="goPrev"
                  >
                    ← Предыдущий
                  </button>
                  <button
                    class="text-sm text-gray-700 px-3 py-3 border border-gray-200 rounded-lg bg-white shadow-sm transition hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md"
                    type="button"
                    :disabled="!canGoNext"
                    @click="goNext"
                  >
                    Следующий →
                  </button>
                </div>

                <form class="p-3 border border-gray-200 rounded-xl bg-gray-50 space-y-3 sm:p-4" @submit.prevent="sendCeilingRequest">
                  <div class="gap-3 grid sm:grid-cols-2">
                    <UsernameInput v-model="leadName" />
                    <PhoneInput v-model="leadPhone" />
                  </div>

                  <textarea
                    v-model="leadComment"
                    class="text-base text-gray-900 px-4 py-3 border border-gray-300 rounded-lg bg-white min-h-18 w-full resize-y transition focus:outline-none focus:border-blue-500 hover:border-blue-400 sm:min-h-20 focus:ring-2 focus:ring-blue-200"
                    placeholder="Комментарий: площадь, комната, пожелания"
                  />

                  <button
                    type="submit"
                    class="text-white font-semibold px-5 py-3.5 rounded-lg bg-blue-600 w-full transition disabled:bg-gray-400 hover:bg-blue-700 disabled:cursor-not-allowed"
                    :disabled="!canSend || isSending"
                  >
                    {{ isSending ? 'Отправляем...' : 'Оставить заявку' }}
                  </button>

                  <p v-if="sendStatus === 'success'" class="text-sm text-green-700">
                    Заявка отправлена. Мы скоро свяжемся с вами.
                  </p>
                  <p v-if="sendStatus === 'error'" class="text-sm text-red-700">
                    Не удалось отправить заявку. Проверьте подключение или попробуйте ещё раз.
                  </p>
                </form>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </section>
</template>
