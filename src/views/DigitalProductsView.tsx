import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, Filter, Sparkles, Download, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DigitalProductCard } from '../components/DigitalProductCard';
import { AdBanner } from '../components/AdBanner';

export const DigitalProductsView: React.FC = () => {
  const { digitalProducts } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'prompts', label: 'AI Prompt Packs' },
    { id: 'notion', label: 'Notion Templates' },
    { id: 'canva', label: 'Canva Templates' },
    { id: 'ebooks', label: 'Guides & Ebooks' },
    { id: 'templates', label: 'Spreadsheet & Code Kits' }
  ];

  const filteredProducts = useMemo(() => {
    return digitalProducts.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (selectedFormat !== 'all' && p.format !== selectedFormat) {
        return false;
      }
      return true;
    });
  }, [digitalProducts, selectedCategory, selectedFormat]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Digital Products, AI Prompt Packs & Notion Templates"
        description="Premium commercial digital product assets: 5,000+ ChatGPT prompts, Solopreneur Notion systems, Canva pin templates, and monetization ebooks with instant downloads."
        canonicalUrl="https://aitoolnest.com/#/digital-products"
      />

      <Breadcrumbs items={[{ label: 'Digital Products & Templates' }]} />

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
          <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
          <span>Commercial License Included</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          Digital Products & Creator Templates
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Instantly downloadable productivity systems, verified AI prompt vaults, Notion workspaces, and Pinterest Canva packs to accelerate your workflow.
        </p>
      </div>

      {/* Trust & Guarantee highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Download className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Instant Download & Lifetime Updates</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Commercial Rights: Rebrand & Resell</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>30-Day Money Back Guarantee</span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <DigitalProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Monetization Ad */}
      <AdBanner format="horizontal-leaderboard" />
    </div>
  );
};
