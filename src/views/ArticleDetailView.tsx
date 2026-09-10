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
  CornerDownRight,
  Twitter,
  Linkedin,
  Copy,
  BookOpen,
  Eye,
  Award,
  Pin,
  ChevronLeft,
  ChevronRight,
  Globe,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { copyToClipboard } from '../utils/clipboard';
import { ArticleCard } from '../components/ArticleCard';
import { AdBanner } from '../components/AdBanner';
import { getArticleBySlug, getRelatedArticles, getPreviousAndNextArticles } from '../data/articlesData';

interface ArticleDetailViewProps {
  slug: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug }) => {
  const { articles, tools, navigate, showToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [readingProgress, setReadingProgress] = useState(0);

  const article = useMemo(() => {
    return getArticleBySlug(slug) || articles.find((a) => a.slug === slug);
  }, [articles, slug]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return getRelatedArticles(article, 3);
  }, [article]);

  const { previous: prevArticle, next: nextArticle } = useMemo(() => {
    if (!article) return { previous: null, next: null };
    return getPreviousAndNextArticles(article.slug);
  }, [article]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const progress = (window.scrollY / scrollTotal) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Track active section for Table of Contents
  useEffect(() => {
    if (!article || !article.headings) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = article.headings.length - 1; i >= 0; i--) {
        const h = article.headings[i];
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveHeadingId(h.id);
          return;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
          Publication Article Not Found
        </h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          We could not find an article matching &ldquo;{slug}&rdquo;. It may have been relocated or updated.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm cursor-pointer"
        >
          Return to Publication Hub
        </button>
      </div>
    );
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://aitoolnest.com/#/blog/${article.slug}`;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      setCopiedLink(true);
      showToast('Article link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      showToast('Unable to copy link to clipboard');
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} via @AIToolNest`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSharePinterest = () => {
    const shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(article.featuredImage)}&description=${encodeURIComponent(article.title)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
        content: 'Thanks for including the exact free plan limitations and benchmarks. A lot of directories hide token limits or claim a tool is free when it requires a credit card upfront. AIToolNest has become my go-to publication.',
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
    showToast('Your comment has been published!');
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

  // Construct High-Precision JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': currentUrl
    },
    headline: article.title,
    description: article.excerpt,
    image: [article.featuredImage],
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: 'https://aitoolnest.com/#/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIToolNest',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aitoolnest.com/logo.png'
      }
    },
    articleSection: article.category,
    keywords: article.tags ? article.tags.join(', ') : 'AI Tools, Artificial Intelligence, LLM',
    wordCount: 1800
  };

  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aitoolnest.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://aitoolnest.com/#/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.category,
        item: `https://aitoolnest.com/#/blog`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: currentUrl
      }
    ]
  };

  const combinedSchema = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      {/* Sticky Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/40 dark:bg-slate-800/40 z-50">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <SEOHead
        title={`${article.metaTitle || article.title} | AIToolNest Publication`}
        description={article.metaDescription || article.excerpt}
        canonicalUrl={currentUrl}
        ogImage={article.featuredImage}
        ogType="article"
        schemaData={combinedSchema}
      />

      <Breadcrumbs
        items={[
          { label: 'Publication', path: '/blog' },
          { label: article.category, path: '/blog' },
          { label: article.title }
        ]}
      />

      {/* Article Publication Header */}
      <header className="space-y-4">
        {/* Category Pill + Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/40 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{article.category}</span>
          </button>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">
            <Award className="w-3 h-3 text-amber-500" />
            <span>Peer-Reviewed</span>
          </span>
        </div>

        {/* Main H1 Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] leading-[1.18] tracking-tight">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author Bylines & Metadata Suite */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-4 border-y border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-indigo-600/30 dark:border-indigo-400/30 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <span>{article.author.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Verified Author" />
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-xs">{article.author.role}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Published: {article.publishedDate}</span>
            </span>
            {article.updatedDate && (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 font-medium">
                  Updated: {article.updatedDate}
                </span>
              </>
            )}
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Social Sharing Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Share this publication:
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareTwitter}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-500" />
              <span>Tweet</span>
            </button>

            <button
              onClick={handleShareLinkedIn}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>Share</span>
            </button>

            <button
              onClick={handleSharePinterest}
              title="Pin on Pinterest"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Pin className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
              <span>Pinterest</span>
            </button>

            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                copiedLink
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Cover Image with Aspect Ratio & Photography Credit */}
      <div className="space-y-2">
        <div className="rounded-3xl overflow-hidden shadow-md max-h-[500px] border border-slate-200 dark:border-slate-800 bg-slate-900 relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover max-h-[500px]"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 px-2">
          <span>Official editorial visual report</span>
          <span>Verified photography via Unsplash</span>
        </div>
      </div>

      {/* Key Takeaways & Executive Summary */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <section className="bg-gradient-to-br from-indigo-50/90 to-slate-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-base font-['Space_Grotesk']">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Executive Summary & Key Takeaways</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-indigo-100/60 dark:border-indigo-900/40">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Table of Contents Box */}
      {article.headings && article.headings.length > 0 && (
        <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <List className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Table of Contents</span>
            </span>
            <span className="text-[11px] font-normal normal-case text-slate-400">
              {article.headings.length} sections
            </span>
          </div>
          <ol className="space-y-2 text-xs sm:text-sm font-medium">
            {article.headings.map((heading) => {
              const isActive = activeHeadingId === heading.id;
              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={`inline-flex items-center gap-2 transition-colors ${
                      isActive
                        ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                    <span>{heading.title}</span>
                  </a>
                </li>
              );
            })}
            {article.faqs && article.faqs.length > 0 && (
              <li>
                <a
                  href="#frequently-asked-questions"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>Frequently Asked Questions</span>
                </a>
              </li>
            )}
            {article.conclusion && (
              <li>
                <a
                  href="#conclusion"
                  className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>Editorial Conclusion & Strategic Advice</span>
                </a>
              </li>
            )}
          </ol>
        </section>
      )}

      {/* Introduction Paragraph */}
      <section className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal space-y-4">
        <p className="first-letter:text-4xl first-letter:font-black first-letter:text-indigo-600 dark:first-letter:text-indigo-400 first-letter:mr-2 first-letter:float-left first-letter:font-['Space_Grotesk']">
          {article.introduction}
        </p>
      </section>

      {/* In-Article Advertisement / Leaderboard */}
      <AdBanner format="horizontal-leaderboard" />

      {/* Main Body Headings */}
      <div className="space-y-12 text-slate-800 dark:text-slate-200">
        {article.headings &&
          article.headings.map((heading, idx) => {
            const matchedTool = heading.toolSlug
              ? tools.find((t) => t.slug === heading.toolSlug || t.id === heading.toolSlug)
              : null;

            return (
              <section key={heading.id || idx} id={heading.id} className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight pt-8 border-t border-slate-100 dark:border-slate-800 first:border-0 first:pt-0">
                  {heading.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {heading.content}
                </p>

                {/* Bullet Points */}
                {heading.bullets && heading.bullets.length > 0 && (
                  <ul className="space-y-2.5 pl-1 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                    {heading.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tool Recommendation Box */}
                {heading.toolRecommendation && (
                  <div className="mt-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                        Editorial Tool Recommendation
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {heading.toolRecommendation}
                      </p>
                    </div>
                    {matchedTool && (
                      <button
                        onClick={() => navigate(`/tool/${matchedTool.slug}`)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-all"
                      >
                        <span>View {matchedTool.name} Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </section>
            );
          })}
      </div>

      {/* Editorial Conclusion */}
      {article.conclusion && (
        <section id="conclusion" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Editorial Verdict & Next Steps
          </h2>
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {article.conclusion}
          </div>
        </section>
      )}

      {/* Article Categories & Tags */}
      <section className="pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          <Tag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Filed Under Topics &amp; Keywords</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate('/blog')}
            className="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 cursor-pointer transition-colors"
          >
            Category: {article.category}
          </button>
          {article.tags && article.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate('/blog')}
              className="px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* Author Biography Box */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xs">
        <img
          src={article.author.avatar}
          alt={article.author.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-600/30 dark:border-indigo-400/30 shrink-0 shadow-sm"
          referrerPolicy="no-referrer"
        />
        <div className="space-y-3 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              About {article.author.name}
            </h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50">
              Verified Contributor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{article.author.role}</p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.author.bio ||
              'Researcher and analyst covering generative AI models, productivity tools, and computational workflows for AIToolNest.'}
          </p>

          {/* Author Socials & Directory */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
            {article.author.social?.twitter && (
              <a
                href={article.author.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                <Twitter className="w-3.5 h-3.5 text-sky-500" />
                <span>Twitter / X</span>
              </a>
            )}
            {article.author.social?.linkedin && (
              <a
                href={article.author.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <span>LinkedIn</span>
              </a>
            )}
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer sm:ml-auto"
            >
              <span>Explore All Dispatches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {article.faqs && article.faqs.length > 0 && (
        <section id="frequently-asked-questions" className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 scroll-mt-24">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl sm:text-2xl font-['Space_Grotesk']">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </div>

          <div className="space-y-3">
            {article.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Community Comments & Discussion */}
      <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xl font-['Space_Grotesk']">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Reader Discussion ({comments.length})</span>
          </div>
          <span className="text-xs text-slate-400">Moderated Discussion</span>
        </div>

        {/* Comment Submission Form */}
        <form onSubmit={handleAddComment} className="p-5 sm:p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Join the Conversation
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Email (Private, for gravatar only)
              </label>
              <input
                type="email"
                placeholder="sarah@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
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
              placeholder="Share your practical experience with this tool, ask a question, or recommend alternatives..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
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
        <div className="space-y-3">
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
                        <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">
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

      {/* Previous & Next Articles Navigation */}
      {(prevArticle || nextArticle) && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Read Next In AIToolNest Intelligence
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <div
                onClick={() => {
                  navigate(`/blog/${prevArticle.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <ChevronLeft className="w-4 h-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Article</span>
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">
                  {prevArticle.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {prevArticle.title}
                </h4>
              </div>
            ) : (
              <div className="hidden sm:flex rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-5 items-center justify-center text-xs text-slate-400">
                You are reading the earliest publication in this cycle
              </div>
            )}

            {nextArticle ? (
              <div
                onClick={() => {
                  navigate(`/blog/${nextArticle.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-2 sm:text-right"
              >
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold sm:justify-end">
                  <span>Next Article</span>
                  <ChevronRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 line-clamp-1">
                  {nextArticle.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {nextArticle.title}
                </h4>
              </div>
            ) : (
              <div className="hidden sm:flex rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-5 items-center justify-center text-xs text-slate-400">
                You are reading our latest publication
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Related Publications & Analysis
            </h3>
            <button
              onClick={() => navigate('/blog')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Browse All Dispatches →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relArt) => (
              <ArticleCard key={relArt.id} article={relArt} />
            ))}
          </div>
        </section>
      )}
    </article>
    </>
  );
};
