import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';

export const BlogView: React.FC = () => {
  const { articles, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'AI Tools',
    'Online Business',
    'Digital Products',
    'Productivity',
    'Technology'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      if (selectedCategory !== 'all' && a.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!a.title.toLowerCase().includes(q) && !a.excerpt.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = articles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="AI & Online Business Blog - Guides, Listicles & Tutorials"
        description="Comprehensive guides on AI tools, automated online business models, digital product creation, and productivity tactics."
        canonicalUrl="https://aitoolnest.com/#/blog"
      />

      <Breadcrumbs items={[{ label: 'Blog & Articles' }]} />

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span>Research & In-Depth Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          AI Tools & Online Business Blog
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Actionable tutorials, comparisons, and market teardowns to help you scale your digital leverage.
        </p>
      </div>

      {/* Lead Featured Article */}
      {featuredArticle && selectedCategory === 'all' && !searchQuery && (
        <div className="mb-4">
          <ArticleCard article={featuredArticle} layout="horizontal" />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Ad Placement */}
      <AdBanner format="horizontal-leaderboard" />
    </div>
  );
};
