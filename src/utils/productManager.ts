import { AIGadget, GadgetCategory, GadgetFAQ } from '../data/gadgetsData';

/**
 * Minimal input format requested by user:
 * You only need to provide these 5 fields to add a complete product:
 * 1. product (title/name)
 * 2. description
 * 3. affiliateLink (AliExpress affiliate link)
 * 4. image
 * 5. price
 */
export interface MinimalProductInput {
  product: string;
  description: string;
  affiliateLink: string;
  image: string;
  price: string | number;

  // Optional overrides if you want to customize further
  id?: string;
  slug?: string;
  category?: GadgetCategory;
  originalPrice?: string | number;
  rating?: number;
  reviews?: number;
  badge?: string;
  pros?: string[];
  cons?: string[];
  specifications?: Record<string, string>;
  FAQ?: GadgetFAQ[];
  featured?: boolean;
}

/**
 * Automatically creates a URL-safe kebab-case slug from a title
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Intelligently auto-categorizes a product based on its title and description keywords
 */
export function autoCategorize(title: string, description: string): GadgetCategory {
  const combined = `${title} ${description}`.toLowerCase();

  if (
    combined.includes('camera') ||
    combined.includes('mic') ||
    combined.includes('microphone') ||
    combined.includes('stream') ||
    combined.includes('podcast') ||
    combined.includes('ring light') ||
    combined.includes('gimbal') ||
    combined.includes('teleprompter') ||
    combined.includes('creator') ||
    combined.includes('audio interface')
  ) {
    return 'creator-gear';
  }

  if (
    combined.includes('keyboard') ||
    combined.includes('mouse') ||
    combined.includes('desk') ||
    combined.includes('monitor') ||
    combined.includes('stand') ||
    combined.includes('dock') ||
    combined.includes('hub') ||
    combined.includes('ergonomic') ||
    combined.includes('chair') ||
    combined.includes('office') ||
    combined.includes('laptop')
  ) {
    return 'office-setup';
  }

  if (
    combined.includes('smart home') ||
    combined.includes('sensor') ||
    combined.includes('plug') ||
    combined.includes('thermostat') ||
    combined.includes('lock') ||
    combined.includes('robot vacuum') ||
    combined.includes('air purifier') ||
    combined.includes('curtain') ||
    combined.includes('security')
  ) {
    return 'smart-home';
  }

  // Default to ai-gadgets (smart glasses, voice recorders, AI companions, wearable tech, translation buds)
  return 'ai-gadgets';
}

/**
 * Format string or number price into standard $XX.XX
 */
export function formatPrice(priceInput: string | number): string {
  if (typeof priceInput === 'number') {
    return `$${priceInput.toFixed(2)}`;
  }
  const clean = priceInput.trim();
  if (clean.startsWith('$')) return clean;
  const num = parseFloat(clean.replace(/[^0-9.]/g, ''));
  if (!isNaN(num)) {
    return `$${num.toFixed(2)}`;
  }
  return clean || '$49.99';
}

/**
 * Auto-computes strike-through retail price (+25% to +35% discount perception)
 */
export function calculateOriginalPrice(priceStr: string, override?: string | number): string {
  if (override) return formatPrice(override);
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  if (isNaN(num) || num <= 0) return '$79.99';
  const markup = num * (1.28 + (num % 5) * 0.02); // 28% to 38% markup
  return `$${markup.toFixed(2)}`;
}

/**
 * Deterministic pseudo-random generator based on product title
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
 * Auto-generates realistic high-converting selling points (Pros)
 */
