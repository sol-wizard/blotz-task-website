// Everything the /zh/kitchen page shows: who works in each room and what the AI helper does at night.
// People and duties come from the Lark「Blotz 人员」page. When someone joins or leaves, change PEOPLE
// (and CAST if they are a lead); when a nightly report is added or changed, change ROLES.night and TEAM_NEWS.

export type Zone = 'mkt' | 'guest' | 'feedback' | 'pm' | 'design' | 'dev' | 'ai' | 'learn' | 'meet' | 'board' | 'taste' | 'out' | 'pass' | 'night' | 'feedbot' | 'loop';

// Each thing has two names: what it is in the bun shop, and what it is in Blotz. The switch on the page picks one.
export const NAMES: Record<Zone, [string, string]> = {
  mkt: ['店小二', '宣传'],
  guest: ['客人', '用户'],
  feedback: ['意见箱', '用户反馈'],
  pm: ['掌柜', '产品经理'],
  design: ['捏褶师傅', '设计师'],
  dev: ['包子师傅', '开发'],
  ai: ['调馅师傅', 'AI 工程师'],
  learn: ['学徒', '新来的开发'],
  meet: ['开会的地方', '每周会议'],
  board: ['订单看板', '任务看板'],
  taste: ['试吃把关', '测试'],
  out: ['出餐口', '上线'],
  pass: ['报告栏', '报告中心'],
  night: ['报告机器人', 'AI 报告机器人'],
  feedbot: ['整理机器人', '反馈机器人'],
  loop: ['一圈', '迭代'],
};

const LARK = 'https://blotztask.jp.larksuite.com/wiki/';
export const LINKS = {
  pm: ['产品组的报告', LARK + 'Q4Sows6e7iJNvOkytr4jR6oUpth'],
  mkt: ['宣传组的报告', LARK + 'KxdRwbhjQiQ18nkFwCkjRRvRpbs'],
  design: ['设计组的报告', LARK + 'K2w9wXT7viUURRkLMiyjEgFGpNP'],
  all: ['全部报告', LARK + 'D9uZwa6Rri4r1fk2jvKjdckipMc'],
  testflight: ['下载 TestFlight', 'https://apps.apple.com/app/testflight/id899247664'],
  // where each team works; all of these need a team login, so they show nothing to anyone else
  devBoard: ['开发任务看板（GitHub）', 'https://github.com/orgs/Blotz-Org/projects/1'],
  pmTasks: ['产品设计组任务（Lark）', LARK + 'WhiIwywkoixlqgkxLibjGfTPpfc'],
  mktTasks: ['宣传组任务（Lark）', LARK + 'RXHgwFLmpiwrSpkj8HljZhjEpoh'],
} as const satisfies Record<string, readonly [string, string]>;


const MKT = '品牌、推广，提升 App 的曝光（微信、小红书、微博、LinkedIn、官网）';

// The leads, by name: [name, room, role, what they do]. Everyone else is listed by role in ROLES.
export const PEOPLE: [string, Zone, string, string][] = [
  ['Luna', 'mkt', '宣传负责人', '管理宣传团队；' + MKT],
  ['Kathie', 'pm', '产品经理', '产品 / 需求方向和优先级；代表产品方做决定'],
  ['Freya', 'pm', '产品经理', '管理产品设计团队；代表产品方做决定，定义产品方向和策略'],
  ['Li', 'design', '设计负责人', '管理设计团队，负责产品视觉和交互体验'],
  ['Zyx', 'dev', 'Tech Lead', '根据产品组的决定定每周开发目标，排活分活；跟设计组对接；架构和复杂功能的初版'],
  ['Nicole', 'learn', 'Tech Lead', '跟 Zyx 一样管技术团队，另外带新人'],
  ['Chen', 'ai', 'Tech Lead · 方案和 AI 架构', '负责技术方案和 AI 架构（V2 的 AI Coach）'],
];

