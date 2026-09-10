import React, { useMemo } from 'react';
import {
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Target,
  Share2,
  Layers,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BusinessIdeaCard } from '../components/BusinessIdeaCard';
import { AdBanner } from '../components/AdBanner';
import { copyToClipboard } from '../utils/clipboard';

interface BusinessIdeaDetailViewProps {
  slug: string;
}

export const BusinessIdeaDetailView: React.FC<BusinessIdeaDetailViewProps> = ({ slug }) => {
  const { businessIdeas, tools, navigate, showToast } = useApp();

  const idea = useMemo(() => businessIdeas.find((b) => b.slug === slug), [businessIdeas, slug]);

  const relatedIdeas = useMemo(() => {
    if (!idea) return [];
    return businessIdeas.filter((b) => b.id !== idea.id && b.category === idea.category).slice(0, 3);
  }, [businessIdeas, idea]);

  if (!idea) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Business Idea Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find a blueprint matching &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/business-ideas')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
        >
          Return to Business Ideas
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      showToast('Blueprint link copied to clipboard!');
    } else {
      showToast('Unable to copy link to clipboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${idea.title} - Complete Launch Blueprint & Financials`}
        description={idea.summary}
        canonicalUrl={`https://aitoolnest.com/#/business-idea/${idea.slug}`}
      />

      <Breadcrumbs
        items={[
          { label: 'Business Ideas', path: '/business-ideas' },
          { label: idea.categoryLabel, path: `/business-ideas?category=${idea.category}` },
          { label: idea.title }
        ]}
      />

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {idea.categoryLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {idea.difficulty} Difficulty
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] leading-tight">
              {idea.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              {idea.summary}
            </p>
          </div>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shrink-0 self-start cursor-pointer"
            title="Share blueprint"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Financial & Launch Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-1">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Startup Capital Needed</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{idea.startupCost}</div>
            <p className="text-xs text-slate-500 mt-1">Covers software subscriptions and domain.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Time to Launch</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{idea.timeToLaunch}</div>
            <p className="text-xs text-slate-500 mt-1">From idea validation to first live customer.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-1">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Monthly Earning Potential</span>
            </div>
            <div className="text-2xl font-black text-emerald-600">{idea.earningPotential}</div>
            <p className="text-xs text-slate-500 mt-1">Based on benchmark solopreneur margins.</p>
          </div>
        </div>
      </div>

      {/* Target Audience & High-Leverage Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Target className="w-4 h-4 text-indigo-600" />
            <span>Target Audience & Ideal Clients</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {idea.targetMarket}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Competitive Advantage & Moat</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            High automation leverage allows 1 person to deliver agency-grade outputs with &gt;80% gross profit margins.
          </p>
        </div>
      </div>

      {/* Required Tech Stack & Software */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono mb-1 flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            <span>Recommended Tech Stack</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            Required Tools & Software Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The software suite required to automate fulfillment, marketing, and client intake.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {idea.techStack.map((techName, idx) => {
            const matchedTool = tools.find(
              (t) => t.name.toLowerCase() === techName.toLowerCase() || t.slug.toLowerCase() === techName.toLowerCase().replace(/\s+/g, '-')
            );
            return (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{techName}</div>
                  <div className="text-xs text-indigo-600 font-medium mt-0.5">Core Software</div>
                </div>

                {matchedTool && (
                  <button
                    onClick={() => navigate(`/tool/${matchedTool.slug}`)}
                    className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 pt-2 border-t border-slate-200 cursor-pointer"
                  >
                    <span>View Tool Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Launch Roadmap */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Implementation Framework</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            Step-by-Step Launch Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow this sequential checklist to de-risk your launch.
          </p>
        </div>

        <div className="space-y-4">
          {idea.stepByStepRoadmap.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-base flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
                    Phase {item.step}: {item.phase}
                  </span>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{item.action}</p>
                </div>
              </div>

              {item.toolsRecommended && item.toolsRecommended.length > 0 && (
                <div className="shrink-0 sm:text-right text-xs text-slate-500 font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                  Tools: {item.toolsRecommended.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Monetization Strategy Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono mb-1">
            Revenue Streams
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            Monetization & Pricing Strategy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How to structure high-converting offers with predictable recurring cash flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {idea.monetizationMethods.map((method, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-3">
                  #{idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{method}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* In-feed Display Ad */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Related Business Ideas */}
      {relatedIdeas.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
                More {idea.categoryLabel} Blueprints
              </h3>
              <p className="text-xs text-slate-500">Other vetted startup models in this vertical</p>
            </div>
            <button
              onClick={() => navigate('/business-ideas')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Browse All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedIdeas.map((relIdea) => (
              <BusinessIdeaCard key={relIdea.id} idea={relIdea} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
