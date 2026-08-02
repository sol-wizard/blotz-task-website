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
        {
          type: "link",
          href: "https://posthog.com/privacy",
          text: "Analytics provider privacy policy →",
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
        { type: "h3", text: "D. User Research and Community Activities" },
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
      title: "2. Whether We Give Your Information to Anyone Else",
      blocks: [
        {
          type: "p",
          text: "We do not sell your personal information to anyone, and we do not hand it out for advertising or for anything unrelated to running Blotz.",
        },
        {
          type: "p",
          text: "Apart from the service providers named in this Policy, which only handle it on our behalf, we do not share your information with other companies, organisations, or individuals, and we do not make it public.",
        },
        {
          type: "p",
          text: "Two things could change that. The law can compel us, through a court decision or a binding demand from an authority. And if Blotz is ever merged, acquired, or wound up, your information may pass to whoever takes over, and we will require them to stay bound by this Policy.",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. How We Store Your Personal Information",
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
          text: "Some features send data overseas: AI content is processed by Microsoft Azure OpenAI, voice recordings are transcribed by Groq, and usage analytics are processed on servers outside Australia. In each case we send only the information described in the relevant section above, and we comply with applicable legal requirements and protect the security of your personal information.",
        },
      ],
    },
    {
      id: "section-4",
      title: "4. How We Protect Your Personal Information",
      blocks: [
        {
          type: "p",
          text: "Our backend services and database are hosted on Microsoft Azure, so the data centres, the network, and the infrastructure they run on are secured by Microsoft. Sensitive configuration such as access keys is held in Azure Key Vault rather than in our code.",
        },
        {
          type: "p",
          text: "Your data is encrypted on the way between the app and our servers, and encrypted again while it sits on those servers.",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. Your Rights to Manage Personal Information",
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
      id: "section-6",
      title: "6. How We Handle Minors' Personal Information",
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
      id: "section-7",
      title: "7. How This Policy Is Updated",
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
      id: "section-8",
      title: "8. How to Contact Us",
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
        {
          type: "link",
          href: "https://posthog.com/privacy",
          text: "分析服务商隐私政策 →",
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
        { type: "h3", text: "D. 用户调研与社区活动" },
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
      title: "2. 我们会不会把您的信息给别人",
      blocks: [
        {
          type: "p",
          text: "我们不会把您的个人信息卖给任何人，也不会拿去做广告，或用在与 Blotz 运营无关的地方。",
        },
        {
          type: "p",
          text: "除了本政策中写明的那几家服务商（他们只是代我们处理），我们不会把您的信息共享给其他公司、组织或个人，也不会对外公开。",
        },
        {
          type: "p",
          text: "只有两种情况例外。一是法律强制要求，例如法院裁决或主管机关的强制性要求；二是 Blotz 发生合并、收购或破产清算，您的信息可能转到接手的一方，我们会要求对方继续受本政策约束。",
        },
      ],
    },
    {
      id: "section-3",
      title: "3. 我们如何存储您的个人信息",
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
          text: "有些功能会把数据传到境外：AI 内容由微软 Azure OpenAI 处理，语音录音由 Groq 转写，使用分析也在境外的服务器上处理。这几种情况下，我们只传输上文相应章节写明的信息，并会遵守适用的法律要求、保护您个人信息的安全。",
        },
      ],
    },
    {
      id: "section-4",
      title: "4. 我们如何保护您的个人信息",
      blocks: [
        {
          type: "p",
          text: "我们的后台服务和数据库都托管在微软 Azure 上，机房、网络和底层基础设施的安全由微软负责。访问密钥这类敏感配置存放在 Azure 密钥保管库里，不写在代码中。",
        },
        {
          type: "p",
          text: "您的数据在应用和我们服务器之间传输时是加密的，存放在服务器上时同样是加密的。",
        },
      ],
    },
    {
      id: "section-5",
      title: "5. 您管理个人信息的权利",
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
      id: "section-6",
      title: "6. 我们如何处理未成年人的个人信息",
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
      id: "section-7",
      title: "7. 本政策如何更新",
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
      id: "section-8",
      title: "8. 如何联系我们",
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
