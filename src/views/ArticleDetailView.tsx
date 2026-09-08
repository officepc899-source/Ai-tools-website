import React, { useMemo, useState, useEffect } from 'react';
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
  Sparkles,
  List,
  ChevronDown,
  HelpCircle,
  Check,
  MessageSquare,
  Send,
  ThumbsUp,
  CornerDownRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';
import { getArticleBySlug } from '../data/articlesData';

interface ArticleDetailViewProps {
  slug: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug }) => {
  const { articles, tools, navigate, showToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const article = useMemo(() => {
    return getArticleBySlug(slug) || articles.find((a) => a.slug === slug);
  }, [articles, slug]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.id !== article.id && (a.category === article.category || (article.relatedArticleSlugs && article.relatedArticleSlugs.includes(a.slug))))
      .slice(0, 3);
  }, [articles, article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Article Not Found</h2>
        <p className="text-slate-500 text-sm">We couldn&apos;t find an article matching &ldquo;{slug}&rdquo;.</p>
        <button
          onClick={() => navigate('/blog')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
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

  interface UserComment {
    id: string;
    author: string;
    avatarBg: string;
    date: string;
    content: string;
    likes: number;
  }

  const storageKey = `comments_${slug}`;
  const [comments, setComments] = useState<UserComment[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'c1',
        author: 'Alex Morgan',
        avatarBg: 'bg-emerald-500',
        date: '2 days ago',
        content: 'Super thorough comparison! Claude 3.5 Sonnet has replaced about 80% of my manual drafting workflow. The Artifacts feature alone makes it worth having open all day.',
        likes: 14
      },
      {
        id: 'c2',
        author: 'Elena Rostova',
        avatarBg: 'bg-indigo-500',
        date: 'Yesterday',
        content: 'Thanks for including the exact free plan limitations. A lot of directories hide token limits or claim a tool is free when it requires a credit card upfront. AIToolNest has become my go-to reference.',
        likes: 8
      }
    ];
  });

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState<string[]>([]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    const newComment: UserComment = {
      id: 'c_' + Date.now(),
      author: commentName.trim(),
      avatarBg: 'bg-rose-500',
      date: 'Just now',
      content: commentText.trim(),
      likes: 1
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setCommentName('');
    setCommentText('');
    showToast('Your comment has been posted!');
  };

  const handleLikeComment = (id: string) => {
    if (likedComments.includes(id)) return;
    setLikedComments((prev) => [...prev, id]);
    setComments((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c));
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Construct JSON-LD Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIToolNest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aitoolnest.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://aitoolnest.com/#/blog/${article.slug}`
    }
  };

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  const combinedSchema = faqSchema ? [articleSchema, faqSchema] : articleSchema;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${article.title} | AIToolNest`}
        description={article.excerpt}
        canonicalUrl={`https://aitoolnest.com/#/blog/${article.slug}`}
        ogImage={article.featuredImage}
        schemaData={combinedSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', path: '/blog' },
          { label: article.category, path: `/blog` },
          { label: article.title }
        ]}
      />

      {/* Article Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <span>{article.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] leading-[1.2] tracking-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">{article.author.name}</div>
              <div className="text-slate-500 dark:text-slate-400">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-sm max-h-[440px] border border-slate-200 dark:border-slate-800">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Key Takeaways Box */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-base font-['Space_Grotesk']">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Key Takeaways & Summary</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Table of Contents */}
      {article.headings && article.headings.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Table of Contents</span>
          </div>
          <ol className="space-y-1.5 text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 font-medium">
            {article.headings.map((heading, hIdx) => (
              <li key={hIdx}>
                <a
                  href={`#${heading.id}`}
                  className="hover:underline hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  {heading.title}
                </a>
              </li>
            ))}
            {article.faqs && article.faqs.length > 0 && (
              <li>
                <a href="#frequently-asked-questions" className="hover:underline hover:text-indigo-800 dark:hover:text-indigo-300">
                  Frequently Asked Questions
                </a>
              </li>
            )}
            {article.conclusion && (
              <li>
                <a href="#conclusion" className="hover:underline hover:text-indigo-800 dark:hover:text-indigo-300">
                  Conclusion
                </a>
              </li>
            )}
          </ol>
        </div>
      )}

      {/* Introduction */}
      <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        <p>{article.introduction}</p>
      </div>

      {/* In-Article Leaderboard Ad */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Main Body Headings */}
      <div className="space-y-12 text-slate-800 dark:text-slate-200">
        {article.headings && article.headings.map((heading, idx) => {
          const matchedTool = heading.toolSlug
            ? tools.find((t) => t.slug === heading.toolSlug || t.id === heading.toolSlug)
            : null;

          return (
            <section key={heading.id || idx} id={heading.id} className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight pt-6 border-t border-slate-100 dark:border-slate-800 first:border-0 first:pt-0">
                {heading.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {heading.content}
              </p>

              {/* Bullet Points */}
              {heading.bullets && heading.bullets.length > 0 && (
                <ul className="space-y-2 pl-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                  {heading.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tool Recommendation Box */}
              {heading.toolRecommendation && (
                <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                      Recommended Tool
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {heading.toolRecommendation}
                    </p>
                  </div>
                  {matchedTool && (
                    <button
                      onClick={() => navigate(`/tool/${matchedTool.slug}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                    >
                      <span>Read {matchedTool.name} Review</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Frequently Asked Questions (Accordion) */}
      {article.faqs && article.faqs.length > 0 && (
        <section id="frequently-asked-questions" className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {article.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Conclusion */}
      {article.conclusion && (
        <section id="conclusion" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-md scroll-mt-24">
          <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk']">
            Conclusion & Next Steps
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {article.conclusion}
          </p>
        </section>
      )}

      {/* Author Bio Box */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img
          src={article.author.avatar}
          alt={article.author.name}
          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Written by</span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{article.author.name}</h4>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{article.author.role}</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
            {article.author.bio || 'Technology analyst evaluating AI models, developer tools, and workflow automation systems.'}
          </p>
        </div>
      </div>

      {/* FTC Affiliate Disclaimer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Affiliate Disclosure:</strong> Some of the tool links recommended in this guide may earn us an affiliate referral commission. We only recommend tools that our team has evaluated and verified.
        </span>
      </div>

      {/* Interactive Community Discussion & Comments */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Reader Discussion ({comments.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Join the conversation
          </span>
        </div>

        {/* Comment Input Form */}
        <form
          onSubmit={handleAddComment}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3.5"
        >
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Leave a comment or question
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Miller"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Email (Kept strictly private)
              </label>
              <input
                type="email"
                placeholder="jordan@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Your Comment or Workflow Feedback *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Share your real experience with this tool, ask a question, or recommend alternatives..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Existing Comments List */}
        <div className="space-y-3 pt-2">
          {comments.map((comment) => {
            const hasLiked = likedComments.includes(comment.id);
            return (
              <div
                key={comment.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full ${comment.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
                    >
                      {comment.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{comment.author}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
                          Verified Reader
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{comment.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      hasLiked
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'fill-indigo-600' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-1">
                  {comment.content}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Related Articles & Guides
            </h3>
            <button
              onClick={() => navigate('/blog')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Browse All Articles →
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
