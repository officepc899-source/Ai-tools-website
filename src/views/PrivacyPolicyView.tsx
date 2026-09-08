import React from 'react';
import { ShieldCheck, Lock, Eye, Cookie, FileText, Globe, CheckCircle2, Mail, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';

export const PrivacyPolicyView: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title="Privacy Policy - Google AdSense & GDPR Compliant | AIToolNest"
        description="Comprehensive Privacy Policy for AIToolNest covering data collection, cookies, Google AdSense compliance, third-party advertising partners, and GDPR/CCPA user rights."
        canonicalUrl="https://aitoolnest.com/#/privacy"
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Data Protection Standards</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Last Updated: March 6, 2026 • Effective Date: January 1, 2026
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Our Privacy Commitment to You</span>
        </div>
        <p>
          At <strong className="text-slate-900 dark:text-white">AIToolNest</strong> (accessible from <a href="https://aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">https://aitoolnest.com</a>), one of our fundamental priorities is the privacy of our visitors. This Privacy Policy document outlines the types of personal and non-personal information that is collected and recorded by AIToolNest, how we use it, and how we adhere to strict international privacy regulations, including GDPR, CCPA, and Google AdSense partner guidelines.
        </p>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our Data Protection Officer at <a href="mailto:privacy@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">privacy@aitoolnest.com</a>.
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          Table of Contents
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
          <li><a href="#information-we-collect" className="hover:underline">1. Information We Collect</a></li>
          <li><a href="#how-we-use-information" className="hover:underline">2. How We Use Information</a></li>
          <li><a href="#cookies-policy" className="hover:underline">3. Cookies & Web Beacons Policy</a></li>
          <li><a href="#third-party-services" className="hover:underline">4. Third-Party Services & Links</a></li>
          <li><a href="#advertising-partners" className="hover:underline">5. Advertising Partners & FTC Disclosure</a></li>
          <li><a href="#google-adsense" className="hover:underline">6. Google AdSense & DoubleClick DART</a></li>
          <li><a href="#data-security" className="hover:underline">7. Data Security & Storage</a></li>
          <li><a href="#user-rights" className="hover:underline">8. User Rights (GDPR & CCPA)</a></li>
          <li><a href="#childrens-privacy" className="hover:underline">9. Children’s Privacy (COPPA)</a></li>
          <li><a href="#contact-information" className="hover:underline">10. Contact Information</a></li>
        </ul>
      </div>

      {/* Main Content Sections */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-10">

        {/* 1. Information We Collect */}
        <section id="information-we-collect" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>1. Information We Collect</span>
          </h2>
          <p>
            When you visit or interact with AIToolNest, we collect information in two primary categories: information you provide voluntarily, and information collected automatically through standard internet protocols.
          </p>
          <div className="space-y-3 pl-4 border-l-2 border-indigo-500/40">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">A. Information You Voluntarily Provide</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              - <strong>Email Subscriptions:</strong> If you sign up for our weekly AI Dispatch newsletter, we collect your email address.<br />
              - <strong>Tool Submissions:</strong> If you submit an AI software tool for review, we collect tool details, submitter name, contact email, and official URLs.<br />
              - <strong>Contact Form Inquiries:</strong> When you send us an email or support request, we retain your name, email address, and correspondence text to resolve your inquiry.
            </p>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-2">B. Information Collected Automatically (Log Files)</h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Like virtually all website operators, AIToolNest utilizes standard log files. These files log visitors when they visit website pages. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and the number of clicks. These are not linked to any personally identifiable information and are used solely for analyzing trends, administering the site, tracking user movement across pages, and gathering aggregate demographic data.
            </p>
          </div>
        </section>

        {/* 2. How We Use Information */}
        <section id="how-we-use-information" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>2. How We Use Your Information</span>
          </h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li>Provide, operate, optimize, and maintain the AIToolNest directory and website infrastructure.</li>
            <li>Improve, personalize, and expand our catalog, search indexing, and educational tutorials.</li>
            <li>Understand and analyze how users interact with tool reviews, comparison tables, and prompts.</li>
            <li>Develop new products, services, features, and functionality based on user feedback.</li>
            <li>Communicate with you directly, including sending weekly newsletters, product updates, and responding to editorial submissions.</li>
            <li>Prevent fraudulent transactions, unauthorized scraping, bot attacks, and technical abuse.</li>
            <li>Comply with applicable legal obligations and enforce our Terms and Conditions.</li>
          </ul>
        </section>

        {/* 3. Cookies Policy */}
        <section id="cookies-policy" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>3. Cookies & Web Beacons Policy</span>
          </h2>
          <p>
            Like any other website, AIToolNest uses &ldquo;cookies&rdquo;. Cookies are small data files stored on your computer or mobile device when you visit web pages. These cookies are used to store information including visitors&apos; preferences (such as Light or Dark display mode, bookmarked AI tools), and the pages on the website that the visitor accessed or visited.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Essential Cookies</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Required for website navigation, user sessions, and theme switching.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Preference Cookies</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Stores client bookmarks and directory filtering preferences locally.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1">Advertising Cookies</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Allows advertising networks like Google to display relevant ads.</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            You can choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers&apos; respective websites (e.g., Chrome, Safari, Firefox, Edge).
          </p>
        </section>

        {/* 4. Third Party Services */}
        <section id="third-party-services" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>4. Third-Party Services & External Links</span>
          </h2>
          <p>
            AIToolNest contains links to external third-party websites, software vendors, and platforms (such as OpenAI, Anthropic, Midjourney, Cursor, and others). Please be aware that we have no control over the content, security practices, or privacy policies of these external sites.
          </p>
          <p>
            We strongly advise you to review the Privacy Policy of every website you visit. We assume no responsibility or liability for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        {/* 5. Advertising Partners */}
        <section id="advertising-partners" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>5. Advertising Partners & FTC Affiliate Disclosure</span>
          </h2>
          <p>
            Some of the advertisers on our site may use cookies and web beacons. In accordance with Federal Trade Commission (FTC) guidelines, please note that AIToolNest may earn an affiliate commission when you click external links and subscribe to third-party software products.
          </p>
          <p>
            This affiliate relationship comes at <strong className="text-slate-900 dark:text-white">no additional cost to you</strong>, and in many instances provides exclusive promotional pricing or bonus credits. Our editorial reviews and star ratings are completely independent and never dictated by affiliate compensation.
          </p>
        </section>

        {/* 6. Google AdSense Compliance Section */}
        <section id="google-adsense" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 sm:p-6 space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950 dark:text-amber-200 font-['Space_Grotesk']">
              6. Google AdSense & DoubleClick DART Cookie Compliance
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
              Google is one of our third-party advertising vendors on AIToolNest. Google uses cookies, known as DART cookies, to serve advertisements to our site visitors based upon their visit to <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-[11px]">aitoolnest.com</code> and other websites across the internet.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-amber-900 dark:text-amber-300">
              <li>
                <strong>Third-party vendors, including Google,</strong> use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.
              </li>
              <li>
                <strong>Google&apos;s use of advertising cookies</strong> enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting Google Ad Settings at{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-bold underline inline-flex items-center gap-0.5"
                >
                  <span>https://www.google.com/settings/ads</span>
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or by visiting the Network Advertising Initiative opt-out page at{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-bold underline inline-flex items-center gap-0.5"
                >
                  <span>aboutads.info/choices</span>
                  <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                <strong>European Economic Area (EEA) & UK Users:</strong> Under the Google EU User Consent Policy and the IAB Transparency & Consent Framework (TCF), visitors in the EEA and UK are provided with clear choices regarding personalized vs. non-personalized advertising cookies.
              </li>
            </ul>
          </div>
        </section>

        {/* 7. Data Security */}
        <section id="data-security" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>7. Data Security & Storage</span>
          </h2>
          <p>
            We take the security of your data seriously. AIToolNest employs commercially acceptable physical, technical, and managerial procedures to safeguard and secure the information we collect online. All communication with our servers is encrypted using standard Transport Layer Security (TLS/HTTPS).
          </p>
          <p>
            However, please be advised that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
        </section>

        {/* 8. User Rights (GDPR & CCPA) */}
        <section id="user-rights" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>8. Your Privacy Rights (GDPR, CCPA & Global)</span>
          </h2>
          <p>
            We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-900 dark:text-white">The right to access:</strong> You have the right to request copies of your personal data held by AIToolNest.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">The right to erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You have the right to request that we erase your personal data, under certain conditions.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">The right to object or restrict processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.
            </p>
            <p>
              <strong className="text-slate-900 dark:text-white">California Consumer Privacy Act (CCPA/CPRA):</strong> California residents have the right to know what personal data is collected, request deletion, and opt-out of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. AIToolNest does not sell personal information to data brokers.
            </p>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at <a href="mailto:privacy@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">privacy@aitoolnest.com</a>.
          </p>
        </section>

        {/* 9. Children's Privacy */}
        <section id="childrens-privacy" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>9. Children’s Privacy (COPPA Compliance)</span>
          </h2>
          <p>
            Protecting children’s privacy online is especially important to us. AIToolNest does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child has provided personal information on our website, we strongly encourage you to contact us immediately, and we will use our best efforts to promptly remove such information from our records.
          </p>
        </section>

        {/* 10. Contact Information */}
        <section id="contact-information" className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 font-['Space_Grotesk']">
            <span>10. Contact Information</span>
          </h2>
          <p>
            If you have questions, feedback, or concerns regarding this Privacy Policy or our data handling practices, please contact us:
          </p>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Data Protection Officer</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Email: <a href="mailto:privacy@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">privacy@aitoolnest.com</a>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Website: <a href="https://aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">https://aitoolnest.com</a>
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Platform: AIToolNest Intelligence Hub
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
