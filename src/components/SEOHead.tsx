import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  schemaData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  schemaData
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = `${title} | AIToolNest`;
    document.title = fullTitle;

    // Helper to update or create standard name meta tags
    const updateOrCreateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Helper to update or create property meta tags (OG)
    const updateOrCreateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateOrCreateMetaName('description', description);

    // Open Graph tags
    updateOrCreateMetaProperty('og:site_name', 'AIToolNest');
    updateOrCreateMetaProperty('og:title', fullTitle);
    updateOrCreateMetaProperty('og:description', description);
    updateOrCreateMetaProperty('og:type', ogType);
    updateOrCreateMetaProperty('og:image', ogImage);
    if (canonicalUrl) {
      updateOrCreateMetaProperty('og:url', canonicalUrl);
    }

    // Twitter Card tags
    updateOrCreateMetaName('twitter:card', 'summary_large_image');
    updateOrCreateMetaName('twitter:site', '@AIToolNest');
    updateOrCreateMetaName('twitter:title', fullTitle);
    updateOrCreateMetaName('twitter:description', description);
    updateOrCreateMetaName('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Structured JSON-LD Schema
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Combine custom schema with default Organization schema
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AIToolNest',
      url: 'https://aitoolnest.com',
      logo: 'https://aitoolnest.com/logo.png',
      description: 'The premier AI tools discovery directory, digital products, and business automation hub.',
      sameAs: [
        'https://twitter.com/AIToolNest',
        'https://linkedin.com/company/aitoolnest',
        'https://github.com/aitoolnest'
      ]
    };

    const finalSchema = schemaData
      ? Array.isArray(schemaData)
        ? [orgSchema, ...schemaData]
        : [orgSchema, schemaData]
      : orgSchema;

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(finalSchema);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('json-ld-schema');
      if (s) {
        s.remove();
      }
    };
  }, [title, description, canonicalUrl, ogType, ogImage, schemaData]);

  return null;
};
