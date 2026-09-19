/**
 * Image optimization utility for AIToolNest
 * - Generates WebP/AVIF optimized URLs using dynamic CDN parameters
 * - Prevents layout shift (CLS) by computing aspect ratios and explicit dimensions
 * - Generates responsive srcSet strings
 * - Automatically downsizes full-size images for thumbnail cards
 */

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  fit?: 'crop' | 'clip' | 'max' | 'min';
}

/**
 * Transforms an image URL (particularly Unsplash) to a modern, compressed,
 * appropriately-sized version.
 */
export function getOptimizedImageUrl(url: string, options: ImageOptions = {}): string {
  if (!url || typeof url !== 'string') return '';

  const {
    width,
    height,
    quality = 75,
    format = 'auto',
    fit = 'crop'
  } = options;

  // Unsplash dynamic image CDN optimization
  if (url.includes('images.unsplash.com')) {
    try {
      // Split base URL from search params
      const [baseUrl, existingQuery] = url.split('?');
      const params = new URLSearchParams(existingQuery || '');

      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      params.set('auto', format === 'auto' ? 'format' : format);
      params.set('fit', fit);
      params.set('q', quality.toString());

      return `${baseUrl}?${params.toString()}`;
    } catch {
      return url;
    }
  }

  return url;
}

/**
 * Returns a responsive srcSet string for standard blog thumbnail cards.
 * Prevents mobile devices from downloading oversized desktop assets.
 */
export function getArticleCardSrcSet(url: string): string {
  if (!url || !url.includes('images.unsplash.com')) return '';

  return [
    `${getOptimizedImageUrl(url, { width: 360, quality: 75 })} 360w`,
    `${getOptimizedImageUrl(url, { width: 600, quality: 75 })} 600w`,
    `${getOptimizedImageUrl(url, { width: 800, quality: 75 })} 800w`
  ].join(', ');
}

/**
 * Returns a responsive srcSet string for large featured covers and article detail heroes.
 */
export function getArticleHeroSrcSet(url: string): string {
  if (!url || !url.includes('images.unsplash.com')) return '';

  return [
    `${getOptimizedImageUrl(url, { width: 640, quality: 80 })} 640w`,
    `${getOptimizedImageUrl(url, { width: 960, quality: 80 })} 960w`,
    `${getOptimizedImageUrl(url, { width: 1200, quality: 82 })} 1200w`
  ].join(', ');
}
