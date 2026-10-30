// Can a new person find what they need in the kitchen on a phone, within two taps? Each question lists the taps
// and the words that must then be on screen. When someone asks a question the kitchen should have answered, add it here.
// Run the site (npm run dev), then: npm run check:kitchen   (KITCHEN_URL points it somewhere else)
import { chromium } from 'playwright-core';

const URL = process.env.KITCHEN_URL || 'http://localhost:4321/zh/kitchen/';
const DEV_ROOM = { floor: [-4.5, -8] }; // a spot of bare kitchen floor, as [x, z] in the scene
const LAST_STOP = '#kz-tour-dots button:last-child';

const QUESTIONS = [
  { ask: '下一场会几点？', taps: [], see: ['09:00 产品会', '17:00 开发周会'] },
  { ask: '怎么进会，谁发链接？', taps: ['#kz-next'], see: ['Freya', '微信群', 'Discord 公告频道'] },
  { ask: '我该去哪个会？', taps: ['#kz-next'], see: ['设计负责人', 'Tech Lead 候选人', '开发定下周的任务'] },
  { ask: '会上做什么？', taps: ['#kz-next'], see: ['定下周的任务'] },
  { ask: '我第一件事做什么？', taps: ['#kz-play', LAST_STOP], see: ['你的下一步', '点你那组的房间'] },
  { ask: '有事找谁？', taps: [DEV_ROOM], see: ['找谁', 'Zyx', 'Nicole'] },
  { ask: '请假找谁？', taps: [DEV_ROOM], see: ['August'] },
];

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=metal', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2, timezoneId: 'Asia/Shanghai', locale: 'zh-CN' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));

// where a spot on the floor is on screen right now
const spotOnScreen = ([x, z]) => page.evaluate(([x, z]) => {
  const { camera } = window.__kitchen;
  const v = camera.position.clone().set(x, 0, z).project(camera);
  return [(v.x + 1) / 2 * innerWidth, (1 - v.y) / 2 * innerHeight];
}, [x, z]);

let failed = 0;
for (const { ask, taps, see } of QUESTIONS) {
  await page.goto(URL);
  await page.waitForFunction(() => window.__kitchen);
  await page.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove()); // it sits over the bar in dev mode
  await page.waitForTimeout(800);
  for (const tap of taps) {
    if (tap.floor) await page.touchscreen.tap(...await spotOnScreen(tap.floor));
    else await page.tap(tap);
    await page.waitForTimeout(tap === LAST_STOP ? 12000 : 1800);
  }
  const screen = await page.evaluate(() => ['.kz-bar', '.kz-card:not([hidden])', '.kz-tour:not([hidden])']
    .map(s => document.querySelector(s)?.innerText || '').join('\n'));
  const missing = see.filter(word => !screen.includes(word));
  if (missing.length) failed++;
  console.log(`${missing.length ? 'FAIL' : 'ok  '} ${ask} (${taps.length} ${taps.length === 1 ? 'tap' : 'taps'})${missing.length ? ` missing: ${missing.join('、')}` : ''}`);
}
for (const e of errors) { failed++; console.log('FAIL page error:', e); }
await browser.close();
console.log(failed ? `${failed} failed` : 'all answered within two taps');
process.exit(failed ? 1 : 0);
