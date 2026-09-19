import React from 'react';
import { Play, Clock, BookOpen, ArrowRight, Sparkles, BarChart2 } from 'lucide-react';
import { Tutorial } from '../types';
import { useApp } from '../context/AppContext';

interface TutorialCardProps {
  tutorial: Tutorial;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({ tutorial }) => {
  const { navigate } = useApp();
  const [imageError, setImageError] = React.useState(false);

  const hasVideo = Boolean(tutorial.videoUrl && tutorial.videoUrl.trim());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/80';
      case 'Intermediate':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/80';
      case 'Advanced':
        return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/80';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <article
      onClick={() => navigate(`/tutorials/${tutorial.slug}`)}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Thumbnail & Video Ready Overlay */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          {imageError || !tutorial.thumbnail ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center mb-2">
                  <BookOpen className="w-6 h-6 text-indigo-300" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase">
                  {tutorial.category} Guide
                </span>
              </div>
            </div>
          ) : (
            <img
              src={tutorial.thumbnail}
              alt=""
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          )}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

          {/* Action Badge: Play icon if video exists, Book/Guide icon if written tutorial */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/30 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300"
              title={hasVideo ? 'Watch Video' : 'Read Written Guide'}
            >
              {hasVideo ? (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              ) : (
                <BookOpen className="w-5 h-5 text-white" />
              )}
            </div>
          </div>

          {/* Top Category Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase bg-slate-900/85 backdrop-blur-md text-white border border-white/20 shadow-xs">
              {tutorial.category}
            </span>
          </div>

          {/* Top Right Difficulty Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border shadow-xs ${getDifficultyColor(tutorial.difficulty)}`}>
              {tutorial.difficulty}
            </span>
          </div>

          {/* Bottom Time / Steps Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-indigo-300" />
              <span>{tutorial.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>{tutorial.steps.length} Steps</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-['Space_Grotesk'] leading-snug">
            {tutorial.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {tutorial.description}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
        {tutorial.author ? (
          <div className="flex items-center gap-2">
            {tutorial.author.avatar && (
              <img
                src={tutorial.author.avatar}
                alt={tutorial.author.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                referrerPolicy="no-referrer"
              />
            )}
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
              {tutorial.author.name}
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-medium">Free Tutorial</span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/tutorials/${tutorial.slug}`);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 cursor-pointer"
        >
          <span>View Tutorial</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
