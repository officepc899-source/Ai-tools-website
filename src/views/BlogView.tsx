import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, ArrowRight, Sparkles, Mail, Check, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';

export const BlogView: React.FC = () => {
  const { articles, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
        if (
          !a.title.toLowerCase().includes(q) &&
          !a.excerpt.toLowerCase().includes(q) &&
          !(a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
        ) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = articles[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed to AIToolNest weekly dispatch!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="AI Tools & Online Business Blog - Reviews, Guides & Listicles"
        description="Read in-depth reviews, expert comparison guides, and step-by-step tutorials on leveraging AI tools for online business, digital products, and productivity."
        canonicalUrl="https://aitoolnest.com/#/blog"
      />

      <Breadcrumbs items={[{ label: 'Blog & Articles' }]} />

      {/* Header Banner */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Independent Research & In-Depth Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
          AI Tools & Online Business Blog
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
          Actionable tutorials, hands-on software teardowns, and profitable business playbooks to scale your digital leverage.
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
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
            placeholder="Search articles & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
          <p className="text-slate-600 dark:text-slate-400 text-sm">No articles matched your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* In-feed Newsletter Box */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl border border-indigo-500/30 p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP Dispatch</span>
          </div>
          <h3 className="text-2xl font-bold font-['Space_Grotesk']">
            Get Weekly AI Analysis Directly In Your Inbox
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Every Thursday: Breakdown of 3 high-impact AI tools, new benchmark results, and free prompt blueprints.
          </p>
        </div>

        <div className="w-full md:w-auto">
          {!newsletterSubscribed ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-indigo-500 min-w-[240px]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0 shadow-md cursor-pointer"
              >
                Join Free
              </button>
            </form>
          ) : (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>You are subscribed! Watch for our Thursday edition.</span>
            </div>
          )}
        </div>
      </div>

      {/* Ad Placement */}
      <AdBanner format="horizontal-leaderboard" />
    </div>
  );
};
