export type PolicyBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "link"; href: string; text: string }
  | { type: "email"; label: string; address: string };

export type PolicySection = {
  id: string;
  title: string;
  blocks: PolicyBlock[];
};

export type PolicyContent = {
  title: string;
  meta: string;
  description: string;
  intro: string[];
  summaryLabel: string;
  summary: string[];
  tocLabel: string;
  sections: PolicySection[];
};

const en: PolicyContent = {
  title: "Privacy Policy",
  meta: "Last updated: July 31, 2026 &nbsp;·&nbsp; Effective date: July 31, 2026",
  description:
    "Read the BlotzTask privacy policy to understand how we handle, protect, and use personal information and task data.",
  intro: [
    'This Policy applies only to Blotz ("we", "us", or "our"), the Blotz product, and related services.',
    "The security of your personal information is important to us. We collect and use your personal information in accordance with applicable laws and regulations so we can provide better products and services. We are committed to keeping your personal information and other data confidential and secure.",
    'Please read this Privacy Policy (the "Policy") carefully before using Blotz and related services. By using Blotz, you agree to this Policy.',
  ],
  summaryLabel: "In short",
  summary: [
    "We <strong>do not sell</strong> your tasks or notes to anyone, and we do not use them for advertising.",
    "Your account and task data are stored on servers in <strong>Australia</strong>.",
    "Your content is sent to Microsoft Azure OpenAI <strong>only when you choose to use an AI feature</strong>. Microsoft does not use it to train models.",
    "You can delete your account and all of your data at any time in <strong>Settings &gt; Account &gt; Delete Account</strong>.",
  ],
  tocLabel: "Contents",
  sections: [
    {
      id: "section-1",
      title: "1. How We Collect and Use Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "We follow the principles of legitimacy, lawfulness, and necessity. Based on the functions and services described below, we collect and use the personal information that you voluntarily provide while using the product and services.",
        },
        { type: "h3", text: "1. Account Registration" },
        { type: "p", text: "You can register and sign in to your Blotz account in the following ways:" },
        {
          type: "ul",
          items: [
            "<strong>Register with email:</strong> To create your account and allow future sign-in by email, we collect the email address you provide and send a verification email to confirm it.",
            "<strong>Register with a third-party account:</strong> If you choose to register with a third-party account such as Apple or Google, we obtain certain basic profile information from that platform, such as your nickname, avatar, and email address, in accordance with the relevant authorization agreement, so we can create your Blotz account.",
          ],
        },
        {
          type: "p",
          text: "Blotz does not offer a local-only mode without registration. You must register an account to use all Blotz features, and your task data will sync across your devices.",
        },
        { type: "h3", text: "2. App Features" },
        { type: "h4", text: "2.1 Task Data Sync" },
        {
          type: "p",
          text: "After you register an account and create tasks or other data, we collect the following information so your data can sync properly and completely across devices:",
        },
        {
          type: "ul",
          items: [
            "Task title, task content, priority, due date or time range, reminder time, and recurrence rules",
            "Quick note content",
            "Device information associated with editing actions, including device model, operating system version, and unique device identifier",
          ],
        },
        {
          type: "p",
          text: "We use this information only to sync your task data across devices. We do not read your task content for other purposes without your authorization.",
        },
        { type: "h4", text: "2.2 Task Reminders" },
        {
          type: "p",
          text: "If you set a reminder for a task in Blotz, we process the task title, task content, due date or time range, and reminder time so the app can notify you at the scheduled time.",
        },
        { type: "h4", text: "2.3 Search" },
        {
          type: "p",
          text: "If you use search in Blotz, we may collect the keywords you search for so you can view recent search history. These keywords are stored only locally on your device and are not synced to the cloud.",
        },
        { type: "h4", text: "2.4 AI Features" },
        {
          type: "p",
          text: "Some Blotz features are powered by artificial intelligence. We integrate Microsoft Azure OpenAI services for those features.",
        },
        {
          type: "p",
          text: "When you actively use an AI feature, we process only the content you choose to enter or select, such as task titles, task details, quick notes, tags, and date information. That data is transmitted to Azure OpenAI to generate content or suggestions related to your request.",
        },
        {
          type: "p",
          text: "Under Microsoft's default Azure OpenAI data handling policy, your prompts and completions are not used by Microsoft to train models and are not persistently stored after the API request is completed.",
        },
        {
          type: "link",
          href: "https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy",
          text: "Microsoft Azure OpenAI data privacy information →",
        },
        {
          type: "p",
          text: "Your input may be quoted, rewritten, or combined in the AI output to better complete the task you requested. All such processing is limited to what is needed to provide the feature. We do not use this data for unrelated purposes or for model training.",
        },
        {
          type: "p",
          text: "You decide whether to use AI features. If you choose not to use them, we will not trigger related collection, processing, or third-party transfer, and your use of other core services will not be affected.",
        },
        { type: "h4", text: "2.5 Profile Information" },
        {
          type: "p",
          text: "You may choose to complete your profile by providing an avatar and nickname. This information is optional and is not required for core product or system functionality. If you choose not to provide it, your use of Blotz will not be adversely affected.",
        },
        { type: "h4", text: "2.6 Analytics" },
        {
          type: "p",
          text: "We use PostHog, a third-party product analytics service, to understand how Blotz is used. PostHog receives your account identifier, email address, and display name so we can recognise the same person across devices and reinstalls.",
        },
        {
          type: "p",
          text: "We do not send the content of your tasks or notes to PostHog. PostHog processes this information on our behalf and is not permitted to use it for its own purposes.",
        },
        { type: "h3", text: "3. Permissions Requested in the App" },
        {
          type: "p",
          text: "Some features require system permissions that may involve personal information. We request authorization only when you use those features, and we access related information only after receiving your permission. You may refuse authorization if you do not need the feature.",
        },
        { type: "h4", text: "3.1 Android Permissions" },
        {
          type: "ul",
          items: [
            "<strong>Calendar access:</strong> Requested when you enable calendar sync so system calendar events can sync into Blotz.",
            "<strong>Write external storage:</strong> Requested when you save attachments from a task to your phone.",
            "<strong>Read external storage:</strong> Requested when you upload attachments to a task.",
            "<strong>Microphone access:</strong> Requested when you add audio attachments or use voice input.",
            "<strong>Fingerprint access:</strong> Requested when you enable fingerprint unlock for the app.",
            "<strong>Clipboard access:</strong> If you enable clipboard recognition and the clipboard contains time-related information, the app may ask whether you want to create a task when you open it.",
          ],
        },
        { type: "h4", text: "3.2 iOS Permissions" },
        {
          type: "ul",
          items: [
            "<strong>Calendar access:</strong> Requested when you enable calendar sync.",
            "<strong>Write external storage:</strong> Requested when you save attachments from a task to your phone.",
            "<strong>Read external storage:</strong> Requested when you upload attachments to a task.",
            "<strong>Microphone access:</strong> Requested when you add audio attachments or use voice input.",
            "<strong>Face ID / biometric access:</strong> Requested when you set an app unlock password and enable Face ID.",
            "<strong>Clipboard access:</strong> If you enable clipboard recognition and the clipboard contains time-related information, the app may ask whether you want to create a task when you open it.",
            "<strong>Siri access:</strong> Requested when you enable adding tasks through Siri.",
          ],
        },
        { type: "h3", text: "4. Third-Party SDKs and Services" },
        {
          type: "p",
          text: "Blotz uses the following third-party libraries and services to support core functionality:",
        },
        {
          type: "ul",
          items: [
            "<strong>Backend services (Microsoft / NuGet):</strong> Our backend is built with Microsoft NuGet components for server-side logic, data storage, and API communication.",
            "<strong>Frontend framework (React Native / Expo):</strong> Our mobile app frontend is built with React Native and Expo. These frameworks themselves do not independently collect your personal information and are used to provide the app interface and interactions.",
            "<strong>AI services (Microsoft Azure OpenAI):</strong> As described above, we use Microsoft Azure OpenAI for AI features. The Azure OpenAI server we use is located in US East.",
            "<strong>Product analytics (PostHog):</strong> Used to understand how Blotz is used, as described in section 2.6. PostHog processes this data on servers located in the United States.",
          ],
        },
        {
          type: "link",
          href: "https://privacy.microsoft.com/en-us/privacystatement",
          text: "Microsoft Privacy Statement →",
        },
        {
          type: "link",
          href: "https://posthog.com/privacy",
          text: "PostHog Privacy Policy →",
        },
        { type: "h3", text: "5. User Research and Community Activities" },
        {
          type: "p",
          text: "From time to time, we may conduct user research, mainly in the form of surveys. To better understand different user groups and improve our features and services, we may collect information such as age, gender, industry, occupation, device information, and personal interests from participants.",
        },
        {
          type: "p",
          text: "We may also run social media activities from time to time. To let users participate and receive prizes, we may collect information such as name, phone number, and mailing address.",
        },
        {
          type: "p",
          text: "This information is used only for the relevant activity. If you do not want to provide it, you may choose not to participate in the survey or activity.",
        },
      ],
    },
    {
      id: "section-2",
      title: "2. How We Use Cookies and Similar Technologies",
      blocks: [
        {
          type: "p",
          text: "A cookie is a small text file placed on a client device by a website server when you browse a website. When you visit the same site again, the site can recognize your browser through the cookie. Cookies may store user preferences and other information.",
        },
        {
          type: "p",
          text: "Blotz uses cookies as a convenience so you do not need to repeatedly verify your identity when moving between Blotz services. We use cookies to store preferences, improve user experience, and analyze service usage so we can improve service quality.",
        },
        {
          type: "p",
          text: "You can refuse cookies by changing your browser or device settings. If you do so, you may not be able to sign in to or use Blotz services or features that depend on cookies.",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. How We Share, Transfer, and Publicly Disclose Your Personal Information",
      blocks: [
        { type: "h3", text: "1. Sharing" },
        {
          type: "p",
          text: "We do not share your personal information with other companies, organizations, or individuals without your consent, except in the following cases:",
        },
        {
          type: "ul",
          items: [
            "<strong>With your explicit consent or authorization:</strong> After obtaining your explicit authorization, we may share your personal information with other parties, including AI service providers such as Microsoft Azure OpenAI.",
            "<strong>With service providers acting on our behalf:</strong> We share limited information with the providers listed in section 1.4, such as PostHog for product analytics, so they can perform those services for us. They may not use your information for their own purposes.",
            "<strong>Where required by law:</strong> We may share your personal information when required by laws and regulations, for dispute resolution, or in response to mandatory requests or judicial decisions from competent authorities.",
            "<strong>To protect legitimate interests:</strong> We may provide your personal information to third parties when necessary to protect Blotz, our users, or the public from harm to rights, property, or safety.",
          ],
        },
        { type: "h3", text: "2. Transfer" },
        {
          type: "p",
          text: "We do not transfer your personal information to any company, organization, or individual without your consent, except in the following cases:",
        },
        {
          type: "ul",
          items: [
            "With your explicit consent or authorization",
            "In the event of a merger, acquisition, or bankruptcy liquidation, in which case we will require the new holder of your personal information to continue to be bound by this Policy",
          ],
        },
        { type: "h3", text: "3. Public Disclosure" },
        {
          type: "p",
          text: "We do not publicly disclose your personal information without your consent, except in the following cases:",
        },
        {
          type: "ul",
          items: [
            "With your explicit consent or authorization",
            "When required by law, legal process, litigation, or mandatory requests from competent authorities, in which case we will apply security measures that meet legal and industry standards",
          ],
        },
      ],
    },
    {
      id: "section-4",
      title: "4. How We Store Your Personal Information",
      blocks: [
        { type: "h3", text: "1. Retention Period" },
        {
          type: "p",
          text: "While you use our platform, we will continue to retain your personal information for no longer than necessary to provide services to you. After you stop using the platform or withdraw relevant authorizations, we will delete or anonymize your information unless laws or regulations require a longer retention period for specific information.",
        },
        { type: "h3", text: "2. Storage Location" },
        {
          type: "p",
          text: "Our primary servers, including the servers that store your account and task data, are located in Australia.",
        },
        {
          type: "p",
          text: "Some features involve cross-border transfers. AI features use Microsoft Azure OpenAI services hosted in US East, and product analytics are processed by PostHog on servers located in the United States. In each case we transfer only the information described in the relevant section above, and we comply with applicable legal requirements and protect the security of your personal information.",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. How We Protect Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "The security of your personal information is very important to us. We comply with applicable laws and regulations and adopt reasonable and practical industry-recognized measures to protect your personal information against unauthorized access, disclosure, use, alteration, damage, or loss.",
        },
        {
          type: "p",
          text: "We use security measures that align with industry standards, including SSL/TLS encryption in transit, encryption technologies to protect confidentiality, and access control mechanisms to ensure that only authorized personnel can access personal information.",
        },
        {
          type: "p",
          text: "If a personal information security incident occurs, we will notify you in a timely manner as required by law, including the basic situation, possible impact, measures taken or to be taken, and suggestions for your own protection. We may notify you by email, push notification, or similar means.",
        },
      ],
    },
    {
      id: "section-6",
      title: "6. Your Rights to Manage Personal Information",
      blocks: [
        { type: "h3", text: "1. Access and Correction" },
        {
          type: "p",
          text: "You have the right to access and correct your personal information. You can do so in the following ways:",
        },
        {
          type: "ul",
          items: [
            "<strong>Profile information:</strong> Go to Settings &gt; Account to view or modify your avatar, nickname, email account, and login password.",
            "<strong>Search history:</strong> Open search to view or clear recent search keywords.",
          ],
        },
        { type: "h3", text: "2. Deletion" },
        {
          type: "p",
          text: "You may request deletion of your personal information in the following situations:",
        },
        {
          type: "ul",
          items: [
            "If our processing violates laws or regulations",
            "If we collect or use your personal information without your consent where consent is required",
            "If you no longer use our products or services, or you have closed your account",
            "If we no longer provide products or services to you",
          ],
        },
        {
          type: "p",
          text: "You can delete your account and all associated personal data in Settings &gt; Account &gt; Delete Account. After account deletion, we will stop providing services and delete your personal information as requested, unless otherwise required by law.",
        },
        { type: "h3", text: "3. Changing the Scope of Consent" },
        {
          type: "p",
          text: "For additional personal information collected based on your consent, you may give or withdraw that consent at any time. After you withdraw consent, we will stop processing the corresponding personal information, but this does not affect processing that was already carried out based on your prior authorization.",
        },
        { type: "h3", text: "4. Revoking System Permissions" },
        {
          type: "p",
          text: "You can revoke previously granted system permissions through your device settings:",
        },
        {
          type: "ul",
          items: [
            "<strong>Android:</strong> Settings &gt; Apps &gt; Blotz &gt; Permissions",
            "<strong>iOS:</strong> Settings &gt; Privacy &amp; Security &gt; select the relevant permission type and disable Blotz access, or Settings &gt; Apps &gt; Blotz &gt; disable the relevant permission",
          ],
        },
        {
          type: "p",
          text: "After you revoke a permission, we will no longer process related personal information based on that permission, but the corresponding feature may not work properly. This will not affect other core functions.",
        },
        { type: "h3", text: "5. Response Time" },
        {
          type: "p",
          text: "We will respond to your reasonable requests within 15 days. If you need help, please contact us using the information at the end of this Policy.",
        },
      ],
    },
    {
      id: "section-7",
      title: "7. How We Handle Minors' Personal Information",
      blocks: [
        {
          type: "p",
          text: "Our products and services are mainly intended for adults. If you are under 18 years old, please read this Policy with your guardian and use our services only after obtaining your guardian's consent.",
        },
        {
          type: "p",
          text: "If we discover that we collected a minor's personal information without verifiable guardian consent in advance, we will try to delete the relevant data as soon as possible.",
        },
      ],
    },
    {
      id: "section-8",
      title: "8. How This Policy Is Updated",
      blocks: [
        {
          type: "p",
          text: "This Privacy Policy may be updated from time to time. You should review it periodically to understand how we protect the personal information we collect. Your continued use of Blotz services constitutes your acceptance of this Privacy Policy and any updated versions.",
        },
        {
          type: "p",
          text: "For material changes, we may also provide more prominent notice explaining the specific changes. Material changes include, but are not limited to:",
        },
        {
          type: "ul",
          items: [
            "Major changes to our service model, such as the purpose, type, or method of processing personal information",
            "Major changes in our ownership structure or organizational structure",
            "Major changes to the main recipients of personal information sharing, transfer, or public disclosure",
            "Major changes to your rights relating to personal information processing and how those rights are exercised",
            "Changes to the department responsible for personal information security, contact methods, or complaint channels",
          ],
        },
      ],
    },
    {
      id: "section-9",
      title: "9. How to Contact Us",
      blocks: [
        {
          type: "p",
          text: "If you have any questions, comments, or suggestions about this Privacy Policy, please contact us at:",
        },
        { type: "email", label: "Email:", address: "blotztask.app@gmail.com" },
        { type: "p", text: "We will respond within 15 days after receiving your feedback." },
      ],
    },
  ],
};

