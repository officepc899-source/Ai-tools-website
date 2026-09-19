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
  Eye,
  Layers,
  LogOut,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdminTutorialsManager } from '../components/admin/AdminTutorialsManager';
import { AITool, PricingType, ToolCategory } from '../types';

interface AdminViewProps {
  onLogout?: () => void;
  adminEmail?: string;
}

export const AdminView: React.FC<AdminViewProps> = ({ onLogout, adminEmail }) => {
  const { tools, updateTool, addTool, adsEnabled, setAdsEnabled, showToast, navigate, tutorials } = useApp();
  const [activeTab, setActiveTab] = useState<'tools' | 'monetization' | 'tutorials'>('tools');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifySession = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        const data = await res.json().catch(() => null);
        showToast(`Session Verified: ${data?.user?.email || 'Admin'} (Role: ${data?.user?.role || 'admin'})`);
      } else {
        showToast('Admin session expired or invalid. Please re-authenticate.');
      }
    } catch {
      showToast('Network error while checking session status.');
    } finally {
      setIsVerifying(false);
    }
  };

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
        title="Admin Management Hub - Directory Inventory & Monetization | AIToolNest"
        description="Internal portal to manage AI software tools directory, update pricing, configure sponsored listings, and toggle display ads."
        canonicalUrl="https://aitoolnest.com/#/admin"
      />

      <Breadcrumbs items={[{ label: 'Admin Hub' }]} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold mb-2">
            <Settings className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
            <span>Directory &amp; Monetization Portal</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
            Admin Management Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage AI software tools directory, update pricing and affiliate links, and configure Google AdSense display ads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {adminEmail && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="truncate max-w-[180px]">{adminEmail}</span>
            </div>
          )}

          {/* Verify Session Button */}
          <button
            onClick={handleVerifySession}
            disabled={isVerifying}
            className="px-3 py-2 rounded-xl text-xs font-semibold border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Verify session with /api/admin/verify"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : 'text-indigo-600 dark:text-indigo-400'}`} />
            <span>{isVerifying ? 'Verifying...' : 'Verify Session'}</span>
          </button>

          {/* Display Ads Toggle */}
          <button
            onClick={() => {
              setAdsEnabled(!adsEnabled);
              showToast(adsEnabled ? 'Display Ads disabled across all views' : 'Display Ads enabled');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer transition-colors ${
              adsEnabled
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {adsEnabled ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />}
            <span>Display Ads: {adsEnabled ? 'Active' : 'Hidden'}</span>
          </button>

          {/* Admin Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-900/50 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
              title="End admin session"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
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

        <button
          onClick={() => setActiveTab('tutorials')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'tutorials'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>AI Tutorials</span>
          <span className="px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-[10px]">{tutorials.length}</span>
        </button>
      </div>

      {/* TAB 1: AI SOFTWARE TOOLS DIRECTORY */}
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
                  <span className="font-bold text-slate-900 dark:text-white">SaaS Affiliate Tracking</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">Active</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Affiliate links configured in tool listings automatically append sponsored and nofollow tracking tags.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI TUTORIALS MANAGEMENT */}
      {activeTab === 'tutorials' && <AdminTutorialsManager />}

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

      {/* Add New Tool Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Add New AI Software Tool
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-mono cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <form onSubmit={handleCreateTool} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Tool Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Google DeepMind AlphaCode"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newToolCategory}
                    onChange={(e) => setNewToolCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="ai-assistant">AI Assistant</option>
                    <option value="ai-development">AI Development / API</option>
                    <option value="writing">AI Writing</option>
                    <option value="image">AI Image / Art</option>
                    <option value="video">AI Video</option>
                    <option value="audio">AI Audio / Voice</option>
                    <option value="productivity">AI Productivity</option>
                    <option value="business">AI Business</option>
                    <option value="coding">AI Coding</option>
                    <option value="research">AI Research &amp; Study</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pricing Model</label>
                  <select
                    value={newToolPricingType}
                    onChange={(e) => setNewToolPricingType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="free">100% Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="free-trial">Free Trial</option>
                    <option value="paid">Paid Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pricing Summary</label>
                <input
                  type="text"
                  value={newToolPricingSummary}
                  onChange={(e) => setNewToolPricingSummary(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Website URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newToolOfficialUrl}
                  onChange={(e) => setNewToolOfficialUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Affiliate Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://partner..."
                  value={newToolAffiliateUrl}
                  onChange={(e) => setNewToolAffiliateUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe core capabilities, target audience, and standout features..."
                  value={newToolDescription}
                  onChange={(e) => setNewToolDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Tool Listing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
