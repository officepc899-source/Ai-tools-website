import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  FileText,
  Lock,
  Cookie,
  Award,
  AlertTriangle,
  PenTool,
  Send,
  CheckCircle2,
  ExternalLink,
  DollarSign,
  Cpu,
  Mail,
  HelpCircle,
  Scale,
  Settings,
  Sliders,
  Shield,
  Info,
  Check,
  X,
  RotateCcw,
  BarChart3,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

// Re-export dedicated view modules
export { AboutView } from './AboutView';
export { PrivacyPolicyView } from './PrivacyPolicyView';
export { ContactView } from './ContactView';

// --- 1. TERMS & CONDITIONS ---
export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Terms and Conditions of Use | AIToolNest"
        description="Review the terms, conditions, intellectual property guidelines, and user rules governing the use of AIToolNest."
        canonicalUrl="https://aitoolnest.com/#/terms"
      />
      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>User Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Terms and Conditions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Effective Date: January 1, 2026 • Last Updated: March 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">1. Agreement to Terms</h2>
          <p>
            By accessing or browsing <strong className="text-slate-900 dark:text-white">AIToolNest</strong> (the &ldquo;Service&rdquo;, &ldquo;Website&rdquo;, or &ldquo;we&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue your use of our platform immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">2. Directory & Software Information</h2>
          <p>
            AIToolNest operates as an independent research catalog, benchmarking platform, and directory. While we audit listed tools on a regular weekly cadence, software vendors frequently update features, API token allotments, free tier limits, and subscription pricing without notice. AIToolNest makes no warranties as to the accuracy, completeness, or ongoing availability of third-party software products. Users are responsible for confirming terms with vendors directly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">3. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the website design, editorial reviews, benchmarks, prompt collections, proprietary code, and databases on AIToolNest are the property of AIToolNest and protected by applicable copyright, trademark, and unfair competition laws. Third-party software logos, brand names, and trademarks belong to their respective corporate owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">4. User Conduct & Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>Engage in automated scraping, harvesting, or extracting of data without express written permission.</li>
            <li>Use our platform to transmit spam, malware, or unlawful promotional material.</li>
            <li>Submit fraudulent, deceptive, or malicious AI tool listings.</li>
            <li>Circumvent or tamper with security features, rate limits, or access controls.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">5. Limitation of Liability</h2>
          <p>
            In no event shall AIToolNest, its directors, employees, or partners be liable for any indirect, incidental, consequential, special, or punitive damages arising from your access to or use of the service or any third-party tools listed on our website.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">6. Contact & Legal Inquiries</h2>
          <p>
            If you have questions, notices, or inquiries regarding these Terms and Conditions, please reach out to our legal and support team:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">
              Official Contact Email: <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">aitoolnest1@gmail.com</a>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Response Time: We usually respond within 24–48 hours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- 2. DISCLAIMER & EARNINGS TRANSPARENCY ---
export const DisclaimerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Disclaimer & Earnings Disclosure | AIToolNest"
        description="Affiliate disclosures, earnings transparency, and investment disclaimers in accordance with FTC guidelines."
        canonicalUrl="https://aitoolnest.com/#/disclaimer"
      />
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Legal Disclaimers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Website & Earnings Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Compliance with FTC 16 CFR Part 255 Guidelines
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed">
          <strong>Key Notice:</strong> AIToolNest provides editorial technology reviews, comparison guides, and AI directories for general informational and educational purposes only. Content is not legal, financial, or technical advice.
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">1. Affiliate Disclosure</h2>
          <p>
            Some of the links on AIToolNest are affiliate links. If you click on an affiliate link and make a purchase or subscribe to software, we may receive a referral commission from the provider. This comes at <strong className="text-slate-900 dark:text-white">no additional cost to you</strong>, and often grants you special promotional pricing or extended trial credits.
          </p>
          <p>
            Our editorial integrity is strictly separated from commercial relationships. We never alter a tool&apos;s star rating or pros/cons evaluation based on affiliate partnerships.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">2. Earnings & Business Idea Disclaimer</h2>
          <p>
            Any income claims, startup revenue estimates, or business projections illustrated in our guides (e.g. &ldquo;$5,000/mo AI Agency&rdquo;) are for educational illustration purposes. We make no promise or guarantee that you will earn any money using these strategies. Your success depends on your own skills, market conditions, and execution.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">3. Software Warranties & Performance</h2>
          <p>
            All tools, prompts, code snippets, and automated workflows are provided &ldquo;as is&rdquo;. While we test tools extensively, generative AI models can produce unexpected outputs or hallucinations. You are solely responsible for testing and validating any code or content generated by third-party AI software before deploying to production.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">4. Contact & Inquiries</h2>
          <p>
            For questions, transparency requests, or reporting discrepancies regarding our disclosures, please contact:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
            <div className="font-semibold text-slate-900 dark:text-white">
              Official Contact Email: <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">aitoolnest1@gmail.com</a>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Response Time: We usually respond within 24–48 hours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- 3. COOKIE POLICY ---
export const CookiePolicyView: React.FC = () => {
  const { showToast, navigate } = useApp();
  const STORAGE_KEY = 'aitoolnest_cookie_consent_v1';

  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);
  const [savedTimestamp, setSavedTimestamp] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.analytics === 'boolean') setAnalyticsConsent(parsed.analytics);
        if (typeof parsed.advertising === 'boolean') setAdvertisingConsent(parsed.advertising);
        if (parsed.timestamp) setSavedTimestamp(parsed.timestamp);
      }
    } catch {
      // Fallback
    }
  }, []);

  const savePreferences = (analytics: boolean, advertising: boolean) => {
    const prefs = {
      essential: true,
      analytics,
      advertising,
      timestamp: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: analytics ? 'granted' : 'denied',
          ad_storage: advertising ? 'granted' : 'denied',
          ad_user_data: advertising ? 'granted' : 'denied',
          ad_personalization: advertising ? 'granted' : 'denied'
        });
      }
      setAnalyticsConsent(analytics);
      setAdvertisingConsent(advertising);
      setSavedTimestamp(prefs.timestamp);
      showToast('Cookie preferences updated successfully.');
    } catch {
      showToast('Preferences could not be saved to local storage.');
    }
  };

  const handleOpenConsentBanner = () => {
    window.dispatchEvent(new CustomEvent('aitoolnest_open_cookie_preferences'));
    window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
    showToast('Cookie consent banner opened.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Cookie Policy - How We Use Cookies & Tracking Technologies | AIToolNest"
        description="Comprehensive Cookie Policy for AIToolNest. Learn how we utilize cookies, Google AdSense, analytics, and how to control your personal privacy preferences."
        canonicalUrl="https://aitoolnest.com/#/cookie-policy"
      />
      <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />

      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Cookie className="w-3.5 h-3.5" />
          <span>Tracking & Privacy Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Cookie Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: September 21, 2026 • Compliant with GDPR, CCPA/CPRA, and Google AdSense Policies
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-10 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        
        {/* Summary Introduction */}
        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-4">
          <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h2 className="font-bold text-slate-900 dark:text-white">Your Privacy Choices Matter to Us</h2>
            <p className="text-slate-600 dark:text-slate-300">
              AIToolNest is committed to full transparency regarding data storage and user tracking. This policy details how we use cookies, tracking pixels, and third-party advertising partners like Google AdSense to sustain our directory while respecting your digital autonomy.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section id="what-are-cookies" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files containing strings of letters and numbers that web servers store on your computer, mobile device, or browser when you visit a website. Cookies allow websites to &ldquo;remember&rdquo; your actions, preferences, device specifications, and user settings over time so you do not have to re-enter them whenever you return to the site or navigate from one page to another.
          </p>
          <p>
            In addition to standard HTTP cookies, we and our service providers may utilize related client-side storage technologies, such as:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            <li><strong className="text-slate-900 dark:text-white">HTML5 Web Storage (Local and Session Storage):</strong> Used to remember your selected theme (dark or light mode), recently bookmarked AI tools, and transient text drafts in our interactive generation utilities.</li>
            <li><strong className="text-slate-900 dark:text-white">Web Beacons and Pixels:</strong> Small transparent graphic images or code snippets used in conjunction with cookies to monitor user navigation flows and verify aggregate referral interactions.</li>
            <li><strong className="text-slate-900 dark:text-white">Session vs. Persistent Cookies:</strong> <em>Session cookies</em> are temporary and are automatically deleted when you close your web browser. <em>Persistent cookies</em> remain stored on your device until they reach their configured expiration date or until you manually clear them through your browser settings.</li>
            <li><strong className="text-slate-900 dark:text-white">First-Party vs. Third-Party Cookies:</strong> <em>First-party cookies</em> are set directly by AIToolNest. <em>Third-party cookies</em> are set by third-party domains providing specialized services like programmatic advertising, video embedding, or traffic analytics.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="how-we-use-cookies" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            2. How We Use Cookies
          </h2>
          <p>
            At AIToolNest, we utilize cookies and related technologies for several distinct and essential operational objectives:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Core Platform Stability</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Verifying genuine client sessions, protecting our API endpoints from CSRF exploits, rate-limiting malicious traffic, and maintaining user navigation integrity.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Personalized Experience</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Preserving your theme configuration (dark/light mode), remembering category filter states, and storing offline bookmarks of curated software.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Traffic &amp; Speed Telemetry</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Measuring site response speeds, evaluating Core Web Vitals, and identifying broken links or high-friction workflows anonymously.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-sm block">Ad Delivery &amp; Sustainability</span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Displaying non-intrusive Google AdSense advertising to support our directory, tutorials, and free resources.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="types-of-cookies-we-use" className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            3. Types of Cookies We Use
          </h2>
          <p>
            We classify all cookies operating on AIToolNest into four distinct categories based on their function and purpose:
          </p>

          <div className="space-y-4">
            {/* Essential */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">A. Strictly Necessary &amp; Security Cookies</h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider">
                  Always Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                These cookies are strictly required for the website to function securely and cannot be disabled in our systems. They are typically only set in response to actions made by you, such as establishing privacy preferences, logging into the administrative panel, or protecting input forms from Cross-Site Request Forgery (CSRF).
              </p>
              <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">aitoolnest_cookie_consent_v1:</span> Stores your cookie consent preferences (Duration: 1 year).</div>
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">admin_session:</span> Cryptographically signed HttpOnly token for authenticated admin users (Duration: 24 hours).</div>
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">aitoolnest_theme:</span> Preserves your dark/light appearance setting in localStorage (Persistent).</div>
              </div>
            </div>

            {/* Functional */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">B. Functional &amp; Preference Cookies</h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold uppercase tracking-wider">
                  Configurable
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                These cookies enable enhanced functionality, personalization, and interactive tools memory. If you disallow these cookies, some features such as tool bookmarks, quick search filtering, and state preservation across tab switches may not function smoothly.
              </p>
              <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">aitoolnest_bookmarks:</span> Keeps track of your saved AI tools in browser storage (Persistent).</div>
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">aitoolnest_recent_searches:</span> Remembers your recent query history for faster discovery (Persistent).</div>
              </div>
            </div>

            {/* Analytics */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">C. Analytics &amp; Performance Cookies</h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold uppercase tracking-wider">
                  User Opt-in / Opt-out
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                These cookies allow us to count visits and traffic sources to measure and improve site performance. They help us know which pages and tools are popular and see how visitors navigate the site.
              </p>
              <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">_ga / _ga_*:</span> Standard Google Analytics cookies used to calculate visitor and session statistics (Duration: up to 2 years).</div>
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">_gid:</span> Google Analytics cookie used to distinguish unique sessions across 24 hours.</div>
              </div>
            </div>

            {/* Advertising */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">D. Advertising &amp; Marketing Cookies</h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider">
                  Commercial Partners
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                These cookies may be set through our site by our advertising partner, Google AdSense, and its associated domains (such as DoubleClick). They are used to serve relevant ads, limit frequency, and report ad performance.
              </p>
              <div className="text-xs font-mono bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">__gads / __gpi:</span> Google AdSense advertising delivery, frequency capping, and ad reporting cookies (Duration: 13 months).</div>
                <div><span className="font-bold text-indigo-600 dark:text-indigo-400">IDE / test_cookie:</span> Google DoubleClick cookies used for ad measurement and serving (Duration: up to 1 year).</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="third-party-cookies" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            4. Third-Party Cookies
          </h2>
          <p>
            When you visit AIToolNest, certain third parties may place cookies or client-side identifiers on your device. These third parties include Google AdSense and analytics services.
          </p>
          <p>
            Please note that AIToolNest does not directly control the technical operation of third-party cookies. The collection and use of information by third parties is governed by their respective privacy policies.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-900 dark:text-white block">Key Third-Party Service Providers:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300">
              <li>
                <strong className="text-slate-900 dark:text-white">Google LLC:</strong> Provides Google AdSense, Google Analytics 4, and Google Tag Manager. Review Google&apos;s privacy practices at{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 underline inline-flex items-center gap-0.5">
                  Google Privacy &amp; Terms <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">External Software Websites:</strong> Outbound links on AIToolNest direct you to external third-party software websites. Once you leave AIToolNest, any cookies or data collection on those external sites are subject to the independent policies of those third-party providers.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section id="google-adsense" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            5. Google AdSense and Advertising Cookies
          </h2>
          <p>
            AIToolNest partners with Google AdSense (Publisher ID: <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400">ca-pub-2683919410645700</code>) to serve programmatic advertisements on our website.
          </p>
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-3 text-xs sm:text-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Mandatory Google Advertising Disclosure:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>
                Third-party vendors, including Google, use cookies to serve advertisements based on a user&apos;s prior visits to AIToolNest or other websites across the Internet.
              </li>
              <li>
                Google&apos;s use of advertising cookies (such as the DoubleClick DART cookie) enables it and its partners to serve personalized advertisements to our users based on their browsing activity across websites.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5">
                  Google Ads Settings <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                To learn more about how Google handles information in its advertising products, visit{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5">
                  Google Advertising Policies <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
            </ul>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            For users in the European Economic Area (EEA), United Kingdom (UK), and California, our consent management interface communicates directly with Google Tag Manager and AdSense. If you reject advertising cookies, Google AdSense falls back to serving non-personalized, contextual advertisements that do not rely on past browsing profiles.
          </p>
        </section>

        {/* Section 6 */}
        <section id="analytics-and-performance" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            6. Analytics and Performance
          </h2>
          <p>
            We utilize Google Analytics 4 to evaluate how visitors interact with our software reviews, tutorials, and business resources.
          </p>
          <p>
            Google Analytics cookies collect standard operational metrics such as device operating system, browser version, approximate geographic region, time spent on pages, and navigation interactions. We do not use Google Analytics to collect personal contact information such as your name or email address.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
            <span className="font-semibold text-slate-900 dark:text-white block">Google Analytics Opt-Out Add-on:</span>
            <p className="text-slate-600 dark:text-slate-400">
              If you wish to prevent your data from being utilized by Google Analytics across all websites, you can install the official browser extension provided by Google:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer nofollow" className="text-indigo-600 dark:text-indigo-400 underline font-semibold inline-flex items-center gap-0.5">
                Google Analytics Opt-out Browser Add-on <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </div>
        </section>

        {/* Section 7 - Interactive Cookie Preferences */}
        <section id="managing-cookie-preferences" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                7. Managing Your Cookie Preferences
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Adjust your consent preferences below or launch the consent banner anytime.
              </p>
            </div>
            <button
              onClick={handleOpenConsentBanner}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer self-start sm:self-auto"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-500" />
              <span>Open Cookie Banner</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            You can configure your cookie preferences right here on this page. Your choices are automatically synchronized with our site-wide CookieConsent system, Google Tag Manager, and Google Analytics 4 consent modes.
          </p>

          {/* Interactive Consent Control Card */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Active Preferences Manager</span>
              </div>
              {savedTimestamp && (
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Last recorded: {new Date(savedTimestamp).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {/* Essential Item */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5 pr-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Strictly Necessary Cookies</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Security tokens, consent records, and appearance state.</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                  Always Active
                </span>
              </div>

              {/* Analytics Item */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5 pr-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Analytics &amp; Performance Cookies</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Google Analytics 4 traffic measurement and site speed optimization.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Advertising Item */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5 pr-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Google AdSense &amp; Advertising Cookies</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Ad delivery, frequency capping, and ad measurement.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={advertisingConsent}
                    onChange={(e) => setAdvertisingConsent(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {/* Preference Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => savePreferences(analyticsConsent, advertisingConsent)}
                className="py-2.5 px-5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                Save Cookie Preferences
              </button>
              <button
                onClick={() => savePreferences(true, true)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={() => savePreferences(false, false)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section id="how-to-disable-cookies" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            8. How to Disable Cookies
          </h2>
          <p>
            In addition to our on-site preferences manager, most modern web browsers provide controls that allow you to block, delete, or restrict cookies on a per-site or global basis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Google Chrome</span>
              <p className="text-slate-600 dark:text-slate-400">
                Go to <span className="font-mono text-[11px]">Settings &gt; Privacy and security &gt; Third-party cookies</span>. From there, you can block third-party cookies or customize site permissions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Mozilla Firefox</span>
              <p className="text-slate-600 dark:text-slate-400">
                Go to <span className="font-mono text-[11px]">Settings &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection</span> to select Standard or Strict blocking modes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Apple Safari (macOS / iOS)</span>
              <p className="text-slate-600 dark:text-slate-400">
                Go to <span className="font-mono text-[11px]">Safari &gt; Settings &gt; Advanced</span>, and enable <span className="font-mono text-[11px]">Block all cookies</span> or enable Prevent Cross-Site Tracking.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Microsoft Edge</span>
              <p className="text-slate-600 dark:text-slate-400">
                Go to <span className="font-mono text-[11px]">Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data</span>.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <strong className="text-slate-900 dark:text-white">Impact of Disabling Cookies:</strong> If you configure your browser to block all cookies (including strictly necessary cookies), certain interactive capabilities of AIToolNest—such as preserving your preferred dark/light theme, remembering bookmarked tools, and saving generated texts—may not function as intended.
          </div>
        </section>

        {/* Section 9 */}
        <section id="changes-to-this-policy" className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            9. Changes to This Cookie Policy
          </h2>
          <p>
            We may periodically revise this Cookie Policy to reflect technical modifications to our platform, changes in our partner integrations, updated regulatory guidance (such as evolving interpretations of GDPR, ePrivacy Directive, or CCPA), or enhancements to Google AdSense policies.
          </p>
          <p>
            Whenever modifications are made, we will update the &ldquo;Last Updated&rdquo; date at the top of this document. For significant or material changes that impact how your information is handled, we will provide additional prominent notice via our site banner or home page. We encourage you to review this Cookie Policy periodically to stay informed about our tracking and privacy standards.
          </p>
        </section>

        {/* Section 10 */}
        <section id="contact-us" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            10. Contact Us
          </h2>
          <p>
            If you have questions, comments, or concerns regarding this Cookie Policy, our advertising practices, or how your personal privacy preferences are applied, please reach out to our privacy administration team:
          </p>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-2">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Official Privacy &amp; Cookie Inquiries:</span>
              <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">
                aitoolnest1@gmail.com
              </a>
            </div>
            <div className="text-slate-600 dark:text-slate-300">
              <span>Platform Portal: </span>
              <button
                onClick={() => navigate('/contact')}
                className="text-indigo-600 dark:text-indigo-400 underline font-semibold hover:text-indigo-700 cursor-pointer"
              >
                Contact Form &amp; Support Desk
              </button>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Inquiries sent to our email address are typically reviewed within 24–48 hours.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

// --- 4. EDITORIAL POLICY ---
export const EditorialPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Editorial Policy & Testing Standards | AIToolNest"
        description="Our independent review process, testing criteria, rating methodology, and strict separation between ads and editorial opinions."
        canonicalUrl="https://aitoolnest.com/#/editorial-policy"
      />
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Journalistic Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Editorial Policy & Testing Standards
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Independent, Transparent, and Real-World Tested
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">1. Editorial Independence</h2>
          <p>
            At AIToolNest, our highest priority is our readers&apos; trust. Our editorial content—including star ratings, best-of roundups, benchmark reports, and pros/cons analyses—is formulated entirely independently from commercial partnerships. Advertisers cannot purchase favorable reviews or alter our testing conclusions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">2. How We Test AI Tools</h2>
          <p>Every featured tool undergoes hands-on evaluations across 5 primary pillars:</p>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">Output Quality:</strong> Standardized test prompts across copy, coding, visual generation, or audio fidelity to gauge model intelligence and reliability.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">Speed & Latency:</strong> Real generation turnaround times and user interface responsiveness.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">Pricing & Fairness:</strong> Verification of genuine free tiers, token costs, and transparency against hidden subscription auto-renewals.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">Data Privacy & Security:</strong> Auditing whether user inputs are used for model training and ensuring SSL/TLS encryption.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">User Experience:</strong> Intuitiveness, keyboard shortcuts, export formats, and onboarding friction for non-technical users.
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">3. Corrections & Fact-Checking</h2>
          <p>
            When errors occur or software companies modify their features, we promptly investigate and publish updates. If you notice an outdated pricing figure or discontinued feature, please notify our team at <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline font-mono">aitoolnest1@gmail.com</a>.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We usually respond within 24–48 hours to all editorial correction notices and update requests.
          </p>
        </section>
      </div>
    </div>
  );
};

// --- 5. DMCA POLICY ---
export const DMCAPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="DMCA Copyright & Takedown Policy | AIToolNest"
        description="Procedures and designated agent information for reporting copyright infringement under the Digital Millennium Copyright Act."
        canonicalUrl="https://aitoolnest.com/#/dmca-policy"
      />
      <Breadcrumbs items={[{ label: 'DMCA Policy' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Copyright Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          DMCA Copyright Notice & Takedown Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Compliance with 17 U.S.C. § 512
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Notice of Copyright Infringement</h2>
          <p>
            AIToolNest respects the intellectual property rights of creators and software developers. In accordance with the Digital Millennium Copyright Act (17 U.S.C. § 512), we respond expeditiously to valid copyright infringement notifications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">How to Submit a DMCA Takedown Notice</h2>
          <p>If you believe your copyrighted work is being infringed on AIToolNest, submit a written notice containing:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing, with the exact URL on AIToolNest.</li>
            <li>Your contact information: physical address, telephone number, and email address.</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner.</li>
            <li>A statement made under penalty of perjury that the information is accurate and you are authorized to act on behalf of the owner.</li>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Designated Copyright Agent</h2>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1">
            <strong className="block text-slate-900 dark:text-white">DMCA Compliance Desk</strong>
            <p className="text-slate-600 dark:text-slate-400">AIToolNest Compliance Team</p>
            <div>
              Email: <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 underline font-mono">aitoolnest1@gmail.com</a>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Response Time: We usually respond within 24–48 hours.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- 6. WRITE FOR US ---
export const WriteForUsView: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your pitch has been received! We review contributor pitches on Fridays.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Write For Us - Guest Post & AI Contributor Guidelines | AIToolNest"
        description="Become a guest author on AIToolNest. Share in-depth AI tool comparisons, developer workflows, and prompt engineering tutorials."
        canonicalUrl="https://aitoolnest.com/#/write-for-us"
      />
      <Breadcrumbs items={[{ label: 'Write For Us' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <PenTool className="w-3.5 h-3.5" />
          <span>Guest Contributor Program</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Write For AIToolNest
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Share your AI expertise with 500,000+ monthly builders, developers, and creators
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">What We Look For</h2>
          <p>
            We publish high-utility, deeply tested technical tutorials, AI tool benchmarks, prompt collections, and practical automation case studies. We do NOT publish shallow generic listicles or AI-generated spam articles.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="block text-slate-900 dark:text-white mb-1">Deep Benchmarks</strong>
              Detailed head-to-head comparisons (e.g. Cursor vs GitHub Copilot vs Claude 3.7 Sonnet).
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="block text-slate-900 dark:text-white mb-1">Real Workflows</strong>
              Step-by-step guides showing how to build real software or marketing automation.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <strong className="block text-slate-900 dark:text-white mb-1">Prompt Engineering</strong>
              Tested prompt frameworks with reproducible before-and-after sample outputs.
            </div>
          </div>
        </section>

        {/* Pitch Form */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Submit an Article Pitch</h2>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Or email us directly: <a href="mailto:aitoolnest1@gmail.com?subject=Guest%20Post%20Pitch" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline font-mono">aitoolnest1@gmail.com</a>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            We review contributor outlines every week. Standard response time is 24–48 hours.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Proposed Title / Topic *</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., How to Build an Autonomous Video Production Pipeline With ComfyUI"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Brief Outline & Links to Previous Writing *</label>
                <textarea
                  rows={4}
                  required
                  value={outline}
                  onChange={(e) => setOutline(e.target.value)}
                  placeholder="Outline key sections, takeaways, and link to 2 published writing samples..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
              >
                Submit Pitch for Editorial Review
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-900 dark:text-white">Pitch Received!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Our editorial desk reviews pitches every Friday. We will reach out via email if your outline is selected.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

// --- 7. ADVERTISE WITH US ---
export const AdvertiseView: React.FC = () => {
  const { setSubmitToolModalOpen } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title="Advertise With Us - Reach 500,000+ AI Builders | AIToolNest"
        description="Promote your AI software product, SaaS, or newsletter to an engaged audience of tech founders, software developers, and creators on AIToolNest."
        canonicalUrl="https://aitoolnest.com/#/advertise"
      />
      <Breadcrumbs items={[{ label: 'Advertise With Us' }]} />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <DollarSign className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Sponsorships & Growth</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Accelerate Your AI Product Growth
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Reach qualified software buyers, startup founders, and technical professionals actively searching for their next productivity tool.
        </p>
      </div>

      {/* Traffic Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center">
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-['Space_Grotesk']">500K+</div>
          <div className="text-xs text-slate-400">Monthly Pageviews</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Space_Grotesk']">45K+</div>
          <div className="text-xs text-slate-400">Newsletter Subscribers</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-['Space_Grotesk']">68%</div>
          <div className="text-xs text-slate-400">US, UK & EU Traffic</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Space_Grotesk']">4.2%</div>
          <div className="text-xs text-slate-400">Average Click-Through</div>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
              Featured Directory Listing
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              $99 <span className="text-xs font-normal text-slate-400">one-time</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Permanent verified listing with priority indexing and &ldquo;Verified&rdquo; badge.</p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <li>✓ Guaranteed 24-hour review & publish</li>
              <li>✓ Dofollow backlinks to your landing page</li>
              <li>✓ Permanent inclusion in search index</li>
            </ul>
          </div>
          <button
            onClick={() => setSubmitToolModalOpen(true)}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Submit Featured Tool
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-600 p-6 space-y-4 flex flex-col justify-between shadow-md relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <div className="space-y-3 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
              Category Takeover
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              $299 <span className="text-xs font-normal text-slate-400">/month</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Rank #1 in your core category (e.g. AI Writing or AI Video) with top banner spotlight.</p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <li>✓ Top sticky card in chosen category</li>
              <li>✓ Targeted category placement & impressions</li>
              <li>✓ Inclusion in weekly newsletter feature</li>
            </ul>
          </div>
          <a
            href="mailto:aitoolnest1@gmail.com?subject=Category%20Takeover%20Inquiry"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer block"
          >
            Reserve Category
          </a>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-3">
            <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider font-mono">
              Newsletter Sponsor
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-['Space_Grotesk']">
              $450 <span className="text-xs font-normal text-slate-400">/dispatch</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Dedicated primary sponsor slot in our weekly AI Dispatch sent to builders and creators.</p>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <li>✓ Top banner + 120-word product writeup</li>
              <li>✓ High-visibility placement with direct links</li>
              <li>✓ Permanent archive link on blog</li>
            </ul>
          </div>
          <a
            href="mailto:aitoolnest1@gmail.com?subject=Newsletter%20Sponsorship%20Inquiry"
            className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer block"
          >
            Book Newsletter Slot
          </a>
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Need a Custom Enterprise Package or Dedicated Review?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            We offer bespoke research whitepapers, homepage spotlights, and sponsored benchmark evaluations.
          </p>
        </div>
        <a
          href="mailto:aitoolnest1@gmail.com?subject=Custom%20Advertising%20Inquiry"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
        >
          Contact: aitoolnest1@gmail.com
        </a>
      </div>
    </div>
  );
};

// --- 8. AFFILIATE DISCLOSURE (STANDALONE) ---
export const AffiliateDisclosureView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="Affiliate Disclosure & Transparency Statement | AIToolNest"
        description="Read the complete FTC 16 CFR Part 255 compliant affiliate disclosure for AIToolNest."
        canonicalUrl="https://aitoolnest.com/#/affiliate-disclosure"
      />
      <Breadcrumbs items={[{ label: 'Affiliate Disclosure' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Full Disclosure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Affiliate & Commercial Disclosure
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          In full accordance with Federal Trade Commission (FTC) guidelines
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">How AIToolNest Generates Revenue</h2>
          <p>
            AIToolNest is an independently supported technology platform. We do not place annoying pop-up paywalls or lock our directory behind mandatory subscriptions. Instead, we generate revenue through:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li><strong>Affiliate Commissions:</strong> When you click on an external link to a paid software service and purchase a subscription, we may earn a referral commission.</li>
            <li><strong>Sponsor Placements:</strong> Clearly labeled sponsored tool listings and newsletter sponsorships.</li>
            <li><strong>Contextual Advertising:</strong> Display ads powered by Google AdSense and reputable programmatic networks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Zero Additional Cost to You</h2>
          <p>
            Affiliate compensation does not increase your purchase price. In fact, software providers frequently give our readers exclusive discount codes (e.g. 20% off annual plans or free credit boosts) through our partnership arrangements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">Uncompromised Editorial Opinions</h2>
          <p>
            Our writers, researchers, and testers are never pressured to give higher scores to software that pays higher commissions. If a 100% free open-source software (like Ollama or Blender) outperforms a $50/month proprietary tool, our articles will explicitly state that.
          </p>
        </section>
      </div>
    </div>
  );
};

// --- 9. AI ETHICS STATEMENT ---
export const AIEthicsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="AI Ethics Statement & Responsible Use Framework | AIToolNest"
        description="Our principles on artificial intelligence transparency, model safety, algorithmic bias prevention, and creator copyright protection."
        canonicalUrl="https://aitoolnest.com/#/ai-ethics"
      />
      <Breadcrumbs items={[{ label: 'AI Ethics Statement' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5" />
          <span>Ethics & Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          AI Ethics & Responsible Innovation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Our Framework for Navigating Synthetic Media, Automation, and Machine Learning
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">1. Human Agency & Amplification</h2>
          <p>
            We believe artificial intelligence should be designed to augment human potential, foster creativity, and liberate people from monotonous tasks—not to deceive, disenfranchise, or diminish the value of human artisans.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">2. Zero Tolerance for Malicious AI Products</h2>
          <p>
            AIToolNest strictly refuses to list or promote AI software designed for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>Non-consensual deepfakes or intimate image generation.</li>
            <li>Automated malware generation, credential stuffing, or phishing tooling.</li>
            <li>Deceptive voice cloning for financial impersonation scams.</li>
            <li>Surveillance systems that violate internationally recognized human rights.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">3. Creator Rights & Training Transparency</h2>
          <p>
            We strongly advocate for model providers to respect artist copyrights, provide transparent training data disclosure, and honor machine-readable opt-out tags (e.g. Spawning / Do Not Train protocols). Tools that offer ethical compensation frameworks or opt-in licensed datasets receive elevated recognition in our catalog.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">4. Algorithmic Bias & Safety</h2>
          <p>
            We continuously audit generative AI models for representational harm, racial and gender stereotyping, and sycophancy. We highlight safety benchmarks and alignment mechanisms in our tool reviews.
          </p>
        </section>
      </div>
    </div>
  );
};

// --- 10. HTML SITEMAP VIEW ---
export const SitemapView: React.FC = () => {
  const { navigate } = useApp();

  const sections = [
    {
      title: 'Directory & Hubs',
      links: [
        { label: 'Homepage', path: '/' },
        { label: 'AI Tools Directory', path: '/tools' },
        { label: '100% Free AI Tools', path: '/free-ai-tools' },
        { label: 'AI Tools for Business', path: '/ai-tools-for-business' },
        { label: 'AI Tools for Students', path: '/ai-tools-for-students' },
        { label: 'AI Image Generators', path: '/ai-image-generators' },
        { label: 'ChatGPT Alternatives', path: '/chatgpt-alternatives' },
        { label: 'AI Prompts Vault', path: '/ai-prompts' }
      ]
    },
    {
      title: 'Guides & Articles',
      links: [
        { label: 'Blog Index', path: '/blog' },
        { label: 'Best AI Writing Tools (2026)', path: '/blog/best-ai-writing-tools-2026' },
        { label: 'Midjourney v6 Master Prompting', path: '/blog/midjourney-v6-prompt-guide' },
        { label: 'AI Code Assistants Compared', path: '/blog/ai-code-assistants-cursor-copilot-claude' },
        { label: 'Top AI Video Generators', path: '/blog/best-ai-video-generators-sora-runway-pika' },
        { label: 'Ultimate AI Productivity Stack', path: '/blog/ai-productivity-stack-founders-freelancers' },
        { label: 'Best AI Music & Voice Synthesizers', path: '/blog/best-ai-music-audio-generators-suno-elevenlabs' }
      ]
    },
    {
      title: 'Company & Compliance',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Privacy Policy (AdSense Compliant)', path: '/privacy-policy' },
        { label: 'Terms & Conditions', path: '/terms' },
        { label: 'Website & Earnings Disclaimer', path: '/disclaimer' },
        { label: 'Cookie Policy', path: '/cookie-policy' },
        { label: 'Editorial Policy', path: '/editorial-policy' },
        { label: 'DMCA Takedown Policy', path: '/dmca-policy' },
        { label: 'Write For Us', path: '/write-for-us' },
        { label: 'Advertise With Us', path: '/advertise' },
        { label: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
        { label: 'AI Ethics Statement', path: '/ai-ethics' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEOHead
        title="HTML Sitemap & Navigation Index | AIToolNest"
        description="Comprehensive index of all tools, directories, articles, and legal pages on AIToolNest."
        canonicalUrl="https://aitoolnest.com/#/sitemap"
      />
      <Breadcrumbs items={[{ label: 'Sitemap' }]} />

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          AIToolNest Sitemap Index
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Quick access to all directories, research reports, categories, and policies
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((sec, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] border-b border-slate-100 dark:border-slate-800 pb-2">
              {sec.title}
            </h2>
            <ul className="space-y-2 text-xs">
              {sec.links.map((lnk, lIdx) => (
                <li key={lIdx}>
                  <button
                    onClick={() => navigate(lnk.path)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-left cursor-pointer transition-colors"
                  >
                    {lnk.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