const zh: PolicyContent = {
  title: "隐私政策",
  meta: "最后更新：2026 年 7 月 31 日 &nbsp;·&nbsp; 生效日期：2026 年 7 月 31 日",
  description:
    "阅读 BlotzTask 隐私政策，了解我们如何处理、保护和使用你的个人信息与任务数据。",
  intro: [
    "本政策仅适用于 Blotz（以下称「我们」）、Blotz 产品及相关服务。",
    "你的个人信息安全对我们很重要。我们会依照相关法律法规收集和使用你的个人信息，以便为你提供更好的产品和服务。我们承诺对你的个人信息及其他数据保密并妥善保管。",
    "在使用 Blotz 及相关服务前，请仔细阅读本隐私政策（以下称「本政策」）。使用 Blotz 即表示你同意本政策。",
  ],
  summaryLabel: "简单说",
  summary: [
    "我们<strong>不会把</strong>你的任务和笔记卖给任何人，也不会用于广告。",
    "你的账号和任务数据存储在<strong>澳大利亚</strong>的服务器上。",
    "只有在你<strong>主动使用 AI 功能</strong>时，相关内容才会发送给微软 Azure OpenAI。微软不会用它训练模型。",
    "你可以随时在<strong>「设置 &gt; 账户 &gt; 删除账户」</strong>删除账号和全部数据。",
  ],
  tocLabel: "目录",
  sections: [
    {
      id: "section-1",
      title: "1. 我们如何收集和使用你的个人信息",
      blocks: [
        {
          type: "p",
          text: "我们遵循正当、合法、必要的原则。基于下述功能与服务，我们会收集和使用你在使用产品与服务过程中主动提供的个人信息。",
        },
        { type: "h3", text: "1. 账号注册" },
        { type: "p", text: "你可以通过以下方式注册并登录 Blotz 账号：" },
        {
          type: "ul",
          items: [
            "<strong>邮箱注册：</strong>为了创建你的账号并支持后续通过邮箱登录，我们会收集你提供的邮箱地址，并发送验证邮件进行确认。",
            "<strong>第三方账号注册：</strong>如果你选择使用 Apple、Google 等第三方账号注册，我们会依据相应的授权协议，从该平台获取昵称、头像、邮箱地址等基础资料，用于创建你的 Blotz 账号。",
          ],
        },
        {
          type: "p",
          text: "Blotz 不提供无需注册的纯本地模式。你需要注册账号才能使用 Blotz 的全部功能，你的任务数据会在你的各个设备之间同步。",
        },
        { type: "h3", text: "2. 应用功能" },
        { type: "h4", text: "2.1 任务数据同步" },
        {
          type: "p",
          text: "在你注册账号并创建任务或其他数据后，为了让你的数据能够在设备之间完整、正常地同步，我们会收集以下信息：",
        },
        {
          type: "ul",
          items: [
            "任务标题、任务内容、优先级、截止日期或时间范围、提醒时间、重复规则",
            "快速笔记内容",
            "与编辑操作关联的设备信息，包括设备型号、操作系统版本、设备唯一标识",
          ],
        },
        {
          type: "p",
          text: "这些信息仅用于在设备之间同步你的任务数据。未经你的授权，我们不会为其他目的读取你的任务内容。",
        },
        { type: "h4", text: "2.2 任务提醒" },
        {
          type: "p",
          text: "如果你为任务设置了提醒，我们会处理任务标题、任务内容、截止日期或时间范围、提醒时间，以便应用在设定的时间通知你。",
        },
        { type: "h4", text: "2.3 搜索" },
        {
          type: "p",
          text: "如果你使用 Blotz 的搜索功能，我们可能会收集你搜索的关键词，以便你查看最近的搜索记录。这些关键词仅保存在你的设备本地，不会同步到云端。",
        },
        { type: "h4", text: "2.4 AI 功能" },
        {
          type: "p",
          text: "Blotz 的部分功能由人工智能提供支持。我们为这些功能接入了微软 Azure OpenAI 服务。",
        },
        {
          type: "p",
          text: "当你主动使用 AI 功能时，我们仅处理你选择输入或选中的内容，例如任务标题、任务详情、快速笔记、标签和日期信息。这些数据会传输至 Azure OpenAI，用于生成与你的请求相关的内容或建议。",
        },
        {
          type: "p",
          text: "根据微软 Azure OpenAI 的默认数据处理政策，你的输入和输出不会被微软用于训练模型，也不会在 API 请求完成后被持久化存储。",
        },
        {
          type: "link",
          href: "https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy",
          text: "微软 Azure OpenAI 数据隐私说明 →",
        },
        {
          type: "p",
          text: "为了更好地完成你请求的任务，你的输入可能会在 AI 输出中被引用、改写或组合。所有此类处理都限于提供该功能所必需的范围。我们不会将这些数据用于无关目的或模型训练。",
        },
        {
          type: "p",
          text: "是否使用 AI 功能由你决定。如果你选择不使用，我们不会触发相关的收集、处理或第三方传输，你使用其他核心服务也不会受到影响。",
        },
        { type: "h4", text: "2.5 个人资料" },
        {
          type: "p",
          text: "你可以选择填写头像和昵称来完善个人资料。这些信息是可选的，并非核心产品或系统功能所必需。即使你选择不提供，也不会影响你正常使用 Blotz。",
        },
        { type: "h4", text: "2.6 使用分析" },
        {
          type: "p",
          text: "我们使用第三方产品分析服务 PostHog，以了解 Blotz 的使用情况。PostHog 会收到你的账号标识、邮箱地址和昵称，以便我们在不同设备和重装之后识别为同一个人。",
        },
        {
          type: "p",
          text: "我们不会将你的任务和笔记内容发送给 PostHog。PostHog 仅代表我们处理这些信息，不得将其用于自身目的。",
        },
        { type: "h3", text: "3. 应用申请的权限" },
        {
          type: "p",
          text: "部分功能需要使用可能涉及个人信息的系统权限。我们只在你使用这些功能时申请授权，并且只有在获得你的许可后才会访问相关信息。如果你不需要该功能，可以拒绝授权。",
        },
        { type: "h4", text: "3.1 Android 权限" },
        {
          type: "ul",
          items: [
            "<strong>日历权限：</strong>在你开启日历同步时申请，用于将系统日历事件同步到 Blotz。",
            "<strong>写入外部存储：</strong>在你将任务中的附件保存到手机时申请。",
            "<strong>读取外部存储：</strong>在你向任务上传附件时申请。",
            "<strong>麦克风权限：</strong>在你添加音频附件或使用语音输入时申请。",
            "<strong>指纹权限：</strong>在你开启应用指纹解锁时申请。",
            "<strong>剪贴板权限：</strong>如果你开启了剪贴板识别，且剪贴板中包含时间相关信息，应用在打开时可能会询问你是否要创建任务。",
          ],
        },
        { type: "h4", text: "3.2 iOS 权限" },
        {
          type: "ul",
          items: [
            "<strong>日历权限：</strong>在你开启日历同步时申请。",
            "<strong>写入外部存储：</strong>在你将任务中的附件保存到手机时申请。",
            "<strong>读取外部存储：</strong>在你向任务上传附件时申请。",
            "<strong>麦克风权限：</strong>在你添加音频附件或使用语音输入时申请。",
            "<strong>Face ID / 生物识别权限：</strong>在你设置应用解锁密码并开启 Face ID 时申请。",
            "<strong>剪贴板权限：</strong>如果你开启了剪贴板识别，且剪贴板中包含时间相关信息，应用在打开时可能会询问你是否要创建任务。",
            "<strong>Siri 权限：</strong>在你开启通过 Siri 添加任务时申请。",
          ],
        },
        { type: "h3", text: "4. 第三方 SDK 与服务" },
        { type: "p", text: "Blotz 使用以下第三方库和服务来支持核心功能：" },
        {
          type: "ul",
          items: [
            "<strong>后端服务（Microsoft / NuGet）：</strong>我们的后端使用微软 NuGet 组件构建，用于服务端逻辑、数据存储和 API 通信。",
            "<strong>前端框架（React Native / Expo）：</strong>我们的移动应用前端基于 React Native 和 Expo 构建。这些框架本身不会独立收集你的个人信息，仅用于提供应用界面与交互。",
            "<strong>AI 服务（微软 Azure OpenAI）：</strong>如上所述，我们使用微软 Azure OpenAI 提供 AI 功能。我们使用的 Azure OpenAI 服务器位于美国东部。",
            "<strong>产品分析（PostHog）：</strong>用于了解 Blotz 的使用情况，详见 2.6 节。PostHog 在位于美国的服务器上处理这些数据。",
          ],
        },
        {
          type: "link",
          href: "https://privacy.microsoft.com/en-us/privacystatement",
          text: "微软隐私声明 →",
        },
        {
          type: "link",
          href: "https://posthog.com/privacy",
          text: "PostHog 隐私政策 →",
        },
        { type: "h3", text: "5. 用户调研与社区活动" },
        {
          type: "p",
          text: "我们可能会不定期开展用户调研，主要以问卷形式进行。为了更好地了解不同用户群体、改进我们的功能与服务，我们可能会向参与者收集年龄、性别、行业、职业、设备信息、个人兴趣等信息。",
        },
        {
          type: "p",
          text: "我们也可能不定期举办社交媒体活动。为了让用户参与活动并领取奖品，我们可能会收集姓名、电话号码、邮寄地址等信息。",
        },
        {
          type: "p",
          text: "这些信息仅用于相关活动。如果你不愿意提供，可以选择不参与该调研或活动。",
        },
      ],
    },
    {
      id: "section-2",
      title: "2. 我们如何使用 Cookie 及同类技术",
      blocks: [
        {
          type: "p",
          text: "Cookie 是你浏览网站时，网站服务器放置在客户端设备上的一个小型文本文件。当你再次访问同一网站时，网站可以通过 Cookie 识别你的浏览器。Cookie 中可能存储用户偏好等信息。",
        },
        {
          type: "p",
          text: "Blotz 使用 Cookie 是为了方便你在 Blotz 各项服务之间切换时无需反复验证身份。我们使用 Cookie 存储偏好设置、改善使用体验，并分析服务使用情况以提升服务质量。",
        },
        {
          type: "p",
          text: "你可以通过更改浏览器或设备设置来拒绝 Cookie。如果你这样做，可能无法登录或使用依赖 Cookie 的 Blotz 服务与功能。",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. 我们如何共享、转让、公开披露你的个人信息",
      blocks: [
        { type: "h3", text: "1. 共享" },
        {
          type: "p",
          text: "未经你的同意，我们不会与其他公司、组织或个人共享你的个人信息，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "<strong>在获得你的明确同意或授权后：</strong>在获得你的明确授权后，我们可能会与其他方共享你的个人信息，包括微软 Azure OpenAI 等 AI 服务提供商。",
            "<strong>代表我们提供服务的服务商：</strong>我们会与 1.4 节列出的服务商共享有限的信息，例如用于产品分析的 PostHog，以便他们为我们提供相应服务。他们不得将你的信息用于自身目的。",
            "<strong>法律法规要求时：</strong>在法律法规要求、解决争议，或应主管机关的强制性要求或司法裁决时，我们可能会共享你的个人信息。",
            "<strong>为保护合法权益：</strong>在为保护 Blotz、我们的用户或公众的权利、财产或安全免受损害而确有必要时，我们可能会向第三方提供你的个人信息。",
          ],
        },
        { type: "h3", text: "2. 转让" },
        {
          type: "p",
          text: "未经你的同意，我们不会将你的个人信息转让给任何公司、组织或个人，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "在获得你的明确同意或授权后",
            "在涉及合并、收购或破产清算时，我们会要求个人信息的新持有者继续受本政策约束",
          ],
        },
        { type: "h3", text: "3. 公开披露" },
        {
          type: "p",
          text: "未经你的同意，我们不会公开披露你的个人信息，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "在获得你的明确同意或授权后",
            "在法律、法律程序、诉讼或主管机关强制要求的情况下，此时我们会采取符合法律和行业标准的安全措施",
          ],
        },
      ],
    },
    {
      id: "section-4",
      title: "4. 我们如何存储你的个人信息",
      blocks: [
        { type: "h3", text: "1. 保存期限" },
        {
          type: "p",
          text: "在你使用我们平台期间，我们会持续保存你的个人信息，且不会超过为你提供服务所必需的期限。在你停止使用平台或撤回相关授权后，我们会删除或匿名化你的信息，法律法规对特定信息另有更长保存期限要求的除外。",
        },
        { type: "h3", text: "2. 存储位置" },
        {
          type: "p",
          text: "我们的主要服务器，包括存储你的账号和任务数据的服务器，位于澳大利亚。",
        },
        {
          type: "p",
          text: "部分功能会涉及跨境传输。AI 功能使用位于美国东部的微软 Azure OpenAI 服务，产品分析由 PostHog 在位于美国的服务器上处理。在每一种情况下，我们仅传输上文相应章节中所述的信息，并会遵守适用的法律要求、保护你个人信息的安全。",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. 我们如何保护你的个人信息",
      blocks: [
        {
          type: "p",
          text: "你的个人信息安全对我们非常重要。我们遵守适用的法律法规，并采取合理可行、符合行业公认标准的措施，保护你的个人信息免遭未经授权的访问、披露、使用、修改、损坏或丢失。",
        },
        {
          type: "p",
          text: "我们采用符合行业标准的安全措施，包括传输过程中的 SSL/TLS 加密、用于保护机密性的加密技术，以及确保只有获得授权的人员才能访问个人信息的访问控制机制。",
        },
        {
          type: "p",
          text: "如果发生个人信息安全事件，我们会按照法律要求及时告知你，包括事件的基本情况、可能造成的影响、已采取或将要采取的措施，以及你可以自主防范的建议。我们可能通过邮件、推送通知等方式通知你。",
        },
      ],
    },
    {
      id: "section-6",
      title: "6. 你管理个人信息的权利",
      blocks: [
        { type: "h3", text: "1. 访问与更正" },
        { type: "p", text: "你有权访问和更正你的个人信息，方式如下：" },
        {
          type: "ul",
          items: [
            "<strong>个人资料：</strong>进入「设置 &gt; 账户」查看或修改头像、昵称、邮箱账号和登录密码。",
            "<strong>搜索记录：</strong>打开搜索即可查看或清除最近的搜索关键词。",
          ],
        },
        { type: "h3", text: "2. 删除" },
        { type: "p", text: "在以下情况下，你可以请求删除你的个人信息：" },
        {
          type: "ul",
          items: [
            "我们的处理行为违反法律法规",
            "在需要同意的情况下，我们未经你的同意收集或使用你的个人信息",
            "你不再使用我们的产品或服务，或你已注销账号",
            "我们不再向你提供产品或服务",
          ],
        },
        {
          type: "p",
          text: "你可以在「设置 &gt; 账户 &gt; 删除账户」中删除你的账号及全部相关个人数据。账号删除后，我们会停止提供服务，并按你的要求删除你的个人信息，法律另有规定的除外。",
        },
        { type: "h3", text: "3. 改变授权范围" },
        {
          type: "p",
          text: "对于基于你的同意而收集的额外个人信息，你可以随时给予或撤回该同意。撤回同意后，我们会停止处理相应的个人信息，但这不影响此前基于你的授权已经进行的处理。",
        },
        { type: "h3", text: "4. 撤销系统权限" },
        { type: "p", text: "你可以通过设备设置撤销此前授予的系统权限：" },
        {
          type: "ul",
          items: [
            "<strong>Android：</strong>设置 &gt; 应用 &gt; Blotz &gt; 权限",
            "<strong>iOS：</strong>设置 &gt; 隐私与安全性 &gt; 选择相应权限类型并关闭 Blotz 的访问，或设置 &gt; 应用 &gt; Blotz &gt; 关闭相应权限",
          ],
        },
        {
          type: "p",
          text: "撤销权限后，我们将不再基于该权限处理相关个人信息，但对应功能可能无法正常使用。这不会影响其他核心功能。",
        },
        { type: "h3", text: "5. 响应时间" },
        {
          type: "p",
          text: "我们会在 15 天内响应你的合理请求。如需帮助，请通过本政策末尾的联系方式与我们联系。",
        },
      ],
    },
    {
      id: "section-7",
      title: "7. 我们如何处理未成年人的个人信息",
      blocks: [
        {
          type: "p",
          text: "我们的产品与服务主要面向成年人。如果你未满 18 周岁，请与监护人一起阅读本政策，并在取得监护人同意后再使用我们的服务。",
        },
        {
          type: "p",
          text: "如果我们发现在未事先取得可证实的监护人同意的情况下收集了未成年人的个人信息，我们会尽快删除相关数据。",
        },
      ],
    },
    {
      id: "section-8",
      title: "8. 本政策如何更新",
      blocks: [
        {
          type: "p",
          text: "本隐私政策可能会不定期更新。请你定期查阅，以了解我们如何保护所收集的个人信息。你继续使用 Blotz 服务，即表示接受本隐私政策及其更新版本。",
        },
        {
          type: "p",
          text: "对于重大变更，我们还可能通过更显著的方式告知你具体的变更内容。重大变更包括但不限于：",
        },
        {
          type: "ul",
          items: [
            "我们的服务模式发生重大变化，例如处理个人信息的目的、类型或方式",
            "我们的股权结构或组织架构发生重大变化",
            "个人信息共享、转让或公开披露的主要对象发生重大变化",
            "你在个人信息处理方面的权利及其行使方式发生重大变化",
            "负责个人信息安全的部门、联系方式或投诉渠道发生变化",
          ],
        },
      ],
    },
    {
      id: "section-9",
      title: "9. 如何联系我们",
      blocks: [
        {
          type: "p",
          text: "如果你对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：",
        },
        { type: "email", label: "邮箱：", address: "blotztask.app@gmail.com" },
        { type: "p", text: "我们会在收到你的反馈后 15 天内回复。" },
      ],
    },
  ],
};

export const privacy: Record<string, PolicyContent> = { en, zh };
