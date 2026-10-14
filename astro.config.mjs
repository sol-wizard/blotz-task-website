// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

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
});
