import React from 'react';
import { Star, ShieldCheck, ArrowRight, Tag } from 'lucide-react';
import { AffiliateProduct } from '../types/product';
import { CheckPriceButton } from './CheckPriceButton';

interface ProductCardProps {
  product: AffiliateProduct;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const detailPath = `/product/${product.slug}`;

  return (
    <div
      id={`product-card-${product.slug}`}
      className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800/60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // High quality fallback
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase rounded-lg bg-orange-600 text-white shadow-md">
              {product.badge}
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-emerald-600 text-white shadow-xs">
              {product.discountPercentage}
            </span>
          )}
        </div>

        {/* Merchant Chip */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-xs shadow-xs border border-slate-200/50 dark:border-slate-700/50">
            <ShieldCheck className="w-3 h-3 text-orange-500" />
            {product.merchant}
          </span>
        </div>

        {/* Quick View overlay trigger */}
        <button
          onClick={() => onNavigate(detailPath)}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          aria-label={`View ${product.name} details`}
        >
          <span className="px-4 py-2 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            View Full Specs & Review
          </span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between gap-2 text-xs mb-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Tag className="w-3 h-3" />
              {product.categoryLabel}
            </span>

            <div className="flex items-center gap-1">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-xs">
                {product.rating}
              </span>
              <span className="text-slate-400 text-[11px]">
                ({product.reviews.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors mb-2">
            <button
              onClick={() => onNavigate(detailPath)}
              className="text-left cursor-pointer hover:underline"
            >
              {product.name}
            </button>
          </h3>

          {/* Short Description */}
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
            {product.shortDescription || product.description}
          </p>

          {/* Key Features Teaser */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.slice(0, 2).map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium truncate max-w-[200px]"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Actions Bottom Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">
                {product.price}
              </span>
              {product.originalPrice && product.originalPrice !== product.price && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {product.savingsAmount && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                Save {product.savingsAmount}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Primary "Check Price" Button */}
            <div className="flex-1">
              <CheckPriceButton
                affiliateLink={product.affiliateLink}
                productName={product.name}
                label="Check Price"
                size="sm"
                fullWidth={true}
              />
            </div>

            {/* View Details Link */}
            <button
              onClick={() => onNavigate(detailPath)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1"
              title="View full specs and customer review summary"
            >
              <span>Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
