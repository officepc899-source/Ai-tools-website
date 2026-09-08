import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  Star,
  Layers,
  PlusCircle,
  Copy,
  PenTool,
  Palette,
  Film,
  Briefcase,
  GraduationCap,
  Code2,
  Compass,
  Award,
  Users,
  Clock,
  Gift,
  ChevronDown,
  HelpCircle,
  Check,
  Quote,
  Flame,
  BookOpen,
  SlidersHorizontal,
  CheckCircle2,
  Lock,
  Globe2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ToolCard } from '../components/ToolCard';
import { ToolCardSkeleton } from '../components/ToolCardSkeleton';
import { ArticleCard } from '../components/ArticleCard';
import { AI_PROMPTS } from '../data/promptsData';
import { INITIAL_ARTICLES } from '../data/articlesData';

export const HomeView: React.FC = () => {
  const { tools, navigate, setIsSearchOpen, setSubmitToolModalOpen, showToast } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('all');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = heroSearch.trim();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (selectedSearchCategory && selectedSearchCategory !== 'all') {
      params.set('category', selectedSearchCategory);
    }
    const queryString = params.toString();
    if (queryString) {
      navigate(`/tools?${queryString}`);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === activeCategoryTab) return;
    setIsTabLoading(true);
    setActiveCategoryTab(tabId);
    setTimeout(() => {
      setIsTabLoading(false);
    }, 220);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid work email address');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Welcome to the AIToolNest VIP Dispatch.');
  };

  // Curated tools selections
  const featuredTools = tools
    .filter((t) => t.badges.includes('Featured') || t.badges.includes('Popular') || t.badges.includes('Staff Pick'))
    .slice(0, 6);
  const trendingTools = tools
    .filter((t) => t.badges.includes('Trending') || t.badges.includes('Viral') || t.rating >= 4.8)
    .slice(0, 6);
  const newTools = tools.slice(-6).reverse();
  const samplePrompts = AI_PROMPTS.slice(0, 3);
  const latestArticles = INITIAL_ARTICLES.slice(0, 3);

  // Popular Categories list with rich meta
  const categoryHighlights = [
    {
      id: 'ai-writing',
      name: 'AI Writing & Copy',
      icon: PenTool,
      count: '1,420+ tools',
      gradient: 'from-blue-500/10 to-indigo-500/10',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/80',
      desc: 'Long-form drafting, SEO copywriting, paraphrasers & proofreading agents'
    },
    {
      id: 'ai-image-generation',
      name: 'AI Image & Design',
      icon: Palette,
      count: '980+ tools',
      gradient: 'from-pink-500/10 to-rose-500/10',
      iconColor: 'text-rose-600 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-950/80',
      desc: 'Text-to-image synthesis, canvas generation, vector art & logo builders'
    },
    {
      id: 'ai-video',
      name: 'AI Video & Cinema',
      icon: Film,
      count: '650+ tools',
      gradient: 'from-purple-500/10 to-violet-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-950/80',
      desc: 'Text-to-video generation, virtual avatars, auto-subtitles & reel clippers'
    },
    {
      id: 'ai-audio',
      name: 'AI Audio & Voice',
      icon: Sparkles,
      count: '410+ tools',
      gradient: 'from-cyan-500/10 to-teal-500/10',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      iconBg: 'bg-cyan-50 dark:bg-cyan-950/80',
      desc: 'Hyper-realistic voice cloning, generative music, and audio stem separation'
    },
    {
      id: 'ai-coding',
      name: 'AI Coding & DevOps',
      icon: Code2,
      count: '820+ tools',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/80',
      desc: 'Autonomous code autocompletion, refactoring, security audits & testing bots'
    },
    {
      id: 'ai-productivity',
      name: 'AI Productivity',
      icon: Zap,
      count: '1,150+ tools',
      gradient: 'from-amber-500/10 to-orange-500/10',
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/80',
      desc: 'Automated meeting transcription, smart notetakers & executive workflows'
    },
    {
      id: 'ai-business',
      name: 'AI for Business',
      icon: Briefcase,
      count: '1,840+ tools',
      gradient: 'from-indigo-500/10 to-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/80',
      desc: 'Enterprise CRM bots, predictive sales forecasting & customer support'
    },
    {
      id: 'ai-marketing',
      name: 'AI Marketing & SEO',
      icon: TrendingUp,
      count: '780+ tools',
      gradient: 'from-fuchsia-500/10 to-pink-500/10',
      iconColor: 'text-fuchsia-600 dark:text-fuchsia-400',
      iconBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/80',
      desc: 'Ad creative automation, SERP rank analyzers & viral email copywriting'
    },
    {
      id: 'ai-education',
      name: 'AI for Education',
      icon: GraduationCap,
      count: '540+ tools',
      gradient: 'from-violet-500/10 to-indigo-500/10',
      iconColor: 'text-violet-600 dark:text-violet-400',
      iconBg: 'bg-violet-50 dark:bg-violet-950/80',
      desc: 'Literature reviews, smart citations, flashcard generators & research tutors'
    }
  ];

  const filteredTools =
    activeCategoryTab === 'all'
      ? featuredTools
      : tools
          .filter(
            (t) =>
              t.category === activeCategoryTab ||
              (t.categories && t.categories.includes(activeCategoryTab as any))
          )
          .slice(0, 6);

  // FAQ Items for Home
  const homeFaqs = [
    {
      q: 'What is AIToolNest?',
      a: 'AIToolNest is an independent directory, benchmarking portal, and research hub that helps builders, businesses, developers, and creators discover, evaluate, and deploy the world’s best artificial intelligence tools.'
    },
    {
      q: 'Are all the tools on AIToolNest really tested?',
      a: 'Yes. Unlike automated web scrapers, every tool featured in our primary listings undergoes thorough testing by our research team across output quality, pricing transparency, privacy policies, and real-world utility.'
    },
    {
      q: 'Can I find 100% free AI tools without entering a credit card?',
      a: 'Absolutely. We curate a dedicated "100% Free AI Tools" section featuring completely free software, open-source weights, and generous freemium quotas with zero upfront payment required.'
    },
    {
      q: 'How do I submit my AI startup or tool for listing?',
      a: 'Simply click "Submit Your AI Tool" in the header or footer. Basic directory listing is 100% free. We also offer expedited 24-hour review and featured placement options for founders seeking maximum exposure.'
    },
    {
      q: 'How frequently is tool pricing and benchmark data updated?',
      a: 'Our research team performs weekly price and feature audits to guarantee that token costs, subscription tiers, and active release versions remain accurate.'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote:
        'AIToolNest saved our agency thousands in redundant SaaS bills. The honest pros and cons breakdown helped us pick Cursor and Midjourney v6 without the usual marketing hype.',
      author: 'Elena Rostova',
      role: 'Head of Product, Omnitech Media',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote:
        'The Free AI Tools filter is unmatched. As a solo indie hacker, finding genuinely free APIs and open-source models accelerated my MVP launch by at least two months.',
      author: 'David Chen',
      role: 'Fullstack Founder, FlowState AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote:
        'The prompt vault and in-depth comparison guides are part of my weekly engineering review. The editorial independence is clear in every single article.',
      author: 'Sarah Jenkins',
      role: 'Lead AI Engineer, Synthetix Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <SEOHead
        title="AIToolNest - Discover the Best AI Tools for Every Task"
        description="Explore 10,000+ hand-tested AI tools, productivity software, generative models, and free digital resources categorized to accelerate your workflow on AIToolNest."
        canonicalUrl="https://aitoolnest.com/"
        schemaData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AIToolNest',
            url: 'https://aitoolnest.com',
            description: 'The premier independent discovery directory for artificial intelligence software and productivity tools.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://aitoolnest.com/#/tools?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'AIToolNest',
            url: 'https://aitoolnest.com',
            logo: 'https://aitoolnest.com/logo.png',
            sameAs: [
              'https://twitter.com',
              'https://linkedin.com',
              'https://github.com'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Featured AI Tools',
            description: 'Curated and verified top AI tools on AIToolNest',
            itemListElement: featuredTools.map((t, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: t.name,
              url: `https://aitoolnest.com/#/ai-tools/${t.slug}`
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: homeFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a
              }
            }))
          }
        ]}
      />

      {/* 1. HERO SECTION: Stunning Gradient Mesh Background & Redesigned Header */}
      <section
        aria-labelledby="hero-heading"
        className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80"
      >
        {/* Modern Multi-Layer Gradient Mesh Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-12 left-1/6 w-96 h-96 bg-indigo-500/12 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-10 right-1/6 w-96 h-96 bg-purple-500/12 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-sky-500/8 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>The Premier AI Directory • 10,000+ Tested & Verified Tools</span>
          </div>

          {/* EXACT REQUIRED LARGE HEADLINE */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] font-['Space_Grotesk'] mb-6"
          >
            Discover the{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Best AI Tools
            </span>{' '}
            for Every Task
          </h1>

          {/* PROFESSIONAL SUBTITLE */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            Explore thousands of hand-tested artificial intelligence software, generative models, and automation workflows audited to accelerate your business, code, and creative output.
          </p>

          {/* UNIFIED SEARCH BAR WITH INTEGRATED CATEGORY FILTER */}
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Find AI tools by name, category or workflow"
            className="max-w-3xl mx-auto mb-6"
          >
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 sm:p-2.5 shadow-xl shadow-indigo-500/10 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all gap-2 sm:gap-1.5">
              {/* Category Filter Dropdown */}
              <div className="relative flex items-center shrink-0 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-slate-800 pb-2 sm:pb-0 sm:pr-2.5">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400 ml-2.5 mr-2 shrink-0" />
                <label htmlFor="hero-category-select" className="sr-only">
                  Filter by Category
                </label>
                <select
                  id="hero-category-select"
                  value={selectedSearchCategory}
                  onChange={(e) => setSelectedSearchCategory(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-5 py-1.5 appearance-none"
                >
                  <option value="all">All Categories</option>
                  <option value="ai-writing">AI Writing & Copy</option>
                  <option value="ai-image-generation">AI Image & Design</option>
                  <option value="ai-video">AI Video & Motion</option>
                  <option value="ai-audio">AI Audio & Voice</option>
                  <option value="ai-coding">AI Coding & DevOps</option>
                  <option value="ai-productivity">AI Productivity</option>
                  <option value="ai-business">AI for Business</option>
                  <option value="ai-marketing">AI Marketing & SEO</option>
                  <option value="ai-education">AI for Education</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1 pointer-events-none" />
              </div>

              {/* Search Query Input */}
              <div className="relative flex items-center flex-1 min-w-0">
                <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <label htmlFor="hero-search-input" className="sr-only">
                  Search AI Tools
                </label>
                <input
                  id="hero-search-input"
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search 10,000+ AI tools by name, task, or feature..."
                  className="w-full px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
                />
                {heroSearch && (
                  <button
                    type="button"
                    onClick={() => setHeroSearch('')}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 cursor-pointer"
                    aria-label="Clear search input"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 shadow-md shadow-indigo-600/25 inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find AI Tools</span>
              </button>
            </div>
          </form>

          {/* Quick Trending Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
              <span>Trending Searches:</span>
            </span>
            {[
              { label: 'ChatGPT Alternatives', q: 'ChatGPT Alternatives' },
              { label: 'Cursor AI', q: 'Cursor' },
              { label: 'Midjourney v6', q: 'Midjourney' },
              { label: 'Free AI Writing', q: 'AI Writing', cat: 'ai-writing' },
              { label: 'Claude 3.7', q: 'Claude' },
              { label: '100% Free Tools', path: '/free-ai-tools' },
              { label: 'AI Video Generators', q: 'Video Generator', cat: 'ai-video' }
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (tag.path) {
                    navigate(tag.path);
                  } else {
                    const params = new URLSearchParams();
                    if (tag.q) params.set('q', tag.q);
                    if (tag.cat) params.set('category', tag.cat);
                    navigate(`/tools?${params.toString()}`);
                  }
                }}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-300 transition-all cursor-pointer shadow-2xs text-[11px] sm:text-xs font-medium"
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/tools')}
              className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore 10,000+ AI Tools</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setSubmitToolModalOpen(true)}
              className="px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Submit Your AI Tool</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTER STRIP */}
      <section aria-label="AIToolNest Statistics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-900/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                  10,000+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  AI Tools Indexed
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                  100+
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Curated Categories
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                  Updated Weekly
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Verified Pricing & Features
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                  Free AI Resources
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                  100% Free Tools & Prompts
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED AI TOOLS SECTION: Redesigned Cards, Loading Skeletons & Category Tabs */}
      <section aria-labelledby="featured-tools-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-bold mb-2 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Editor&apos;s Audited Selections • Top Rated</span>
            </div>
            <h2
              id="featured-tools-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
            >
              Featured AI Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Hand-tested artificial intelligence software ranked for workflow accuracy, value, and reliability.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 transition-all inline-flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-2xs hover:shadow-xs"
          >
            <span>Browse Full Directory (10,000+)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Tabs with Active Counters */}
        <div
          role="tablist"
          aria-label="Filter Featured Tools by Category"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-7 scrollbar-none"
        >
          {[
            { id: 'all', label: 'All Featured', count: featuredTools.length },
            { id: 'ai-writing', label: 'AI Writing', count: tools.filter((t) => t.category === 'ai-writing').length },
            {
              id: 'ai-image-generation',
              label: 'Image & Design',
              count: tools.filter((t) => t.category === 'ai-image-generation').length
            },
            { id: 'ai-video', label: 'Video & Cinema', count: tools.filter((t) => t.category === 'ai-video').length },
            { id: 'ai-coding', label: 'Coding & Dev', count: tools.filter((t) => t.category === 'ai-coding').length },
            { id: 'ai-productivity', label: 'Productivity', count: tools.filter((t) => t.category === 'ai-productivity').length }
          ].map((tab) => {
            const isActive = activeCategoryTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-900/10'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tool Cards Grid with Loading Skeleton State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {isTabLoading
            ? Array.from({ length: 6 }).map((_, idx) => <ToolCardSkeleton key={idx} />)
            : filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} featured={tool.badges.includes('Staff Pick')} />
              ))}
        </div>
      </section>

      {/* 4. POPULAR CATEGORIES SECTION: Rich Bento Cards with Micro-Animations */}
      <section aria-labelledby="popular-categories-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-bold mb-2 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Specialized Workflows • 100+ Categories</span>
            </div>
            <h2
              id="popular-categories-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
            >
              Explore Top AI Categories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Browse through specialized niches to find the exact AI application for your workflow.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>All 100+ Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => navigate(`/tools?category=${cat.id}`)}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all duration-300 text-left shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Subtle Hover Gradient Glow */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${cat.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl ${cat.iconBg} ${cat.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xs`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/90 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {cat.count}
                  </span>
                  <div className="flex items-center gap-1 font-bold">
                    <span>Explore Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. TRENDING AI TOOLS SECTION */}
      <section aria-labelledby="trending-tools-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80 text-xs font-bold mb-2 shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Viral Growth & Rapid Adoption</span>
            </div>
            <h2
              id="trending-tools-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
            >
              Trending AI Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Software solutions generating the highest community engagement and benchmark breakthroughs.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools?sort=popular')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Trending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {trendingTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 6. "WHY CHOOSE US" TRUST MATRIX */}
      <section aria-labelledby="why-choose-us-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Unbiased Curation & Quality Standard</span>
          </div>
          <h2
            id="why-choose-us-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
          >
            Why Builders & Professionals Choose AIToolNest
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            The AI landscape moves at lightning speed. We provide definitive clarity through independent, hand-tested directory curation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 font-['Space_Grotesk']">
                Hands-On Testing & Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero automated scraper junk. Every featured tool is audited by our research desk across output fidelity, latency, data privacy, and feature authenticity.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              100% Manually Evaluated
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 font-['Space_Grotesk']">
                100% Transparent Pricing
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                No hidden paywalls or surprise trials. We audit true Free tiers, generous freemium quotas, and enterprise monthly rates weekly.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              Verified Price Audits
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 font-['Space_Grotesk']">
                Honest Pros & Cons
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We publish genuine software limitations, token quotas, and learning curves alongside advantages, helping you avoid costly trial-and-error.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              Unvarnished Comparisons
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2 font-['Space_Grotesk']">
                Creator & Founder Driven
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Indie builders and tech founders submit their tools directly, reaching over 500,000 monthly developers, digital marketers, and agency operators.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
              500,000+ Monthly Visitors
            </div>
          </div>
        </div>
      </section>

      {/* 7. 100% FREE AI TOOLS SPOTLIGHT BANNER */}
      <section aria-labelledby="free-tools-banner-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Zero Cost Workflow</span>
            </div>
            <h3
              id="free-tools-banner-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']"
            >
              Save Thousands With 100% Free AI Tools
            </h3>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              Don&apos;t spend $20-$100/mo before checking our hand-verified list of completely free AI tools with no credit card required.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/free-ai-tools')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <span>Browse Free AI Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/chatgpt-alternatives')}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer border border-slate-700"
              >
                ChatGPT Alternatives
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* 8. LATEST BLOG POSTS SECTION */}
      <section aria-labelledby="latest-articles-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Deep In-Depth Research & Comparisons</span>
            </div>
            <h2
              id="latest-articles-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
            >
              Latest AI Guides & Industry Tutorials
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Read comprehensive benchmarks, prompting blueprints, and productivity stacks.
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Browse All Guides &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIALS & SOCIAL PROOF */}
      <section aria-labelledby="testimonials-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Community Trust</span>
          </div>
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
          >
            Trusted by 500,000+ AI Builders & Founders
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            See what product leads, developers, and agency owners say about AIToolNest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-indigo-400/60" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CURATED PROMPT VAULT SPOTLIGHT */}
      <section aria-labelledby="prompt-vault-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Copy & Paste Prompt Engineering</span>
              </div>
              <h2
                id="prompt-vault-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
              >
                Curated AI Prompt Vault
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Battle-tested prompts engineered for ChatGPT, Claude, Midjourney, and Gemini.
              </p>
            </div>

            <button
              onClick={() => navigate('/ai-prompts')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer self-start md:self-auto"
            >
              Open Full Prompt Vault (5,000+)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {samplePrompts.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {item.targetModel}
                    </span>
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                    &ldquo;{item.promptText}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.promptText);
                      showToast('Copied prompt to clipboard!');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </button>
                  <button
                    onClick={() => navigate('/ai-prompts')}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    View details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section aria-labelledby="faq-heading" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Answers to Common Questions</span>
          </div>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about discovering, evaluating, and listing tools on AIToolNest.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, fIdx) => {
            const isOpen = openFaq === fIdx;
            return (
              <div
                key={fIdx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. NEWSLETTER SUBSCRIPTION SECTION */}
      <section aria-labelledby="newsletter-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly AI Tools & Innovation Dispatch</span>
            </div>
            <h3
              id="newsletter-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']"
            >
              Stay Ahead With The Top AI Releases
            </h3>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              Join 45,000+ founders, marketers, and developers receiving our hand-curated weekly breakdown of top newly launched tools, prompts, and tutorials.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="newsletter-email-input" className="sr-only">
                    Work email address
                  </label>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Enter your work email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-colors shrink-0 shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-slate-500" />
                  <span>No spam ever. 1-click unsubscribe anytime. Official contact: aitoolnest1@gmail.com</span>
                </div>
              </form>
            ) : (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are on the VIP dispatch list! Welcome aboard.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 13. PROFESSIONAL CALL-TO-ACTION SECTION */}
      <section aria-labelledby="cta-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-indigo-500/20">
          <div className="max-w-3xl mx-auto relative z-10 space-y-4">
            <span className="px-3.5 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Empower Your Workflow
            </span>
            <h2
              id="cta-heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Space_Grotesk'] leading-tight"
            >
              Ready to Supercharge Your Workflow with AI?
            </h2>
            <p className="text-xs sm:text-base text-indigo-200/90 max-w-xl mx-auto leading-relaxed">
              Explore 10,000+ benchmarked AI tools or submit your startup software to be discovered by our community today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={() => navigate('/tools')}
                className="px-7 py-3.5 bg-white text-indigo-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Browse All 10,000+ Tools
              </button>
              <button
                onClick={() => setSubmitToolModalOpen(true)}
                className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-xl border border-indigo-400/30 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Your AI Tool Free</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
