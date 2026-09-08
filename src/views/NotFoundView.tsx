import React, { useState } from 'react';
import { Compass, Search, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const NotFoundView: React.FC = () => {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/tools');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      <SEOHead
        title="404 - Page Not Found | AIToolNest"
        description="The requested page could not be located on AIToolNest. Explore 10,000+ AI tools, free productivity software, and prompt guides."
      />

      <div className="space-y-4 max-w-lg mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Error 404 • Destination Lost</span>
        </div>

        <div className="text-7xl sm:text-8xl font-black text-indigo-600 dark:text-indigo-400 font-['Space_Grotesk'] tracking-tighter">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-['Space_Grotesk']">
          We Couldn&apos;t Locate That Page
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The link you clicked may be broken, or the page may have been moved or updated. You can search our directory or jump straight to popular hubs below.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 p-2 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
          <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 10,000+ AI tools..."
            className="w-full px-3 py-1.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Recommended Hubs */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 max-w-2xl mx-auto">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-4">
          Or Explore These Popular Sections:
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <button
            onClick={() => navigate('/')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors text-center cursor-pointer shadow-xs"
          >
            🏠 Homepage
          </button>
          <button
            onClick={() => navigate('/tools')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors text-center cursor-pointer shadow-xs"
          >
            ⚡ AI Tools
          </button>
          <button
            onClick={() => navigate('/free-ai-tools')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors text-center cursor-pointer shadow-xs"
          >
            🎁 Free Tools
          </button>
          <button
            onClick={() => navigate('/blog')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-800 dark:text-slate-200 transition-colors text-center cursor-pointer shadow-xs"
          >
            📚 AI Guides
          </button>
        </div>
      </div>
    </div>
  );
};
