import React, { useState } from 'react';
import {
  Globe,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { generateMetaDescriptions, MetaDescriptionItem } from '../../utils/aiToolGenerators';
import { copyToClipboard } from '../../utils/clipboard';
import { useApp } from '../../context/AppContext';

export const MetaDescriptionTool: React.FC = () => {
  const { showToast } = useApp();
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [descriptions, setDescriptions] = useState<MetaDescriptionItem[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) {
      showToast('Please enter the page or article topic.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateMetaDescriptions(topic, keyword);
      setDescriptions(generated);
      if (generated.length > 0) {
        setSelectedDescription(generated[0].description);
      }
      setIsGenerating(false);
      showToast('Generated SEO meta descriptions!');
    }, 150);
  };

  const handleClear = () => {
    setTopic('');
    setKeyword('');
    setDescriptions([]);
    setSelectedDescription('');
  };

  const handleCopy = async (item: MetaDescriptionItem) => {
    const ok = await copyToClipboard(item.description);
    if (ok) {
      setCopiedId(item.id);
      showToast('Meta description copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleLoadSample = () => {
    const sampleTopic = 'Best free AI tools for content creators and bloggers in 2026';
    const sampleKw = 'free AI tools';
    setTopic(sampleTopic);
    setKeyword(sampleKw);
    const generated = generateMetaDescriptions(sampleTopic, sampleKw);
    setDescriptions(generated);
    if (generated.length > 0) {
      setSelectedDescription(generated[0].description);
    }
    showToast('Loaded sample SEO topic!');
  };

  // Length calculation helper for the selected preview
  const previewLength = selectedDescription.length;
  const isOptimal = previewLength >= 140 && previewLength <= 165;
  const isWarning = previewLength > 165;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Instant AI Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            AI Meta Description Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create high-CTR, search-engine-ready meta descriptions with live Google SERP snippet previews.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs font-semibold px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Load Sample Topic
        </button>
      </div>

      {/* Input Section */}
      <div className="py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Page or Article Topic / Content Summary <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Complete guide to choosing the best AI video generators..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target SEO Keyword (Optional)
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., AI video generators"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button
            type="button"
            onClick={handleClear}
            disabled={!topic && !keyword && descriptions.length === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ml-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Descriptions'}</span>
          </button>
        </div>
      </div>

      {/* Results & SERP Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
        {/* Generated Options */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2.5">
            <span>Generated Meta Descriptions</span>
            {descriptions.length > 0 && (
              <span className="text-[11px] text-slate-400">Select to test in SERP preview</span>
            )}
          </div>

          {descriptions.length > 0 ? (
            <div className="space-y-3">
              {descriptions.map((item) => {
                const isSelected = selectedDescription === item.description;
                const isCopied = copiedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDescription(item.description)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 ring-1 ring-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {item.style}
                      </span>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-mono font-bold ${
                            item.characterCount <= 160
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {item.characterCount} chars
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-600 dark:text-slate-300 transition-colors"
                          title="Copy Description"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500">
              <Globe className="w-8 h-8 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-600" />
              <p className="text-xs">Generated meta descriptions will appear here.</p>
            </div>
          )}
        </div>

        {/* Live Google Search Preview Card */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2.5">
            <span>Google SERP Snippet Preview</span>
            {selectedDescription && (
              <span
                className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                  isOptimal
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isWarning
                    ? 'text-rose-500'
                    : 'text-amber-600'
                }`}
              >
                {isOptimal ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                <span>{previewLength} / 160 characters</span>
              </span>
            )}
          </div>

          {/* Google Mock Card */}
          <div className="p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-sans shadow-xs space-y-2">
            {/* SERP Breadcrumbs */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                N
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-none">
                <span className="font-medium text-slate-900 dark:text-white">AIToolNest</span>
                <span className="text-slate-400 dark:text-slate-500 text-[11px] block mt-0.5">
                  https://aitoolnest.com › tools
                </span>
              </div>
            </div>

            {/* SERP Title */}
            <h4 className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug">
              {topic ? `${topic.slice(0, 55)}... - AIToolNest` : 'Discover Best AI Tools & Prompts | AIToolNest'}
            </h4>

            {/* SERP Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedDescription ||
                'Explore the best curated artificial intelligence tools, prompt templates, and business workflows to accelerate your creative and enterprise output.'}
            </p>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-700 dark:text-slate-200">SEO Best Practice:</strong> Google typically truncates snippets beyond 155-160 characters on desktop and ~120 on mobile. Keep your primary keyword in the first 120 characters.
          </div>
        </div>
      </div>
    </div>
  );
};
