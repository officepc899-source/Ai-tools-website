import React, { useState } from 'react';
import {
  RefreshCw,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Briefcase,
  Smile,
  BookOpen,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { generateParaphrase, countWords } from '../../utils/aiToolGenerators';
import { copyToClipboard } from '../../utils/clipboard';
import { useApp } from '../../context/AppContext';

const SAMPLE_TEXT = `We need to make sure our marketing team utilizes all the best software to get more leads. A lot of companies have big problems when they start doing this because they do not look into the details beforehand. Consequently, our immediate priority is to find out what works and implement it to facilitate better results.`;

export const ParaphraserTool: React.FC = () => {
  const { showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState<'professional' | 'simple' | 'friendly' | 'academic'>('professional');
  const [result, setResult] = useState<ReturnType<typeof generateParaphrase> | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const wordCount = countWords(inputText);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      showToast('Please enter text to paraphrase.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const paraphraseResult = generateParaphrase(inputText, tone);
      setResult(paraphraseResult);
      setIsGenerating(false);
      showToast(`Paraphrased with ${tone} tone!`);
    }, 150);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT);
    const paraphraseResult = generateParaphrase(SAMPLE_TEXT, tone);
    setResult(paraphraseResult);
    showToast('Loaded sample text and paraphrased!');
  };

  const handleCopy = async () => {
    if (!result?.paraphrasedText) return;
    const ok = await copyToClipboard(result.paraphrasedText);
    if (ok) {
      setCopied(true);
      showToast('Paraphrased text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toneIcons = {
    professional: <Briefcase className="w-3.5 h-3.5" />,
    simple: <Zap className="w-3.5 h-3.5" />,
    friendly: <Smile className="w-3.5 h-3.5" />,
    academic: <BookOpen className="w-3.5 h-3.5" />
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Instant AI Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            AI Paraphrasing Tool
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rewrite sentences and paragraphs naturally to elevate clarity, eliminate repetition, and adapt your tone.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs font-semibold px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Load Sample Text
        </button>
      </div>

      {/* Tone Selection Bar */}
      <div className="py-5 border-b border-slate-100 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
          Select Desired Writing Tone:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(['professional', 'simple', 'friendly', 'academic'] as const).map((t) => {
            const isSelected = tone === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`py-2.5 px-3 text-xs font-medium rounded-xl border capitalize transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {toneIcons[t]}
                <span>{t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
        {/* Input Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            <span>Original Text</span>
            <span className="font-mono text-slate-400">{wordCount} words</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text here to rewrite in a professional, simple, friendly, or academic tone..."
            rows={8}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-y placeholder:text-slate-400"
          />

          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={handleClear}
              disabled={!inputText}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Rewriting...' : 'Paraphrase Text'}</span>
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            <span>Rewritten Version ({tone})</span>
            {result && (
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                {result.newWordCount} words
              </span>
            )}
          </div>

          <div className="relative flex-1 min-h-[200px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm overflow-y-auto max-h-[340px]">
            {result ? (
              <div className="space-y-4">
                <p className="leading-relaxed text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {result.paraphrasedText}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tone Adjustments Applied:
                  </p>
                  <ul className="space-y-1">
                    {result.keyImprovements.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 dark:text-slate-500">
                <RefreshCw className="w-8 h-8 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-600" />
                <p className="text-xs">Your paraphrased output will appear here.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Select a tone and click &quot;Paraphrase Text&quot; to begin.</p>
              </div>
            )}
          </div>

          {result && (
            <div className="flex items-center justify-between gap-3 mt-4">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                {result.toneDescription}
              </span>

              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
