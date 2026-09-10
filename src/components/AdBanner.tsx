import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, X, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { trackAdClick } from '../utils/analytics';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  format?: 'horizontal-leaderboard' | 'in-feed-card' | 'sidebar-rectangle' | 'sticky-anchor' | 'native-affiliate';
  title?: string;
  sponsorName?: string;
  adSlot?: string;
  adClient?: string;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'horizontal-leaderboard',
  title,
  sponsorName = 'AliExpress Tech Deals',
  adSlot,
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  className = ''
}) => {
  const { adsEnabled } = useApp();
  const [adLoaded, setAdLoaded] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  useEffect(() => {
    if (!adsEnabled) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && adSlot) {
        window.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch {
      setAdLoaded(false);
    }
  }, [adsEnabled, adSlot]);

  if (!adsEnabled) return null;

  // 1. STICKY BOTTOM ANCHOR AD (Highest mobile RPM)
  if (format === 'sticky-anchor') {
    if (stickyDismissed) return null;

    return (
      <aside
        aria-label="Sponsored Partner Banner"
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl transition-all ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="hidden sm:inline-flex text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold shrink-0">
              Advertisement
            </span>
            <div className="flex items-center gap-2 truncate text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <strong className="text-slate-900 dark:text-white truncate">
                {title || 'Trending AliExpress AI Gadgets & Smart Tools — Up to 60% Off'}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://s.click.aliexpress.com/e/_DEAL_ZONE"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              onClick={() => trackAdClick('sticky-anchor', 'AliExpress Tech Deals')}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Explore Deals</span>
            </a>
            <button
              onClick={() => setStickyDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close advertisement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. HORIZONTAL LEADERBOARD (728x90 or Responsive Full Width)
  if (format === 'horizontal-leaderboard') {
    return (
      <div className={`w-full my-8 ${className}`}>
        {/* AdSense Unit if configured */}
        {adSlot ? (
          <div className="min-h-[90px] flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-1">
              Advertisement
            </div>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', minHeight: '90px' }}
              data-ad-client={adClient}
              data-ad-slot={adSlot}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          /* High-converting native fallback sponsor banner */
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-900/60 shadow-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="absolute top-2 right-3 text-[10px] uppercase tracking-wider text-slate-400 font-mono">
              Sponsored • {sponsorName}
            </div>
            <div className="space-y-1 text-center md:text-left mt-2 md:mt-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Verified Hardware &amp; AI Tech Partner</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-tight font-['Space_Grotesk']">
                {title || 'Curated AI Gadgets, Micro-Desktops & Wearables on AliExpress'}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Direct factory-pricing on smart audio glasses, voice recorders, and productivity gear with AliExpress Buyer Protection guarantee.
              </p>
            </div>
            <a
              href="https://s.click.aliexpress.com/e/_DEAL_ZONE"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              onClick={() => trackAdClick('horizontal-leaderboard', sponsorName)}
              className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-semibold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md shadow-orange-600/20"
            >
              <span>Shop Discount Hub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // 3. SIDEBAR RECTANGLE (300x250)
  if (format === 'sidebar-rectangle') {
    return (
      <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs relative my-6 ${className}`}>
        <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono mb-2">
          Advertisement
        </div>
        {adSlot ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'inline-block', width: '300px', height: '250px' }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
          />
        ) : (
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h5 className="text-sm font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] leading-snug">
              {title || 'AliExpress Choice Tech Deals — Fast Tracked Global Shipping'}
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Explore thousands of top-rated electronics, audio peripherals, and desk accessories with verified seller ratings.
            </p>
            <a
              href="https://s.click.aliexpress.com/e/_DEAL_ZONE"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              onClick={() => trackAdClick('sidebar-rectangle', 'AliExpress Choice')}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Deals</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // 4. IN-FEED DIRECTORY CARD (Interstitials in grid)
  return (
    <div className={`rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/70 dark:from-indigo-950/30 dark:via-slate-900 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-800/60 p-6 shadow-xs relative flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-600 dark:text-indigo-400 font-bold px-2 py-0.5 rounded bg-indigo-100/70 dark:bg-indigo-950/80">
            Featured Partner
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-mono">Sponsored</span>
        </div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-2">
          {title || 'Top AI Hardware & Automated Gadgets on AliExpress'}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          Discover vetted smart devices, mini PCs, voice transcribers, and studio gear with buyer protection.
        </p>
      </div>
      <a
        href="https://s.click.aliexpress.com/e/_DEAL_ZONE"
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        onClick={() => trackAdClick('in-feed-card', 'AliExpress Hardware')}
        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 group cursor-pointer"
      >
        <span>Browse AliExpress Collection</span>
        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
};
