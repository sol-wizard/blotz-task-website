// @ts-check
import { defineConfig, envField } from 'astro/config';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: { prefixDefaultLocale: true },
  },
  // The three feature pages were folded into the home page; old links land on its feature section.
  redirects: {
    '/zh/features/ai': '/zh/#features',
    '/zh/features/task-management': '/zh/#features',
    '/zh/features/gamified': '/zh/#features',
    '/en/features/ai': '/en/#features',
    '/en/features/task-management': '/en/#features',
    '/en/features/gamified': '/en/#features',
  },
  integrations: [icon()],
  // Pages stay static; only routes with `prerender = false` (the kitchen news endpoint) run on demand on Vercel.
  adapter: vercel(),
  // The Lark app and 报告中心 table that /api/kitchen-news reads. Set in Vercel's project settings; server-only.
  env: {
    schema: {
      LARK_APP_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      LARK_APP_SECRET: envField.string({ context: 'server', access: 'secret', optional: true }),
      REPORT_APP_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      REPORT_TABLE_ID: envField.string({ context: 'server', access: 'secret', optional: true }),
      LARK_BASE_URL: envField.string({ context: 'server', access: 'secret', default: 'https://open.larksuite.com' }),
    },
  },
});
