export const defaultLocale = 'en';

export const aboutUi = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'Our team',
    'page-title': 'Our team',
    'title': 'The Key People',
    'ceo-role': 'CEO & Product Lead',
    'ceo-tag': 'Product Manager · top global trading company',
    'ceo-bio': 'Katherine is a product manager at one of the world’s top trading companies, and has led product across multiple corporations. At BlotzTask she sets the product vision, pairing rigorous data with user-centric design.',
    'tech-role': 'Co-founder & Tech Lead',
    'tech-tag': 'Software architect · Monash University',
    'tech-bio': 'A mobile app expert and software architect, Nicole co-founded BlotzTask and leads the development team that builds the product.',
    'design-role': 'Lead UI/UX Designer',
    'design-tag': 'Designer at a top Australian SaaS company',
    'design-bio': "A product designer in Sydney, Guanghan has designed for a top Australian SaaS company. He crafts BlotzTask's clear, low-friction interfaces — modern, functional, and tuned for ADHD minds.",
    'marketing-role': 'Marketing Lead',
    'marketing-tag': 'Marketing · ByteDance',
    'marketing-bio': 'Luna works in marketing at ByteDance, where she ran a marketing project that brought in payments in the tens of millions in a single quarter. At BlotzTask she leads the marketing team. The Red Note posts you see are written by her team.',
    'connect': 'LinkedIn',
    'contact-title': 'More of our story',
    'contact-sub': 'We post the team’s everyday life and what is new in the app here.',
    'contact-rn-name': 'Red Note',
    'contact-li-name': 'LinkedIn',
    'contact-ig-name': 'Instagram',
  },
  zh: {
    'nav-home': '首页',
    'nav-about': '我们的团队',
    'page-title': '我们的团队',
    'title': '核心成员',
    'ceo-role': 'CEO 兼产品负责人',
    'ceo-tag': '产品经理 · 全球顶尖交易公司',
    'ceo-bio': 'Katherine 是世界顶级交易公司之一的产品经理，曾负责多家企业的产品工作。在 BlotzTask，她负责制定产品愿景，并将数据驱动与用户体验设计紧密结合。',
    'tech-role': '联合创始人兼技术负责人',
    'tech-tag': '软件架构师 · Monash University',
    'tech-bio': 'Nicole 是移动应用专家和软件架构师，也是 BlotzTask 的联合创始人。她负责带领开发团队，将产品从想法变成现实。',
    'design-role': 'UI/UX 设计负责人',
    'design-tag': '澳大利亚顶尖 SaaS 公司产品设计师',
    'design-bio': 'Guanghan 是一位常驻悉尼的产品设计师，曾任职于澳大利亚顶尖 SaaS 公司。他负责 BlotzTask 的产品设计，打造简洁、现代且易用的界面，让 ADHD 用户能够更轻松地专注于真正重要的事情。',
    'marketing-role': '市场负责人',
    'marketing-tag': '市场营销 · 字节跳动',
    'marketing-bio': 'Luna 在字节跳动从事市场营销工作，操盘过单季度支付千万级的营销项目。在 BlotzTask，她负责带领宣传团队。你看到的小红书帖子都是她的团队写的。',
    'connect': '领英',
    'contact-title': '更多我们的故事',
    'contact-sub': '包子团队的日常和产品的新进展，我们都发在这些地方。',
    'contact-rn-name': '小红书',
    'contact-li-name': 'LinkedIn',
    'contact-ig-name': 'Instagram',
  },
} as const;

// The team's story, shown above the member cards. [square brackets] mark the
// part of a headline that gets the highlighter.
export const aboutStory = {
  zh: {
    description: 'BlotzTask 团队的故事：一群爱玩 AI 的年轻人，用业余时间做了一个给 ADHD 人群用的 AI 任务 App。',
    heroTitle: '我们是一群[热爱 AI] 的年轻人',
    heroLead: '都是有想法、行动力超强的人，凑到一起，想给社区做点有意思的东西。',
    noteDay: '白天上班上课',
    noteNight: '晚上包子娱乐',
    storyTitle: '[我们的故事]',
    story: [
      'BlotzTask 最早是一群学生为了在澳洲攒经验、找工作开始做的一个小项目，选的方向是给 ADHD 人群用的任务 App。',
      '我们平时就很爱玩 AI，自己用得越多越觉得，这么好用的东西应该用到普通人每天都会遇到的事情上，让大家的日子好过一点。',
      'BlotzTask 就是这么来的。我们还在一点一点把它做好。',
    ],
    goalLabel: '我们的目标',
    goal: '做一个最简单、最干净的待办 App。',
    goalAfter: '再用 AI 给用它的人、给这个社区多带来一点价值。',
    teamTitle: '[核心成员]',
  },
  en: {
    description: 'The story of the BlotzTask team: young people who love playing with AI and build an AI task app for people with ADHD in their spare time.',
    heroTitle: 'We’re young people [who love AI]',
    heroLead: 'We all have ideas and get things done, and we got together to make something interesting for the community.',
    noteDay: 'Work or class by day',
    noteNight: 'Bun fun by night',
    storyTitle: '[Our story]',
    story: [
      'BlotzTask began as a small project by a group of students in Australia who wanted experience to help them find jobs. What we picked was a task app for people with ADHD.',
      'We like playing with AI, and the more we used it ourselves, the more we felt it should be helping with the ordinary things people deal with every day and making life a bit easier.',
      'That is how BlotzTask came about. We are still making it better, a little at a time.',
    ],
    goalLabel: 'Our goal',
    goal: 'Make the simplest, cleanest to-do app.',
    goalAfter: 'Then use AI to give the people who use it, and this community, a bit more value.',
    teamTitle: '[The key people]',
  },
} as const;

export type AboutLang = keyof typeof aboutUi;
export type AboutKey = keyof typeof aboutUi[typeof defaultLocale];
