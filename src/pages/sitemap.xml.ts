const siteUrl = 'https://www.blotztask.com';

const paths = [
  '/',
  '/about',
  '/join',
  '/fans',
  '/how-we-build',
  '/privacy',
  '/roadmap',
  '/sponsor',
  '/download',
  '/adhd-task-management-app',
  '/ai-task-breakdown',
  '/voice-to-task-app',
  '/deadline-tracker-for-adhd',
] as const;

const priorities: Record<string, string> = {
  '/': '1.0',
  '/about': '0.6',
  '/join': '0.6',
  '/fans': '0.6',
  '/how-we-build': '0.5',
  '/privacy': '0.3',
  '/roadmap': '0.5',
  '/sponsor': '0.5',
  '/download': '0.6',
  '/adhd-task-management-app': '0.7',
  '/ai-task-breakdown': '0.7',
  '/voice-to-task-app': '0.7',
  '/deadline-tracker-for-adhd': '0.7',
};

const today = new Date().toISOString().slice(0, 10);

export function GET() {
  const rootUrl = `
  <url>
    <loc>${new URL('/', siteUrl).toString()}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${new URL('/en/', siteUrl).toString()}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${new URL('/zh/', siteUrl).toString()}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL('/', siteUrl).toString()}" />
  </url>`;

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
    <xhtml:link rel="alternate" hreflang="x-default" href="${path === '/' ? new URL('/', siteUrl).toString() : enHref}" />
  </url>`;
    })
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${rootUrl}${urls.join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
