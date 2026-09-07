import React, { useMemo } from 'react';
import {
  ExternalLink,
  Star,
  Check,
  X,
  Bookmark,
  Sparkles,
  Share2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Info,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';
import { AdBanner } from '../components/AdBanner';

interface ToolDetailViewProps {
  slug: string;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({ slug }) => {
  const { tools, navigate, isBookmarked, toggleBookmark, showToast } = useApp();

  const tool = useMemo(() => tools.find((t) => t.slug === slug), [tools, slug]);

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return tools
      .filter((t) => t.id !== tool.id && (t.category === tool.category || tool.alternatives.includes(t.name)))
      .slice(0, 3);
  }, [tools, tool]);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Tool Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find an AI tool matching &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/tools')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
        >
          Return to Tools Directory
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(tool.slug);
  const targetUrl = tool.hasAffiliate ? tool.affiliateUrl : tool.officialUrl;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${tool.name} Review & Pricing (2026) - Pros, Cons & Alternatives`}
        description={tool.fullDescription.slice(0, 160)}
        canonicalUrl={`https://aitoolnest.com/#/tool/${tool.slug}`}
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: tool.name,
          applicationCategory: tool.categoryLabel,
          operatingSystem: 'Web, iOS, Android',
          description: tool.description,
          offers: {
            '@type': 'Offer',
            price: tool.pricingType === 'free' ? '0' : '20',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: tool.rating,
            reviewCount: tool.reviewsCount
          }
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools Directory', path: '/tools' },
          { label: tool.categoryLabel, path: `/tools?category=${tool.category}` },
          { label: tool.name }
        ]}
      />

      {/* Header Profile Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${tool.iconBg} flex items-center justify-center text-white shadow-md shrink-0`}>
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
                  {tool.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {tool.pricingType}
                </span>
                {tool.badges.map((b, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-slate-600 text-sm sm:text-base font-medium leading-normal">
                {tool.tagline}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1 font-semibold text-slate-700">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{tool.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({tool.reviewsCount.toLocaleString()} user ratings)</span>
                </div>
                <span>•</span>
                <span>Verified: {tool.verifiedDate}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center gap-2 shrink-0">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-center"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => toggleBookmark(tool.slug)}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Save Tool'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                title="Share Tool"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Affiliate disclosure pill if applicable */}
        {tool.hasAffiliate && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Affiliate link notice: We may earn a commission if you subscribe to a paid tier. This keeps our testing independent and free to read.
            </span>
          </div>
        )}
      </div>

      {/* Best For Callout Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200/80 rounded-2xl p-6">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 font-mono mb-1 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>Best For</span>
        </div>
        <p className="text-slate-800 text-base font-semibold leading-relaxed">
          {tool.bestFor}
        </p>
      </div>

      {/* Overview & Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Detailed Description */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
            Comprehensive Overview
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {tool.fullDescription}
          </p>
          <div className="pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary Use Cases:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.useCases.map((uc, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
            Key Features & Capabilities
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {tool.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pros and Cons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Pros & Strengths</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {tool.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-base">
            <X className="w-5 h-5 text-rose-600" />
            <span>Cons & Limitations</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {tool.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing Information Table (Easy to update and transparent) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono mb-1">
            Audited Pricing Tiers
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            {tool.name} Pricing & Subscription Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pricing verified directly with official documentation. Tier: <strong className="capitalize text-slate-700">{tool.pricingType}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tool.pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border flex flex-col justify-between ${
                plan.popular
                  ? 'border-indigo-500 bg-indigo-50/30 ring-2 ring-indigo-200 shadow-md'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 text-base">{plan.name}</h4>
                  {plan.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-xs text-slate-500 ml-1.5">/ {plan.billing}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`w-full py-2 px-3 text-xs font-semibold rounded-lg text-center transition-colors ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 border border-slate-300 text-slate-700'
                }`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono mb-1">
            Quick Start Tutorial
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            How to Get Started with {tool.name} in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howToUse.map((step) => (
            <div key={step.step} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-xs">
                {step.step}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Alternatives */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
          Top {tool.name} Alternatives to Consider
        </h3>
        <p className="text-xs text-slate-500">
          Depending on your specific budget and workflow, you can also explore these comparable tools:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {tool.alternatives.map((alt, i) => (
            <button
              key={i}
              onClick={() => {
                const matched = tools.find((t) => t.name.toLowerCase() === alt.toLowerCase());
                if (matched) {
                  navigate(`/ai-tools/${matched.slug}`);
                } else {
                  navigate(`/tools?q=${encodeURIComponent(alt)}`);
                }
              }}
              className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              {alt} →
            </button>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono mb-1">
              Verified FAQs
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
              Frequently Asked Questions About {tool.name}
            </h2>
          </div>

          <div className="space-y-4">
            {tool.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                    Q
                  </span>
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* In-feed Ad Banner */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Related AI Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                Related AI Tools in {tool.categoryLabel}
              </h3>
              <p className="text-xs text-slate-500">Other software tools in the same product category</p>
            </div>
            <button
              onClick={() => navigate(`/tools?category=${tool.category}`)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              View More →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
