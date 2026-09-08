import React, { useState } from 'react';
import { Terminal, Search, Copy, Check, Filter, Sparkles, SlidersHorizontal, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AI_PROMPTS, AIPrompt } from '../data/promptsData';

export const AIPromptsView: React.FC = () => {
  const { showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Marketing', 'Coding', 'Writing', 'Business', 'Design', 'Productivity'];
  const models = ['All', 'ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Universal'];

  const filteredPrompts = AI_PROMPTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesModel = selectedModel === 'All' || p.targetModel === selectedModel;
    return matchesSearch && matchesCategory && matchesModel;
  });

  const handleCopy = (prompt: AIPrompt) => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopiedId(prompt.id);
    showToast(`Copied prompt: "${prompt.title}" to clipboard!`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I use these prompts with ChatGPT or Claude?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply click the "Copy Prompt" button on any prompt card, paste it directly into your AI chat window, and replace any bracketed text like [PRODUCT_NAME] with your specific details.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are these prompts free for commercial use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All prompts in the AIToolNest library are open-source and free for personal and commercial workflows.'
        }
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Curated AI Prompt Library (ChatGPT, Claude & Midjourney)"
        description="Browse battle-tested AI prompts for SaaS copy, code refactoring, image generation, business audits, and SEO authority clusters. 1-click copy to clipboard."
        canonicalUrl="https://aitoolnest.com/#/ai-prompts"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Resources', path: '/#resources' },
          { label: 'Prompt Library' }
        ]}
      />

      {/* Hero Header */}
      <header className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-indigo-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Tested System Prompts &bull; 1-Click Copy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Curated AI Prompt Library
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop getting mediocre, generic AI responses. Use structured, parameter-grounded system prompts engineered for ChatGPT, Claude 3.7, Gemini, and Midjourney.
          </p>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Filter and Search Bar */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prompts by keyword, goal, or tags..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Model Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Model:</span>
            {models.map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedModel === model
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Topic:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Prompts Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Available Prompts ({filteredPrompts.length})
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Click "Copy Prompt" & fill the [BRACKETED] variables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-400 dark:hover:border-indigo-500 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {prompt.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {prompt.targetModel}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    prompt.difficulty === 'Beginner'
                      ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                      : prompt.difficulty === 'Intermediate'
                      ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/40'
                      : 'text-purple-600 bg-purple-50 dark:bg-purple-950/40'
                  }`}>
                    {prompt.difficulty}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {prompt.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {prompt.description}
                </p>

                {/* Prompt Code Block Preview */}
                <div className="relative bg-slate-950 text-slate-300 font-mono text-[11px] p-3.5 rounded-xl overflow-x-auto max-h-36 scrollbar-none border border-slate-800">
                  <pre className="whitespace-pre-wrap">{prompt.promptText}</pre>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prompt.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-end">
                <button
                  onClick={() => handleCopy(prompt)}
                  className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    copiedId === prompt.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Complete Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
