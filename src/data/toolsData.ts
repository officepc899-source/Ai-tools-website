import { AITool } from '../types';
import { writingTools } from './tools/writingTools';
import { designAndImageTools } from './tools/designAndImageTools';
import { videoTools } from './tools/videoTools';
import { businessProductivityTools } from './tools/businessProductivityTools';
import { researchStudentTools } from './tools/researchStudentTools';

export const INITIAL_AI_TOOLS: AITool[] = [
  ...writingTools,
  ...designAndImageTools,
  ...videoTools,
  ...businessProductivityTools,
  ...researchStudentTools,
];

export function getToolBySlug(slug: string): AITool | undefined {
  const normalized = slug.toLowerCase().trim();
  return INITIAL_AI_TOOLS.find((t) => t.slug.toLowerCase() === normalized || t.id.toLowerCase() === normalized);
}
