import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { useApp } from '../context/AppContext';

interface ArticleCardProps {
  article: Article;
  layout?: 'standard' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, layout = 'standard' }) => {
  const { navigate } = useApp();

  if (layout === 'horizontal') {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row group">
        <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-900/80 text-white backdrop-blur-xs">
              {article.category}
            </span>
          </div>
        </div>

        <div className="sm:w-3/5 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.publishedDate}</span>
              </span>
            </div>

            <button
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="text-left font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 cursor-pointer font-['Space_Grotesk']"
            >
              {article.title}
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{article.author.name}</span>
            </div>

            <button
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Read Guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between group">
      <div className="relative h-44 overflow-hidden">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-slate-900/80 text-white backdrop-blur-xs">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
            <span>•</span>
            <span>{article.publishedDate}</span>
          </div>

          <button
            onClick={() => navigate(`/blog/${article.slug}`)}
            className="text-left font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 cursor-pointer font-['Space_Grotesk']"
          >
            {article.title}
          </button>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-5 h-5 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{article.author.name}</span>
          </div>

          <button
            onClick={() => navigate(`/blog/${article.slug}`)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Read</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
