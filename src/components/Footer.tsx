import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, ArrowRight, Check, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate, showToast, setSubmitToolModalOpen } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Check your inbox for the 2026 AI Toolkit.');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly AI Tools & Innovation Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Stay Updated With The Latest AI Tools
            </h3>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              Join 45,000+ founders, marketers, and developers getting our weekly AI digest with top new tools, prompts, and tutorials.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-colors shrink-0 shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You are on the VIP dispatch list! Welcome aboard.</span>
              </div>
            )}
          </div>

          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Multi-column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Trust */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-['Space_Grotesk']">
                AITool<span className="text-indigo-400">Nest</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier destination for discovering vetted AI tools, curated prompt libraries, and scalable business workflows.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Independently Researched</span>
            </div>
            <div>
              <button
                onClick={() => setSubmitToolModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit Your AI Tool</span>
              </button>
            </div>
            <div className="pt-3 border-t border-slate-800/80 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Official Contact
              </span>
              <a
                href="mailto:aitoolnest1@gmail.com"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1.5 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>aitoolnest1@gmail.com</span>
              </a>
              <span className="text-[11px] text-slate-500 block">
                Replies within 24–48 hours
              </span>
            </div>
          </div>

          {/* Column 2: AI Directories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/ai-tools')} className="hover:text-white transition-colors">
                  All 10,000+ AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/free-ai-tools')} className="hover:text-white transition-colors text-emerald-400">
                  100% Free AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-tools-for-business')} className="hover:text-white transition-colors">
                  AI Tools for Business
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-tools-for-students')} className="hover:text-white transition-colors">
                  AI Tools for Students
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-image-generators')} className="hover:text-white transition-colors">
                  AI Image Generators
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/chatgpt-alternatives')} className="hover:text-white transition-colors">
                  ChatGPT Alternatives
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              AI Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/ai-prompts')} className="hover:text-white transition-colors">
                  Prompt Library (5,000+)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/blog')} className="hover:text-white transition-colors">
                  AI Guides & Tutorials
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business-ideas')} className="hover:text-white transition-colors">
                  AI Business Ideas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/digital-products')} className="hover:text-white transition-colors">
                  Digital Products & Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Top Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/category/ai-writing-tools')} className="hover:text-white transition-colors">
                  AI Writing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/ai-design-tools')} className="hover:text-white transition-colors">
                  AI Design & Visuals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/ai-video-tools')} className="hover:text-white transition-colors">
                  AI Video Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/ai-marketing-tools')} className="hover:text-white transition-colors">
                  AI Marketing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/ai-productivity-tools')} className="hover:text-white transition-colors">
                  AI Productivity
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/category/ai-business-tools')} className="hover:text-white transition-colors">
                  AI Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Company & Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About AIToolNest
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/affiliate-disclosure')} className="hover:text-white transition-colors cursor-pointer">
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/cookie-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/editorial-policy')} className="hover:text-white transition-colors cursor-pointer">
                  Editorial Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dmca-policy')} className="hover:text-white transition-colors cursor-pointer">
                  DMCA Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ai-ethics')} className="hover:text-white transition-colors cursor-pointer">
                  AI Ethics Statement
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/write-for-us')} className="hover:text-white transition-colors cursor-pointer text-indigo-400">
                  Write For Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/advertise')} className="hover:text-white transition-colors cursor-pointer text-indigo-400">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/sitemap')} className="hover:text-white transition-colors cursor-pointer text-slate-500">
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Affiliate Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong>Disclosure:</strong> AIToolNest is reader-supported. When you purchase software through links on our site, we may earn an affiliate commission at no extra cost to you.
          </p>
          <div className="text-slate-500 text-center md:text-right shrink-0">
            © 2026 AIToolNest. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
