// The latest reports in the Lark 报告中心 table, for the kitchen page's "new" marks. Only the title, type,
// date and Lark link leave Lark (the page is public); what a report says stays in Lark.

const DAYS = 90, MAX = 40;

const text = v => (Array.isArray(v) ? v.map(p => p.text ?? '').join('') : typeof v === 'string' ? v : v?.text ?? '');

/** @param {{ appId: string, appSecret: string, appToken: string, tableId: string, baseUrl?: string }} lark */
export async function latestReports({ appId, appSecret, appToken, tableId, baseUrl = 'https://open.larksuite.com' }) {
  async function call(path, opts = {}) {
    const res = await fetch(baseUrl + path, { ...opts, headers: { 'Content-Type': 'application/json', ...opts.headers } });
    const body = await res.json();
    if (body.code !== 0) throw new Error(`${path}: ${body.code} ${body.msg}`);
    return body;
  }
  const { tenant_access_token: token } = await call('/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST', body: JSON.stringify({ app_id: appId, app_secret: appSecret }),
  });
  const rows = [];
  let pageToken = '';
  do {
    const q = `page_size=500${pageToken ? `&page_token=${pageToken}` : ''}`;
    const { data } = await call(`/open-apis/bitable/v1/apps/${appToken}/tables/${tableId}/records?${q}`, { headers: { Authorization: `Bearer ${token}` } });
    rows.push(...(data.items || []));
    pageToken = data.has_more ? data.page_token : '';
  } while (pageToken);

  const since = Date.now() - DAYS * 864e5;
  return rows
    .map(r => ({ id: r.record_id, title: text(r.fields['报告']).trim(), kind: text(r.fields['类型']), date: r.fields['日期'] || 0, link: r.fields['链接']?.link || '' }))
    .filter(i => i.title && i.kind && !i.title.endsWith('（还没有）') && i.date >= since)
    .sort((a, b) => b.date - a.date)
    .slice(0, MAX)
    .map(i => ({ ...i, date: new Date(i.date).toISOString().slice(0, 10) }));
}