export function autoGeneratePros(title: string, desc: string, category: GadgetCategory): string[] {
  const combined = `${title} ${desc}`.toLowerCase();
  const pros: string[] = [];

  if (combined.includes('bluetooth') || combined.includes('wireless')) {
    pros.push('Low-latency wireless connectivity with instant pairing');
  } else {
    pros.push('Plug-and-play simplicity with universal device compatibility');
  }

  if (combined.includes('battery') || combined.includes('charge')) {
    pros.push('Extended battery endurance engineered for all-day continuous use');
  } else {
    pros.push('Energy-efficient architecture with rapid USB-C fast charging');
  }

  if (category === 'creator-gear') {
    pros.push('Studio-grade fidelity designed to elevate video and audio production');
  } else if (category === 'office-setup') {
    pros.push('Ergonomic premium construction that declutters your workspace');
  } else if (category === 'smart-home') {
    pros.push('Seamless home automation integration with instant responsive sensors');
  } else {
    pros.push('On-device intelligent processing with near-zero latency');
  }

  pros.push('Verified AliExpress Buyer Protection guarantee with tracked global shipping');
  return pros.slice(0, 4);
}

/**
 * Auto-generates balanced, honest trade-offs (Cons) for editorial trust
 */
export function autoGenerateCons(category: GadgetCategory): string[] {
  if (category === 'creator-gear') {
    return [
      'Included quick-start pamphlet is brief; detailed manual available online',
      'High-demand item; occasional shipping delays during peak promotions'
    ];
  }
  if (category === 'office-setup') {
    return [
      'Takes a few days to adjust if switching from traditional desktop gear',
      'Requires standard USB-C power source for maximum performance'
    ];
  }
  return [
    'Companion mobile app requires periodic firmware updates for new features',
    'Arrives in minimalist protective cardboard box to reduce global shipping footprint'
  ];
}

/**
 * Auto-generates realistic specifications
 */
export function autoGenerateSpecifications(
  title: string,
  desc: string,
  category: GadgetCategory
): Record<string, string> {
  const combined = `${title} ${desc}`.toLowerCase();
  const specs: Record<string, string> = {
    'Power Interface': 'USB Type-C Fast Charge (5V/2A)',
    'Warranty': '1-Year Global Manufacturer Replacement Warranty',
    'Platform Compatibility': 'Universal (iOS, Android, macOS, Windows, Linux)',
    'Certification': 'CE, FCC, RoHS Compliant'
  };

  if (combined.includes('bluetooth') || combined.includes('wireless')) {
    specs['Connectivity'] = 'Bluetooth 5.3 + 2.4GHz Low Latency';
  } else {
    specs['Connectivity'] = 'High-Speed USB-C / Plug-and-Play';
  }

  if (category === 'creator-gear') {
    specs['Signal Resolution'] = '24-bit / 48kHz High-Fidelity DSP';
  } else if (category === 'smart-home') {
    specs['Protocols'] = 'Wi-Fi 2.4GHz / Zigbee 3.0 Compatible';
  }

  return specs;
}

/**
 * Auto-generates buyer FAQs answering AliExpress shipping and returns questions
 */
export function autoGenerateFAQs(title: string): GadgetFAQ[] {
  return [
    {
      question: `Is this ${title} covered under AliExpress Buyer Protection?`,
      answer:
        'Yes. Every purchase through our verified AliExpress partner links includes full AliExpress Buyer Protection, guaranteeing a 100% refund if the product is not delivered or differs from the listing description.'
    },
    {
      question: 'How long does shipping typically take?',
      answer:
        'Most orders ship with AliExpress Choice / Standard Tracked Global Shipping, typically arriving within 7 to 12 business days with door-to-door tracking.'
    },
    {
      question: 'Does this product require a special app or subscription?',
      answer:
        'No monthly subscriptions are required. Core hardware features operate straight out of the box with standard companion apps available free on iOS and Android.'
    }
  ];
}

/**
 * Select a high-converting editorial badge
 */
export function autoSelectBadge(hash: number, priceNum: number): string {
  if (priceNum < 40) return 'Best Value Deal';
  const badges = ["Editor's Choice", 'Trending Tech', 'Best Seller', 'Top Rated 2026', 'Staff Favorite'];
  return badges[hash % badges.length];
}

