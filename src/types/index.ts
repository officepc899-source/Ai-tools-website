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
  useCases: string[];
  tags?: string[];
  faqs?: ToolFAQ[];
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

export type DigitalProductCategory =
  | 'prompt-packs'
  | 'templates'
  | 'ebooks'
  | 'notion-templates'
  | 'canva-templates';

export interface DigitalProduct {
  id: string;
  slug: string;
  title: string;
  category: DigitalProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice: number;
  description: string;
  fullOverview: string;
  previewBadge: string;
  format: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  downloadIncludes: string[];
  sampleItems: string[];
  buyUrl: string;
  badgeText?: string;
  colorScheme: string;
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
  categoryType: 'tools' | 'business' | 'products';
  curatedToolSlugs: string[];
  keyHighlights: string[];
  checklistItems: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}
