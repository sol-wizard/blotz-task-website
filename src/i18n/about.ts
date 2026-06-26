export const defaultLocale = 'en';

export const aboutUi = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'title': 'Meet the Team',
    'subtitle': "We're a small, passionate team dedicated to helping people with ADHD thrive — one task at a time.",
    'design-role': 'Design',
    'design-desc': 'Crafting interfaces that feel calm, clear, and delightful for ADHD minds.',
    'marketing-role': 'Marketing',
    'marketing-desc': 'Connecting BlotzTask with the people who need it most and growing our community.',
    'dev-role': 'Engineering',
    'dev-desc': 'Building fast, reliable features that make the app feel effortless to use.',
    'product-role': 'Product',
    'product-desc': 'Shaping the vision, roadmap, and everything that makes BlotzTask tick.',
  },
  zh: {
    'nav-home': '首页',
    'nav-about': '关于',
    'title': '认识我们的团队',
    'subtitle': '我们是一支充满热情的小团队，致力于帮助ADHD人群茁壮成长——一次一个任务。',
    'design-role': '设计',
    'design-desc': '为ADHD用户打造平静、清晰、令人愉悦的界面体验。',
    'marketing-role': '市场',
    'marketing-desc': '将BlotzTask与最需要它的人连接，壮大我们的社区。',
    'dev-role': '工程',
    'dev-desc': '构建快速、可靠的功能，让应用使用起来毫不费力。',
    'product-role': '产品',
    'product-desc': '塑造产品愿景、路线图，以及让BlotzTask与众不同的一切。',
  },
} as const;

export type AboutLang = keyof typeof aboutUi;
export type AboutKey = keyof typeof aboutUi[typeof defaultLocale];