/**
 * THE CORE AUTO-ENRICHMENT PIPELINE:
 * Transforms 5 basic user fields into a rich, production-grade AIGadget
 * with full SEO, FAQs, specs, pros/cons, reviews, ratings, and gallery!
 */
export function autoEnrichProduct(input: MinimalProductInput, index: number = 0): AIGadget {
  const title = input.product.trim();
  const slug = input.slug || slugify(title);
  const id = input.id || `gadget-${slug}`;
  const price = formatPrice(input.price);
  const originalPrice = calculateOriginalPrice(price, input.originalPrice);
  const priceNum = parseFloat(price.replace(/[^0-9.]/g, '')) || 50;

  const category = input.category || autoCategorize(title, input.description);
  const hash = hashString(title);

  // Deterministic realistic rating between 4.7 and 4.9
  const rating = input.rating || 4.7 + ((hash % 3) / 10);
  // Deterministic reviews between 140 and 2,200
  const reviews = input.reviews || 140 + (hash % 2060);

  const badge = input.badge || autoSelectBadge(hash + index, priceNum);

  const pros = input.pros && input.pros.length > 0 ? input.pros : autoGeneratePros(title, input.description, category);
  const cons = input.cons && input.cons.length > 0 ? input.cons : autoGenerateCons(category);
  const specifications = input.specifications && Object.keys(input.specifications).length > 0
    ? input.specifications
    : autoGenerateSpecifications(title, input.description, category);
  const FAQ = input.FAQ && input.FAQ.length > 0 ? input.FAQ : autoGenerateFAQs(title);

  const gallery = [
    input.image,
    // Add fallback backup views if needed
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  ];

  return {
    id,
    slug,
    title,
    description: input.description,
    image: input.image,
    gallery,
    category,
    price,
    originalPrice,
    rating: parseFloat(rating.toFixed(1)),
    reviews,
    badge,
    affiliateLink: input.affiliateLink,
    merchant: 'AliExpress',
    pros,
    cons,
    specifications,
    FAQ,
    featured: input.featured ?? (index < 6 || hash % 3 === 0)
  };
}

/**
 * Batch enrich an array of minimal product inputs
 */
export function batchEnrichProducts(inputs: MinimalProductInput[]): AIGadget[] {
  return inputs.map((item, idx) => autoEnrichProduct(item, idx));
}

/**
 * Generates Google Rich Snippet Product Schema JSON-LD
 */
export function generateProductJsonLd(product: AIGadget): Record<string, unknown> {
  const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.image, ...product.gallery],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'AliExpress Curated'
    },
    offers: {
      '@type': 'Offer',
      url: product.affiliateLink,
      priceCurrency: 'USD',
      price: priceNum.toFixed(2),
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'AliExpress'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString(),
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/**
 * LocalStorage persistent manager for custom user-added products
 */
const STORAGE_KEY = 'aitoolnest_custom_products_v1';

export function getStoredCustomProducts(): AIGadget[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomProduct(input: MinimalProductInput): AIGadget {
  const enriched = autoEnrichProduct(input);
  try {
    const existing = getStoredCustomProducts();
    const updated = [enriched, ...existing.filter((p) => p.id !== enriched.id && p.slug !== enriched.slug)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to persist custom product', e);
  }
  return enriched;
}

export function saveBulkCustomProducts(inputs: MinimalProductInput[]): AIGadget[] {
  const enrichedList = batchEnrichProducts(inputs);
  try {
    const existing = getStoredCustomProducts();
    const existingMap = new Map(existing.map((p) => [p.slug, p]));
    for (const item of enrichedList) {
      existingMap.set(item.slug, item);
    }
    const combined = Array.from(existingMap.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combined));
  } catch (e) {
    console.error('Failed to persist bulk products', e);
  }
  return enrichedList;
}

export function clearCustomProducts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
