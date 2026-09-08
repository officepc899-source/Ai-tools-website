import React, { useMemo } from 'react';
import {
  Pin,
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle2,
  Bookmark,
  Share2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Star,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';
import { BusinessIdeaCard } from '../components/BusinessIdeaCard';
import { DigitalProductCard } from '../components/DigitalProductCard';
import { AdBanner } from '../components/AdBanner';

interface PinterestLandingViewProps {
  slug: string;
}

export const PinterestLandingView: React.FC<PinterestLandingViewProps> = ({ slug }) => {
  const { pinterestLandings, tools, businessIdeas, digitalProducts, navigate, showToast } = useApp();

  const landing = useMemo(() => pinterestLandings.find((p) => p.slug === slug), [pinterestLandings, slug]);

  const matchedTools = useMemo(() => {
    if (!landing || !landing.curatedToolSlugs) return [];
    return tools.filter((t) => landing.curatedToolSlugs.includes(t.slug));
  }, [landing, tools]);

  if (!landing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Landing Hub Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find the Pinterest landing page &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/tools')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
        >
          View All AI Tools
        </button>
      </div>
    );
  }

  const handleSharePin = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Pinterest Hub link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={landing.metaTitle || `${landing.pinHeading} | AIToolNest`}
        description={landing.metaDescription || landing.subtitle}
        canonicalUrl={`https://aitoolnest.com/#/landing/${landing.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Pinterest Topics', path: '/' },
          { label: landing.title }
        ]}
      />

      {/* High-Converting Pinterest Welcoming Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-indigo-50/50 dark:from-rose-950/20 dark:via-slate-900 dark:to-indigo-950/20 border border-rose-200/80 dark:border-rose-900/60 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
              <Pin className="w-3.5 h-3.5 fill-white" />
              <span>Direct Pinterest Destination</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300">
              {landing.heroBadge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Verified: 2026 Edition
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] leading-[1.15]">
            {landing.pinHeading}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            {landing.subtitle}
          </p>

          {/* Value Highlights Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {landing.keyHighlights.map((takeaway, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{takeaway}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('curated-list');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Jump Straight to Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleSharePin}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Checklist / Key Takeaways Box */}
      {landing.checklistItems && landing.checklistItems.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>Pin Summary Cheat Sheet</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {landing.checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The Curated Tools Section */}
      {matchedTools.length > 0 && (
        <section id="curated-list" className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
                Curated Recommendations
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                Featured Tools in This Pin Topic
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {matchedTools.length} Tools Handpicked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured={tool.badges.includes('Staff Pick')} />
            ))}
          </div>
        </section>
      )}

      {/* Display Ad */}
      <AdBanner format="horizontal-leaderboard" />

      {/* FAQs on this pin */}
      {landing.faqs && landing.faqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Frequently Asked Questions on This Topic
          </h3>
          <div className="space-y-3">
            {landing.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{faq.q}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Pinterest Hubs Switcher */}
      <section className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Explore Other Popular Pinterest Topics:
        </h3>
        <div className="flex flex-wrap gap-2">
          {pinterestLandings.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate(`/landing/${p.slug}`)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                p.slug === landing.slug
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              📌 {p.title}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
