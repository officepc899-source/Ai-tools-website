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
    id: 'free-ai-tools',
    slug: 'free-ai-tools',
    name: 'Free AI Tools',
    shortName: 'Free Tools',
    description: 'Completely free & generous freemium AI tools with no upfront cost.',
    longDescription: 'Curated directory of completely free and robust freemium AI software. Find verified tools with genuine zero-cost tiers for drafting, graphics, transcription, code assistance, and research.',
    iconName: 'Sparkles',
    badge: 'Zero Cost'
  },
  {
    id: 'ai-writing-tools',
    slug: 'ai-writing-tools',
    name: 'AI Writing Tools',
    shortName: 'Writing',
    description: 'Long-form drafting, paraphrasing, grammar optimization, and copy assistants.',
    longDescription: 'The ultimate directory of AI-powered writing tools. From conversational assistants like ChatGPT and Claude to specialized grammar enhancers, copywriters, and paraphrasers.',
    iconName: 'FileText',
    badge: 'Writing & Copy'
  },
  {
    id: 'ai-design-tools',
    slug: 'ai-design-tools',
    name: 'AI Design Tools',
    shortName: 'Design',
    description: 'Graphic design suites, slide creators, UI/UX systems, and diagram builders.',
    longDescription: 'Accelerate visual workflows with cutting-edge AI design platforms. Create presentations, diagrams, marketing graphics, and responsive UI mockups in seconds.',
    iconName: 'Palette',
    badge: 'Graphic Design'
  },
  {
    id: 'ai-business-tools',
    slug: 'ai-business-tools',
    name: 'AI Business Tools',
    shortName: 'Business',
    description: 'Workflow automation, CRM copilots, customer support, and project suites.',
    longDescription: 'Automate repetitive workflows, connect legacy enterprise software, and scale customer interactions with verified AI business tools.',
    iconName: 'Briefcase',
    badge: 'Operations'
  },
  {
    id: 'ai-tools-for-students',
    slug: 'ai-tools-for-students',
    name: 'AI Tools for Students',
    shortName: 'Students',
    description: 'Academic study aids, literature research, proofreading, and math solvers.',
    longDescription: 'Study faster and write better research papers with AI study assistants, citation checkers, computational knowledge engines, and source-grounded note synthesizers.',
    iconName: 'GraduationCap',
    badge: 'Academics'
  },
  {
    id: 'ai-productivity-tools',
    slug: 'ai-productivity-tools',
    name: 'AI Productivity Tools',
    shortName: 'Productivity',
    description: 'Autonomous scheduling, meeting transcription, note-taking, and copilots.',
    longDescription: 'Reclaim focus and organize your daily work. Discover autonomous calendar assistants, meeting note recorders, code copilots, and unified knowledge managers.',
    iconName: 'Zap',
    badge: 'Productivity'
  },
  {
    id: 'ai-marketing-tools',
    slug: 'ai-marketing-tools',
    name: 'AI Marketing Tools',
    shortName: 'Marketing',
    description: 'Ad copy generation, video repurposing, email marketing, and social growth.',
    longDescription: 'Supercharge customer acquisition and organic social reach with tools built for ad creatives, SEO content, viral short-form clipping, and automated campaigns.',
    iconName: 'Target',
    badge: 'Growth'
  },
  {
    id: 'ai-image-tools',
    slug: 'ai-image-tools',
    name: 'AI Image Tools',
    shortName: 'Image',
    description: 'Photorealistic image generation, vector art, upscale, and background editing.',
    longDescription: 'Generate photorealistic artwork, brand assets, product mockups, and vector illustrations with state-of-the-art text-to-image and generative inpainting models.',
    iconName: 'Image',
    badge: 'Generative Art'
  },
  {
    id: 'ai-video-tools',
    slug: 'ai-video-tools',
    name: 'AI Video Tools',
    shortName: 'Video',
    description: 'Text-to-video generation, AI avatars, automated subtitles, and smart clipping.',
    longDescription: 'Create engaging videos without expensive cameras or editing suites. Leverage AI presenters, automated caption generation, cinematic motion effects, and text-based video editors.',
    iconName: 'Film',
    badge: 'Video & Audio'
  },
  {
    id: 'ai-research-tools',
    slug: 'ai-research-tools',
    name: 'AI Research Tools',
    shortName: 'Research',
    description: 'Academic paper discovery, citation synthesis, and scientific insights.',
    longDescription: 'Explore hundreds of millions of peer-reviewed papers with citation-backed research engines. Find consensus, synthesize literature reviews, and analyze scientific data without hallucinations.',
    iconName: 'Compass',
    badge: 'Scientific Research'
  }
];

export function getCategoryBySlug(slug: string): ToolDirectoryCategory | undefined {
  const normalized = slug.toLowerCase().trim();
  return DIRECTORY_CATEGORIES.find(
    (c) => c.slug === normalized || c.id === normalized || c.shortName.toLowerCase() === normalized
  );
}

// Format with title field for UI compatibility
export const AI_DIRECTORY_CATEGORIES = DIRECTORY_CATEGORIES.map((cat) => ({
  ...cat,
  title: cat.name,
}));

