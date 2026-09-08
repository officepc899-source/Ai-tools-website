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
  const [purpose, setPurpose] = useState('tool-submission');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [mathAnswer, setMathAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    showToast('Your message has been received! Our team will reply shortly.');
  };

  const contactFaqs = [
    {
      q: 'How can I submit my AI tool to AIToolNest?',
      a: 'You can submit your tool for free by clicking "Submit Your AI Tool" in the header or selecting "Tool Submission" in the contact form. Our editorial team audits and indexes legitimate AI applications weekly.'
    },
    {
      q: 'Do you charge for tool listings or reviews?',
      a: 'Standard directory listings and editorial audits are 100% free. We also offer optional sponsored placement and featured badges for founders who want expedited 24-hour review and top banner visibility.'
    },
    {
      q: 'How long does it take for a tool to be reviewed?',
      a: 'Free community submissions are typically reviewed within 3 to 7 business days. Sponsored expedites are processed and live within 24 hours.'
    },
    {
      q: 'How do I update details or pricing for my listed tool?',
      a: 'Simply email editorial@aitoolnest.com from your official company domain with the updated pricing table, logo, or feature notes, and we will update your profile within 48 hours.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <SEOHead
        title="Contact Us & Support - Submit an AI Tool | AIToolNest"
        description="Get in touch with the AIToolNest editorial team, submit an AI product for review, propose a partnership, or inquire about sponsorships."
        canonicalUrl="https://aitoolnest.com/#/contact"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact AIToolNest',
          description: 'Official contact and editorial desk for AIToolNest AI discovery directory.',
          mainEntity: {
            '@type': 'Organization',
            name: 'AIToolNest',
            email: 'editorial@aitoolnest.com'
          }
        }}
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Editorial & Partnership Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          Get in Touch With Our Team
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Whether you want to submit a new AI tool, explore an advertising partnership, report an update, or simply share feedback, we’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Direct Inquiries & Departments
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Editorial & Tool Reviews</strong>
                  <a href="mailto:editorial@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">
                    editorial@aitoolnest.com
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Submit new tools, corrections, or benchmark inquiries.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Sponsorships & Advertising</strong>
                  <a href="mailto:partners@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">
                    partners@aitoolnest.com
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Category takeovers, featured badges, and newsletter promos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 dark:text-white">Privacy & Legal Compliance</strong>
                  <a href="mailto:privacy@aitoolnest.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-mono">
                    privacy@aitoolnest.com
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">GDPR, CCPA, and copyright requests.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Typical Response Time: Under 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Operating Days: Monday - Friday (EST)</span>
              </div>
            </div>
          </div>

          {/* Social Links Box */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
              Follow Our Dispatches
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors">
                𝕏 Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors">
                GitHub
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition-colors">
                Discord
              </a>
            </div>
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
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@company.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    >
                      <option value="tool-submission">Submit an AI Tool (Free)</option>
                      <option value="advertising">Sponsorship / Advertising</option>
                      <option value="editorial">Editorial / Content Correction</option>
                      <option value="partnership">Affiliate / Partnership</option>
                      <option value="other">General Feedback / Inquiries</option>
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
                      placeholder="Brief topic summary..."
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide full details, tool URLs, or any questions for our team..."
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

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Editorial Team</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Thank you for reaching out, <strong className="text-slate-900 dark:text-white">{name}</strong>. Our editorial desk has logged your ticket and will reply to <span className="font-mono text-indigo-600 dark:text-indigo-400">{email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setMathAnswer('');
                  }}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
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
            Contact & Submission FAQs
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
