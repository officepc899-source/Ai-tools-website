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
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';
import { AdBanner } from '../components/AdBanner';
import { AI_DIRECTORY_CATEGORIES } from '../data/categoriesData';

export const ToolsDirectoryView: React.FC = () => {
  const { tools, currentPath, navigate, bookmarks } = useApp();

  // Extract initial query param or category path if present
  const queryParams = useMemo(() => {
    const queryPart = currentPath.split('?')[1] || '';
    return new URLSearchParams(queryPart);
  }, [currentPath]);

  // Support /category/:slug or /ai-tools/category/:slug
  const routeCategory = useMemo(() => {
    const cleanPath = currentPath.split('?')[0];
    if (cleanPath.startsWith('/category/')) {
      return cleanPath.replace('/category/', '');
    }
    if (cleanPath.startsWith('/ai-tools/category/')) {
      return cleanPath.replace('/ai-tools/category/', '');
    }
    return queryParams.get('category') || 'all';
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

  // Sync state if route changes
  useEffect(() => {
    setSelectedCategory(routeCategory);
  }, [routeCategory]);

  // Categories list
  const categoriesList = useMemo(() => {
    return [
      { id: 'all', title: 'All Tools', description: 'Complete directory of vetted AI tools' },
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
        return t.category === cat.id || (t.categories && t.categories.includes(cat.id));
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
          const matchesDirect = tool.category === selectedCategory;
          const matchesMulti = tool.categories && tool.categories.includes(selectedCategory as any);
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

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPricing('all');
    setSelectedUseCase('all');
    setSearchTerm('');
    setShowSavedOnly(false);
    setSortBy('popular');
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>49 Verified Tools • Zero Hallucinated Pricing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-['Space_Grotesk']">
            {currentCategoryTitle}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {currentCategoryDesc}
          </p>
        </div>

        {/* Saved Tools Quick Toggle */}
        <button
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 ${
            showSavedOnly
              ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-white' : ''}`} />
          <span>Saved Tools ({bookmarks.length})</span>
        </button>
      </div>

      {/* 10 Category Quick Navigation Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Filter by Category</span>
          <span className="text-slate-400 lowercase font-normal">{filteredTools.length} tools shown</span>
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
                    navigate('/tools');
                  } else {
                    navigate(`/tools?category=${cat.id}`);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500'
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
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Real-time Search Input */}
          <div className="relative sm:col-span-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search 49 tools (e.g., ChatGPT, video, student, podcast, code)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
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
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Filter by Use Case:</span>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value)}
              className="px-2 py-1 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 focus:outline-none"
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
              className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Directory Results Grid */}
      {filteredTools.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* In-feed Ad Banner */}
          <AdBanner format="horizontal-leaderboard" />
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching AI tools found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn&apos;t find any verified tools matching your current search &ldquo;{searchTerm}&rdquo; or active filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Clear All Filters & Show 49 Tools
          </button>
        </div>
      )}
    </div>
  );
};
