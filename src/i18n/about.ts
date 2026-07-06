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
  },
  zh: {
    'nav-home': '首页',
    'nav-about': '我们的团队',
    'title': '核心成员',
    'subtitle': '打造 BlotzTask 的团队——一支专注的小团队，让 ADHD 任务管理更从容，一个功能一个功能地实现。',
    'ceo-role': 'CEO 兼产品负责人',
    'ceo-tag': '产品经理 · 世界顶级交易公司',
    'ceo-bio': 'Katherine 是世界顶级交易公司之一的产品经理，曾在多家企业担任产品经理。在 BlotzTask，她制定产品愿景，将严谨的数据与以用户为中心的设计相结合。',
    'tech-role': '联合创始人兼技术负责人',
    'tech-tag': '软件架构师 · Monash 大学',
    'tech-bio': 'Nicole 是一位移动应用专家兼软件架构师。她联合创立了 BlotzTask，并带领开发团队打造这款产品。',
    'design-role': 'UI/UX 设计负责人',
    'design-tag': '就职于澳洲顶尖 SaaS 公司',
    'design-bio': 'Guanghan 是一位常驻悉尼的产品设计师，曾为澳洲顶尖 SaaS 公司设计产品。他为 BlotzTask 打造清晰、低摩擦的界面——现代、实用，专为 ADHD 用户设计。',
    'connect': '领英',
    'contact-title': '关注我们',
    'contact-sub': '关注 BlotzTask，获取最新动态、赞助合作信息和社区资讯。',
    'contact-rn-name': '小红书',
    'contact-li-name': 'LinkedIn',
  },
} as const;

export type AboutLang = keyof typeof aboutUi;
export type AboutKey = keyof typeof aboutUi[typeof defaultLocale];
