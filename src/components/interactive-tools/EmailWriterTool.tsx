import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Send,
  User,
  MessageSquare,
  Briefcase,
  Smile,
  Shield,
  HelpCircle
} from 'lucide-react';
import { generateEmail } from '../../utils/aiToolGenerators';
import { copyToClipboard } from '../../utils/clipboard';
import { useApp } from '../../context/AppContext';

export const EmailWriterTool: React.FC = () => {
  const { showToast } = useApp();
  const [purpose, setPurpose] = useState('');
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState<'professional' | 'friendly' | 'formal' | 'apologetic'>('professional');
  const [senderName, setSenderName] = useState('');
  const [keyDetails, setKeyDetails] = useState('');
  const [result, setResult] = useState<ReturnType<typeof generateEmail> | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!purpose.trim()) {
      showToast('Please enter the email purpose or topic.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const emailResult = generateEmail({
        purpose,
        recipient,
        tone,
        senderName: senderName || 'Your Name',
        keyDetails
      });
      setResult(emailResult);
      setIsGenerating(false);
      showToast('Email drafted successfully!');
    }, 150);
  };

  const handleClear = () => {
    setPurpose('');
    setRecipient('');
    setSenderName('');
    setKeyDetails('');
    setResult(null);
  };

  const handleLoadSample = (sampleType: 'extension' | 'followup' | 'apology') => {
    if (sampleType === 'extension') {
      setPurpose('Requesting a 3-day project deadline extension');
      setRecipient('Alex (Project Manager)');
      setTone('professional');
      setSenderName('Morgan');
      setKeyDetails('Additional quality assurance testing needed for final deliverables to eliminate edge-case bugs.');
    } else if (sampleType === 'followup') {
      setPurpose('Follow up on partnership proposal sent last Tuesday');
      setRecipient('Sarah Jenkins');
      setTone('friendly');
      setSenderName('Alex Vance');
      setKeyDetails('We can offer 15% co-marketing commission and featured placement in our weekly dispatch.');
    } else {
      setPurpose('Service downtime and late report delivery');
      setRecipient('Valued Client');
      setTone('apologetic');
      setSenderName('Operations Team');
      setKeyDetails('A database migration bottleneck caused 45 minutes of latency. All data is restored and fortified.');
    }
    showToast('Loaded sample email scenario!');
  };

  const handleCopyBody = async () => {
    if (!result) return;
    const fullText = `Subject: ${result.subject}\n\n${result.body}`;
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopiedBody(true);
      showToast('Full email & subject copied to clipboard!');
      setTimeout(() => setCopiedBody(false), 2000);
    }
  };

  const handleCopySubject = async () => {
    if (!result?.subject) return;
    const ok = await copyToClipboard(result.subject);
    if (ok) {
      setCopiedSubject(true);
      showToast('Subject line copied!');
      setTimeout(() => setCopiedSubject(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-7 shadow-xs">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Instant AI Tool</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk'] tracking-tight">
            AI Email Writer
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Draft high-converting, diplomatic, and articulate emails with custom recipients and tone options.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-1.5 flex-wrap self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => handleLoadSample('extension')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Deadline Extension
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample('followup')}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Follow Up
          </button>
        </div>
      </div>

      {/* Tone Selection */}
      <div className="py-5 border-b border-slate-100 dark:border-slate-800">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Tone of Voice:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'professional', label: 'Professional', icon: <Briefcase className="w-3.5 h-3.5" /> },
            { id: 'friendly', label: 'Friendly', icon: <Smile className="w-3.5 h-3.5" /> },
            { id: 'formal', label: 'Formal', icon: <Shield className="w-3.5 h-3.5" /> },
            { id: 'apologetic', label: 'Apologetic', icon: <HelpCircle className="w-3.5 h-3.5" /> }
          ].map((item) => {
            const isSelected = tone === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTone(item.id as any)}
                className={`py-2.5 px-3 text-xs font-medium rounded-xl border capitalize transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Purpose / Core Topic <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g., Requesting feedback on Q3 deliverables, sales intro..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Recipient (Name or Role)
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g., Sarah, Hiring Manager, Team"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Your Name / Signature
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., Jordan Miller"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Specific Key Details or Constraints (Optional)
            </label>
            <textarea
              value={keyDetails}
              onChange={(e) => setKeyDetails(e.target.value)}
              placeholder="Add dates, numbers, bullet points, or specific requests to include..."
              rows={3}
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleClear}
              disabled={!purpose && !recipient && !keyDetails}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!purpose.trim() || isGenerating}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Writing...' : 'Generate Email'}</span>
            </button>
          </div>
        </div>

        {/* Generated Email Preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
            <span>Generated Email Output</span>
            {result && (
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                {result.wordCount} words
              </span>
            )}
          </div>

          <div className="flex-1 min-h-[280px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm overflow-y-auto max-h-[400px] flex flex-col">
            {result ? (
              <div className="space-y-4">
                {/* Subject Header */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Subject Line:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {result.subject}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySubject}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors shrink-0 cursor-pointer"
                    title="Copy Subject Only"
                  >
                    {copiedSubject ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Email Body */}
                <div className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200 text-sm">
                  {result.body}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-14 text-slate-400 dark:text-slate-500">
                <Mail className="w-8 h-8 mb-2 stroke-[1.5] text-slate-300 dark:text-slate-600" />
                <p className="text-xs">Your drafted email and subject line will appear here.</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Enter a purpose above and click &quot;Generate Email&quot;.</p>
              </div>
            )}
          </div>

          {result && (
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={handleCopyBody}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBody ? 'Copied Full Email!' : 'Copy Full Email'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
