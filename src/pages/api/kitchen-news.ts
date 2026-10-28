// GET /api/kitchen-news: the newest reports from the Lark 报告中心, read when the kitchen page asks.
// Rendered on demand (the rest of the site stays static), so a new report shows up without a redeploy.
// Vercel's CDN keeps each answer for 5 minutes and serves the last one while it fetches a fresh copy.
import type { APIRoute } from 'astro';
import { LARK_APP_ID, LARK_APP_SECRET, REPORT_APP_TOKEN, REPORT_TABLE_ID, LARK_BASE_URL } from 'astro:env/server';
import { latestReports } from '../../lib/lark-reports.mjs';

export const prerender = false;

const json = (body: unknown, status: number, cache: string) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache } });

export const GET: APIRoute = async () => {
  if (!LARK_APP_ID || !LARK_APP_SECRET || !REPORT_APP_TOKEN || !REPORT_TABLE_ID) {
    return json({ items: [], error: 'not configured' }, 503, 'no-store');
  }
  try {
    const items = await latestReports({
      appId: LARK_APP_ID, appSecret: LARK_APP_SECRET, appToken: REPORT_APP_TOKEN, tableId: REPORT_TABLE_ID, baseUrl: LARK_BASE_URL,
    });
    return json({ items }, 200, 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
  } catch (err) {
    console.error('kitchen-news:', err);
    return json({ items: [], error: 'lark unavailable' }, 502, 'no-store');
  }
};
