import { AITool } from '../../types';

/**
 * Google Veo - Flagship generative video model by Google DeepMind
 */
export const googleVeoTool: AITool = {
  id: 'tool-google-veo',
  slug: 'google-veo',
  name: 'Google Veo',
  tagline: "Google DeepMind's flagship 1080p generative video model with cinematic lens and camera controls",
  description: "Google DeepMind’s premier generative video model creating high-definition 1080p clips with nuanced understanding of cinematic prompts, lens effects, and motion.",
  fullDescription: "Google Veo is Google DeepMind's most capable video generation foundation model to date. Engineered for filmmakers, visual storytellers, and enterprise creators, Veo produces high-definition 1080p video clips with consistent visual physics, temporal coherence, and cinematic vocabulary (including aerial shots, panning, tracking, timelapses, and lens zooms). Accessible experimentally through Google Labs VideoFX and via Google Cloud Vertex AI for production enterprise workflows.",
  category: 'ai-video',
  categoryLabel: 'AI Video',
  categories: ['ai-video', 'ai-marketing'],
  pricingType: 'freemium',
  pricingSummary: 'Free experimental access via Google Labs VideoFX waitlist; enterprise usage-based API pricing per second of video via Google Cloud Vertex AI.',
  pricingPlans: [
    {
      name: 'Google Labs VideoFX',
      price: '$0',
      billing: 'experimental preview for approved creators',
      popular: true,
      features: [
        'Experimental access to Veo generative video model',
        'Text-to-video generation with cinematic prompt controls',
        'SynthID digital watermarking embedded on generated video frames',
        'Direct feedback loop with Google DeepMind research team'
      ]
    },
    {
      name: 'Vertex AI Enterprise',
      price: 'Usage-based',
      billing: 'per second of generated video',
      features: [
        'Production REST and Python SDK APIs for enterprise integration',
        '1080p high-definition video generation at cinematic framerates',
        'Commercial indemnification and enterprise security SLAs',
        'Support for visual style references and video-to-video editing'
      ]
    }
  ],
  bestFor: 'Filmmakers, visual effects directors, creative advertisers, and enterprise media teams generating cinematic AI video clips.',
  targetUsers: [
    'Filmmakers & Directors',
    'Creative Ad Agencies',
    'Visual Effects Artists',
    'Content Creators & Animators',
    'Game Developers'
  ],
  supportedPlatforms: ['Web (VideoFX)', 'Google Cloud Vertex AI API', 'Python SDK', 'REST API'],
  keyFeatures: [
    '1080p High-Definition Generation rendering lifelike lighting, textures, human movements, and physical realism',
    'Cinematic Prompt Comprehension understanding camera mechanics such as dolly shots, aerials, timelapses, tracking shots, and depth of field',
    'Multimodal Input Modalities supporting text-to-video, image-to-video, and prompt-based video editing sequences',
    'SynthID Digital Watermarking invisibly embedding forensic watermarks into video frames for safety, attribution, and authenticity',
    'Temporal Coherence maintaining character identity, lighting continuity, and object consistency throughout the clip'
  ],
  pros: [
    'Unrivaled comprehension of cinematic camera angles, lens specifications, and lighting styles',
    'Crisp 1080p resolution with realistic physical interactions and fluid motion',
    'SynthID watermarking provides enterprise compliance and content provenance',
    'Backed by Google DeepMind’s continuous frontier research and infrastructure'
  ],
  cons: [
    'Public consumer access is currently waitlisted/gated in Google Labs VideoFX',
    'API pricing on Vertex AI requires an active Google Cloud Platform billing account'
  ],
  limitations: [
    'Clip durations in initial preview are limited to short cinematic sequences',
    'Complex multi-character dialogues and intricate hand interactions may require prompt iteration',
    'Safety filters restrict copyrighted IP, deepfakes, and explicit material'
  ],
  verdict: {
    summary: "Google Veo represents a breakthrough in generative video from Google DeepMind. Its sophisticated grasp of cinematic terminology and 1080p fidelity make it a formidable platform for professional visual storytellers.",
    recommendation: 'Highly Recommended',
    score: 4.8,
    bottomLine: 'Creative directors and visual designers should join the VideoFX waitlist and explore Vertex AI documentation for future video automation pipelines.'
  },
  howToUse: [
    {
      step: 1,
      title: 'Join Google Labs VideoFX or Vertex AI',
      description: 'Sign up for experimental access at labs.google/fx/tools/video-fx or configure Vertex AI on Google Cloud.'
    },
    {
      step: 2,
      title: 'Describe Scene with Cinematic Keywords',
      description: 'Specify lens type, lighting (e.g., golden hour, neon backlight), camera angle (e.g., drone aerial, slow pan), and motion.'
    },
    {
      step: 3,
      title: 'Generate, Iterate & Export',
      description: 'Review the generated 1080p clip, refine prompts or camera parameters, and export with SynthID verification.'
    }
  ],
  alternatives: ['Sora', 'Runway Gen-3', 'Luma Dream Machine', 'Pika'],
  officialUrl: 'https://deepmind.google/technologies/veo/',
  developerUrl: 'https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-videos',
  affiliateUrl: 'https://deepmind.google/technologies/veo/',
  hasAffiliate: false,
  rating: 4.8,
  reviewsCount: 14200,
  badges: ['DeepMind Frontier', '1080p Cinematic', 'SynthID Protected'],
  sponsored: false,
  iconName: 'Video',
  iconBg: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-600',
  logoUrl: 'https://www.google.com/s2/favicons?domain=deepmind.google&sz=128',
  verifiedDate: 'September 2026',
  useCases: [
    'Cinematic B-Roll Generation',
    'Commercial Advertising Prototypes',
    'Concept Art & Visual Storyboarding',
    'Social Media Motion Graphics',
    'Music Video Visualizations'
  ],
  tags: [
    'Google Veo',
    'Veo',
    'Google DeepMind',
    'AI Video',
    'Text-to-Video',
    '1080p',
    'VideoFX',
    'Vertex AI',
    'Google'
  ],
  seoTitle: 'Google Veo - Generative AI Video Model by Google DeepMind | AI Tool Nest',
  seoDescription: "Discover Google Veo, Google DeepMind's groundbreaking generative video model producing cinematic 1080p videos with nuanced camera controls and fluid motion.",
  faqs: [
    {
      question: 'What is Google Veo?',
      answer: "Google Veo is Google DeepMind's state-of-the-art generative video model capable of creating high-definition 1080p video clips from text and image prompts with nuanced cinematic controls."
    },
    {
      question: 'How do I get access to Google Veo?',
      answer: "Veo is available for creative experimentation through the Google Labs VideoFX waitlist (labs.google) and for commercial enterprise deployments via Google Cloud Vertex AI."
    },
    {
      question: 'Does Google Veo output in 1080p resolution?',
      answer: "Yes, Google Veo natively outputs high-definition 1080p video with consistent temporal coherence, lifelike lighting, and realistic physical motion."
    },
    {
      question: 'What is SynthID in Google Veo videos?',
      answer: "SynthID is Google DeepMind's watermarking technology that invisibly embeds an imperceptible digital signature directly into video frames, allowing automated provenance and AI verification without impacting video quality."
    }
  ]
};

