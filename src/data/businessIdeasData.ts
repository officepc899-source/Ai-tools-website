import { BusinessIdea } from '../types';

export const INITIAL_BUSINESS_IDEAS: BusinessIdea[] = [
  {
    id: 'idea-1',
    slug: 'ai-content-repurposing-agency',
    title: 'AI Content Repurposing Agency for Podcasts & CEOs',
    category: 'ai-business',
    categoryLabel: 'AI Business Ideas',
    startupCost: '$100 - $350',
    timeToLaunch: '1 - 2 weeks',
    earningPotential: '$4,000 - $15,000 / month',
    difficulty: 'Beginner',
    summary: 'Turn single 60-minute executive podcasts, interviews, or keynote talks into 30+ multi-channel digital assets (LinkedIn carousels, TikToks, newsletters, and blog posts) using AI-assisted video and text pipelines.',
    detailedDescription: 'Busy business founders, podcasters, and venture capitalists understand that content distribution is critical, but they rarely have the 20 hours per week needed to manually cut videos, transcribe audio, format carousels, and write SEO summaries. An AI Content Repurposing Agency leverages tools like Opus Clip, Claude 3.5 Sonnet, and Canva Magic Studio to deliver turnkey monthly content engines for a monthly retainer.',
    targetMarket: 'B2B podcast hosts, keynote speakers, funded startup founders, and boutique consulting firm leaders.',
    monetizationMethods: [
      'Monthly retainer packages ($1,500 - $3,500/month per client)',
      'Single event or launch intensive sprint packages ($1,000/one-time)',
      'SEO blog and newsletter syndication add-ons ($500/month)'
    ],
    techStack: ['Opus Clip', 'Descript', 'Claude 3.5 Sonnet', 'Canva Magic Studio', 'Notion'],
    stepByStepRoadmap: [
      {
        step: 1,
        phase: 'Proof of Concept Portfolio',
        action: 'Pick 3 public YouTube podcasts with known founders. Repurpose one episode each into 3 vertical clips, 1 LinkedIn post, and a newsletter summary. Send them as free value upfront.',
        toolsRecommended: ['Opus Clip', 'Canva']
      },
      {
        step: 2,
        phase: 'Productized Packaging',
        action: 'Define a crystal clear package: "Send us 1 video per week; we deliver 5 viral vertical clips, 3 LinkedIn carousels, and 1 newsletter every week for $1,950/mo".',
        toolsRecommended: ['Notion', 'Stripe']
      },
      {
        step: 3,
        phase: 'Cold Outreach & Partnerships',
        action: 'Reach out to top 100 business podcast hosts via LinkedIn and email with tailored short video samples.',
        toolsRecommended: ['Make.com', 'Hunter.io']
      },
      {
        step: 4,
        phase: 'Scale with Virtual Editors',
        action: 'Once you hit 4 clients ($8,000/mo), hire freelance junior video polishers to handle timeline finalization.',
        toolsRecommended: ['Slack', 'Loom']
      }
    ],
    recommendedToolSlugs: ['opus-clip', 'claude', 'canva-magic-studio', 'chatgpt'],
    pros: [
      'Extremely high perceived value for busy founders',
      'Recurring monthly retainer model yields predictable revenue',
      'AI does 80% of the heavy lifting for transcription and captioning',
      'No physical inventory or costly equipment required'
    ],
    cons: [
      'Client relationship and deadline management requires responsiveness',
      'Requires human quality assurance to make sure nuances and accents are right'
    ],
    caseStudy: {
      title: 'Solo Founder Scaled to $11,500/mo in 90 Days',
      result: 'Closed 6 podcast clients paying $1,800 - $2,200/mo utilizing a 48-hour delivery SLA.',
      takeaway: 'Providing a finished sample video before even asking for a phone call tripled their cold pitch response rate.'
    }
  },
  {
    id: 'idea-2',
    slug: 'niche-micro-saas-ai-wrapper',
    title: 'Niche B2B Micro-SaaS AI Tool',
    category: 'online-business',
    categoryLabel: 'Online Business Ideas',
    startupCost: '$200 - $600',
    timeToLaunch: '2 - 4 weeks',
    earningPotential: '$2,000 - $25,000 / month',
    difficulty: 'Intermediate',
    summary: 'Build a focused, single-purpose software application that solves one painful paperwork or drafting bottleneck for a specific vertical (such as dental clinical notes, real estate listing descriptions, or commercial lease summaries).',
    detailedDescription: 'Generic AI chatbots like ChatGPT can theoretically write anything, but non-technical industry professionals do not want to learn prompt engineering. A vertical Micro-SaaS provides clean form inputs, connects directly to AI APIs with proprietary system prompts, and outputs compliance-ready documents formatted according to industry standards.',
    targetMarket: 'Specialized professionals: Realtors, insurance adjusters, HR recruiters, and private clinic practitioners.',
    monetizationMethods: [
      'Tiered SaaS subscriptions ($29 - $99/month)',
      'Annual prepay discounts with 2 months free',
      'Pay-per-generation credits for seasonal professionals'
    ],
    techStack: ['Cursor', 'Next.js or Vite React', 'OpenAI API / Claude API', 'Stripe', 'Supabase'],
    stepByStepRoadmap: [
      {
        step: 1,
        phase: 'Niche Problem Discovery',
        action: 'Interview 10 local service business owners (e.g. property managers) about their most tedious daily typing tasks.',
        toolsRecommended: ['Loom', 'Google Meet']
      },
      {
        step: 2,
        phase: 'Rapid Prototype with Cursor & v0',
        action: 'Build a functional web application with a 3-field input form and a clean PDF generator in under 7 days.',
        toolsRecommended: ['cursor', 'claude']
      },
      {
        step: 3,
        phase: 'Beta Launch & Feedback Loop',
        action: 'Offer free lifetime access to 15 early testers in exchange for detailed video feedback and testimonials.',
        toolsRecommended: ['Tally Forms']
      },
      {
        step: 4,
        phase: 'Paid Acquisition & Organic SEO',
        action: 'Publish targeted SEO landing pages targeting terms like "automated commercial lease summary generator".',
        toolsRecommended: ['surfer-seo']
      }
    ],
    recommendedToolSlugs: ['cursor', 'claude', 'make-com'],
    pros: [
      'High profit margins (85%+ software margins)',
      'Low churn once integrated into daily professional workflows',
      'Can be created and maintained by a solo developer using AI coding tools',
      'High valuation multiples if you decide to sell on Acquire.com'
    ],
    cons: [
      'Requires handling API rate limits and customer support',
      'Risk of copycat products if you do not cultivate deep niche distribution'
    ],
    caseStudy: {
      title: 'Solo Engineer Built Real Estate AI App to $7,400 MRR',
      result: 'Developed in 3 weekends using Cursor; currently serves 180 real estate brokerages.',
      takeaway: 'Focusing strictly on MLS compliance guidelines made realtors choose it over general ChatGPT.'
    }
  },
  {
    id: 'idea-3',
    slug: 'ai-prompt-packs-digital-templates',
    title: 'Curated AI Prompt Packs & Notion System Studio',
    category: 'side-hustle',
    categoryLabel: 'Side Hustle Ideas',
    startupCost: '$50 - $150',
    timeToLaunch: '3 - 7 days',
    earningPotential: '$1,500 - $8,000 / month',
    difficulty: 'Beginner',
    summary: 'Package battle-tested, high-converting prompts, Midjourney formula recipes, and connected Notion OS workspaces into digital download products sold on Gumroad, Etsy, and your own website.',
    detailedDescription: 'Entrepreneurs, solopreneurs, and marketers are eager to integrate AI into their routines but struggle with mediocre results due to weak prompting. By rigorously testing, organizing, and styling specialized prompt libraries (e.g., "500 High-Ticket Sales Email Prompts" or "Architectural Interior Rendering Midjourney Bible"), you create zero-marginal-cost digital assets that sell 24/7.',
    targetMarket: 'Solopreneurs, Etsy digital store buyers, freelance copywriters, and Pinterest-driven creative professionals.',
    monetizationMethods: [
      'Individual digital downloads ($17 - $47)',
      'All-access Lifetime Vault Bundles ($97 - $197)',
      'Affiliate cross-promotions of recommended software tools ($20 - $50 per sale)'
    ],
    techStack: ['Notion', 'Canva Magic Studio', 'Gumroad / LemonSqueezy', 'ChatGPT', 'Midjourney'],
    stepByStepRoadmap: [
      {
        step: 1,
        phase: 'Identify High-Demand Intent',
        action: 'Check Pinterest search trends, Etsy digital download leaderboards, and Reddit communities for common AI queries.',
        toolsRecommended: ['perplexity-ai']
      },
      {
        step: 2,
        phase: 'Curate & Rigorously Test 250+ Prompts',
        action: 'Test each prompt against multiple test cases to guarantee consistent, high-utility outputs.',
        toolsRecommended: ['chatgpt', 'claude']
      },
      {
        step: 3,
        phase: 'Package Inside Notion & Design Canva Covers',
        action: 'Build an intuitive, searchable Notion database with filtering tags and produce sleek 3D mockups.',
        toolsRecommended: ['notion-ai', 'canva-magic-studio']
      },
      {
        step: 4,
        phase: 'Pinterest & Social Distribution Funnel',
        action: 'Create 15-20 Pinterest pins per week showcasing before-and-after prompt results linking to your checkout.',
        toolsRecommended: ['canva-magic-studio']
      }
    ],
    recommendedToolSlugs: ['notion-ai', 'canva-magic-studio', 'midjourney', 'chatgpt'],
    pros: [
      'Zero cost of goods sold (100% gross profit after transaction fees)',
      'Create once, sell infinitely with zero shipping logistics',
      'Strong synergy with organic Pinterest traffic and TikTok carousels',
      'Can be built and launched entirely over a single weekend'
    ],
    cons: [
      'Requires continuous organic traffic generation',
      'Must offer genuinely tested, non-generic prompt engineering to get 5-star reviews'
    ],
    caseStudy: {
      title: 'Digital Creator Generated $28,000 in First Year',
      result: 'Built 6 themed Notion & Midjourney bundles driving traffic primarily via Pinterest pins.',
      takeaway: 'Interactive Notion databases with copy-to-clipboard buttons convert 40% higher than static PDF ebooks.'
    }
  },
  {
    id: 'idea-4',
    slug: 'local-business-ai-chat-automation',
    title: 'Local Business AI Lead Bot & Appointment Setter',
    category: 'small-business',
    categoryLabel: 'Small Business Ideas',
    startupCost: '$150 - $400',
    timeToLaunch: '2 - 3 weeks',
    earningPotential: '$3,000 - $12,000 / month',
    difficulty: 'Intermediate',
    summary: 'Deploy custom-trained 24/7 AI conversational agents on local home service websites (plumbers, roofers, cosmetic dentists) to answer inquiries, qualify leads, and book appointments automatically.',
    detailedDescription: 'Local service businesses lose over 50% of website visitors because potential customers submit inquiries after hours or on weekends when nobody answers the phone. By installing an AI chat assistant grounded in the company’s services, pricing guidelines, and calendar availability, you capture leads instantly and book them directly into Calendly or ServiceTitan.',
    targetMarket: 'Home service contractors (HVAC, electricians, roofing, pest control), cosmetic medical clinics, and law firms.',
    monetizationMethods: [
      'Setup & training fee ($750 - $1,500 one-time)',
      'Monthly software hosting, maintenance & token fee ($199 - $499/month per client)',
      'Performance commission per qualified lead booked ($25 - $50)'
    ],
    techStack: ['Make.com', 'OpenAI Assistant API', 'Voiceflow / Botpress', 'Calendly', 'Twilio SMS'],
    stepByStepRoadmap: [
      {
        step: 1,
        phase: 'Build a Local Demo Bot',
        action: 'Build a working chatbot configured for a realistic roofing company with emergency booking logic.',
        toolsRecommended: ['make-com', 'chatgpt']
      },
      {
        step: 2,
        phase: 'Audit Local Competitor Websites',
        action: 'Locate 30 high-ticket contractors in your metropolitan area that lack after-hours live chat.',
        toolsRecommended: ['perplexity-ai']
      },
      {
        step: 3,
        phase: 'Record 2-Minute Personalized Loom Demos',
        action: 'Show their website side-by-side with your interactive appointment booking bot.',
        toolsRecommended: ['Loom']
      },
      {
        step: 4,
        phase: 'Install & Connect to Client Calendar',
        action: 'Paste a single line of JavaScript into their WordPress/Webflow header and configure SMS notifications.',
        toolsRecommended: ['make-com']
      }
    ],
    recommendedToolSlugs: ['make-com', 'chatgpt', 'claude'],
    pros: [
      'Direct, provable ROI for clients (one extra roofing job pays for the bot for a whole year)',
      'Sticky recurring monthly retainer with very low churn',
      'Minimal technical coding needed using modern visual bot builders',
      'Local businesses appreciate having a reliable partner in their time zone'
    ],
    cons: [
      'Requires client cooperation to establish accurate pricing FAQs',
      'Must monitor bot conversations initially to prevent misstatements'
    ],
    caseStudy: {
      title: 'Agency Secured 9 Home Service Clients in 4 Months',
      result: 'Generated $3,150/month in recurring subscriptions plus $9,000 in upfront setup fees.',
      takeaway: 'Adding instant SMS confirmation to the business owner’s phone whenever a lead booked made the service indispensable.'
    }
  }
];
