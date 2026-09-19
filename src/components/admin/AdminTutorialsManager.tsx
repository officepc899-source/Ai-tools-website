import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Save,
  X,
  GraduationCap,
  Clock,
  BookOpen,
  Video,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Tutorial, TutorialCategory, TutorialDifficulty, TutorialStep } from '../../types';

export const AdminTutorialsManager: React.FC = () => {
  const { tutorials, addTutorial, updateTutorial, deleteTutorial, showToast, navigate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState<TutorialCategory>('ChatGPT');
  const [formDifficulty, setFormDifficulty] = useState<TutorialDifficulty>('Beginner');
  const [formDuration, setFormDuration] = useState('8 min read');
  const [formThumbnail, setFormThumbnail] = useState('https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formIntroduction, setFormIntroduction] = useState('');
  const [formWhatYouNeed, setFormWhatYouNeed] = useState('');
  const [formTips, setFormTips] = useState('');
  const [formCommonMistakes, setFormCommonMistakes] = useState('');
  const [formConclusion, setFormConclusion] = useState('');
  const [formRelatedTools, setFormRelatedTools] = useState('chatgpt, claude');
  const [formSteps, setFormSteps] = useState<TutorialStep[]>([
    { step: 1, title: 'Getting Started', description: 'Begin by setting up your environment and goals.', tips: 'Start with clear intentions.' }
  ]);

  const categories: TutorialCategory[] = [
    'ChatGPT',
    'AI Writing',
    'AI Image',
    'AI Video',
    'Productivity',
    'Students',
    'Marketing',
    'Other'
  ];

  const difficulties: TutorialDifficulty[] = ['Beginner', 'Intermediate', 'Advanced'];

  // Reset form
  const resetForm = () => {
    setFormTitle('');
    setFormSlug('');
    setFormCategory('ChatGPT');
    setFormDifficulty('Beginner');
    setFormDuration('8 min read');
    setFormThumbnail('https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80');
    setFormVideoUrl('');
    setFormDescription('');
    setFormIntroduction('');
    setFormWhatYouNeed('');
    setFormTips('');
    setFormCommonMistakes('');
    setFormConclusion('');
    setFormRelatedTools('chatgpt, claude');
    setFormSteps([
      { step: 1, title: 'Getting Started', description: 'Begin by setting up your environment and goals.', tips: 'Start with clear intentions.' }
    ]);
  };

  // Open Create
  const handleOpenCreate = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    setFormTitle(tutorial.title);
    setFormSlug(tutorial.slug);
    setFormCategory(tutorial.category);
    setFormDifficulty(tutorial.difficulty);
    setFormDuration(tutorial.duration);
    setFormThumbnail(tutorial.thumbnail);
    setFormVideoUrl(tutorial.videoUrl || '');
    setFormDescription(tutorial.description);
    setFormIntroduction(tutorial.introduction);
    setFormWhatYouNeed(tutorial.whatYouNeed.join('\n'));
    setFormTips(tutorial.tips.join('\n'));
    setFormCommonMistakes(tutorial.commonMistakes.join('\n'));
    setFormConclusion(tutorial.conclusion);
    setFormRelatedTools(tutorial.relatedTools.join(', '));
    setFormSteps(tutorial.steps.length > 0 ? tutorial.steps : [
      { step: 1, title: 'Step 1', description: 'Step description', tips: '' }
    ]);
  };

  // Handle Step changes
  const handleStepChange = (index: number, field: keyof TutorialStep, value: string | number) => {
    setFormSteps((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddStep = () => {
    setFormSteps((prev) => [
      ...prev,
      { step: prev.length + 1, title: `Step ${prev.length + 1}`, description: '' }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (formSteps.length <= 1) {
      showToast('A tutorial must have at least one step.');
      return;
    }
    setFormSteps((prev) => {
      const filtered = prev.filter((_, i) => i !== index);
      // re-index steps
      return filtered.map((s, idx) => ({ ...s, step: idx + 1 }));
    });
  };

  // Handle Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim()) {
      showToast('Please enter a tutorial title.');
      return;
    }

    const generatedSlug = (formSlug.trim() || formTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const parsedWhatYouNeed = formWhatYouNeed
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedTips = formTips
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedCommonMistakes = formCommonMistakes
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const parsedRelatedTools = formRelatedTools
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const tutorialData: Tutorial = {
      id: editingTutorial ? editingTutorial.id : `tut-${Date.now()}`,
      slug: generatedSlug,
      title: formTitle.trim(),
      description: formDescription.trim() || 'Learn how to use AI tools with this practical step-by-step walkthrough.',
      category: formCategory,
      difficulty: formDifficulty,
      duration: formDuration.trim() || '8 min read',
      thumbnail: formThumbnail.trim() || 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      videoUrl: formVideoUrl.trim() ? formVideoUrl.trim() : undefined,
      introduction: formIntroduction.trim() || formDescription.trim(),
      whatYouNeed: parsedWhatYouNeed.length > 0 ? parsedWhatYouNeed : ['An internet connection', 'A web browser'],
      steps: formSteps,
      tips: parsedTips.length > 0 ? parsedTips : ['Practice consistently to get the best results.'],
      commonMistakes: parsedCommonMistakes.length > 0 ? parsedCommonMistakes : ['Rushing through the process without verifying.'],
      conclusion: formConclusion.trim() || 'You are now ready to apply these skills in your daily workflow.',
      relatedTools: parsedRelatedTools.length > 0 ? parsedRelatedTools : ['chatgpt'],
      publishedDate: editingTutorial?.publishedDate || new Date().toISOString().split('T')[0],
      author: editingTutorial?.author || {
        name: 'AIToolNest Team',
        role: 'AI Research Staff'
      }
    };

    if (editingTutorial) {
      updateTutorial(tutorialData);
      setEditingTutorial(null);
    } else {
      addTutorial(tutorialData);
      setIsCreateModalOpen(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the tutorial "${title}"?`)) {
      deleteTutorial(id);
    }
  };

  // Filtered tutorials
  const filteredTutorials = tutorials.filter((t) => {
    if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
            AI Tutorials Management ({tutorials.length} Tutorials)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish, edit, and organize step-by-step AI tutorials. Support for written guides and optional future video URLs.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tutorial</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search tutorials by title, slug, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold shrink-0">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutorials Table / Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-mono font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Tutorial</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Steps</th>
                <th className="py-3 px-4">Video Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredTutorials.map((tut) => (
                <tr key={tut.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={tut.thumbnail}
                        alt={tut.title}
                        className="w-12 h-8 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] text-sm line-clamp-1">
                          {tut.title}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400">
                          /tutorials/{tut.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80">
                      {tut.category}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {tut.difficulty}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-slate-500 font-mono">
                    {tut.duration}
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {tut.steps.length} steps
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {tut.videoUrl ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                        <Video className="w-3 h-3" />
                        <span>Video Linked</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">
                        Written Only
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/tutorials/${tut.slug}`)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="View Tutorial Page"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleOpenEdit(tut)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Tutorial"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(tut.id, tut.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Tutorial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE OR EDIT MODAL */}
      {(isCreateModalOpen || editingTutorial) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                  {editingTutorial ? `Edit Tutorial: ${editingTutorial.title}` : 'Create New AI Tutorial'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fill in the comprehensive tutorial walkthrough details below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setEditingTutorial(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tutorial Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingTutorial) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '')
                        );
                      }
                    }}
                    placeholder="e.g. How to Use ChatGPT for Beginners"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    SEO Slug (URL path) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. how-to-use-chatgpt-for-beginners"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Category, Difficulty, Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as TutorialCategory)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Difficulty *
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as TutorialDifficulty)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {difficulties.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Duration (e.g. 8 min read) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Thumbnail URL & Video URL (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Thumbnail Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formThumbnail}
                    onChange={(e) => setFormThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Video URL (Optional - YouTube / Embed URL)
                  </label>
                  <input
                    type="text"
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    placeholder="Leave blank if no video yet"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Short Description (Shown on cards &amp; preview) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summary of what the reader will accomplish..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Introduction */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Introduction
                </label>
                <textarea
                  rows={3}
                  value={formIntroduction}
                  onChange={(e) => setFormIntroduction(e.target.value)}
                  placeholder="Detailed introductory context explaining importance..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* What You Need (one per line) */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  What You Need (One item per line)
                </label>
                <textarea
                  rows={3}
                  value={formWhatYouNeed}
                  onChange={(e) => setFormWhatYouNeed(e.target.value)}
                  placeholder="A free OpenAI account&#10;A web browser or mobile app&#10;A clear project goal"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Step-by-Step Sections Editor */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white font-['Space_Grotesk']">
                    Step-by-Step Instructions ({formSteps.length} Steps)
                  </span>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {formSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
                          Step {idx + 1}
                        </span>
                        {formSteps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(idx)}
                            className="text-rose-500 hover:text-rose-600 text-[11px] font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                        placeholder="Step Title (e.g. Set up your account)"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />

                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                        placeholder="Step instructions and guidance..."
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />

                      <input
                        type="text"
                        value={step.tips || ''}
                        onChange={(e) => handleStepChange(idx, 'tips', e.target.value)}
                        placeholder="Optional step tip (e.g. Pro Tip: Use keyboard shortcuts)"
                        className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Useful Tips & Common Mistakes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Useful Tips (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formTips}
                    onChange={(e) => setFormTips(e.target.value)}
                    placeholder="Use keyboard shortcuts&#10;Iterate on feedback"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Common Mistakes to Avoid (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formCommonMistakes}
                    onChange={(e) => setFormCommonMistakes(e.target.value)}
                    placeholder="Entering confidential data&#10;Not verifying citations"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Conclusion & Related Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Conclusion
                  </label>
                  <textarea
                    rows={2}
                    value={formConclusion}
                    onChange={(e) => setFormConclusion(e.target.value)}
                    placeholder="Closing summary and next steps..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Related AI Tools (Comma-separated slugs, e.g. chatgpt, claude)
                  </label>
                  <input
                    type="text"
                    value={formRelatedTools}
                    onChange={(e) => setFormRelatedTools(e.target.value)}
                    placeholder="chatgpt, claude, notion-ai"
                    className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateModalOpen(false);
                    setEditingTutorial(null);
                  }}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingTutorial ? 'Save Changes' : 'Publish Tutorial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
