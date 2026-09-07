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
  Star
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
    if (!landing) return [];
    return tools.filter((t) => landing.toolSlugs.includes(t.slug));
  }, [landing, tools]);

  const matchedIdeas = useMemo(() => {
    if (!landing || !landing.businessIdeaSlugs) return [];
    return businessIdeas.filter((b) => landing.businessIdeaSlugs?.includes(b.slug));
  }, [landing, businessIdeas]);

  const matchedProducts = useMemo(() => {
    if (!landing || !landing.productSlugs) return [];
    return digitalProducts.filter((p) => landing.productSlugs?.includes(p.slug));
  }, [landing, digitalProducts]);

  if (!landing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Landing Hub Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find the Pinterest landing page &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/tools')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
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
        title={`${landing.heroHeadline} (Updated List)`}
        description={landing.heroSubtitle}
        canonicalUrl={`https://aitoolnest.com/#/landing/${landing.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Pinterest Topics', path: '/' },
          { label: landing.topicName }
        ]}
      />

      {/* High-Converting Pinterest Welcoming Hero */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-indigo-50/50 border border-rose-200/80 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
              <Pin className="w-3.5 h-3.5 fill-white" />
              <span>Direct Pinterest Destination</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white border border-rose-200 text-rose-700">
              {landing.pinBadge}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified: {landing.lastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Space_Grotesk'] leading-[1.15]">
            {landing.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {landing.heroSubtitle}
          </p>

          {/* Value Highlights Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {landing.keyTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-medium shadow-xs"
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
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Jump Straight to Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleSharePin}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors inline-flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* The Curated Tools Section */}
      {matchedTools.length > 0 && (
        <section id="curated-list" className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
                Curated Recommendations
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                Featured Tools in This Pin Topic
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
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

      {/* Matched Business Ideas if applicable */}
      {matchedIdeas.length > 0 && (
        <section className="space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
              Recommended Online Business Blueprints
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tested models with startup costs and time to launch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedIdeas.map((idea) => (
              <BusinessIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* Matched Digital Products if applicable */}
      {matchedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
              Recommended Digital Product Kits & Vaults
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant download templates ready to use today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedProducts.map((prod) => (
              <DigitalProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Related Pinterest Hubs Switcher */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
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
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-700'
              }`}
            >
              📌 {p.topicName}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
