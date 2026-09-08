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
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Copy,
  PenTool,
  Palette,
  Film,
  Briefcase,
  GraduationCap,
  Code2,
  Lightbulb,
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
  Calendar,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ToolCard } from '../components/ToolCard';
import { ArticleCard } from '../components/ArticleCard';
import { AI_PROMPTS } from '../data/promptsData';
import { INITIAL_ARTICLES } from '../data/articlesData';

export const HomeView: React.FC = () => {
  const { tools, navigate, setIsSearchOpen, setSubmitToolModalOpen, showToast } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/tools?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleQuickTag = (tag: string) => {
    navigate(`/tools?q=${encodeURIComponent(tag)}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Welcome to the AIToolNest VIP Dispatch.');
  };

  // Featured tools selection
  const featuredTools = tools.filter((t) => t.badges.includes('Featured') || t.badges.includes('Popular') || t.badges.includes('Staff Pick')).slice(0, 6);
  const trendingTools = tools.filter((t) => t.badges.includes('Trending') || t.badges.includes('Viral') || t.rating >= 4.8).slice(0, 6);
  const newTools = tools.slice(-6).reverse();
  const samplePrompts = AI_PROMPTS.slice(0, 3);
  const latestArticles = INITIAL_ARTICLES.slice(0, 3);

  // Category list
  const categoryHighlights = [
    { id: 'ai-writing', name: 'AI Writing', icon: PenTool, count: '1,420+ tools', desc: 'Copywriting, essays, blog generators & proofreading' },
    { id: 'ai-image-generation', name: 'AI Image Generation', icon: Palette, count: '980+ tools', desc: 'Text-to-image, canvas design, mockups & logo makers' },
    { id: 'ai-video', name: 'AI Video & Cinema', icon: Film, count: '650+ tools', desc: 'Text-to-video, realistic voiceover & automated reels' },
    { id: 'ai-audio', name: 'AI Audio & Voice', icon: Sparkles, count: '410+ tools', desc: 'Synthetic music, stem separation, and voice cloning' },
    { id: 'ai-coding', name: 'AI Coding & DevOps', icon: Code2, count: '820+ tools', desc: 'Code autocompletion, debugging & fullstack agents' },
    { id: 'ai-productivity', name: 'AI Productivity', icon: Zap, count: '1,150+ tools', desc: 'Meeting summaries, smart notetakers, task automation' },
    { id: 'ai-business', name: 'AI for Business', icon: Briefcase, count: '1,840+ tools', desc: 'CRM agents, automation, customer support & analytics' },
    { id: 'ai-marketing', name: 'AI Marketing & SEO', icon: TrendingUp, count: '780+ tools', desc: 'Ad creatives, SERP rank analyzers, viral email copy' },
    { id: 'ai-education', name: 'AI for Education', icon: GraduationCap, count: '540+ tools', desc: 'Literature review, citation, flashcards & math solver' }
  ];

  const filteredTools = activeCategoryTab === 'all'
    ? featuredTools
    : tools.filter((t) => t.category === activeCategoryTab || (t.categories && t.categories.includes(activeCategoryTab as any))).slice(0, 6);

  // FAQ Items for Home
  const homeFaqs = [
    {
      q: 'What is AIToolNest?',
      a: 'AIToolNest is an independent directory, benchmarking portal, and research hub that helps builders, businesses, developers, and creators discover, evaluate, and deploy the world’s best artificial intelligence tools.'
    },
    {
      q: 'Are all the tools on AIToolNest really tested?',
      a: 'Yes. Unlike automatic scraper directories, every software tool featured in our primary listings undergoes rigorous testing by our research team across output quality, pricing transparency, security, and real-world productivity.'
    },
    {
      q: 'Can I find 100% free AI tools without credit cards?',
      a: 'Absolutely. We curate a dedicated "100% Free AI Tools" section featuring completely free software, open-source models, and generous freemium quotas with zero initial payment required.'
    },
    {
      q: 'How do I submit my AI startup or tool for listing?',
      a: 'Simply click "Submit Your AI Tool" in the navigation bar. Basic listing is 100% free. We also provide expedited 24-hour review and featured placement options for software founders.'
    },
    {
      q: 'How often is tool pricing and data updated?',
      a: 'Our research team performs weekly price and model audits to ensure that subscription rates, token quotas, and active feature sets remain current.'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: 'AIToolNest saved our agency thousands in redundant SaaS bills. The honest pros and cons breakdown helped us pick Cursor and Midjourney v6 without the usual marketing fluff.',
      author: 'Elena Rostova',
      role: 'Head of Product, Omnitech Media',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: 'The Free AI Tools filter is unmatched. As a solo indie hacker, finding genuinely free APIs and open-source models accelerated my MVP launch by at least two months.',
      author: 'David Chen',
      role: 'Fullstack Founder, FlowState AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      quote: 'The prompt vault and in-depth comparison guides are part of my weekly engineering review. The editorial independence is clear in every single article.',
      author: 'Sarah Jenkins',
      role: 'Lead AI Engineer, Synthetix Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <SEOHead
        title="AIToolNest - Discover The Best AI Tools For Work, Business & Creativity"
        description="Explore 10,000+ top AI tools, productivity apps, automation software, and free digital resources to grow faster on AIToolNest."
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

      {/* 1. Hero Section: Modern AI Startup Design & Premium SaaS Feel */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-12 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>The Premier AI Directory • 10,000+ Tested & Verified Tools</span>
          </div>

          {/* Requested Exact Hero Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] font-['Space_Grotesk'] mb-6">
            Discover The Best AI Tools For{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Work, Business & Creativity
            </span>
          </h1>

          {/* Requested Exact Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Explore thousands of AI tools, productivity apps, automation software, and digital solutions to grow faster.
          </p>

          {/* SaaS Futuristic Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-6">
            <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-lg shadow-indigo-500/5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search AI tools by name, use-case, or category..."
                className="w-full px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 sm:px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 shadow-sm cursor-pointer"
              >
                Find AI Tools
              </button>
            </div>
          </form>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Trending Searches:</span>
            {['ChatGPT Alternatives', 'Midjourney', 'Free AI Writing', 'Cursor AI', 'Claude 3.7', 'AI Video Generator'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQuickTag(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Requested Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('/tools')}
              className="px-6 sm:px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setSubmitToolModalOpen(true)}
              className="px-6 sm:px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Submit Your AI Tool</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Statistics Section: Attractive Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
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

      {/* 3. Featured AI Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Editor&apos;s Top Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
              Featured AI Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Top-rated artificial intelligence software thoroughly tested for performance, stability, and value.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <span>View All 10,000+ Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'all', label: 'All Featured' },
            { id: 'ai-writing', label: 'AI Writing' },
            { id: 'ai-image-generation', label: 'Image & Design' },
            { id: 'ai-video', label: 'Video & Audio' },
            { id: 'ai-coding', label: 'Coding & Dev' },
            { id: 'ai-productivity', label: 'Productivity' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategoryTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategoryTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.badges.includes('Staff Pick')} />
          ))}
        </div>
      </section>

      {/* 4. Popular Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Explore Top AI Categories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Browse through specialized niches to find the exact AI application for your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryHighlights.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => navigate(`/tools?category=${cat.id}`)}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <span>{cat.count}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Trending Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Viral & Fast-Growing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
              Trending AI Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              The fastest-growing AI solutions gaining rapid traction this month.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools?sort=popular')}
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            Explore More &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 6. New AI Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Fresh Releases</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
              New AI Tools Added This Week
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              The newest artificial intelligence software audited and indexed in our database.
            </p>
          </div>

          <button
            onClick={() => navigate('/tools?sort=latest')}
            className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            See All New Releases &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 7. 100% Free AI Tools Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Zero Cost Workflow</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
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

      {/* 8. Why Choose AIToolNest / Trust Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Why Professionals Choose AIToolNest
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            The AI ecosystem moves fast. We provide clarity through unbiased, hand-tested directory curation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Verified Testing & Audits
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Every tool featured is registered and tested by our editorial team. We verify real capabilities, pricing transparency, and data privacy policies.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Real-Time Pricing Updates
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              No hidden paywalls or surprise trials. We clearly tag completely Free tools, generous Freemium quotas, and transparent monthly costs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Community & Creator First
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Indie builders and enterprise founders can submit software to reach hundreds of thousands of active builders, marketers, and students.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Community Trust</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
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
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs space-y-4"
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

      {/* 10. Curated AI Prompt Vault Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Copy & Paste Prompt Engineering</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
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

      {/* 11. Latest Blog Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Deep In-Depth Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
              Latest AI Research & Tutorials
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

      {/* 12. Frequently Asked Questions (FAQ) Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about navigating and using AIToolNest.
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
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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

      {/* 13. Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950/90 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly AI Tools & Innovation Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Stay Ahead With The Top AI Releases
            </h3>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              Join 45,000+ founders, marketers, and developers receiving our hand-curated weekly breakdown of top newly launched tools, prompts, and tutorials.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
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

      {/* 14. Final Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10 space-y-4">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Join The AI Revolution
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Space_Grotesk']">
              Ready To Supercharge Your Workflow?
            </h3>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-lg mx-auto leading-relaxed">
              Browse 10,000+ AI tools or submit your startup software to be discovered by our community today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate('/tools')}
                className="px-6 py-3.5 bg-white text-indigo-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-all cursor-pointer shadow-lg"
              >
                Browse All Tools
              </button>
              <button
                onClick={() => setSubmitToolModalOpen(true)}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shadow-lg"
              >
                Submit Your Tool Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
