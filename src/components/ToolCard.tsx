import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Star,
  Bookmark,
  Share2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  Clock,
  ArrowRight,
  Award,
  CheckCircle2,
  Check,
  Globe
} from 'lucide-react';
import { AITool } from '../types';
import { useApp } from '../context/AppContext';

interface ToolCardProps {
  tool: AITool;
  featured?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const { navigate, isBookmarked, toggleBookmark, showToast } = useApp();
  const bookmarked = isBookmarked(tool.slug);
  const [imageError, setImageError] = useState(false);
  const [copied, setCopied] = useState(false);

  // Extract domain for high-resolution icon resolution
  const domain = useMemo(() => {
    try {
      const parsed = new URL(tool.officialUrl);
      return parsed.hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }, [tool.officialUrl]);

  // Preferred logo source: explicit tool logoUrl, or Google's 128px high-res favicon service
  const candidateLogoUrl = useMemo(() => {
    if (tool.logoUrl) return tool.logoUrl;
    if (domain) {
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    }
    return null;
  }, [tool.logoUrl, domain]);

  // Category specific aesthetic theme gradients for the top banner
  const categoryTheme = useMemo(() => {
    switch (tool.category) {
      case 'ai-writing':
      case 'ai-writing-tools':
        return {
          bannerGradient: 'from-blue-500/15 via-indigo-500/10 to-transparent',
          meshColor: 'bg-indigo-500/15',
          accentBorder: 'group-hover:border-indigo-400/70 dark:group-hover:border-indigo-500/60',
          badgeText: 'text-indigo-700 dark:text-indigo-300'
        };
      case 'ai-image-generation':
      case 'ai-image-tools':
      case 'ai-design-tools':
        return {
          bannerGradient: 'from-pink-500/15 via-rose-500/10 to-transparent',
          meshColor: 'bg-rose-500/15',
          accentBorder: 'group-hover:border-rose-400/70 dark:group-hover:border-rose-500/60',
          badgeText: 'text-rose-700 dark:text-rose-300'
        };
      case 'ai-video':
      case 'ai-video-tools':
        return {
          bannerGradient: 'from-purple-500/15 via-violet-500/10 to-transparent',
          meshColor: 'bg-purple-500/15',
          accentBorder: 'group-hover:border-purple-400/70 dark:group-hover:border-purple-500/60',
          badgeText: 'text-purple-700 dark:text-purple-300'
        };
      case 'ai-audio':
      case 'ai-audio-tools':
        return {
          bannerGradient: 'from-cyan-500/15 via-teal-500/10 to-transparent',
          meshColor: 'bg-cyan-500/15',
          accentBorder: 'group-hover:border-cyan-400/70 dark:group-hover:border-cyan-500/60',
          badgeText: 'text-cyan-700 dark:text-cyan-300'
        };
      case 'ai-coding':
      case 'ai-coding-tools':
        return {
          bannerGradient: 'from-emerald-500/15 via-teal-500/10 to-transparent',
          meshColor: 'bg-emerald-500/15',
          accentBorder: 'group-hover:border-emerald-400/70 dark:group-hover:border-emerald-500/60',
          badgeText: 'text-emerald-700 dark:text-emerald-300'
        };
      case 'ai-productivity':
      case 'ai-productivity-tools':
        return {
          bannerGradient: 'from-amber-500/15 via-orange-500/10 to-transparent',
          meshColor: 'bg-amber-500/15',
          accentBorder: 'group-hover:border-amber-400/70 dark:group-hover:border-amber-500/60',
          badgeText: 'text-amber-700 dark:text-amber-300'
        };
      default:
        return {
          bannerGradient: 'from-indigo-500/15 via-purple-500/10 to-transparent',
          meshColor: 'bg-indigo-500/15',
          accentBorder: 'group-hover:border-indigo-400/70 dark:group-hover:border-indigo-500/60',
          badgeText: 'text-indigo-700 dark:text-indigo-300'
        };
    }
  }, [tool.category]);

  const getPricingBadge = (type: string) => {
    switch (type) {
      case 'free':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-[10px] font-bold rounded-md uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>100% Free</span>
          </span>
        );
      case 'freemium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200/80 dark:border-sky-800 text-[10px] font-bold rounded-md uppercase tracking-wider shadow-2xs">
            <Zap className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0" />
            <span>Freemium</span>
          </span>
        );
      case 'free-trial':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800 text-[10px] font-bold rounded-md uppercase tracking-wider shadow-2xs">
            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Free Trial</span>
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-md uppercase tracking-wider shadow-2xs">
            <span>Paid</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#/ai-tools/${tool.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showToast(`Link to ${tool.name} copied to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isStaffPick = tool.badges?.includes('Staff Pick') || featured;
  const isTrending = tool.badges?.includes('Trending') || tool.badges?.includes('Viral');
  const firstLetter = tool.name.charAt(0).toUpperCase();

  return (
    <article
      className={`group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-300 hover:-translate-y-1.5 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 ${
        isStaffPick
          ? 'border-indigo-300 dark:border-indigo-600/70 ring-1 ring-indigo-200/60 dark:ring-indigo-800/40'
          : `border-slate-200/80 dark:border-slate-800/80 ${categoryTheme.accentBorder}`
      }`}
    >
      {/* Top Staff Pick Accent Glow */}
      {isStaffPick && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-20" />
      )}

      {/* 1. TOP TOOL LOGO / IMAGE AREA */}
      <div className="relative h-36 sm:h-38 w-full bg-slate-50 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800/80 overflow-hidden flex items-end p-4">
        {/* Dynamic Category Mesh Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${categoryTheme.bannerGradient} pointer-events-none`}
        />
        <div
          className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${categoryTheme.meshColor} blur-2xl pointer-events-none`}
        />
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]"
        />

        {/* Floating Top Header Badges & Actions */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 z-10">
          {/* Category Pill with glassmorphism */}
          <button
            type="button"
            onClick={() => navigate(`/ai-tools/category/${tool.category}`)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <span>{tool.categoryLabel}</span>
          </button>

          {/* Action Utilities: Bookmark & Share */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => toggleBookmark(tool.slug)}
              className={`p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer shadow-2xs ${
                bookmarked
                  ? 'bg-amber-500/15 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                  : 'bg-white/90 dark:bg-slate-900/90 border-slate-200/70 dark:border-slate-700/70 text-slate-400 hover:text-amber-500 hover:scale-105'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Bookmark this tool'}
              aria-label={bookmarked ? `Remove ${tool.name} from bookmarks` : `Bookmark ${tool.name}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all cursor-pointer shadow-2xs"
              title={copied ? 'Link copied!' : 'Share tool'}
              aria-label={`Share ${tool.name}`}
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Banner Content: Elevated Tool Logo Squircle + Rating Pill */}
        <div className="relative z-10 w-full flex items-end justify-between gap-3">
          {/* Logo Squircle with Image or Fallback */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-slate-900 p-2 shadow-lg shadow-slate-900/10 border border-slate-200/80 dark:border-slate-700/80 shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
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
              /* Clean, elegant fallback placeholder */
              <div
                className={`w-full h-full rounded-xl ${tool.iconBg || 'bg-indigo-600'} flex items-center justify-center font-black text-white text-xl sm:text-2xl tracking-tighter shadow-inner`}
              >
                {firstLetter}
              </div>
            )}
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs font-bold text-slate-800 dark:text-slate-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>{tool.rating.toFixed(1)}</span>
            <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
              ({(tool.reviewsCount / 1000).toFixed(0)}k)
            </span>
          </div>
        </div>
      </div>

      {/* 2. CARD BODY: Metadata, Typography, Descriptions & Highlights */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Tool Title & Badges Bar */}
          <div>
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {/* Verified Badge */}
              <span
                title="Audited and verified by AIToolNest"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800/60 shadow-2xs"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified</span>
              </span>

              {isStaffPick && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/70 px-1.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800 shadow-2xs">
                  <Award className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Staff Pick</span>
                </span>
              )}

              {isTrending && !isStaffPick && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded-md border border-rose-200 dark:border-rose-800 shadow-2xs">
                  <TrendingUp className="w-3 h-3 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Trending</span>
                </span>
              )}
            </div>

