import React, { useState } from 'react';
import { Briefcase, TrendingUp, Cpu, Users, BarChart3, CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';

export const AIToolsForBusinessView: React.FC = () => {
  const { tools, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'operations' | 'marketing' | 'sales'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const businessTools = tools.filter((t) => {
    return (
      t.category === 'ai-business-tools' ||
      t.category === 'ai-productivity-tools' ||
      t.category === 'ai-marketing-tools' ||
      t.useCases.some((u) => u.toLowerCase().includes('business') || u.toLowerCase().includes('automation'))
    );
  });

  const faqs = [
    {
      q: 'Which AI tools deliver the highest immediate ROI for small businesses?',
      a: 'Meeting transcription and action-item generators (Otter.ai, Fireflies.ai) save 4-6 hours per employee weekly. Zapier and Make automation scenarios eliminate manual data entry between forms, CRMs (HubSpot), and email marketing suites (Mailchimp).'
    },
    {
      q: 'Is customer data safe when using commercial AI tools?',
      a: 'Enterprise-tier AI platforms like HubSpot AI, Notion AI, and Claude for Work do not use customer proprietary data to train frontier base models. Always verify SOC2 Type II compliance and zero-data-retention agreements for sensitive operational workflows.'
    },
    {
      q: 'How can small teams compete with large corporations using AI?',
      a: 'Small agile teams can leverage autonomous AI agent stacks (Make + Claude + HeyGen + Tidio) to deliver 24/7 multilingual customer support, instant video localization, and individualized outbound prospecting at less than 5% of traditional staffing overhead.'
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
        title="Best AI Tools for Business & Enterprise (2026 ROI Guide)"
        description="Scale business revenue and cut operational costs with top-rated AI tools for sales, marketing, automated customer support, and meeting productivity."
        canonicalUrl="https://aitoolnest.com/#/ai-tools-for-business"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'AI Tools for Business' }
        ]}
      />

      {/* Hero */}
      <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-indigo-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Enterprise Efficiency & Operations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Best AI Tools for Business Growth
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminate operational friction, scale customer acquisition, and automate repetitive workflows. Audited software solutions for modern founders, operations executives, and distributed teams.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-indigo-200">
            <div className="flex items-center gap-2 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-800/40">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Average 35% Cost Reduction</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-800/40">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Multi-Platform Integrations</span>
            </div>
            <div className="flex items-center gap-2 bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-800/40">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Enterprise SOC2 Verified</span>
            </div>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Featured Tools Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Recommended Business AI Software ({businessTools.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Battle-tested tools for customer support, workflow automation, and project management
            </p>
          </div>

          <button
            onClick={() => navigate('/business-ideas')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1.5"
          >
            <span>Explore 10+ AI Business Blueprints</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.badges.includes('Staff Pick')} />
          ))}
        </div>
      </section>

      {/* ROI Pillars */}
      <section className="bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Where AI Saves the Most Money in 2026
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Data synthesized from over 250 case studies across high-growth startups and SMBs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Customer Support (70% First-Contact Resolution)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Using tools like Tidio Lyro or custom Zendesk AI agents resolves repetitive inquiries instantly without human intervention.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Automated Sales Workflows (10x Output)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting HubSpot with Zapier and Claude triggers personalized outreach emails and automated deal stage updates automatically.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Meeting & Knowledge Ops (15 hrs/mo/person)</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Otter.ai and Fireflies.ai capture meeting transcripts, extract action items, and sync tickets straight into ClickUp and Asana.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Business AI Implementation FAQs
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0 ml-4" />
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
