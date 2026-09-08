import { ToolCategory } from '../types';

export interface ToolDirectoryCategory {
  id: ToolCategory;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  iconName: string;
  badge: string;
}

export const DIRECTORY_CATEGORIES: ToolDirectoryCategory[] = [
  {
    id: 'ai-writing',
    slug: 'ai-writing',
    name: 'AI Writing',
    shortName: 'Writing',
    description: 'Long-form drafting, SEO copywriting, paraphrasing, grammar checkers, and AI story generators.',
    longDescription: 'The ultimate directory of AI writing tools. From cutting-edge conversational assistants like ChatGPT and Claude to specialized grammar enhancers, copywriters, scriptwriters, and paraphrasers.',
    iconName: 'FileText',
    badge: 'Text & Copy'
  },
  {
    id: 'ai-image-generation',
    slug: 'ai-image-generation',
    name: 'AI Image Generation',
    shortName: 'Images',
    description: 'Photorealistic text-to-image models, vector art creators, upscalers, and graphic suites.',
    longDescription: 'Generate photorealistic artwork, brand assets, product mockups, and vector illustrations with state-of-the-art text-to-image and generative inpainting models like Midjourney and Leonardo AI.',
    iconName: 'Image',
    badge: 'Generative Art'
  },
  {
    id: 'ai-video',
    slug: 'ai-video',
    name: 'AI Video',
    shortName: 'Video',
    description: 'Text-to-video generation, AI avatars, automated subtitles, and viral social video clippers.',
    longDescription: 'Create engaging videos without expensive studio equipment. Leverage AI presenters, automated caption generation, cinematic motion effects, and text-based video editors.',
    iconName: 'Film',
    badge: 'Video & Animation'
  },
  {
    id: 'ai-audio',
    slug: 'ai-audio',
    name: 'AI Audio',
    shortName: 'Audio',
    description: 'Ultra-realistic voice synthesis, AI voice cloning, music generation, and audio enhancement.',
    longDescription: 'Explore cutting-edge audio AI. Generate studio-quality human voiceovers, clone voices in 30+ languages, compose full musical tracks from text, and remove background noise with zero studio gear.',
    iconName: 'Mic',
    badge: 'Voice & Music'
  },
  {
    id: 'ai-marketing',
    slug: 'ai-marketing',
    name: 'AI Marketing',
    shortName: 'Marketing',
    description: 'Ad creative generators, SEO content optimizers, email sequences, and social media growth tools.',
    longDescription: 'Supercharge customer acquisition and organic search rankings. Discover tools built for high-converting ad banners, SERP benchmarking, viral short-form clipping, and automated lead nurturing.',
    iconName: 'Target',
    badge: 'Growth & SEO'
  },
  {
    id: 'ai-coding',
    slug: 'ai-coding',
    name: 'AI Coding',
    shortName: 'Coding',
    description: 'AI-first code editors, intelligent autocomplete, code generation, debugging, and web app builders.',
    longDescription: 'Accelerate software engineering with AI developer tools. Build full-stack web applications, refactor complex codebases, write unit tests, and convert designs into production code with natural language.',
    iconName: 'Code',
    badge: 'Development'
  },
  {
    id: 'ai-productivity',
    slug: 'ai-productivity',
    name: 'AI Productivity',
    shortName: 'Productivity',
    description: 'Meeting transcription, autonomous calendar scheduling, note-taking copilots, and task organizers.',
    longDescription: 'Reclaim focus and eliminate administrative drudgery. Discover autonomous calendar assistants, meeting note recorders, code copilots, and unified knowledge managers.',
    iconName: 'Zap',
    badge: 'Focus & Tasks'
  },
  {
    id: 'ai-business',
    slug: 'ai-business',
    name: 'AI Business',
    shortName: 'Business',
    description: 'Workflow automation, no-code integrations, CRM copilots, customer support bots, and ops suites.',
    longDescription: 'Automate repetitive back-office operations, connect enterprise software systems, deploy intelligent customer support agents, and scale operations with lean teams.',
    iconName: 'Briefcase',
    badge: 'Operations'
  },
  {
    id: 'ai-education',
    slug: 'ai-education',
    name: 'AI Education',
    shortName: 'Education',
    description: 'Academic paper search, citation generators, Socratic AI tutors, and interactive study aids.',
    longDescription: 'Study faster and conduct peer-reviewed literature reviews with AI academic assistants, citation checkers, computational knowledge engines, and source-grounded research synthesizers.',
    iconName: 'GraduationCap',
    badge: 'Study & Research'
  },
  {
    id: 'free-ai-tools',
    slug: 'free-ai-tools',
    name: 'Free AI Tools',
    shortName: 'Free Tools',
    description: 'Completely free and generous freemium AI tools with zero upfront cost or credit card requirements.',
    longDescription: 'Curated directory of completely free and robust freemium AI software. Find verified tools with genuine zero-cost tiers for drafting, graphics, transcription, code assistance, and research.',
    iconName: 'Sparkles',
    badge: 'Zero Cost'
  }
];

export function getCategoryBySlug(slug: string): ToolDirectoryCategory | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  
  // Direct match
  const direct = DIRECTORY_CATEGORIES.find(
    (c) => c.slug === normalized || c.id === normalized || c.shortName.toLowerCase() === normalized
  );
  if (direct) return direct;

  // Normalized alias mapping
  const aliasMap: Record<string, string> = {
    'writing': 'ai-writing',
    'ai-writing-tools': 'ai-writing',
    'image': 'ai-image-generation',
    'ai-image-tools': 'ai-image-generation',
    'ai-design-tools': 'ai-image-generation',
    'design': 'ai-image-generation',
    'video': 'ai-video',
    'ai-video-tools': 'ai-video',
    'audio': 'ai-audio',
    'ai-audio-tools': 'ai-audio',
    'marketing': 'ai-marketing',
    'ai-marketing-tools': 'ai-marketing',
    'coding': 'ai-coding',
    'ai-coding-tools': 'ai-coding',
    'developer': 'ai-coding',
    'productivity': 'ai-productivity',
    'ai-productivity-tools': 'ai-productivity',
    'business': 'ai-business',
    'ai-business-tools': 'ai-business',
    'education': 'ai-education',
    'ai-tools-for-students': 'ai-education',
    'students': 'ai-education',
    'ai-research-tools': 'ai-education',
    'research': 'ai-education',
    'free': 'free-ai-tools'
  };

  const targetId = aliasMap[normalized];
  if (targetId) {
    return DIRECTORY_CATEGORIES.find((c) => c.id === targetId || c.slug === targetId);
  }

  return undefined;
}

// Format with title field for UI compatibility
export const AI_DIRECTORY_CATEGORIES = DIRECTORY_CATEGORIES.map((cat) => ({
  ...cat,
  title: cat.name,
}));
