import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  Sparkles,
  SlidersHorizontal,
  X,
  Copy,
  Check,
  ChevronRight,
  Home,
  Tag,
  Flame,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  getAllAffiliateProducts,
  getFeaturedProducts,
  getCategoriesWithCounts,
  PORTAL_CATEGORIES
} from '../utils/productPortal';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { AffiliateDisclosureBanner } from '../components/AffiliateDisclosure';
import { PRODUCTS } from '../data/products';

export const AffiliateProductPortalView: React.FC = () => {
  const { navigate, showToast } = useApp();

  // Demo / System Test toggle (defaults to true if PRODUCTS is empty, so system can be tested immediately)
  const [demoMode, setDemoMode] = useState<boolean>(PRODUCTS.length === 0);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'reviews'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Check URL params for category on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('category=')) {
      const cat = hash.split('category=')[1]?.split('&')[0];
      if (cat) {
        setSelectedCategory(cat);
      }
    }
  }, []);

  // Fetch all enriched products
  const products = useMemo(() => {
    return getAllAffiliateProducts(demoMode);
  }, [demoMode]);

  // Featured items
  const featuredProducts = useMemo(() => {
    return getFeaturedProducts(products);
  }, [products]);

  // Dynamic category pills with accurate counts
  const categoriesWithCounts = useMemo(() => {
    return getCategoriesWithCounts(products);
  }, [products]);

  // Filter & Search pipeline
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Text Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          p.features.some(f => f.toLowerCase().includes(query)) ||
          p.specifications.some(s => s.value.toLowerCase().includes(query))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 3. Price Range Filter
    if (selectedPriceRange !== 'all') {
      switch (selectedPriceRange) {
        case 'under-50':
          result = result.filter(p => p.numericPrice < 50);
          break;
        case '50-100':
          result = result.filter(p => p.numericPrice >= 50 && p.numericPrice <= 100);
          break;
        case '100-200':
          result = result.filter(p => p.numericPrice > 100 && p.numericPrice <= 200);
          break;
        case '200-plus':
          result = result.filter(p => p.numericPrice > 200);
          break;
      }
    }

    // 4. Rating Filter
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      result = result.filter(p => p.rating >= minRating);
    }

    // 5. Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.numericPrice - b.numericPrice;
        case 'price-high':
          return b.numericPrice - a.numericPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.reviews - a.reviews;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedPriceRange !== 'all' ||
    selectedRating !== 'all' ||
    sortBy !== 'featured';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedRating('all');
    setSortBy('featured');
  };

  const handleCopyTemplate = async () => {
    const template = `{\n  Product: "Your Product Name",\n  Description: "Write full product description here...",\n  'AliExpress Affiliate Link': "https://s.click.aliexpress.com/e/_yourLink",\n  Image: "https://example.com/image.jpg",\n  Price: "$49.99"\n}`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(template);
      setCopiedTemplate(true);
      showToast('Copied 5-field product template to clipboard!');
      setTimeout(() => setCopiedTemplate(false), 2500);
    }
  };

  // ItemList Schema.org
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Affiliate Product Portal',
    description: 'Curated affiliate smart devices, AI hardware, and productivity tools on AliExpress.',
    numberOfItems: filteredProducts.length,
    itemListElement: filteredProducts.slice(0, 12).map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: prod.name,
      url: `https://aitoolnest.com/#/product/${prod.slug}`
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20 transition-colors">
      <SEOHead
        title="Affiliate Product Portal - Curated Deals & Smart Hardware | AIToolNest"
        description="Explore top-rated smart devices, AI hardware, and workspace productivity gear on AliExpress. Automated specs, genuine reviews, and real-time deal links."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Affiliate Products Portal
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
        <AffiliateDisclosureBanner />

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 mb-8 shadow-xl">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
              <span>Affiliate Product Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Curated Smart Hardware & <span className="text-orange-400">Affiliate Deals</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Discover vetted AI audio, cameras, wearable tech, and automation gadgets. Every product features automated specifications, honest pros & cons, verified AliExpress buyer protections, and direct deal links.
            </p>

            {/* Quick Search Bar inside Hero */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, category, or features (e.g. 4K camera, lavalier mic, smart curtain)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Decorative background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Single File Architecture Info Banner / Demo Switch */}
        <div className="mb-8 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Affiliate System Ready — Single Data File Architecture
                </h2>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl">
                Edit only <code className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-orange-600 dark:text-orange-400 font-semibold">/src/data/products.ts</code> to add products using just <strong>5 fields</strong>: <code className="font-mono text-slate-800 dark:text-slate-200">Product</code>, <code className="font-mono text-slate-800 dark:text-slate-200">Description</code>, <code className="font-mono text-slate-800 dark:text-slate-200">AliExpress Affiliate Link</code>, <code className="font-mono text-slate-800 dark:text-slate-200">Image</code>, and <code className="font-mono text-slate-800 dark:text-slate-200">Price</code>. Zero coding required!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleCopyTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy 5-Field Template</span>
              </button>

              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  demoMode
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{demoMode ? 'System Test Mode: ON' : 'System Test Mode: OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Pills Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categoriesWithCounts.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{category.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold font-mono ${
                      isSelected
                        ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Products Section (When on 'all' and no active search) */}
        {selectedCategory === 'all' && !searchQuery && featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Featured Product Deals
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Hand-picked high conversion hardware
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((prod) => (
                <ProductCard key={`feat-${prod.slug}`} product={prod} onNavigate={navigate} />
              ))}
            </div>
          </div>
        )}

        {/* Filters & Sorting Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Price Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">Price:</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-plus">$200+</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500">Rating:</span>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.8">4.8★ & up</option>
                  <option value="4.6">4.6★ & up</option>
                  <option value="4.0">4.0★ & up</option>
                </select>
              </div>

              {/* Reset button if filtered */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {selectedCategory === 'all'
              ? 'All Products'
              : PORTAL_CATEGORIES.find(c => c.id === selectedCategory)?.label}{' '}
            <span className="text-xs font-normal text-slate-500">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'})
            </span>
          </h2>

          {searchQuery && (
            <span className="text-xs text-slate-500">
              Matching &ldquo;{searchQuery}&rdquo;
            </span>
          )}
        </div>

        {/* Products Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} onNavigate={navigate} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-2xl mx-auto shadow-xs">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {PRODUCTS.length === 0 && !demoMode
                ? 'Ready For Your Products'
                : 'No Products Match Your Criteria'}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {PRODUCTS.length === 0 && !demoMode ? (
                <>
                  The portal system is fully created and running. You can now add products directly into{' '}
                  <code className="font-mono font-bold text-orange-600 dark:text-orange-400">/src/data/products.ts</code> with just 5 fields (Product, Description, AliExpress Affiliate Link, Image, Price). Or toggle Demo Mode to preview sample products immediately.
                </>
              ) : (
                'Try adjusting your search keywords, price filter, or category selection to discover products.'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {PRODUCTS.length === 0 && !demoMode ? (
                <>
                  <button
                    onClick={() => setDemoMode(true)}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-semibold text-xs hover:bg-orange-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Turn On Demo Products Mode</span>
                  </button>

                  <button
                    onClick={handleCopyTemplate}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy 5-Field Format</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
