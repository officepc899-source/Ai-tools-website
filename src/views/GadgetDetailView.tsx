import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Share2,
  Bookmark,
  Info,
  ChevronRight,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Battery,
  Wifi,
  Smartphone,
  Scale,
  Maximize2,
  Clock,
  ThumbsUp,
  Tag,
  Copy,
  CheckCheck,
  ShoppingBag
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getGadgetBySlug, getRelatedGadgets, AIGadget } from '../data/gadgetsData';
import { copyToClipboard } from '../utils/clipboard';
import { useApp } from '../context/AppContext';
import { AdBanner } from '../components/AdBanner';
import { TrustScoreBadge } from '../components/TrustScoreBadge';
import { trackAffiliateClick } from '../utils/analytics';

interface GadgetDetailViewProps {
  slug: string;
}

export const GadgetDetailView: React.FC<GadgetDetailViewProps> = ({ slug }) => {
  const { navigate, showToast } = useApp();
  const gadget = getGadgetBySlug(slug);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  if (!gadget) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <SEOHead
          title="AI Gadget Not Found | AIToolNest"
          description="The requested AI gadget or hardware review could not be found."
          canonicalUrl="https://aitoolnest.com/#/ai-gadgets"
        />
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Info className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            AI Gadget Not Found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            The gadget hardware review you are looking for may have been updated, renamed, or relocated.
          </p>
          <button
            onClick={() => navigate('/ai-gadgets')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Browse All AI Gadgets</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const relatedGadgets = getRelatedGadgets(gadget.id, gadget.category, 3);
  const currentUrl = `https://aitoolnest.com/#/ai-gadgets/${gadget.slug}`;
  const shareTitle = encodeURIComponent(`${gadget.title || gadget.name} Review & Deals`);
  const shareUrl = encodeURIComponent(currentUrl);
  const shareMedia = encodeURIComponent(gadget.image || gadget.imageUrl || '');

  // Social Share Handlers
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnPinterest = () => {
    window.open(
      `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${shareMedia}&description=${shareTitle}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const copyPageLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setIsCopied(true);
      showToast('Product link copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2500);
    } else {
      showToast('Unable to copy link to clipboard');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Structured Data Schema for Google Product Rich Results
  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: gadget.title || gadget.name,
    image: (gadget.gallery && gadget.gallery.length > 0) ? gadget.gallery : (gadget.galleryImages && gadget.galleryImages.length > 0 ? gadget.galleryImages : [gadget.image || gadget.imageUrl]),
    description: gadget.description || gadget.shortReview,
    brand: {
      '@type': 'Brand',
      name: gadget.brand
    },
    sku: gadget.id,
    mpn: gadget.id,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gadget.rating,
      reviewCount: gadget.reviews || gadget.reviewsCount,
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      url: gadget.affiliateLink || gadget.affiliateUrl,
      priceCurrency: 'USD',
      price: (gadget.numericPrice || parseFloat(String(gadget.price || '').replace(/[^0-9.]/g, '')) || 49.99).toFixed(2),
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: gadget.merchant
      }
    }
  };

  const imagesList = (gadget.gallery && gadget.gallery.length > 0)
    ? gadget.gallery
    : (gadget.galleryImages && gadget.galleryImages.length > 0 ? gadget.galleryImages : [gadget.image || gadget.imageUrl || '']);

  return (
    <div className="space-y-12 pb-24">
      <SEOHead
        title={`${gadget.title || gadget.name} Review & Live Deals (2026) | AIToolNest`}
        description={`${gadget.description || gadget.shortReview} In-depth hands-on review, pros & cons, full specifications, and verified deals on ${gadget.merchant}.`}
        canonicalUrl={currentUrl}
        schemaData={productSchema}
      />

      {/* Header Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: 'AI Gadgets & Marketplace', path: '/ai-gadgets' },
            { label: gadget.name }
          ]}
        />
      </div>

      {/* Main Product Hero Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery with Glassmorphism */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl bg-slate-900/5 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md overflow-hidden shadow-lg group">
              <img
                src={imagesList[activeImageIndex] || gadget.imageUrl}
                alt={gadget.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

              {/* Badges on Top-Left */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {gadget.badge && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 ${
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
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-slate-950 shadow-md flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>{gadget.discountPercentage}</span>
                  </span>
                )}
              </div>

              {/* Merchant Label on Top-Right */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                  {gadget.categoryLabel}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-indigo-600 shadow-md scale-105'
                        : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${gadget.name} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Specs Pill Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-center">
                <Battery className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Battery</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {(gadget.specifications?.['Battery Life'] || gadget.specs?.batteryLife || 'Standard').split('(')[0].trim()}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-center">
                <Cpu className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">AI Processor</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {(gadget.specifications?.['AI Chipset'] || gadget.specs?.aiChipset || 'AI Co-Processor').split(' ')[0]}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-center">
                <Wifi className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">Wireless</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {(gadget.specifications?.['Connectivity'] || gadget.specs?.connectivity || 'Wireless').split(',')[0]}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md text-center">
                <Smartphone className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">System</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">
                  {(gadget.specifications?.['Compatibility'] || gadget.specs?.compatibility || 'Multi-platform').split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pricing, & Action CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                <span>Brand: {gadget.brand}</span>
                <span>•</span>
                <span>Verified Stock</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] leading-tight tracking-tight">
                {gadget.title || gadget.name}
              </h1>

              {/* Rating stars & verified review counts */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(gadget.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'fill-slate-200 dark:fill-slate-800 text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {gadget.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-slate-400">
                  ({(gadget.reviews || gadget.reviewsCount || 0).toLocaleString()} verified customer reviews)
                </span>
              </div>
            </div>

            {/* Price Card with Savings */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-xl space-y-4">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Deal Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-['Space_Grotesk']">
                      {gadget.price}
                    </span>
                    {gadget.originalPrice && (
                      <span className="text-lg text-slate-400 line-through font-mono">
                        {gadget.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {gadget.savingsAmount && (
                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{gadget.savingsAmount}</span>
                  </div>
                )}
              </div>

              {/* Affiliate Disclosure Box Above the Button */}
              <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Affiliate Disclosure:</strong> When you purchase through this link, we may earn an affiliate commission at no extra cost to you. Tested and selected for verified performance.
                </p>
              </div>

              {/* Primary "Check Price" Affiliate Link Button */}
              <div className="space-y-2">
                <a
                  href={gadget.affiliateLink || gadget.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  onClick={() =>
                    trackAffiliateClick(
                      gadget.title || gadget.name,
                      gadget.merchant || 'AliExpress',
                      gadget.affiliateLink || gadget.affiliateUrl,
                      gadget.price
                    )
                  }
                  className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 active:scale-[0.99] text-white font-black text-base rounded-2xl shadow-xl shadow-orange-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer group text-center"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Check Live Price on {gadget.merchant}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    AliExpress Buyer Protection Included
                  </span>
                  <span>Tracked Global Shipping</span>
                </div>
              </div>

              {/* Trust Score Compact Pill */}
              <TrustScoreBadge variant="product-card" className="mt-2" />

              {/* Social Share & Pinterest Share Suite */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Share This AI Gadget Deal:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {/* Pinterest Pin Button */}
                  <button
                    onClick={shareOnPinterest}
                    title="Pin on Pinterest"
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.365-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                    <span>Pin It</span>
                  </button>

                  {/* Twitter / X */}
                  <button
                    onClick={shareOnTwitter}
                    title="Share on X (Twitter)"
                    className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>X / Post</span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={shareOnLinkedIn}
                    title="Share on LinkedIn"
                    className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>LinkedIn</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={shareOnFacebook}
                    title="Share on Facebook"
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <span>Facebook</span>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={copyPageLink}
                    title="Copy direct product link"
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {isCopied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editorial Short Review Summary */}
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Editor&apos;s Fast Take
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {gadget.shortReview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* In-Depth Hands-On Review & Verdict */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Hands-On Evaluation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              Why We Recommend The {gadget.name}
            </h2>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>{gadget.fullReview}</p>
          </div>

          {/* Editorial Verdict Callout */}
          <div className="p-5 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <ThumbsUp className="w-4 h-4" />
              <span>AIToolNest Editorial Verdict</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              &ldquo;{gadget.verdict}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-Side Pros & Cons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pros */}
          <div className="p-7 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-base font-['Space_Grotesk']">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3>What We Loved (Pros)</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {gadget.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="p-7 rounded-3xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 backdrop-blur-md space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-base font-['Space_Grotesk']">
              <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center">
                <X className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </div>
              <h3>Considerations (Cons)</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {gadget.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            Complete Product Specifications
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries(gadget.specifications || gadget.specs || {}).map(([key, value], sIdx, arr) => (
                  <tr
                    key={key}
                    className={sIdx < arr.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}
                  >
                    <th className="py-3.5 pr-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/3">
                      {key}
                    </th>
                    <td className="py-3.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Features & What's In The Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Features */}
          <div className="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md space-y-4 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              Key Features & Capabilities
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {gadget.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* In The Box */}
          <div className="p-7 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md space-y-4 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              What&apos;s Included In The Box
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {gadget.inTheBox && gadget.inTheBox.length > 0 ? (
                gadget.inTheBox.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-400">Standard retail accessories & documentation included.</li>
              )}
            </ul>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={gadget.affiliateLink || gadget.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Check Availability & Color Options</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Accordions) */}
      {((gadget.FAQ && gadget.FAQ.length > 0) || (gadget.faqs && gadget.faqs.length > 0)) && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              Frequently Asked Questions About The {gadget.brand} {gadget.title || gadget.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Real answers to common buyer questions regarding battery, subscriptions, and compatibility.
            </p>
          </div>

          <div className="space-y-3">
            {(gadget.FAQ || gadget.faqs || []).map((faq, idx) => {
              const isOpen = openFaqIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className="bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                  >
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Products Carousel / Grid */}
      {relatedGadgets.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
                Related AI Gadgets & Hardware
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore similar devices in {gadget.categoryLabel || 'same'} and adjacent categories.
              </p>
            </div>
            <button
              onClick={() => navigate('/ai-gadgets')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedGadgets.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 dark:bg-slate-900/80 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div
                    onClick={() => navigate(`/ai-gadgets/${item.slug}`)}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    <img
                      src={item.image || item.imageUrl}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {item.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white shadow-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <span className="text-[11px] font-semibold text-slate-300">{item.brand}</span>
                      <span className="text-base font-black text-emerald-400 font-['Space_Grotesk']">{item.price}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{item.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({(item.reviews || item.reviewsCount || 0).toLocaleString()})</span>
                    </div>
                    <h4
                      onClick={() => navigate(`/ai-gadgets/${item.slug}`)}
                      className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {item.title || item.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.description || item.shortReview}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate(`/ai-gadgets/${item.slug}`)}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
                    >
                      View Specs
                    </button>
                    <a
                      href={item.affiliateLink || item.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-1 shadow-xs"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Verified Live Deal</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-['Space_Grotesk']">
            {gadget.price}
          </span>
        </div>
        <a
          href={gadget.affiliateLink || gadget.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          onClick={() =>
            trackAffiliateClick(
              gadget.title || gadget.name,
              gadget.merchant || 'AliExpress',
              gadget.affiliateLink || gadget.affiliateUrl,
              gadget.price
            )
          }
          className="py-2.5 px-5 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Check Price on {gadget.merchant}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
