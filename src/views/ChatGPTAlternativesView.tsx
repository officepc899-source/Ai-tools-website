import React, { useState } from 'react';
import { Bot, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ExternalLink, Zap, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';

export const ChatGPTAlternativesView: React.FC = () => {
  const { tools, navigate } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Alternative conversational and reasoning models
  const chatGptAltTools = tools.filter((t) => {
    return ['claude', 'gemini', 'perplexity', 'notebooklm', 'google-ai-studio'].includes(t.slug);
  });

  const faqs = [
    {
      q: 'Which ChatGPT alternative is best for long-form, nuanced writing and coding?',
      a: 'Claude 3.7 Sonnet by Anthropic is widely considered the superior model for natural human-like prose, long code architecture refactoring, and following complex multi-step instructions without sounding robotic.'
    },
    {
      q: 'Which alternative is best for real-time web search and citation research?',
      a: 'Perplexity AI is the gold standard for AI search engines. It synthesizes real-time web sources, provides instant numbered footnotes linking directly to original articles, and eliminates traditional search engine ad bloat.'
    },
    {
      q: 'Which alternative offers the largest context window for processing giant PDFs?',
      a: 'Google Gemini 2.0 (and Google AI Studio) features a massive 1,000,000 to 2,000,000 token context window—allowing you to ingest entire code repositories, 500-page textbooks, or hours of audio files in a single prompt.'
    },
    {
      q: 'Are any of these ChatGPT alternatives completely free?',
      a: 'Yes. Google AI Studio and Google NotebookLM are 100% free with generous developer quotas. Claude and Perplexity both provide generous free daily conversation quotas without requiring credit card information.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Best ChatGPT Alternatives (2026 Comprehensive Comparison)"
        description="Looking for the best ChatGPT alternatives? Compare Claude 3.7, Google Gemini 2.0, Perplexity AI, and NotebookLM for coding, writing, research, and pricing."
        canonicalUrl="https://aitoolnest.com/#/chatgpt-alternatives"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'ChatGPT Alternatives' }
        ]}
      />

      {/* Hero */}
      <header className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>2026 Frontier LLM Benchmarks</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Best ChatGPT Alternatives in 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ChatGPT isn't the only frontier model in town. Discover why millions of engineers, researchers, and professional writers are switching to Claude 3.7, Gemini 2.0, and Perplexity for superior reasoning, live search, and massive context windows.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-200">
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Side-by-Side Benchmarks
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Context Window Tested
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Real Zero-Cost Free Tiers
            </span>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Comparison Grid */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Frontier Model Showdown (2026 Specs)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3 pr-4">AI Model</th>
                <th className="py-3 px-4">Primary Superpower</th>
                <th className="py-3 px-4">Context Window</th>
                <th className="py-3 px-4">Free Quota</th>
                <th className="py-3 pl-4">Best Alternative For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              <tr className="bg-indigo-50/40 dark:bg-indigo-950/20">
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Claude 3.7 Sonnet</td>
                <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">Coding, natural prose, subtle reasoning</td>
                <td className="py-3 px-4">200K tokens</td>
                <td className="py-3 px-4">Generous daily reset</td>
                <td className="py-3 pl-4">Developers & Authors</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Google Gemini 2.0</td>
                <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">Massive multimodal context & speed</td>
                <td className="py-3 px-4 font-bold text-emerald-600">1M - 2M tokens</td>
                <td className="py-3 px-4">Free on Google AI Studio</td>
                <td className="py-3 pl-4">Large document analysis</td>
              </tr>
              <tr className="bg-indigo-50/40 dark:bg-indigo-950/20">
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Perplexity AI</td>
                <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">Real-time web search with verified citations</td>
                <td className="py-3 px-4">Real-time Web</td>
                <td className="py-3 px-4">Unlimited standard search</td>
                <td className="py-3 pl-4">Research & Fact-checking</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Google NotebookLM</td>
                <td className="py-3 px-4 text-indigo-600 dark:text-indigo-400 font-semibold">Zero hallucinations on uploaded notes</td>
                <td className="py-3 px-4">50 Sources x 500K</td>
                <td className="py-3 px-4 font-bold text-emerald-600">100% Free Forever</td>
                <td className="py-3 pl-4">Students & Academics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Alternative Tool Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Vetted ChatGPT Competitors
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Read complete independent reviews, inspect pros and cons, and access official login links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatGptAltTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.slug === 'claude'} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            ChatGPT Alternatives FAQs
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              {expandedFaq === idx && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed pr-8">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
