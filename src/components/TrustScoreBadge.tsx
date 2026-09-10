import React from 'react';
import { ShieldCheck, Award, CheckCircle, Lock, RefreshCw } from 'lucide-react';

export const TrustScoreBadge: React.FC<{ className?: string; variant?: 'banner' | 'compact' | 'product-card' }> = ({
  className = '',
  variant = 'banner'
}) => {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-3 py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium ${className}`}>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Trust Score 98/100</span>
        </div>
        <span className="text-slate-300 dark:text-slate-600">•</span>
        <span>Verified Editorial Testing</span>
        <span className="text-slate-300 dark:text-slate-600">•</span>
        <span>FTC Compliant</span>
      </div>
    );
  }

  if (variant === 'product-card') {
    return (
      <div className={`flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 ${className}`}>
        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <CheckCircle className="w-3 h-3" />
          <span>AliExpress Buyer Protection</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3 text-slate-400" />
          <span>SSL 256-Bit Encrypted</span>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Platform Trust & Security Certifications"
      className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              AIToolNest Trust &amp; Quality Guarantee
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Editorial Integrity • Transparent Monetization • Independent Audits
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Verified Merchant Links</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-500" />
            <span>Independent Testing</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            We purchase or evaluate products hands-on before publishing guides.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Buyer Protection</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            AliExpress official 15–75 day buyer guarantee with full refunds.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
            <span>Price Tracking</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Automated price audits to bring you verified flash deals &amp; coupons.
          </p>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-indigo-500" />
            <span>FTC Compliant</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Transparent affiliate disclosure with zero bias in editorial scoring.
          </p>
        </div>
      </div>
    </section>
  );
};
