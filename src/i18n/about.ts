export const defaultLocale = 'en';

export const aboutUi = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'Our team',
    'title': 'The Key People',
    'subtitle': 'The people building BlotzTask — a small, focused team making ADHD task management calmer, one feature at a time.',
    'ceo-role': 'CEO & Product Lead',
    'ceo-tag': 'Product Manager · top global trading company',
    'ceo-bio': 'Katherine is a product manager at one of the world’s top trading companies, and has led product across multiple corporations. At BlotzTask she sets the product vision, pairing rigorous data with user-centric design.',
    'tech-role': 'Co-founder & Tech Lead',
    'tech-tag': 'Software architect · Monash University',
    'tech-bio': 'A mobile app expert and software architect, Nicole co-founded BlotzTask and leads the development team that builds the product.',
    'design-role': 'Lead UI/UX Designer',
    'design-tag': 'Designer at a top Australian SaaS company',
    'design-bio': "A product designer in Sydney, Guanghan has designed for a top Australian SaaS company. He crafts BlotzTask's clear, low-friction interfaces — modern, functional, and tuned for ADHD minds.",
    'connect': 'LinkedIn',
    'contact-title': 'Find us on',
    'contact-sub': 'Follow BlotzTask for updates, sponsor conversations, and community news.',
    'contact-rn-name': 'Red Note',
    'contact-li-name': 'LinkedIn',
    'contact-ig-name': 'Instagram',
  },
  zh: {
    'nav-home': '首页',
    'nav-about': '我们的团队',
    'title': '核心成员',
    'subtitle': '我们是一支小而专注的团队，持续打磨 BlotzTask，让任务管理变得更轻松、更从容。',
    'ceo-role': 'CEO 兼产品负责人',
    'ceo-tag': '产品经理 · 全球顶尖交易公司',
    'ceo-bio': 'Katherine 是世界顶级交易公司之一的产品经理，曾负责多家企业的产品工作。在 BlotzTask，她负责制定产品愿景，并将数据驱动与用户体验设计紧密结合。',
    'tech-role': '联合创始人兼技术负责人',
    'tech-tag': '软件架构师 · Monash University',
    'tech-bio': 'Nicole 是移动应用专家和软件架构师，也是 BlotzTask 的联合创始人。她负责带领开发团队，将产品从想法变成现实。',
    'design-role': 'UI/UX 设计负责人',
    'design-tag': '澳大利亚顶尖 SaaS 公司产品设计师',
    'design-bio': 'Guanghan 是一位常驻悉尼的产品设计师，曾任职于澳大利亚顶尖 SaaS 公司。他负责 BlotzTask 的产品设计，打造简洁、现代且易用的界面，让 ADHD 用户能够更轻松地专注于真正重要的事情。',
    'connect': '领英',
    'contact-title': '关注我们',
    'contact-sub': '关注 BlotzTask，获取最新产品动态、合作资讯和社区动态。',
    'contact-rn-name': '小红书',
    'contact-li-name': 'LinkedIn',
    'contact-ig-name': 'Instagram',
  },
} as const;

export type AboutLang = keyof typeof aboutUi;
export type AboutKey = keyof typeof aboutUi[typeof defaultLocale];
