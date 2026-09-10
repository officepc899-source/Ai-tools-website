import { AITool, ToolCategory } from '../types';
import { writingTools } from './tools/writingTools';
import { designAndImageTools } from './tools/designAndImageTools';
import { videoTools } from './tools/videoTools';
import { businessProductivityTools } from './tools/businessProductivityTools';
import { researchStudentTools } from './tools/researchStudentTools';
import { codingAndAudioTools } from './tools/codingAndAudioTools';

const allRawTools: AITool[] = [
  ...writingTools,
  ...designAndImageTools,
  ...videoTools,
  ...businessProductivityTools,
  ...researchStudentTools,
  ...codingAndAudioTools,
];

// Ensure no duplicate IDs or slugs exist across categories
const seenToolIds = new Set<string>();
const rawTools: AITool[] = allRawTools.filter((tool) => {
  if (seenToolIds.has(tool.id) || seenToolIds.has(tool.slug)) {
    return false;
  }
  seenToolIds.add(tool.id);
  seenToolIds.add(tool.slug);
  return true;
});

// Helper to guarantee every tool has consistent tags, clean category matching, and badges
export const INITIAL_AI_TOOLS: AITool[] = rawTools.map((tool) => {
  const generatedTags = new Set<string>();

  // Add category name
  if (tool.categoryLabel) generatedTags.add(tool.categoryLabel);

  // Add pricing badge
  if (tool.pricingType === 'free') generatedTags.add('100% Free');
  if (tool.pricingType === 'freemium') generatedTags.add('Free Tier');

  // Add existing tags if present
  if (tool.tags && Array.isArray(tool.tags)) {
    tool.tags.forEach((tag) => generatedTags.add(tag));
  }

  // Add top use-cases as tags
  if (tool.useCases && Array.isArray(tool.useCases)) {
    tool.useCases.slice(0, 3).forEach((uc) => generatedTags.add(uc));
  }

  // Add top badges
  if (tool.badges && Array.isArray(tool.badges)) {
    tool.badges.slice(0, 2).forEach((b) => generatedTags.add(b));
  }

  // Expanded categories list for multi-category indexing
  const expandedCategories = new Set<ToolCategory>(tool.categories || []);
  expandedCategories.add(tool.category);

  // Map legacy categories to new 9 core categories
  if (tool.category === 'ai-writing-tools' || (tool.categories && tool.categories.includes('ai-writing-tools'))) {
    expandedCategories.add('ai-writing');
  }
  if (tool.category === 'ai-design-tools' || tool.category === 'ai-image-tools' || (tool.categories && tool.categories.includes('ai-design-tools'))) {
    expandedCategories.add('ai-image-generation');
  }
  if (tool.category === 'ai-video-tools' || (tool.categories && tool.categories.includes('ai-video-tools'))) {
    expandedCategories.add('ai-video');
  }
  if (tool.category === 'ai-audio-tools' || tool.category === 'ai-audio' || (tool.categories && tool.categories.includes('ai-audio'))) {
    expandedCategories.add('ai-audio');
  }
  if (tool.category === 'ai-marketing-tools' || (tool.categories && tool.categories.includes('ai-marketing-tools'))) {
    expandedCategories.add('ai-marketing');
  }
  if (tool.category === 'ai-coding-tools' || tool.category === 'ai-coding' || (tool.categories && tool.categories.includes('ai-coding'))) {
    expandedCategories.add('ai-coding');
  }
  if (tool.category === 'ai-productivity-tools' || (tool.categories && tool.categories.includes('ai-productivity-tools'))) {
    expandedCategories.add('ai-productivity');
  }
  if (tool.category === 'ai-business-tools' || (tool.categories && tool.categories.includes('ai-business-tools'))) {
    expandedCategories.add('ai-business');
  }
  if (tool.category === 'ai-tools-for-students' || tool.category === 'ai-research-tools' || (tool.categories && tool.categories.includes('ai-tools-for-students'))) {
    expandedCategories.add('ai-education');
  }
  if (tool.pricingType === 'free' || tool.pricingType === 'freemium') {
    expandedCategories.add('free-ai-tools');
  }

  // Determine intelligent domain-specific fallbacks if not explicitly provided
  const targetUsers = tool.targetUsers && tool.targetUsers.length > 0 
    ? tool.targetUsers 
    : deriveTargetUsers(tool);

  const supportedPlatforms = tool.supportedPlatforms && tool.supportedPlatforms.length > 0
    ? tool.supportedPlatforms
    : deriveSupportedPlatforms(tool);

  const limitations = tool.limitations && tool.limitations.length > 0
    ? tool.limitations
    : deriveLimitations(tool);

  const verdict = tool.verdict || deriveVerdict(tool);

  const competitorComparison = tool.competitorComparison && tool.competitorComparison.length > 0
    ? tool.competitorComparison
    : deriveCompetitorComparison(tool);

  return {
    ...tool,
    categories: Array.from(expandedCategories),
    tags: Array.from(generatedTags),
    targetUsers,
    supportedPlatforms,
    limitations,
    verdict,
    competitorComparison,
  };
});

