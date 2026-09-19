import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Search,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { TutorialCard } from '../components/TutorialCard';
import { TutorialCategory, TutorialDifficulty } from '../types';

export const TutorialsView: React.FC = () => {
  const { tutorials } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<TutorialCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: TutorialCategory[] = [
    'All',
    'ChatGPT',
    'AI Writing',
    'AI Image',
    'AI Video',
    'Productivity',
    'Students',
    'Marketing',
    'Other'
  ];

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial) => {
      // Category filter
      if (selectedCategory !== 'All' && tutorial.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && tutorial.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = tutorial.title.toLowerCase().includes(q);
        const matchDesc = tutorial.description.toLowerCase().includes(q);
        const matchCat = tutorial.category.toLowerCase().includes(q);
        const matchStep = tutorial.steps.some(
          (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchDesc && !matchCat && !matchStep) {
          return false;
        }
      }

      return true;
    });
  }, [tutorials, selectedCategory, selectedDifficulty, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-16">
      <SEOHead
        title="AI Tutorials - Step-by-Step Practical Guides | AIToolNest"
        description="Learn how to use AI tools with simple step-by-step tutorials. Master ChatGPT, Midjourney, AI writing, prompt engineering, and productivity workflows."
        canonicalUrl="https://aitoolnest.com/tutorials"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'AI Tutorials' }]} />

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white p-8 sm:p-12 border border-indigo-500/20 shadow-xl">
          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Comprehensive Knowledge Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-['Space_Grotesk'] text-white">
              AI Tutorials
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Learn how to use AI tools with simple step-by-step tutorials.
            </p>

            {/* Quick search input */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search tutorials by keyword, tool, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/90 text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700/80 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Filter Controls: Categories & Difficulty */}
        <div className="space-y-4">
          {/* Category Filter Pills (No Page Reload) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? tutorials.length
                  : tutorials.filter((t) => t.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Difficulty & Result Counts Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>
                Showing <strong className="text-slate-900 dark:text-white">{filteredTutorials.length}</strong> {filteredTutorials.length === 1 ? 'tutorial' : 'tutorials'}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="difficulty-select" className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Difficulty:
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              No Tutorials Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We couldn&apos;t find any tutorials matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
