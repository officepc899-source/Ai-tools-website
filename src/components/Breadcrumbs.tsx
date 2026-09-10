import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap pb-1">
      <button
        onClick={() => navigate('/')}
        className="flex items-center hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors gap-1.5 focus:outline-none cursor-pointer"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400 dark:text-slate-600 shrink-0" />
            {isLast || !item.path ? (
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigate(item.path!)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none truncate max-w-[160px] cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
