import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Play,
  Sparkles,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TutorialCard } from '../components/TutorialCard';
import { copyToClipboard } from '../utils/clipboard';

interface TutorialDetailViewProps {
  slug: string;
}

export const TutorialDetailView: React.FC<TutorialDetailViewProps> = ({ slug }) => {
  const { tutorials, tools, navigate, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [bannerImageError, setBannerImageError] = useState(false);

  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] mb-2">
          Tutorial Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          The tutorial you are looking for might have been moved, updated, or does not exist.
        </p>
        <button
          onClick={() => navigate('/tutorials')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Tutorials</span>
        </button>
      </div>
    );
  }

  // Find related tools from directory
  const relatedToolsData = tools.filter((tool) =>
    tutorial.relatedTools.some(
      (rel) => rel.toLowerCase() === tool.slug.toLowerCase() || rel.toLowerCase() === tool.name.toLowerCase()
    )
  );

  // Find related tutorials
  const relatedTutorials = tutorials
    .filter((t) => t.id !== tutorial.id && (t.category === tutorial.category || t.difficulty === tutorial.difficulty))
    .slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedLink(true);
      showToast('Tutorial link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      showToast('Unable to copy link.');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80';
      case 'Intermediate':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80';
      case 'Advanced':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/80';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      <SEOHead
        title={`${tutorial.title} - Step-by-Step AI Tutorial | AIToolNest`}
        description={tutorial.description}
        canonicalUrl={`https://aitoolnest.com/tutorials/${tutorial.slug}`}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'AI Tutorials', path: '/tutorials' },
            { label: tutorial.title }
          ]}
        />

        {/* Header Metadata */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
              {tutorial.category}
            </span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(tutorial.difficulty)}`}>
              {tutorial.difficulty}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{tutorial.duration}</span>
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>{tutorial.steps.length} Steps</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight leading-tight">
            {tutorial.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {tutorial.description}
          </p>

          {/* Author bar & Share button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80">
            {tutorial.author ? (
              <div className="flex items-center gap-3">
                {tutorial.author.avatar && (
                  <img
                    src={tutorial.author.avatar}
                    alt={tutorial.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {tutorial.author.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {tutorial.author.role} {tutorial.publishedDate ? `• Published ${tutorial.publishedDate}` : ''}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">AIToolNest Editorial Guide</div>
            )}

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-indigo-500" />}
              <span>{copiedLink ? 'Copied!' : 'Share Guide'}</span>
            </button>
          </div>
        </header>

        {/* SECTION: Media Area (Video Embed if videoUrl exists; Clean Step-by-Step Guide presentation if no video) */}
        <section aria-label="Tutorial Media" className="w-full">
          {tutorial.videoUrl && tutorial.videoUrl.trim() ? (
            /* Video Embed Player Container */
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-slate-800">
              <iframe
                src={tutorial.videoUrl}
                title={tutorial.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            /* Clean Hero Banner: Step-by-Step Written Guide Presentation */
            <div className="relative aspect-video max-h-[460px] w-full rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200/80 dark:border-slate-800 group">
              {bannerImageError || !tutorial.thumbnail ? (
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center mb-3">
                      <BookOpen className="w-8 h-8 text-indigo-300" />
                    </div>
                    <span className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                      {tutorial.category} • Step-by-Step Guide
                    </span>
                  </div>
                </div>
              ) : (
                <img
                  src={tutorial.thumbnail}
                  alt=""
                  onError={() => setBannerImageError(true)}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/20 pointer-events-none" />

              {/* Written Guide Presentation Banner */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white pointer-events-none">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-[11px] font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Step-by-Step Written Guide</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Comprehensive written walkthrough with prompt examples, practical steps, and expert tips below.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90">
                    {tutorial.duration}
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION: Introduction */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Overview &amp; Introduction</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {tutorial.introduction}
          </p>
        </section>

        {/* SECTION: What You Need */}
        {tutorial.whatYouNeed && tutorial.whatYouNeed.length > 0 && (
          <section className="bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl p-6 sm:p-8 border border-indigo-200/80 dark:border-indigo-900/50 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>What You Need Before Starting</span>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tutorial.whatYouNeed.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 bg-white/90 dark:bg-slate-900/80 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* SECTION: Step-by-Step Instructions */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Step-by-Step Instructions
            </h2>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {tutorial.steps.length} guided actions
            </span>
          </div>

          <div className="space-y-6">
            {tutorial.steps.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                {/* Step Header */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm font-['Space_Grotesk']">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                    {step.title}
                  </h3>
                </div>

                {/* Step Description */}
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed pl-0 sm:pl-11">
                  {step.description}
                </p>

                {/* Optional Prompt Example Box */}
                {step.promptExample && (
                  <div className="pl-0 sm:pl-11 pt-2">
                    <div className="bg-slate-50 dark:bg-slate-950/80 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tested Prompt Template</span>
                        </span>
                        <button
                          onClick={async () => {
                            await copyToClipboard(step.promptExample!);
                            showToast('Copied prompt to clipboard!');
                          }}
                          className="inline-flex items-center gap-1 text-[11px] hover:underline cursor-pointer text-slate-500 dark:text-slate-400 hover:text-indigo-600"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800/80 select-all">
                        {step.promptExample}
                      </p>
                    </div>
                  </div>
                )}

                {/* Optional Step Tip */}
                {step.tips && (
                  <div className="pl-0 sm:pl-11 pt-1">
                    <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-xl p-3.5 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong>Pro Tip:</strong> {step.tips}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Useful Tips & Best Practices */}
        {tutorial.tips && tutorial.tips.length > 0 && (
          <section className="bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-6 sm:p-8 border border-emerald-200/70 dark:border-emerald-900/40 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Useful Tips &amp; Best Practices</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tutorial.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Common Mistakes to Avoid */}
        {tutorial.commonMistakes && tutorial.commonMistakes.length > 0 && (
          <section className="bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl p-6 sm:p-8 border border-rose-200/70 dark:border-rose-900/40 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>Common Mistakes to Avoid</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tutorial.commonMistakes.map((mistake, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Conclusion */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Conclusion &amp; Key Takeaways
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {tutorial.conclusion}
          </p>
        </section>

        {/* SECTION: Related AI Tools */}
        {relatedToolsData.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Related AI Software Tools
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Featured tools mentioned in this tutorial with audited pricing and features
                </p>
              </div>
              <button
                onClick={() => navigate('/ai-tools')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Browse All Tools</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedToolsData.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigate(`/ai-tools/${tool.slug}`)}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tool.pricingType}
                      </span>
                      <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                        ★ {tool.rating}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Space_Grotesk']">
                      {tool.name}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {tool.tagline || tool.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>View Tool Overview</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION: Related Tutorials */}
        {relatedTutorials.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Related Tutorials
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Expand your skills with these companion step-by-step guides
                </p>
              </div>
              <button
                onClick={() => navigate('/tutorials')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View All Tutorials</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTutorials.map((tut) => (
                <TutorialCard key={tut.id} tutorial={tut} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
