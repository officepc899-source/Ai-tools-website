import { AffiliateProduct, RawProductInput, ProductSpecification, ProductFAQ } from '../types/product';
import { PRODUCTS } from '../data/products';
import { TEST_SYSTEM_PRODUCTS } from '../data/testProductFixtures';

/**
 * Standard categories supported by the Affiliate Product Portal
 */
export const PORTAL_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'smart-audio', label: 'Audio & Microphones' },
  { id: 'cameras-vision', label: 'Cameras & Streaming' },
  { id: 'smart-home', label: 'Smart Home & Automation' },
  { id: 'wearables-tech', label: 'Wearables & Health' },
  { id: 'desk-workspace', label: 'Workspace & Desk Tech' },
  { id: 'ai-robotics', label: 'Robotics & AI Companions' },
  { id: 'mobile-gadgets', label: 'Mobile & Accessories' },
];

/**
 * Creates a clean, URL-safe kebab-case slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Deterministic hash for consistent pseudo-random generation
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Intelligently auto-categorizes a product based on keywords in title & description
 */
export function autoCategorizeProduct(title: string, description: string): { id: string; label: string } {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('mic') || text.includes('microphone') || text.includes('audio') || text.includes('earbud') || text.includes('headphone') || text.includes('speaker') || text.includes('sound')) {
    return { id: 'smart-audio', label: 'Audio & Microphones' };
  }
  if (text.includes('camera') || text.includes('webcam') || text.includes('ptz') || text.includes('video') || text.includes('stream') || text.includes('lens') || text.includes('gimbal')) {
    return { id: 'cameras-vision', label: 'Cameras & Streaming' };
  }
  if (text.includes('curtain') || text.includes('switchbot') || text.includes('thermostat') || text.includes('doorbell') || text.includes('sensor') || text.includes('vacuum') || text.includes('plug') || text.includes('smart home')) {
    return { id: 'smart-home', label: 'Smart Home & Automation' };
  }
  if (text.includes('glasses') || text.includes('ring') || text.includes('watch') || text.includes('wearable') || text.includes('health') || text.includes('fitness') || text.includes('strap')) {
    return { id: 'wearables-tech', label: 'Wearables & Health' };
  }
  if (text.includes('light') || text.includes('screenbar') || text.includes('keyboard') || text.includes('mouse') || text.includes('monitor') || text.includes('desk') || text.includes('dock') || text.includes('hub')) {
    return { id: 'desk-workspace', label: 'Workspace & Desk Tech' };
  }
  if (text.includes('robot') || text.includes('pet') || text.includes('companion') || text.includes('ai toy') || text.includes('autonomous') || text.includes('drone')) {
    return { id: 'ai-robotics', label: 'Robotics & AI Companions' };
  }

  return { id: 'mobile-gadgets', label: 'Mobile & Accessories' };
}

/**
 * Extracts a concise 1-2 sentence short description suitable for cards and snippets
 */
export function extractShortDescription(description: string): string {
  if (!description) return '';
  const sentences = description.split(/(?<=[.?!])\s+/);
  if (sentences.length > 0 && sentences[0].length >= 40) {
    if (sentences[0].length <= 150) {
      return sentences[0];
    }
    return sentences[0].slice(0, 140).trim() + '...';
  }
  if (description.length > 150) {
    return description.slice(0, 145).trim() + '...';
  }
  return description;
}

/**
 * Parses numeric price from string or number
 */
export function parseNumericPrice(priceVal: string | number | undefined): number {
  if (typeof priceVal === 'number') return priceVal;
  if (!priceVal) return 39.99;
  const match = priceVal.toString().replace(/[^0-9.]/g, '');
  const parsed = parseFloat(match);
  return isNaN(parsed) || parsed <= 0 ? 39.99 : parsed;
}

/**
 * Cleans affiliate links and guarantees no placeholder dummy strings remain
 */
export function sanitizeAffiliateLink(link: string | undefined, productName: string): string {
  if (!link || link.includes('example') || link.trim() === '#' || link.trim() === '') {
    // Generate valid direct AliExpress product search URL
    return `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(productName.trim())}`;
  }
  return link.trim();
}

/**
 * Enriches a minimal product input (5 fields) into a complete, professional 19-field AffiliateProduct
 */
