import React, { useState, useEffect } from 'react';
import {
  FileText,
  RefreshCw,
  Mail,
  Heading,
  Globe,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { TextSummarizerTool } from './TextSummarizerTool';
import { ParaphraserTool } from './ParaphraserTool';
import { EmailWriterTool } from './EmailWriterTool';
import { TitleGeneratorTool } from './TitleGeneratorTool';
import { MetaDescriptionTool } from './MetaDescriptionTool';

export type InteractiveToolId = 'summarizer' | 'paraphraser' | 'email-writer' | 'title-generator' | 'meta-description';

interface InteractiveToolsStudioProps {
  initialTool?: InteractiveToolId;
  hideHeader?: boolean;
}

export const InteractiveToolsStudio: React.FC<InteractiveToolsStudioProps> = ({
  initialTool = 'summarizer',
  hideHeader = false
}) => {
  const [activeTool, setActiveTool] = useState<InteractiveToolId>(initialTool);

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool]);

  const toolsList: { id: InteractiveToolId; label: string; shortLabel: string; icon: React.ReactNode; badge: string }[] = [
    {
      id: 'summarizer',
      label: 'AI Text Summarizer',
      shortLabel: 'Summarizer',
      icon: <FileText className="w-4 h-4" />,
      badge: 'Articles & Docs'
    },
    {
      id: 'paraphraser',
      label: 'AI Paraphrasing Tool',
      shortLabel: 'Paraphraser',
      icon: <RefreshCw className="w-4 h-4" />,
      badge: '4 Tones'
    },
    {
      id: 'email-writer',
      label: 'AI Email Writer',
      shortLabel: 'Email Writer',
      icon: <Mail className="w-4 h-4" />,
      badge: 'High-Converting'
    },
    {
      id: 'title-generator',
      label: 'AI Title Generator',
      shortLabel: 'Title Generator',
      icon: <Heading className="w-4 h-4" />,
      badge: 'High CTR'
    },
    {
      id: 'meta-description',
      label: 'AI Meta Description',
      shortLabel: 'Meta Descriptions',
      icon: <Globe className="w-4 h-4" />,
      badge: 'SERP Ready'
    }
  ];

  return (
    <div className="w-full">
      {!hideHeader && (
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/80 text-xs font-bold mb-2 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Free Online AI Tools • Instant in Browser • No Signup</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            Built-In AI Writing & SEO Studio
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Free instant AI utilities to summarize long documents, rewrite text across four tones, draft business emails, create viral headlines, and generate SEO meta descriptions.
          </p>
        </div>
      )}

      {/* Interactive Tool Selector Tabs */}
      <div
        role="tablist"
        aria-label="Select Free AI Tool"
        className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none"
      >
        {toolsList.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTool(tool.id)}
              className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}>
                {tool.icon}
              </span>
              <span className="hidden sm:inline">{tool.label}</span>
              <span className="inline sm:hidden">{tool.shortLabel}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {tool.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tool Workspace Container */}
      <div className="relative">
        {activeTool === 'summarizer' && <TextSummarizerTool />}
        {activeTool === 'paraphraser' && <ParaphraserTool />}
        {activeTool === 'email-writer' && <EmailWriterTool />}
        {activeTool === 'title-generator' && <TitleGeneratorTool />}
        {activeTool === 'meta-description' && <MetaDescriptionTool />}
      </div>
    </div>
  );
};
