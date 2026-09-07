import React, { useMemo } from 'react';
import {
  Clock,
  Calendar,
  User,
  Share2,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';

interface ArticleDetailViewProps {
  slug: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug }) => {
  const { articles, tools, navigate, showToast } = useApp();

  const article = useMemo(() => articles.find((a) => a.slug === slug), [articles, slug]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.id !== article.id && (a.category === article.category || article.relatedArticleSlugs.includes(a.slug)))
      .slice(0, 3);
  }, [articles, article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find an article matching &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title={`${article.title} (2026 In-Depth Guide)`}
        description={article.excerpt}
        canonicalUrl={`https://aitoolnest.com/#/blog/${article.slug}`}
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedDate,
          author: {
            '@type': 'Person',
            name: article.author.name
          }
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', path: '/blog' },
          { label: article.category, path: `/blog` },
          { label: article.title }
        ]}
      />

      {/* Header Info */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
          <span>{article.category}</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-['Space_Grotesk'] leading-[1.2]">
          {article.title}
        </h1>

        {/* Author metadata & publish date */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-200 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-bold text-slate-900 text-sm">{article.author.name}</div>
              <div className="text-slate-400">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-sm max-h-[420px]">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Key Takeaways Box */}
      <div className="bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-indigo-900 font-bold text-base font-['Space_Grotesk']">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>Key Takeaways & Summary</span>
        </div>
        <ul className="space-y-2 text-sm text-indigo-950">
          {article.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Introduction */}
      <div className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
        <p>{article.introduction}</p>
      </div>

      {/* Horizontal Display Ad */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Well-structured Body Sections with Headings (H2, H3), lists, and tool recommendations */}
      <div className="space-y-10 text-slate-800">
        {article.sections.map((section, sidx) => (
          <section key={sidx} className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight pt-4 border-t border-slate-100 first:border-0 first:pt-0">
              {section.heading}
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {section.content}
            </p>

            {/* Bullet Points */}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-2 pl-2 text-sm sm:text-base text-slate-700">
                {section.bullets.map((b, bidx) => (
                  <li key={bidx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Numbered List */}
            {section.numberedList && section.numberedList.length > 0 && (
              <ol className="space-y-2 pl-2 text-sm sm:text-base text-slate-700">
                {section.numberedList.map((item, nidx) => (
                  <li key={nidx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                      {nidx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )}

            {/* Tool Recommendations with Links */}
            {section.toolRecommendations && section.toolRecommendations.length > 0 && (
              <div className="my-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Recommended AI Tools for this Step:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.toolRecommendations.map((toolRec, trIdx) => {
                    const matched = tools.find((t) => t.name.toLowerCase() === toolRec.name.toLowerCase());
                    return (
                      <div key={trIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900 text-sm">{toolRec.name}</span>
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              {toolRec.pricing}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mb-3">{toolRec.reason}</p>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 text-xs">
                          {matched ? (
                            <button
                              onClick={() => navigate(`/tool/${matched.slug}`)}
                              className="font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                            >
                              <span>Read Review</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : null}
                          <a
                            href={toolRec.link}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="font-semibold text-slate-700 hover:text-slate-900 ml-auto inline-flex items-center gap-1"
                          >
                            <span>Official Site</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Conclusion Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3">
        <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk']">
          Conclusion & Final Thoughts
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {article.conclusion}
        </p>
      </div>

      {/* FTC Affiliate Disclaimer */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Affiliate Disclosure:</strong> Some of the tool links recommended in this guide may earn us an affiliate referral commission. We only recommend tools that our team has evaluated and verified.
        </span>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Related Articles & Guides
            </h3>
            <button
              onClick={() => navigate('/blog')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Browse Blog →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArt) => (
              <ArticleCard key={relArt.id} article={relArt} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
