import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  ShieldCheck,
  Bot,
  PenTool,
  Palette,
  Briefcase,
  GraduationCap,
  ShoppingBag,
  Lightbulb,
  CheckCircle2,
  Film
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { ToolCard } from '../components/ToolCard';
import { BusinessIdeaCard } from '../components/BusinessIdeaCard';
import { DigitalProductCard } from '../components/DigitalProductCard';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';

export const HomeView: React.FC = () => {
  const { tools, businessIdeas, digitalProducts, articles, navigate, setIsSearchOpen } = useApp();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/tools?q=${encodeURIComponent(localSearch.trim())}`);
    } else {
      setIsSearchOpen(true);
    }
  };

  const popularTools = tools.filter((t) => t.badges.includes('Popular') || t.badges.includes('Featured')).slice(0, 6);
  const featuredIdeas = businessIdeas.slice(0, 3);
  const featuredProducts = digitalProducts.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  const categories = [
    { label: 'Free AI Tools', icon: Zap, color: 'from-emerald-500 to-teal-600', path: '/tools?category=free-ai-tools', count: '100% Free' },
    { label: 'AI Writing', icon: PenTool, color: 'from-blue-500 to-indigo-600', path: '/tools?category=ai-writing-tools', count: '10 Tools' },
    { label: 'AI Design & Image', icon: Palette, color: 'from-violet-500 to-purple-600', path: '/tools?category=ai-design-tools', count: '10 Tools' },
    { label: 'AI Video & Audio', icon: Film, color: 'from-red-500 to-pink-600', path: '/tools?category=ai-video-tools', count: '10 Tools' },
    { label: 'AI Business & Auto', icon: Briefcase, color: 'from-amber-500 to-orange-600', path: '/tools?category=ai-business-tools', count: '10 Tools' },
    { label: 'AI Research & Study', icon: GraduationCap, color: 'from-cyan-500 to-blue-600', path: '/tools?category=ai-research-tools', count: '9 Tools' },
    { label: 'Digital Products', icon: ShoppingBag, color: 'from-rose-500 to-pink-600', path: '/digital-products', count: 'Templates' },
    { label: 'Online Business', icon: Lightbulb, color: 'from-yellow-500 to-amber-600', path: '/business-ideas', count: 'Blueprints' }
  ];

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title="Discover the Best AI Tools & Online Business Ideas"
        description="Find useful AI tools, business ideas, digital products and online resources to work smarter and build your online business."
        canonicalUrl="https://aitoolnest.com/"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'AIToolNest',
          url: 'https://aitoolnest.com',
          description: 'Curated directory of AI tools, online business blueprints, and digital product assets.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://aitoolnest.com/#/tools?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }}
      />

      {/* Hero Section - Clean Minimalism */}
      <section className="relative pt-12 pb-12 sm:pt-16 sm:pb-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Updated for 2026: 250+ Verified Tools & Proven Blueprints</span>
          </div>

          {/* Requested Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-sans mb-4">
            Discover the Best <span className="text-indigo-600">AI Tools</span> & Online Business Ideas
          </h1>

          {/* Requested Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
            Find useful AI tools business ideas digital products and online resources to work smarter and build your online business
          </p>

          {/* Search Bar - Clean Minimalism Rounded Pill */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center bg-slate-100 rounded-full border border-slate-200 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-500/20 p-1.5 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search AI tools resources and ideas..."
                className="w-full px-3 py-2 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-full transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Requested Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/tools')}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Explore AI Tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/business-ideas')}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>Business Ideas</span>
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left sm:text-center text-xs text-slate-500">
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Tested Hands-On Weekly</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Verified Pricing Tiers</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>100% Free Options Highlighted</span>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Zero Sponsored Bias</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Explore Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated toolkits and blueprints organized by workflow
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <button
                key={idx}
                onClick={() => navigate(cat.path)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 shadow-xs hover:shadow-sm transition-all text-left group flex flex-col justify-between h-32 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-indigo-600 transition-colors">
                    {cat.label}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Popular AI Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Popular AI Tools
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Hand-tested software with audited feature sets and verified pricing models
            </p>
          </div>

          <button
            onClick={() => navigate('/tools')}
            className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View Directory &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.badges.includes('Staff Pick')} />
          ))}
        </div>
      </section>

      {/* Horizontal Display Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdBanner format="horizontal-leaderboard" />
      </div>

      {/* Featured Business Ideas Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Business Ideas & Blueprints
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Step-by-step startup models with costs and recommended AI tech stacks
            </p>
          </div>

          <button
            onClick={() => navigate('/business-ideas')}
            className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View All Ideas &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredIdeas.map((idea) => (
            <BusinessIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </section>

      {/* Featured Digital Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Featured Digital Products
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Commercial prompt vaults, Notion kits, and Canva packs ready to use
            </p>
          </div>

          <button
            onClick={() => navigate('/digital-products')}
            className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View All Products &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => (
            <DigitalProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Latest Articles Section on Homepage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Latest from Blog
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Tactical guides and monetization case studies for digital entrepreneurs
            </p>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="text-sm font-medium text-indigo-600 hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>View All Articles &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Pinterest Viral Callout Banner - Clean Minimalism */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-900 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="px-2 py-1 bg-indigo-500 text-[10px] font-bold rounded uppercase tracking-wide">
              Pinterest Resources
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              Looking for our Viral Pinterest Cheat Sheets?
            </h3>
            <p className="text-xs text-indigo-200 max-w-xl">
              Direct, high-speed landing hubs matching our top pins with verified tool links and updated pricing.
            </p>
          </div>

          <button
            onClick={() => navigate('/landing/free-ai-tools')}
            className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-slate-50 font-bold text-xs rounded-lg transition-all shrink-0 cursor-pointer relative z-10"
          >
            Explore Pinterest Hubs
          </button>

          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-700 rounded-full -mr-20 -mt-20 opacity-40 pointer-events-none" />
        </div>
      </section>
    </div>
  );
};
