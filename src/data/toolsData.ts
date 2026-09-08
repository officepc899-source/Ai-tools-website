import { AITool, ToolCategory } from '../types';
import { writingTools } from './tools/writingTools';
import { designAndImageTools } from './tools/designAndImageTools';
import { videoTools } from './tools/videoTools';
import { businessProductivityTools } from './tools/businessProductivityTools';
import { researchStudentTools } from './tools/researchStudentTools';
import { codingAndAudioTools } from './tools/codingAndAudioTools';

const rawTools: AITool[] = [
  ...writingTools,
  ...designAndImageTools,
  ...videoTools,
  ...businessProductivityTools,
  ...researchStudentTools,
  ...codingAndAudioTools,
];

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

  return {
    ...tool,
    categories: Array.from(expandedCategories),
    tags: Array.from(generatedTags),
  };
});

export function getToolBySlug(slug: string): AITool | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  return INITIAL_AI_TOOLS.find((t) => t.slug.toLowerCase() === normalized || t.id.toLowerCase() === normalized);
}
