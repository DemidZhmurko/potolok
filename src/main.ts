import { SchemaOrgUnheadPlugin } from '@unhead/schema-org'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import './styles/main.css'
import 'uno.css'

export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const head = createHead()

    head.use(
      SchemaOrgUnheadPlugin(
        {
          host: 'https://kontur.kz',
          canonicalHost: 'https://kontur.kz',
        },
        () => ({
          // Можно задать мета-данные по умолчанию
          title: 'KONTUR — натяжные потолки в Алматы',
          description: 'Современные потолочные решения для интерьера: натяжные потолки, теневые профили, скрытые гардины и подсветка.',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)
