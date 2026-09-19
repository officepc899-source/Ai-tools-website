import { AITool } from '../../types';

export const googleGeminiTool: AITool = {
  id: 'tool-google-gemini',
  slug: 'google-gemini',
  name: 'Google Gemini',
  tagline: "Google's AI assistant and generative AI platform for writing, brainstorming, research, coding, and multimodal intelligence",
  description: "Google Gemini is Google's AI assistant and generative AI platform for writing, brainstorming, research, coding, image understanding, and other AI-powered tasks.",
  fullDescription: "Google Gemini is Google's next-generation conversational AI assistant and generative platform built natively for multimodal reasoning. Seamlessly processing text, code, audio, image, and video inputs, Gemini assists with creative writing, complex document analysis, live web research with Google Search grounding, programming, and generative productivity across the Google ecosystem.",
  category: 'ai-assistant',
  categoryLabel: 'AI Assistant',
  categories: ['ai-assistant', 'ai-writing', 'ai-productivity', 'ai-coding', 'ai-education', 'free-ai-tools'],
  pricingType: 'freemium',
  pricingSummary: 'Freemium / availability varies by Google plan and product. Free tier available with a Google account; advanced frontier capabilities accessible via Google One AI Premium.',
  pricingPlans: [
    {
      name: 'Gemini Free',
      price: '$0',
      billing: 'forever free with Google account',
      features: [
        'Access to Gemini 2.0 Flash model',
        'Multimodal understanding (text, images, audio, documents)',
        'Real-time web search grounding with Google Search citations',
        'Coding assistance, debugging, and multi-language syntax translation',
        'Image understanding and generation with Imagen',
        'Document understanding for PDFs, text, and spreadsheets',
        'Extensions for Google Workspace (Gmail, Docs, Drive), Maps, and YouTube'
      ]
    },
    {
      name: 'Google One AI Premium',
      price: '$19.99',
      billing: 'per month',
      popular: true,
      features: [
        'Priority access to next-generation Gemini Advanced models',
        'Massive context window for complex document and repository analysis',
        'Gemini integrated directly into Gmail, Docs, Slides, and Meet',
        '2 TB cloud storage in Google Drive, Gmail, and Google Photos',
        'Early access to new AI agent workflows and experimental Google features'
      ]
    },
    {
      name: 'Google Workspace & Enterprise',
      price: 'Varies',
      billing: 'per organization plan / usage',
      features: [
        'Enterprise-grade commercial data protection and compliance',
        'Gemini add-on for Google Workspace Business and Enterprise editions',
        'Centralized administrative controls and security management',
        'Developer API access via ai.google.dev and Google Cloud Vertex AI'
      ]
    }
  ],
  pricingDetailsNotes: 'Google Gemini is free for all Google account holders. Paid subscriptions such as Google One AI Premium ($19.99/month) provide access to Gemini Advanced and Workspace integrations. Developers can build with Gemini models using free and pay-as-you-go API quotas at ai.google.dev.',
  bestFor: 'Multimodal AI tasks, web-grounded research, creative writing, document analysis, and Google Workspace productivity.',
  targetUsers: [
    'Writers & Content Creators',
    'Researchers & Students',
    'Software Engineers & Developers',
    'Business Professionals',
    'Google Workspace Users'
  ],
  supportedPlatforms: [
    'Web (gemini.google.com)',
    'Android App',
    'iOS (Google App)',
    'Google Workspace Integration',
    'Developer REST API & SDKs (ai.google.dev)'
  ],
  capabilities: [
    'AI chat and writing',
    'Research and summarization',
    'Coding assistance',
    'Multimodal understanding',
    'Image-related AI capabilities',
    'Document understanding',
    'AI agents and tool use'
  ],
  keyFeatures: [
    'AI chat and writing for brainstorming, drafting, editing, and content expansion',
    'Research and summarization grounded in real-time Google Search results',
    'Coding assistance across 20+ programming languages with debugging and explanation',
    'Multimodal understanding processing text, high-resolution images, audio, and video',
    'Image-related AI capabilities including visual recognition, analysis, and Imagen generation',
    'Deep document understanding for complex PDFs, research papers, and spreadsheets',
    'AI agents and tool use with extensions for Gmail, Google Docs, Drive, Maps, and YouTube'
  ],
  pros: [
    'Native multimodal reasoning across text, code, audio, video, and image inputs',
    'Real-time source verification powered by Google Search grounding',
    'Generous free tier with no mandatory credit card required',
    'Deep, seamless integration with the Google Workspace ecosystem',
    'Massive context window capabilities for deep document and codebase analysis'
  ],
  cons: [
    'Frontier Advanced reasoning models require Google One AI Premium subscription',
    'Web search citations depend on third-party source reliability and freshness',
    'Workspace extensions require account authentication and connected app permissions'
  ],
  limitations: [
    'Message limits and throughput can adjust dynamically during peak global usage periods',
    'In-app Workspace document editing requires compatible Google Workspace licenses or Google One AI Premium',
    'Developer API requests are governed by distinct rate limits and quotas at ai.google.dev'
  ],
  verdict: {
    summary: "Google Gemini is one of the world's most capable and versatile multimodal AI platforms. With native Google Search grounding, deep Workspace integration, and generous free tier access, it is a premier AI assistant for research, writing, coding, and day-to-day productivity.",
    recommendation: 'Must-Have',
    score: 4.8,
    bottomLine: "A top-tier multimodal assistant seamlessly woven into the world's most popular productivity ecosystem."
  },
  competitorComparison: [
    {
      competitorName: 'ChatGPT',
      advantage: 'Gemini provides native Google Search grounding, real-time Google Workspace extensions, and massive context windows.',
      disadvantage: 'ChatGPT has an established third-party Custom GPT Store and specialized Advanced Voice options.'
    },
    {
      competitorName: 'Claude',
      advantage: 'Gemini offers live web search grounding, native image analysis, and Google ecosystem integration.',
      disadvantage: 'Claude is renowned for nuanced, highly natural literary prose and interactive Artifacts.'
    }
  ],
  howToUse: [
    {
      step: 1,
      title: 'Sign In with Google',
      description: 'Visit gemini.google.com and sign in with your personal or Google Workspace account.'
    },
    {
      step: 2,
      title: 'Prompt Multimodally',
      description: 'Ask questions, upload documents or images, share code snippets, or request creative drafts.'
    },
    {
      step: 3,
      title: 'Verify, Collaborate & Export',
      description: 'Fact-check citations using Google Search grounding, refine responses, and export outputs directly to Docs or Gmail.'
    }
  ],
  alternatives: ['ChatGPT', 'Claude', 'Perplexity', 'Microsoft Copilot'],
  officialUrl: 'https://gemini.google.com/',
  developerUrl: 'https://ai.google.dev/',
  affiliateUrl: 'https://gemini.google.com/',
  hasAffiliate: false,
  rating: 4.8,
  reviewsCount: 38000,
  badges: ['Popular', 'Staff Pick', 'Verified Free Plan'],
  sponsored: false,
  iconName: 'Sparkles',
  iconBg: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600',
  logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
  verifiedDate: 'September 2026',
  useCases: [
    'AI Chat & Writing',
    'Research & Summarization',
    'Coding Assistance',
    'Multimodal Understanding',
    'Document & PDF Analysis',
    'Google Workspace Productivity'
  ],
  tags: [
    'Google Gemini',
    'Gemini',
    'AI Assistant',
    'Multimodal',
    'Writing',
    'Research',
    'Coding',
    'Free Tier',
    'Google',
    'ai.google.dev'
  ],
  seoTitle: 'Google Gemini - Multimodal AI Assistant & Workspace Copilot | AI Tool Nest',
  seoDescription: "Explore Google Gemini, Google's advanced multimodal conversational AI assistant for writing, search-grounded research, coding, document analysis, and Workspace productivity.",
  faqs: [
    {
      question: 'What is Google Gemini?',
      answer: "Google Gemini is Google's AI assistant and generative AI platform for writing, brainstorming, research, coding, image understanding, document analysis, and other AI-powered tasks across the web, mobile, and APIs."
    },
    {
      question: 'Is Google Gemini free to use?',
      answer: 'Yes. Google Gemini provides a generous free tier accessible with any personal Google account, featuring Gemini 2.0 Flash, multimodal processing, live Google Search grounding, and basic extensions.'
    },
    {
      question: 'Where can developers access the Gemini API?',
      answer: 'Developers can access Gemini API keys, SDKs, quickstarts, and interactive playgrounds at https://ai.google.dev/ and Google AI Studio.'
    },
    {
      question: 'What is Google One AI Premium for Gemini?',
      answer: 'Google One AI Premium ($19.99/month) provides priority access to Google’s most capable models (Gemini Advanced), 2 TB of cloud storage, and integration with Google Workspace apps like Gmail, Docs, and Slides.'
    },
    {
      question: 'What platforms is Google Gemini available on?',
      answer: 'Google Gemini is accessible on the web at gemini.google.com, via the dedicated Android app, through the Google app on iOS, embedded in Google Workspace, and programmatically via ai.google.dev.'
    }
  ]
};
