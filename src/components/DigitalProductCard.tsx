import React from 'react';
import { Star, Check, ShoppingBag } from 'lucide-react';
import { DigitalProduct } from '../types';
import { useApp } from '../context/AppContext';

interface DigitalProductCardProps {
  product: DigitalProduct;
}

export const DigitalProductCard: React.FC<DigitalProductCardProps> = ({ product }) => {
  const { openCheckout } = useApp();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Visual Header / Cover Simulation */}
        <div className={`h-36 bg-gradient-to-br ${product.colorScheme} p-4 text-white flex flex-col justify-between relative overflow-hidden`}>
          <div className="flex items-center justify-between z-10">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-white/20 backdrop-blur-xs text-white">
              {product.format}
            </span>
            {product.badgeText && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-white text-indigo-900 shadow-xs">
                {product.badgeText}
              </span>
            )}
          </div>

          <div className="z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/80">Digital Asset</span>
            <div className="text-sm font-semibold text-white/95 line-clamp-1 mt-0.5">
              {product.previewBadge}
            </div>
          </div>

          {/* Background subtle effect */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-lg pointer-events-none" />
        </div>

        {/* Product Details */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 dark:text-slate-500 text-[11px]">({product.salesCount}+ sold)</span>
            </div>
          </div>

          <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {product.title}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* What's included pills */}
          <div className="space-y-1.5 mb-2">
            <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Includes:
            </div>
            {product.downloadIncludes.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Buy CTA */}
      <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="flex items-baseline justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">${product.price}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">${product.originalPrice}</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/60">
            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        </div>

        <button
          onClick={() => openCheckout(product)}
          className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Get Instant Access</span>
        </button>
      </div>
    </div>
  );
};
