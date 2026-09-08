import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubmitToolModal: React.FC = () => {
  const { submitToolModalOpen, setSubmitToolModalOpen, showToast, addTool } = useApp();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('ai-productivity-tools');
  const [pricingType, setPricingType] = useState<'free' | 'freemium' | 'paid' | 'free-trial'>('freemium');
  const [description, setDescription] = useState('');
  const [bestFor, setBestFor] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!submitToolModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim() || !description.trim()) {
      showToast('Please complete all required fields.');
      return;
    }

    // Generate tool object for immediate preview in directory
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newTool = {
      id: `user_tool_${Date.now()}`,
      slug,
      name: name.trim(),
      tagline: description.slice(0, 80),
      description: description.trim(),
      fullDescription: `${description.trim()} Submitted by community developer. Awaiting editorial benchmark audit.`,
      category: category as any,
      categoryLabel: category.replace('ai-', '').replace('-tools', '').replace(/-/g, ' ').toUpperCase(),
      pricingType,
      pricingSummary: pricingType === 'free' ? '100% Free' : pricingType === 'freemium' ? 'Free tier available' : 'Paid plans',
      pricingPlans: [
        { name: 'Community Starter', price: '$0', billing: 'per month', features: ['Core feature access', 'Standard speed', 'Community support'] }
      ],
      bestFor: bestFor.trim() || 'Modern creators and tech teams looking for innovative AI features.',
      keyFeatures: ['Automated AI workflows', 'Clean web UI', 'API & export options'],
      pros: ['Innovative AI approach', 'Fast onboarding', 'Accessible pricing'],
      cons: ['New product in active testing', 'Roadmap features in development'],
      howToUse: [
        { step: 1, title: 'Visit Website', description: 'Sign up for a free account on the official portal.' },
        { step: 2, title: 'Configure Workflow', description: 'Set up your project prompts and preferences.' }
      ],
      alternatives: ['ChatGPT', 'Claude', 'Notion AI'],
      officialUrl: url.startsWith('http') ? url : `https://${url}`,
      affiliateUrl: url.startsWith('http') ? url : `https://${url}`,
      hasAffiliate: false,
      rating: 4.8,
      reviewsCount: 1,
      badges: ['Community Submission', 'Recently Added'],
      iconName: 'Sparkles',
      iconBg: 'bg-indigo-600',
      verifiedDate: 'September 2026',
      useCases: ['Productivity', 'Automation']
    };

    addTool(newTool);
    setSubmitted(true);
    showToast(`"${name}" successfully submitted for review and added to live directory!`);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setUrl('');
      setDescription('');
      setBestFor('');
      setSubmitToolModalOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base font-['Space_Grotesk']">
                Submit Your AI Tool
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Get discovered by 150,000+ monthly AI researchers & buyers
              </p>
            </div>
          </div>
          <button
            onClick={() => setSubmitToolModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Submission Received!</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Your tool has been indexed into our directory sandbox. Our editorial team will complete verification within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tool Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. SynthWave AI"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Official Website URL *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourtool.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ai-productivity-tools">AI Productivity</option>
                  <option value="ai-writing-tools">AI Writing</option>
                  <option value="ai-image-tools">AI Image Generation</option>
                  <option value="ai-video-tools">AI Video</option>
                  <option value="ai-business-tools">AI Business & Automation</option>
                  <option value="ai-marketing-tools">AI Marketing</option>
                  <option value="ai-tools-for-students">AI for Students & Research</option>
                  <option value="free-ai-tools">100% Free Tool</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Pricing Model
                </label>
                <select
                  value={pricingType}
                  onChange={(e) => setPricingType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="freemium">Freemium (Free tier available)</option>
                  <option value="free">100% Free (No credit card)</option>
                  <option value="free-trial">Free Trial</option>
                  <option value="paid">Paid Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Short Description / Pitch *
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does your tool do and how does it save users time?"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Best For (Target User Persona)
              </label>
              <input
                type="text"
                value={bestFor}
                onChange={(e) => setBestFor(e.target.value)}
                placeholder="e.g. Content creators producing 10+ weekly videos"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-indigo-800 dark:text-indigo-300 text-[11px]">
              <ShieldAlert className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span>We do not charge review fees or accept sponsored ranking boosts. All tools are vetted on merit.</span>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setSubmitToolModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Tool</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
