export interface AIPrompt {
  id: string;
  title: string;
  category: 'Marketing' | 'Coding' | 'Writing' | 'Business' | 'Design' | 'Productivity';
  targetModel: 'ChatGPT' | 'Claude' | 'Gemini' | 'Midjourney' | 'Universal';
  description: string;
  promptText: string;
  variables?: string[];
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const AI_PROMPTS: AIPrompt[] = [
  {
    id: 'p1',
    title: 'High-Converting Landing Page Copywriting',
    category: 'Marketing',
    targetModel: 'ChatGPT',
    description: 'Generates a complete SaaS landing page layout with headline, problem-solution narrative, social proof triggers, and CTA.',
    promptText: `Act as a world-class conversion rate optimization copywriter with 15+ years experience. 
I am launching a new product: [PRODUCT_NAME].
Target Audience: [TARGET_AUDIENCE]
Primary Problem it Solves: [PRIMARY_PROBLEM]
Key Differentiator: [KEY_DIFFERENTIATOR]

Write a complete, high-converting landing page structure following the PAS (Problem-Agitate-Solution) framework:
1. Above-The-Fold: Punchy H1 (under 8 words), crisp subheadline explaining the transformation, primary CTA button copy, and a 3-point micro-trust bar.
2. The Pain Agitation: 3 real-world friction points the audience experiences daily.
3. The Solution & Value Proposition: 3 primary feature-benefit pairs focusing on outcomes, not just specs.
4. Social Proof & Authority: 2 sample testimonial archetypes with believable measurable outcomes.
5. Risk Reversal: A compelling guarantee statement and an objection-crushing FAQ (3 critical questions).
6. Final Call to Action. Keep the tone modern, confident, and free of corporate jargon.`,
    tags: ['Landing Page', 'Copywriting', 'CRO', 'SaaS'],
    difficulty: 'Intermediate'
  },
  {
    id: 'p2',
    title: 'Clean Architecture React TypeScript Component Refactor',
    category: 'Coding',
    targetModel: 'Claude',
    description: 'Refactors messy React components into clean, accessible, type-safe functional modules with hooks and error boundaries.',
    promptText: `Act as a Staff Frontend Engineer specializing in React 19, TypeScript 5, and Tailwind CSS.
Review and refactor the following component code according to strict Clean Code principles:

[PASTE_COMPONENT_CODE_HERE]

Requirements:
1. Extract custom hooks for complex business logic, async fetches, or state orchestration.
2. Ensure 100% strict TypeScript types with zero 'any' and well-documented interfaces.
3. Apply Tailwind CSS utility classes with responsive variants (sm, md, lg) and dark mode support.
4. Implement full ARIA accessibility (keyboard navigation, aria-expanded, screen-reader labels).
5. Explain every architectural choice and highlight performance optimizations (memoization, re-render avoidance).`,
    tags: ['React', 'TypeScript', 'Tailwind', 'Refactoring'],
    difficulty: 'Advanced'
  },
  {
    id: 'p3',
    title: 'Photorealistic Cinematic Midjourney v6 Prompt Generator',
    category: 'Design',
    targetModel: 'Midjourney',
    description: 'Creates hyper-detailed visual prompts with camera angles, lighting conditions, rendering engines, and aspect ratios.',
    promptText: `Subject: [DESCRIBE_YOUR_SUBJECT]
Vibe: [E.G. Cyberpunk, Neo-Tokyo, Editorial High-Fashion, Sci-Fi Minimalist]

Generate 3 Midjourney v6 prompt variations:
- Option 1 (Cinematic 35mm Photography): Specify film stock (Kodak Portra 400 or Ilford HP5), lens focal length (e.g. 85mm f/1.4), volumetric natural lighting, shallow depth of field, raw aesthetic, --ar 16:9 --v 6.1 --style raw.
- Option 2 (High-End Editorial Studio): Clean neutral backdrop, softbox diffusion, sharp micro-textures, Octane render quality, --ar 4:5 --v 6.1.
- Option 3 (Futuristic Concept Art): Atmospheric perspective, neon rim highlights, ray tracing reflections, intricate biomechanical accents, Unreal Engine 5 aesthetic, --ar 21:9 --v 6.1.`,
    tags: ['Midjourney', 'Image Generation', 'Cinematography', 'Concept Art'],
    difficulty: 'Intermediate'
  },
  {
    id: 'p4',
    title: 'Executive AI Business Strategy & Automation Audit',
    category: 'Business',
    targetModel: 'Universal',
    description: 'Conducts an end-to-end audit of business operational bottlenecks to identify high-ROI AI automation opportunities.',
    promptText: `Act as a senior management consultant and enterprise AI transformation advisor.
Company Industry: [INDUSTRY]
Team Size: [TEAM_SIZE]
Current Main Operational Bottlenecks: [LIST_2_3_BOTTLENECKS]

Generate an actionable AI Automation Opportunity Matrix:
1. Quick Wins (1-2 weeks): Low complexity, immediate time savings (e.g., meeting notes, customer email triage, first-draft content generation). Detail the exact tools (Zapier, Make, Claude, Otter) and setup time.
2. High-Impact Strategic Workflows (1-3 months): Medium complexity, high ROI (e.g., custom retrieval-augmented sales chatbot, automated lead scoring, programmatic SEO).
3. Risk & Governance Assessment: Data privacy precautions, client confidentiality considerations, and human-in-the-loop review protocols.
4. Estimated Annual Hours Saved and direct ROI calculation model.`,
    tags: ['Business', 'Automation', 'Strategy', 'Consulting'],
    difficulty: 'Advanced'
  },
  {
    id: 'p5',
    title: 'Viral LinkedIn Thought Leadership & Hook Framework',
    category: 'Writing',
    targetModel: 'ChatGPT',
    description: 'Transforms complex professional learnings into engaging, scannable LinkedIn posts that trigger high organic reach.',
    promptText: `Act as an elite LinkedIn ghostwriter who has generated 50M+ organic impressions.
Core Insight or Lesson to Share: [INSERT_RAW_IDEA_OR_STORY]
Target Audience: [FOUNDERS, DEVELOPERS, PRODUCT MANAGERS, ETC.]

Draft 2 viral LinkedIn post variations:
Structure:
- The Hook (Lines 1-2): Must stop the scroll in under 2 seconds. Use a contrarian truth, a surprising data point, or a vulnerable failure-to-success transition.
- The Re-Hook (Line 3): Compel them to click "...see more".
- The Meat: Short 1-2 sentence paragraphs, spaced out for mobile scanning. Bullet points for lessons or steps.
- The Golden Takeaway: One memorable principle phrased simply.
- The Engagement Driver: A genuine, specific question that invites thoughtful comments instead of generic replies.
Constraint: No generic motivational platitudes or fake storytelling. Keep it grounded in real craft.`,
    tags: ['LinkedIn', 'Social Media', 'Writing', 'Personal Brand'],
    difficulty: 'Beginner'
  },
  {
    id: 'p6',
    title: 'Academic Literature Review & Research Synthesis',
    category: 'Productivity',
    targetModel: 'Gemini',
    description: 'Analyzes academic papers and extracts key hypotheses, methodological trade-offs, and empirical findings.',
    promptText: `Act as a distinguished research professor and peer-reviewer.
Research Topic: [RESEARCH_TOPIC]
Target Focus: [E.G. Recent deep learning architectures, economic impact of automation]

Synthesize the current academic discourse on this topic:
1. The Core Consensus: What has empirical evidence conclusively established over the past 3 years?
2. The Active Debates: Where do top researchers fundamentally disagree regarding methodology or theoretical models?
3. Methodological Limitations: What recurring confounding variables or data constraints exist in recent publications?
4. Future Research Vectors: Identify 3 high-impact unexplored niches or experimental setups for a new paper or thesis.
Provide structured citations format recommendations (APA 7th or IEEE) and specify how to avoid common generative hallucinations.`,
    tags: ['Research', 'Academic', 'Literature Review', 'Students'],
    difficulty: 'Advanced'
  },
  {
    id: 'p7',
    title: 'SEO Topical Authority Cluster & Content Brief Creator',
    category: 'Marketing',
    targetModel: 'Universal',
    description: 'Builds a complete semantic content cluster for dominating Google search for any competitive keyword.',
    promptText: `Act as an SEO Director specializing in semantic search, entity-based indexing, and Google Helpful Content guidelines.
Primary Seed Keyword: [PRIMARY_KEYWORD]
Target Domain Niche: [NICHE]

Create a comprehensive Topical Authority Cluster Map:
1. Pillar Page Blueprint: Proposed H1, search intent classification (Informational/Commercial), target word count, and comprehensive H2 outline covering all core subtopics.
2. 5 Supporting Sub-Topic Articles: Titles, target primary long-tail keywords, estimated search intent, and explicit internal linking anchor text connecting back to the Pillar.
3. Information Gain Checklist: 3 unique data points, proprietary calculators, or original expert perspectives that will differentiate this content from generic AI summaries.
4. FAQ Schema Opportunities: 5 high-volume 'People Also Ask' questions with 40-word definitive direct answers suitable for featured snippets.`,
    tags: ['SEO', 'Content Strategy', 'Marketing', 'Google Ranking'],
    difficulty: 'Intermediate'
  },
  {
    id: 'p8',
    title: 'API Integration & Webhook Architecture Scaffold',
    category: 'Coding',
    targetModel: 'Universal',
    description: 'Generates robust webhook listeners with signature verification, idempotency handling, and queue dispatching.',
    promptText: `Act as a Senior Backend Architect.
Write a production-ready Node.js / TypeScript Express webhook endpoint handler for: [SERVICE_NAME, E.G. STRIPE, GITHUB, SHOPIFY].

Include:
1. Raw body cryptographic HMAC signature verification before JSON parsing.
2. Idempotency mechanism using a key-value store cache (preventing duplicate processing of retried events).
3. Graceful asynchronous queue handoff so the webhook returns a 200 HTTP response within 300ms.
4. Comprehensive structured error logging and dead-letter queue considerations.
5. Provide unit test examples using Jest or Vitest mocking the signature verification.`,
    tags: ['Backend', 'Webhooks', 'TypeScript', 'Node.js'],
    difficulty: 'Advanced'
  }
];
