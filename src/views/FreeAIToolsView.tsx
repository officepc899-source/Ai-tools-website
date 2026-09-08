import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';

export const FreeAIToolsView: React.FC = () => {
  const { tools, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Filter tools that are 100% free or generous freemium with real free tier
  const freeTools = tools.filter((t) => {
    const isFree = t.pricingType === 'free' || t.pricingType === 'freemium' || t.badges.includes('Verified Free Plan');
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.bestFor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubCategory = selectedSubCategory === 'all' || t.category === selectedSubCategory;
    return isFree && matchesSearch && matchesSubCategory;
  });

  const faqs = [
    {
      q: 'Are these AI tools truly 100% free to use?',
      a: 'Yes. Every tool listed on this page either features a permanent 100% free plan without requiring a credit card or offers an open-source / community edition. We continuously test each tool to guarantee there are no hidden paywalls for core capabilities.'
    },
    {
      q: 'What is the difference between "100% Free" and "Freemium"?',
      a: '100% Free tools (like Google AI Studio, NotebookLM, or Wolfram Alpha basic) allow unrestricted core usage forever. Freemium tools (like ChatGPT, Canva, or Claude) provide generous free daily or monthly quotas, with optional paid upgrades for heavy enterprise usage.'
    },
    {
      q: 'Can I use free AI tools for commercial projects?',
      a: 'Most free tiers permit commercial use, but you should always review each software license. Tools like Google AI Studio, Canva Free, and Claude Free allow commercial outputs for personal business workflows.'
    },
    {
      q: 'How often is the Free AI Tools directory updated?',
      a: 'Our editorial system verifies pricing tiers weekly. If a vendor discontinues their free plan or introduces mandatory billing, the tool is immediately updated or removed.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Best Free AI Tools (2026 Directory) - No Credit Card Required"
        description="Discover 30+ verified 100% free and generous freemium AI tools for writing, image creation, video, coding, and productivity. Zero paywalls for core features."
        canonicalUrl="https://aitoolnest.com/#/free-ai-tools"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'Free AI Tools' }
        ]}
      />

      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audit Complete &bull; 100% Zero-Cost Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Best Free AI Tools in 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop overpaying for monthly subscriptions. Explore hand-tested AI tools offering robust free tiers, generous zero-cost quotas, and no mandatory credit card signups.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Verified Free Accounts
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Updated Weekly
            </span>
          </div>
        </div>

        {/* Ambient Glow Graphic */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Filter & Search Bar */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter free AI tools..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Free Tools' },
              { id: 'ai-writing-tools', label: 'Writing' },
              { id: 'ai-design-tools', label: 'Design' },
              { id: 'ai-image-tools', label: 'Images' },
              { id: 'ai-productivity-tools', label: 'Productivity' },
              { id: 'ai-tools-for-students', label: 'Research' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedSubCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSubCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Available Free Tools ({freeTools.length})
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sorted by user rating & verified free quotas
          </span>
        </div>

        {freeTools.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <Zap className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">No free tools match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your keyword filter or explore all tools in the complete directory.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedSubCategory('all'); }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured={tool.pricingType === 'free'} />
            ))}
          </div>
        )}
      </section>

      {/* Guide Section */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            How to Build a $0/Month AI Tech Stack in 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            You don't need hundreds of dollars a month in software subscriptions to run an automated digital business or produce high-end content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] tracking-wider">
              Step 1 &bull; Reasoning & Research
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Claude & NotebookLM</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Use Claude's free tier for nuanced writing and Google NotebookLM to ground your ideas in source PDFs and audio overviews at zero cost.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] tracking-wider">
              Step 2 &bull; Visuals & Social
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Microsoft Designer & Canva Free</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Leverage DALL-E 3 inside Microsoft Designer for 15 free daily boosts, and Canva Free to assemble viral templates, slides, and branding.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-[10px] tracking-wider">
              Step 3 &bull; Automation & Workflow
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Make Free & Google AI Studio</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Automate up to 1,000 monthly operations on Make.com's free plan, backed by Google AI Studio's massive token window and developer API quotas.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Frequently Asked Questions About Free AI Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Common questions regarding limits, commercial rights, and privacy.
          </p>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              {expandedFaq === idx && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed pr-8">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
