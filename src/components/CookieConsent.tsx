import React, { useState, useEffect } from 'react';
import { Cookie, Shield, Check, X, ChevronRight, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const STORAGE_KEY = 'aitoolnest_cookie_consent_v1';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

export const CookieConsent: React.FC = () => {
  const { navigate } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Preference switches
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [advertisingConsent, setAdvertisingConsent] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Small delay for smooth entrance after page loads
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      // Notify gtag if defined
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: prefs.analytics ? 'granted' : 'denied',
          ad_storage: prefs.advertising ? 'granted' : 'denied',
          ad_user_data: prefs.advertising ? 'granted' : 'denied',
          ad_personalization: prefs.advertising ? 'granted' : 'denied'
        });
      }
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    });
  };

  const handleRejectNonEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsConsent,
      advertising: advertisingConsent,
      timestamp: new Date().toISOString()
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-fadeIn"
    >
      <div className="p-5 sm:p-6 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-900/10 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
                Cookie &amp; Privacy Choices
              </h3>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                GDPR &amp; CCPA Compliant
              </span>
            </div>
          </div>
          <button
            onClick={handleRejectNonEssential}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg transition-colors cursor-pointer"
            title="Decline non-essential cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          We use cookies to deliver personalized Google AdSense advertising, measure affiliate referrals, and enhance your browsing experience.{' '}
          <button
            onClick={() => navigate('/cookie-policy')}
            className="text-indigo-600 dark:text-indigo-400 underline font-semibold hover:text-indigo-700 cursor-pointer"
          >
            Read Cookie Policy
          </button>.
        </p>

        {/* Preferences Drawer */}
        {showPreferences && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Strictly Necessary</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Theme, navigation &amp; security</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                Always Active
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Performance &amp; Analytics</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Google Analytics 4 page metrics</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsConsent}
                onChange={(e) => setAnalyticsConsent(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">AdSense &amp; Advertising</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Relevant ads &amp; affiliate tracking</span>
              </div>
              <input
                type="checkbox"
                checked={advertisingConsent}
                onChange={(e) => setAdvertisingConsent(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          {showPreferences ? (
            <button
              onClick={handleSaveCustom}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
            >
              Save Cookie Preferences
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAcceptAll}
                className="py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer text-center shadow-xs"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer text-center"
              >
                Necessary Only
              </button>
            </div>
          )}

          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="inline-flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            <span>{showPreferences ? 'Hide Options' : 'Customize Preferences'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
