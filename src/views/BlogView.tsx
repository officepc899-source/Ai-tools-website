import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  Newspaper,
  Compass,
  ArrowRight,
  TrendingUp,
  Check,
  Filter,
  Layers,
  Rss
} from 'lucide-react';
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

  // Exact 6 publication categories requested
  const publicationCategories = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'AI News', label: 'AI News' },
    { id: 'AI Tool Reviews', label: 'AI Tool Reviews' },
    { id: 'AI Tutorials', label: 'AI Tutorials' },
    { id: 'Productivity Guides', label: 'Productivity Guides' },
    { id: 'AI Comparisons', label: 'AI Comparisons' },
    { id: 'Prompt Engineering', label: 'Prompt Engineering' }
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      if (selectedCategory !== 'all') {
        const matchesCat =
          a.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
        if (!matchesCat) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = a.title.toLowerCase().includes(q);
        const inExcerpt = a.excerpt.toLowerCase().includes(q);
        const inTags = a.tags && a.tags.some((t) => t.toLowerCase().includes(q));
        const inAuthor = a.author.name.toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inTags && !inAuthor) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Featured Lead Article
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.category === 'AI Tool Reviews') || articles[0];
  }, [articles]);

  // Remaining articles for grid (excluding the featured one if viewing "all" and no search query)
  const feedArticles = useMemo(() => {
    if (selectedCategory === 'all' && !searchQuery.trim() && featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, selectedCategory, searchQuery, featuredArticle]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please provide a valid email address');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed to AIToolNest Dispatch!');
  };

  // Structured schema for publication blog listing
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AIToolNest AI Publication & Journal',
    description:
      'Independent AI industry publication covering artificial intelligence news, hands-on software reviews, technical prompt engineering, and operational productivity playbooks.',
    url: 'https://aitoolnest.com/#/blog',
    publisher: {
      '@type': 'Organization',
      name: 'AIToolNest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aitoolnest.com/logo.png'
      }
    },
    blogPost: articles.slice(0, 10).map((art) => ({
      '@type': 'BlogPosting',
      headline: art.title,
      description: art.excerpt,
      image: art.featuredImage,
      datePublished: art.publishedDate,
      dateModified: art.updatedDate || art.publishedDate,
      url: `https://aitoolnest.com/#/blog/${art.slug}`,
      author: {
        '@type': 'Person',
        name: art.author.name
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="AI Publication: News, Tool Reviews, Tutorials & Prompt Engineering | AIToolNest"
        description="Independent AI journal featuring breaking artificial intelligence news, verified software reviews, step-by-step tutorials, prompt engineering guides, and deep comparisons."
        canonicalUrl="https://aitoolnest.com/#/blog"
        schemaData={blogListSchema}
      />

      <Breadcrumbs items={[{ label: 'Editorial Publication & Blog' }]} />

      {/* Hero Header Section */}
      <div className="relative pb-8 border-b border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900/50">
            <Newspaper className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>AIToolNest Intelligence Journal • Issue 2026</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Rss className="w-3.5 h-3.5 text-amber-500" />
            <span>Updated Daily by Verified Engineers & Analysts</span>
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight leading-[1.15]">
            AI News, In-Depth Reviews & Technical Blueprints
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Independent research, rigorous benchmark evaluations, and actionable prompt playbooks to scale your leverage in the AI era.
          </p>
        </div>
      </div>

      {/* Featured Lead Story Showcase (When viewing All and not searching) */}
      {featuredArticle && selectedCategory === 'all' && !searchQuery.trim() && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Featured Publication Story</span>
          </div>
          <ArticleCard article={featuredArticle} layout="featured" />
        </section>
      )}

      {/* Publication Controls Bar (Category Filter Pills + Live Search) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Navigation Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {publicationCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 ring-2 ring-indigo-600/30'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative sm:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search publication by topic, tool or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Indicator */}
        {(selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                Filtering by:{' '}
                <strong className="text-slate-900 dark:text-white capitalize">
                  {selectedCategory === 'all' ? 'All Topics' : selectedCategory}
                </strong>
                {searchQuery && ` matching "${searchQuery}"`} ({feedArticles.length} articles found)
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Publication Feed Grid */}
      {feedArticles.length > 0 ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
              Showing {feedArticles.length} publication {feedArticles.length === 1 ? 'article' : 'articles'}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Fact-Checked & Verified</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {feedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            No articles match your criteria
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
            Try adjusting your search keywords or explore one of our core publication topics like AI Tool Reviews or Prompt Engineering.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
          >
            Show All Articles
          </button>
        </div>
      )}

      {/* Editorial Dispatch Newsletter Box */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-500/30 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/20">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Weekly AI Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] leading-tight">
              Get Curated AI Intelligence Delivered Every Thursday
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Join 42,000+ AI practitioners and founders. We analyze 3 newly released AI tools, share reproducible prompt frameworks, and summarize key benchmark breakdowns. Zero spam, ever.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {!newsletterSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your work email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 min-w-[260px] shadow-inner"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shrink-0 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  Subscribe Free
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You are subscribed! Watch for our upcoming Thursday publication issue.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ad Placement */}
      <AdBanner format="horizontal-leaderboard" />
    </div>
  );
};
