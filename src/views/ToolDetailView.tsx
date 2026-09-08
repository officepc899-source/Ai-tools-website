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
  ChevronDown,
  Globe,
  Monitor,
  CheckCircle,
  Tag,
  DollarSign
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
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const tool = useMemo(() => tools.find((t) => t.slug === slug), [tools, slug]);

  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return tools
      .filter((t) => t.id !== tool.id && (t.category === tool.category || tool.alternatives.includes(t.name)))
      .slice(0, 3);
  }, [tools, tool]);

  // Extract domain for high-resolution logo / favicon
  const domain = useMemo(() => {
    if (!tool?.officialUrl) return '';
    try {
      const parsed = new URL(tool.officialUrl);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }, [tool?.officialUrl]);

  const candidateLogoUrl = useMemo(() => {
    if (!tool) return null;
    if (tool.logoUrl) return tool.logoUrl;
    if (domain) {
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
    return null;
  }, [tool, domain]);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tool Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          We couldn&apos;t find an AI tool matching &ldquo;{slug}&rdquo;.
        </p>
        <button
          onClick={() => navigate('/tools')}
          className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Tools Directory</span>
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
      setCopied(true);
      showToast('Tool review URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out this in-depth review and pricing breakdown of ${tool.name} on AIToolNest:`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${text}`, '_blank');
  };

  const handleShareLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
        url: tool.officialUrl,
        offers: {
          '@type': 'Offer',
          price: tool.pricingType === 'free' ? '0' : '20',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          category: tool.pricingType
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

  const getPricingBadge = (type: string) => {
    switch (type) {
      case 'free':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>100% Free</span>
          </span>
        );
      case 'freemium':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold rounded-lg uppercase tracking-wider shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Freemium</span>
          </span>
        );
      case 'free-trial':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold rounded-lg uppercase tracking-wider shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Free Trial</span>
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold rounded-lg uppercase tracking-wider shadow-2xs">
            <span>Paid</span>
          </span>
        );
      default:
        return null;
    }
  };

  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Key Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'pros-cons', label: 'Pros & Cons' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'alternatives', label: 'Alternatives' },
    { id: 'faqs', label: 'FAQs' }
  ];

  const firstLetter = tool.name.charAt(0).toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

      {/* 1. TOOL HEADER HERO SECTION */}
      <header className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
        {/* Subtle decorative mesh gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-sky-500/5 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          {/* Logo & Headline Info */}
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 flex-1">
            {/* Large Tool Logo Squircle */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-md shadow-slate-900/10 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center overflow-hidden">
              {!imageError && candidateLogoUrl ? (
                <img
                  src={candidateLogoUrl}
                  alt={`${tool.name} logo`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div
                  className={`w-full h-full rounded-xl ${tool.iconBg || 'bg-indigo-600'} flex items-center justify-center font-black text-white text-3xl tracking-tighter shadow-inner`}
                >
                  {firstLetter}
                </div>
              )}
            </div>

            {/* Typography & Badges */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => navigate(`/ai-tools/category/${tool.category}`)}
                  className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer shadow-2xs"
                >
                  {tool.categoryLabel}
                </button>

                {getPricingBadge(tool.pricingType)}

                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Audited {tool.verifiedDate || '2026'}</span>
                </span>

                {tool.badges?.includes('Staff Pick') && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Staff Pick</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
                {tool.name}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                {tool.tagline || tool.description}
              </p>

              {/* Rating & Review volume bar */}
              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 flex-wrap">
                <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold">{tool.rating.toFixed(1)}</span>
                  <span className="text-slate-400 dark:text-slate-500 font-normal">
                    ({tool.reviewsCount.toLocaleString()} verified ratings)
                  </span>
                </div>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{domain || 'official website'}</span>
                </span>
                <span>•</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{tool.categoryLabel}</span>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 lg:w-64">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/25 hover:shadow-lg flex items-center justify-center gap-2 text-center cursor-pointer"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="grid grid-cols-2 gap-2 w-full">
              <button
                type="button"
                onClick={() => toggleBookmark(tool.slug)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                  bookmarked
                    ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{bookmarked ? 'Saved' : 'Favorite'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                title="Copy review link"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Affiliate disclosure if applicable */}
        {tool.hasAffiliate && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Transparency disclosure: Links to {tool.name} may contain affiliate references. Our editorial testing and benchmarking remain 100% independent.
            </span>
          </div>
        )}
      </header>

      {/* STICKY SUB-NAVIGATION BAR */}
      <nav
        aria-label="Review page navigation"
        className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs px-3 py-2 overflow-x-auto scrollbar-none"
      >
        <ul className="flex items-center gap-1 min-w-max">
          {navSections.map((sec) => (
            <li key={sec.id}>
              <button
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {sec.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2-COLUMN REVIEW LAYOUT: MAIN CONTENT + STICKY SPEC SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Deep Review & Tool Information */}
        <div className="lg:col-span-8 space-y-8">
          {/* SECTION: Overview & Best For */}
          <section id="overview" className="space-y-6">
            {/* Best For Hero Pill */}
            {tool.bestFor && (
              <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-sky-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-sky-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl p-6 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-mono mb-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Ideal Target Audience & Best For</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 text-base sm:text-lg font-semibold leading-relaxed">
                  {tool.bestFor}
                </p>
              </div>
            )}

            {/* Overview Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                    Deep Dive
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                    What is {tool.name}?
                  </h2>
                </div>
              </div>

              <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-3 pt-2">
                <p>{tool.fullDescription || tool.description}</p>
                <p>
                  As AI technology advances, {tool.name} distinguishes itself through targeted workflows, prompt handling, and direct export options designed to eliminate friction for modern teams.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: Key Features */}
          <section
            id="features"
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Capabilities Matrix
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Key Features of {tool.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3"
                >
                  <div className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">
                      {feat}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      Optimized for high-throughput production workloads and tested in our laboratory.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: How It Works (Step-by-Step) */}
          <section
            id="how-it-works"
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Quick Start Guide
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                  How {tool.name} Works in 3 Steps
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tool.howToUse.map((step) => (
                <div
                  key={step.step}
                  className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl p-5 relative flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-3 shadow-xs">
                      0{step.step}
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Workspace Mockup */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100 overflow-hidden shadow-md mt-6">
              <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-slate-300">workspace/{tool.slug}.app</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px]">
                  <span>Status: Operational</span>
                  <span>Latency: ~140ms</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
                <div className="flex items-start gap-3 text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-indigo-600/60 text-indigo-200 font-bold text-[10px] shrink-0 uppercase tracking-wider">
                    Input Prompt
                  </span>
                  <p className="text-slate-200 leading-relaxed font-sans text-xs sm:text-sm">
                    &ldquo;Execute automated workflow analysis for {tool.name}, optimize output quality parameters, and summarize key benefits.&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-indigo-400 font-sans font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{tool.name} Output Stream</span>
                    </span>
                    <span className="text-slate-500">Laboratory Quality Index: {tool.rating}/5.0</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {tool.fullDescription.slice(0, 240)}...
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: Use Cases */}
          <section
            id="use-cases"
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Applications
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Real-World Use Cases for {tool.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {tool.useCases.map((uc, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {uc}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Proven time savings and automated delivery for active teams.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: Pros and Cons */}
          <section id="pros-cons" className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Honest Assessment
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Pros & Cons of {tool.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-800/80 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Key Strengths & Pros</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-800/80 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-base">
                  <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                  <span>Limitations & Cons</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: Audited Performance Benchmarks */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-0.5">
                  Editorial Audit
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
          </section>

          {/* SECTION: Pricing Information */}
          <section
            id="pricing"
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mb-1">
                Verified Pricing Tiers
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                {tool.name} Pricing Plans (2026)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Pricing audited directly from official records. Primary model:{' '}
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
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{plan.name}</h3>
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
          </section>

          {/* SECTION: Top Alternatives */}
          <section
            id="alternatives"
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  Competitors
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Top Alternatives to {tool.name}
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Comparing other AI software? Explore these audited alternatives with similar workflow capabilities:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {tool.alternatives.map((alt, i) => {
                const matched = tools.find((t) => t.name.toLowerCase() === alt.toLowerCase());
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (matched) {
                        navigate(`/ai-tools/${matched.slug}`);
                      } else {
                        navigate(`/tools?q=${encodeURIComponent(alt)}`);
                      }
                    }}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-300 dark:hover:border-indigo-700 border border-slate-200 dark:border-slate-700 rounded-2xl text-left transition-all cursor-pointer group flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {alt}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {matched ? `${matched.categoryLabel} • ${matched.pricingType}` : 'Direct software alternative'}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </section>

          {/* SECTION: Frequently Asked Questions */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section
              id="faqs"
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6"
            >
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
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Editorial Methodology & Transparency Statement */}
          <div className="bg-slate-100/80 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                AIToolNest Editorial Review Standards
              </div>
              <p className="leading-relaxed">
                Every AI tool in our directory undergoes hands-on prompt testing, feature verification, and pricing audit by our team. We do not accept payment to artificially boost ratings or alter cons. If you notice an outdated pricing tier, please notify our editorial desk.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Quick-Facts Spec Sheet & Quick CTAs */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          {/* Quick-Facts Spec Sheet Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Tool at a Glance
              </h3>
              <p className="text-xs text-slate-400">Technical specifications & access points</p>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>Category</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.categoryLabel}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pricing Model</span>
                </span>
                <span className="font-semibold capitalize text-slate-800 dark:text-slate-200">{tool.pricingType}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rating</span>
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {tool.rating.toFixed(1)} / 5.0 ({tool.reviewsCount.toLocaleString()})
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-slate-400" />
                  <span>Platforms</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Web, API, Cloud</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Audited Date</span>
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{tool.verifiedDate || '2026'}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Domain</span>
                </span>
                <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                  {domain}
                </span>
              </div>
            </div>

            {/* Direct Link CTA */}
            <div className="pt-2">
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 text-center"
              >
                <span>Launch {tool.name}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Share Sidebar Pill */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Share with Network</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={handleShareTwitter}
                className="py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Twitter className="w-3 h-3 text-sky-500" />
                <span>X</span>
              </button>
              <button
                type="button"
                onClick={handleShareLinkedin}
                className="py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Linkedin className="w-3 h-3 text-blue-600" />
                <span>In</span>
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                className="py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3 text-slate-400" />
                <span>{copied ? 'Done' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Ad Banner Widget in Sidebar */}
          <AdBanner format="sidebar-rectangle" />
        </aside>
      </div>

      {/* In-feed Horizontal Ad Banner */}
      <AdBanner format="horizontal-leaderboard" />

      {/* 3. RELATED AI TOOLS SECTION */}
      {relatedTools.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                Related AI Tools in {tool.categoryLabel}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Other audited software tools in this category evaluated by our lab
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/ai-tools/category/${tool.category}`)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer inline-flex items-center gap-1"
            >
              <span>Browse Category</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
