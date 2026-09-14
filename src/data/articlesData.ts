import { Article } from '../types';
import { NEW_ESSENTIAL_ARTICLES } from './articles/newEssentialArticles';
import { NEW_TECH_AND_CREATIVE_ARTICLES } from './articles/newTechnicalAndCreativeArticles';
import { CORE_ARTICLES } from './articles/coreArticles';
import { DEV_AND_MEDIA_ARTICLES } from './articles/devAndMediaArticles';
import { MARKETING_AND_BUSINESS_ARTICLES } from './articles/marketingAndBusinessArticles';
import { ADVANCED_TECH_ARTICLES } from './articles/advancedTechArticles';

// Aggregate all 30 unique, production-grade SEO articles
export const INITIAL_ARTICLES: Article[] = [
  ...NEW_ESSENTIAL_ARTICLES,
  ...NEW_TECH_AND_CREATIVE_ARTICLES,
  ...CORE_ARTICLES,
  ...DEV_AND_MEDIA_ARTICLES,
  ...MARKETING_AND_BUSINESS_ARTICLES,
  ...ADVANCED_TECH_ARTICLES
];

export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  
  // Direct match by slug or id
  const direct = INITIAL_ARTICLES.find(
    (a) => a.slug.toLowerCase() === normalized || a.id.toLowerCase() === normalized
  );
  if (direct) return direct;

  // Backward compatibility alias redirects
  const aliases: Record<string, string> = {
    '25-best-free-ai-tools': 'best-ai-tools-in-2026',
    'best-ai-productivity-tools': 'ai-productivity-tools',
    'productivity-tools': 'ai-productivity-tools',
    '20-ai-tools-for-students': 'best-ai-tools-for-students',
    'free-ai-tools-for-students': 'best-ai-tools-for-students',
    'ai-tools-for-students': 'best-ai-tools-for-students',
    'ai-tools-for-small-business': 'best-ai-tools-for-small-businesses',
    'small-business-ai': 'best-ai-tools-for-small-businesses',
    'how-to-make-money-with-ai-tools': 'how-to-use-ai-for-online-business',
    'ai-for-online-business': 'how-to-use-ai-for-online-business',
    '7-chatgpt-alternatives-better-than-gpt4': 'chatgpt-alternatives',
    'chatgpt-vs-claude-vs-gemini': 'chatgpt-alternatives',
    'best-ai-video-tools-content-creators': 'top-ai-tools-for-content-creators',
    'ai-tools-content-creators': 'top-ai-tools-for-content-creators',
    'ai-tools-for-video': 'best-ai-tools-for-video-creation',
    'video-creation-ai': 'best-ai-tools-for-video-creation',
    'ai-tools-for-design': 'best-ai-tools-for-graphic-design',
    'graphic-design-ai': 'best-ai-tools-for-graphic-design',
    'ai-for-developers': 'best-ai-tools-for-developers',
    'developer-ai-tools': 'best-ai-tools-for-developers',
    'ai-trends': 'latest-useful-ai-trends-2026',
    'useful-ai-trends': 'latest-useful-ai-trends-2026',
    'future-of-ai': 'future-of-artificial-intelligence',
    'advanced-prompt-engineering': 'advanced-prompt-engineering-guide',
    'best-ai-coding-assistants': 'best-ai-tools-for-developers',
    'cursor-vs-copilot': 'best-ai-coding-assistants-cursor-vs-copilot',
    'midjourney-vs-dalle-3': 'ai-image-generation-midjourney-vs-dalle',
    'best-ai-voice-cloning': 'ai-voice-cloning-text-to-speech-guide',
    'elevenlabs-review': 'ai-voice-cloning-text-to-speech-guide',
    'ai-meeting-assistants': 'best-ai-meeting-assistants-comparison',
    'otter-vs-fireflies': 'best-ai-meeting-assistants-comparison',
    'ai-seo-strategies': 'best-ai-tools-for-seo',
    'ai-seo-tools': 'best-ai-tools-for-seo',
    'run-local-llms': 'run-local-llms-ollama-deepseek-guide',
    'ollama-guide': 'run-local-llms-ollama-deepseek-guide'
  };

  const mappedSlug = aliases[normalized];
  if (mappedSlug) {
    return INITIAL_ARTICLES.find((a) => a.slug === mappedSlug);
  }

  return undefined;
}

export function getRelatedArticles(currentArticle: Article, maxCount = 3): Article[] {
  const result: Article[] = [];
  const addedSlugs = new Set<string>([currentArticle.slug]);

  // 1. Explicit related slugs if defined
  if (currentArticle.relatedArticleSlugs && currentArticle.relatedArticleSlugs.length > 0) {
    for (const slug of currentArticle.relatedArticleSlugs) {
      const match = INITIAL_ARTICLES.find((a) => a.slug === slug && !addedSlugs.has(a.slug));
      if (match) {
        result.push(match);
        addedSlugs.add(match.slug);
      }
      if (result.length >= maxCount) return result;
    }
  }

  // 2. Tag overlap
  const currentTags = new Set(currentArticle.tags.map((t) => t.toLowerCase()));
  const scored = INITIAL_ARTICLES
    .filter((a) => !addedSlugs.has(a.slug))
    .map((article) => {
      let score = 0;
      if (article.category === currentArticle.category) score += 3;
      for (const tag of article.tags) {
        if (currentTags.has(tag.toLowerCase())) score += 2;
      }
      return { article, score };
    })
    .sort((a, b) => b.score - a.score);

  for (const item of scored) {
    result.push(item.article);
    addedSlugs.add(item.article.slug);
    if (result.length >= maxCount) break;
  }

  return result;
}

export function getPreviousAndNextArticles(slugOrId: string): {
  previous: Article | null;
  next: Article | null;
} {
  const currentIndex = INITIAL_ARTICLES.findIndex(
    (a) => a.slug === slugOrId || a.id === slugOrId
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous = currentIndex > 0 ? INITIAL_ARTICLES[currentIndex - 1] : null;
  const next = currentIndex < INITIAL_ARTICLES.length - 1 ? INITIAL_ARTICLES[currentIndex + 1] : null;

  return { previous, next };
}

export function getAllArticleCategories(): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const article of INITIAL_ARTICLES) {
    counts[article.category] = (counts[article.category] || 0) + 1;
  }
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

export function getAllArticleTags(): { name: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const article of INITIAL_ARTICLES) {
    for (const tag of article.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}
