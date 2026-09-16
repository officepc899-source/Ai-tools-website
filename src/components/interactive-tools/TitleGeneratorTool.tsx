import React, { useState } from 'react';
import {
  Heading,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Tag,
  Share2,
  Bookmark,
  CheckCheck
} from 'lucide-react';
import { generateTitles, TitleItem } from '../../utils/aiToolGenerators';
import { copyToClipboard } from '../../utils/clipboard';
import { useApp } from '../../context/AppContext';

export const TitleGeneratorTool: React.FC = () => {
  const { showToast } = useApp();
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<TitleItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) {
      showToast('Please enter a topic or keyword.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateTitles(topic);
      setTitles(generated);
      setIsGenerating(false);
      showToast(`Generated ${generated.length} attractive titles!`);
    }, 150);
  };

  const handleClear = () => {
    setTopic('');
    setTitles([]);
  };

  const handleCopySingle = async (item: TitleItem) => {
    const ok = await copyToClipboard(item.title);
    if (ok) {
      setCopiedId(item.id);
      showToast(`Copied: "${item.title.slice(0, 30)}..."`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    if (titles.length === 0) return;
    const allText = titles.map((t, idx) => `${idx + 1}. ${t.title}`).join('\n');
    const ok = await copyToClipboard(allText);
    if (ok) {
      setCopiedAll(true);
      showToast('All titles copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleQuickTopic = (suggested: string) => {
    setTopic(suggested);
    const generated = generateTitles(suggested);
    setTitles(generated);
    showToast(`Loaded topic: "${suggested}"`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Heading className="w-3.5 h-3.5" />
            <span>Instant AI Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            AI Title Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate high-CTR, SEO-optimized headlines for blog posts, YouTube videos, articles, and newsletters.
          </p>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Try:</span>
          {['AI Tools for Marketing', 'ChatGPT Prompts', 'Remote Work Productivity'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleQuickTopic(s)}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input Search Box */}
      <div className="py-5 border-b border-slate-100 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          Enter Your Core Topic or Keyword:
        </label>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Best AI video editors, how to invest in stocks, digital nomad tips..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={!topic && titles.length === 0}
              className="px-3.5 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : 'Generate Titles'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Titles Grid */}
      <div className="pt-5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
          <span>
            {titles.length > 0 ? `Attractive Title Variations (${titles.length})` : 'Generated Titles'}
          </span>
          {titles.length > 0 && (
            <button
              type="button"
              onClick={handleCopyAll}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              {copiedAll ? <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Copied All Titles!' : 'Copy All Titles'}</span>
            </button>
          )}
        </div>

        {titles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {titles.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 font-mono">
                      {item.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopySingle(item)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-slate-600 dark:text-slate-300 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-colors cursor-pointer shrink-0"
                      title="Copy Title"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500">
            <Heading className="w-8 h-8 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-600" />
            <p className="text-xs">Your generated headlines will appear here.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Enter a keyword or click one of the quick suggestions above.</p>
          </div>
        )}
      </div>
    </div>
  );
};