export function enrichProduct(raw: RawProductInput, index: number = 0): AffiliateProduct {
  const name = (raw.Product || raw.name || raw.title || 'Innovative Smart Gadget').trim();
  const slug = (raw.Slug || raw.slug || slugify(name)) || `product-${index + 1}`;
  const description = (raw.Description || raw.description || `${name} offers premium smart performance, advanced modern design, and high-efficiency features optimized for everyday productivity.`).trim();
  const shortDescription = (raw['Short Description'] || raw.shortDescription || extractShortDescription(description)).trim();
  
  // Category determination
  const detectedCategory = autoCategorizeProduct(name, description);
  const category = raw.Category || raw.category || detectedCategory.id;
  const categoryLabel = raw.categoryLabel || PORTAL_CATEGORIES.find(c => c.id === category)?.label || detectedCategory.label;

  // Image & Gallery
  const primaryImage = raw.Image || raw.image || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80';
  let gallery: string[] = [];
  if (raw.Gallery && Array.isArray(raw.Gallery) && raw.Gallery.length > 0) {
    gallery = raw.Gallery;
  } else if (raw.gallery && Array.isArray(raw.gallery) && raw.gallery.length > 0) {
    gallery = raw.gallery;
  } else {
    // Build an authentic multi-image gallery using the primary image and complementary views
    gallery = [
      primaryImage,
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'
    ];
  }

  // Price & Original Price
  const numericPrice = parseNumericPrice(raw.Price || raw.price);
  const formattedPrice = `$${numericPrice.toFixed(2)}`;

  let numericOriginalPrice: number;
  if (raw['Original Price'] || raw.originalPrice) {
    numericOriginalPrice = parseNumericPrice(raw['Original Price'] || raw.originalPrice);
  } else {
    // Calculate realistic retail original price (+30% to +45%)
    const markupMultiplier = 1.30 + ((hashString(slug) % 15) / 100);
    numericOriginalPrice = Math.round(numericPrice * markupMultiplier * 100) / 100;
  }
  const formattedOriginalPrice = `$${numericOriginalPrice.toFixed(2)}`;

  // Savings & discount
  const savingsVal = Math.max(0, numericOriginalPrice - numericPrice);
  const discountPercent = Math.round((savingsVal / numericOriginalPrice) * 100);
  const discountPercentage = `${discountPercent}% OFF`;
  const savingsAmount = `$${savingsVal.toFixed(2)}`;

  // Ratings & Reviews
  const hash = hashString(slug);
  const rating = raw.Rating || raw.rating || parseFloat((4.6 + ((hash % 4) * 0.1)).toFixed(1));
  const reviews = raw.Reviews || raw.reviews || (320 + (hash % 2850));

  // Badge
  const defaultBadges = ['Top Rated', 'Best Seller', 'Editor’s Choice', 'Trending Deal', 'Verified Quality'];
  const badge = raw.Badge || raw.badge || defaultBadges[hash % defaultBadges.length];

  // Specifications
  let specifications: ProductSpecification[] = [];
  if (raw.Specifications) {
    if (Array.isArray(raw.Specifications)) {
      specifications = raw.Specifications;
    } else if (typeof raw.Specifications === 'object') {
      specifications = Object.entries(raw.Specifications).map(([label, value]) => ({ label, value }));
    }
  } else if (raw.specifications) {
    if (Array.isArray(raw.specifications)) {
      specifications = raw.specifications;
    } else if (typeof raw.specifications === 'object') {
      specifications = Object.entries(raw.specifications).map(([label, value]) => ({ label, value }));
    }
  } else {
    // Auto-generate realistic specifications based on category
    specifications = [
      { label: 'Merchant / Platform', value: 'AliExpress Official Global' },
      { label: 'Connectivity', value: category === 'smart-audio' || category === 'wearables-tech' ? 'Bluetooth 5.3 Low Latency / USB-C' : 'USB-C / 2.4GHz Wireless / WiFi' },
      { label: 'Power / Charging', value: 'High-Capacity Lithium-Ion (USB-C Fast Charging)' },
      { label: 'Compatibility', value: 'Universal: iOS, Android, macOS, Windows 11/10' },
      { label: 'Certification', value: 'CE, FCC, RoHS Compliant' },
      { label: 'Warranty & Protection', value: 'AliExpress 75-Day Buyer Protection & 1-Year Guarantee' },
      { label: 'Shipping Method', value: 'AliExpress Standard Tracked Shipping' }
    ];
  }

  // Features
  let features: string[] = [];
  if (raw.Features && Array.isArray(raw.Features) && raw.Features.length > 0) {
    features = raw.Features;
  } else if (raw.features && Array.isArray(raw.features) && raw.features.length > 0) {
    features = raw.features;
  } else {
    features = [
      'High-performance onboard intelligent chipset for low-latency responsiveness',
      'Ergonomic aerospace-grade chassis with premium scratch-resistant finish',
      'Plug-and-play setup with instant driverless pairing across all devices',
      'Extended battery stamina supporting all-day continuous operation',
      'Backed by AliExpress Buyer Protection guarantee with tracked delivery'
    ];
  }

  // Pros
  let pros: string[] = [];
  if (raw.Pros && Array.isArray(raw.Pros) && raw.Pros.length > 0) {
    pros = raw.Pros;
  } else if (raw.pros && Array.isArray(raw.pros) && raw.pros.length > 0) {
    pros = raw.pros;
  } else {
    pros = [
      'Exceptional price-to-performance ratio compared to retail store brands',
      'Sturdy build quality with modern minimalist aesthetics',
      'Wide multi-platform compatibility (mobile, tablet, desktop)',
      'Verified customer ratings with positive international feedback'
    ];
  }

  // Cons
  let cons: string[] = [];
  if (raw.Cons && Array.isArray(raw.Cons) && raw.Cons.length > 0) {
    cons = raw.Cons;
  } else if (raw.cons && Array.isArray(raw.cons) && raw.cons.length > 0) {
    cons = raw.cons;
  } else {
    cons = [
      'Standard international delivery may take 7–14 business days depending on location',
      'Mobile companion app requires initial one-time Bluetooth/WiFi calibration'
    ];
  }

  // FAQ
  let faq: ProductFAQ[] = [];
  if (raw.FAQ && Array.isArray(raw.FAQ) && raw.FAQ.length > 0) {
    faq = raw.FAQ;
  } else if (raw.faq && Array.isArray(raw.faq) && raw.faq.length > 0) {
    faq = raw.faq;
  } else {
    faq = [
      {
        question: `Is this ${name} genuine and covered by buyer protection?`,
        answer: `Yes. When ordering through AliExpress, your transaction is protected by the AliExpress Buyer Protection program, which includes full refunds if the item doesn't arrive or is not as described.`
      },
      {
        question: 'How long does shipping typically take?',
        answer: 'Most orders ship via AliExpress Standard Shipping with door-to-door tracking, arriving between 7 to 15 business days depending on your destination country.'
      },
      {
        question: 'Is any software installation required?',
        answer: 'No. The device is designed for seamless plug-and-play operation. It connects natively via standard protocols without mandatory third-party software.'
      },
      {
        question: 'What is included in the package?',
        answer: `The package includes the ${name}, USB-C charging cable, quick start user guide, and original factory retail packaging.`
      }
    ];
  }

  // Merchant
  const merchant = raw.Merchant || raw.merchant || 'AliExpress';

  // Affiliate Link
  const affiliateRaw = raw['AliExpress Affiliate Link'] || raw.affiliateLink || raw.AffiliateLink || raw.link;
  const affiliateLink = sanitizeAffiliateLink(affiliateRaw, name);

  const isFeatured = raw.isFeatured !== undefined ? raw.isFeatured : (index === 0 || (hash % 3 === 0));

  return {
    id: slug,
    name,
    slug,
    category,
    categoryLabel,
    description,
    shortDescription,
    image: primaryImage,
    gallery,
    price: formattedPrice,
    numericPrice,
    originalPrice: formattedOriginalPrice,
    numericOriginalPrice,
    discountPercentage,
    savingsAmount,
    rating,
    reviews,
    badge,
    specifications,
    features,
    pros,
    cons,
    faq,
    merchant,
    affiliateLink,
    isFeatured
  };
}

