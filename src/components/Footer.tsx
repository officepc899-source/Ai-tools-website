import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, ArrowRight, Check, Pin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useApp();
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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-br from-indigo-900/60 to-slate-800 border border-indigo-500/20 rounded-2xl p-6 sm:p-10 mb-16 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly AI & Online Business Dispatch</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Get the Top AI Tools & High-Margin Business Blueprints
            </h3>
            <p className="text-slate-300 text-sm mt-2 mb-6 leading-relaxed">
              Join 42,000+ creators, indie founders, and solopreneurs receiving our Friday breakdown of verified tools, prompts, and case studies. Zero spam.
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
                  <span>Join 42,000+ Readers</span>
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
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-['Space_Grotesk']">
                AITool<span className="text-indigo-400">Nest</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The premier destination for discovering curated AI tools, scalable online business blueprints, and commercial digital product assets.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Independently Researched</span>
            </div>
          </div>

          {/* Column 2: AI Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              AI Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/tools?category=free')} className="hover:text-white transition-colors">
                  Free AI Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools?category=writing')} className="hover:text-white transition-colors">
                  AI Writing Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools?category=design')} className="hover:text-white transition-colors">
                  AI Design Tools
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools?category=business')} className="hover:text-white transition-colors">
                  AI for Business
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools?category=students')} className="hover:text-white transition-colors">
                  AI for Students
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/tools?category=productivity')} className="hover:text-white transition-colors">
                  AI Productivity
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Business Ideas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Business Ideas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/business-ideas?category=online-business')} className="hover:text-white transition-colors">
                  Online Business Ideas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business-ideas?category=ai-business')} className="hover:text-white transition-colors">
                  AI Business Models
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business-ideas?category=side-hustle')} className="hover:text-white transition-colors">
                  Side Hustles
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business-ideas?category=small-business')} className="hover:text-white transition-colors">
                  Small Business Automation
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/digital-products')} className="hover:text-white transition-colors">
                  Digital Product Ideas
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Pinterest Landing Hubs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 font-mono flex items-center gap-1">
              <Pin className="w-3 h-3" />
              <span>Pinterest Hubs</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/landing/free-ai-tools')} className="hover:text-white transition-colors">
                  Free AI Tools Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/landing/online-business-ideas')} className="hover:text-white transition-colors">
                  Online Business Ideas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/landing/ai-writing-tools')} className="hover:text-white transition-colors">
                  AI Writing Tools Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/landing/ai-design-tools')} className="hover:text-white transition-colors">
                  AI Design Tools Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/landing/digital-product-ideas')} className="hover:text-white transition-colors">
                  Digital Products Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/landing/best-ai-websites')} className="hover:text-white transition-colors">
                  Best AI Websites Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Us & Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact & Submit Tool
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/disclaimer')} className="hover:text-white transition-colors">
                  Affiliate & Earnings Disclaimer
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button onClick={() => navigate('/sitemap.xml')} className="text-slate-500 hover:text-slate-300">
                  XML Sitemap
                </button>
                <span className="text-slate-600 mx-1.5">•</span>
                <button onClick={() => navigate('/robots.txt')} className="text-slate-500 hover:text-slate-300">
                  robots.txt
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Affiliate Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong>FTC Affiliate Disclosure:</strong> AIToolNest is an independent review and research resource. We may receive financial compensation when you purchase software or services through links on this site. This helps support our independent testing and maintenance at no extra cost to you.
          </p>
          <div className="text-slate-500 text-center md:text-right shrink-0">
            © 2026 AIToolNest. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
