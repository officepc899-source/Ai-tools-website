import { Article } from '../types';
import { CORE_ARTICLES } from './articles/coreArticles';
import { DEV_AND_MEDIA_ARTICLES } from './articles/devAndMediaArticles';
import { MARKETING_AND_BUSINESS_ARTICLES } from './articles/marketingAndBusinessArticles';
import { ADVANCED_TECH_ARTICLES } from './articles/advancedTechArticles';

// Aggregate all 20 unique, production-grade SEO articles
export const INITIAL_ARTICLES: Article[] = [
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
    'best-ai-productivity-tools': 'best-ai-tools-in-2026',
    '20-ai-tools-for-students': 'top-free-ai-tools-for-students',
    'free-ai-tools-for-students': 'top-free-ai-tools-for-students',
    'how-to-make-money-with-ai-tools': 'best-ai-tools-for-business',
    '7-chatgpt-alternatives-better-than-gpt4': 'chatgpt-alternatives',
    'chatgpt-vs-claude-vs-gemini': 'chatgpt-alternatives',
    'best-ai-video-tools-content-creators': 'ai-tools-for-content-creators',
    'future-of-ai': 'future-of-artificial-intelligence',
    'advanced-prompt-engineering': 'advanced-prompt-engineering-guide',
    'best-ai-coding-assistants': 'best-ai-coding-assistants-cursor-vs-copilot',
    'cursor-vs-copilot': 'best-ai-coding-assistants-cursor-vs-copilot',
    'midjourney-vs-dalle-3': 'ai-image-generation-midjourney-vs-dalle',
    'best-ai-voice-cloning': 'ai-voice-cloning-text-to-speech-guide',
    'elevenlabs-review': 'ai-voice-cloning-text-to-speech-guide',
    'ai-meeting-assistants': 'best-ai-meeting-assistants-comparison',
    'otter-vs-fireflies': 'best-ai-meeting-assistants-comparison',
    'ai-seo-strategies': 'ai-seo-strategies-google-sge-perplexity',
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
