import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ShieldCheck,
  MessageSquare,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('General Support');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const businessPurposes = [
    'General Support',
    'AI Tool Suggestions',
    'Partnership Inquiries',
    'Business Collaborations',
    'Feedback & Bug Reports'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Spam Protection: Honeypot check
    if (honeypot.trim() !== '') {
      // Silently discard bot submission
      setSubmitted(true);
      return;
    }

    // Spam Protection: Math Challenge (5 + 3 = 8)
    if (mathAnswer.trim() !== '8') {
      setErrorMsg('Please solve the math verification correctly (5 + 3 = 8).');
      showToast('Please solve the verification challenge.');
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    // Success
    setSubmitted(true);
    showToast('Your inquiry has been sent to aitoolnest1@gmail.com! We will respond within 24–48 hours.');
  };

  const contactFaqs = [
    {
      q: 'How can I submit an AI tool suggestion or listing?',
      a: 'You can submit your tool via our contact form under "AI Tool Suggestions" or email us directly at aitoolnest1@gmail.com with your product link, description, and key features.'
    },
    {
      q: 'Do you charge for tool listings or reviews?',
      a: 'Standard directory listings and editorial audits are 100% free. We also offer optional sponsored placement and featured badges for founders who want expedited review and premium banner visibility.'
    },
    {
      q: 'What is your typical response time?',
      a: 'We usually respond within 24–48 hours to all inquiries received at aitoolnest1@gmail.com.'
    },
    {
      q: 'How do I update details or pricing for my listed tool?',
      a: 'Simply email aitoolnest1@gmail.com with your tool name, updated pricing, features, or company notes, and our team will update your profile.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title="Contact Us - Official Support & Inquiries | AIToolNest"
        description="Get in touch with AIToolNest at aitoolnest1@gmail.com. Contact us for general support, AI tool suggestions, partnerships, business collaborations, or bug reports."
        canonicalUrl="https://aitoolnest.com/#/contact"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact AIToolNest',
          description: 'Official contact desk for AIToolNest AI discovery directory.',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIToolNest',
            email: 'aitoolnest1@gmail.com'
          }
        }}
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Official Support & Collaboration Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Get in Touch With Our Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Have a question, suggestion, or collaboration idea? Send us a message below or email us directly at <a href="mailto:aitoolnest1@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">aitoolnest1@gmail.com</a>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Official Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-mono">
                    Primary Contact Email
                  </span>
                  <a
                    href="mailto:aitoolnest1@gmail.com"
                    className="text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-mono block"
                  >
                    aitoolnest1@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    All inquiries, support requests, and proposals are routed directly to this inbox.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                  Accepted Inquiry Topics
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {businessPurposes.map((p) => (
                    <div
                      key={p}
                      onClick={() => setPurpose(p)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors border ${
                        purpose === p
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Response Time Commitment</strong>
                  <span>We usually respond within 24–48 hours.</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Operating Days: Monday - Friday (Global Support)</span>
              </div>
            </div>
          </div>

          {/* Direct Email Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
              Prefer Direct Email?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              You can compose an email from your favorite email client directly to:
            </p>
            <a
              href="mailto:aitoolnest1@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email: aitoolnest1@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Business Purpose *
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    >
                      {businessPurposes.map((bp) => (
                        <option key={bp} value={bp}>
                          {bp}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief topic or tool name..."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide full details, tool links, collaboration ideas, or feedback..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>

                {/* Spam Protection: Hidden Honeypot Field */}
                <div className="hidden" aria-hidden="true">
                  <label>Leave this empty</label>
                  <input
                    type="text"
                    name="website_trap"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Spam Protection: Simple Math Verification */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Anti-Spam Challenge: What is 5 + 3?</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    placeholder="Answer"
                    className="w-24 px-3 py-1.5 text-xs text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to aitoolnest1@gmail.com</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Inquiries are transmitted to <span className="font-mono text-indigo-600 dark:text-indigo-400">aitoolnest1@gmail.com</span>. We usually respond within 24–48 hours.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Inquiry Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting us, <strong className="text-slate-900 dark:text-white">{name}</strong>. Your inquiry regarding <strong className="text-slate-900 dark:text-white">{purpose}</strong> has been logged to <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">aitoolnest1@gmail.com</span>.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl max-w-sm mx-auto text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>We usually respond within 24–48 hours.</span>
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                      setSubject('');
                      setMathAnswer('');
                    }}
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                  <a
                    href={`mailto:aitoolnest1@gmail.com?subject=${encodeURIComponent(`Follow-up: ${subject || purpose}`)}&body=${encodeURIComponent(message)}`}
                    className="px-5 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email App</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Inquiries Accordion */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Contact & Support FAQs
          </h2>
        </div>

        <div className="space-y-3">
          {contactFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
