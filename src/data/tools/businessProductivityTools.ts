import { AITool } from '../../types';

export const businessProductivityTools: AITool[] = [
  {
    id: 'tool-zapier',
    slug: 'zapier',
    name: 'Zapier',
    tagline: 'Leading workflow automation platform connecting 7,000+ apps with AI-powered logic',
    description: 'No-code integration leader connecting thousands of business apps with Zapier Central and AI workflow builders.',
    fullDescription: 'Zapier is the world’s most extensive automation network. Connecting more than 7,000 web applications, Zapier allows non-technical entrepreneurs and enterprise teams to automate multi-step workflows. With Zapier Central and AI copilot, users can build custom automations by typing plain-English prompts.',
    category: 'ai-business-tools',
    categoryLabel: 'AI Business Tools',
    categories: ['ai-business-tools', 'ai-productivity-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 100 tasks/month; Professional starts at $19.99/month billed annually ($29.99/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['100 tasks per month', 'Unlimited single-step Zaps', 'AI Zap builder with natural language', 'Access to 7,000+ app integrations']
      },
      {
        name: 'Professional',
        price: '$19.99',
        billing: 'per month (billed annually at $239.88)',
        popular: true,
        features: ['750 tasks per month (expandable)', 'Unlimited multi-step Zaps', 'Paths conditional logic & Webhooks', 'Custom error handling & auto-retry']
      },
      {
        name: 'Team',
        price: '$69',
        billing: 'per month (billed annually)',
        features: ['2,000 tasks per month', 'Shared team workspace and folders', 'User roles and permission management', 'Premier support SLA']
      }
    ],
    bestFor: 'Business operators, growth marketers, founders, and IT managers connecting disparate SaaS platforms.',
    keyFeatures: [
      '7,000+ verified app integrations spanning CRMs, marketing platforms, forms, and databases',
      'AI Zap Builder creating complex triggers and actions simply by typing your workflow goal',
      'Zapier Central AI bots that autonomously monitor apps, summarize data, and take action',
      'Zapier Tables and Interfaces building lightweight internal apps and customer portals'
    ],
    pros: [
      'The largest ecosystem of SaaS integrations in existence',
      'AI builder converts plain English instructions into working multi-step zaps',
      'Extremely dependable uptime and auto-replay for failed requests',
      'Free plan supports unlimited single-step zaps for basic routing'
    ],
    cons: [
      'Task volume pricing can escalate as transaction counts grow',
      'Complex branching logic can be easier to visualize on visual canvas alternatives'
    ],
    howToUse: [
      { step: 1, title: 'Describe Your Desired Automation', description: 'Type "When a new lead fills out a Typeform, add them to HubSpot and notify the team in Slack".' },
      { step: 2, title: 'Authorize App Accounts', description: 'Connect your accounts via secure OAuth with zero code.' },
      { step: 3, title: 'Test & Turn On Zap', description: 'Run test payloads to verify field mappings and activate the automation.' }
    ],
    alternatives: ['Make', 'ClickUp', 'HubSpot'],
    officialUrl: 'https://zapier.com',
    affiliateUrl: 'https://zapier.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 38000,
    badges: ['Integration Leader', 'Verified Free Plan'],
    iconName: 'Workflow',
    iconBg: 'bg-orange-600',
    verifiedDate: 'September 2026',
    useCases: ['Lead routing from forms to CRM', 'Automated customer onboarding notifications', 'Cross-platform inventory sync', 'Social media scheduling across channels'],
    faqs: [
      { question: 'Is Zapier free?', answer: 'Yes, Zapier has a forever-free plan that includes 100 tasks per month across unlimited single-step automations.' },
      { question: 'What is Zapier Central?', answer: 'Zapier Central is an AI workspace where you can instruct AI agents to monitor your apps, answer questions, and perform tasks across your connected accounts.' }
    ]
  },
  {
    id: 'tool-make',
    slug: 'make',
    name: 'Make',
    tagline: 'Visual visual drag-and-drop automation platform with powerful logic branching',
    description: 'Visual automation builder (formerly Integromat) allowing creators to design, build, and automate complex workflows with granular data control.',
    fullDescription: 'Make is a visual automation platform featuring an interactive drag-and-drop canvas. Popular with developers, power-users, and operations managers, Make handles complex data filtering, JSON parsing, error directives, and array iterations at a fraction of the cost of legacy automation suites.',
    category: 'ai-business-tools',
    categoryLabel: 'AI Business Tools',
    categories: ['ai-business-tools', 'ai-productivity-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 1,000 operations/month; Core plan starts at $9/month billed annually ($10.59/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['1,000 operations per month', '2 active scenarios', '15-minute minimum execution interval', 'Access to 1,500+ apps and visual canvas']
      },
      {
        name: 'Core',
        price: '$9',
        billing: 'per month (billed annually at $108)',
        popular: true,
        features: ['10,000 operations per month', 'Unlimited active scenarios', '1-minute minimum execution interval', 'Custom variables & webhook routing']
      },
      {
        name: 'Pro',
        price: '$16',
        billing: 'per month (billed annually)',
        features: ['10,000+ operations per month', 'Custom functions and data stores', 'Full-text search in execution history', 'Priority scenario execution']
      }
    ],
    bestFor: 'Technical founders, operations managers, and agency builders wanting flexible visual logic without paying per-task premiums.',
    keyFeatures: [
      'Interactive visual canvas dragging nodes and watching real-time data flows animate',
      'Advanced data handling with built-in regex, mathematical formulas, and JSON transformers',
      'AI Assistant generating scenario structures and debugging routing errors',
      'Data Stores feature providing a built-in NoSQL database inside your automations'
    ],
    pros: [
      'Significantly higher operation limits per dollar compared to competitors (1,000 free ops, 10,000 ops for $9/mo)',
      'Visual flow-diagram interface makes complex multi-branch logic easy to debug',
      'Fine-grained control over API data structures and webhooks',
      'Built-in data store avoids the need for external secondary databases'
    ],
    cons: [
      'Slightly steeper learning curve for non-technical users than Zapier',
      'Fewer total pre-built apps (~1,500 vs 7,000 on Zapier, though custom webhooks bridge any gap)'
    ],
    howToUse: [
      { step: 1, title: 'Create a Scenario on Canvas', description: 'Add a trigger module like Airtable Watch Records or a custom Webhook.' },
      { step: 2, title: 'Add Routers & Filters', description: 'Branch data based on conditional parameters (e.g., if lead score > 50).' },
      { step: 3, title: 'Run Once to Inspect Data', description: 'Watch bubbles animate across connections and inspect raw input/output payloads.' }
    ],
    alternatives: ['Zapier', 'ClickUp', 'HubSpot'],
    officialUrl: 'https://www.make.com',
    affiliateUrl: 'https://www.make.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 21000,
    badges: ['Power Automation', 'Verified Free Plan'],
    iconName: 'Workflow',
    iconBg: 'bg-purple-700',
    verifiedDate: 'September 2026',
    useCases: ['Multi-branch CRM sync', 'Automated invoice generation', 'E-commerce order fulfillment logic', 'Custom API data transformation'],
    faqs: [
      { question: 'Is Make free?', answer: 'Yes, Make offers a free plan with 1,000 operations per month and access to the full visual scenario designer.' },
      { question: 'What is the difference between Make and Zapier?', answer: 'Make uses a visual infinite-canvas layout with built-in database tables and offers significantly higher operation counts at a lower monthly cost.' }
    ]
  },
  {
    id: 'tool-motion',
    slug: 'motion',
    name: 'Motion',
    tagline: 'Autonomous AI executive assistant that plans your day, tasks, and meetings dynamically',
    description: 'AI calendar and task management platform that automatically builds your daily schedule and re-prioritizes tasks when meetings change.',
    fullDescription: 'Motion (usemotion.com) eliminates manual calendar scheduling. Rather than treating to-do lists and calendars separately, Motion merges them. You enter your tasks, deadlines, and estimated completion times; Motion’s AI scheduling algorithm dynamically places tasks into calendar gaps and automatically recalculates your entire week whenever meetings shift.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Productivity Tools',
    categories: ['ai-productivity-tools', 'ai-business-tools'],
    pricingType: 'free-trial',
    pricingSummary: '7-day free trial; Individual plan starts at $19/month billed annually ($34/mo monthly).',
    pricingPlans: [
      {
        name: 'Individual',
        price: '$19',
        billing: 'per month (billed annually at $228)',
        popular: true,
        features: ['Autonomous AI daily calendar scheduling', 'Task and project management with automated deadlines', 'Smart Meeting booking links with custom availability', 'Google and Outlook calendar two-way sync']
      },
      {
        name: 'Team',
        price: '$12',
        billing: 'per user / month (billed annually at $144/user)',
        features: ['Automated project task distribution across team members', 'Shared team calendars & meeting booking', 'Resource utilization view', 'Centralized admin billing']
      }
    ],
    bestFor: 'Busy executives, agency owners, freelance consultants, and managers juggling tight deadlines across multiple projects.',
    keyFeatures: [
      'Autonomous AI scheduler calculating the optimal mathematical schedule based on task urgency',
      'Dynamic re-planning rescheduling missed tasks automatically when a meeting runs over',
      'Smart Meeting booking links showing prospective clients personalized booking windows without schedule clashes',
      'Project management view with Kanban and Gantt layouts tied directly to calendar execution'
    ],
    pros: [
      'Cuts 1–2 hours of manual calendar planning and rescheduling every single day',
      'Never forget a deadline—Motion warns you if a task is mathematically at risk of being late',
      'Meeting booking links adapt to your dynamic focus blocks',
      'Seamless sync with Google Calendar and Microsoft Outlook'
    ],
    cons: [
      'No permanent free tier (7-day free trial requires credit card)',
      'Requires commitment to entering all tasks into the system for optimal scheduling results'
    ],
    howToUse: [
      { step: 1, title: 'Sync Google or Outlook Calendars', description: 'Connect work and personal calendars to establish base meeting availability.' },
      { step: 2, title: 'Add Tasks with Deadlines & Durations', description: 'Specify "Write monthly report (2 hrs) due Friday at 5 PM".' },
      { step: 3, title: 'Let AI Schedule Your Day', description: 'Motion inserts the task into optimal focus slots and reshuffles if new meetings arise.' }
    ],
    alternatives: ['ClickUp', 'Asana', 'Notion AI'],
    officialUrl: 'https://www.usemotion.com',
    affiliateUrl: 'https://www.usemotion.com',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 16000,
    badges: ['Free Trial Available', 'AI Calendar Pioneer'],
    iconName: 'Calendar',
    iconBg: 'bg-indigo-700',
    verifiedDate: 'September 2026',
    useCases: ['Executive day planning', 'Automated project deadline scheduling', 'Client meeting booking links', 'Focus time protection'],
    faqs: [
      { question: 'Does Motion have a free plan?', answer: 'Motion does not offer a permanent free plan, but provides a 7-day free trial with full feature access.' },
      { question: 'How does Motion reschedule missed tasks?', answer: 'If a meeting goes over or an emergency arises, Motion instantly re-evaluates task priorities and slots incomplete work into the next available gap.' }
    ]
  },
  {
    id: 'tool-tidio',
    slug: 'tidio',
    name: 'Tidio',
    tagline: 'Customer support suite featuring Lyro AI conversational chatbot for automated ticket resolution',
    description: 'Live chat and customer service platform powered by Lyro AI that solves up to 70% of customer inquiries from company FAQ docs.',
    fullDescription: 'Tidio combines live chat, help desk ticketing, and conversational AI into a unified customer service platform for small and medium businesses. Its flagship Lyro AI agent ingests company FAQs, knowledge bases, and Shopify store catalogs to resolve customer support questions accurately within seconds without hallucinations.',
    category: 'ai-business-tools',
    categoryLabel: 'AI Business Tools',
    categories: ['ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 50 live chat conversations; Starter from $29/month; Lyro AI plans start at $39/month for 50 AI conversations.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['50 live chat conversations', '50 Lyro AI bot conversations (one-time trial)', 'Ticketing system for support emails', 'Shopify and WordPress integration']
      },
      {
        name: 'Starter',
        price: '$29',
        billing: 'per month ($24/mo annual)',
        popular: true,
        features: ['100 live chat conversations', 'Full live chat features and visitor analytics', 'Help desk ticketing', 'Live visitors list']
      },
      {
        name: 'Lyro AI Plan',
        price: '$39',
        billing: 'per month',
        features: ['50 Lyro AI conversations/mo (scale up as needed)', 'Zero hallucination guarantee', 'Trained on your knowledge base in 3 minutes', 'Seamless handoff to human agents']
      }
    ],
    bestFor: 'E-commerce stores, Shopify merchants, SaaS startups, and small support teams looking to automate 24/7 customer queries.',
    keyFeatures: [
      'Lyro AI conversational agent trained purely on your company’s verified knowledge base',
      'Seamless Human Handoff passing complex issues to human agents with full conversation context',
      'One-click e-commerce integrations with Shopify, WooCommerce, and BigCommerce to track orders',
      'Multichannel inbox uniting live web chat, Instagram DMs, Messenger, and email'
    ],
    pros: [
      'Resolves up to 70% of repetitive customer questions (shipping, returns, sizing) automatically',
      'Does not hallucinate answers outside of your provided documents',
      'Setup takes under 10 minutes—just paste your website URL to train Lyro',
      'Free plan allows small websites to test live chat and basic AI answers'
    ],
    cons: [
      'Lyro AI usage is priced per conversation volume, requiring higher tiers for high-traffic stores',
      'Advanced reporting requires the higher-tier Growth plan'
    ],
    howToUse: [
      { step: 1, title: 'Install Tidio Widget', description: 'Add the 1-line script or install the official Shopify/WordPress plugin.' },
      { step: 2, title: 'Train Lyro AI on Your FAQs', description: 'Provide your website FAQ link or upload product policy documents.' },
      { step: 3, title: 'Activate 24/7 Auto-Pilot', description: 'Lyro answers customer questions instantly and alerts your team if human intervention is needed.' }
    ],
    alternatives: ['HubSpot', 'ClickUp', 'Zapier'],
    officialUrl: 'https://www.tidio.com',
    affiliateUrl: 'https://www.tidio.com',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 18000,
    badges: ['E-Commerce Support', 'Verified Free Plan'],
    iconName: 'Bot',
    iconBg: 'bg-blue-600',
    verifiedDate: 'September 2026',
    useCases: ['Automated order tracking queries', '24/7 website customer support', 'E-commerce return policy answers', 'Lead capture on landing pages'],
    faqs: [
      { question: 'Is Tidio free?', answer: 'Yes, Tidio offers a free plan that provides 50 live chat conversations and basic ticketing features forever.' },
      { question: 'What is Lyro AI?', answer: 'Lyro is Tidio’s AI support agent that uses conversational intelligence grounded exclusively on your uploaded knowledge base to answer customer questions accurately.' }
    ]
  },
  {
    id: 'tool-hubspot',
    slug: 'hubspot',
    name: 'HubSpot',
    tagline: 'Industry-leading CRM and inbound marketing platform powered by Breeze AI intelligence',
    description: 'Complete CRM, marketing, sales, and customer service platform equipped with Breeze AI for content generation and predictive insights.',
    fullDescription: 'HubSpot is the global standard for inbound marketing and CRM. With its Breeze AI suite, HubSpot embeds intelligence across all hubs: generating marketing emails, forecasting sales pipeline values, summarizing customer tickets, and automating customer journey nurturing.',
    category: 'ai-business-tools',
    categoryLabel: 'AI Business Tools',
    categories: ['ai-business-tools', 'ai-marketing-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free CRM tools for up to 5 users; Starter Customer Platform begins at $15/seat/month billed annually.',
    pricingPlans: [
      {
        name: 'Free Tools',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['Free CRM contact management (up to 1M contacts)', 'Email marketing (up to 2,000 emails/mo)', 'Landing page builder and forms', 'Basic Breeze AI content assistant']
      },
      {
        name: 'Starter Customer Platform',
        price: '$15',
        billing: 'per core seat / month (billed annually)',
        features: ['Ad management & email automation', 'Multiple currencies & simple deal pipelines', 'Live chat with custom routing', 'Payment processing and quotes']
      },
      {
        name: 'Professional',
        price: '$450',
        billing: 'per month (includes 3 seats, billed annually)',
        features: ['Full marketing automation & omnichannel campaigns', 'Advanced Breeze AI copilot and predictive lead scoring', 'Custom reporting and attribution modeling', 'A/B testing']
      }
    ],
    bestFor: 'Growing businesses, B2B sales teams, inbound marketers, and enterprises needing an all-in-one CRM.',
    keyFeatures: [
      'Breeze AI Copilot drafting marketing emails, blog posts, social updates, and customer responses',
      'Free CRM managing up to 1,000,000 contact records with company tracking and timeline history',
      'Automated marketing workflows triggering emails based on prospect interactions',
      'Predictive lead scoring and deal forecasting powered by machine learning'
    ],
    pros: [
      'Most generous free CRM in the industry with up to 1 million contacts stored at zero cost',
      'Breeze AI seamlessly assists with writing and lead enrichment inside the platform',
      'Unmatched educational resources and HubSpot Academy certifications',
      'Scales smoothly from 1-person businesses to multi-thousand person enterprises'
    ],
    cons: [
      'Professional and Enterprise tiers are significant financial investments',
      'Contract onboarding fees apply for top-tier professional implementations'
    ],
    howToUse: [
      { step: 1, title: 'Import Contacts into Free CRM', description: 'Sync existing Google Workspace or Outlook contacts with one click.' },
      { step: 2, title: 'Draft Campaigns with Breeze AI', description: 'Use the AI content assistant to generate email newsletters and landing page copy.' },
      { step: 3, title: 'Track Deals & Pipeline', description: 'Monitor sales stages on drag-and-drop Kanban boards with automated notifications.' }
    ],
    alternatives: ['Mailchimp', 'ClickUp', 'Zapier'],
    officialUrl: 'https://www.hubspot.com',
    affiliateUrl: 'https://www.hubspot.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 48000,
    badges: ['CRM Standard', 'Verified Free Plan'],
    iconName: 'Target',
    iconBg: 'bg-orange-600',
    verifiedDate: 'September 2026',
    useCases: ['B2B pipeline tracking', 'Inbound marketing email campaigns', 'Customer support ticket management', 'Landing page lead capture'],
    faqs: [
      { question: 'Is HubSpot CRM really free?', answer: 'Yes, HubSpot CRM is free forever for contact management up to 1,000,000 contacts and includes basic email marketing and ticketing.' },
      { question: 'What is HubSpot Breeze AI?', answer: 'Breeze AI is HubSpot’s AI layer that drafts content, enriches contact records with web data, and analyzes customer interactions across all HubSpot hubs.' }
    ]
  },
  {
    id: 'tool-mailchimp',
    slug: 'mailchimp',
    name: 'Mailchimp',
    tagline: 'Email marketing and automation platform powered by Intuit Assist AI optimization',
    description: 'Pioneering email marketing platform featuring Intuit Assist AI for subject line optimization, generative copy, and customer segmentation.',
    fullDescription: 'Mailchimp (by Intuit) is a trusted email marketing and automations platform. Now supercharged with Intuit Assist AI, Mailchimp helps small businesses and marketers generate personalized email campaigns, predict customer churn, optimize send times, and design high-converting newsletters with smart templates.',
    category: 'ai-marketing-tools',
    categoryLabel: 'AI Marketing Tools',
    categories: ['ai-marketing-tools', 'ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan up to 500 contacts and 1,000 monthly email sends; Essentials starts at $13/month.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free (up to 500 contacts)',
        features: ['500 contacts & 1,000 monthly sends', 'Email marketing & basic templates', 'Intuit Assist AI content generation (limited)', 'Pre-built email automations']
      },
      {
        name: 'Essentials',
        price: '$13',
        billing: 'per month (up to 500 contacts)',
        popular: true,
        features: ['5,000 monthly email sends', 'Remove Mailchimp badge', '24/7 email & chat support', 'A/B testing and automated customer journeys']
      },
      {
        name: 'Standard',
        price: '$20',
        billing: 'per month (up to 500 contacts)',
        features: ['6,000 monthly email sends', 'Predictive customer analytics & send-time optimization', 'Custom-coded email templates', 'Advanced segmentation']
      }
    ],
    bestFor: 'E-commerce store owners, bloggers, newsletters, and local businesses managing email subscriber lists.',
    keyFeatures: [
      'Intuit Assist AI generating email body copy, headlines, and calls-to-action tailored to your industry',
      'Send Time Optimization delivering emails at the exact minute each subscriber is most likely to open',
      'Customer Journey Builder triggering automated email flows on sign-up, cart abandonment, or purchase',
      'Subject Line Helper scoring proposed subject lines on length, sentiment, and emoji usage'
    ],
    pros: [
      'Generous free plan for starting a newsletter up to 500 subscribers',
      'Smart recommendations improve open rates and click-through metrics',
      'Over 300+ integrations with Shopify, WooCommerce, Squarespace, and Stripe',
      'Clean drag-and-drop email design builder'
    ],
    cons: [
      'Price increases rapidly as subscriber counts exceed 5,000 contacts',
      'Free tier has a daily send limit of 500 emails'
    ],
    howToUse: [
      { step: 1, title: 'Design Campaign with Drag-and-Drop', description: 'Select an email template and use Intuit Assist to generate persuasive promotional copy.' },
      { step: 2, title: 'Optimize Subject Line', description: 'Check the Subject Line Helper score to maximize predicted open rates.' },
      { step: 3, title: 'Enable Send-Time Optimization', description: 'Deliver automatically across subscriber time zones and track real-time analytics.' }
    ],
    alternatives: ['HubSpot', 'Copy.ai', 'Writesonic'],
    officialUrl: 'https://mailchimp.com',
    affiliateUrl: 'https://mailchimp.com',
    hasAffiliate: false,
    rating: 4.6,
    reviewsCount: 32000,
    badges: ['Email Leader', 'Verified Free Plan'],
    iconName: 'Target',
    iconBg: 'bg-yellow-500',
    verifiedDate: 'September 2026',
    useCases: ['E-commerce abandoned cart flows', 'Weekly newsletter campaigns', 'Customer onboarding sequences', 'Promotional discount announcements'],
    faqs: [
      { question: 'Is Mailchimp free?', answer: 'Yes, Mailchimp offers a free plan for up to 500 contacts and 1,000 monthly sends with basic email templates.' },
      { question: 'What is Intuit Assist in Mailchimp?', answer: 'Intuit Assist is a generative AI assistant that drafts email copy, suggests targeted subject lines, and personalizes content based on customer purchase history.' }
    ]
  },
  {
    id: 'tool-clickup',
    slug: 'clickup',
    name: 'ClickUp',
    tagline: 'All-in-one productivity platform with ClickUp Brain connected neural network',
    description: 'The work management platform uniting tasks, docs, chat, and goals, powered by ClickUp Brain for automated updates and project Q&A.',
    fullDescription: 'ClickUp replaces fragmented work apps by putting tasks, documents, spreadsheets, chat, and project tracking in one interface. Its integrated ClickUp Brain AI acts as a company knowledge hub, answering questions about past projects, writing status reports, generating tasks from docs, and transcribing meeting clips.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Productivity Tools',
    categories: ['ai-productivity-tools', 'ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free Forever tier with 100MB storage; Unlimited plan starts at $7/user/month billed annually ($10/mo monthly); ClickUp Brain is $7/user/mo add-on.',
    pricingPlans: [
      {
        name: 'Free Forever',
        price: '$0',
        billing: 'forever free',
        features: ['100MB storage', 'Unlimited tasks and unlimited members', 'Collaborative docs and whiteboards', 'Kanban, List, and Calendar views']
      },
      {
        name: 'Unlimited',
        price: '$7',
        billing: 'per member / month (billed annually at $84)',
        popular: true,
        features: ['Unlimited storage, integrations, and dashboards', 'Guests with permissions', 'Gantt charts and custom fields', 'Native time tracking']
      },
      {
        name: 'Business',
        price: '$12',
        billing: 'per member / month (billed annually)',
        features: ['Advanced time tracking & timesheets', 'Workload management and capacity planning', 'Google SSO & custom export options', 'Advanced automations']
      }
    ],
    bestFor: 'Agile teams, software developers, marketing agencies, and operations departments wanting an all-in-one workspace.',
    keyFeatures: [
      'ClickUp Brain AI Knowledge Manager answering natural questions across all company tasks and docs',
      'AI Project Manager automatically drafting standup updates, task summaries, and subtasks',
      'ClickUp Docs & Whiteboards collaborating live on specs and brainstorming diagrams',
      'Customizable Views including Kanban boards, Lists, Gantt charts, Mind Maps, and Calendars'
    ],
    pros: [
      'Consolidates 5+ separate software subscriptions into a single platform',
      'ClickUp Brain automates tedious project updates and status reports',
      'Extremely customizable hierarchy (Workspaces > Spaces > Folders > Lists > Tasks)',
      'Affordable pricing for full-featured project management'
    ],
    cons: [
      'The vast number of features creates an initial learning curve for beginners',
      'ClickUp Brain is a paid add-on ($7/member/mo) on top of the base plan'
    ],
    howToUse: [
      { step: 1, title: 'Organize Tasks in Lists or Boards', description: 'Create project spaces and set custom statuses and priority tags.' },
      { step: 2, title: 'Prompt ClickUp Brain', description: 'Ask "Summarize progress on the Q3 Marketing Sprint" for an instant breakdown.' },
      { step: 3, title: 'Automate Status Reports', description: 'Set AI to generate weekly executive summaries and assign action items automatically.' }
    ],
    alternatives: ['Asana', 'Notion AI', 'Motion'],
    officialUrl: 'https://clickup.com',
    affiliateUrl: 'https://clickup.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 39000,
    badges: ['All-in-One Pick', 'Verified Free Plan'],
    iconName: 'CheckSquare',
    iconBg: 'bg-purple-600',
    verifiedDate: 'September 2026',
    useCases: ['Sprint planning for developers', 'Client project deliverables', 'Cross-functional team roadmaps', 'Company wiki documentation'],
    faqs: [
      { question: 'Is ClickUp free?', answer: 'Yes, ClickUp has a Free Forever plan with unlimited tasks, unlimited team members, and 100MB of storage.' },
      { question: 'What is ClickUp Brain?', answer: 'ClickUp Brain is an AI neural network that connects tasks, docs, people, and company knowledge to answer questions, generate project reports, and create subtasks.' }
    ]
  },
  {
    id: 'tool-asana',
    slug: 'asana',
    name: 'Asana',
    tagline: 'Enterprise work and project management platform with Asana Intelligence workflow automation',
    description: 'Scalable project management platform helping teams coordinate complex initiatives with Asana Intelligence smart summaries and risk alerts.',
    fullDescription: 'Asana is an enterprise-grade project management and work coordination platform. Powered by Asana Intelligence, it brings clarity to strategic goals by identifying project bottlenecks, drafting task summaries, generating smart status updates, and suggesting workflow automations that keep teams aligned on key milestones.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Productivity Tools',
    categories: ['ai-productivity-tools', 'ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Personal plan is free for up to 10 teammates; Starter plan from $10.99/user/month billed annually ($13.49/mo monthly).',
    pricingPlans: [
      {
        name: 'Personal (Free)',
        price: '$0',
        billing: 'forever free (up to 10 users)',
        features: ['Unlimited tasks, projects, and messages', 'List, Board, and Calendar views', 'Up to 10 teammates', '100+ free app integrations']
      },
      {
        name: 'Starter',
        price: '$10.99',
        billing: 'per user / month (billed annually at $131.88)',
        popular: true,
        features: ['Timeline & Gantt chart views', 'Asana Intelligence AI features', 'Workflow builder with automated rules', 'Project dashboards & unlimited free guests']
      },
      {
        name: 'Advanced',
        price: '$24.99',
        billing: 'per user / month (billed annually)',
        features: ['Workload management across teams', 'Strategic Goals tracking', 'Advanced reporting and portfolio views', 'Approval workflows']
      }
    ],
    bestFor: 'Cross-functional corporate teams, enterprise project managers, and agencies managing multi-month client campaigns.',
    keyFeatures: [
      'Smart Status generating executive project summaries and health assessments with 1 click',
      'Smart Answers letting team members query project objectives and blocking issues in plain English',
      'Timeline & Gantt views mapping dependencies and milestone delivery paths',
      'Strategic Goals tracking connecting individual daily tasks directly to top-level company OKRs'
    ],
    pros: [
      'Clean, polished, intuitive user experience that non-technical teams love',
      'Generous free Personal plan for up to 10 teammates',
      'Smart summaries save hours of manual status report writing',
      'Exceptional dependency mapping and milestone tracking'
    ],
    cons: [
      'Timeline and Gantt views are reserved for paid tiers',
      'Advanced plans are priced higher than simpler kanban boards'
    ],
    howToUse: [
      { step: 1, title: 'Build Project Workflow', description: 'Organize tasks into Timeline, List, or Board views with assignees and due dates.' },
      { step: 2, title: 'Generate Smart Status', description: 'Click Asana Intelligence to generate an instant executive project health briefing.' },
      { step: 3, title: 'Automate Repetitive Rules', description: 'Create rules that route completed tasks to reviewers and trigger Slack alerts.' }
    ],
    alternatives: ['ClickUp', 'Motion', 'Notion AI'],
    officialUrl: 'https://asana.com',
    affiliateUrl: 'https://asana.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 36000,
    badges: ['Enterprise Leader', 'Verified Free Plan'],
    iconName: 'CheckSquare',
    iconBg: 'bg-rose-600',
    verifiedDate: 'September 2026',
    useCases: ['Enterprise product launches', 'Cross-departmental initiative tracking', 'Marketing campaign timelines', 'Strategic OKR alignment'],
    faqs: [
      { question: 'Is Asana free?', answer: 'Yes, Asana offers a free Personal plan supporting up to 10 teammates with unlimited tasks and projects.' },
      { question: 'What does Asana Intelligence do?', answer: 'Asana Intelligence drafts status updates, identifies project risks, answers questions about project goals, and suggests automated workflow rules.' }
    ]
  },
  {
    id: 'tool-otter-ai',
    slug: 'otter-ai',
    name: 'Otter.ai',
    tagline: 'AI meeting assistant recording audio, writing real-time notes, and generating action summaries',
    description: 'Automated meeting assistant that joins Zoom, Google Meet, and Microsoft Teams to transcribe conversations and extract action items.',
    fullDescription: 'Otter.ai is an automated transcription and meeting assistant. Its OtterPilot bot joins video conference calls across Zoom, Google Meet, and Teams to transcribe speech in real time, distinguish individual speakers, capture slide presentations, and deliver automated email summaries with assigned action items.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Productivity Tools',
    categories: ['ai-productivity-tools', 'ai-business-tools', 'free-ai-tools', 'ai-tools-for-students'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 300 transcription minutes/month (30 mins/conversation); Pro starts at $10/user/month billed annually ($16.99/mo monthly).',
    pricingPlans: [
      {
        name: 'Basic (Free)',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['300 transcription minutes per month', '30 minutes max per conversation', 'OtterPilot auto-joins Zoom, Meet, and Teams', 'Real-time transcription and summary']
      },
      {
        name: 'Pro',
        price: '$10',
        billing: 'per user / month (billed annually at $120)',
        features: ['1,200 transcription minutes per month', '90 minutes max per conversation', 'Import up to 10 audio/video files per month', 'Custom vocabulary terms (100 names/terms)']
      },
      {
        name: 'Business',
        price: '$20',
        billing: 'per user / month (billed annually)',
        features: ['6,000 transcription minutes per month', '4 hours max per conversation', 'Unlimited audio/video file imports', 'Team usage analytics and centralized billing']
      }
    ],
    bestFor: 'Remote workers, project managers, college students recording lectures, and sales reps in back-to-back meetings.',
    keyFeatures: [
      'OtterPilot automatically joining scheduled Zoom, Google Meet, and Teams calendar events',
      'Real-time live transcription with speaker identification and highlighted key takeaways',
      'Automated slide capture snapping presentation slides during video calls into the notes',
      'Otter AI Chat allowing participants to ask "Did we discuss the budget?" during the live meeting'
    ],
    pros: [
      'Generous 300 free transcription minutes every month for life',
      'OtterPilot eliminates manual note-taking so everyone can focus on the conversation',
      'Automatically emails a clear bulleted summary with action items after calls end',
      'Slides are captured directly alongside transcript timestamps'
    ],
    cons: [
      'Free plan limits individual meetings to 30 minutes in duration',
      'Works best with clear microphone audio; thick accents may need minor manual review'
    ],
    howToUse: [
      { step: 1, title: 'Sync Calendar (Google or Outlook)', description: 'Connect your calendar and configure OtterPilot to auto-join meeting links.' },
      { step: 2, title: 'Conduct Meeting Naturally', description: 'Otter transcribes dialogue, separates speakers, and takes automated notes.' },
      { step: 3, title: 'Review Action Summary & Chat', description: 'Read the AI-generated meeting digest and query the transcript for key decisions.' }
    ],
    alternatives: ['Fireflies.ai', 'Descript', 'Notion AI'],
    officialUrl: 'https://otter.ai',
    affiliateUrl: 'https://otter.ai',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 31000,
    badges: ['Meeting Standard', 'Verified Free Plan'],
    iconName: 'Mic',
    iconBg: 'bg-blue-700',
    verifiedDate: 'September 2026',
    useCases: ['Client discovery calls', 'University lecture recording', 'Agile daily standups', 'Executive board meetings'],
    faqs: [
      { question: 'Is Otter.ai free?', answer: 'Yes, Otter offers a free Basic plan with 300 transcription minutes per month and 30 minutes per meeting.' },
      { question: 'Does Otter record Zoom meetings without the host?', answer: 'OtterPilot can join Zoom, Google Meet, and Teams calls as a meeting participant if you connect your calendar.' }
    ]
  },
  {
    id: 'tool-fireflies-ai',
    slug: 'fireflies-ai',
    name: 'Fireflies.ai',
    tagline: 'AI meeting recorder that transcribes, searches, and analyzes all team voice conversations',
    description: 'Enterprise conversation intelligence platform that captures voice conversations across all meeting apps and syncs insights into your CRM.',
    fullDescription: 'Fireflies.ai is a conversation intelligence assistant for sales teams, recruiters, and managers. Beyond simply transcribing audio, Fireflies analyzes sentiment, speaker talk-time ratios, competitor mentions, and key topic metrics, automatically logging call notes directly into HubSpot, Salesforce, or Slack.',
    category: 'ai-productivity-tools',
    categoryLabel: 'AI Productivity Tools',
    categories: ['ai-productivity-tools', 'ai-business-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with unlimited transcription and 800 mins storage; Pro plan from $10/user/month billed annually ($18/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['Unlimited transcription credits', '800 minutes of storage per seat', 'Fred AI assistant joins Zoom, Meet, Teams, and Webex', 'Global Smart Search across transcripts']
      },
      {
        name: 'Pro',
        price: '$10',
        billing: 'per user / month (billed annually at $120)',
        features: ['Unlimited transcription & 8,000 mins storage', 'AI Summaries with bullet points and action items', 'Smart search filters (sentiment, dates, metrics)', 'Audio download and track editing']
      },
      {
        name: 'Business',
        price: '$19',
        billing: 'per user / month (billed annually at $228)',
        features: ['Unlimited storage and transcription', 'CRM integrations (Salesforce, HubSpot)', 'Conversation Intelligence (talk-time, sentiment)', 'Team analytics and channel sharing']
      }
    ],
    bestFor: 'Sales professionals, customer success reps, recruiters, and managers analyzing conversation intelligence.',
    keyFeatures: [
      'Fred AI assistant auto-joining Zoom, Google Meet, Teams, Webex, and RingCentral',
      'Conversation Intelligence tracking talk-to-listen ratios, sentiment, and filler words',
      'Direct CRM sync logging meeting notes and action items into Salesforce and HubSpot',
      'Soundbites creation allowing you to share memorable 15-second audio snippets to Slack'
    ],
    pros: [
      'Free plan includes unlimited transcriptions with generous 800 minutes of cloud storage',
      'Deep CRM integrations keep sales records up to date automatically',
      'Smart Search allows searching keywords across hundreds of historical meetings in seconds',
      'Conversation analytics help coaches improve sales pitch delivery'
    ],
    cons: [
      'AI summaries with action items require the Pro tier ($10/mo)',
      'Fred meeting bot appearance in conference calls requires participant permission'
    ],
    howToUse: [
      { step: 1, title: 'Invite Fred to Meeting', description: 'Fred auto-joins from your connected calendar or via fred@fireflies.ai invite.' },
      { step: 2, title: 'Review Transcript & Sentiment', description: 'Inspect speaker talk-time ratios, positive/negative sentiment, and topic markers.' },
      { step: 3, title: 'Push Notes to CRM or Slack', description: 'Automatically send call notes to Salesforce or paste soundbites directly into Slack.' }
    ],
    alternatives: ['Otter.ai', 'Notion AI', 'ClickUp'],
    officialUrl: 'https://fireflies.ai',
    affiliateUrl: 'https://fireflies.ai',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 24000,
    badges: ['Sales Intelligence', 'Verified Free Plan'],
    iconName: 'Mic',
    iconBg: 'bg-violet-700',
    verifiedDate: 'September 2026',
    useCases: ['Sales call conversation tracking', 'Recruiting candidate interviews', 'Customer onboarding sync', 'Team alignment meetings'],
    faqs: [
      { question: 'Is Fireflies.ai free?', answer: 'Yes, Fireflies offers a free tier with unlimited transcriptions and 800 minutes of storage per user.' },
      { question: 'Does Fireflies integrate with CRMs?', answer: 'Yes, Fireflies automatically syncs meeting transcripts, recordings, and AI notes into Salesforce, HubSpot, Zoho, and Pipedrive.' }
    ]
  }
];
