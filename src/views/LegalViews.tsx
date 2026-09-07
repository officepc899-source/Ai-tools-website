import React, { useState } from 'react';
import { ShieldCheck, Mail, Send, Check, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEOHead
        title="Privacy Policy - AIToolNest"
        description="Our transparent privacy policy covering cookies, analytics, data protection, and user rights."
        canonicalUrl="https://aitoolnest.com/#/privacy-policy"
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Compliance & Transparency
          </span>
          <h1 className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">1. Introduction</h2>
          <p>
            At AIToolNest (accessible from aitoolnest.com), our visitors&apos; privacy is of paramount importance. This Privacy Policy document outlines the types of personal and non-personal data collected, recorded, and how we handle and protect that information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">2. Information We Collect</h2>
          <p>We collect information you directly provide to us, including:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><strong>Email Addresses:</strong> When voluntarily subscribing to our weekly newsletter or downloading digital product assets.</li>
            <li><strong>Tool Submission Data:</strong> Company details, contact emails, and product URLs provided when submitting software for directory inclusion.</li>
            <li><strong>Log Files & Analytics:</strong> Standard non-identifiable browser user-agent, referring URLs, time stamps, and viewed pages to optimize directory usability.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">3. Cookies & Affiliate Tracking</h2>
          <p>
            When you click an outbound link to an AI tool or partner vendor, a 30-to-90 day cookie may be placed on your browser by our affiliate networks (e.g., Impact, PartnerStack, ShareASale) to credit referral traffic. These cookies do not store personal details and are standard across the software discovery industry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">4. Third-Party Advertising</h2>
          <p>
            Third-party ad servers or networks may use technologies like cookies and JavaScript in their respective advertisements. We do not have direct control over third-party cookies used by advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">5. Your Rights (GDPR & CCPA)</h2>
          <p>
            You have the right to request copies of your personal data, rectify inaccuracies, or request the deletion of your email from our newsletter database at any time by clicking &ldquo;Unsubscribe&rdquo; in any dispatch or contacting privacy@aitoolnest.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEOHead
        title="Terms and Conditions - AIToolNest"
        description="Terms of service, intellectual property, digital product usage, and website guidelines."
        canonicalUrl="https://aitoolnest.com/#/terms"
      />
      <Breadcrumbs items={[{ label: 'Terms and Conditions' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Agreement
          </span>
          <h1 className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] mt-1">
            Terms and Conditions
          </h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: March 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">1. Acceptance of Terms</h2>
          <p>
            By accessing and using AIToolNest, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">2. Digital Products License</h2>
          <p>
            When purchasing or downloading digital products (e.g. Prompt Packs, Notion Templates, Canva Packs) from AIToolNest:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>You receive a non-exclusive, commercial use license to utilize the assets in client work or personal business.</li>
            <li>You may not redistribute or resell the raw template files or prompt databases as competing standalone assets.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">3. Software Directory Information</h2>
          <p>
            While we audit software pricing and capabilities on a weekly schedule, third-party software companies frequently modify their pricing plans, token quotas, and terms without prior notice. Always verify final billing details directly on the vendor&apos;s checkout page.
          </p>
        </section>
      </div>
    </div>
  );
};

export const DisclaimerView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEOHead
        title="Affiliate & Earnings Disclaimer - FTC Compliance"
        description="Comprehensive affiliate disclosure, earnings transparency, and independent editorial policy."
        canonicalUrl="https://aitoolnest.com/#/disclaimer"
      />
      <Breadcrumbs items={[{ label: 'Affiliate & Earnings Disclaimer' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
            FTC Compliance & Ethics
          </span>
          <h1 className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] mt-1">
            Affiliate & Earnings Disclaimer
          </h1>
          <p className="text-xs text-slate-400 mt-1">Mandatory Disclosure Under 16 CFR Part 255</p>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-sm">
          <strong>Summary:</strong> We participate in various affiliate marketing programs. Clicking certain links on this website and subsequently subscribing to or purchasing a paid tool may result in our platform earning a commission, at zero additional cost to you.
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">1. What are Affiliate Links?</h2>
          <p>
            Affiliate links are customized URLs containing a tracking identifier. When you click on an affiliate link and make a purchase, the merchant tracks that referral and pays us a small percentage. This does NOT increase the price you pay; in fact, we often negotiate exclusive discount codes for our readers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">2. Editorial Independence</h2>
          <p>
            Our reviews, pros and cons, and ratings are based on hands-on software tests. We never award a 5-star rating or recommend an inferior software tool solely because an affiliate program offers higher payouts. If a free tool performs better than a paid alternative, we say so clearly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">3. Earnings & Business Idea Disclaimer</h2>
          <p>
            The business blueprints, startup models, and potential earning estimates (e.g. &ldquo;$3,000 - $12,000/mo&rdquo;) presented on AIToolNest are educational illustrations based on market analysis. We cannot and do not guarantee any specific financial results. Your outcome depends entirely on your market execution, skill, and business effort.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('tool-submission');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! We typically reply within 24 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="Contact Us & Submit an AI Tool - AIToolNest"
        description="Get in touch with the editorial team, submit a new AI tool for review, propose a partnership, or request support."
        canonicalUrl="https://aitoolnest.com/#/contact"
      />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>Direct Communication</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Have a question, feedback on an AI tool review, or want to submit your product to our directory? Send us a message below.
          </p>

          <div className="pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-600">
            <div>
              <strong className="block text-slate-900">Direct Inquiries:</strong>
              <span className="font-mono text-indigo-600">editorial@aitoolnest.com</span>
            </div>
            <div>
              <strong className="block text-slate-900">Sponsorships & Ads:</strong>
              <span className="font-mono text-indigo-600">partners@aitoolnest.com</span>
            </div>
            <div>
              <strong className="block text-slate-900">Average Response Time:</strong>
              <span>Under 24 hours (Mon - Fri)</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="tool-submission">Submit a New AI Tool for Review</option>
                    <option value="sponsored-listing">Sponsored Listing / Advertising</option>
                    <option value="pricing-update">Report Outdated Pricing or Link</option>
                    <option value="general-inquiry">General Question or Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Include tool website, pricing details, or your question..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Message Delivered!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you, {name}. Our editorial team has received your submission and will review it promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2"
                >
                  Send another inquiry →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="About AIToolNest - Editorial Standards & Mission"
        description="Our mission to help entrepreneurs, creators, and students navigate the AI revolution with practical blueprints and honest evaluations."
        canonicalUrl="https://aitoolnest.com/#/about"
      />
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 font-mono">
            Our Mission & Process
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] mt-1">
            Built for Modern Creators & Online Founders
          </h1>
          <p className="text-sm text-slate-500 mt-1">Empowering independent builders with real leverage.</p>
        </div>

        <p className="text-base sm:text-lg text-slate-800">
          The software world is experiencing a seismic shift. Tens of thousands of AI tools launch each month, making it noisy, confusing, and overwhelming for everyday founders, freelancers, and students to identify which tools actually deliver measurable results.
        </p>

        <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
          Our 4 Core Editorial Promises:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. Hands-On Verification</span>
            </h4>
            <p className="text-xs text-slate-600">
              We sign up, test the free tiers, and evaluate real output before publishing reviews.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>2. No Fluff Pricing</span>
            </h4>
            <p className="text-xs text-slate-600">
              We never conceal paywalls or exaggerate trial limits. Free means genuinely free.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>3. Actionable Blueprints</span>
            </h4>
            <p className="text-xs text-slate-600">
              Every business idea features concrete startup costs, recommended stacks, and realistic timeline expectations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4. High-Utility Assets</span>
            </h4>
            <p className="text-xs text-slate-600">
              Our prompt vaults and templates are engineered for commercial production, saving hundreds of hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SitemapView: React.FC = () => {
  const { tools, businessIdeas, digitalProducts, articles, pinterestLandings } = useApp();

  const staticUrls = [
    '/',
    '/tools',
    '/business-ideas',
    '/digital-products',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer'
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map((u) => `  <url>
    <loc>https://aitoolnest.com/#${u}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
${tools.map((t) => `  <url>
    <loc>https://aitoolnest.com/#/tool/${t.slug}</loc>
    <lastmod>${t.verifiedDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${businessIdeas.map((b) => `  <url>
    <loc>https://aitoolnest.com/#/business-idea/${b.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
${articles.map((a) => `  <url>
    <loc>https://aitoolnest.com/#/blog/${a.slug}</loc>
    <lastmod>${a.publishedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
${pinterestLandings.map((p) => `  <url>
    <loc>https://aitoolnest.com/#/landing/${p.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <SEOHead
        title="XML Sitemap & Search Engine Index - AIToolNest"
        description="Complete XML sitemap listing of all indexable AI tools, business blueprints, guides, and Pinterest hubs."
        canonicalUrl="https://aitoolnest.com/#/sitemap.xml"
      />
      <Breadcrumbs items={[{ label: 'XML Sitemap' }]} />

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
              XML Sitemap Generator
            </h1>
            <p className="text-xs text-slate-500">
              Live, dynamic search engine indexing manifest for Googlebot and Bingbot.
            </p>
          </div>
          <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold">
            {staticUrls.length + tools.length + businessIdeas.length + articles.length + pinterestLandings.length} Indexed URLs
          </span>
        </div>

        <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto max-h-[400px]">
          <pre>{xmlContent}</pre>
        </div>
      </div>
    </div>
  );
};
