import { AITool } from '../../types';

export const codingAndAudioTools: AITool[] = [
  // --- AI AUDIO TOOLS ---
  {
    id: 'tool-elevenlabs',
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    tagline: 'Industry-leading AI voice generator, text-to-speech, and instant voice cloning',
    description: 'The benchmark AI audio research company creating ultra-realistic, emotionally nuanced voices and voice clones across 32 languages.',
    fullDescription: 'ElevenLabs is the undisputed leader in synthetic voice generation and voice cloning. Utilizing deep generative voice models, ElevenLabs renders spoken audio with human-like breathing, pacing, inflection, and emotional tone. Creators, game developers, audiobook publishers, and video editors worldwide rely on ElevenLabs for studio-grade voiceovers.',
    category: 'ai-audio',
    categoryLabel: 'AI Audio',
    categories: ['ai-audio', 'free-ai-tools', 'ai-video'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 10,000 characters/month; Starter plan starts at $5/month ($2.50 first month).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['10,000 characters per month (~10 mins)', 'Access to default library of 120+ voices', 'Speech synthesis in 32 languages', 'Requires attribution in outputs']
      },
      {
        name: 'Starter',
        price: '$5',
        billing: 'per month ($2.50 first month)',
        popular: true,
        features: ['30,000 characters per month', 'Instant Voice Cloning with 1-minute audio sample', 'Commercial use license', 'Access to Projects long-form audiobook editor']
      },
      {
        name: 'Creator',
        price: '$22',
        billing: 'per month',
        features: ['100,000 characters per month (~2 hours)', 'Professional Voice Cloning (PVC)', 'Higher quality 192kbps audio exports', 'Priority server queue']
      }
    ],
    bestFor: 'YouTubers, audiobook narrators, podcasters, video editors, and game developers needing human-indistinguishable voiceovers.',
    keyFeatures: [
      'Text-to-speech with contextual emotional modulation and natural breath pauses',
      'Instant voice cloning from a 60-second clean audio sample',
      'Voice Library community with thousands of curated custom voice personas',
      'AI Dubbing tool translating spoken video into 30+ languages while preserving the original speaker voice'
    ],
    pros: [
      'Unquestionably the most natural-sounding text-to-speech engine available',
      'Generous free plan with 10,000 characters refreshing every month',
      'Instant voice cloning matches unique timbres with astonishing fidelity',
      'Supports 32 global languages with authentic accents'
    ],
    cons: [
      'High character usage on long-form audiobooks can consume credits quickly',
      'Free tier requires explicit attribution in public projects'
    ],
    howToUse: [
      { step: 1, title: 'Type or Paste Text Script', description: 'Enter your video script, dialogue lines, or article copy into the synthesis editor.' },
      { step: 2, title: 'Select Voice & Tone Settings', description: 'Choose from hundreds of voice styles and adjust stability, clarity, and style exaggeration sliders.' },
      { step: 3, title: 'Generate & Download Audio', description: 'Click generate to receive an instant studio-grade WAV/MP3 file ready for your video timeline.' }
    ],
    alternatives: ['Murf AI', 'Speechify', 'Play.ht'],
    officialUrl: 'https://elevenlabs.io',
    affiliateUrl: 'https://elevenlabs.io',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 38500,
    badges: ['Top Pick', 'Audio Leader', 'Verified Free Tier'],
    iconName: 'Mic',
    iconBg: 'bg-violet-600',
    verifiedDate: 'September 2026',
    useCases: ['YouTube faceless channel voiceovers', 'Audiobook production', 'Video translation & dubbing', 'Game character dialogue'],
    tags: ['AI Audio', 'Voice Generator', 'Text to Speech', 'Voice Cloning', 'Free Plan'],
    faqs: [
      { question: 'Is ElevenLabs free to use?', answer: 'Yes, ElevenLabs provides a permanent free plan with 10,000 monthly generation characters and access to over 100 default voices.' },
      { question: 'Can I clone my own voice on ElevenLabs?', answer: 'Yes, starting on the $5/month Starter plan, you can clone your own voice instantly by uploading a 1-to-2 minute audio clip.' }
    ]
  },
  {
    id: 'tool-suno',
    slug: 'suno',
    name: 'Suno AI',
    tagline: 'Create complete songs with vocals, instrumentals, and lyrics from simple text prompts',
    description: 'Breakthrough generative music platform that composes radio-ready songs across any genre, complete with natural singing vocals and instrumentation.',
    fullDescription: 'Suno AI is revolutionizing the music industry by allowing anyone—regardless of musical training—to compose complete 2-to-4 minute songs in any genre. Powered by advanced audio diffusion models, Suno produces vocal tracks, complex harmonies, basslines, and beats simply by prompting a genre, mood, and lyrical topic.',
    category: 'ai-audio',
    categoryLabel: 'AI Audio',
    categories: ['ai-audio', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 50 daily credits (10 songs/day); Pro plan at $10/month ($8/mo annual).',
    pricingPlans: [
      {
        name: 'Basic (Free)',
        price: '$0',
        billing: 'forever free (daily refresh)',
        features: ['50 free credits refreshed every day (10 songs)', 'Non-commercial personal license', 'Shared public generation queue', 'Access to Suno v3.5 model']
      },
      {
        name: 'Pro',
        price: '$10',
        billing: 'per month ($8/mo billed annually)',
        popular: true,
        features: ['2,500 credits per month (500 songs)', 'Commercial use ownership of created tracks', 'Priority generation queue', 'Extend clips up to full track length']
      },
      {
        name: 'Premier',
        price: '$30',
        billing: 'per month ($24/mo annual)',
        features: ['10,000 credits per month (2,000 songs)', 'Earliest access to new music models', 'Stem separation export options', 'Commercial license']
      }
    ],
    bestFor: 'Content creators, musicians, game developers, advertisers, and hobbyists needing custom background music and original songs.',
    keyFeatures: [
      'Full song generation including realistic male/female vocal performance and instrumentals',
      'Prompt-driven style direction across pop, rock, synthwave, orchestral, EDM, jazz, and hip hop',
      'Custom Mode allowing you to input your own custom lyrics and verse/chorus structures',
      'Stem and track continuation to extend songs smoothly'
    ],
    pros: [
      'Produces shockingly catchy, fully produced songs in under 30 seconds',
      'Daily 50 credits replenish every 24 hours at zero cost',
      'Vocal clarity and musical arrangement quality is world-class',
      'Pro plan grants full commercial ownership rights'
    ],
    cons: [
      'Free tier tracks cannot be used for monetized YouTube channels',
      'Occasional minor audio compression artifacts in dense multi-instrument drops'
    ],
    howToUse: [
      { step: 1, title: 'Describe Your Song Idea', description: 'Enter a style like "80s synthpop about late night city drives" or switch to Custom Mode to add your own lyrics.' },
      { step: 2, title: 'Generate Variations', description: 'Suno generates two distinct song variations in parallel within 30 seconds.' },
      { step: 3, title: 'Extend & Export', description: 'Select the best version, extend into a full 3-minute track, and download as MP3 or WAV.' }
    ],
    alternatives: ['Udio', 'Soundraw', 'AIVA'],
    officialUrl: 'https://suno.com',
    affiliateUrl: 'https://suno.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 29000,
    badges: ['Viral Sensation', 'Music Leader', 'Daily Free Credits'],
    iconName: 'Radio',
    iconBg: 'bg-pink-600',
    verifiedDate: 'September 2026',
    useCases: ['Video background music', 'Podcast intro theme songs', 'Custom jingles for ads', 'Creative songwriting inspiration'],
    tags: ['AI Audio', 'AI Music', 'Song Generator', 'Free Credits', 'Creative'],
    faqs: [
      { question: 'Do I own the music I make with Suno?', answer: 'Subscribers on paid plans (Pro and Premier) own commercial rights to all music generated during their subscription.' },
      { question: 'Is Suno free to try?', answer: 'Yes! Suno gives every user 50 free credits every day, which allows you to generate up to 10 song tracks daily.' }
    ]
  },
  {
    id: 'tool-udio',
    slug: 'udio',
    name: 'Udio',
    tagline: 'High-fidelity AI music creation with studio-level sound quality and stem separation',
    description: 'State-of-the-art music generation tool built by former Google DeepMind researchers, delivering studio-grade musicality and genre authenticity.',
    fullDescription: 'Udio is an advanced generative music platform celebrated for remarkable acoustic richness, realistic human vibrato, and authentic genre arrangements. From complex jazz chords to heavy metal guitars, Udio gives creators deep control over intro, outro, and mid-track vocal transitions.',
    category: 'ai-audio',
    categoryLabel: 'AI Audio',
    categories: ['ai-audio', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 100 monthly credits; Standard plan at $10/month.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'per month',
        features: ['100 credits per month', 'Access to Udio v1.5 audio model', 'Standard processing queue', 'Non-commercial license']
      },
      {
        name: 'Standard',
        price: '$10',
        billing: 'per month',
        popular: true,
        features: ['1,200 credits per month', 'Commercial use rights', 'Priority queue', 'Stem downloads (vocal & instrumental separation)']
      }
    ],
    bestFor: 'Producers, artists, and media creators who prioritize audio fidelity, acoustic warmth, and complex chord progressions.',
    keyFeatures: [
      'High-fidelity sound engine created by DeepMind audio alumni',
      'Custom lyrics, manual tag prompting, and section-by-section song builder',
      'Stem isolation separating vocals, drums, bass, and melodic instruments'
    ],
    pros: [
      'Superb acoustic warmth and stereo separation',
      'Deep genre fidelity, especially in blues, soul, jazz, and rock',
      'Supports stem downloads on paid plans'
    ],
    cons: [
      'Steeper learning curve than simpler music bots'
    ],
    howToUse: [
      { step: 1, title: 'Describe Style & Genre', description: 'Specify prompt tags (e.g. "neo-soul, warm rhodes piano, female vocal, 90 bpm").' },
      { step: 2, title: 'Add Custom Lyrics', description: 'Define Verse, Chorus, and Bridge sections.' },
      { step: 3, title: 'Export Stems', description: 'Download the completed master track or split into audio stems for your DAW.' }
    ],
    alternatives: ['Suno', 'Soundraw'],
    officialUrl: 'https://udio.com',
    affiliateUrl: 'https://udio.com',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 16400,
    badges: ['High Fidelity', 'Staff Pick'],
    iconName: 'Headphones',
    iconBg: 'bg-indigo-600',
    verifiedDate: 'September 2026',
    useCases: ['Commercial soundtrack generation', 'Musical songwriting demo', 'Podcast audio production'],
    tags: ['AI Audio', 'AI Music', 'Music Production', 'DeepMind'],
    faqs: [
      { question: 'Can I export separate audio stems in Udio?', answer: 'Yes, on paid plans you can download individual vocal, drum, bass, and instrumental stems to mix in Ableton or Logic Pro.' }
    ]
  },

  // --- AI CODING TOOLS ---
  {
    id: 'tool-cursor',
    slug: 'cursor',
    name: 'Cursor',
    tagline: 'The AI-first code editor built for lightning-fast software development and repo-wide reasoning',
    description: 'An AI-native fork of VS Code that understands your entire codebase, enabling multi-file edits, natural language refactoring, and predictive typing.',
    fullDescription: 'Cursor is widely considered the premier AI code editor by senior engineers and indie builders alike. Forked from VS Code, it looks and feels identical to standard development environments while embedding frontier AI models (Claude 3.5 Sonnet and GPT-4o) directly into editing workflows. With its Composer feature, developers can describe multi-file features and watch Cursor draft, edit, and link files across the repository automatically.',
    category: 'ai-coding',
    categoryLabel: 'AI Coding',
    categories: ['ai-coding', 'ai-productivity', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 2,000 completions; Pro plan at $20/month with 500 fast requests.',
    pricingPlans: [
      {
        name: 'Hobby (Free)',
        price: '$0',
        billing: 'forever free',
        features: ['2,000 AI completions', '50 slow premium requests', 'Full VS Code extension compatibility', 'Two-week Pro trial included']
      },
      {
        name: 'Pro',
        price: '$20',
        billing: 'per month',
        popular: true,
        features: ['500 fast premium requests per month (Claude 3.5 Sonnet / GPT-4o)', 'Unlimited slow premium requests', 'Unlimited Cursor Tab predictive autocompletes', 'Full Composer multi-file editing']
      },
      {
        name: 'Business',
        price: '$40',
        billing: 'per user / month',
        features: ['Centralized admin billing', 'Zero-data retention privacy enforcement', 'Enforce company-wide AI rules (.cursorrules)', 'Single Sign-On (SSO)']
      }
    ],
    bestFor: 'Software developers, frontend engineers, full-stack builders, and solo founders building web/mobile applications.',
    keyFeatures: [
      'Composer multi-file generation creating and updating multiple files across your project',
      'Cursor Tab predictive completions that autocomplete multiple lines and edits ahead of time',
      'Chat with Codebase indexing your whole repository to answer architectural questions',
      'Supports custom .cursorrules file to enforce project-specific coding standards and tech stacks'
    ],
    pros: [
      'Bridges the gap between chat assistants and true IDE development',
      'Saves dozens of hours per week on boilerplate, testing, and refactoring',
      'Seamless 1-click import of all your existing VS Code extensions, themes, and keybindings',
      'Direct integration with Claude 3.5 Sonnet provides unmatched coding accuracy'
    ],
    cons: [
      'High-volume Composer usage can exhaust fast requests before month end',
      'Requires basic familiarity with command-line development and Git'
    ],
    howToUse: [
      { step: 1, title: 'Install & Import VS Code Settings', description: 'Download Cursor and click "Import" to bring over all your current VS Code extensions and settings in one click.' },
      { step: 2, title: 'Open Project & Press Cmd+I / Cmd+K', description: 'Highlight code to prompt inline edits with Cmd+K, or press Cmd+I to open Composer for multi-file generation.' },
      { step: 3, title: 'Review Diff & Accept', description: 'Inspect the side-by-side color diff and press Accept (Cmd+Enter) to apply changes safely.' }
    ],
    alternatives: ['GitHub Copilot', 'Windsurf', 'v0 by Vercel'],
    officialUrl: 'https://cursor.com',
    affiliateUrl: 'https://cursor.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 34000,
    badges: ['Top Developer Pick', 'Editor of the Year', 'Verified Free Tier'],
    iconName: 'Code',
    iconBg: 'bg-cyan-600',
    verifiedDate: 'September 2026',
    useCases: ['Full-stack web development', 'Code refactoring & bug fixing', 'Writing automated unit tests', 'Repo-wide question answering'],
    tags: ['AI Coding', 'Code Editor', 'Developer Tools', 'VS Code', 'Claude 3.5 Sonnet'],
    faqs: [
      { question: 'Can I use my existing VS Code extensions in Cursor?', answer: 'Yes! Cursor is a direct fork of VS Code and supports all VS Code extensions, keybindings, and settings out of the box.' },
      { question: 'Is my proprietary source code used to train AI models?', answer: 'On Cursor Pro and Business, you can enable Privacy Mode to ensure none of your code is ever stored or used for model training.' }
    ]
  },
  {
    id: 'tool-github-copilot',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'The world’s most widely adopted AI developer tool by GitHub and Microsoft',
    description: 'AI pair programmer integrated into Visual Studio, VS Code, JetBrains, and Neovim, suggesting code and answering developer questions in context.',
    fullDescription: 'GitHub Copilot is the enterprise benchmark in developer autocomplete and workspace intelligence. Trained on billions of lines of public code, Copilot assists millions of programmers by predicting next lines, converting comments into working functions, generating pull request summaries, and fixing security vulnerabilities directly in the IDE.',
    category: 'ai-coding',
    categoryLabel: 'AI Coding',
    categories: ['ai-coding', 'ai-productivity'],
    pricingType: 'paid',
    pricingSummary: '30-day free trial; Individual plan costs $10/month or $100/year (Free for students & OSS maintainers).',
    pricingPlans: [
      {
        name: 'Individual',
        price: '$10',
        billing: 'per month ($100/year)',
        popular: true,
        features: ['Unlimited code suggestions in IDE', 'Copilot Chat in editor and terminal', 'CLI assistance in terminal', 'Free for verified students and popular open source maintainers']
      },
      {
        name: 'Business',
        price: '$19',
        billing: 'per user / month',
        features: ['Organization-wide policy management', 'IP indemnification protection', 'Exclusion of private repo telemetry', 'Audit logging']
      },
      {
        name: 'Enterprise',
        price: '$39',
        billing: 'per user / month',
        features: ['Custom fine-tuning on internal corporate repos', 'Copilot in GitHub.com web pull requests', 'Documentation search across internal wikis']
      }
    ],
    bestFor: 'Individual programmers, university computer science students, and enterprise engineering departments.',
    keyFeatures: [
      'Multi-IDE support across VS Code, JetBrains IntelliJ/PyCharm, Visual Studio, and Neovim',
      'Contextual inline completions predicting functions from comment docstrings',
      'Copilot Chat with inline slash commands (/explain, /fix, /tests)',
      'Direct integration with GitHub Pull Requests for automated reviews'
    ],
    pros: [
      'Broadest IDE compatibility of any coding tool',
      'Free for verified students and educators via GitHub Student Developer Pack',
      'Backed by enterprise security and IP indemnity guarantees',
      'Fast inline autocompletions with near-zero latency'
    ],
    cons: [
      'No permanent free tier for non-students (requires $10/mo after trial)',
      'Multi-file editing is less native than dedicated tools like Cursor'
    ],
    howToUse: [
      { step: 1, title: 'Install Copilot Extension', description: 'Add GitHub Copilot from the extension marketplace in VS Code or JetBrains.' },
      { step: 2, title: 'Write Natural Comments', description: 'Write a comment like "// Function to parse and validate CSV headers" and press Tab to accept Copilot’s code.' },
      { step: 3, title: 'Use Copilot Chat', description: 'Open Copilot Chat sidebar to ask architectural questions or generate unit tests.' }
    ],
    alternatives: ['Cursor', 'Tabnine', 'Amazon Q Developer'],
    officialUrl: 'https://github.com/features/copilot',
    affiliateUrl: 'https://github.com/features/copilot',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 52000,
    badges: ['Enterprise Standard', 'Student Friendly', 'Top Rated'],
    iconName: 'Github',
    iconBg: 'bg-slate-900',
    verifiedDate: 'September 2026',
    useCases: ['Speeding up daily coding', 'Writing unit tests', 'Translating legacy code between languages', 'Debugging error stack traces'],
    tags: ['AI Coding', 'Developer Tools', 'GitHub', 'Microsoft', 'Code Autocomplete'],
    faqs: [
      { question: 'Is GitHub Copilot free for students?', answer: 'Yes! Verified students and teachers get GitHub Copilot completely free through the GitHub Student Developer Pack.' },
      { question: 'Which programming languages does Copilot support?', answer: 'Copilot supports virtually all modern languages, with greatest proficiency in Python, JavaScript, TypeScript, Ruby, Go, C#, C++, and Java.' }
    ]
  },
  {
    id: 'tool-v0-vercel',
    slug: 'v0-by-vercel',
    name: 'v0 by Vercel',
    tagline: 'Generative UI system that builds clean React, Tailwind CSS, and Shadcn UI components from prompts',
    description: 'Vercel’s generative user interface builder that outputs production-ready, accessible React and Tailwind code with one-click deployment.',
    fullDescription: 'v0 by Vercel transforms natural language prompts into clean, accessible React components styled with Tailwind CSS and Shadcn UI. Whether you need a SaaS pricing table, an analytics dashboard layout, or a checkout funnel, v0 generates the UI code with interactive live previews and provides 1-click copy-paste commands directly into your Next.js or React workspace.',
    category: 'ai-coding',
    categoryLabel: 'AI Coding',
    categories: ['ai-coding', 'ai-productivity', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with 200 monthly generation credits; Premium at $20/month with 5,000 credits.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'per month',
        features: ['200 generation credits each month', 'Public generations', 'Export React & Tailwind code', 'Interactive canvas preview']
      },
      {
        name: 'Premium',
        price: '$20',
        billing: 'per month',
        popular: true,
        features: ['5,000 generation credits per month', 'Private generations', 'Figma to Code import', 'Priority generation speed', 'Add custom npm packages']
      }
    ],
    bestFor: 'Frontend developers, UI designers, product managers, and founders prototyping web apps in React & Tailwind.',
    keyFeatures: [
      'Generates accessible, semantic React code using Tailwind CSS and Radix/Shadcn primitives',
      'Side-by-side interactive preview with responsive mobile, tablet, and desktop viewports',
      'One-command CLI export (npx shadcn-ui@latest add) directly into your project'
    ],
    pros: [
      'Code quality is remarkably clean, modern, and production-ready',
      'Eliminates hours of manual UI layout and CSS styling',
      'Free plan provides 200 credits every month'
    ],
    cons: [
      'Focuses primarily on frontend React components rather than backend API logic'
    ],
    howToUse: [
      { step: 1, title: 'Describe Your Desired Interface', description: 'Type "Modern crypto dashboard with dark mode card widgets and balance charts".' },
      { step: 2, title: 'Iterate with Visual Selection', description: 'Click specific elements to ask for color tweaks, extra buttons, or revised spacing.' },
      { step: 3, title: 'Copy or Deploy', description: 'Copy the TSX code or run the terminal command to import it directly into your app.' }
    ],
    alternatives: ['Cursor', 'Bolt.new', 'Lovable'],
    officialUrl: 'https://v0.dev',
    affiliateUrl: 'https://v0.dev',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 19500,
    badges: ['UI Generation', 'Vercel Ecosystem', 'Verified Free Tier'],
    iconName: 'Layout',
    iconBg: 'bg-black',
    verifiedDate: 'September 2026',
    useCases: ['Fast SaaS prototyping', 'Dashboard UI generation', 'Landing page hero layouts', 'React component building'],
    tags: ['AI Coding', 'React', 'Tailwind CSS', 'Vercel', 'UI Design', 'Free Plan'],
    faqs: [
      { question: 'Is v0 free to use?', answer: 'Yes, v0 provides a generous free plan with 200 credits every month to generate and export React components.' }
    ]
  }
];
