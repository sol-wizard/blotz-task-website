// Meetings are kept in Sydney time. These turn them into real moments, then into words for whoever is looking,
// so daylight saving and the viewer's own time zone never need updating by hand.
import type { Meeting } from '../data/kitchen';

export const SYDNEY = 'Australia/Sydney';
const DAY = 864e5, HOUR = 36e5;
const WEEKDAY = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// the wall clock in a time zone at a moment, written as if it were UTC
function wall(at: number, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).formatToParts(at);
  const part = (type: string) => +parts.find(p => p.type === type)!.value;
  return Date.UTC(part('year'), part('month') - 1, part('day'), part('hour'), part('minute'));
}

// the moment a Sydney wall clock shows this time; twice, because the offset can change across daylight saving
function fromSydney(clock: number) {
  const at = clock - (wall(clock, SYDNEY) - clock);
  return clock - (wall(at, SYDNEY) - at);
}

// every time this meeting happens in the next week, soonest first. One that started under an hour ago still counts.
export function upcoming(m: Meeting, now = Date.now()) {
  const today = Math.floor(wall(now, SYDNEY) / DAY) * DAY;
  const out: number[] = [];
  for (let i = 0; i <= 7; i++) {
    const day = today + i * DAY;
    if (!m.days.includes(new Date(day).getUTCDay())) continue;
    const at = fromSydney(day + m.hour * HOUR);
    if (at + HOUR > now) out.push(at);
  }
  return out;
}

const clock = (at: number, tz: string) => new Date(wall(at, tz)).toISOString().slice(11, 16);
const weekday = (at: number, tz: string) => WEEKDAY[new Date(wall(at, tz)).getUTCDay()];
const dayNumber = (at: number, tz: string) => Math.floor(wall(at, tz) / DAY);

export const viewerZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || SYDNEY;
export const onSydneyTime = (tz: string, now = Date.now()) => wall(now, tz) === wall(now, SYDNEY);

// one moment, for the bar: 今天 09:00, 明天 09:00, 周日 17:00
export function whenLabel(at: number, tz: string, now = Date.now()) {
  const days = dayNumber(at, tz) - dayNumber(now, tz);
  return `${days === 0 ? '今天' : days === 1 ? '明天' : (days >= 7 ? '下' : '') + weekday(at, tz)} ${clock(at, tz)}`;
}

// a meeting's regular slot: 周六 09:00, 周一至五 18:00
export function weeklyLabel(m: Meeting, tz: string, now = Date.now()) {
  const next = upcoming(m, now);
  const onDay = (d: number) => next.find(at => new Date(wall(at, SYDNEY)).getUTCDay() === d)!;
  const first = onDay(m.days[0]), last = onDay(m.days[m.days.length - 1]);
  const days = first === last ? weekday(first, tz) : `${weekday(first, tz)}至${weekday(last, tz).slice(1)}`;
  return `${days} ${clock(first, tz)}`;
}

// the meetings with a link to join, the soonest first
export function nextMeetings(list: Meeting[], now = Date.now()) {
  return list.filter(m => m.link).map(m => ({ m, at: upcoming(m, now)[0] })).sort((a, b) => a.at - b.at);
}