// The other jobs in each room, without names, and the lists behind the things you can click: [label, short line]
export const ROLES: Partial<Record<Zone, [string, string][]>> = {
  taste: [['iPhone', '在 TestFlight 装 staging 测试版'], ['邀请', '加入团队时会收到 TestFlight 邀请']],
  meet: [['周六 12:00', '产品会'], ['周日 20:00', '开发周会'], ['每晚 21:00', 'Discord 5 分钟 check in']],
  board: [['Backlog', '可以拿'], ['Doing', '在做'], ['Review', '等 review'], ['Done', 'staging 测好了']],
};

// The loop painted on the floor: how a user's idea becomes a new version. who = the teams doing that step.
export type DeptId = 'dev' | 'pm' | 'design' | 'mkt';
export const LOOP: { word: string; line: string; who: DeptId[] }[] = [
  { word: '用户在用', line: '用户在用 App', who: [] },
  { word: '反馈', line: '用户留下反馈，宣传组收集', who: ['mkt'] },
  { word: '产品经理', line: '产品经理看反馈和数据，决定做什么', who: ['pm'] },
  { word: '产品会', line: '周六产品会，产品和开发一起定要做什么', who: ['pm', 'design'] },
  { word: '开发周会', line: '周日开发周会，定下周的开发任务', who: ['dev'] },
  { word: '拆任务', line: 'Tech Lead 拆成 PBI，分给开发', who: ['dev'] },
  { word: '开发', line: '开发用 AI 写代码，开 PR', who: ['dev'] },
  { word: '测试', line: 'PR review 通过后，在 staging 上测试', who: ['dev', 'design'] },
  { word: '上线', line: '发布新版本，用户更新后就能用', who: ['dev'] },
];

// The same loop in four parts, which is all the overview shows; the tour still goes step by step.
// at = the step where the part's number stands; who = the team whose colour it takes.
export const STAGES: { word: string; line: string; steps: number[]; at: number; who: DeptId }[] = [
  { word: '用户', line: '用户在用 App，留下反馈', steps: [0, 1], at: 0, who: 'mkt' },
  { word: '产品', line: '产品经理看反馈和数据，周六产品会定做什么', steps: [2, 3], at: 2, who: 'pm' },
  { word: '开发', line: '从周日开发周会到测试', steps: [4, 5, 6, 7], at: 6, who: 'dev' },
  { word: '上线', line: '发布新版本', steps: [8], at: 8, who: 'dev' },
];
export const stageOf = (step: number) => STAGES.findIndex(s => s.steps.includes(step));
// the teams that take part in a part of the loop
export const stageTeams = (i: number) => [...new Set(STAGES[i].steps.flatMap(s => LOOP[s].who))];

// One short page per team, shown when you click the team's part of the shop (the kitchen, AI lab and
// classroom are all the developers'). who = the leads to go to; rows = [label, one line]
export type Dept = { id: DeptId; name: string; place: string; color: string; view: Zone; who: string[]; rows: [string, string][]; links?: (keyof typeof LINKS)[] };
export const DEPTS: Dept[] = [
  {
    id: 'dev', name: '开发', place: '大后厨、AI 实验室、烹饪教室', color: '#3486F3', view: 'dev', who: ['Zyx', 'Nicole', 'Chen'],
    rows: [['开会', '周日 20:00 开发周会；每晚 21:00 Discord check in（5 分钟）'], ['任务', '领 PBI，用 AI 写代码、开 PR，review 过了在 staging 上测']], links: ['devBoard', 'testflight'],
  },
  {
    id: 'pm', name: '产品', place: '研发室', color: '#8b6ef6', view: 'pm', who: ['Kathie', 'Freya'],
    rows: [['开会', '周六 12:00 产品会'], ['任务', '看用户反馈和数据，决定做什么，在产品会上跟开发讲'], ['报告', '周五的会前提醒，每月的产品数据']], links: ['pmTasks', 'pm'],
  },
  {
    id: 'design', name: '设计', place: '设计室', color: '#f56767', view: 'design', who: ['Li'],
    rows: [['开会', '周六 12:00 产品会'], ['任务', '用 Figma 画页面，做好后在 staging 上检查']], links: ['pmTasks', 'design'],
  },
  {
    id: 'mkt', name: '宣传', place: '前厅和门外', color: '#f6b73c', view: 'mkt', who: ['Luna'],
    rows: [['任务', '运营小红书、官网和 Instagram，收集用户反馈'], ['报告', '每月 2 号的 Marketing 月报']], links: ['mktTasks', 'mkt'],
  },
];

