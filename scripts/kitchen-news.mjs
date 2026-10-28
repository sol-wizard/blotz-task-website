// Writes public/kitchen/news.json: the latest reports from the Lark 报告中心 table, so the kitchen page can
// show a red number where something new has come out. Only the title, type, date and Lark link go in the
// file (the page is public); what a report says stays in Lark.
// Run by .github/workflows/kitchen-news.yml, or by hand with the same environment variables.
import { writeFileSync } from 'node:fs';

const { LARK_APP_ID, LARK_APP_SECRET, REPORT_APP_TOKEN, REPORT_TABLE_ID } = process.env;
const BASE = process.env.LARK_BASE_URL || 'https://open.larksuite.com';
const OUT = new URL('../public/kitchen/news.json', import.meta.url);
const DAYS = 90, MAX = 40;
if (!LARK_APP_ID || !LARK_APP_SECRET || !REPORT_APP_TOKEN || !REPORT_TABLE_ID) {
  console.error('Missing LARK_APP_ID, LARK_APP_SECRET, REPORT_APP_TOKEN or REPORT_TABLE_ID.');
  process.exit(1);
}

async function call(path, opts = {}) {
  const res = await fetch(BASE + path, { ...opts, headers: { 'Content-Type': 'application/json', ...opts.headers } });
  const body = await res.json();
  if (body.code !== 0) throw new Error(`${path}: ${body.code} ${body.msg}`);
  return body;
}
const text = v => (Array.isArray(v) ? v.map(p => p.text ?? '').join('') : typeof v === 'string' ? v : v?.text ?? '');

const { tenant_access_token: token } = await call('/open-apis/auth/v3/tenant_access_token/internal', {
  method: 'POST', body: JSON.stringify({ app_id: LARK_APP_ID, app_secret: LARK_APP_SECRET }),
});
const rows = [];
let pageToken = '';
do {
  const q = `page_size=500${pageToken ? `&page_token=${pageToken}` : ''}`;
  const { data } = await call(`/open-apis/bitable/v1/apps/${REPORT_APP_TOKEN}/tables/${REPORT_TABLE_ID}/records?${q}`, { headers: { Authorization: `Bearer ${token}` } });
  rows.push(...(data.items || []));
  pageToken = data.has_more ? data.page_token : '';
} while (pageToken);

const since = Date.now() - DAYS * 864e5;
const items = rows
  .map(r => ({ id: r.record_id, title: text(r.fields['报告']).trim(), kind: text(r.fields['类型']), date: r.fields['日期'] || 0, link: r.fields['链接']?.link || '' }))
  .filter(i => i.title && i.kind && !i.title.endsWith('（还没有）') && i.date >= since)
  .sort((a, b) => b.date - a.date)
  .slice(0, MAX)
  .map(i => ({ ...i, date: new Date(i.date).toISOString().slice(0, 10) }));

writeFileSync(OUT, JSON.stringify({ items }, null, 1) + '\n');
console.log(`news.json: ${items.length} reports`);
