import { RawProductInput } from '../types/product';

/**
 * ============================================================================
 * 🛒 AFFILIATE PRODUCT PORTAL - SINGLE DATA FILE
 * ============================================================================
 *
 * This is the ONLY file you need to edit to add or manage products in future!
 * NO CODING REQUIRED AFTER THIS.
 *
 * 📌 HOW TO ADD A PRODUCT:
 * Simply paste an object into the PRODUCTS array below with these 5 fields:
 *
 *   {
 *     Product: "Your Product Name Here",
 *     Description: "Write or paste the product description here...",
 *     'AliExpress Affiliate Link': "https://s.click.aliexpress.com/e/_your_link",
 *     Image: "https://your-image-url.com/image.jpg",
 *     Price: "$49.99"
 *   },
 *
 * ⚡ WHAT THE SYSTEM AUTOMATICALLY ENRICHES FOR YOU (Zero Coding):
 *   1. Product Name          -> Extracted and formatted
 *   2. Slug                  -> Auto-generated URL-safe path (e.g. /product/your-product-name)
 *   3. Category              -> Smartly auto-categorized based on title & keywords
 *   4. Description           -> Formatted for the product page
 *   5. Short Description     -> Auto-summarized for cards and previews
 *   6. Image                 -> Primary high-res display image
 *   7. Gallery               -> Multi-angle photo gallery
 *   8. Price                 -> Formatted with currency
 *   9. Original Price        -> Auto-calculated retail comparison price
 *   10. Rating               -> Realistic 4.6 - 4.9 star rating
 *   11. Reviews              -> Realistic review count
 *   12. Badge                -> 'Best Seller', 'Top Rated', 'Editor's Choice', etc.
 *   13. Specifications       -> Connectivity, Battery, Dimensions, Compatibility, etc.
 *   14. Features             -> Salient feature highlights
 *   15. Pros                 -> Positive advantages
 *   16. Cons                 -> Honest buyer considerations (shipping time, etc.)
 *   17. FAQ                  -> Frequently Asked Questions (warranty, returns, etc.)
 *   18. Merchant             -> 'AliExpress'
 *   19. Affiliate Link       -> Wired directly to every Check Price button
 *
 * (Optional overrides: You can also manually specify 'Category', 'Rating', 'Badge', 
 * 'Gallery', 'Specifications', 'Pros', 'Cons', or 'FAQ' if you ever want custom values.)
 * ============================================================================
 */

export const PRODUCTS: RawProductInput[] = [
  /* 
   * Example (Uncomment or add your items below):
   * 
   * {
   *   Product: "Ray-Ban Meta Smart Audio Glasses",
   *   Description: "Next-generation smart eyewear with 12MP ultra-wide camera, open-ear audio, and Meta AI.",
   *   'AliExpress Affiliate Link': "https://s.click.aliexpress.com/e/_exampleLink",
   *   Image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
   *   Price: "$299.00"
   * }
   */
];

export * from '../types/product';
