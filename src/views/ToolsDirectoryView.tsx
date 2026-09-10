import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Zap,
  Star,
  Layers,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Check,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';
import { AdBanner } from '../components/AdBanner';
import { AI_DIRECTORY_CATEGORIES, findCategoryBySlugOrId } from '../data/categoriesData';

const ITEMS_PER_PAGE = 12;

export const ToolsDirectoryView: React.FC = () => {
  const { tools, currentPath, navigate, bookmarks, isBookmarked, toggleBookmark } = useApp();

  // Extract initial query param or category path if present
  const queryParams = useMemo(() => {
    const queryPart = currentPath.split('?')[1] || '';
    return new URLSearchParams(queryPart);
  }, [currentPath]);

  // Support /category/:slug or /ai-tools/category/:slug
  const routeCategory = useMemo(() => {
    const cleanPath = currentPath.split('?')[0];
    let rawCategory = 'all';
    if (cleanPath.startsWith('/category/')) {
      rawCategory = cleanPath.replace('/category/', '');
    } else if (cleanPath.startsWith('/ai-tools/category/')) {
      rawCategory = cleanPath.replace('/ai-tools/category/', '');
    } else {
      rawCategory = queryParams.get('category') || 'all';
    }
    if (rawCategory === 'all') return 'all';
    const normalized = findCategoryBySlugOrId(rawCategory);
    return normalized ? normalized.id : rawCategory;
  }, [currentPath, queryParams]);

  const initialPricing = queryParams.get('pricing') || 'all';
  const initialSearch = queryParams.get('q') || '';
  const isSavedFilter = queryParams.get('filter') === 'saved';

  const [selectedCategory, setSelectedCategory] = useState<string>(routeCategory);
  const [selectedPricing, setSelectedPricing] = useState<string>(initialPricing);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'free-first' | 'name-asc' | 'name-desc'>('popular');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(isSavedFilter);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync state if route changes
  useEffect(() => {
    setSelectedCategory(routeCategory);
    setCurrentPage(1);
  }, [routeCategory]);

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedPricing, selectedUseCase, searchTerm, sortBy, showSavedOnly]);

  // Categories list
  const categoriesList = useMemo(() => {
    return [
      { id: 'all', title: 'All Tools', description: 'Complete directory of vetted AI software, platforms, and productivity engines' },
      ...AI_DIRECTORY_CATEGORIES
    ];
  }, []);

  // Calculate count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tools.length };
    AI_DIRECTORY_CATEGORIES.forEach((cat) => {
      counts[cat.id] = tools.filter((t) => {
        if (cat.id === 'free-ai-tools') {
          return t.pricingType === 'free' || t.categories?.includes('free-ai-tools') || t.category === 'free-ai-tools';
        }
        const toolNormalized = findCategoryBySlugOrId(t.category)?.id;
        return (
          t.category === cat.id ||
          (t.categories && t.categories.includes(cat.id)) ||
          toolNormalized === cat.id
        );
      }).length;
    });
    return counts;
  }, [tools]);

  // Available unique use cases
  const allUseCases = useMemo(() => {
    const set = new Set<string>();
    tools.forEach((t) => t.useCases.forEach((u) => set.add(u)));
    return Array.from(set).sort();
  }, [tools]);

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Saved filter
      if (showSavedOnly && !bookmarks.includes(tool.slug)) {
        return false;
      }

      // Search matching
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchDesc = tool.description.toLowerCase().includes(q);
        const matchFullDesc = tool.fullDescription.toLowerCase().includes(q);
        const matchCat = tool.categoryLabel.toLowerCase().includes(q);
        const matchBestFor = tool.bestFor.toLowerCase().includes(q);
        const matchFeature = tool.keyFeatures.some((f) => f.toLowerCase().includes(q));
        const matchUseCase = tool.useCases.some((u) => u.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchFullDesc && !matchCat && !matchBestFor && !matchFeature && !matchUseCase) {
          return false;
        }
      }

      // Category matching
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'free-ai-tools' || selectedCategory === 'free') {
          const isFree = tool.pricingType === 'free' || tool.categories?.includes('free-ai-tools') || tool.category === 'free-ai-tools';
          if (!isFree) return false;
        } else {
          const toolNormalized = findCategoryBySlugOrId(tool.category)?.id;
          const matchesDirect = tool.category === selectedCategory || toolNormalized === selectedCategory;
          const matchesMulti = tool.categories && (
            tool.categories.includes(selectedCategory as any) ||
            tool.categories.some((c) => findCategoryBySlugOrId(c)?.id === selectedCategory)
          );
          if (!matchesDirect && !matchesMulti) return false;
        }
      }

      // Pricing matching
      if (selectedPricing !== 'all') {
        if (tool.pricingType !== selectedPricing) {
          return false;
        }
      }

      // Use case matching
      if (selectedUseCase !== 'all') {
        if (!tool.useCases.includes(selectedUseCase)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'free-first') {
        const aFree = a.pricingType === 'free' ? 0 : 1;
        const bFree = b.pricingType === 'free' ? 0 : 1;
        if (aFree !== bFree) return aFree - bFree;
        return b.rating - a.rating;
      }
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      // Default: Popular (reviewsCount)
      return b.reviewsCount - a.reviewsCount;
    });
  }, [tools, selectedCategory, selectedPricing, selectedUseCase, searchTerm, sortBy, showSavedOnly, bookmarks]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE) || 1;
  const paginatedTools = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTools, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const directorySection = document.getElementById('directory-results');
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPricing('all');
    setSelectedUseCase('all');
    setSearchTerm('');
    setShowSavedOnly(false);
    setSortBy('popular');
    setCurrentPage(1);
  };

  const currentCategoryObj = categoriesList.find((c) => c.id === selectedCategory);
  const currentCategoryTitle = currentCategoryObj?.title || 'AI Tools Directory';
  const currentCategoryDesc = currentCategoryObj?.description || 'Browse, compare, and discover the best verified AI tools with real pricing and feature breakdowns.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={`${currentCategoryTitle} (2026 Directory) - Vetted & Rated`}
        description={currentCategoryDesc}
        canonicalUrl="https://aitoolnest.com/#/tools"
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools Directory', path: selectedCategory !== 'all' ? '/tools' : undefined },
          ...(selectedCategory !== 'all' ? [{ label: currentCategoryTitle }] : [])
        ]}
      />

      {/* Directory Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>10,000+ AI Tools Directory • Verified Weekly</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
            {currentCategoryTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {currentCategoryDesc}
          </p>
        </div>

        {/* Action Controls: View Mode & Saved Tools Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 ${
              showSavedOnly
                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
            <span>Saved Tools ({bookmarks.length})</span>
          </button>
        </div>
      </div>

      {/* Category Quick Navigation Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
          <span>Filter by Category</span>
          <span className="text-slate-400 dark:text-slate-500 lowercase font-normal">{filteredTools.length} tools matching</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id === 'all') {
                    navigate('/ai-tools');
                  } else {
                    navigate(`/ai-tools/category/${cat.id}`);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Advanced Filter Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Real-time Search Input */}
          <div className="relative sm:col-span-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search tools by name, keyword, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Pricing Model Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="all">Pricing: All Models</option>
              <option value="free">100% Free</option>
              <option value="freemium">Freemium (Free Tier)</option>
              <option value="free-trial">Free Trial Available</option>
              <option value="paid">Paid Only</option>
            </select>
          </div>

          {/* Sort By Selector */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="free-first">Sort: Free Tools First</option>
              <option value="name-asc">Sort: A-Z Alphabetical</option>
              <option value="name-desc">Sort: Z-A Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Secondary Use Case Filter & Active Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-medium">Filter by Use Case:</span>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value)}
              className="px-2 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Use Cases</option>
              {allUseCases.map((uc) => (
                <option key={uc} value={uc}>
                  {uc}
                </option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'all' || selectedPricing !== 'all' || selectedUseCase !== 'all' || searchTerm || showSavedOnly) && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Directory Results Section */}
      <div id="directory-results" className="space-y-6">
        {filteredTools.length > 0 ? (
          <>
            {/* Results Counter & Pagination summary */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTools.length)} -{' '}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredTools.length)} of {filteredTools.length} tools
              </span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>

            {/* Grid vs List View Rendering */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              /* List / Comparison View */
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-xs">
                {paginatedTools.map((tool) => {
                  const bookmarked = isBookmarked(tool.slug);
                  return (
                    <div
                      key={tool.id}
                      className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div
                          className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center font-black text-white text-base shrink-0`}
                        >
                          {tool.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                              className="font-bold text-slate-900 dark:text-white text-base hover:text-indigo-600 dark:hover:text-indigo-400 text-left font-['Space_Grotesk']"
                            >
                              {tool.name}
                            </button>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {tool.pricingType}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{tool.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {tool.description}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                            <span>Best for: <strong className="text-slate-700 dark:text-slate-300">{tool.bestFor}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => toggleBookmark(tool.slug)}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            bookmarked
                              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-600'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700'
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                        </button>
                        <button
                          onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                          className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                        <a
                          href={tool.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Visit Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                    currentPage === 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                    currentPage === totalPages
                      ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer'
                  }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* In-feed Ad Banner */}
            <AdBanner format="horizontal-leaderboard" />
          </>
        ) : (
          /* Empty State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching AI tools found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We couldn&apos;t find any verified tools matching your current search &ldquo;{searchTerm}&rdquo; or active filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Clear All Filters & Show Tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
