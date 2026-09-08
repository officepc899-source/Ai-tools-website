import React from 'react';

export const ToolCardSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading AI tool card"
      className="relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs animate-pulse"
    >
      {/* Top Banner Placeholder */}
      <div className="relative h-36 sm:h-38 w-full bg-slate-100 dark:bg-slate-800/60 p-4 flex items-end justify-between">
        {/* Floating Category Pill Placeholder */}
        <div className="absolute top-3 left-3 h-5 w-20 bg-slate-200 dark:bg-slate-700/80 rounded-lg" />
        {/* Floating Action Buttons Placeholder */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <div className="h-6 w-6 rounded-lg bg-slate-200 dark:bg-slate-700/80" />
          <div className="h-6 w-6 rounded-lg bg-slate-200 dark:bg-slate-700/80" />
        </div>

        {/* Elevated Logo Squircle Placeholder */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 shadow-md shrink-0" />

        {/* Rating Pill Placeholder */}
        <div className="h-6 w-14 rounded-lg bg-slate-200 dark:bg-slate-700/80" />
      </div>

      {/* Card Body Placeholders */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-3">
          {/* Badges row & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-14 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>

          {/* Pricing Row Placeholder */}
          <div className="h-7 w-full bg-slate-100 dark:bg-slate-800/50 rounded-xl" />

          {/* Description Lines */}
          <div className="space-y-2 min-h-[2.5rem]">
            <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>

          {/* Best For Placeholder */}
          <div className="h-8 w-full bg-slate-100 dark:bg-slate-800/40 rounded-xl" />

          {/* Feature Bullets Placeholder */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800/60 rounded" />
            <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>
        </div>
      </div>

      {/* Footer Dual CTA Buttons Placeholder */}
      <div className="p-3.5 sm:p-4 pt-3 border-t border-slate-100 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-900/60 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