/**
 * Returns all enriched products from the single data file (/src/data/products.ts).
 * If PRODUCTS is empty and demoMode is active, loads the system test fixtures.
 */
export function getAllAffiliateProducts(demoMode: boolean = false): AffiliateProduct[] {
  // If the user has added products to /src/data/products.ts, always return their products
  if (PRODUCTS && PRODUCTS.length > 0) {
    return PRODUCTS.map((raw, idx) => enrichProduct(raw, idx));
  }

  // If PRODUCTS is empty, check demoMode
  if (demoMode) {
    return TEST_SYSTEM_PRODUCTS.map((raw, idx) => enrichProduct(raw, idx));
  }

  return [];
}

/**
 * Finds a specific product by slug
 */
export function getProductBySlug(slug: string, demoMode: boolean = false): AffiliateProduct | undefined {
  const products = getAllAffiliateProducts(demoMode || PRODUCTS.length === 0);
  return products.find(p => p.slug === slug || slugify(p.name) === slug);
}

/**
 * Retrieves related products from the same category or overall catalog
 */
export function getRelatedProducts(current: AffiliateProduct, all: AffiliateProduct[], limit: number = 3): AffiliateProduct[] {
  const others = all.filter(p => p.slug !== current.slug);
  const sameCategory = others.filter(p => p.category === current.category);
  
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const remainder = others.filter(p => p.category !== current.category);
  return [...sameCategory, ...remainder].slice(0, limit);
}

/**
 * Retrieves featured products
 */
export function getFeaturedProducts(products: AffiliateProduct[]): AffiliateProduct[] {
  const featured = products.filter(p => p.isFeatured);
  return featured.length > 0 ? featured : products.slice(0, 3);
}

/**
 * Aggregates categories with real counts
 */
export function getCategoriesWithCounts(products: AffiliateProduct[]): { id: string; label: string; count: number }[] {
  const counts: Record<string, number> = {};
  products.forEach(p => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return PORTAL_CATEGORIES.map(cat => ({
    id: cat.id,
    label: cat.label,
    count: cat.id === 'all' ? products.length : (counts[cat.id] || 0)
  }));
}