            {/* Tool Name */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight leading-snug">
              <button
                type="button"
                onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left cursor-pointer line-clamp-1"
              >
                {tool.name}
              </button>
            </h3>

            {/* Sub-tagline if available */}
            {tool.tagline && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
                {tool.tagline}
              </p>
            )}
          </div>

          {/* Pricing Tier Row */}
          <div className="flex items-center justify-between gap-2 py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <div className="shrink-0">{getPricingBadge(tool.pricingType)}</div>
            <span
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate text-right"
              title={tool.pricingSummary}
            >
              {tool.pricingSummary ? tool.pricingSummary.split(';')[0] : 'Free tier available'}
            </span>
          </div>

          {/* Short Description: Strict 2-line clamp for consistent heights */}
          <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {tool.description}
          </p>

          {/* Best For Callout */}
          {tool.bestFor && (
            <div className="p-2 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/70 dark:border-indigo-900/40 flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                <strong className="text-slate-800 dark:text-slate-100 font-semibold mr-1">
                  Best for:
                </strong>
                {tool.bestFor}
              </p>
            </div>
          )}

          {/* Key Feature Bullets (2 max) for Scannability */}
          {tool.keyFeatures && tool.keyFeatures.length > 0 && (
            <div className="space-y-1 pt-1">
              {tool.keyFeatures.slice(0, 2).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400"
                >
                  <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. CARD FOOTER: Overview Button & Visit Tool Button */}
      <div className="p-3.5 sm:p-4 pt-3 border-t border-slate-100 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-900/60 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          {/* Overview / Internal Tool Details */}
          <button
            type="button"
            onClick={() => navigate(`/ai-tools/${tool.slug}`)}
            className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-600"
          >
            <span>Overview</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Visit Tool External Link */}
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs shadow-indigo-600/20"
          >
            <span>Visit Tool</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
