import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ExternalLink,
  Star,
  ShieldCheck,
  Check,
  X,
  Tag,
  Zap,
  Filter,
  Info,
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  ArrowRight,
  Search,
  Battery,
  Cpu,
  Layers,
  ShoppingBag,
  RotateCcw,
  Share2,
  Copy,
  CheckCheck
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import {
  AI_GADGETS_DATA,
  GADGET_CATEGORIES,
  AIGadget,
  GadgetCategory
} from '../data/gadgetsData';
import { useApp } from '../context/AppContext';

export const GadgetsView: React.FC = () => {
  const { navigate, showToast } = useApp();

  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Pagination / Load More state
  const ITEMS_PER_PAGE = 6;
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Filtered & Sorted Gadgets
  const filteredGadgets = useMemo(() => {
    return AI_GADGETS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under-150' && item.numericPrice >= 150) return false;
      if (priceFilter === '150-300' && (item.numericPrice < 150 || item.numericPrice > 300)) return false;
      if (priceFilter === '300-500' && (item.numericPrice < 300 || item.numericPrice > 500)) return false;
      if (priceFilter === '500-plus' && item.numericPrice < 500) return false;

      // Badge filter
      if (badgeFilter === 'best-seller' && item.badge !== 'Best Seller') return false;
      if (badgeFilter === 'editors-choice' && item.badge !== "Editor's Choice") return false;
      if (badgeFilter === 'deals-only' && !item.discountPercentage) return false;

      // Minimum Rating
      if (minRating > 0 && item.rating < minRating) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = item.name.toLowerCase().includes(q);
        const inBrand = item.brand.toLowerCase().includes(q);
        const inReview = item.shortReview.toLowerCase().includes(q);
        const inFeatures = item.features.some((f) => f.toLowerCase().includes(q));
        if (!inName && !inBrand && !inReview && !inFeatures) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
      if (sortBy === 'reviews-desc') return b.reviewsCount - a.reviewsCount;
      // Default: 'featured'
      return 0;
    });
  }, [selectedCategory, searchQuery, priceFilter, badgeFilter, minRating, sortBy]);

  const displayedGadgets = useMemo(() => {
    return filteredGadgets.slice(0, visibleCount);
  }, [filteredGadgets, visibleCount]);

  const hasMore = visibleCount < filteredGadgets.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceFilter('all');
    setBadgeFilter('all');
    setMinRating(0);
    setSortBy('featured');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  // Structured ItemList Schema for SEO
  const marketplaceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best AI Gadgets & Smart Hardware Marketplace (2026)',
    description: 'Expert reviews, pros & cons, specifications, and verified deals for AI smart glasses, meeting recorders, 4K PTZ cameras, and smart home robotics.',
    url: 'https://aitoolnest.com/#/ai-gadgets',
    numberOfItems: filteredGadgets.length,
    itemListElement: filteredGadgets.map((g, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: g.name,
        image: g.imageUrl,
        description: g.shortReview,
        brand: {
          '@type': 'Brand',
          name: g.brand
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: g.rating,
          reviewCount: g.reviewsCount,
          bestRating: '5'
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: g.numericPrice.toString(),
          availability: 'https://schema.org/InStock',
          url: g.affiliateUrl,
          seller: {
            '@type': 'Organization',
            name: g.merchant
          }
        }
      }
    }))
  };

  return (
    <div className="space-y-10 pb-24">
      <SEOHead
        title="Best AI Gadgets & Hardware Marketplace (2026 Deals & Reviews) | AIToolNest"
        description="Discover top AI gadgets: smart glasses, meeting recorders, PTZ streaming cams, and smart home robots. Compare reviews, specs, pros & cons, and verified discounts."
        canonicalUrl="https://aitoolnest.com/#/ai-gadgets"
        schemaData={marketplaceSchema}
      />

      {/* Hero Header Section with Glassmorphism and Stats */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <Breadcrumbs
            items={[{ label: 'AI Gadgets & Marketplace' }]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Smart Hardware & Verified Deals</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] leading-tight">
              AI Gadgets & Hardware Marketplace
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore hands-on tested smart wearables, voice meeting transcribers, AI PTZ webcams, and autonomous home robotics. Compare real specifications, pros & cons, and current retail discounts.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xs text-slate-400 block font-medium">Curated Devices</span>
              <span className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">16+ Verified</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xs text-slate-400 block font-medium">Categories</span>
              <span className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">4 Focus Hubs</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xs text-slate-400 block font-medium">Max Savings</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-['Space_Grotesk']">Up to $400 OFF</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="text-xs text-slate-400 block font-medium">Tested Quality</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-['Space_Grotesk']">4.8★ Avg</span>
            </div>
          </div>
        </div>

        {/* Subtle Ambient Glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />
      </section>

      {/* Main Marketplace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Affiliate Transparency Disclosure Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-3 shadow-xs">
          <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p>
              <strong className="font-bold">Affiliate Disclosure & Transparency:</strong> AIToolNest is reader-supported. When you purchase an AI gadget through our links, we may earn an affiliate commission from merchants (such as Amazon, B&H Photo, or Official Brand Stores) at no additional cost to you. We only feature products evaluated for authentic reliability, build quality, and real-world utility.
            </p>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
              Prices, discounts, and availability are verified daily and subject to change. Learn more on our <button onClick={() => navigate('/affiliate-disclosure')} className="underline font-semibold hover:text-indigo-950 dark:hover:text-white cursor-pointer">Affiliate Policy</button> page.
            </p>
          </div>
        </div>

        {/* Category Navigation Pills (AI Gadgets, Office Setup, Creator Gear, Smart Home) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {GADGET_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? AI_GADGETS_DATA.length
              : AI_GADGETS_DATA.filter((g) => g.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-[1.02]'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white font-mono'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Filter Suite, and Sort Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search gadgets, brands, or features (e.g., Meta, PLAUD, 4K, Roborock)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="reviews-desc">Most Reviews</option>
              </select>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="md:hidden px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Bar (Desktop & Expandable on Mobile) */}
          <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} md:block pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3`}>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                Price:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-150', label: 'Under $150' },
                  { id: '150-300', label: '$150 - $300' },
                  { id: '300-500', label: '$300 - $500' },
                  { id: '500-plus', label: '$500+' }
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id)}
                    className={`px-3 py-1 rounded-xl text-xs transition-colors cursor-pointer ${
                      priceFilter === p.id
                        ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-300 dark:border-indigo-700'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden lg:block" />

              <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                Badges:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'best-seller', label: 'Best Sellers' },
                  { id: 'editors-choice', label: "Editor's Choice" },
                  { id: 'deals-only', label: 'Deals & Savings Only' }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBadgeFilter(b.id)}
                    className={`px-3 py-1 rounded-xl text-xs transition-colors cursor-pointer ${
                      badgeFilter === b.id
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-700'
                        : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {(selectedCategory !== 'all' ||
                searchQuery ||
                priceFilter !== 'all' ||
                badgeFilter !== 'all' ||
                sortBy !== 'featured') && (
                <button
                  onClick={handleResetFilters}
                  className="ml-auto text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{displayedGadgets.length}</strong> of{' '}
            <strong className="text-slate-800 dark:text-slate-200">{filteredGadgets.length}</strong> AI gadgets
          </span>
          {priceFilter !== 'all' || badgeFilter !== 'all' || selectedCategory !== 'all' ? (
            <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
              Filters applied
            </span>
          ) : null}
        </div>

        {/* Product Cards Grid with Glassmorphism and Micro-Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayedGadgets.map((gadget) => (
            <article
              key={gadget.id}
              className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Header Image with Badges */}
                <div
                  onClick={() => navigate(`/ai-gadgets/${gadget.slug}`)}
                  className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={gadget.imageUrl}
                    alt={gadget.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5">
                    {gadget.badge && (
                      <span
                        className={`px-3 py-0.5 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1 ${
                          gadget.badge === 'Best Seller'
                            ? 'bg-amber-500 text-slate-950'
                            : gadget.badge === "Editor's Choice"
                            ? 'bg-indigo-600 text-white'
                            : gadget.badge === 'Price Drop'
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{gadget.badge}</span>
                      </span>
                    )}

                    {gadget.discountPercentage && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500 text-slate-950 shadow-sm flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        <span>{gadget.discountPercentage}</span>
                      </span>
                    )}
                  </div>

                  {/* Category Tag on Top-Right */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                      {gadget.categoryLabel}
                    </span>
                  </div>

                  {/* Price Banner Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] text-slate-300 font-mono block">
                        {gadget.brand}
                      </span>
                      {gadget.savingsAmount && (
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
                          {gadget.savingsAmount}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {gadget.originalPrice && (
                        <div className="text-[11px] text-slate-400 line-through font-mono">
                          {gadget.originalPrice}
                        </div>
                      )}
                      <div className="text-xl font-black text-emerald-400 font-['Space_Grotesk']">
                        {gadget.price}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Rating Stars & Review Count */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(gadget.rating)
                                ? 'fill-amber-500 text-amber-500'
                                : 'fill-slate-200 dark:fill-slate-800 text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-black text-slate-900 dark:text-white">
                        {gadget.rating.toFixed(1)}
                      </span>
                      <span className="text-slate-400 font-normal">
                        ({gadget.reviewsCount.toLocaleString()})
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Sold on: <strong className="text-slate-700 dark:text-slate-300">{gadget.merchant}</strong>
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => navigate(`/ai-gadgets/${gadget.slug}`)}
                    className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 cursor-pointer leading-snug"
                  >
                    {gadget.name}
                  </h3>

                  {/* Short Review */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {gadget.shortReview}
                  </p>

                  {/* Pros Snapshot */}
                  <div className="space-y-1.5 pt-1">
                    {gadget.pros.slice(0, 2).map((pro, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{pro}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Quick Pill */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] font-medium">Battery</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                        {gadget.specs.batteryLife.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 block text-[10px] font-medium">AI Chip</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                        {gadget.specs.aiChipset.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: "View Review & Specs" and "Check Price" (nofollow sponsored) */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/ai-gadgets/${gadget.slug}`)}
                      className="flex-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition-colors text-center cursor-pointer"
                    >
                      View Review & Specs
                    </button>
                    <a
                      href={gadget.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                    <span>✓ In stock on {gadget.merchant}</span>
                    <span className="font-mono">Sponsored</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State when no results */}
        {filteredGadgets.length === 0 && (
          <div className="text-center py-16 bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md p-8 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No AI Gadgets Matched</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Try adjusting your category filter, clearing price thresholds, or searching for broader terms.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination / "Load More Gadgets" Button */}
        {hasMore && (
          <div className="text-center pt-4 space-y-3">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Load More Gadgets ({filteredGadgets.length - displayedGadgets.length} remaining)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-slate-400">
              Showing {displayedGadgets.length} of {filteredGadgets.length} curated products
            </p>
          </div>
        )}
      </div>

      {/* General AI Gadgets FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            AI Hardware Marketplace Buyer&apos;s FAQ
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Frequently asked questions about purchasing artificial intelligence devices, battery runtimes, and privacy safeguards.
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Do these AI gadgets require mandatory monthly subscriptions?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Most devices—including Ray-Ban Meta glasses, PLAUD NOTE, Insta360 Link 2, and Roborock S8 Pro Ultra—offer full on-device and bundled cloud AI features without any mandatory monthly subscriptions. Devices that require dedicated standalone cellular lines (like the Humane AI Pin) or advanced transcription minutes provide optional plans.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              How does AIToolNest verify and recommend AI hardware?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our hardware evaluation lab reviews devices based on four strict pillars: on-device latency, microphone acoustic pickup in loud rooms, battery endurance, and software longevity (OTA updates). We do not accept paid placements; all badges like &ldquo;Best Seller&rdquo; and &ldquo;Editor&apos;s Choice&rdquo; reflect objective performance testing.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md p-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              What does the &ldquo;Check Price&rdquo; button do?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Clicking &ldquo;Check Price&rdquo; safely opens the verified merchant product listing (such as Amazon, B&H Photo, or the official manufacturer portal) in a new tab. This ensures you receive the latest real-time flash sales, coupon codes, and guaranteed buyer protection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
