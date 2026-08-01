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
    "We collect and use your personal information in accordance with applicable laws and regulations, and we keep your personal information and other data confidential and secure.",
    'Please read this Privacy Policy (the "Policy") carefully before using Blotz and related services. By using Blotz, you agree to this Policy.',
  ],
  tocLabel: "Contents",
  sections: [
    {
      id: "section-1",
      title: "1. How We Collect and Use Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "We follow the principles of legitimacy, lawfulness, and necessity. For the features and services listed below, we collect and use the personal information you provide yourself while using Blotz.",
        },
        { type: "h3", text: "A. Account Registration" },
        {
          type: "p",
          text: "Signing in is handled by Auth0, our identity provider. We collect the email address you register with, and Auth0 holds your sign-in credentials on our behalf. We use the address to create your account and to sign you in afterwards.",
        },
        {
          type: "p",
          text: "Blotz has no account-free local mode. You need an account to use all Blotz features, and your task data syncs across your devices.",
        },
        { type: "h3", text: "B. App Features" },
        { type: "h4", text: "B.1 Task Data Sync" },
        {
          type: "p",
          text: "Once you have an account and start creating tasks or other data, we collect the following so your data syncs correctly and completely across your devices:",
        },
        {
          type: "ul",
          items: [
            "Task title, task details, due date or time range, reminder time, and recurrence rules",
            "Quick note content",
          ],
        },
        {
          type: "p",
          text: "We use this only to sync your task data across devices. Without your authorization, we do not read your task content for anything else.",
        },
        { type: "h4", text: "B.2 Task Reminders" },
        {
          type: "p",
          text: "If you set a reminder for a task, we process the task title, task details, due date or time range, and reminder time so the app can notify you at the right moment.",
        },
        {
          type: "p",
          text: "To deliver the notification we also store a push token issued by Expo's push service, along with an identifier for the device it belongs to, so the reminder reaches the right phone.",
        },
        { type: "h4", text: "B.3 AI Features" },
        {
          type: "p",
          text: "Blotz's AI features rely on two outside services. Text you write goes to Microsoft Azure OpenAI, and voice recordings go to Groq to be turned into text. Both handle it on our behalf, and Microsoft does not use it to train models.",
        },
        {
          type: "link",
          href: "https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy",
          text: "Microsoft Azure OpenAI data privacy information →",
        },
        {
          type: "link",
          href: "https://groq.com/privacy-policy/",
          text: "Groq Privacy Policy →",
        },
        {
          type: "p",
          text: "What you send to the AI, and the tasks and notes it generates, are also included in our usage analytics. See Analytics (B.5).",
        },
        {
          type: "p",
          text: "Using AI is your choice. If you choose not to, none of this happens, and the rest of Blotz works as normal.",
        },
        { type: "h4", text: "B.4 Profile Information" },
        {
          type: "p",
          text: "You can pick an avatar from the set built into the app and set a display name. There is no photo upload — the avatars ship with Blotz, and we record only which one you chose. Both are optional, and Blotz works the same if you skip them.",
        },
        { type: "h4", text: "B.5 Analytics" },
        {
          type: "p",
          text: "We use an outside analytics service to understand how Blotz is used. It receives your account identifier, email address, display name and device system details, your AI conversations and what the AI produced from them, and a replay of what you did inside the app.",
        },
        {
          type: "p",
          text: "It handles all of this on our behalf and may not use it for its own purposes.",
        },
        { type: "h3", text: "C. Permissions Requested in the App" },
        {
          type: "p",
          text: "Some features need permission from your phone, and those permissions can touch personal information. We ask only when you use the feature, and we look at the related information only after you say yes. If you do not need the feature, you can say no.",
        },
        { type: "h4", text: "C.1 Android Permissions" },
        {
          type: "ul",
          items: [
            "<strong>Microphone:</strong> Requested when you use voice input to create a task.",
            "<strong>Notifications:</strong> Requested so we can deliver the reminders you set.",
          ],
        },
        { type: "h4", text: "C.2 iOS Permissions" },
        {
          type: "ul",
          items: [
            "<strong>Microphone:</strong> Requested when you use voice input to create a task.",
            "<strong>Notifications:</strong> Requested so we can deliver the reminders you set.",
          ],
        },
        { type: "h3", text: "D. Third-Party SDKs and Services" },
        {
          type: "p",
          text: "Blotz relies on the following third-party libraries and services:",
        },
        {
          type: "ul",
          items: [
            "<strong>Sign-in (Auth0):</strong> Auth0 runs the sign-in screen and holds your sign-in credentials on our behalf.",
            "<strong>Backend services (Microsoft):</strong> Our servers are built on Microsoft's .NET stack and run on Microsoft Azure, which is also where server logs are collected.",
            "<strong>App framework (React Native / Expo):</strong> The app is built with React Native and Expo. They make up what you see and tap. Expo's push service issues the token used to deliver your reminders.",
            "<strong>AI (Microsoft Azure OpenAI):</strong> As described above, typed AI content is processed by Microsoft Azure OpenAI. The Azure OpenAI server we use is located in US East.",
            "<strong>Speech to text (Groq):</strong> Voice recordings are sent to Groq to be transcribed. Groq processes them on our behalf.",
            "<strong>Product analytics (PostHog):</strong> Used to see how Blotz is used, as described in Analytics (B.5). PostHog processes this data on servers located in the United States.",
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
        { type: "h3", text: "E. User Research and Community Activities" },
        {
          type: "p",
          text: "We sometimes run user research, usually a survey. If you take part, we may collect information such as your age, gender, industry, occupation, device information, and personal interests, so we can understand who uses Blotz and improve our features and services.",
        },
        {
          type: "p",
          text: "We also sometimes run activities on social media. To let you take part and send you a prize, we may collect information such as your name, phone number, and mailing address.",
        },
        {
          type: "p",
          text: "We use this information only for that survey or activity. If you would rather not give it, you can choose not to take part.",
        },
      ],
    },
    {
      id: "section-2",
      title: "2. How We Use Cookies and Similar Technologies",
      blocks: [
        {
          type: "p",
          text: "A cookie is a small text file a website saves in your browser so it can recognise you when you come back.",
        },
        {
          type: "p",
          text: "The Blotz app is not a website and does not use cookies. This site sets no cookies of its own either, so there is nothing here for you to accept or refuse.",
        },
        {
          type: "p",
          text: "The site does load its fonts from Google Fonts, which means your browser requests those files from Google and Google sees the request. If we ever add cookies for sign-in or analytics on the web, we will update this section before turning them on.",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. How We Share, Transfer, and Publicly Disclose Your Personal Information",
      blocks: [
        { type: "h3", text: "A. Sharing" },
        {
          type: "p",
          text: "We do not share your personal information with other companies, organizations, or individuals without your consent, except in these cases:",
        },
        {
          type: "ul",
          items: [
            "<strong>With your explicit consent or authorization:</strong> Once you have explicitly authorized it, we may share your personal information with other parties, including AI service providers such as Microsoft Azure OpenAI.",
            "<strong>With service providers acting on our behalf:</strong> We share limited information with the providers listed in Third-Party SDKs and Services (D) so they can do that work for us. They may not use your information for their own purposes.",
            "<strong>Where required by law:</strong> We may share your personal information when laws and regulations require it, to resolve a dispute, or in response to a mandatory request or judicial decision from a competent authority.",
            "<strong>To protect legitimate interests:</strong> We may give your personal information to a third party where that is necessary to protect Blotz, our users, or the public from harm to rights, property, or safety.",
          ],
        },
        { type: "h3", text: "B. Transfer" },
        {
          type: "p",
          text: "We do not transfer your personal information to any company, organization, or individual without your consent, except in these cases:",
        },
        {
          type: "ul",
          items: [
            "With your explicit consent or authorization",
            "In a merger, acquisition, or bankruptcy liquidation, in which case we will require the new holder of your personal information to stay bound by this Policy",
          ],
        },
        { type: "h3", text: "C. Public Disclosure" },
        {
          type: "p",
          text: "We do not publicly disclose your personal information without your consent, except in these cases:",
        },
        {
          type: "ul",
          items: [
            "With your explicit consent or authorization",
            "Where required by law, legal process, litigation, or a mandatory request from a competent authority, in which case we will apply security measures that meet legal and industry standards",
          ],
        },
      ],
    },
    {
      id: "section-4",
      title: "4. How We Store Your Personal Information",
      blocks: [
        { type: "h3", text: "A. Retention Period" },
        {
          type: "p",
          text: "We keep your personal information for no longer than we need it to provide the service. After you stop using the platform or withdraw the relevant authorizations, we delete your information or anonymize it, meaning we strip out anything that points back to you. The exception is information that laws or regulations require us to keep for longer.",
        },
        { type: "h3", text: "B. Storage Location" },
        {
          type: "p",
          text: "Our main servers, including the ones holding your account and task data, are located in Australia.",
        },
        {
          type: "p",
          text: "Some features send data overseas. AI features use Microsoft Azure OpenAI hosted in US East, and product analytics are processed by PostHog on servers located in the United States. In each case we send only the information described in the relevant section above, and we comply with applicable legal requirements and protect the security of your personal information.",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. How We Protect Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "Keeping your information safe is our job. We follow applicable laws and take practical steps to stop anyone from reading, leaking, changing, or losing your information without permission.",
        },
        {
          type: "p",
          text: "In practice, that means three things:",
        },
        {
          type: "ul",
          items: [
            "<strong>On the way to us:</strong> everything sent between the app and our servers is scrambled, the same way online banking is, so it cannot be read if someone intercepts it. The technology is called SSL/TLS.",
            "<strong>Once it is stored:</strong> your data stays encrypted on our servers, so it is not readable as plain text.",
            "<strong>Inside our team:</strong> only the people who genuinely need access to do their job can reach your information.",
          ],
        },
        {
          type: "p",
          text: "If something does go wrong and your information is exposed, we will tell you as quickly as the law requires: what happened, how it may affect you, what we have already done and plan to do about it, and what you can do to protect yourself. We will usually reach you by email or a notification in the app.",
        },
      ],
    },
    {
      id: "section-6",
      title: "6. Your Rights to Manage Personal Information",
      blocks: [
        { type: "h3", text: "A. Access and Correction" },
        {
          type: "p",
          text: "You have the right to see and correct your personal information. You can do that here:",
        },
        {
          type: "ul",
          items: [
            "<strong>Profile information:</strong> Go to Settings &gt; Account to view or change your avatar, nickname, email account, and login password.",
            "<strong>Search history:</strong> Open search to see or clear your recent search keywords.",
          ],
        },
        { type: "h3", text: "B. Deletion" },
        {
          type: "p",
          text: "You may ask us to delete your personal information in these situations:",
        },
        {
          type: "ul",
          items: [
            "If our processing breaks laws or regulations",
            "If we collected or used your personal information without your consent where consent is required",
            "If you no longer use our products or services, or you have closed your account",
            "If we no longer provide products or services to you",
          ],
        },
        {
          type: "p",
          text: "You can delete your account and all the personal data that goes with it in Settings &gt; Account &gt; Delete Account. After that, we stop providing services and delete your personal information as you asked, unless the law says otherwise.",
        },
        { type: "h3", text: "C. Changing the Scope of Consent" },
        {
          type: "p",
          text: "For the extra personal information we collect based on your consent, you can give or withdraw that consent whenever you like. Once you withdraw it, we stop processing that information. Withdrawing does not undo processing we already carried out while you had consented.",
        },
        { type: "h3", text: "D. Revoking System Permissions" },
        {
          type: "p",
          text: "You can take back any system permission you granted earlier, in your device settings:",
        },
        {
          type: "ul",
          items: [
            "<strong>Android:</strong> Settings &gt; Apps &gt; Blotz &gt; Permissions",
            "<strong>iOS:</strong> Settings &gt; Privacy &amp; Security &gt; select the relevant permission type and turn off Blotz access, or Settings &gt; Apps &gt; Blotz &gt; turn off the relevant permission",
          ],
        },
        {
          type: "p",
          text: "After you revoke a permission, we no longer process the related personal information under it, but the feature it powers may stop working. Other core functions are unaffected.",
        },
        { type: "h3", text: "E. Response Time" },
        {
          type: "p",
          text: "We will respond to your reasonable requests within 15 days. If you need help, contact us using the details at the end of this Policy.",
        },
      ],
    },
    {
      id: "section-7",
      title: "7. How We Handle Minors' Personal Information",
      blocks: [
        {
          type: "p",
          text: "Our products and services are mainly meant for adults. If you are under 18, please read this Policy with your guardian and use our services only after your guardian agrees.",
        },
        {
          type: "p",
          text: "If we find that we collected a minor's personal information without verifiable guardian consent beforehand, we will try to delete that data as soon as possible.",
        },
      ],
    },
    {
      id: "section-8",
      title: "8. How This Policy Is Updated",
      blocks: [
        {
          type: "p",
          text: "We may update this Privacy Policy from time to time, so please check it now and then to see how we protect the personal information we collect. If you keep using Blotz services, you accept this Privacy Policy and any updated version of it.",
        },
        {
          type: "p",
          text: "For material changes, we may also tell you more prominently what exactly changed. Material changes include, but are not limited to:",
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
          text: "If you have any questions, comments, or suggestions about this Privacy Policy, contact us at:",
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
    "阅读 BlotzTask 隐私政策，了解我们如何处理、保护和使用您的个人信息与任务数据。",
  intro: [
    "本政策仅适用于 Blotz（以下称「我们」）、Blotz 产品及相关服务。",
    "我们会依照相关法律法规收集和使用您的个人信息，并对您的个人信息及其他数据保密、妥善保管。",
    "使用 Blotz 及相关服务前，请仔细阅读本隐私政策（以下称「本政策」）。使用 Blotz 即表示您同意本政策。",
  ],
  tocLabel: "目录",
  sections: [
    {
      id: "section-1",
      title: "1. 我们如何收集和使用您的个人信息",
      blocks: [
        {
          type: "p",
          text: "我们遵循正当、合法、必要的原则。针对下面列出的功能与服务，我们会收集和使用您在使用 Blotz 时主动提供的个人信息。",
        },
        { type: "h3", text: "A. 账号注册" },
        {
          type: "p",
          text: "登录由我们的身份服务商 Auth0 承担。我们会收集您注册时填写的邮箱地址，您的登录凭据由 Auth0 代我们保管。这个邮箱用于创建您的账号，之后也用它登录。",
        },
        {
          type: "p",
          text: "Blotz 不提供无需注册的纯本地模式。使用 Blotz 的全部功能需要注册账号，您的任务数据会在您的各个设备之间同步。",
        },
        { type: "h3", text: "B. 应用功能" },
        { type: "h4", text: "B.1 任务数据同步" },
        {
          type: "p",
          text: "您注册账号并开始创建任务或其他数据后，为了让数据在设备之间完整、正常地同步，我们会收集以下信息：",
        },
        {
          type: "ul",
          items: [
            "任务标题、任务详情、截止日期或时间范围、提醒时间、重复规则",
            "随手记内容",
          ],
        },
        {
          type: "p",
          text: "这些信息只用于在设备之间同步您的任务数据。未经您的授权，我们不会为别的目的读取您的任务内容。",
        },
        { type: "h4", text: "B.2 任务提醒" },
        {
          type: "p",
          text: "如果您给任务设了提醒，我们会处理任务标题、任务详情、截止日期或时间范围、提醒时间，好让应用在该提醒的时候通知您。",
        },
        {
          type: "p",
          text: "为了把通知送达，我们还会保存一个由 Expo 推送服务签发的推送令牌，以及它对应的设备标识，这样提醒才能发到正确的手机上。",
        },
        { type: "h4", text: "B.3 AI 功能" },
        {
          type: "p",
          text: "Blotz 的 AI 功能借助两家外部服务：您写的文字交给微软 Azure OpenAI，语音录音交给 Groq 转成文字。两家都只是代我们处理，微软不会用它训练模型。",
        },
        {
          type: "link",
          href: "https://learn.microsoft.com/en-us/legal/cognitive-services/openai/data-privacy",
          text: "微软 Azure OpenAI 数据隐私说明 →",
        },
        {
          type: "link",
          href: "https://groq.com/privacy-policy/",
          text: "Groq 隐私政策 →",
        },
        {
          type: "p",
          text: "您发给 AI 的内容，以及 AI 生成的任务和随手记，也会包含在我们的使用分析数据里，详见「使用分析」(B.5)。",
        },
        {
          type: "p",
          text: "是否使用 AI 由您决定。不用的话，上面这些都不会发生，Blotz 的其他功能照常使用。",
        },
        { type: "h4", text: "B.4 个人资料" },
        {
          type: "p",
          text: "头像可以从应用内置的几个形象里挑一个，昵称可以自己填。Blotz 不支持上传照片，我们只记录您选了哪一个内置头像。这两项都是选填的，不填也不影响您正常使用 Blotz。",
        },
        { type: "h4", text: "B.5 使用分析" },
        {
          type: "p",
          text: "我们使用第三方分析服务了解 Blotz 的使用情况。它会收到您的账号标识、邮箱地址、昵称和设备系统信息，您与 AI 的对话及由此生成的内容，以及您在应用内操作过程的回放。",
        },
        {
          type: "p",
          text: "这些数据只是代我们处理，不得用于其自身目的。",
        },
        { type: "h3", text: "C. 应用申请的权限" },
        {
          type: "p",
          text: "有些功能需要用到手机的系统权限，这些权限可能涉及个人信息。我们只在您使用这些功能时才申请，得到您的许可后才会读取相关信息。不需要这个功能，您可以拒绝。",
        },
        { type: "h4", text: "C.1 Android 权限" },
        {
          type: "ul",
          items: [
            "<strong>麦克风：</strong>在您用语音输入创建任务时申请。",
            "<strong>通知：</strong>为了把您设置的提醒送达而申请。",
          ],
        },
        { type: "h4", text: "C.2 iOS 权限" },
        {
          type: "ul",
          items: [
            "<strong>麦克风：</strong>在您用语音输入创建任务时申请。",
            "<strong>通知：</strong>为了把您设置的提醒送达而申请。",
          ],
        },
        { type: "h3", text: "D. 第三方 SDK 与服务" },
        { type: "p", text: "Blotz 用到以下第三方库和服务：" },
        {
          type: "ul",
          items: [
            "<strong>登录（Auth0）：</strong>登录界面由 Auth0 提供，您的登录凭据由它代我们保管。",
            "<strong>后端服务（微软）：</strong>我们的服务器基于微软 .NET 技术栈搭建，运行在微软 Azure 上，服务器日志也收集在那里。",
            "<strong>应用框架（React Native / Expo）：</strong>手机应用本身用 React Native 和 Expo 开发，也就是您看到和点到的界面。Expo 的推送服务还负责签发用于送达提醒的推送令牌。",
            "<strong>AI（微软 Azure OpenAI）：</strong>如上所述，您打字输入的 AI 内容由微软 Azure OpenAI 处理。我们使用的 Azure OpenAI 服务器位于美国东部。",
            "<strong>语音转文字（Groq）：</strong>语音录音会发送给 Groq 转写，Groq 只是代我们处理。",
            "<strong>产品分析（PostHog）：</strong>用于了解 Blotz 的使用情况，详见「使用分析」(B.5)。PostHog 在位于美国的服务器上处理这些数据。",
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
        { type: "h3", text: "E. 用户调研与社区活动" },
        {
          type: "p",
          text: "我们有时会做用户调研，一般是问卷。如果您参加，我们可能会收集年龄、性别、行业、职业、设备信息、个人兴趣等信息，用来了解都是哪些人在用 Blotz，并改进我们的功能与服务。",
        },
        {
          type: "p",
          text: "我们有时也会在社交媒体上办活动。为了让您参加活动、把奖品寄给您，我们可能会收集姓名、电话号码、邮寄地址等信息。",
        },
        {
          type: "p",
          text: "这些信息只用于该次调研或活动。您不愿意提供，可以不参加。",
        },
      ],
    },
    {
      id: "section-2",
      title: "2. 我们如何使用 Cookie 及同类技术",
      blocks: [
        {
          type: "p",
          text: "Cookie 是网站存在您浏览器里的一个小文件，下次再来时网站能靠它认出您。",
        },
        {
          type: "p",
          text: "Blotz 应用不是网站，不使用 Cookie。本站也不会写入任何自己的 Cookie，所以这里没有需要您同意或拒绝的东西。",
        },
        {
          type: "p",
          text: "本站的字体来自 Google Fonts，也就是说您的浏览器会向 Google 请求这些字体文件，Google 能看到这次请求。今后如果我们在网页端加入用于登录或分析的 Cookie，会先更新本节再启用。",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. 我们如何共享、转让、公开披露您的个人信息",
      blocks: [
        { type: "h3", text: "A. 共享" },
        {
          type: "p",
          text: "未经您的同意，我们不会与其他公司、组织或个人共享您的个人信息，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "<strong>在获得您的明确同意或授权后：</strong>取得您的明确授权后，我们可能会与其他方共享您的个人信息，包括微软 Azure OpenAI 等 AI 服务提供商。",
            "<strong>代表我们提供服务的服务商：</strong>我们会与「第三方 SDK 与服务」(D) 中列出的服务商共享有限的信息，好让他们替我们完成这部分工作。他们不得把您的信息用于自身目的。",
            "<strong>法律法规要求时：</strong>在法律法规要求、解决争议，或应主管机关的强制性要求或司法裁决时，我们可能会共享您的个人信息。",
            "<strong>为保护合法权益：</strong>为保护 Blotz、我们的用户或公众的权利、财产或安全免受损害而确有必要时，我们可能会向第三方提供您的个人信息。",
          ],
        },
        { type: "h3", text: "B. 转让" },
        {
          type: "p",
          text: "未经您的同意，我们不会把您的个人信息转让给任何公司、组织或个人，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "在获得您的明确同意或授权后",
            "在涉及合并、收购或破产清算时，我们会要求个人信息的新持有者继续受本政策约束",
          ],
        },
        { type: "h3", text: "C. 公开披露" },
        {
          type: "p",
          text: "未经您的同意，我们不会公开披露您的个人信息，以下情况除外：",
        },
        {
          type: "ul",
          items: [
            "在获得您的明确同意或授权后",
            "在法律、法律程序、诉讼或主管机关强制要求的情况下，此时我们会采取符合法律和行业标准的安全措施",
          ],
        },
      ],
    },
    {
      id: "section-4",
      title: "4. 我们如何存储您的个人信息",
      blocks: [
        { type: "h3", text: "A. 保存期限" },
        {
          type: "p",
          text: "我们保存您的个人信息，不会超过为您提供服务所必需的期限。您停止使用平台或撤回相关授权后，我们会删除您的信息，或者把它匿名化，也就是去掉一切能指向您本人的部分。法律法规要求某些信息保存更久的除外。",
        },
        { type: "h3", text: "B. 存储位置" },
        {
          type: "p",
          text: "我们的主要服务器，包括存放您的账号和任务数据的服务器，都在澳大利亚。",
        },
        {
          type: "p",
          text: "有些功能会把数据传到境外：您打字输入的 AI 内容由位于美国东部的微软 Azure OpenAI 处理，语音录音由 Groq 在美国转写，产品分析由 PostHog 在位于美国的服务器上处理。这几种情况下，我们只传输上文相应章节写明的信息，并会遵守适用的法律要求、保护您个人信息的安全。",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. 我们如何保护您的个人信息",
      blocks: [
        {
          type: "p",
          text: "保管好您的信息是我们的分内事。我们会遵守相关法律，并采取实际有效的措施，防止您的信息被人擅自查看、泄露、篡改或弄丢。",
        },
        {
          type: "p",
          text: "具体来说，我们做了三件事：",
        },
        {
          type: "ul",
          items: [
            "<strong>传输途中：</strong>应用和我们服务器之间来回传送的内容都是加密的，和网上银行一样，即使中途被人截获也看不懂。这项技术叫 SSL/TLS。",
            "<strong>存储之后：</strong>存放在服务器上的数据同样是加密的，不会以能直接读懂的形式保存。",
            "<strong>团队内部：</strong>只有工作上确实需要的同事才能接触到您的信息。",
          ],
        },
        {
          type: "p",
          text: "万一真的出了问题、您的信息被泄露，我们会在法律要求的时间内尽快告诉您：发生了什么、可能对您有什么影响、我们已经做了和接下来要做什么，以及您自己可以怎么防范。我们通常会通过邮件或应用内通知联系您。",
        },
      ],
    },
    {
      id: "section-6",
      title: "6. 您管理个人信息的权利",
      blocks: [
        { type: "h3", text: "A. 访问与更正" },
        { type: "p", text: "您有权查看和更正自己的个人信息，可以在这些位置操作：" },
        {
          type: "ul",
          items: [
            "<strong>个人资料：</strong>进入「设置 &gt; 账户」查看或修改头像、昵称、邮箱账号和登录密码。",
            "<strong>搜索记录：</strong>打开搜索即可查看或清除最近的搜索关键词。",
          ],
        },
        { type: "h3", text: "B. 删除" },
        { type: "p", text: "在以下情况下，您可以要求我们删除您的个人信息：" },
        {
          type: "ul",
          items: [
            "我们的处理行为违反法律法规",
            "在需要同意的情况下，我们未经您的同意收集或使用您的个人信息",
            "您不再使用我们的产品或服务，或您已注销账号",
            "我们不再向您提供产品或服务",
          ],
        },
        {
          type: "p",
          text: "您可以在「设置 &gt; 账户 &gt; 删除账户」里删除账号和与之相关的全部个人数据。删除之后，我们会停止提供服务，并按您的要求删除您的个人信息，法律另有规定的除外。",
        },
        { type: "h3", text: "C. 改变授权范围" },
        {
          type: "p",
          text: "对于基于您的同意收集的额外个人信息，您可以随时给予或撤回同意。撤回之后，我们会停止处理这部分信息；在您同意期间已经完成的处理不受影响。",
        },
        { type: "h3", text: "D. 撤销系统权限" },
        { type: "p", text: "您可以在设备设置里收回此前授予的系统权限：" },
        {
          type: "ul",
          items: [
            "<strong>Android：</strong>设置 &gt; 应用 &gt; Blotz &gt; 权限",
            "<strong>iOS：</strong>设置 &gt; 隐私与安全性 &gt; 选择相应权限类型并关闭 Blotz 的访问，或设置 &gt; 应用 &gt; Blotz &gt; 关闭相应权限",
          ],
        },
        {
          type: "p",
          text: "撤销权限后，我们不会再基于该权限处理相关个人信息，但对应的功能可能就用不了了。其他核心功能不受影响。",
        },
        { type: "h3", text: "E. 响应时间" },
        {
          type: "p",
          text: "我们会在 15 天内响应您的合理请求。需要帮助时，请通过本政策末尾的联系方式找我们。",
        },
      ],
    },
    {
      id: "section-7",
      title: "7. 我们如何处理未成年人的个人信息",
      blocks: [
        {
          type: "p",
          text: "我们的产品与服务主要面向成年人。如果您未满 18 周岁，请和监护人一起阅读本政策，并在取得监护人同意后再使用我们的服务。",
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
          text: "本隐私政策可能会不定期更新，请您定期查阅，了解我们如何保护所收集的个人信息。您继续使用 Blotz 服务，即表示接受本隐私政策及其更新版本。",
        },
        {
          type: "p",
          text: "遇到重大变更，我们还可能用更显眼的方式告诉您具体改了什么。重大变更包括但不限于：",
        },
        {
          type: "ul",
          items: [
            "我们的服务模式发生重大变化，例如处理个人信息的目的、类型或方式",
            "我们的股权结构或组织架构发生重大变化",
            "个人信息共享、转让或公开披露的主要对象发生重大变化",
            "您在个人信息处理方面的权利及其行使方式发生重大变化",
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
          text: "如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：",
        },
        { type: "email", label: "邮箱：", address: "blotztask.app@gmail.com" },
        { type: "p", text: "我们会在收到您的反馈后 15 天内回复。" },
      ],
    },
  ],
};

export const privacy: Record<string, PolicyContent> = { en, zh };
