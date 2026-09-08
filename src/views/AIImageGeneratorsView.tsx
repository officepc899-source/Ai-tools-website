import React, { useState } from 'react';
import { Palette, Image, Sparkles, CheckCircle2, ChevronDown, ChevronUp, Sliders, ExternalLink, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ToolCard } from '../components/ToolCard';

export const AIImageGeneratorsView: React.FC = () => {
  const { tools, navigate } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const imageTools = tools.filter((t) => {
    return (
      t.category === 'ai-image-tools' ||
      t.category === 'ai-design-tools' ||
      t.useCases.some((u) => u.toLowerCase().includes('image') || u.toLowerCase().includes('design') || u.toLowerCase().includes('visual'))
    );
  });

  const faqs = [
    {
      q: 'Which AI image generator produces the most photorealistic faces and lighting?',
      a: 'Midjourney v6.1 currently leads the industry in camera sensor simulation, natural skin microtextures, and volumetric atmospheric lighting. Ideogram 2.0 and Leonardo Phoenix are close contenders, especially when typography and text banners are required in the image.'
    },
    {
      q: 'Can I legally use AI-generated images on merchandise, websites, and book covers?',
      a: 'Yes, with the appropriate commercial subscription. Adobe Firefly offers enterprise indemnification guarantee as it is trained exclusively on licensed Adobe Stock. Midjourney (Standard plan and above), Ideogram, and Leonardo AI grant full commercial usage rights for paid subscribers.'
    },
    {
      q: 'Which AI image generator is best for rendering crisp, readable text inside pictures?',
      a: 'Ideogram 2.0 is widely recognized as the best model for rendering legible typography, logos, t-shirt prints, and poster lettering directly inside images with zero spelling distortions.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title="Best AI Image Generators (2026 Rankings & Benchmarks)"
        description="Compare the top AI image generation tools including Midjourney, Adobe Firefly, Ideogram, and Leonardo AI. Photorealism, text rendering, and commercial licensing compared."
        canonicalUrl="https://aitoolnest.com/#/ai-image-generators"
        schemaData={faqSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'AI Tools', path: '/ai-tools' },
          { label: 'AI Image Generators' }
        ]}
      />

      {/* Hero */}
      <header className="relative bg-gradient-to-br from-violet-950 via-purple-950 to-slate-950 text-white rounded-3xl p-6 sm:p-12 overflow-hidden shadow-xl border border-purple-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider border border-purple-500/30">
            <Palette className="w-4 h-4 text-purple-400" />
            <span>Generative Visual Benchmark 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight">
            Best AI Image Generators
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Create stunning photorealistic renders, vector icons, marketing banners, and concept art in seconds. Audited for visual coherence, typographic accuracy, and commercial legality.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-purple-200">
            <span className="flex items-center gap-1.5 font-medium bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              Photorealism Tested
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              Typography In-Image Checked
            </span>
            <span className="flex items-center gap-1.5 font-medium bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              Commercial Rights Verified
            </span>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </header>

      {/* Feature Comparison Matrix */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Quick Comparison Matrix: Top 5 Image Models
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono">
              <tr>
                <th className="py-3 pr-4">AI Model</th>
                <th className="py-3 px-4">Best Use Case</th>
                <th className="py-3 px-4">Text In Image</th>
                <th className="py-3 px-4">Starting Price</th>
                <th className="py-3 pl-4">Commercial Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Midjourney v6.1</td>
                <td className="py-3 px-4">Photorealism, cinematic lighting, conceptual art</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Good</td>
                <td className="py-3 px-4">$10/mo</td>
                <td className="py-3 pl-4">Standard Paid terms</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Adobe Firefly</td>
                <td className="py-3 px-4">Corporate branding, generative fill, vector paths</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Good</td>
                <td className="py-3 px-4">Free / $4.99/mo</td>
                <td className="py-3 pl-4 text-emerald-600 dark:text-emerald-400 font-bold">Enterprise Indemnified</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Ideogram 2.0</td>
                <td className="py-3 px-4">Logos, apparel designs, posters, perfect text typography</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Best-in-Class (10/10)</td>
                <td className="py-3 px-4">Free / $8/mo</td>
                <td className="py-3 pl-4">Commercial on paid</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Leonardo AI</td>
                <td className="py-3 px-4">Game assets, character continuity, fine-tuning</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Very Good</td>
                <td className="py-3 px-4">150 Free credits/day</td>
                <td className="py-3 pl-4">Commercial on paid</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold text-slate-900 dark:text-white">Recraft</td>
                <td className="py-3 px-4">Pure SVG vector illustrations, 3D icons, brand kits</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">Excellent</td>
                <td className="py-3 px-4">Free / $20/mo</td>
                <td className="py-3 pl-4">Full SVG commercial</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            Featured Image & Visual Generation Tools ({imageTools.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare tools, explore prompt capabilities, and access official creator websites
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} featured={tool.slug === 'midjourney' || tool.slug === 'adobe-firefly'} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            AI Image Generator FAQs
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white hover:text-purple-600 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {expandedFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-purple-600 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              {expandedFaq === idx && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 leading-relaxed pr-8">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
