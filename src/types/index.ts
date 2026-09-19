export type ToolCategory =
  // Official 9 Core Categories + Free
  | 'ai-writing'
  | 'ai-image-generation'
  | 'ai-video'
  | 'ai-audio'
  | 'ai-marketing'
  | 'ai-coding'
  | 'ai-productivity'
  | 'ai-business'
  | 'ai-education'
  | 'free-ai-tools'
  // AI Assistant & General Models
  | 'ai-assistant'
  | 'ai-assistants'
  | 'ai-development'
  // Legacy & Alias Category Keys
  | 'ai-writing-tools'
  | 'ai-design-tools'
  | 'ai-business-tools'
  | 'ai-tools-for-students'
  | 'ai-productivity-tools'
  | 'ai-marketing-tools'
  | 'ai-image-tools'
  | 'ai-video-tools'
  | 'ai-research-tools'
  | 'ai-audio-tools'
  | 'ai-coding-tools'
  | 'ai-education-tools'
  | 'free'
  | 'writing'
  | 'design'
  | 'business'
  | 'students'
  | 'productivity'
  | 'marketing'
  | 'content-creation';

export type PricingType = 'free' | 'freemium' | 'free-trial' | 'paid';

export interface PricingPlan {
  name: string;
  price: string;
  billing: string;
  features: string[];
  popular?: boolean;
}

export interface HowToStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface CompetitorComparisonItem {
  competitorName: string;
  advantage: string;
  disadvantage: string;
}

export interface ToolVerdict {
  summary: string;
  recommendation: 'Must-Have' | 'Highly Recommended' | 'Recommended with Caveats' | 'Specialized Only';
  score: number;
  bottomLine: string;
}

export interface AITool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  category: ToolCategory;
  categoryLabel: string;
  categories?: ToolCategory[];
  pricingType: PricingType;
  pricingSummary: string;
  pricingPlans: PricingPlan[];
  pricingDetailsNotes?: string;
  bestFor: string;
  targetUsers?: string[];
  supportedPlatforms?: string[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  limitations?: string[];
  verdict?: ToolVerdict;
  competitorComparison?: CompetitorComparisonItem[];
  howToUse: HowToStep[];
  alternatives: string[];
  officialUrl: string;
  developerUrl?: string;
  affiliateUrl: string;
  hasAffiliate: boolean;
  rating: number;
  reviewsCount: number;
  badges: string[];
  sponsored?: boolean;
  iconName: string;
  iconBg: string;
  logoUrl?: string;
  verifiedDate: string;
  capabilities?: string[];
  useCases: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  faqs?: ToolFAQ[];
  generatorType?: string;
  interactiveConfig?: any;
}

export type BusinessIdeaCategory =
  | 'online-business'
  | 'ai-business'
  | 'side-hustle'
  | 'small-business';

export interface RoadmapPhase {
  step: number;
  phase: string;
  action: string;
  toolsRecommended: string[];
}

export interface BusinessIdea {
  id: string;
  slug: string;
  title: string;
  category: BusinessIdeaCategory;
  categoryLabel: string;
  startupCost: string;
  timeToLaunch: string;
  earningPotential: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  detailedDescription: string;
  targetMarket: string;
  monetizationMethods: string[];
  techStack: string[];
  stepByStepRoadmap: RoadmapPhase[];
  recommendedToolSlugs: string[];
  pros: string[];
  cons: string[];
  caseStudy: {
    title: string;
    result: string;
    takeaway: string;
  };
}

export interface ArticleHeading {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  toolRecommendation?: string;
  toolSlug?: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio?: string;
    social?: {
      twitter?: string;
      linkedin?: string;
      website?: string;
    };
  };
  featuredImage: string;
  excerpt: string;
  introduction: string;
  keyTakeaways?: string[];
  headings: ArticleHeading[];
  conclusion?: string;
  faqs: ArticleFAQ[];
  relatedArticleSlugs: string[];
  relatedToolSlugs: string[];
  tags?: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface PinterestLandingTopic {
  id: string;
  slug: string;
  title: string;
  pinHeading: string;
  heroBadge: string;
  subtitle: string;
  categoryFilter?: ToolCategory;
  categoryType: 'tools' | 'business';
  curatedToolSlugs: string[];
  keyHighlights: string[];
  checklistItems: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

export type TutorialCategory =
  | 'All'
  | 'ChatGPT'
  | 'AI Writing'
  | 'AI Image'
  | 'AI Video'
  | 'Productivity'
  | 'Students'
  | 'Marketing'
  | 'Other';

export type TutorialDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface TutorialStep {
  step: number;
  title: string;
  description: string;
  tips?: string;
  codeSnippet?: string;
  promptExample?: string;
}

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: TutorialCategory;
  difficulty: TutorialDifficulty;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  introduction: string;
  whatYouNeed: string[];
  steps: TutorialStep[];
  tips: string[];
  commonMistakes: string[];
  conclusion: string;
  relatedTools: string[];
  publishedDate?: string;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
}

