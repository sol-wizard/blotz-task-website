const siteUrl = 'https://www.blotztask.com';

const paths = [
  '/',
  '/about',
  '/features/ai',
  '/features/task-management',
  '/features/gamified',
  '/join',
  '/privacy',
  '/roadmap',
  '/sponsor',
] as const;

const priorities: Record<string, string> = {
  '/': '1.0',
  '/features/ai': '0.8',
  '/features/task-management': '0.8',
  '/features/gamified': '0.8',
  '/about': '0.6',
  '/join': '0.6',
  '/privacy': '0.3',
  '/roadmap': '0.5',
  '/sponsor': '0.5',
};

const today = new Date().toISOString().slice(0, 10);

export function GET() {
  const urls = paths.flatMap((path) =>
    ['en', 'zh'].map((locale) => {
      const suffix = path === '/' ? '' : path;
      const pathname = `/${locale}${suffix}/`;
      const loc = new URL(pathname, siteUrl).toString();
      const enHref = new URL(`/en${suffix}/`, siteUrl).toString();
      const zhHref = new URL(`/zh${suffix}/`, siteUrl).toString();

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorities[path]}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${zhHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />
  </url>`;
    })
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
