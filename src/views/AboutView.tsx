import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Search,
  Zap,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  HeartHandshake,
  Check,
  Mail,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AboutView: React.FC = () => {
  const { navigate, setSubmitToolModalOpen } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <SEOHead
        title="About Us - Our Mission & AI Evaluation Standards | AIToolNest"
        description="Learn how AIToolNest helps users discover, evaluate, and benchmark the best AI tools, software, automation platforms, and productivity solutions."
        canonicalUrl="https://aitoolnest.com/#/about"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About AIToolNest',
          description: 'AIToolNest helps users discover the best AI tools, software, automation platforms, and productivity solutions.',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIToolNest',
            url: 'https://aitoolnest.com',
            logo: 'https://aitoolnest.com/logo.png',
            foundingDate: '2024',
            description: 'The premier independent directory and benchmarking platform for artificial intelligence software, tools, and digital solutions.'
          }
        }}
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Independent AI Intelligence & Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Empowering Builders to Discover The Best in Artificial Intelligence
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white font-semibold">AIToolNest</strong> helps creators, businesses, developers, and students cut through the noise to discover, benchmark, and deploy the world’s most effective AI tools, automation software, and productivity platforms.
        </p>
      </section>

      {/* Key Numbers / Counter Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center">
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-['Space_Grotesk']">10,000+</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">AI Tools Evaluated</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">100+</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Curated Categories</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-['Space_Grotesk']">Weekly</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Fresh Price Audits</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">100%</div>
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Editorial Integrity</div>
        </div>
      </section>

      {/* SECTION 1: Who We Are */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">Origins & Identity</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Who We Are
            </h2>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-base leading-relaxed space-y-4">
          <p>
            AIToolNest was founded by a collective of software engineers, product researchers, and tech writers who found themselves overwhelmed by the sheer volume of new AI products flooding the internet every day. When thousands of AI apps launch each month—many of which are superficial wrappers around identical API endpoints—identifying software with genuine utility becomes a formidable challenge.
          </p>
          <p>
            We built AIToolNest as an open, authoritative discovery catalog and testing ground. Our team tests AI tools in real-world professional contexts: we deploy them across coding sprints, video editing timelines, academic literature reviews, and automated marketing pipelines to separate transformative breakthroughs from short-lived marketing hype.
          </p>
        </div>
      </section>

      {/* SECTION 2: Our Mission */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">Purpose & Commitment</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Our Mission
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
            Our mission is simple yet vital: <strong className="text-indigo-600 dark:text-indigo-400">To democratize access to artificial intelligence by providing unbiased, actionable, and rigorously vetted intelligence on every tool that matters.</strong>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Cut Decision Paralysis</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Help you choose the right tool in 3 minutes rather than 3 days of trial and error.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Transparent Pricing</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Clearly separate 100% free software from deceptive trial paywalls.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Actionable Workflows</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Provide step-by-step guides, prompts, and automation blueprints that work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Choose AIToolNest */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">Our Differentiators</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Why Choose AIToolNest
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Strict Editorial Independence</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never sell rankings, star ratings, or favorable review conclusions. If a software suite suffers from severe hallucination or hidden fees, we state it plainly in our Cons breakdown.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Hands-On Testing Over Spec Sheets</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We don’t copy-paste landing page marketing copy. Every tool listed has undergone real generation tests, speed benchmarks, and user-interface audits by our research analysts.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Continuous Weekly Audits</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              AI software updates fast. Models get superseded, free credit allowances shift, and features evolve. We re-verify pricing plans and active features on a regular weekly cadence.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: How We Select AI Tools */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400 font-mono">Our Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              How We Select & Audit AI Tools
            </h2>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Before any AI tool receives a featured badge or recommendation on AIToolNest, it must pass through our rigorous 5-stage editorial evaluation process:
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              01
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Legitimacy & Security Screening</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We verify the developer or founding organization, examine privacy policies for data retention safeguards, check SSL security certificates, and ensure customer data is not mishandled.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              02
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Core Model & Feature Benchmarking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We execute standardized test prompts across writing clarity, coding accuracy, image fidelity, or audio naturalness to compare raw performance against industry benchmark standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              03
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pricing & Value-For-Money Audit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We confirm whether the tool offers a truly functional free tier, calculate the cost-per-generation on paid subscriptions, and compare pricing against open-source alternatives.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              04
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">UX, Accessibility & Export Options</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Software must be pleasant to use. We evaluate interface responsiveness, keyboard shortcuts, export formats (MP4, WAV, CSV, TSX, Markdown), and learning curves for beginners.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              05
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Community Sentiment & Reliability Monitoring</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                We monitor real user reports on GitHub, Reddit, and developer forums to track uptime reliability, customer support responsiveness, and whether promised roadmaps are delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Our Vision */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">Looking Forward</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Our Vision
            </h2>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white space-y-4 shadow-xl">
          <h3 className="text-xl font-bold tracking-tight">
            A Future Where Human Creativity is Amplified, Not Replaced
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            We envision a technological landscape where artificial intelligence serves as a transparent, accessible cognitive lever for every individual. Whether you are a solo founder building a software venture from your bedroom, a student conducting groundbreaking thesis research, an artist exploring synthetic cinema, or an agency operator automating back-office spreadsheets—AI should unlock your maximum creative and economic potential.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            AIToolNest will continue to serve as your reliable navigation beacon across every iteration of generative intelligence, agentic automation, and spatial computing.
          </p>
        </div>
      </section>

      {/* SECTION 6: Official Contact & Editorial Office */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">Get in Touch</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
              Official Contact & Communication
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you are a developer with a new model, an enterprise seeking partnerships, or a user with feedback, we welcome your communication. All inquiries across our platform are routed directly to our primary desk.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span><strong className="text-slate-900 dark:text-white">Response Time:</strong> We usually respond within 24–48 hours.</span>
              </div>
            </div>

            <div className="md:col-span-5 p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono block">
                Primary Contact Email
              </span>
              <a
                href="mailto:aitoolnest1@gmail.com"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono block"
              >
                aitoolnest1@gmail.com
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                General Support • Tool Suggestions • Partnerships • Collaborations • Feedback
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Need to submit detailed inquiries or bug reports? Visit our dedicated contact center.
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Visit Contact Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Box */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xs">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Ready to Discover Your Next High-Leverage AI Tool?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore our vetted directory of 10,000+ AI tools, dive into step-by-step guides, or submit your own breakthrough AI application for review.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/tools')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore AI Tools Directory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setSubmitToolModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Submit an AI Tool
          </button>
        </div>
      </section>
    </div>
  );
};
