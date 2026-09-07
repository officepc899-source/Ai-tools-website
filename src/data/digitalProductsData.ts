import { DigitalProduct } from '../types';

export const INITIAL_DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod-1',
    slug: 'midjourney-architecture-product-prompt-vault',
    title: '1,000+ Midjourney Architectural & Product Design Prompts',
    category: 'prompt-packs',
    categoryLabel: 'AI Prompt Packs',
    price: 27,
    originalPrice: 67,
    description: 'Battle-tested Midjourney v6 recipes for photorealistic commercial renders, interior design moodboards, and e-commerce packaging concepts.',
    fullOverview: 'The definitive visual prompt bible for designers, agencies, and 3D concept creators. Includes exact camera lens descriptors, lighting styles (cinematic, Scandinavian daylight, brutalist concrete, volumetric neon), aspect ratio guides, and negative prompting frameworks.',
    previewBadge: '1,000+ Prompts • Tested on v6',
    format: 'Notion Database + PDF Guide',
    rating: 4.9,
    reviewsCount: 384,
    salesCount: 1420,
    downloadIncludes: [
      'Searchable Notion prompt database with visual sample outputs',
      'High-resolution PDF cheat sheet for offline reference',
      'Parameter guide (--sref, --cref, --stylize, --weird values explained)',
      'Commercial usage license for client and resale projects'
    ],
    sampleItems: [
      '"Scandinavian minimalist kitchen, natural oak cabinetry, fluted glass, morning sunlight through floor-to-ceiling windows, Hasselblad H6D-100c, 35mm lens, f/2.8, warm neutral tones --ar 16:9 --v 6.0"',
      '"Biomorphic architectural pavilion, parametric timber curves, kinetic solar facade, dusk mist, dramatic uplighting, wide angle architectural photography --ar 3:2 --style raw"',
      '"Cosmetics glass serum bottle mockup on textured travertine stone, gentle water ripples, clean studio lighting, hyper-detailed reflections, commercial product photo --ar 4:5"'
    ],
    buyUrl: '#buy-midjourney-pack',
    badgeText: 'Best Seller',
    colorScheme: 'from-indigo-600 to-violet-600'
  },
  {
    id: 'prod-2',
    slug: 'solopreneur-os-notion-template',
    title: 'Solopreneur AI Command Center: Ultimate Notion OS',
    category: 'notion-templates',
    categoryLabel: 'Notion Templates',
    price: 39,
    originalPrice: 89,
    description: 'An interconnected Notion workspace system built specifically for one-person online businesses, freelancers, and digital creators.',
    fullOverview: 'Stop jumping between 10 fragmented apps. This all-in-one Notion workspace integrates client CRM, project management, monthly revenue analytics, content calendar with AI hooks, and digital product inventory in one unified dashboard.',
    previewBadge: 'Full Workspace • 1-Click Duplicate',
    format: 'Notion Template Link',
    rating: 4.95,
    reviewsCount: 512,
    salesCount: 2280,
    downloadIncludes: [
      'Client Portal & Onboarding CRM with automatic invoice tracking',
      'Multi-Platform Content Calendar (YouTube, Pinterest, LinkedIn, Blog)',
      'AI Prompt Vault pre-loaded with 200+ copywriting formulas',
      'Digital Product Sales & Profit Tracking Dashboard',
      'Detailed video walkthrough & setup tutorial'
    ],
    sampleItems: [
      'Pipeline CRM with Kanban stage automation and follow-up alerts',
      'Content repurposing matrix linking long-form pillars to 5 micro-assets',
      'Finance tracker calculating Stripe fees, software expenses, and net profit'
    ],
    buyUrl: '#buy-solopreneur-os',
    badgeText: 'Featured',
    colorScheme: 'from-stone-700 to-slate-900'
  },
  {
    id: 'prod-3',
    slug: 'viral-pinterest-canva-templates',
    title: '150+ Viral Pinterest Pin Canva Templates for Bloggers & Creators',
    category: 'canva-templates',
    categoryLabel: 'Canva Templates',
    price: 19,
    originalPrice: 47,
    description: 'High-CTR Pinterest pins designed to maximize clicks, repins, and affiliate traffic for AI blogs, business ideas, and digital downloads.',
    fullOverview: 'Crafted using eye-tracking data and viral Pinterest layout psychology. Includes listicle pins, mockup showcases, step-by-step guides, comparison tables, and quote graphics that look stunning on mobile screens.',
    previewBadge: '150 Customizable Pins • Free Canva Compatible',
    format: 'Canva Template Direct Links',
    rating: 4.85,
    reviewsCount: 290,
    salesCount: 1670,
    downloadIncludes: [
      '150 aesthetic Pinterest pin designs in 1000x1500px standard aspect ratio',
      'Both Light & Dark modern tech themes with readable typography',
      'Canva Free & Pro compatible (no premium elements required)',
      'Bonus: 50 Pinterest SEO headline formulas that drive high click-through rates'
    ],
    sampleItems: [
      'Top 10 AI Tools comparison carousel pin layout',
      'Digital product 3D mockup frame with price pill and "Save This Pin" callout',
      'Step-by-step side hustle blueprint infographic template'
    ],
    buyUrl: '#buy-canva-pins',
    badgeText: 'Trending',
    colorScheme: 'from-rose-500 to-orange-500'
  },
  {
    id: 'prod-4',
    slug: 'zero-to-one-ai-business-blueprint-ebook',
    title: 'The Zero-to-One AI Business Blueprint (Comprehensive Guide)',
    category: 'ebooks',
    categoryLabel: 'Ebooks',
    price: 24,
    originalPrice: 49,
    description: 'A 140-page tactical handbook on launching, operating, and monetizing lean AI-assisted digital business models.',
    fullOverview: 'Skip the vague motivational fluff. This tactical ebook breaks down the exact operational playbooks for four high-margin models: AI content agencies, vertical Micro-SaaS tools, digital template marketplaces, and paid newsletter communities. Packed with real case studies, revenue math, and copyable cold pitch templates.',
    previewBadge: '140 Pages • EPUB & PDF Included',
    format: 'PDF, EPUB & Kindle Formats',
    rating: 4.8,
    reviewsCount: 184,
    salesCount: 890,
    downloadIncludes: [
      '140-page illustrated PDF and EPUB versions for mobile and e-readers',
      '12 copy-and-paste client email outreach templates',
      'Unit economics spreadsheet calculating pricing and break-even points',
      'Lifetime updates whenever new AI workflow tools are incorporated'
    ],
    sampleItems: [
      'Chapter 3: The 48-Hour Micro-SaaS Validation Framework',
      'Chapter 6: Designing High-Ticket Productized Retainers with Make.com',
      'Chapter 9: The Pinterest-to-Gumroad Funnel Architecture'
    ],
    buyUrl: '#buy-ai-blueprint',
    badgeText: 'New Release',
    colorScheme: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'prod-5',
    slug: 'saas-financial-runway-model-template',
    title: 'SaaS & Digital Business Financial Model & Runway Calculator',
    category: 'templates',
    categoryLabel: 'Business Templates',
    price: 29,
    originalPrice: 65,
    description: 'Clean Google Sheets and Excel financial model forecasting MRR growth, churn, customer acquisition cost (CAC), and runway.',
    fullOverview: 'Built by venture analysts for bootstrapped digital founders. Plug in your current monthly subscriptions, churn rate, and expected ad spend to project 24 months of cash flow, margins, and break-even milestones with dynamic interactive charts.',
    previewBadge: 'Google Sheets & Excel • Instant Copy',
    format: 'Google Sheets + Excel (.xlsx)',
    rating: 4.9,
    reviewsCount: 142,
    salesCount: 650,
    downloadIncludes: [
      'Fully automated Google Sheets template with locked formula protections',
      'Microsoft Excel version with pre-formatted pivot tables',
      'SaaS metrics dashboard (MRR, ARR, LTV, CAC, Payback Period)',
      'Scenario modeling tab (Conservative, Base Case, Aggressive growth)'
    ],
    sampleItems: [
      'Dynamic waterfall chart displaying net new MRR month-over-month',
      'Burn rate tracker with runway countdown in days and months',
      'Hiring and contractor cost allocation module'
    ],
    buyUrl: '#buy-financial-model',
    badgeText: 'Top Rated',
    colorScheme: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'prod-6',
    slug: 'ai-prompt-vault-sales-copywriting',
    title: '500+ High-Ticket Copywriting & Sales AI Prompt Vault',
    category: 'prompt-packs',
    categoryLabel: 'AI Prompt Packs',
    price: 22,
    originalPrice: 55,
    description: 'Transform Claude and ChatGPT into world-class direct response copywriters trained on classic advertising frameworks (AIDA, PAS, BAB).',
    fullOverview: 'Writing high-converting landing pages, email nurture sequences, and Facebook/Google ads normally takes days of agonizing drafting. This prompt library guides AI models through deep audience empathy mapping before writing a single headline, producing crisp, non-robotic sales copy that converts.',
    previewBadge: '500+ Copy Prompts • Multi-Framework',
    format: 'Notion Database + Web App Access',
    rating: 4.88,
    reviewsCount: 245,
    salesCount: 1190,
    downloadIncludes: [
      '500+ classified prompts covering 18 sales copy formats',
      'Interactive fill-in-the-blank brackets for rapid customization',
      'Hook library with 100 proven email subject lines and video openings',
      'Checklist for de-biasing AI copy and removing robotic filler words'
    ],
    sampleItems: [
      'High-ticket consulting landing page hero headline generator prompt',
      '5-part welcome email sequence for digital product purchasers',
      'Objection-handling FAQs builder based on competitor customer reviews'
    ],
    buyUrl: '#buy-copywriting-vault',
    badgeText: 'Creator Pick',
    colorScheme: 'from-amber-600 to-orange-600'
  }
];
