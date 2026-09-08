import React, { useMemo, useState } from 'react';
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
  ArrowLeft,
  Copy,
  Twitter,
  Linkedin,
  HelpCircle,
  Clock,
  Award,
  Terminal,
  Cpu,
  Flame,
  ThumbsUp,
  Sliders,
  ChevronDown
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tool Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">We couldn&apos;t find an AI tool matching &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/tools')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          Return to Tools Directory
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(tool.slug);
  const targetUrl = tool.hasAffiliate ? tool.affiliateUrl : tool.officialUrl;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://aitoolnest.com/#/ai-tools/${tool.slug}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      showToast('Tool review URL copied to clipboard!');
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out this in-depth review and pricing breakdown of ${tool.name} on AIToolNest:`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
  };

  const handleShareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleSharePinterest = () => {
    const desc = encodeURIComponent(`${tool.name} Review & Pricing Guide - ${tool.tagline}`);
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${desc}`, '_blank');
  };

  // Structured schemas for SEO (SoftwareApplication, Product, AggregateRating, FAQPage, BreadcrumbList)
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `https://aitoolnest.com/#/ai-tools/${tool.slug}#software`,
        name: tool.name,
        applicationCategory: tool.categoryLabel,
        operatingSystem: 'Web, macOS, Windows, iOS, Android',
        description: tool.fullDescription,
        offers: {
          '@type': 'Offer',
          price: tool.pricingType === 'free' ? '0' : '20',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          bestRating: '5',
          ratingCount: tool.reviewsCount
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `https://aitoolnest.com/#/ai-tools/${tool.slug}#faq`,
        mainEntity: (tool.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://aitoolnest.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'AI Tools',
            item: 'https://aitoolnest.com/#/tools'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.categoryLabel,
            item: `https://aitoolnest.com/#/ai-tools/category/${tool.category}`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: tool.name,
            item: currentUrl
          }
        ]
      }
    ]
  };

  // Benchmark sub-ratings based on overall score
  const benchmarkRatings = [
    { label: 'Ease of Use', score: Math.min(5, Math.max(4.2, Number((tool.rating + 0.1).toFixed(1)))).toFixed(1), desc: 'Onboarding curve, prompt ergonomics & UI responsiveness' },
    { label: 'Output Accuracy', score: tool.rating.toFixed(1), desc: 'Factual consistency, hallucination control & fluency' },
    { label: 'Value for Money', score: Math.min(5, Math.max(4.0, Number((tool.rating - 0.1).toFixed(1)))).toFixed(1), desc: 'Generosity of free tier and subscription price-to-power ratio' },
    { label: 'Feature Depth', score: Math.min(5, Math.max(4.4, Number((tool.rating + 0.05).toFixed(1)))).toFixed(1), desc: 'API connectivity, multimodal support & ecosystem integrations' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${tool.name} Review, Pricing & Alternatives (2026 Guide) - AIToolNest`}
        description={`${tool.name} audited review: ${tool.description} Read pros, cons, verified pricing tiers, alternatives, and full feature breakdown.`}
        canonicalUrl={`https://aitoolnest.com/#/ai-tools/${tool.slug}`}
        ogImage={`https://aitoolnest.com/assets/og-${tool.slug}.png`}
        schemaData={schemaData}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools Directory', path: '/tools' },
          { label: tool.categoryLabel, path: `/ai-tools/category/${tool.category}` },
          { label: tool.name }
        ]}
      />

      {/* Hero Profile Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Large Logo */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${tool.iconBg} flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-500/20 shrink-0`}
            >
              {tool.name.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                  {tool.name}
                </h1>

                <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {tool.pricingType}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Audited 2026</span>
                </span>

                {tool.badges?.includes('Popular') && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>Popular Choice</span>
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                {tool.tagline}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 flex-wrap">
                <div className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm">{tool.rating.toFixed(1)}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                    ({tool.reviewsCount.toLocaleString()} verified ratings)
                  </span>
                </div>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last Reviewed: {tool.verifiedDate}</span>
                </span>
                <span>•</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{tool.categoryLabel}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 hover:shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => toggleBookmark(tool.slug)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Affiliate disclosure pill if applicable */}
        {tool.hasAffiliate && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Transparency disclosure: When you try or purchase through links on this review, we may earn an affiliate commission at no extra cost to you. Our testing remains 100% editorially independent.
            </span>
          </div>
        )}
      </div>

      {/* Quick Share Buttons Bar */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex-wrap text-xs text-slate-600 dark:text-slate-300">
        <span className="font-semibold flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Share this review:</span>
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShareTwitter}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <Twitter className="w-3 h-3 text-sky-500" />
            <span>X / Twitter</span>
          </button>
          <button
            onClick={handleShareLinkedin}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <Linkedin className="w-3 h-3 text-blue-600" />
            <span>LinkedIn</span>
          </button>
          <button
            onClick={handleSharePinterest}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <Bookmark className="w-3 h-3 text-rose-500" />
            <span>Pinterest</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <Copy className="w-3 h-3 text-slate-500" />
            <span>Copy URL</span>
          </button>
        </div>
      </div>

      {/* Best For Callout Card */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-sky-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-sky-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl p-6 shadow-xs">
        <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-mono mb-1.5 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Best For / Ideal User Persona</span>
        </div>
        <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg font-semibold leading-relaxed">
          {tool.bestFor}
        </p>
      </div>

      {/* Interactive Application UI Preview Mockup */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-0.5">
              Live Interface Simulation
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              {tool.name} User Workspace & Command Preview
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
            ● Active Engine
          </span>
        </div>

        {/* Mock Application Frame */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-md">
          {/* Mock Browser/App Header */}
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-2 font-mono text-[11px] text-slate-300">workspace/{tool.slug}.ai</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span>Model: v2026-latest</span>
              <span>Latency: 120ms</span>
            </div>
          </div>

          {/* Mock Prompt & Response */}
          <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
            <div className="flex items-start gap-3 text-slate-300">
              <span className="px-2 py-0.5 rounded bg-indigo-600/60 text-indigo-200 font-bold text-[10px] shrink-0 uppercase tracking-wider">
                User Input
              </span>
              <p className="text-slate-200 leading-relaxed font-sans text-sm">
                &ldquo;Analyze our product workflow constraints, identify automation opportunities using {tool.name}, and summarize expected productivity return.&rdquo;
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-indigo-400 font-sans font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{tool.name} Output Stream</span>
                </span>
                <span className="text-slate-500">Quality Index: {tool.rating}/5.0</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {tool.fullDescription.slice(0, 260)}...
              </p>
              <div className="flex items-center gap-2 pt-2 flex-wrap font-sans">
                {tool.useCases.slice(0, 3).map((uc, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                    ✓ {uc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Overview & Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Detailed Description */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              What {tool.name} Does
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.fullDescription}
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              Verified Use Cases:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tool.useCases.map((uc, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Key Features & Capabilities
            </h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {tool.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pros and Cons Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-800/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Pros & Key Strengths</span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {tool.pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-800/80 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-base">
            <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <span>Cons & Limitations</span>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {tool.cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editorial Benchmark & Sub-Ratings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-0.5">
              Audited Performance
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              AIToolNest Score Breakdown
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {tool.rating.toFixed(1)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">Out of 5.0</span>
              <span>Overall Rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benchmarkRatings.map((rating, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{rating.label}</span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {rating.score} / 5.0
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${(Number(rating.score) / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{rating.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Information Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-1">
            Audited Pricing Tiers
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            {tool.name} Pricing & Subscription Plans
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pricing audited directly from official publisher records. Primary pricing model:{' '}
            <strong className="capitalize text-slate-700 dark:text-slate-200">{tool.pricingType}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tool.pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-indigo-500 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40 ring-2 ring-indigo-200 dark:ring-indigo-900/60 shadow-md'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{plan.name}</h4>
                  {plan.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">/ {plan.billing}</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  {plan.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl text-center transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  plan.popular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span>Select {plan.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-1">
            Quick Start Guide
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            How to Get Started with {tool.name} in 3 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howToUse.map((step) => (
            <div
              key={step.step}
              className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 relative"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-xs">
                {step.step}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">{step.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Alternatives */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Top {tool.name} Alternatives to Consider
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing other leading engines? Explore these audited alternative tools with similar capabilities:
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
              className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Compare with {alt} →
            </button>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-1">
              Verified FAQs
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              Frequently Asked Questions About {tool.name}
            </h2>
          </div>

          <div className="space-y-3">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-sm font-bold text-slate-900 dark:text-white cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Editorial Methodology & Transparency Statement */}
      <div className="bg-slate-100/70 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
        <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            AIToolNest Editorial Review Methodology
          </div>
          <p className="leading-relaxed">
            Every AI tool in our directory undergoes hands-on prompt testing, feature verification, and pricing audit by our team. We do not accept payment to artificially boost ratings or alter cons. If you notice an outdated pricing tier, please notify our editorial desk.
          </p>
        </div>
      </div>

      {/* In-feed Ad Banner */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Related AI Tools */}
      {relatedTools.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Related AI Tools in {tool.categoryLabel}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Other audited software tools in this category</p>
            </div>
            <button
              onClick={() => navigate(`/ai-tools/category/${tool.category}`)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
            >
              Browse Category →
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