// The two robots: what each does by itself, one line a job. [when or step, one line]
export const BOTS: Record<'night' | 'feedbot', { sub: string; jobs: [string, string][]; note?: string; links?: (keyof typeof LINKS)[] }> = {
  night: {
    sub: '自动写报告',
    jobs: [
      ['每周五', '开发进度'],
      ['每周五', '会前提醒，给周六产品会用'],
      ['每月 2 号', 'Marketing 月报'],
      ['每月 9 号', '产品数据月报'],
    ],
    links: ['all'],
  },
  feedbot: {
    sub: '自动整理用户反馈',
    jobs: [['每月 2 号', '把意见箱里的新反馈分类、合并，放到分拣台']],
    note: '还没开始用，等 App 里的反馈页上线',
  },
};

// Which new reports each team's page lists, by type in 报告中心 (开发进度 is written for product and marketing too)
export const TEAM_NEWS: Record<DeptId, string[]> = {
  dev: ['开发进度', '周会纪要'],
  pm: ['产品数据', '用户反馈', '开发进度', '周会纪要'],
  design: ['周会纪要'],
  mkt: ['Marketing 月报', '开发进度', '周会纪要'],
};

// Where a new report shows up in the kitchen, by its type in 报告中心
export const NEWS_ZONE: Record<string, Zone> = {
  周会纪要: 'meet',
  开发进度: 'dev',
  'Marketing 月报': 'mkt',
  产品数据: 'pm',
  用户反馈: 'feedback',
};

// What to go to each lead for
export const FIND: Record<string, string> = {
  Luna: '宣传、小红书、App Store 和 Google Play 页面',
  Kathie: '需求的方向和优先级',
  Freya: '进度管理总表、产品设计团队',
  Li: 'Figma 设计稿、页面长什么样',
  Zyx: '分活、PBI、技术问题',
  Nicole: '分活、PBI、技术问题、带新人',
  Chen: '技术方案、AI 功能',
};

// Who stands in the kitchen with a name: only the leads. null is an unnamed helper that fills the room.
export const CAST: Partial<Record<Zone, (string | null)[]>> = {
  mkt: ['Luna', null, null],
  pm: ['Kathie', 'Freya'],
  design: ['Li', null],
  dev: ['Zyx', null, null, null],
  ai: ['Chen'],
  learn: ['Nicole'],
};

// One short line for a thing, shown when it is clicked (empty when the card's list already says it).
export const ABOUT: Record<Zone, { text: string; links?: (keyof typeof LINKS)[] }> = {
  mkt: { text: '', links: ['mkt'] },
  guest: { text: '' },
  feedback: { text: '用户的反馈都放这里。', links: ['pm'] },
  pm: { text: '', links: ['pm'] },
  design: { text: '', links: ['design'] },
  dev: { text: '' },
  ai: { text: '' },
  learn: { text: '' },
  meet: { text: '时间都是悉尼时间。' },
  board: { text: '一张卡片就是一个 PBI。', links: ['devBoard'] },
  taste: { text: 'PR review 过了，装测试版在手机上试一遍。', links: ['testflight'] },
  out: { text: '' },
  pass: { text: '报告机器人写好的报告贴在这里。', links: ['pm', 'mkt', 'design', 'all'] },
  night: { text: '', links: ['all'] },
  feedbot: { text: '' },
  loop: { text: '' },
};
