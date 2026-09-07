import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AITool, PricingType, ToolCategory } from '../types';

export const AdminView: React.FC = () => {
  const { tools, updateTool, addTool, adsEnabled, setAdsEnabled, showToast, navigate } = useApp();
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Admin Management Hub - Update Pricing & Affiliate Links"
        description="Internal portal to manage verified AI tools, update official and affiliate pricing, configure sponsored listings, and toggle display ads."
        canonicalUrl="https://aitoolnest.com/#/admin"
      />

      <Breadcrumbs items={[{ label: 'Admin Hub' }]} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>Directory & Monetization Management</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">
            Admin Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Easily update pricing information, affiliate URLs, sponsored placements, and toggle display ads across the site.
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
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-100 border-slate-300 text-slate-600'
            }`}
          >
            {adsEnabled ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
            <span>Display Ads: {adsEnabled ? 'Active' : 'Hidden'}</span>
          </button>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Tool</span>
          </button>
        </div>
      </div>

      {/* Add New Tool Form Modal / Drawer */}
      {showAddForm && (
        <div className="bg-white border-2 border-indigo-500 rounded-3xl p-6 sm:p-8 shadow-xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Add New Tool to Directory
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateTool} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tool Name *</label>
              <input
                type="text"
                required
                value={newToolName}
                onChange={(e) => setNewToolName(e.target.value)}
                placeholder="e.g., ElevenLabs"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={newToolCategory}
                onChange={(e) => setNewToolCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="free">Free AI Tools</option>
                <option value="writing">AI Writing Tools</option>
                <option value="design">AI Design Tools</option>
                <option value="business">AI Tools for Business</option>
                <option value="students">AI Tools for Students</option>
                <option value="productivity">AI Productivity Tools</option>
                <option value="marketing">AI Marketing Tools</option>
                <option value="content-creation">AI Content Creation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Model *</label>
              <select
                value={newToolPricingType}
                onChange={(e) => setNewToolPricingType(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="free">100% Free</option>
                <option value="freemium">Freemium (Free tier included)</option>
                <option value="free-trial">Free Trial</option>
                <option value="paid">Paid Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pricing Summary Note</label>
              <input
                type="text"
                value={newToolPricingSummary}
                onChange={(e) => setNewToolPricingSummary(e.target.value)}
                placeholder="e.g., Free 10,000 words; Pro $20/mo"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Website URL</label>
              <input
                type="url"
                value={newToolOfficialUrl}
                onChange={(e) => setNewToolOfficialUrl(e.target.value)}
                placeholder="https://tool.com"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliate Link (Optional)</label>
              <input
                type="url"
                value={newToolAffiliateUrl}
                onChange={(e) => setNewToolAffiliateUrl(e.target.value)}
                placeholder="https://partner.tool.com/ref?id=..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tool Description *</label>
              <textarea
                required
                rows={2}
                value={newToolDescription}
                onChange={(e) => setNewToolDescription(e.target.value)}
                placeholder="Short description highlighting key functionality..."
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Publish Tool
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Tool Modal */}
      {editingTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                Edit {editingTool.name}
              </h3>
              <button
                onClick={() => setEditingTool(null)}
                className="text-xs text-slate-400 hover:text-slate-700 font-mono"
              >
                CLOSE
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pricing Model</label>
                <select
                  value={editingTool.pricingType}
                  onChange={(e) => setEditingTool({ ...editingTool, pricingType: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                >
                  <option value="free">100% Free</option>
                  <option value="freemium">Freemium</option>
                  <option value="free-trial">Free Trial</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pricing Summary (Shown on Cards)</label>
                <input
                  type="text"
                  value={editingTool.pricingSummary}
                  onChange={(e) => setEditingTool({ ...editingTool, pricingSummary: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Website URL</label>
                <input
                  type="url"
                  value={editingTool.officialUrl}
                  onChange={(e) => setEditingTool({ ...editingTool, officialUrl: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Affiliate Link URL</label>
                <input
                  type="url"
                  value={editingTool.affiliateUrl}
                  onChange={(e) => setEditingTool({ ...editingTool, affiliateUrl: e.target.value, hasAffiliate: !!e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-mono"
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
                  <span className="font-semibold text-slate-700">Mark as Sponsored Listing</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingTool.badges.includes('Staff Pick')}
                    onChange={(e) => {
                      const badges = e.target.checked
                        ? Array.from(new Set([...editingTool.badges, 'Staff Pick']))
                        : editingTool.badges.filter((b) => b !== 'Staff Pick');
                      setEditingTool({ ...editingTool, badges });
                    }}
                    className="w-4 h-4 rounded text-amber-600"
                  />
                  <span className="font-semibold text-slate-700">Staff Pick Badge</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTool(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-semibold"
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

      {/* Tools Listing Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            All AI Tools Directory Inventory ({tools.length} Tools)
          </h3>
          <span className="text-xs text-slate-400">Click &ldquo;Edit&rdquo; to modify pricing or affiliate link</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold tracking-wider text-slate-400 font-mono">
              <tr>
                <th className="py-3 px-4">Tool Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pricing Model</th>
                <th className="py-3 px-4">Affiliate Enabled</th>
                <th className="py-3 px-4">Sponsored</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tools.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span>{tool.name}</span>
                  </td>
                  <td className="py-3.5 px-4 capitalize">{tool.categoryLabel}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full font-semibold capitalize text-[10px] bg-slate-100 text-slate-700">
                      {tool.pricingType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {tool.hasAffiliate ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-slate-400">Direct Only</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {tool.sponsored ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Sponsored
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => navigate(`/tool/${tool.slug}`)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 inline-flex items-center"
                      title="View live page"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingTool(tool)}
                      className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 inline-flex items-center gap-1 font-semibold"
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
  );
};
