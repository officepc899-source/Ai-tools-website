import React from 'react';
import { ArrowRight, DollarSign, Clock, Zap, TrendingUp } from 'lucide-react';
import { BusinessIdea } from '../types';
import { useApp } from '../context/AppContext';

interface BusinessIdeaCardProps {
  idea: BusinessIdea;
}

export const BusinessIdeaCard: React.FC<BusinessIdeaCardProps> = ({ idea }) => {
  const { navigate } = useApp();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-wide">
            {idea.categoryLabel}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wide">
            {idea.difficulty}
          </span>
        </div>

        <button
          onClick={() => navigate(`/business-idea/${idea.slug}`)}
          className="text-left font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 block"
        >
          {idea.title}
        </button>

        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
          {idea.summary}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center mb-4">
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-center gap-0.5">
              <DollarSign className="w-2.5 h-2.5 text-emerald-600" />
              <span>Startup</span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{idea.startupCost}</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-center gap-0.5">
              <Clock className="w-2.5 h-2.5 text-blue-600" />
              <span>Launch</span>
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5 truncate">{idea.timeToLaunch}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider flex items-center justify-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5 text-purple-600" />
              <span>Potential</span>
            </div>
            <div className="text-xs font-bold text-emerald-600 mt-0.5 truncate">{idea.earningPotential.split('/')[0]}</div>
          </div>
        </div>

        {/* Roadmap Preview */}
        <div className="space-y-1.5 mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Roadmap Overview:
          </span>
          <div className="space-y-1 text-xs text-slate-600">
            {idea.stepByStepRoadmap.slice(0, 2).map((phase) => (
              <div key={phase.step} className="flex items-start gap-1.5">
                <span className="w-4 h-4 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {phase.step}
                </span>
                <span className="line-clamp-1">
                  <strong>{phase.phase}:</strong> {phase.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">{idea.techStack.length} tools included</span>
        </div>
        <button
          onClick={() => navigate(`/business-idea/${idea.slug}`)}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
        >
          <span>View Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
