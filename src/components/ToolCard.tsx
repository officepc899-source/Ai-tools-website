import React, { useState } from 'react';
import {
  ExternalLink,
  Star,
  Bookmark,
  Share2,
  Sparkles,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  TrendingUp
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
  const [showProsCons, setShowProsCons] = useState<boolean>(false);

  const getPricingBadge = (type: string) => {
    switch (type) {
      case 'free':
        return (
          <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-2xs">
            100% Free
          </span>
        );
      case 'freemium':
        return (
          <span className="px-2.5 py-0.5 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-2xs">
            Freemium
          </span>
        );
      case 'free-trial':
        return (
          <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-2xs">
            Free Trial
          </span>
        );
      case 'paid':
        return (
          <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-2xs">
            Paid
          </span>
        );
      default:
        return null;
    }
  };

  const firstLetter = tool.name.charAt(0);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/#/ai-tools/${tool.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast(`Link to ${tool.name} copied to clipboard!`);
    }
  };

  return (
    <div
      className={`group relative rounded-2xl transition-all duration-300 flex flex-col justify-between p-5 backdrop-blur-md bg-white/95 dark:bg-slate-900/90 border hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 ${
        featured
          ? 'border-indigo-400 dark:border-indigo-500 shadow-md ring-1 ring-indigo-200 dark:ring-indigo-900/50'
          : 'border-slate-200/80 dark:border-slate-800/90 hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs'
      }`}
    >
      {/* Gradient border accent hover effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 -z-10" />

      <div>
        {/* Top bar: Large Logo, Name, Category, Badges, Bookmark & Share */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-start gap-3.5">
            {/* Large Logo with glass glow */}
            <div
              className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center font-black text-white text-lg shrink-0 shadow-sm shadow-indigo-500/20 group-hover:scale-105 group-hover:shadow-md transition-all duration-300`}
            >
              {firstLetter}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                  className="font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left font-['Space_Grotesk'] leading-tight"
                >
                  {tool.name}
                </button>

                {/* Verified Badge */}
                <span
                  title="Audited and verified by AIToolNest editorial team"
                  className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-2xs"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Verified</span>
                </span>

                {/* Popular Badge */}
                {(tool.badges?.includes('Popular') || featured) && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shadow-2xs">
                    <TrendingUp className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                    <span>Popular</span>
                  </span>
                )}
              </div>

              {/* Category Badge */}
              <button
                onClick={() => navigate(`/ai-tools/category/${tool.category}`)}
                className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider block mt-1 hover:underline text-left cursor-pointer"
              >
                {tool.categoryLabel}
              </button>
            </div>
          </div>

          {/* Pricing badge & top actions (Bookmark + Share) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {getPricingBadge(tool.pricingType)}

            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Share tool"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => toggleBookmark(tool.slug)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400 shadow-2xs'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save tool'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Short SEO-friendly Description */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Best For Highlight */}
        <div className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-xl p-2.5 mb-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
            <span>Best For</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
            {tool.bestFor}
          </p>
        </div>

        {/* Key Features (List) */}
        <div className="space-y-1.5 mb-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Key Features
          </div>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
            {tool.keyFeatures.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expandable Pros & Cons Drawer */}
        <div className="pt-1 mb-2">
          <button
            type="button"
            onClick={() => setShowProsCons(!showProsCons)}
            className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showProsCons ? 'Hide' : 'Show'} Pros & Cons</span>
            {showProsCons ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showProsCons && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
              <div>
                <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  Pros
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  {tool.pros.slice(0, 2).map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-1">
                  Cons
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                  {tool.cons.slice(0, 2).map((con, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Rating, Pricing Note & CTA Actions */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{tool.rating.toFixed(1)}</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal text-[11px]">
              ({tool.reviewsCount.toLocaleString()})
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[150px]" title={tool.pricingSummary}>
            {tool.pricingSummary.split(';')[0]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/ai-tools/${tool.slug}`)}
            className="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
          >
            View Details
          </button>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-xs inline-flex items-center justify-center gap-1.5"
          >
            <span>Visit Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
