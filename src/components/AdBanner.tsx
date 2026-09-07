import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AdBannerProps {
  format?: 'horizontal-leaderboard' | 'in-feed-card' | 'sidebar-rectangle';
  title?: string;
  sponsorName?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'horizontal-leaderboard',
  title = 'Accelerate Your AI Engineering with High-Memory GPU Pods',
  sponsorName = 'CloudScale AI Infrastructure'
}) => {
  const { adsEnabled } = useApp();

  if (!adsEnabled) return null;

  if (format === 'horizontal-leaderboard') {
    return (
      <div className="w-full my-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-4 sm:p-5 border border-indigo-900/60 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="absolute top-2 right-3 text-[10px] uppercase tracking-wider text-slate-400 font-mono">
            Sponsored Ad • {sponsorName}
          </div>
          <div className="space-y-1 text-center md:text-left mt-2 md:mt-0">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Recommended Cloud Partner</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
              {title}
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Spin up dedicated H100 and A100 GPU clusters on-demand. Get $100 in free development credits today.
            </p>
          </div>
          <a
            href="https://cloud.google.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>Claim $100 Credit</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  if (format === 'sidebar-rectangle') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs relative my-6">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono mb-2">
          Advertisement
        </div>
        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5" />
        </div>
        <h5 className="text-sm font-bold text-slate-900 mb-1">
          Turn Prompts into Native Apps with Cursor
        </h5>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          The developer environment built for 10x speed. Download and start coding free.
        </p>
        <a
          href="https://cursor.com"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <span>Try Free Today</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  // in-feed-card
  return (
    <div className="bg-indigo-50/50 border border-indigo-200/80 rounded-2xl p-6 shadow-xs relative flex flex-col justify-between">
      <div className="text-[10px] uppercase font-mono tracking-wider text-indigo-600 font-semibold mb-2">
        Featured Sponsor
      </div>
      <div>
        <h4 className="text-base font-bold text-slate-900 mb-2">{title}</h4>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Automate data processing, AI summaries, and lead routing without code. Join 500,000+ companies using Make.
        </p>
      </div>
      <a
        href="https://make.com"
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
      >
        <span>Explore Solutions</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
};
