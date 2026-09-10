import React, { useState, useMemo } from 'react';
import {
  Settings,
  Plus,
  Save,
  Trash2,
  DollarSign,
  Link,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Edit2,
  CheckCircle2,
  Eye,
  ShoppingBag,
  Upload,
  Copy,
  Check,
  ExternalLink,
  Cpu,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AITool, PricingType, ToolCategory } from '../types';
import {
  autoEnrichProduct,
  saveCustomProduct,
  saveBulkCustomProducts,
  getStoredCustomProducts,
  clearCustomProducts,
  MinimalProductInput
} from '../utils/productManager';
import { getAllGadgets, AIGadget } from '../data/gadgetsData';

export const AdminView: React.FC = () => {
  const { tools, updateTool, addTool, adsEnabled, setAdsEnabled, showToast, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'aliexpress' | 'tools' | 'monetization'>('aliexpress');

  // Tools editing state
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New tool form state
  const [newToolName, setNewToolName] = useState('');
  const [newToolCategory, setNewToolCategory] = useState<ToolCategory>('writing');
  const [newToolPricingType, setNewToolPricingType] = useState<PricingType>('freemium');
  const [newToolPricingSummary, setNewToolPricingSummary] = useState('Free tier available; Pro starts at $15/mo');
  const [newToolOfficialUrl, setNewToolOfficialUrl] = useState('');
  const [newToolAffiliateUrl, setNewToolAffiliateUrl] = useState('');
  const [newToolDescription, setNewToolDescription] = useState('');

  // --- 5-Field AliExpress Scaler State ---
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productAffiliateLink, setProductAffiliateLink] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productPrice, setProductPrice] = useState('$49.99');

  // Bulk Importer State
  const [bulkInputText, setBulkInputText] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Stored custom items
  const customGadgets = useMemo(() => getStoredCustomProducts(), [refreshKey]);
  const allGadgets = useMemo(() => getAllGadgets(), [refreshKey]);

  // Real-time Preview of the 5-Field Auto-Enricher
  const previewEnriched = useMemo(() => {
    if (!productTitle) return null;
    return autoEnrichProduct({
      product: productTitle,
      description: productDescription || 'High-performance AI hardware peripheral on AliExpress with smart sensors.',
      affiliateLink: productAffiliateLink || `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(productTitle || 'AI Gadget')}`,
      image: productImage || 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
      price: productPrice || '$49.99'
    });
  }, [productTitle, productDescription, productAffiliateLink, productImage, productPrice]);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;
    updateTool(editingTool);
    setEditingTool(null);
    showToast(`Updated "${editingTool.name}" details and pricing!`);
  };

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToolName || !newToolDescription) {
      showToast('Please enter a tool name and description');
      return;
    }

    const slug = newToolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const created: AITool = {
      id: `custom-${Date.now()}`,
      name: newToolName,
      slug,
      tagline: `High-performance ${newToolCategory} solution`,
      description: newToolDescription,
      fullDescription: newToolDescription,
      category: newToolCategory,
      categoryLabel: newToolCategory.toUpperCase(),
      pricingType: newToolPricingType,
      pricingSummary: newToolPricingSummary,
      bestFor: 'Entrepreneurs, content creators, and remote teams',
      officialUrl: newToolOfficialUrl || 'https://example.com',
      affiliateUrl: newToolAffiliateUrl || newToolOfficialUrl || 'https://example.com',
      hasAffiliate: !!newToolAffiliateUrl,
      sponsored: false,
      rating: 4.8,
      reviewsCount: 120,
      iconName: 'Bot',
      iconBg: 'bg-indigo-600',
      keyFeatures: ['Intuitive workspace', 'One-click AI generation', 'Export to PDF and Markdown'],
      pros: ['Fast generation', 'Clean interface'],
      cons: ['Free plan has token limits'],
      pricingPlans: [
        { name: 'Free Tier', price: '$0', billing: 'forever', features: ['Basic features', 'Standard support'] },
        { name: 'Pro Plan', price: '$19', billing: 'monthly', popular: true, features: ['Unlimited usage', 'Priority models', 'API access'] }
      ],
      howToUse: [
        { step: 1, title: 'Sign up', description: 'Create your free account' },
        { step: 2, title: 'Configure', description: 'Input your prompts or requirements' },
        { step: 3, title: 'Export', description: 'Download your final production output' }
      ],
      alternatives: ['ChatGPT', 'Claude 3.5 Sonnet'],
      useCases: ['Productivity', 'Writing'],
      verifiedDate: '2026-03-01',
      badges: ['New']
    };

    addTool(created);
    setShowAddForm(false);
    setNewToolName('');
    setNewToolDescription('');
    setNewToolOfficialUrl('');
    setNewToolAffiliateUrl('');
    showToast(`Added new tool "${created.name}"!`);
  };

  // Submit the 5-field minimal AliExpress product
  const handlePublish5FieldProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !productAffiliateLink || !productPrice) {
      showToast('Please provide Product name, AliExpress link, and Price');
      return;
    }

    const saved = saveCustomProduct({
      product: productTitle,
      description: productDescription || `${productTitle} with dedicated smart co-processor and real-time noise reduction.`,
      affiliateLink: productAffiliateLink,
      image: productImage || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
      price: productPrice
    });

    setRefreshKey((prev) => prev + 1);
    showToast(`✓ Published "${saved.title}"! Auto-categorized as "${saved.categoryLabel}".`);

    // Reset form
    setProductTitle('');
    setProductDescription('');
    setProductAffiliateLink('');
    setProductImage('');
    setProductPrice('$49.99');
  };

  // Quick fill sample AliExpress gadget
  const handleLoadSampleProduct = () => {
    setProductTitle('Ultra 4K AI Tracking PTZ Webcam with Dual Noise-Canceling Mic');
    setProductDescription('Advanced smart PTZ webcam with gesture control auto-framing, HDR low-light correction, and onboard NPU processing for crystal-clear Zoom, Twitch, and Teams conferences.');
    setProductAffiliateLink('https://www.aliexpress.com/wholesale?SearchText=Ultra+4K+AI+Tracking+PTZ+Webcam');
    setProductImage('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80');
    setProductPrice('$58.99');
    showToast('Loaded sample 5-field AliExpress product template');
  };

  // Handle Bulk Import
  const handleBulkImport = () => {
    if (!bulkInputText.trim()) {
      showToast('Please paste valid JSON array first');
      return;
    }

    try {
      const parsed = JSON.parse(bulkInputText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        showToast('JSON must be a non-empty array of products');
        return;
      }

      saveBulkCustomProducts(parsed);
      setRefreshKey((prev) => prev + 1);
      setBulkInputText('');
      showToast(`✓ Successfully imported and auto-enriched ${parsed.length} AliExpress products!`);
    } catch (err) {
      showToast('Failed to parse JSON. Please check syntax.');
    }
  };

  const handleClearCustomProducts = () => {
    if (window.confirm('Are you sure you want to remove all custom added AliExpress products?')) {
      clearCustomProducts();
      setRefreshKey((prev) => prev + 1);
      showToast('Custom products cleared from local storage');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Admin Management Hub - AliExpress Scaler & Directory Inventory | AIToolNest"
        description="Internal portal to scale thousands of AliExpress products with 5 minimal fields, update tool pricing, configure sponsored listings, and toggle display ads."
        canonicalUrl="https://aitoolnest.com/#/admin"
      />

      <Breadcrumbs items={[{ label: 'Admin Hub' }]} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
            <span>Directory &amp; Monetization Scaler</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            Admin Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Publish products with 5 fields, import bulk AliExpress feeds, update affiliate links, and manage Google AdSense display ads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Display Ads Toggle */}
          <button
            onClick={() => {
              setAdsEnabled(!adsEnabled);
              showToast(adsEnabled ? 'Display Ads disabled across all views' : 'Display Ads enabled');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer transition-colors ${
              adsEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {adsEnabled ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
            <span>Display Ads: {adsEnabled ? 'Active' : 'Hidden'}</span>
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('aliexpress')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'aliexpress'
              ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>AliExpress Scaler (5-Field Engine)</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">{allGadgets.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tools'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>AI Software Tools Directory</span>
          <span className="px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-[10px]">{tools.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('monetization')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'monetization'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Monetization &amp; AdSense</span>
        </button>
      </div>

      {/* TAB 1: ALIEXPRESS 5-FIELD SCALER */}
      {activeTab === 'aliexpress' && (
        <div className="space-y-8">
          {/* Scaler Guarantee Box */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 border border-orange-500/20 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block text-sm">
                5-Field Auto-Enrichment Guarantee:
              </strong>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                You only need to supply <strong>Product</strong>, <strong>Description</strong>, <strong>AliExpress Affiliate Link</strong>, <strong>Image</strong>, and <strong>Price</strong>.
                Our engine automatically calculates the SEO slug, category, review scores, ratings, specifications, pros/cons, discounts, and Google Product Schema JSON-LD!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: The 5-Field Input Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                    Add AliExpress AI Product
                  </h2>
                  <p className="text-xs text-slate-400">Fill the 5 minimal fields below</p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleProduct}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800 cursor-pointer hover:bg-orange-100"
                >
                  Fill Sample
                </button>
              </div>

              <form onSubmit={handlePublish5FieldProduct} className="space-y-4 text-xs">
                {/* 1. Product (Name) */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    1. Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    placeholder="e.g., Wireless AI Smart Lavalier Microphone with On-Device Denoise"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* 2. Description */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    2. Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="e.g., 2.4GHz ultra-low latency wireless lapel mic with onboard neural network audio chip. Filters 99% ambient noise for TikTok, YouTube, and Zoom streaming..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* 3. AliExpress Affiliate Link */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    3. AliExpress Affiliate Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={productAffiliateLink}
                    onChange={(e) => setProductAffiliateLink(e.target.value)}
                    placeholder="https://s.click.aliexpress.com/e/_dZ..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* 4. Image URL & 5. Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      4. Image URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={productImage}
                      onChange={(e) => setProductImage(e.target.value)}
                      placeholder="https://images.unsplash.com/... or AliExpress CDN"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      5. Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="$49.99"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Auto-Enrich &amp; Publish Product</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Live Auto-Enrichment Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Live Auto-Generated Output</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    100% Automatic
                  </span>
                </div>

                {previewEnriched ? (
                  <div className="space-y-4 text-xs">
                    {/* Visual Card Preview */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800/40">
                      <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                        <img
                          src={previewEnriched.image}
                          alt={previewEnriched.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                          {previewEnriched.badge}
                        </div>
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 text-white">
                          {previewEnriched.categoryLabel}
                        </div>
                        <div className="absolute bottom-2.5 right-2.5 text-right">
                          <span className="text-lg font-black text-emerald-400 font-mono">
                            {previewEnriched.price}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {previewEnriched.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-2">
                          {previewEnriched.description}
                        </div>

                        {/* Pros auto-generated */}
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1 text-[11px]">
                          <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                            Auto-Generated Features &amp; Pros:
                          </span>
                          {previewEnriched.pros.slice(0, 2).map((p, i) => (
                            <div key={i} className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                              <Check className="w-3 h-3" />
                              <span>{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-600 dark:text-slate-300">
                      <div>
                        <strong>Slug:</strong> <code className="text-indigo-600 dark:text-indigo-400">/ai-gadgets/{previewEnriched.slug}</code>
                      </div>
                      <div>
                        <strong>Rating:</strong> {previewEnriched.rating} ★ ({previewEnriched.reviews.toLocaleString()} reviews)
                      </div>
                      <div>
                        <strong>Auto Category:</strong> {previewEnriched.categoryLabel} ({previewEnriched.category})
                      </div>
                      <div>
                        <strong>Discount:</strong> {previewEnriched.discountPercentage} (Savings: {previewEnriched.savingsAmount})
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                    <ShoppingBag className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p>Enter product details to preview real-time automated enrichment</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* BULK IMPORTER SECTION */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
                  <span>Batch Importer for Thousands of Products</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Scale your directory effortlessly by pasting JSON arrays of products
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const sample = [
                      {
                        product: "RGB Mechanical Keyboard with Dedicated AI Copilot Key",
                        description: "Hot-swappable mechanical switches with dedicated neural copilot key and custom OLED display.",
                        affiliateLink: "https://www.aliexpress.com/wholesale?SearchText=RGB+Mechanical+Keyboard+AI+Copilot",
                        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
                        price: "$64.99"
                      },
                      {
                        product: "AI Desk Air Purifier with Particle Laser Sensor",
                        description: "Compact HEPA desk purifier that tracks PM2.5 in real-time and auto-adjusts silent brushless fans.",
                        affiliateLink: "https://www.aliexpress.com/wholesale?SearchText=AI+Desk+Air+Purifier+Laser",
                        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
                        price: "$39.50"
                      }
                    ];
                    setBulkInputText(JSON.stringify(sample, null, 2));
                    showToast('Loaded 2 batch products sample');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Load Sample JSON
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <textarea
                rows={5}
                value={bulkInputText}
                onChange={(e) => setBulkInputText(e.target.value)}
                placeholder='[&#10;  {&#10;    "product": "AI Camera",&#10;    "description": "Smart tracking",&#10;    "affiliateLink": "https://s.click.aliexpress.com/...",&#10;    "image": "https://...",&#10;    "price": "$49.99"&#10;  }&#10;]'
                className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Accepts JSON array of objects with keys: product, description, affiliateLink, image, price.
                </span>
                <button
                  type="button"
                  onClick={handleBulkImport}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Import All Products
                </button>
              </div>
            </div>
          </div>

          {/* ACTIVE INVENTORY TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  AliExpress AI Gadgets Catalog ({allGadgets.length} Total Items)
                </h3>
                <span className="text-xs text-slate-400">
                  {customGadgets.length} custom user-added • {allGadgets.length - customGadgets.length} pre-built verified items
                </span>
              </div>

              {customGadgets.length > 0 && (
                <button
                  onClick={handleClearCustomProducts}
                  className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/30"
                >
                  Clear Custom ({customGadgets.length})
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Badge</th>
                    <th className="py-3 px-4 text-right">Live View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {allGadgets.map((gadget) => (
                    <tr key={gadget.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <img
                          src={gadget.image}
                          alt={gadget.title}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="truncate max-w-xs">{gadget.title}</span>
                      </td>
                      <td className="py-3.5 px-4">{gadget.categoryLabel}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        {gadget.price}
                      </td>
                      <td className="py-3.5 px-4">
                        {gadget.rating} ★ ({gadget.reviews.toLocaleString()})
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          {gadget.badge}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/ai-gadgets/${gadget.slug}`)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 inline-flex items-center"
                          title="View live review page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={gadget.affiliateLink}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          className="p-1.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 inline-flex items-center"
                          title="Test AliExpress Link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI SOFTWARE TOOLS DIRECTORY */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Software Tools Directory Inventory ({tools.length} Tools)
              </h2>
              <p className="text-xs text-slate-400">
                Manage SaaS software tools, edit pricing summaries, affiliate links, and sponsored rankings
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add SaaS Tool</span>
            </button>
          </div>

          {/* Tools Listing Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                  <tr>
                    <th className="py-3 px-4">Tool Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Pricing Model</th>
                    <th className="py-3 px-4">Affiliate Enabled</th>
                    <th className="py-3 px-4">Sponsored</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {tools.map((tool) => (
                    <tr key={tool.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                        <span>{tool.name}</span>
                      </td>
                      <td className="py-3.5 px-4 capitalize">{tool.categoryLabel}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full font-semibold capitalize text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {tool.pricingType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {tool.hasAffiliate ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Direct Only</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {tool.sponsored ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                            Sponsored
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => navigate(`/tool/${tool.slug}`)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 inline-flex items-center"
                          title="View live page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingTool(tool)}
                          className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 inline-flex items-center gap-1 font-semibold"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MONETIZATION & ADSENSE SETTINGS */}
      {activeTab === 'monetization' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span>Earnings &amp; Monetization Control</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Google AdSense Display Ads</span>
                  <button
                    onClick={() => {
                      setAdsEnabled(!adsEnabled);
                      showToast(adsEnabled ? 'Disabled AdSense display slots' : 'Enabled AdSense display slots');
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                      adsEnabled
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {adsEnabled ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Controls responsive leaderboard and native in-feed AdSense placements. ads.txt is configured at /ads.txt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">AliExpress Affiliate Program</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">Active</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every product CTA button contains nofollow sponsored tracking with high conversion badges.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tool Modal */}
      {editingTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Edit {editingTool.name}
              </h3>
              <button
                onClick={() => setEditingTool(null)}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-mono"
              >
                CLOSE
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pricing Model</label>
                <select
                  value={editingTool.pricingType}
                  onChange={(e) => setEditingTool({ ...editingTool, pricingType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="free">100% Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="free-trial">Free Trial</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pricing Summary (Shown on Cards)</label>
                <input
                  type="text"
                  value={editingTool.pricingSummary}
                  onChange={(e) => setEditingTool({ ...editingTool, pricingSummary: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={editingTool.officialUrl}
                  onChange={(e) => setEditingTool({ ...editingTool, officialUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Affiliate Link URL</label>
                <input
                  type="url"
                  value={editingTool.affiliateUrl}
                  onChange={(e) => setEditingTool({ ...editingTool, affiliateUrl: e.target.value, hasAffiliate: !!e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTool.sponsored}
                    onChange={(e) => setEditingTool({ ...editingTool, sponsored: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Mark as Sponsored Listing</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTool(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
