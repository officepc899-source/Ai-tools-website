import React, { useState } from 'react';
import {
  ExternalLink,
  Star,
  Bookmark,
  Sparkles,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AITool } from '../types';
import { useApp } from '../context/AppContext';

interface ToolCardProps {
  tool: AITool;
  featured?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, featured = false }) => {
  const { navigate, isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(tool.slug);
  const [showProsCons, setShowProsCons] = useState<boolean>(false);

  const getPricingBadge = (type: string) => {
    switch (type) {
      case 'free':
        return (
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded uppercase tracking-wider">
            100% Free
          </span>
        );
      case 'freemium':
        return (
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold rounded uppercase tracking-wider">
            Freemium
          </span>
        );
      case 'free-trial':
        return (
          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded uppercase tracking-wider">
            Free Trial
          </span>
        );
      case 'paid':
        return (
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold rounded uppercase tracking-wider">
            Paid
          </span>
        );
      default:
        return null;
    }
  };

  const firstLetter = tool.name.charAt(0);

  return (
    <div
      className={`group bg-white p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between relative hover:shadow-md ${
        featured ? 'border-indigo-300 ring-1 ring-indigo-100' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div>
        {/* Header: Icon, Name, Category, Badges & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center font-black text-white text-base shrink-0 shadow-xs group-hover:scale-105 transition-transform`}
            >
              {firstLetter}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                  className="font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors text-left font-['Space_Grotesk']"
                >
                  {tool.name}
                </button>
                {tool.badges?.includes('Verified Free Plan') && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    Free Plan
                  </span>
                )}
                {tool.badges?.includes('Popular') && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Popular
                  </span>
                )}
              </div>
              <span className="text-[11px] text-indigo-600 font-semibold uppercase tracking-wider block mt-0.5">
                {tool.categoryLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {getPricingBadge(tool.pricingType)}
            <button
              onClick={() => toggleBookmark(tool.slug)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                bookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={bookmarked ? 'Saved to bookmarks' : 'Save tool'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Short Original Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {tool.description}
        </p>

        {/* Best For Highlight */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 mb-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-indigo-500" />
            <span>Best For</span>
          </div>
          <p className="text-xs text-slate-700 font-medium line-clamp-2">
            {tool.bestFor}
          </p>
        </div>

        {/* Key Features (List) */}
        <div className="space-y-1.5 mb-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Key Features
          </div>
          <ul className="space-y-1 text-xs text-slate-600">
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
            className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{showProsCons ? 'Hide' : 'Show'} Pros & Cons</span>
            {showProsCons ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showProsCons && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-2 text-xs">
              <div>
                <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                  Pros
                </div>
                <ul className="space-y-1 text-slate-600">
                  {tool.pros.slice(0, 2).map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1">
                  Cons
                </div>
                <ul className="space-y-1 text-slate-600">
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
      <div className="mt-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1 font-semibold text-slate-700">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{tool.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal text-[11px]">
              ({tool.reviewsCount.toLocaleString()})
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium truncate max-w-[150px]" title={tool.pricingSummary}>
            {tool.pricingSummary.split(';')[0]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/ai-tools/${tool.slug}`)}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
          >
            Review & Guide
          </button>
          <a
            href={tool.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl text-center transition-colors shadow-xs inline-flex items-center justify-center gap-1.5"
          >
            <span>Official Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
