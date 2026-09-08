import React from 'react';
import { Clock, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';

interface ArticleCardProps {
  article: Article;
  layout?: 'standard' | 'horizontal' | 'featured';
}

const CATEGORY_STYLES: Record<string, { badgeBg: string; text: string; dot: string }> = {
  'AI News': {
    badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/40',
    text: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500'
  },
  'AI Tool Reviews': {
    badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/40',
    text: 'text-indigo-600 dark:text-indigo-400',
    dot: 'bg-indigo-500'
  },
  'AI Tutorials': {
    badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500'
  },
  'Productivity Guides': {
    badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40',
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500'
  },
  'AI Comparisons': {
    badgeBg: 'bg-sky-500/10 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/40',
    text: 'text-sky-600 dark:text-sky-400',
    dot: 'bg-sky-500'
  },
  'Prompt Engineering': {
    badgeBg: 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/40',
    text: 'text-violet-600 dark:text-violet-400',
    dot: 'bg-violet-500'
  }
};

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, layout = 'standard' }) => {
  const { navigate } = useApp();
  const catStyle = CATEGORY_STYLES[article.category] || {
    badgeBg: 'bg-slate-500/10 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/40',
    text: 'text-slate-600 dark:text-slate-400',
    dot: 'bg-slate-400'
  };

  const handleNavigate = () => {
    navigate(`/blog/${article.slug}`);
  };

  // Horizontal / Featured Lead Layout
  if (layout === 'horizontal' || layout === 'featured') {
    return (
      <article
        onClick={handleNavigate}
        className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row cursor-pointer"
      >
        <div className="lg:w-7/12 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 dark:bg-slate-950">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-slate-900/85 text-white border border-white/10 shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
              {article.category}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md bg-indigo-600/90 text-white shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured Cover
            </span>
          </div>
        </div>

        <div className="lg:w-5/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.publishedDate}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {article.title}
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>

            {article.tags && article.tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-1.5 pt-1">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{article.author.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{article.author.role}</div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Read Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    );
  }

  // Standard Magazine Publication Card
  return (
    <article
      onClick={handleNavigate}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md bg-slate-900/85 text-white border border-white/10 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
            {article.category}
          </span>
        </div>

        {/* Read time pill */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md bg-slate-900/80 text-slate-200 shadow-sm">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>{article.readTime}</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{article.publishedDate}</span>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug font-['Space_Grotesk']">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer: Author + Read Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
              {article.author.name}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 group-hover:translate-x-1 transition-all shrink-0 cursor-pointer"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
