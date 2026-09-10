import { AITool } from '../../types';

export const researchStudentTools: AITool[] = [
  {
    id: 'tool-perplexity',
    slug: 'perplexity',
    name: 'Perplexity',
    tagline: 'AI-powered answer engine delivering factual answers with verified inline citations',
    description: 'An AI conversational search engine that answers questions directly, synthesizing live web sources with clickable citations.',
    fullDescription: 'Perplexity is a conversational answer engine designed to replace traditional search engine link lists. Backed by real-time web retrieval, Perplexity provides concise, synthesized answers to complex questions, accompanied by clickable numerical citations that point to original verified sources.',
    category: 'ai-research-tools',
    categoryLabel: 'AI Research Tools',
    categories: ['ai-research-tools', 'ai-tools-for-students', 'free-ai-tools', 'ai-productivity-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with unlimited Quick searches; Perplexity Pro at $20/month ($200/yr) for 300+ Pro queries/day.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['Unlimited Quick searches', '5 Pro searches every 4 hours', 'Standard citation synthesis', 'Collections and library organization']
      },
      {
        name: 'Perplexity Pro',
        price: '$20',
        billing: 'per month or $200/year',
        popular: true,
        features: ['300+ Pro searches per day', 'Access to top models (Claude 3.5 Sonnet, GPT-4o, Sonar)', 'Unlimited file uploads and analysis', '$5/month in API credits']
      }
    ],
    bestFor: 'Academic researchers, students, journalists, financial analysts, and knowledge workers seeking citation-backed answers.',
    targetUsers: ['Academic Researchers', 'Journalists & Writers', 'College Students', 'Investment Analysts', 'Curious Knowledge Seekers'],
    supportedPlatforms: ['Web App', 'iOS & Android Mobile', 'Chrome Extension', 'Mac Menubar App', 'Sonar API'],
    keyFeatures: [
      'Inline Citations linking every factual sentence directly to primary sources',
      'Focus Modes restricting searches to Academic papers, YouTube, Reddit, or Computational data',
      'Collections organizing research projects with custom system prompts and shared team links',
      'Pro Search executing multi-step search loops to synthesize nuanced multi-angle research'
    ],
    pros: [
      'Eliminates sponsored link clutter and SEO spam found on traditional search engines',
      'Inline citations make fact-checking and academic citation verification effortless',
      'Pro tier grants access to switch between Claude 3.5 Sonnet, GPT-4o, and Sonar models',
      'Generous free plan with unlimited quick research queries'
    ],
    cons: [
      'Occasional niche web sources can require cross-examination',
      'Free plan restricts deep multi-step Pro searches'
    ],
    limitations: [
      'Free plan only offers 5 Pro (multi-step) queries every 4 hours',
      'Web citations occasionally draw from unvetted forums if Focus Mode is left on "All"',
      'Cannot execute custom Python code or live terminal binaries directly'
    ],
    verdict: {
      summary: 'Perplexity has fundamentally transformed web search from blue-link scrolling into an intelligent citation-grounded research dialog. For students, writers, and analysts, it is faster and cleaner than Google or standard ChatGPT.',
      recommendation: 'Must-Have',
      score: 4.9,
      bottomLine: 'The single best AI answer engine for verified, cited information on the web.'
    },
    competitorComparison: [
      {
        competitorName: 'Google Search',
        advantage: 'Zero ad banners, zero SEO fluff sites, and concise synthesized answers with immediate footnotes.',
        disadvantage: 'Google has broader localized real-time map listings and merchant stock data.'
      },
      {
        competitorName: 'ChatGPT',
        advantage: 'Faster live multi-source retrieval with direct transparent footnotes on every claim.',
        disadvantage: 'ChatGPT offers superior voice mode and sandbox Python data analysis.'
      }
    ],
    howToUse: [
      { step: 1, title: 'Choose Focus Mode', description: 'Select "Academic" for peer-reviewed papers or "All" for broad web research.' },
      { step: 2, title: 'Enter Detailed Inquiry', description: 'Ask complex questions like "Compare efficacy of GLP-1 agonists with citation sources".' },
      { step: 3, title: 'Inspect Inline Citations', description: 'Hover over bracketed numbers to inspect publisher sources and export references.' }
    ],
    alternatives: ['NotebookLM', 'Consensus', 'Elicit'],
    officialUrl: 'https://www.perplexity.ai',
    affiliateUrl: 'https://www.perplexity.ai',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 41000,
    badges: ['Research Champion', 'Verified Free Plan'],
    iconName: 'Compass',
    iconBg: 'bg-teal-600',
    verifiedDate: 'September 2026',
    useCases: ['Academic literature discovery', 'Market and competitor research', 'Fact-checking news claims', 'Student homework synthesis'],
    faqs: [
      { question: 'Is Perplexity free to use?', answer: 'Yes, Perplexity has a free version with unlimited quick searches and 5 free Pro searches every 4 hours without requiring a subscription.' },
      { question: 'Does Perplexity cite sources?', answer: 'Yes, Perplexity embeds clickable inline citations throughout every answer, linking directly to the original web pages or scientific journals.' }
    ]
  },
  {
    id: 'tool-notebooklm',
    slug: 'notebooklm',
    name: 'NotebookLM',
    tagline: 'Google’s AI personalized research assistant grounded entirely in your uploaded notes',
    description: 'A personalized AI notebook that analyzes up to 50 source documents, generating citations, study guides, and viral Audio Overviews.',
    fullDescription: 'NotebookLM is an AI research notebook developed by Google Labs. Powered by Gemini 1.5 Pro, NotebookLM grounds all responses strictly within your uploaded source materials (PDFs, Google Docs, slides, URLs, and YouTube videos). Its groundbreaking Audio Overview feature transforms dense reading materials into an engaging, two-host podcast conversation.',
    category: 'ai-research-tools',
    categoryLabel: 'AI Research Tools',
    categories: ['ai-research-tools', 'ai-tools-for-students', 'free-ai-tools', 'ai-productivity-tools'],
    pricingType: 'free',
    pricingSummary: '100% Free experimental tool from Google Labs with zero subscription fees.',
    pricingPlans: [
      {
        name: 'Free (Google Labs)',
        price: '$0',
        billing: 'completely free',
        popular: true,
        features: ['Up to 50 sources per notebook (500,000 words each)', 'Audio Overview two-host podcast generator', 'Grounded citations linking directly to exact source passages', 'Auto-generated study guides, FAQs, and timelines']
      }
    ],
    bestFor: 'College students, graduate researchers, legal analysts, and historians reviewing extensive collections of documents.',
    targetUsers: ['College & Graduate Students', 'Academic Researchers', 'Legal Counsel & Paralegals', 'Non-fiction Authors', 'Podcast Listeners'],
    supportedPlatforms: ['Web Browser (Desktop & Mobile optimized)', 'Google Workspace Integration'],
    keyFeatures: [
      'Grounded Responses answering questions exclusively from your uploaded documents without external hallucinations',
      'Audio Overview turning uploaded reading lists into an engaging, two-host audio discussion you can listen to on the go',
      'Source Citations highlighting the exact page and paragraph in your PDF where facts were found',
      'Pre-built Study Aids generating instant study guides, briefing documents, timelines, and FAQs'
    ],
    pros: [
      '100% free with no hidden paywalls or credit card requirements',
      'Drastically reduces hallucinations by restricting answers strictly to your sources',
      'Audio Overviews make complex technical material enjoyable and easy to absorb',
      'Supports up to 50 massive documents (up to 25 million words) per notebook'
    ],
    cons: [
      'Cannot browse the open live web (relies exclusively on user-provided sources)',
      'Audio Overview host voices are not yet directly customizable'
    ],
    limitations: [
      'Strictly grounded: will not synthesize information outside of the files you manually attach',
      'Audio Overview length and host personality cannot be steered with custom prompts yet',
      'No native mobile app store package (accessible through mobile web browser)'
    ],
    verdict: {
      summary: 'NotebookLM is Google’s secret weapon for serious students and researchers. By grounding Gemini 1.5 Pro exclusively in your uploaded source files, it virtually eradicates hallucinations, and its viral Audio Overview podcasts make dense reading addictive.',
      recommendation: 'Must-Have',
      score: 4.9,
      bottomLine: 'The single most effective study and source-synthesis tool currently available for free.'
    },
    competitorComparison: [
      {
        competitorName: 'Perplexity',
        advantage: '100% grounded in your own private reading files with zero hallucination and conversational audio podcasts.',
        disadvantage: 'Perplexity searches the open live internet for breaking news and unindexed websites.'
      },
      {
        competitorName: 'ChatPDF',
        advantage: 'Supports 50 diverse sources simultaneously (including YouTube lectures and Google Docs) completely free.',
        disadvantage: 'ChatPDF is simpler for single quick PDF queries without requiring Google login.'
      }
    ],
    howToUse: [
      { step: 1, title: 'Upload Sources', description: 'Upload up to 50 PDFs, Google Docs, copied text, or YouTube lecture links.' },
      { step: 2, title: 'Generate Audio Overview', description: 'Click "Generate" under Audio Overview to hear an AI-generated deep-dive podcast discussion.' },
      { step: 3, title: 'Query & Verify Citations', description: 'Ask questions in the chat and click citation chips to view the original source passages.' }
    ],
    alternatives: ['Perplexity', 'Paperpal', 'Consensus'],
    officialUrl: 'https://notebooklm.google.com',
    affiliateUrl: 'https://notebooklm.google.com',
    hasAffiliate: false,
    rating: 4.9,
    reviewsCount: 33000,
    badges: ['100% Free Tool', 'Viral Innovation', 'Verified Free Plan'],
    iconName: 'GraduationCap',
    iconBg: 'bg-blue-600',
    verifiedDate: 'September 2026',
    useCases: ['Exam study prep', 'Legal document analysis', 'Historical archive synthesis', 'Medical research digestion'],
    faqs: [
      { question: 'Is NotebookLM free?', answer: 'Yes, NotebookLM is 100% free for all users with a Google Account as part of Google Labs.' },
      { question: 'What is a NotebookLM Audio Overview?', answer: 'Audio Overview is an AI feature that converts your uploaded research documents into a lively, 10-minute podcast conversation between two AI hosts.' }
    ]
  },
  {
    id: 'tool-google-ai-studio',
    slug: 'google-ai-studio',
    name: 'Google AI Studio',
    tagline: 'Developer sandbox and rapid prototyping environment for Gemini 1.5 Pro and Flash',
    description: 'Google’s web-based prototyping environment for experimenting with Gemini models, system instructions, and generating API keys.',
    fullDescription: 'Google AI Studio is the fastest path from idea to functional prototype with Gemini models. Designed for developers, tinkerers, and AI builders, it provides direct access to Gemini 1.5 Pro (with up to 2M token context window) and Flash, offering fine-grained control over temperature, system prompts, structured JSON output, and instant code export in Python, JavaScript, and cURL.',
    category: 'ai-research-tools',
    categoryLabel: 'AI Research & Dev',
    categories: ['ai-research-tools', 'ai-productivity-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier with generous rate limits (up to 15 RPM on Gemini 1.5 Flash); pay-as-you-go billing available.',
    pricingPlans: [
      {
        name: 'Free Tier',
        price: '$0',
        billing: 'forever free (rate limited)',
        popular: true,
        features: ['Up to 15 Requests Per Minute (RPM) on Flash', '1M token context window access', 'Structured JSON output and function calling', 'Direct code export to Python, JS, and cURL']
      },
      {
        name: 'Pay-as-you-go',
        price: 'Usage-based',
        billing: 'per 1M input/output tokens',
        features: ['Higher rate limits (up to 1,000+ RPM)', 'Zero data logging on paid tier', 'Custom model tuning', 'Enterprise SLAs']
      }
    ],
    bestFor: 'Developers, prompt engineers, technical researchers, and students experimenting with frontier multimodal models.',
    keyFeatures: [
      '2 Million Token Context testing massive hour-long audio, video, or multi-hundred page codebases',
      'System Instructions & Temperature controls tailoring exact behavioral constraints',
      'Structured Outputs enforcing strict JSON schemas for backend API consumption',
      'One-click Get Code exporting ready-to-run code snippets into your codebase'
    ],
    pros: [
      'Generous free API rate limits with zero credit card required to start prototyping',
      'Massive multimodal context window absorbs whole video recordings and books',
      'Clean developer UI with quick model parameter adjustments',
      'Fast inference speeds on Gemini 1.5 Flash'
    ],
    cons: [
      'Designed primarily for technical developers rather than end-consumer writing',
      'Free tier prompts may be used for model improvement'
    ],
    howToUse: [
      { step: 1, title: 'Create Prompt in Sandbox', description: 'Visit aistudio.google.com and select Gemini 1.5 Pro or Flash.' },
      { step: 2, title: 'Configure System Prompt & Schema', description: 'Define role parameters, safety settings, and output formats.' },
      { step: 3, title: 'Click "Get Code"', description: 'Copy generated SDK code directly into your Node.js, Python, or web app.' }
    ],
    alternatives: ['ChatGPT', 'Claude', 'GitHub Copilot'],
    officialUrl: 'https://aistudio.google.com',
    affiliateUrl: 'https://aistudio.google.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 19000,
    badges: ['Developer Favorite', 'Verified Free Plan'],
    iconName: 'Bot',
    iconBg: 'bg-blue-600',
    verifiedDate: 'September 2026',
    useCases: ['Multimodal video reasoning', 'Extracting structured JSON from unstructured text', 'API prototyping', 'Code generation benchmarking'],
    faqs: [
      { question: 'Is Google AI Studio free?', answer: 'Yes, Google AI Studio offers a free plan with generous rate limits (up to 15 RPM on Flash) without requiring a credit card.' },
      { question: 'Can I get a Gemini API key from AI Studio?', answer: 'Yes, clicking "Get API key" creates an API key in under 10 seconds for building applications.' }
    ]
  },
  {
    id: 'tool-wolfram-alpha',
    slug: 'wolfram-alpha',
    name: 'Wolfram Alpha',
    tagline: 'Definitive computational intelligence engine for mathematics, physics, and empirical data',
    description: 'Computational knowledge engine that computes answers to mathematical equations, scientific queries, and empirical calculations.',
    fullDescription: 'Wolfram Alpha is the premier computational knowledge engine. Unlike generative language models that predict text probabilities, Wolfram Alpha computes precise mathematical, physical, engineering, and chemical answers using algorithms and a curated knowledge base, guaranteeing zero calculation hallucinations.',
    category: 'ai-tools-for-students',
    categoryLabel: 'AI Tools for Students',
    categories: ['ai-tools-for-students', 'ai-research-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free tier for standard computations; Pro Student starts at $5.00/month billed annually ($7.25/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['Instant computational answers for math, chemistry, physics, and history', 'Interactive plot visualizations', 'Basic formula calculation', 'Natural language math input']
      },
      {
        name: 'Pro Student',
        price: '$5.00',
        billing: 'per month (billed annually at $60)',
        features: ['Step-by-step math and physics solutions', 'Practice problem generator with hints', 'Upload images and datasets to compute', 'Extended computation time limits']
      },
      {
        name: 'Pro Standard',
        price: '$7.00',
        billing: 'per month (billed annually at $84)',
        features: ['Step-by-step solutions for professionals', 'Data input analysis', 'Export full calculation reports', 'Formula calculators']
      }
    ],
    bestFor: 'STEM students, engineers, mathematicians, physics researchers, and economists requiring exact calculations.',
    keyFeatures: [
      'Step-by-step mathematical problem solving detailing exact algebraic and calculus derivations',
      'Curated Empirical Knowledge Base spanning astronomy, geography, linguistics, and materials science',
      'Interactive 2D & 3D mathematical function plotting and contour modeling',
      'Natural language query parsing converting text math problems into equations'
    ],
    pros: [
      'Mathematically infallible—never hallucinates math or logic calculations',
      'Step-by-step derivations teach students how to solve problems independently',
      'Broad coverage of physics, chemistry, thermodynamics, and astronomy',
      'Free version computes complex equations without cost'
    ],
    cons: [
      'Step-by-step explanations require the Pro subscription',
      'Interface feels traditional compared to conversational chatbots'
    ],
    howToUse: [
      { step: 1, title: 'Input Equation or Science Query', description: 'Type an equation like "integrate x^2 * sin(x) dx" or "GDP of Japan vs Germany".' },
      { step: 2, title: 'View Computational Result', description: 'Review exact values, interactive plots, and alternate algebraic forms.' },
      { step: 3, title: 'Unlock Step-by-Step Derivations', description: 'Click "Step-by-step solution" to inspect every intermediate algebraic rule applied.' }
    ],
    alternatives: ['NotebookLM', 'Paperpal', 'Perplexity'],
    officialUrl: 'https://www.wolframalpha.com',
    affiliateUrl: 'https://www.wolframalpha.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 30000,
    badges: ['STEM Standard', 'Verified Free Plan'],
    iconName: 'GraduationCap',
    iconBg: 'bg-red-700',
    verifiedDate: 'September 2026',
    useCases: ['Calculus & linear algebra homework', 'Physics and thermodynamics equations', 'Chemical reaction balancing', 'Demographic and economic comparisons'],
    faqs: [
      { question: 'Is Wolfram Alpha free?', answer: 'Yes, Wolfram Alpha is free for standard computations, plotting, and factual calculations.' },
      { question: 'Does Wolfram Alpha show step-by-step solutions?', answer: 'Step-by-step math and physics derivations are available on Wolfram Alpha Pro, with discounted pricing for verified students ($5/mo).' }
    ]
  },
  {
    id: 'tool-consensus',
    slug: 'consensus',
    name: 'Consensus',
    tagline: 'AI academic search engine finding consensus across 200M+ peer-reviewed research papers',
    description: 'An AI-powered academic search engine that extracts evidence directly from peer-reviewed scientific journals to answer research questions.',
    fullDescription: 'Consensus is a specialized research engine built exclusively for peer-reviewed science. By indexing over 200 million papers from Semantic Scholar, Consensus answers questions by synthesizing findings across scientific literature and displaying the Consensus Meter—a percentage breakdown showing scientific agreement on a topic.',
    category: 'ai-research-tools',
    categoryLabel: 'AI Research Tools',
    categories: ['ai-research-tools', 'ai-tools-for-students', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with unlimited searches and 20 AI Consensus meters/month; Premium starts at $8.99/month billed annually ($11.99/mo monthly).',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['Unlimited basic academic searches', '20 AI-powered Consensus summaries/month', 'Quality indicators (sample size, study type, citations)', 'Export citations to Zotero, Mendeley, and BibTeX']
      },
      {
        name: 'Premium',
        price: '$8.99',
        billing: 'per month (billed annually at $107.88)',
        features: ['Unlimited AI Consensus summaries & GPT-4 synthesis', 'Unlimited Consensus Meter breakdowns', 'Study filters (methodology, human subjects, sample size)', 'Full-text paper search']
      }
    ],
    bestFor: 'Medical students, academic researchers, science writers, and evidence-based practitioners needing peer-reviewed facts.',
    keyFeatures: [
      'Consensus Meter displaying the exact percentage of scientific studies supporting or refuting a hypothesis',
      'AI Synthesis summarizing the collective conclusion of top research papers in 1 paragraph',
      'Study Badges showing sample size, randomized controlled trial (RCT) status, and journal SJR ranking',
      'Direct reference export to citation managers including Zotero and Mendeley'
    ],
    pros: [
      '100% grounded in peer-reviewed science—never relies on random blog opinions or SEO articles',
      'The Consensus Meter reveals scientific agreement on debated topics at a glance',
      'Highlights study designs (e.g. meta-analysis vs pilot study) so you can evaluate evidence quality',
      'Generous free plan with unlimited searches'
    ],
    cons: [
      'Best suited for questions with empirical research; less helpful for breaking general news',
      'Advanced study design filters require the Premium plan'
    ],
    howToUse: [
      { step: 1, title: 'Ask a Scientific Question', description: 'Type a direct question like "Does creatine improve cognitive performance in adults?".' },
      { step: 2, title: 'Examine Consensus Meter', description: 'See whether 85% of studies say Yes, No, or Mixed.' },
      { step: 3, title: 'Extract Citations', description: 'Review study methods and export APA/BibTeX citations to your paper.' }
    ],
    alternatives: ['Elicit', 'Perplexity', 'Paperpal'],
    officialUrl: 'https://consensus.app',
    affiliateUrl: 'https://consensus.app',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 17000,
    badges: ['Evidence-Based', 'Verified Free Plan'],
    iconName: 'Compass',
    iconBg: 'bg-emerald-600',
    verifiedDate: 'September 2026',
    useCases: ['Systematic literature reviews', 'Evidence-based medical queries', 'Thesis background research', 'Fact-checking scientific claims'],
    faqs: [
      { question: 'Is Consensus free?', answer: 'Yes, Consensus provides a free plan with unlimited searches and 20 AI Consensus summaries every month.' },
      { question: 'What is the Consensus Meter?', answer: 'The Consensus Meter analyzes relevant peer-reviewed studies and visualizes whether scientific consensus agrees (Yes, Possible, No) with a research claim.' }
    ]
  },
  {
    id: 'tool-elicit',
    slug: 'elicit',
    name: 'Elicit',
    tagline: 'AI research assistant automating systematic literature reviews and data extraction',
    description: 'Research workflow tool that searches 200M+ academic papers, synthesizes key findings, and extracts structured data into comparison tables.',
    fullDescription: 'Elicit is an AI literature review assistant built for scientists and graduate researchers. Given a research query, Elicit surfaces the most relevant papers, extracts key methodologies (population, intervention, outcome, sample size), and structures the results into an interactive comparison matrix to accelerate systematic reviews.',
    category: 'ai-research-tools',
    categoryLabel: 'AI Research Tools',
    categories: ['ai-research-tools', 'ai-tools-for-students', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 300 one-time research credits; Plus plan starts at $10/month billed annually ($12/mo monthly) for 12,000 credits/yr.',
    pricingPlans: [
      {
        name: 'Basic (Free)',
        price: '$0',
        billing: 'one-time credits',
        features: ['300 one-time research credits', 'Search 200M+ academic papers', 'Find papers from uploaded PDFs', 'Summary of top 4 papers']
      },
      {
        name: 'Plus',
        price: '$10',
        billing: 'per month (billed annually at $120)',
        popular: true,
        features: ['12,000 credits per year (with top-ups)', 'High-accuracy summary modes', 'Export data tables to CSV and RIS formats', 'Extract custom data columns across dozens of papers']
      },
      {
        name: 'Enterprise / Lab',
        price: 'Custom',
        billing: 'institutional agreement',
        features: ['Shared research workspaces', 'Custom data extraction models', 'Priority processing and dedicated training', 'SSO and admin controls']
      }
    ],
    bestFor: 'PhD candidates, academic faculty, clinical trial researchers, and policy analysts conducting systematic reviews.',
    keyFeatures: [
      'Systematic Literature Search retrieving papers using semantic relevance rather than rigid keywords',
      'Custom Data Extraction extracting specific metrics (e.g., dosage, effect size, cohort age) across 50 papers into a single table',
      'Synthesize Across Papers generating multi-paragraph reviews summarizing collective study outcomes',
      'Upload Your Own PDFs enabling data extraction on proprietary or paywalled institutional papers'
    ],
    pros: [
      'Cuts days of manual data extraction during systematic literature reviews down to hours',
      'Allows adding custom column queries to extract specific experimental variables',
      'Generates exportable CSV tables ready for statistical meta-analysis',
      'Semantic search finds papers even when researchers use different jargon'
    ],
    cons: [
      'Free tier credits are one-time and do not replenish on a monthly basis',
      'Complex multi-paper extractions consume credits steadily'
    ],
    howToUse: [
      { step: 1, title: 'Enter Research Query', description: 'Ask a question or upload a folder of downloaded PDF studies.' },
      { step: 2, title: 'Customize Table Columns', description: 'Add columns for "Methodology", "Sample Size", and "Key Findings".' },
      { step: 3, title: 'Export Systematic Matrix', description: 'Download the synthesized table as a CSV or export references to Zotero.' }
    ],
    alternatives: ['Consensus', 'Paperpal', 'Perplexity'],
    officialUrl: 'https://elicit.com',
    affiliateUrl: 'https://elicit.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 18500,
    badges: ['Literature Review Pick', 'Verified Free Plan'],
    iconName: 'Compass',
    iconBg: 'bg-indigo-600',
    verifiedDate: 'September 2026',
    useCases: ['Systematic literature reviews', 'Clinical trial variable extraction', 'Meta-analysis data structuring', 'Grant proposal background research'],
    faqs: [
      { question: 'Is Elicit free?', answer: 'Yes, Elicit provides 300 free one-time credits to test search and table extraction without entering payment info.' },
      { question: 'Can I upload my own papers to Elicit?', answer: 'Yes, you can upload your own PDFs to extract structured data columns and compare them side by side.' }
    ]
  },
  {
    id: 'tool-mendeley',
    slug: 'mendeley',
    name: 'Mendeley',
    tagline: 'Elsevier’s academic reference manager, PDF organizer, and collaborative research network',
    description: 'Trusted reference management platform allowing researchers to organize citations, annotate PDFs, and collaborate on shared libraries.',
    fullDescription: 'Mendeley (developed by Elsevier) is an essential tool for academic researchers and university students. Combining a powerful reference manager, PDF reader, and research collaboration network, Mendeley simplifies citation formatting in Microsoft Word, stores research papers in the cloud, and suggests relevant new literature based on your library.',
    category: 'ai-tools-for-students',
    categoryLabel: 'AI Tools for Students',
    categories: ['ai-tools-for-students', 'ai-research-tools', 'free-ai-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 2GB cloud library storage; Elsevier storage upgrades available for heavy researchers.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        popular: true,
        features: ['2GB cloud storage for PDFs', 'Mendeley Cite add-in for Microsoft Word', 'Web Importer extension for 1-click citation saving', 'Mendeley Reference Manager desktop app']
      },
      {
        name: 'Storage Upgrades',
        price: 'From $4.99',
        billing: 'per month',
        features: ['Up to 5GB or unlimited cloud storage', 'Larger collaborative group sizes', 'Institutional library sharing options']
      }
    ],
    bestFor: 'University students, academic researchers, laboratory groups, and thesis authors managing hundreds of citations.',
    keyFeatures: [
      'Mendeley Cite Word Add-in inserting citations and generating bibliographies in thousands of citation styles (APA, IEEE, Vancouver)',
      'Mendeley Web Importer saving articles, DOIs, and full-text PDFs directly from browser tabs with 1 click',
      'PDF Annotation & Notebook highlighting passages and recording thoughts synced across devices',
      'Smart Recommendations suggesting related research papers based on the contents of your library'
    ],
    pros: [
      'Free plan with 2GB storage is more than sufficient for most undergraduate and master’s students',
      'Seamless Microsoft Word citation plugin simplifies formatting research papers',
      'Backed by Elsevier with reliable metadata retrieval for scientific papers',
      'Syncs across desktop, web, and mobile seamlessly'
    ],
    cons: [
      'Mobile app has been discontinued in favor of responsive web access',
      'Focuses purely on reference management rather than generative AI writing'
    ],
    howToUse: [
      { step: 1, title: 'Install Web Importer & Desktop App', description: 'Add the browser extension and download Mendeley Reference Manager.' },
      { step: 2, title: 'Import Papers with 1 Click', description: 'Browse Google Scholar or PubMed and click the extension to import metadata and PDFs.' },
      { step: 3, title: 'Cite inside Microsoft Word', description: 'Open Mendeley Cite inside Word, choose your journal style, and insert formatted bibliographies.' }
    ],
    alternatives: ['Paperpal', 'Consensus', 'NotebookLM'],
    officialUrl: 'https://www.mendeley.com',
    affiliateUrl: 'https://www.mendeley.com',
    hasAffiliate: false,
    rating: 4.7,
    reviewsCount: 35000,
    badges: ['Academic Standard', 'Verified Free Plan'],
    iconName: 'GraduationCap',
    iconBg: 'bg-red-800',
    verifiedDate: 'September 2026',
    useCases: ['Thesis bibliography formatting', 'PDF paper organization', 'Lab research collaboration', 'Journal style citation conversion'],
    faqs: [
      { question: 'Is Mendeley free?', answer: 'Yes, Mendeley offers a free tier that includes 2GB of cloud storage and free access to the Mendeley Cite Microsoft Word add-in.' },
      { question: 'Does Mendeley work with Microsoft Word?', answer: 'Yes, the official Mendeley Cite add-in integrates directly into Microsoft Word to insert in-text citations and generate formatted reference lists.' }
    ]
  },
  {
    id: 'tool-paperpal',
    slug: 'paperpal',
    name: 'Paperpal',
    tagline: 'AI academic writing assistant and manuscript checker trained on millions of published papers',
    description: 'Academic writing companion providing real-time language editing, scientific proofreading, and journal submission compliance checks.',
    fullDescription: 'Paperpal is an AI academic writing tool built specifically for researchers, professors, and non-native English scholars. Trained on millions of published research manuscripts, Paperpal catches discipline-specific grammar errors, polishes academic tone, rephrases passive statements, and checks manuscripts against top journal submission requirements.',
    category: 'ai-tools-for-students',
    categoryLabel: 'AI Tools for Students',
    categories: ['ai-tools-for-students', 'ai-research-tools', 'free-ai-tools', 'ai-writing-tools'],
    pricingType: 'freemium',
    pricingSummary: 'Free plan with 200 language suggestions/month; Prime plan starts at $9.92/month billed annually ($119/yr) or $19 monthly.',
    pricingPlans: [
      {
        name: 'Free',
        price: '$0',
        billing: 'forever free',
        features: ['200 language suggestions per month', '5 AI write & rewrite prompts/day', 'Basic grammar and spell check', 'Paperpal for Word add-in access']
      },
      {
        name: 'Prime',
        price: '$9.92',
        billing: 'per month (billed annually at $119)',
        popular: true,
        features: ['Unlimited language suggestions and rewrites', 'Full academic journal submission readiness checks', 'Plagiarism checking (7,000 words/month)', 'Unlimited scientific translations (25+ languages)']
      }
    ],
    bestFor: 'Academics, international graduate students, medical researchers, and authors preparing manuscripts for peer-reviewed journals.',
    keyFeatures: [
      'Academic-Specific Language Engine trained on millions of peer-reviewed papers to preserve scholarly conventions',
      'Journal Submission Readiness Check analyzing word count, ethical declarations, citations, and figure formatting',
      'Paperpal for Microsoft Word editing directly inside research drafts without copy-pasting',
      'Academic Paraphrasing & Rewriting improving conciseness and clarity while keeping scientific terminology intact'
    ],
    pros: [
      'Unlike general grammar checkers, Paperpal understands technical medical and scientific jargon',
      'Journal compliance checks prevent desk rejections from leading journal publishers',
      'Integrates directly into Microsoft Word for an uninterrupted writing workflow',
      'Generous free plan for students checking conference abstracts and short papers'
    ],
    cons: [
      'Plagiarism checker is word-capped even on the Prime tier',
      'Specialized purely for scientific academic writing rather than creative fiction'
    ],
    howToUse: [
      { step: 1, title: 'Install Paperpal for Word', description: 'Add the official add-in from Microsoft AppSource or use the web editor.' },
      { step: 2, title: 'Review Academic Corrections', description: 'Accept suggestions tailored to academic precision, tone formality, and conciseness.' },
      { step: 3, title: 'Run Journal Submission Check', description: 'Check citations, ethical disclosures, and abstract formatting before submission.' }
    ],
    alternatives: ['Grammarly', 'QuillBot', 'Consensus'],
    officialUrl: 'https://paperpal.com',
    affiliateUrl: 'https://paperpal.com',
    hasAffiliate: false,
    rating: 4.8,
    reviewsCount: 16000,
    badges: ['Academic Journal Pick', 'Verified Free Plan'],
    iconName: 'FileText',
    iconBg: 'bg-teal-700',
    verifiedDate: 'September 2026',
    useCases: ['Journal manuscript proofreading', 'Dissertation editing', 'Abstract conciseness polishing', 'Academic English language enhancement'],
    faqs: [
      { question: 'Is Paperpal free?', answer: 'Yes, Paperpal provides a free plan with 200 language suggestions and 5 AI rewrites per day forever.' },
      { question: 'Why is Paperpal better for scientific papers than general grammar checkers?', answer: 'Paperpal is trained specifically on millions of published peer-reviewed journal articles, so it recognizes scientific nomenclature and academic tone without flagging technical jargon as errors.' }
    ]
  }
];
