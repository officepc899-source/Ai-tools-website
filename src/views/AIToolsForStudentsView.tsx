import React, { useState } from 'react';
import { GraduationCap, BookOpen, Search, CheckCircle2, ChevronDown, ChevronUp, Sparkles, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';

export const AIToolsForStudentsView: React.FC = () => {
  const { tools } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const studentTools = tools.filter((t) => {
    return (
      t.category === 'ai-tools-for-students' ||
      t.category === 'ai-research-tools' ||
      t.useCases.some((u) => u.toLowerCase().includes('student') || u.toLowerCase().includes('academic') || u.toLowerCase().includes('research'))
    );
  });

  const faqs = [
    {
      q: 'Will using AI research tools violate academic integrity policies?',
      a: 'Using AI tools like Consensus, Elicit, and NotebookLM for literature exploration, hypothesis brainstorming, and citation discovery aligns with academic ethics when properly credited. Always follow your institution’s generative AI code of conduct and avoid submitting unedited machine-generated prose as your own work.'
    },
    {
      q: 'Which AI tool is best for finding peer-reviewed scientific citations?',
      a: 'Consensus and Elicit are built specifically on Semantic Scholar and 200M+ research publications. Unlike ChatGPT, they cite real DOIs, summarize empirical consensus, and highlight sample sizes and experimental methodologies without hallucinating sources.'
    },
    {
      q: 'What is the best free study assistant tool in 2026?',
      a: 'Google NotebookLM is 100% free and allows you to upload lecture slides, PDF textbooks, and research papers. It creates instant study guides, flashcards, and interactive audio discussions strictly grounded in your provided materials.'
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
        title="Best AI Tools for Students & Researchers (2026 Academic Guide)"
        description="Study faster and write stronger research papers with vetted AI tools for citation discovery, literature reviews, proofreading, math solving, and note synthesis."
        canonicalUrl="https://aitoolnest.com/#/ai-tools-for-students"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'AI Tools for Students' }
        ]}
      />

      {/* Hero */}
      <header className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-blue-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/30">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Academic Excellence & Research Productivity</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Best AI Tools for Students & Researchers
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Accelerate your academic journey without compromising integrity. Curated software for literature synthesis, citation checking, computational problem solving, and crystal-clear writing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-blue-200">
            <span className="flex items-center gap-1.5 font-medium bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Source-Grounded Citations
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              Zero Hallucinations Guarantee
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/40">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Student Budget Friendly
            </span>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Tools List */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Top Academic & Research AI Tools ({studentTools.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified study aids, paper discovery engines, and academic proofreaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.pricingType === 'free'} />
          ))}
        </div>
      </section>

      {/* Academic Workflow Matrix */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            The 4-Stage Student AI Study System
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            How top university students achieve top marks in half the time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              1. Literature Discovery
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Consensus & Elicit</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Find 20+ peer-reviewed papers answering your exact thesis research question in seconds.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              2. Deep Comprehension
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">NotebookLM</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload dense PDF chapters and ask targeted questions grounded exclusively in your course materials.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              3. Math & Science
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Wolfram Alpha</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Solve complex calculus, chemistry equations, and physics simulations with verifiable step-by-step proofs.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider">
              4. Polishing & Style
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Paperpal & Grammarly</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Fix academic tone errors, eliminate passive voice, and check punctuation against journal submission rubrics.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Student AI FAQs
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 shrink-0 ml-4" />
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
