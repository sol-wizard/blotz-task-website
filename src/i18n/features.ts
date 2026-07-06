export const defaultLocale = 'en';

export const featuresUi = {
  en: {
    // Task Management
    'tm-title': 'Task Management',
    'tm-sub': 'Simple, powerful task organisation built for the way ADHD minds work.',
    'tm-f1-badge': 'Quick & Simple',
    'tm-f1-title': 'Easy Create & Edit',
    'tm-f1-desc': 'Adding a task takes seconds. Tap, type, done. Edit anything on the fly — no required fields or confusing menus in the way.',
    'tm-f2-badge': 'Stay on Track',
    'tm-f2-title': 'Deadline Tracker',
    'tm-f2-desc': 'Set a deadline once and always see exactly how many days are left. A clear countdown keeps you focused without the panic of surprise due dates.',
    // AI Features
    'ai-title': 'AI Features',
    'ai-sub': 'Let AI do the heavy lifting — from capturing ideas to breaking them down and celebrating what you\'ve achieved.',
    'ai-f1-badge': 'Think out loud',
    'ai-f1-title': 'AI Voice Input',
    'ai-f1-desc': 'Just talk — or type what\'s on your mind into our AI chat. BlotzTask turns your stream of thought into organised, actionable tasks in seconds.',
    'ai-f2-badge': 'Start smaller',
    'ai-f2-title': 'AI Task Breakdown',
    'ai-f2-desc': 'Staring at a big task and can\'t get started? AI breaks it down into the easiest possible first step — something you can finish in under five minutes.',
    'ai-f3-badge': 'Celebrate wins',
    'ai-f3-title': 'AI Weekly & Monthly Review',
    'ai-f3-desc': 'Let AI summarise everything you\'ve accomplished this week or month. Get a clean progress report — and share it with friends to celebrate how much you\'ve done.',
    // Gamified
    'game-title': 'Gamified Features',
    'game-sub': 'Task management that feels like play — because motivation shouldn\'t always have to come from willpower alone.',
    'game-f1-badge': 'Break the freeze',
    'game-f1-title': 'Gachapon Machine',
    'game-f1-desc': 'Paralysed by choice? Spin the Gachapon machine and let it randomly pick one of your saved notes for you to tackle next. Sometimes the best way to start is to let go of the decision.',
    'game-f2-badge': 'Discover & collect',
    'game-f2-title': 'Secret Badges',
    'game-f2-desc': 'BlotzTask hides special badges throughout the app, waiting to be discovered. Download the app and see how many you can unlock.',
    // Shared CTA
    'feat-cta-title': 'Ready to get started?',
    'feat-cta-sub': 'Download BlotzTask and experience these features for yourself.',
  },
  zh: {
    // Task Management
    'tm-title': '任务管理',
    'tm-sub': '简单高效的任务管理方式，更符合 ADHD 用户的思考习惯。',

    'tm-f1-badge': '轻松记录',
    'tm-f1-title': '快速创建与编辑',
    'tm-f1-desc': '记录任务只需几秒。点一下、写下来、马上保存。没有复杂流程，也没有多余设置，让你的想法第一时间被保留下来。',

    'tm-f2-badge': '掌握进度',
    'tm-f2-title': '截止日期提醒',
    'tm-f2-desc': '设置一次截止日期，剩余时间一目了然。用清晰的倒计时帮助你提前规划，不再被临近截止日打得措手不及。',

    // AI Features
    'ai-title': 'AI 功能',
    'ai-sub': '把繁琐交给 AI，从记录灵感、拆解任务到回顾成果，让 AI 成为你的效率助手。',

    'ai-f1-badge': '想到就说',
    'ai-f1-title': 'AI 语音记录',
    'ai-f1-desc': '无论是语音还是文字，把脑海里的想法直接告诉 AI。BlotzTask 会自动整理成清晰、可执行的任务列表。',

    'ai-f2-badge': '轻松开始',
    'ai-f2-title': 'AI 智能拆解任务',
    'ai-f2-desc': '面对复杂任务不知道从哪开始？AI 会把任务拆解成一个个容易完成的小步骤，让开始行动变得更简单。',

    'ai-f3-badge': '记录成长',
    'ai-f3-title': 'AI 周报与月报',
    'ai-f3-desc': 'AI 自动整理你的每周和每月成果，生成清晰的进度回顾，也可以一键分享，与朋友一起见证你的成长。',

    // Gamified
    'game-title': '趣味功能',
    'game-sub': '把任务管理变得更有趣，因为坚持，不一定只能靠意志力。',

    'game-f1-badge': '告别纠结',
    'game-f1-title': '扭蛋机',
    'game-f1-desc': '不知道先做哪一件？让扭蛋机随机帮你决定下一项任务。有时候，开始行动，比反复纠结更重要。',

    'game-f2-badge': '探索惊喜',
    'game-f2-title': '隐藏徽章',
    'game-f2-desc': '下载 BlotzTask，看看你能解锁多少枚隐藏徽章。',

    // CTA
    'feat-cta-title': '开始体验 BlotzTask',
    'feat-cta-sub': '立即下载，开启更轻松、更高效的任务管理体验。',
  },
} as const;

export type FeaturesLang = keyof typeof featuresUi;
export type FeaturesKey = keyof typeof featuresUi[typeof defaultLocale];
