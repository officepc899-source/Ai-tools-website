import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Bot, Lightbulb, ShoppingBag, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, tools, businessIdeas, digitalProducts, articles, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'tools' | 'business' | 'products' | 'articles'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredTools = tools.filter(
    (t) =>
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.categoryLabel.toLowerCase().includes(q) ||
      t.keyFeatures.some((f) => f.toLowerCase().includes(q))
  );

  const filteredBusiness = businessIdeas.filter(
    (b) =>
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.summary.toLowerCase().includes(q) ||
      b.categoryLabel.toLowerCase().includes(q)
  );

  const filteredProducts = digitalProducts.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
  );

  const filteredArticles = articles.filter(
    (a) =>
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  );

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI tools, business ideas, templates, articles..."
            className="w-full text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              activeTab === 'tools' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            AI Tools ({filteredTools.length})
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              activeTab === 'business' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Business Ideas ({filteredBusiness.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              activeTab === 'products' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Digital Products ({filteredProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              activeTab === 'articles' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            Articles ({filteredArticles.length})
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-5 divide-y divide-slate-100 dark:divide-slate-800">
          {/* AI Tools Section */}
          {(activeTab === 'all' || activeTab === 'tools') && filteredTools.length > 0 && (
            <div className="pt-2 first:pt-0">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>AI Tools</span>
              </div>
              <div className="space-y-1.5">
                {filteredTools.slice(0, activeTab === 'tools' ? 20 : 5).map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(`/ai-tools/${tool.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${tool.iconBg} text-white flex items-center justify-center shrink-0`}>
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {tool.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{tool.description}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {tool.pricingType}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Business Ideas Section */}
          {(activeTab === 'all' || activeTab === 'business') && filteredBusiness.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Business Ideas</span>
              </div>
              <div className="space-y-1.5">
                {filteredBusiness.slice(0, 3).map((idea) => (
                  <button
                    key={idea.id}
                    onClick={() => handleSelect(`/business-idea/${idea.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {idea.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{idea.summary}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap ml-2">
                      {idea.earningPotential.split('/')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Digital Products Section */}
          {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digital Products & Templates</span>
              </div>
              <div className="space-y-1.5">
                {filteredProducts.slice(0, 3).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelect(`/digital-products`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {prod.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{prod.description}</div>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white ml-2">${prod.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {(activeTab === 'all' || activeTab === 'articles') && filteredArticles.length > 0 && (
            <div className="pt-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Blog & Resource Articles</span>
              </div>
              <div className="space-y-1.5">
                {filteredArticles.slice(0, 3).map((art) => (
                  <button
                    key={art.id}
                    onClick={() => handleSelect(`/blog/${art.slug}`)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {art.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{art.excerpt}</div>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{art.readTime}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredTools.length === 0 &&
            filteredBusiness.length === 0 &&
            filteredProducts.length === 0 &&
            filteredArticles.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No results found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 mt-1">Try searching for keywords like &ldquo;free&rdquo;, &ldquo;writing&rdquo;, or &ldquo;prompts&rdquo;</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
