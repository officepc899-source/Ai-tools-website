export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

/**
 * The 5 minimal fields the user will manually add to /src/data/products.ts
 * No coding is required; the system automatically enriches everything else.
 * Optional fields can also be provided if the user wishes to override any auto-generated value.
 */
export interface RawProductInput {
  // 1. Product Name (or name / title)
  Product?: string;
  name?: string;
  title?: string;

  // 2. Description
  Description?: string;
  description?: string;

  // 3. AliExpress Affiliate Link
  'AliExpress Affiliate Link'?: string;
  affiliateLink?: string;
  AffiliateLink?: string;
  link?: string;

  // 4. Image URL
  Image?: string;
  image?: string;

  // 5. Price (e.g. "$49.99" or "49.99")
  Price?: string | number;
  price?: string | number;

  // Optional overrides (all automatically computed if omitted):
  Slug?: string;
  slug?: string;
  Category?: string;
  category?: string;
  categoryLabel?: string;
  'Short Description'?: string;
  shortDescription?: string;
  Gallery?: string[];
  gallery?: string[];
  'Original Price'?: string | number;
  originalPrice?: string | number;
  Rating?: number;
  rating?: number;
  Reviews?: number;
  reviews?: number;
  Badge?: string;
  badge?: string;
  Specifications?: Record<string, string> | ProductSpecification[];
  specifications?: Record<string, string> | ProductSpecification[];
  Features?: string[];
  features?: string[];
  Pros?: string[];
  pros?: string[];
  Cons?: string[];
  cons?: string[];
  FAQ?: ProductFAQ[];
  faq?: ProductFAQ[];
  Merchant?: string;
  merchant?: string;
  isFeatured?: boolean;
}

/**
 * Fully enriched Affiliate Product structure supporting all 19 requirements:
 * 1. Product Name
 * 2. Slug
 * 3. Category
 * 4. Description
 * 5. Short Description
 * 6. Image
 * 7. Gallery
 * 8. Price
 * 9. Original Price
 * 10. Rating
 * 11. Reviews
 * 12. Badge
 * 13. Specifications
 * 14. Features
 * 15. Pros
 * 16. Cons
 * 17. FAQ
 * 18. Merchant
 * 19. Affiliate Link
 */
export interface AffiliateProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  price: string;
  numericPrice: number;
  originalPrice: string;
  numericOriginalPrice: number;
  discountPercentage: string;
  savingsAmount: string;
  rating: number;
  reviews: number;
  badge: string;
  specifications: ProductSpecification[];
  features: string[];
  pros: string[];
  cons: string[];
  faq: ProductFAQ[];
  merchant: string;
  affiliateLink: string;
  isFeatured: boolean;
}
