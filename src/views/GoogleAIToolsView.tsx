import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  X,
  Code2,
  Video,
  Image as ImageIcon,
  BookOpen,
  Zap,
  Bot,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';
import { isGoogleAITool, GOOGLE_AI_TOOL_SLUGS } from '../data/toolsData';
import { AITool } from '../types';

type GoogleCategoryFilter =
  | 'all'
  | 'ai-assistant'
  | 'ai-image'
  | 'ai-video'
  | 'research'
  | 'productivity'
  | 'ai-development';

interface FilterOption {
  id: GoogleCategoryFilter;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  {
    id: 'all',
    label: 'All',
    icon: Layers,
    description: "Complete catalog of Google's public AI engines and tools"
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    icon: Bot,
    description: 'Multimodal conversational assistants for reasoning and writing'
  },
  {
    id: 'ai-image',
    label: 'AI Image',
    icon: ImageIcon,
    description: 'Photorealistic text-to-image foundation models and sandboxes'
  },
  {
    id: 'ai-video',
    label: 'AI Video',
    icon: Video,
    description: 'Cinematic 1080p high-definition generative video models'
  },
  {
    id: 'research',
    label: 'Research',
    icon: BookOpen,
    description: 'Document-grounded citation engines and study notebooks'
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: Zap,
    description: 'Workspace assistants, audio overviews, and daily workflow accelerators'
  },
  {
    id: 'ai-development',
    label: 'AI Development',
    icon: Code2,
    description: 'Prototyping sandboxes, SDKs, and enterprise developer APIs'
  }
];