/**
 * Google Imagen 3 - State-of-the-art image generation model
 */
export const googleImagenTool: AITool = {
  id: 'tool-google-imagen',
  slug: 'google-imagen',
  name: 'Google Imagen 3',
  tagline: "Google's premier text-to-image foundation model with photorealistic fidelity and clear typography",
  description: "Google's premier image generation model delivering photorealistic textures, intricate lighting, and accurate in-image text rendering.",
  fullDescription: "Google Imagen 3 is Google's highest-quality text-to-image diffusion foundation model developed by Google DeepMind. It generates rich photorealistic photographs, vibrant digital artwork, and complex graphic layouts with high detail fidelity. Imagen 3 features prompt comprehension that captures subtle descriptive nuances, handles intricate textures (such as human skin, hair, and woven fabrics), and renders typography without typical spelling errors. Available freely in Google Labs ImageFX and commercially through the Gemini API and Google Cloud Vertex AI.",
  category: 'ai-image-generation',
  categoryLabel: 'AI Image',
  categories: ['ai-image-generation', 'ai-marketing', 'free-ai-tools'],
  pricingType: 'freemium',
  pricingSummary: 'Free generation with Google account via Google Labs ImageFX; developer pay-per-image pricing (approx. $0.03-$0.04/image) via Gemini API and Google Cloud Vertex AI.',
  pricingPlans: [
    {
      name: 'ImageFX (Google Labs)',
      price: '$0',
      billing: 'completely free with Google account',
      popular: true,
      features: [
        'Unlimited prompt iterations in ImageFX sandbox',
        'Expressive Prompt Chips for real-time style modifications',
        'SynthID invisible forensic watermark on all generated images',
        'Multiple aspect ratios (1:1, 4:3, 16:9) and high-res downloads'
      ]
    },
    {
      name: 'Gemini API & Vertex AI',
      price: '$0.03',
      billing: 'per generated image (pay-as-you-go)',
      features: [
        'Direct programmatic REST API & SDK calls',
        'Custom safety thresholds and content filter options',
        'Enterprise SLAs, high throughput rate limits, and zero data logging',
        'Integration with Gemini multimodal chaining workflows'
      ]
    }
  ],
  bestFor: 'Designers, marketers, creative directors, and developers needing photorealistic imagery and accurate typographic text rendering.',
  targetUsers: [
    'Graphic Designers & Illustrators',
    'Marketing & Brand Teams',
    'Product Managers & Prototypers',
    'Software Developers building visual apps',
    'Content Creators & Bloggers'
  ],
  supportedPlatforms: ['Web (ImageFX)', 'Gemini API', 'Google Cloud Vertex AI', 'Python/JS SDKs'],
  keyFeatures: [
    'Photorealistic Textures & Lighting rendering lifelike portraits, skin tones, environmental reflections, and fabric weaves',
    'Superior Typography Rendering spelling brand names, quotes, and signs with accurate character formation',
    'Expressive Prompt Chips in ImageFX allowing users to swap adjectives, artistic movements, and visual styles on the fly',
    'SynthID Digital Watermark embedding a resilient watermark into pixels for authenticity verification',
    'Fine Detail Preservation maintaining sharpness in intricate jewelry, hair strands, reflections, and natural foliage'
  ],
  pros: [
    '100% free to experiment and create in Google Labs ImageFX',
    'Accurately renders text and lettering inside generated artwork',
    'Natural lighting and photorealism comparable to Midjourney v6',
    'Built-in SynthID watermarking for transparent provenance'
  ],
  cons: [
    'Commercial batch API generation requires Gemini API or Google Cloud billing setup',
    'Safety guardrails strictly reject explicit, violent, or copyrighted prompts'
  ],
  limitations: [
    'Requires a Google account to access ImageFX',
    'Aspect ratios are selectable from predefined formats',
    'Extremely complex surrealist compositions may require multiple prompt refinements'
  ],
  verdict: {
    summary: "Google Imagen 3 sets a high benchmark for photorealism and in-image typography. Its availability for free in ImageFX combined with commercial Gemini API access makes it one of the most versatile visual AI engines available.",
    recommendation: 'Must-Have',
    score: 4.9,
    bottomLine: 'An essential tool for designers and builders. Use ImageFX for free creative ideation and the Gemini API for automated image pipelines.'
  },
  howToUse: [
    {
      step: 1,
      title: 'Open Google Labs ImageFX',
      description: 'Visit labs.google/fx/tools/image-fx and log in with your Google account.'
    },
    {
      step: 2,
      title: 'Craft Prompt with Expressive Chips',
      description: 'Enter your subject description, then click expressive prompt chips to experiment with artistic styles, lenses, and lighting.'
    },
    {
      step: 3,
      title: 'Download High-Resolution Image',
      description: 'Select your preferred generated variation and download the high-resolution file embedded with SynthID.'
    }
  ],
  alternatives: ['Midjourney', 'DALL-E 3', 'Flux.1', 'Stable Diffusion 3'],
  officialUrl: 'https://deepmind.google/technologies/imagen-3/',
  developerUrl: 'https://ai.google.dev/gemini-api/docs/imagen',
  affiliateUrl: 'https://deepmind.google/technologies/imagen-3/',
  hasAffiliate: false,
  rating: 4.9,
  reviewsCount: 31000,
  badges: ['Google DeepMind', 'Photorealistic', 'Free in ImageFX'],
  sponsored: false,
  iconName: 'Image',
  iconBg: 'bg-gradient-to-tr from-blue-500 via-teal-500 to-emerald-500',
  logoUrl: 'https://www.google.com/s2/favicons?domain=deepmind.google&sz=128',
  verifiedDate: 'September 2026',
  useCases: [
    'Photorealistic Marketing Imagery',
    'Hero Banners & Social Media Creatives',
    'Typographic Poster & Sign Design',
    'Product Concept Visualization',
    'Editorial Illustrations & Book Covers'
  ],
  tags: [
    'Google Imagen',
    'Imagen 3',
    'Google DeepMind',
    'AI Image',
    'Text-to-Image',
    'ImageFX',
    'Photorealism',
    'Gemini API',
    'Google'
  ],
  seoTitle: 'Google Imagen 3 - Photorealistic Text-to-Image AI Model | AI Tool Nest',
  seoDescription: "Explore Google Imagen 3, Google's advanced text-to-image AI model offering photorealistic quality, accurate text rendering, and versatile creative controls.",
  faqs: [
    {
      question: 'What is Google Imagen 3?',
      answer: "Google Imagen 3 is Google DeepMind's premier text-to-image foundation model, engineered to generate exceptionally photorealistic images with intricate lighting, lifelike textures, and accurate text rendering."
    },
    {
      question: 'Is Google Imagen 3 free to use?',
      answer: "Yes! Users can generate images with Imagen 3 for free in Google Labs ImageFX (labs.google/fx/tools/image-fx) with any personal Google account. Developers can access it commercially via the Gemini API and Vertex AI."
    },
    {
      question: 'Can Imagen 3 render text and words accurately inside images?',
      answer: "Yes, one of Imagen 3's standout capabilities is rendering clear, correctly spelled words, typography, signs, and labels inside generated artwork."
    },
    {
      question: 'Where can developers find the Imagen 3 API?',
      answer: "Developers can access the Imagen 3 API documentation, SDKs, and code examples at https://ai.google.dev/gemini-api/docs/imagen and Google Cloud Vertex AI."
    }
  ]
};

