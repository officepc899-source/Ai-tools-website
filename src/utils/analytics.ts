/**
 * ============================================================================
 * 📊 GOOGLE ANALYTICS 4 & GOOGLE TAG MANAGER TRACKING UTILITY
 * ============================================================================
 * Provides type-safe event tracking for:
 *  - Page Views
 *  - AliExpress & Software Affiliate Link Clicks (Crucial for earning & conversion rate)
 *  - Google AdSense / Sponsor Impressions & Clicks
 *  - Search queries & filters
 *  - Newsletter conversions
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {}
): void => {
  try {
    // 1. Send to GA4 via gtag
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }

    // 2. Send to Google Tag Manager via dataLayer
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
        timestamp: new Date().toISOString()
      });
    }

    // Debugging in development mode only
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics Event] ${eventName}:`, eventParams);
    }
  } catch (err) {
    console.warn('[Analytics Error]', err);
  }
};

/**
 * Track an affiliate click (AliExpress, Amazon, SaaS tool)
 * This is the highest-value monetization event.
 */
export const trackAffiliateClick = (
  productName: string,
  merchant: string = 'AliExpress',
  affiliateUrl: string,
  price?: string | number
): void => {
  trackEvent('click_affiliate_link', {
    item_name: productName,
    merchant_name: merchant,
    destination_url: affiliateUrl,
    value: typeof price === 'number' ? price : parseFloat(String(price || '').replace(/[^0-9.]/g, '')) || 0,
    currency: 'USD'
  });
};

/**
 * Track Page Views for SPA Hash Routing
 */
export const trackPageView = (path: string, pageTitle?: string): void => {
  trackEvent('page_view', {
    page_path: path,
    page_title: pageTitle || document.title,
    page_location: window.location.href
  });
};

/**
 * Track Search Queries
 */
export const trackSearch = (query: string, resultCount?: number): void => {
  if (!query.trim()) return;
  trackEvent('search', {
    search_term: query.trim(),
    results_count: resultCount
  });
};

/**
 * Track Newsletter Signups
 */
export const trackNewsletterSignup = (source: string = 'footer'): void => {
  trackEvent('sign_up', {
    method: 'email_newsletter',
    source
  });
};

/**
 * Track Ad Clicks & Engagements
 */
export const trackAdClick = (adUnit: string, sponsorOrTitle: string): void => {
  trackEvent('ad_click', {
    ad_unit: adUnit,
    sponsor: sponsorOrTitle
  });
};
