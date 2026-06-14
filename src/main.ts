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
          host: 'https://kontur-v.kz',
          canonicalHost: 'https://kontur-v.kz',
        },
        () => ({
          title: 'Натяжные потолки в Алматы | Монтаж под ключ | Kontur',
          description: 'Натяжные потолки в Алматы под ключ. Бесплатный замер, расчет стоимости, теневые, парящие потолки и потолки с подсветкой.',
        }),
      ),
    )

    ctx.app.use(head)
    ctx.head = head
  },
)