export const GoogleAIToolsView: React.FC = () => {
  const { tools, navigate } = useApp();
  const [activeFilter, setActiveFilter] = useState<GoogleCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Extract all Google AI tools from the active tools registry
  const googleTools = useMemo(() => {
    return tools.filter((tool) => isGoogleAITool(tool));
  }, [tools]);

  // Filter tools based on active category filter and search query
  const filteredTools = useMemo(() => {
    return googleTools.filter((tool) => {
      // 1. Search Query Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchTagline = tool.tagline.toLowerCase().includes(q);
        const matchDesc = tool.description.toLowerCase().includes(q);
        const matchCat = (tool.categoryLabel || '').toLowerCase().includes(q);
        const matchFeatures = (tool.keyFeatures || []).some((f) => f.toLowerCase().includes(q));
        const matchTags = (tool.tags || []).some((t) => t.toLowerCase().includes(q));
        const matchUseCases = (tool.useCases || []).some((u) => u.toLowerCase().includes(q));
        if (!matchName && !matchTagline && !matchDesc && !matchCat && !matchFeatures && !matchTags && !matchUseCases) {
          return false;
        }
      }

      // 2. Category Filter Match
      if (activeFilter === 'all') return true;

      const slug = tool.slug.toLowerCase();
      const cat = (tool.category || '').toLowerCase();
      const catLabel = (tool.categoryLabel || '').toLowerCase();
      const cats = (tool.categories || []).map((c) => c.toLowerCase());

      switch (activeFilter) {
        case 'ai-assistant':
          return (
            slug.includes('gemini') && !slug.includes('api') && !slug.includes('studio') ||
            cat.includes('assistant') ||
            catLabel.includes('assistant')
          );
        case 'ai-image':
          return (
            slug.includes('imagen') ||
            cat.includes('image') ||
            catLabel.includes('image') ||
            cats.includes('ai-image-generation')
          );
        case 'ai-video':
          return (
            slug.includes('veo') ||
            cat.includes('video') ||
            catLabel.includes('video') ||
            cats.includes('ai-video')
          );
        case 'research':
          return (
            slug.includes('notebooklm') ||
            catLabel.includes('research') ||
            cats.includes('ai-research-tools') ||
            (tool.useCases && tool.useCases.some((u) => u.toLowerCase().includes('research')))
          );
        case 'productivity':
          return (
            slug.includes('notebooklm') ||
            slug.includes('gemini') ||
            catLabel.includes('productivity') ||
            cats.includes('ai-productivity') ||
            cats.includes('ai-productivity-tools')
          );
        case 'ai-development':
          return (
            slug.includes('studio') ||
            slug.includes('api') ||
            cat.includes('coding') ||
            cat.includes('development') ||
            catLabel.includes('development') ||
            cats.includes('ai-coding')
          );
        default:
          return true;
      }
    });
  }, [googleTools, activeFilter, searchQuery]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<GoogleCategoryFilter, number> = {
      all: googleTools.length,
      'ai-assistant': 0,
      'ai-image': 0,
      'ai-video': 0,
      research: 0,
      productivity: 0,
      'ai-development': 0
    };

    googleTools.forEach((tool) => {
      const slug = tool.slug.toLowerCase();
      const cat = (tool.category || '').toLowerCase();
      const catLabel = (tool.categoryLabel || '').toLowerCase();
      const cats = (tool.categories || []).map((c) => c.toLowerCase());

      if (slug.includes('gemini') && !slug.includes('api') && !slug.includes('studio') || cat.includes('assistant') || catLabel.includes('assistant')) {
        counts['ai-assistant']++;
      }
      if (slug.includes('imagen') || cat.includes('image') || catLabel.includes('image') || cats.includes('ai-image-generation')) {
        counts['ai-image']++;
      }
      if (slug.includes('veo') || cat.includes('video') || catLabel.includes('video') || cats.includes('ai-video')) {
        counts['ai-video']++;
      }
      if (slug.includes('notebooklm') || catLabel.includes('research') || cats.includes('ai-research-tools') || (tool.useCases && tool.useCases.some((u) => u.toLowerCase().includes('research')))) {
        counts.research++;
      }
      if (slug.includes('notebooklm') || slug.includes('gemini') || catLabel.includes('productivity') || cats.includes('ai-productivity') || cats.includes('ai-productivity-tools')) {
        counts.productivity++;
      }
      if (slug.includes('studio') || slug.includes('api') || cat.includes('coding') || cat.includes('development') || catLabel.includes('development') || cats.includes('ai-coding')) {
        counts['ai-development']++;
      }
    });

    return counts;
  }, [googleTools]);

  const faqs = [
    {
      q: 'What is included in the Google AI Tools collection?',
      a: "This collection brings together Google's major publicly available AI products, generative foundation models, and developer tools in one verified hub. It includes Google Gemini (conversational assistant), Google AI Studio (developer prototyping sandbox), NotebookLM (grounded research and Audio Overviews), Google Veo (cinematic 1080p video generation), Google Imagen 3 (photorealistic image generation), and the official Gemini API."
    },
    {
      q: 'Which Google AI tools are free to use?',
      a: 'Google offers generous free access across its AI ecosystem: Google Gemini has a free tier powered by Gemini 2.0 Flash; NotebookLM is 100% free with any personal Google account as part of Google Labs; Google Labs ImageFX offers free image generation with Imagen 3; and Google AI Studio provides a free developer tier with up to 15 requests per minute with zero credit card required.'
    },
    {
      q: 'How does Google AI Studio differ from the Gemini API?',
      a: 'Google AI Studio is an interactive, browser-based sandbox where developers can experiment with prompts, system instructions, temperature settings, and structured JSON outputs with visual controls. The Gemini API is the programmatic interface (REST endpoints and SDKs for TypeScript, Python, and Go) used to deploy those models directly into software applications.'
    },
    {
      q: 'What makes NotebookLM different from standard AI chatbots?',
      a: 'NotebookLM grounds its intelligence exclusively in up to 50 documents that you upload (PDFs, Google Docs, lecture notes, URLs). Unlike open-ended chatbots that draw from broader training data and risk hallucinations, NotebookLM cites exact passages and page numbers from your sources, and generates two-host conversational Audio Overview podcasts based strictly on your material.'
    },
    {
      q: 'Where can developers obtain Gemini API keys and documentation?',
      a: 'Developers can create a free API key in seconds by visiting ai.google.dev or aistudio.google.com. Comprehensive documentation, code samples, and official SDKs are available at ai.google.dev.'
    }
  ];

  // Collection schema for structured search engine data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Google AI Tools - Gemini, AI Studio & More | AI Tool Nest',
    description: "Explore Google AI tools for artificial intelligence, research, productivity, image generation, video generation, and AI development.",
    url: 'https://aitoolnest.com/#/google-ai-tools',
    hasPart: googleTools.map((t) => ({
      '@type': 'SoftwareApplication',
      name: t.name,
      applicationCategory: t.categoryLabel,
      url: t.officialUrl,
      offers: {
        '@type': 'Offer',
        price: t.pricingType === 'free' ? '0' : undefined,
        priceCurrency: 'USD',
        category: t.pricingType
      }
    })),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: googleTools.map((t, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: t.name,
          url: `https://aitoolnest.com/#/ai-tools/${t.slug}`
        }
      }))
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Google AI Tools - Gemini, AI Studio & More | AI Tool Nest"
        description="Explore Google AI tools for artificial intelligence, research, productivity, image generation, video generation, and AI development."
        canonicalUrl="https://aitoolnest.com/#/google-ai-tools"
        schemaData={collectionSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools Directory', path: '/tools' },
          { label: 'Google AI Tools' }
        ]}
      />

      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Official Google Ecosystem Collection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Space_Grotesk'] text-white">
            Google AI Tools
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
            Explore Google's AI tools for creativity, research, productivity, development, and more.
          </p>

          {/* Small Introduction */}
          <div className="pt-2 text-sm text-slate-400 leading-relaxed max-w-2xl border-t border-slate-800/80">
            This dedicated collection brings together Google’s major publicly available AI products, generative foundation models, and developer tools in one place. From conversational reasoning with Google Gemini and personalized document synthesis in NotebookLM, to photorealistic visual rendering in Imagen 3, cinematic video in Veo, and rapid prototyping in Google AI Studio.
          </div>

          {/* Key Ecosystem Stats */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{googleTools.length} Verified Google AI Tools</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Official Developer & API Docs</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Multimodal Foundation Models</span>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Controls: Search Bar & Filters */}
      <section className="space-y-4" aria-label="Tool Filters and Search">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Google AI tools, models, features, or SDKs..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
                title="Clear search"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>
              Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredTools.length}</strong> of{' '}
              {googleTools.length} Google AI tools
            </span>
            {(searchQuery || activeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold ml-2 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {FILTER_OPTIONS.map((filter) => {
            const Icon = filter.icon;
            const isSelected = activeFilter === filter.id;
            const count = categoryCounts[filter.id] || 0;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-600/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{filter.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tool Cards Grid */}
      <main aria-label="Google AI Tools Catalog">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching Google AI tools found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              No Google tools match your query "{searchQuery}" in the selected category. Try clearing your search or switching to "All".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer"
            >
              View All Google AI Tools
            </button>
          </div>
        )}
      </main>

      {/* Ecosystem Architecture Breakdown */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Architecture & Hierarchy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            How Google's AI Ecosystem Fits Together
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Google structures its artificial intelligence into three distinct tiers: consumer-facing assistants, creative foundation models, and developer infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1. Consumer & Productivity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Google Gemini</strong> and <strong>NotebookLM</strong> provide end-user applications for writing, synthesis, deep research on source documents, and Google Workspace integration.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              2. Creative Media Models
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Google Imagen 3</strong> (photorealistic images) and <strong>Google Veo</strong> (1080p generative video) power visual creation with SynthID forensic watermarking and cinematic lens controls.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              3. Developer & API Platform
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Google AI Studio</strong> and the <strong>Gemini API</strong> give software engineers direct access to 2M token context windows, system prompts, structured JSON outputs, and client SDKs.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Frequently Asked Questions About Google AI Tools
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Answers to common questions about availability, pricing, developer keys, and capabilities.
          </p>
        </div>

        <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div key={idx} className={idx > 0 ? 'pt-3' : ''}>
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  className="w-full text-left py-2 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <span>{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 py-2 leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
