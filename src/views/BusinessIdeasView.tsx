import React, { useState, useMemo } from 'react';
import { Lightbulb, Search, Filter, TrendingUp, DollarSign, Clock, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BusinessIdeaCard } from '../components/BusinessIdeaCard';
import { AdBanner } from '../components/AdBanner';

export const BusinessIdeasView: React.FC = () => {
  const { businessIdeas, currentPath } = useApp();

  const queryParams = useMemo(() => {
    const queryPart = currentPath.split('?')[1] || '';
    return new URLSearchParams(queryPart);
  }, [currentPath]);

  const initialCat = queryParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Business Ideas' },
    { id: 'online-business', label: 'Online Business Ideas' },
    { id: 'ai-business', label: 'AI Business Ideas' },
    { id: 'side-hustle', label: 'Side Hustle Ideas' },
    { id: 'small-business', label: 'Small Business Ideas' }
  ];

  const filteredIdeas = useMemo(() => {
    return businessIdeas.filter((idea) => {
      if (selectedCategory !== 'all' && idea.category !== selectedCategory) {
        return false;
      }
      if (difficultyFilter !== 'all' && idea.difficulty !== difficultyFilter) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = idea.title.toLowerCase().includes(q);
        const matchSumm = idea.summary.toLowerCase().includes(q);
        const matchCat = idea.categoryLabel.toLowerCase().includes(q);
        if (!matchTitle && !matchSumm && !matchCat) return false;
      }
      return true;
    });
  }, [businessIdeas, selectedCategory, difficultyFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEOHead
        title="High-Margin Online & AI Business Ideas (2026 Blueprints)"
        description="Actionable online business ideas, AI automation models, and side hustles with step-by-step roadmaps, startup cost analysis, and monetization strategies."
        canonicalUrl="https://aitoolnest.com/#/business-ideas"
      />

      <Breadcrumbs items={[{ label: 'Business Ideas & Blueprints' }]} />

      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>Proven Playbooks & Blueprints</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
          Online & AI Business Ideas
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Complete, realistic startup blueprints. Zero fluff: includes startup costs, recommended tech stack, step-by-step 4-phase launch roadmaps, and verified monetization models.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search business models, niches, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner Friendly</option>
              <option value="Intermediate">Intermediate Experience</option>
              <option value="Advanced">Advanced Technical</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea) => (
          <BusinessIdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {/* Monetization Ad */}
      <AdBanner format="horizontal-leaderboard" />
    </div>
  );
};
