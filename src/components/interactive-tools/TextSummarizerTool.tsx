import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  AlignLeft,
  ListOrdered,
  Clock,
  ArrowRight
} from 'lucide-react';
import { generateTextSummary, countWords, SummarizeOptions } from '../../utils/aiToolGenerators';
import { copyToClipboard } from '../../utils/clipboard';
import { useApp } from '../../context/AppContext';

const SAMPLE_TEXT = `Artificial intelligence is fundamentally revolutionizing the landscape of enterprise productivity and creative workflows. In recent years, deep learning models and large language architectures have evolved from experimental laboratory demonstrations into foundational infrastructure for global businesses. Organizations utilizing AI-driven automation report substantial efficiency gains, particularly in data synthesis, content drafting, customer support triage, and complex decision analysis.

However, scaling artificial intelligence across legacy operational structures presents notable challenges. Enterprises must navigate data governance standards, algorithmic bias mitigation, intellectual property compliance, and infrastructural compute costs. Industry surveys indicate that the most successful implementations pair algorithmic automation with human-in-the-loop oversight. This hybrid model ensures both rapid computational speed and nuanced editorial discretion.

Looking toward the near future, multimodal models capable of processing interconnected text, speech, high-resolution imagery, and live telemetry data will unlock unprecedented operational synergy. Leaders who invest strategically in employee AI literacy and ethical governance frameworks today will establish enduring competitive moats in the cognitive economy.`;

export const TextSummarizerTool: React.FC = () => {
  const { showToast } = useApp();
  const [inputText, setInputText] = useState('');
  const [lengthMode, setLengthMode] = useState<SummarizeOptions['length']>('medium');
  const [formatMode, setFormatMode] = useState<SummarizeOptions['format']>('paragraph');
  const [result, setResult] = useState<ReturnType<typeof generateTextSummary> | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const wordCount = countWords(inputText);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      showToast('Please enter or paste text to summarize.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const summaryResult = generateTextSummary(inputText, { length: lengthMode, format: formatMode });
      setResult(summaryResult);
      setIsGenerating(false);
      showToast('Summary generated successfully!');
    }, 150);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  const handleLoadSample = () => {
    setInputText(SAMPLE_TEXT);
    const summaryResult = generateTextSummary(SAMPLE_TEXT, { length: lengthMode, format: formatMode });
    setResult(summaryResult);
    showToast('Loaded sample text and generated summary!');
  };

  const handleCopy = async () => {
    if (!result?.summary) return;
    const ok = await copyToClipboard(result.summary);
    if (ok) {
      setCopied(true);
      showToast('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Instant AI Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            AI Text Summarizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Condense lengthy articles, essays, research notes, and transcripts into clear, actionable summaries.
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

      {/* Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-slate-100 dark:border-slate-800">
        {/* Length Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Summary Depth:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['short', 'medium', 'detailed'] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => setLengthMode(len)}
                className={`py-2 px-3 text-xs font-medium rounded-xl border capitalize transition-all cursor-pointer ${
                  lengthMode === len
                    ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        {/* Format Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Output Format:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormatMode('paragraph')}
              className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                formatMode === 'paragraph'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Paragraph</span>
            </button>
            <button
              type="button"
              onClick={() => setFormatMode('bullet-points')}
              className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                formatMode === 'bullet-points'
                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Bullet Points</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace (Input & Output Side-by-Side on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
        {/* Input Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            <span>Input Text</span>
            <span className="font-mono text-slate-400">{wordCount} words</span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your article, meeting notes, essay, or document here to generate a concise summary..."
            rows={9}
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
              <span>{isGenerating ? 'Summarizing...' : 'Generate Summary'}</span>
            </button>
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            <span>Summary Output</span>
            {result && (
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {result.summaryWordCount} words (-{result.reductionPercentage}%)
              </span>
            )}
          </div>

          <div className="relative flex-1 min-h-[220px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm overflow-y-auto max-h-[360px]">
            {result ? (
              <div className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200">
                {result.summary}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 dark:text-slate-500">
                <FileText className="w-8 h-8 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-600" />
                <p className="text-xs">Your AI summary will appear here.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Click &quot;Generate Summary&quot; or test with the sample text.</p>
              </div>
            )}
          </div>

          {result && (
            <div className="flex items-center justify-between gap-3 mt-4">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Saved ~{result.readingTimeSavedMinutes} min reading time</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
