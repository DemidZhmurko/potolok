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
          title: 'Натяжные потолки в Алматы — монтаж под ключ | KONTUR',
          description: 'Натяжные потолки в Алматы под ключ. Матовые, глянцевые и сатиновые потолки. Бесплатный замер, монтаж за 1 день, гарантия до 15 лет.',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)
