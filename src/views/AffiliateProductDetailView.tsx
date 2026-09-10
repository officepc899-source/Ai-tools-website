import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Share2,
  Bookmark,
  Check,
  ShoppingBag,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Home,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getProductBySlug, getRelatedProducts, getAllAffiliateProducts } from '../utils/productPortal';
import { CheckPriceButton } from '../components/CheckPriceButton';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { AffiliateDisclosureBanner } from '../components/AffiliateDisclosure';

interface AffiliateProductDetailViewProps {
  slug: string;
}

export const AffiliateProductDetailView: React.FC<AffiliateProductDetailViewProps> = ({ slug }) => {
  const { navigate, toggleBookmark, isBookmarked, showToast } = useApp();
  
  // Look up product by slug
  const product = useMemo(() => {
    return getProductBySlug(slug, true);
  }, [slug]);

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Copied share link state
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product, slug]);

  const allProducts = useMemo(() => {
    return getAllAffiliateProducts(true);
  }, []);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product, allProducts, 3);
  }, [product, allProducts]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20 text-center">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Product Not Found</h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto mb-6">
          The requested affiliate product listing could not be found or has moved. Explore our complete affiliate catalog.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Portal</span>
        </button>
      </div>
    );
  }

  const bookmarked = isBookmarked(product.slug);

  const handleToggleBookmark = () => {
    toggleBookmark(product.slug);
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Link copied to clipboard');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Google Schema.org Structured Data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.gallery,
    description: product.shortDescription || product.description,
    brand: {
      '@type': 'Brand',
      name: product.merchant
    },
    offers: {
      '@type': 'Offer',
      url: product.affiliateLink,
      priceCurrency: 'USD',
      price: product.numericPrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: product.merchant
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
      bestRating: '5',
      worstRating: '1'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aitoolnest.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Affiliate Products',
        item: 'https://aitoolnest.com/#/products'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.categoryLabel,
        item: `https://aitoolnest.com/#/products?category=${product.category}`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://aitoolnest.com/#/product/${product.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-24 transition-colors">
      <SEOHead
        title={`${product.name} - Review, Specs & Best Price | AIToolNest`}
        description={product.shortDescription || product.description.slice(0, 160)}
        ogImage={product.image}
      />

      {/* Schema.org Product & Breadcrumb Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-slate-400" />
            <button
              onClick={() => navigate('/products')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Products Portal
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-slate-400" />
            <button
              onClick={() => navigate(`/products?category=${product.category}`)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {product.categoryLabel}
            </button>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 shrink-0 text-slate-400" />
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[240px] sm:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
        <AffiliateDisclosureBanner />

        {/* Product Hero Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 lg:p-10 shadow-xs mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 overflow-hidden flex items-center justify-center shadow-inner">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.badge && (
                    <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-orange-600 text-white shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="px-2.5 py-0.5 text-xs font-extrabold uppercase rounded-md bg-emerald-600 text-white shadow-xs">
                      {product.discountPercentage}
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 dark:bg-slate-900/95 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200/60 dark:border-slate-700/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                    {product.merchant}
                  </span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2.5">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImage === img
                          ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Bar */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Buyer Protection</span>
                  <span className="text-[10px] text-slate-500">75-Day Guarantee</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-slate-200 dark:border-slate-700 px-1">
                  <Truck className="w-5 h-5 text-indigo-500" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Tracked Shipping</span>
                  <span className="text-[10px] text-slate-500">Door-to-door</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-5 h-5 text-amber-500" />
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Fast Refund</span>
                  <span className="text-[10px] text-slate-500">If item delayed</span>
                </div>
              </div>
            </div>

            {/* Details & Purchase Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <button
                  onClick={() => navigate(`/products?category=${product.category}`)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-xs font-semibold hover:bg-orange-100 transition-colors"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {product.categoryLabel}
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {product.rating}
                    </span>
                    <span className="text-slate-400 text-xs">
                      ({product.reviews.toLocaleString()} customer reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleToggleBookmark}
                      aria-label="Save product"
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        bookmarked
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 text-indigo-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={handleShare}
                      aria-label="Share product"
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug mb-3">
                {product.name}
              </h1>

              {/* Short Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {product.shortDescription || product.description}
              </p>

              {/* Pricing Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-slate-50 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-900 border border-orange-200/80 dark:border-orange-900/40 mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-3">
                  <div>
                    <div className="text-[11px] font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-1">
                      Current AliExpress Price
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                        {product.price}
                      </span>
                      {product.originalPrice && product.originalPrice !== product.price && (
                        <span className="text-base sm:text-lg text-slate-400 line-through font-mono">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {product.savingsAmount && (
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase">
                        Instant Savings: {product.savingsAmount}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Prices fluctuate depending on ongoing AliExpress seller promotions, flash deals, and currency exchange rates.
                </p>

                {/* Main Conversion CTA: Check Price */}
                <CheckPriceButton
                  affiliateLink={product.affiliateLink}
                  productName={product.name}
                  label="Check Price on AliExpress"
                  size="lg"
                  fullWidth={true}
                  showMerchantBadge={true}
                />
              </div>

              {/* Highlights Bullet List */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Description & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left: Overview, Specs, Pros/Cons (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                Product Overview & In-Depth Review
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Technical Specifications
                </h2>
                <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {product.specifications.map((spec, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-white dark:bg-slate-900'}
                        >
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white w-2/5 sm:w-1/3">
                            {spec.label}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pros and Cons Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Pros Card */}
              <div className="bg-emerald-50/40 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-900/40 p-6">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-base mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>Reasons to Buy (Pros)</span>
                </div>
                <ul className="space-y-2.5">
                  {product.pros.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons Card */}
              <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-3xl border border-amber-200 dark:border-amber-900/40 p-6">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-bold text-base mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  <span>Considerations (Cons)</span>
                </div>
                <ul className="space-y-2.5">
                  {product.cons.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <span className="text-amber-500 font-bold">−</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs Accordion */}
            {product.faq && product.faq.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-500" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Common queries regarding ordering, shipping times, warranty, and authentic buyer protection.
                </p>

                <div className="space-y-3">
                  {product.faq.map((faqItem, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 dark:text-white text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        >
                          <span>{faqItem.question}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                            {faqItem.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sticky Buy Box Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs sticky top-24">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Fast Order Summary
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-2 mb-3">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {product.originalPrice}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
                    {product.discountPercentage}
                  </span>
                )}
              </div>

              {/* Check Price CTA */}
              <div className="mb-4">
                <CheckPriceButton
                  affiliateLink={product.affiliateLink}
                  productName={product.name}
                  label="Check Price"
                  size="md"
                  fullWidth={true}
                />
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Verified Merchant on AliExpress</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>AliExpress Global Door-to-Door Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>75-Day Full Refund Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Related Affiliate Products
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Similar high-performance hardware and deals in {product.categoryLabel}.
                </p>
              </div>

              <button
                onClick={() => navigate(`/products?category=${product.category}`)}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <span>View All in {product.categoryLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.slug}
                  product={relProduct}
                  onNavigate={navigate}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Action Bar for Mobile */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 sm:hidden z-40 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="truncate">
            <div className="text-[11px] text-slate-500 truncate">{product.name}</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{product.price}</div>
          </div>
          <div className="shrink-0 w-44">
            <CheckPriceButton
              affiliateLink={product.affiliateLink}
              productName={product.name}
              label="Check Price"
              size="sm"
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