function deriveTargetUsers(tool: AITool): string[] {
  if (tool.useCases && tool.useCases.length > 0) {
    return tool.useCases.slice(0, 4).map(uc => uc.replace(/^For\s+/i, ''));
  }
  const categoryMap: Record<string, string[]> = {
    'ai-writing-tools': ['Content Creators', 'Copywriters', 'Digital Marketers', 'Bloggers'],
    'ai-writing': ['Content Creators', 'Copywriters', 'Digital Marketers', 'Bloggers'],
    'ai-design-tools': ['UI/UX Designers', 'Visual Artists', 'Marketing Teams', 'Brand Designers'],
    'ai-image-generation': ['Concept Artists', 'Digital Illustrators', 'E-commerce Sellers', 'Content Creators'],
    'ai-video-tools': ['Video Creators', 'YouTubers', 'Social Media Managers', 'Commercial Editors'],
    'ai-video': ['Video Creators', 'YouTubers', 'Social Media Managers', 'Commercial Editors'],
    'ai-audio': ['Podcasters', 'Voice Actors', 'Video Producers', 'Musicians & Sound Designers'],
    'ai-coding': ['Software Developers', 'Frontend Engineers', 'Full-Stack Builders', 'Indie Hackers'],
    'ai-productivity': ['Knowledge Workers', 'Project Managers', 'Remote Teams', 'Entrepreneurs'],
    'ai-business': ['Startup Founders', 'Operations Leads', 'Sales Teams', 'Enterprise Executives'],
    'ai-research-tools': ['Academic Researchers', 'College Students', 'Data Analysts', 'Investigative Writers'],
    'ai-education': ['Students', 'Educators', 'Researchers', 'Self-Directed Learners'],
  };
  return categoryMap[tool.category] || ['Digital Professionals', 'Creators & Builders', 'Teams & Freelancers'];
}

function deriveSupportedPlatforms(tool: AITool): string[] {
  const cat = tool.category;
  if (cat.includes('coding')) {
    return ['macOS Desktop', 'Windows Desktop', 'Linux', 'VS Code Extension'];
  }
  if (cat.includes('audio') || cat.includes('video')) {
    return ['Web Studio', 'Cloud API', 'Mobile Browser'];
  }
  if (cat.includes('writing') || cat.includes('research') || cat.includes('education')) {
    return ['Web App', 'Chrome Extension', 'iOS & Android Mobile', 'REST API'];
  }
  return ['Modern Web App', 'Mobile Responsive Web', 'API / Webhook'];
}

function deriveLimitations(tool: AITool): string[] {
  if (tool.cons && tool.cons.length > 0) {
    return tool.cons.slice(0, 3);
  }
  return [
    `Requires active internet connectivity for cloud-hosted AI inference.`,
    `Performance and output style depend on prompt specificity and contextual inputs.`
  ];
}

function deriveVerdict(tool: AITool) {
  const score = tool.rating || 4.7;
  let recommendation: 'Must-Have' | 'Highly Recommended' | 'Recommended with Caveats' | 'Specialized Only' = 'Highly Recommended';
  if (score >= 4.85) recommendation = 'Must-Have';
  else if (score >= 4.6) recommendation = 'Highly Recommended';
  else if (score >= 4.3) recommendation = 'Recommended with Caveats';
  else recommendation = 'Specialized Only';

  return {
    summary: `${tool.name} is a standout solution in the ${tool.categoryLabel || 'AI'} space. It excels at ${tool.bestFor.toLowerCase()}`,
    recommendation,
    score,
    bottomLine: `Ideal choice for users prioritizing ${tool.keyFeatures[0]?.toLowerCase() || 'reliable AI workflows'}.`
  };
}

function deriveCompetitorComparison(tool: AITool) {
  if (!tool.alternatives || tool.alternatives.length === 0) return undefined;
  return tool.alternatives.slice(0, 2).map((alt) => ({
    competitorName: alt,
    advantage: `${tool.name} offers specialized features for ${tool.bestFor.toLowerCase()}`,
    disadvantage: `${alt} provides an alternative workflow and separate pricing structure.`
  }));
}

export function getToolBySlug(slug: string): AITool | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return INITIAL_AI_TOOLS.find((t) => t.slug.toLowerCase() === normalized || t.id.toLowerCase() === normalized);
}