/**
 * Gemini API - Google's official developer API for Gemini 2.0 and 1.5 models
 */
export const geminiApiTool: AITool = {
  id: 'tool-gemini-api',
  slug: 'gemini-api',
  name: 'Gemini API',
  tagline: "Direct programmatic API access to Google's multimodal Gemini models with 2M+ token context",
  description: "Google's official developer API for building with Gemini 2.0 Flash, 1.5 Pro, and specialized multimodal models with structured JSON, audio, and function calling.",
  fullDescription: "The Gemini API enables software developers, startups, and enterprise engineering teams to integrate Google's cutting-edge multimodal foundation models directly into production web, mobile, and cloud software. Supporting natively multimodal inputs across text, code, audio, video, and PDF documents, the Gemini API offers context windows up to 2 million tokens, structured JSON schemas, function/tool calling, grounding with Google Search, and low-latency inference. Officially supported through client SDKs for Python, TypeScript/JavaScript, Go, Swift, Android, and standard REST/cURL.",
  category: 'ai-coding',
  categoryLabel: 'AI Development',
  categories: ['ai-coding', 'ai-productivity', 'free-ai-tools'],
  pricingType: 'freemium',
  pricingSummary: 'Generous free tier with no credit card required at Google AI Studio (up to 15 RPM); scalable pay-as-you-go pricing for high-volume commercial production.',
  pricingPlans: [
    {
      name: 'Free Developer Tier',
      price: '$0',
      billing: 'forever free via Google AI Studio',
      popular: true,
      features: [
        'Up to 15 Requests Per Minute (RPM) on Gemini 2.0 / 1.5 Flash',
        'Up to 1,500 Requests Per Day (RPD)',
        'Full 1M+ token multimodal context window access',
        'Structured JSON output, function calling, and system instructions',
        'Zero credit card required to get an instant API key'
      ]
    },
    {
      name: 'Pay-As-You-Go Tier',
      price: 'Usage-based',
      billing: 'per 1M input / output tokens',
      features: [
        'High-throughput rate limits (up to 1,000+ RPM and 4M+ TPM)',
        'Pay only for what you consume ($0.075 to $1.25 per 1M input tokens)',
        'No data logging for model training on paid requests',
        'Production SLAs, billing alerts, and Google Cloud Vertex AI federation'
      ]
    }
  ],
  bestFor: 'Software developers, software engineers, AI researchers, and engineering teams integrating multimodal AI into production applications.',
  targetUsers: [
    'Full-Stack & Backend Developers',
    'Mobile App Engineers (iOS & Android)',
    'AI Solutions Architects',
    'Startup Founders & Tech Leads',
    'Enterprise Cloud Engineers'
  ],
  supportedPlatforms: ['TypeScript / Node.js SDK', 'Python SDK', 'Go SDK', 'Swift / iOS SDK', 'REST API', 'cURL'],
  keyFeatures: [
    'Native Multimodal Reasoning ingesting text, code, audio recordings, video clips, and PDF documents in a single call',
    'Up to 2 Million Token Context Window analyzing complete software codebases, hour-long video, or multi-hundred page legal documents',
    'Real-time Google Search Grounding dynamically connecting model answers to live citations from Google Search',
    'Structured JSON & Function Calling enforcing strict JSON schemas for seamless database and API integration',
    'Ultra Low-Latency Flash Models offering real-time conversational streaming and sub-second agentic loop execution'
  ],
  pros: [
    'Free tier allows developers to build and test functional prototypes without entering a credit card',
    'Industry-leading 2M token context window eliminates chunking complexity',
    'Official Google Gen AI TypeScript, Python, and Go SDKs with full type safety',
    'Native Google Search grounding delivers fresh real-time web facts'
  ],
  cons: [
    'Free tier usage data may be sampled by Google for product improvement',
    'Paid tier requires linking a Google Cloud billing account'
  ],
  limitations: [
    'Rate limits apply to free tier (15 RPM on Flash, 2 RPM on Pro)',
    'Video inputs are sampled at 1 frame per second by default',
    'Streaming responses require HTTP/2 or server-sent events support'
  ],
  verdict: {
    summary: "The Gemini API is one of the most capable and cost-effective multimodal APIs in AI engineering today. With its 2M token context window, free prototyping tier, and Google Search grounding, it is an industry-standard choice for modern builders.",
    recommendation: 'Must-Have',
    score: 4.9,
    bottomLine: 'Highly recommended for developers building AI agents, document analyzers, customer support bots, and coding tools.'
  },
  howToUse: [
    {
      step: 1,
      title: 'Get Free API Key',
      description: 'Visit ai.google.dev or aistudio.google.com and click "Get API key" to create a key in seconds.'
    },
    {
      step: 2,
      title: 'Install the Official SDK',
      description: 'Run `npm install @google/genai` for TypeScript/Node.js or `pip install google-genai` for Python.'
    },
    {
      step: 3,
      title: 'Call the Model with Multimodal Inputs',
      description: 'Initialize the client, supply text or media buffers, and receive streaming or structured JSON responses.'
    }
  ],
  alternatives: ['OpenAI API', 'Anthropic Claude API', 'Mistral AI API', 'Cohere API'],
  officialUrl: 'https://ai.google.dev/',
  developerUrl: 'https://ai.google.dev/gemini-api/docs',
  affiliateUrl: 'https://ai.google.dev/',
  hasAffiliate: false,
  rating: 4.9,
  reviewsCount: 42000,
  badges: ['Developer Favorite', '2M Token Context', 'Free Tier Available'],
  sponsored: false,
  iconName: 'Code',
  iconBg: 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500',
  logoUrl: 'https://www.google.com/s2/favicons?domain=ai.google.dev&sz=128',
  verifiedDate: 'September 2026',
  useCases: [
    'Multimodal Document & PDF Extraction',
    'AI Coding Assistants & Code Translators',
    'Real-time Search-Grounded Chatbots',
    'Long-form Audio & Video Summarization',
    'Autonomous AI Agents & Tool Calling'
  ],
  tags: [
    'Gemini API',
    'Google AI',
    'AI Development',
    'SDK',
    'REST API',
    'Multimodal',
    'Free Tier',
    'Google AI Studio',
    '2M Context',
    'Google'
  ],
  seoTitle: 'Gemini API - Developer Documentation & Multimodal AI Models | AI Tool Nest',
  seoDescription: "Build with the Gemini API from Google. Access Gemini 2.0 and 1.5 models with 2M token context, live Google Search grounding, structured outputs, and SDKs.",
  faqs: [
    {
      question: 'What is the Gemini API?',
      answer: "The Gemini API is Google's official developer API that allows developers to programmatically call Gemini 2.0 Flash, 1.5 Pro, and specialized models for text, code, image, video, and audio understanding."
    },
    {
      question: 'Is the Gemini API free to use?',
      answer: "Yes, the Gemini API includes a generous free tier through Google AI Studio offering up to 15 requests per minute (RPM) on Flash models with zero credit card required."
    },
    {
      question: 'What is the context window size of the Gemini API?',
      answer: "The Gemini API supports industry-leading context windows up to 2 million tokens on Gemini 1.5 Pro, allowing developers to process hours of audio, long videos, or thousands of lines of code in a single request."
    },
    {
      question: 'What programming languages are supported by the Gemini API?',
      answer: "Google provides official SDKs for TypeScript/JavaScript (@google/genai), Python (google-genai), Go, Swift (iOS/macOS), Android (Kotlin), as well as standard REST HTTP endpoints."
    }
  ]
};
