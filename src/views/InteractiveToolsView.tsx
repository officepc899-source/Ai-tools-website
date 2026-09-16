import React from 'react';
import { Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InteractiveToolsStudio, InteractiveToolId } from '../components/interactive-tools/InteractiveToolsStudio';

interface InteractiveToolsViewProps {
  initialTool?: InteractiveToolId;
}

export const InteractiveToolsView: React.FC<InteractiveToolsViewProps> = ({
  initialTool = 'summarizer'
}) => {
  const { navigate } = useApp();

  const toolMetaTitles: Record<InteractiveToolId, { title: string; desc: string }> = {
    summarizer: {
      title: 'Free AI Text Summarizer (Instant & Online) - AIToolNest',
      desc: 'Summarize articles, research papers, and meeting notes instantly with our free AI text summarizer. Choose short, medium, or detailed depth with zero sign-up.'
    },
    paraphraser: {
      title: 'Free AI Paraphrasing Tool (Rewrite in 4 Tones) - AIToolNest',
      desc: 'Rewrite sentences and paragraphs effortlessly. Choose from Professional, Simple, Friendly, or Academic tones to improve clarity and engagement.'
    },
    'email-writer': {
      title: 'Free AI Email Writer (Professional & Fast) - AIToolNest',
      desc: 'Generate high-converting, diplomatic business emails in seconds. Customize recipient, purpose, and tone for workplace communication.'
    },
    'title-generator': {
      title: 'Free AI Title & Headline Generator (High CTR) - AIToolNest',
      desc: 'Generate viral, SEO-optimized headlines for blogs, YouTube videos, articles, and newsletters. Boost your click-through rates with proven headline formulas.'
    },
    'meta-description': {
      title: 'Free AI Meta Description Generator with SERP Preview - AIToolNest',
      desc: 'Create search-engine-optimized meta descriptions with live Google SERP preview and character count counter. Maximize organic search traffic.'
    }
  };

  const currentMeta = toolMetaTitles[initialTool] || {
    title: 'Free Online AI Tools - Summarizer, Paraphraser, Email & SEO Studio',
    desc: 'Instant browser-based AI utilities: AI Text Summarizer, Paraphrasing Tool, Professional Email Writer, Title Generator, and Meta Description Creator.'
  };

  const faqList = [
    {
      q: 'Are these interactive AI tools 100% free to use?',
      a: 'Yes, all 5 built-in tools on AIToolNest are completely free with no registration, API keys, or credit cards required.'
    },
    {
      q: 'Can I copy the generated outputs directly into my projects?',
      a: 'Yes. Every tool includes a dedicated one-click Copy button that saves the output straight to your clipboard for instant pasting.'
    },
    {
      q: 'Do you store or retain the text I paste into the tools?',
      a: 'No. All processing occurs securely in memory and in your browser session. We do not store, log, or train models on user inputs.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={currentMeta.title}
        description={currentMeta.desc}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'Interactive AI Studio', path: '/interactive-tools' }
        ]}
      />

      {/* Main Studio Component */}
      <InteractiveToolsStudio initialTool={initialTool} />

      {/* Trust & Features Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Zero Latency & Instant</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Lightning-fast client and server processing generates results in under 200 milliseconds.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Private & Safe</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your inputs are never logged, tracked, or sold to third-party advertising networks.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Commercial Ready</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All outputs are free for personal, editorial, freelance, and commercial use.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-['Space_Grotesk']">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {faqList.map((faq, i) => (
            <div key={i} className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">Q.</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
