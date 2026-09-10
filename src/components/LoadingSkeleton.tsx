import React from 'react';

/**
 * Modern, low-contrast shimmer skeleton for cards and lists
 */
export const SkeletonShimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-slate-200/80 dark:bg-slate-800/80 rounded-xl ${className}`}
  />
);

/**
 * Product & Gadget Card Skeleton
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xs">
      {/* Image thumbnail placeholder */}
      <div className="relative aspect-4/3 w-full rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse overflow-hidden">
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* Content */}
      <div className="space-y-3 px-1">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />

        {/* Price & CTA placeholder */}
        <div className="pt-2 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-5 w-16 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
            <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
          </div>
          <div className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

/**
 * Directory Grid Skeleton (renders 6 product skeletons)
 */
export const DirectoryGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

/**
 * Full Page Detail View Skeleton
 */
export const DetailViewSkeleton: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 aspect-4/3 rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <div className="lg:col-span-5 space-y-4">
          <div className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-4/6 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-12 w-full rounded-2xl bg-slate-200 dark:bg-slate-800 pt-4" />
        </div>
      </div>
    </div>
  );
};
