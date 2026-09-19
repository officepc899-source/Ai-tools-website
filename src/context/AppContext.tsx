import React, { createContext, useContext, useState, useEffect } from 'react';
import { AITool, BusinessIdea, Article, PinterestLandingTopic, Tutorial } from '../types';
import { INITIAL_AI_TOOLS } from '../data/toolsData';
import { INITIAL_BUSINESS_IDEAS } from '../data/businessIdeasData';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { INITIAL_TUTORIALS } from '../data/tutorials';
import { PINTEREST_LANDINGS } from '../data/pinterestLandingsData';

interface AppContextType {
  currentPath: string;
  navigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  bookmarks: string[];
  toggleBookmark: (toolSlug: string) => void;
  isBookmarked: (toolSlug: string) => boolean;
  tools: AITool[];
  updateTool: (updatedTool: AITool) => void;
  addTool: (newTool: AITool) => void;
  deleteTool: (toolId: string) => void;
  resetToolsData: () => void;
  businessIdeas: BusinessIdea[];
  articles: Article[];
  updateArticle: (updated: Article) => void;
  tutorials: Tutorial[];
  addTutorial: (newTutorial: Tutorial) => void;
  updateTutorial: (updated: Tutorial) => void;
  deleteTutorial: (tutorialId: string) => void;
  adsEnabled: boolean;
  setAdsEnabled: (enabled: boolean) => void;
  toggleAds: () => void;
  pinterestLandings: PinterestLandingTopic[];
  toastMessage: string | null;
  toast: string | null;
  showToast: (msg: string) => void;
  affiliateModalOpen: boolean;
  setAffiliateModalOpen: (open: boolean) => void;
  submitToolModalOpen: boolean;
  setSubmitToolModalOpen: (open: boolean) => void;
}

// Helper to determine if a given path or browser location corresponds to the admin route
export const isAdminPath = (path?: string): boolean => {
  if (path !== undefined && path !== null) {
    const clean = path.toLowerCase().split('?')[0].replace(/\/+$/, '') || '/';
    return clean === '/admin' || clean.startsWith('/admin/') || clean === 'admin' || clean.startsWith('admin/');
  }
  if (typeof window !== 'undefined') {
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const h = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
    if (p === '/admin' || p.startsWith('/admin/')) return true;
    if (h === 'admin' || h.startsWith('admin/')) return true;
  }
  return false;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dual hash and pathname routing for browser back/forward, deep linking, and direct URLs
  const getPathFromLocation = (): string => {
    // 1. Check window.location.hash first (e.g. #/admin or #/tools)
    const rawHash = (typeof window !== 'undefined' ? window.location.hash : '')
      .replace(/^#/, '')
      .split('?')[0]
      .trim();
    if (rawHash && rawHash !== '/') {
      const formattedHash = rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
      return formattedHash;
    }

    // 2. Check window.location.pathname
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.split('?')[0].trim();
      const cleanPath = pathname.replace(/\/+$/, '') || '/';
      if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
        return '/admin';
      }
      if (cleanPath !== '/') {
        return cleanPath;
      }
    }

    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(() => {
    const initial = getPathFromLocation();
    // If visited directly via pathname (e.g., /admin) without hash, sync hash for SPA state
    if (initial !== '/' && !window.location.hash) {
      try {
        if (initial === '/admin') {
          window.history.replaceState(null, '', '/admin');
        } else {
          window.history.replaceState(null, '', `#${initial}`);
        }
      } catch {
        window.location.hash = initial;
      }
    }
    return initial;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [submitToolModalOpen, setSubmitToolModalOpen] = useState<boolean>(false);
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [affiliateModalOpen, setAffiliateModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Theme support (light / dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('aitoolnest_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      // Default to light or check system preference
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aitoolnest_theme', theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_bookmarks');
      return saved ? JSON.parse(saved) : ['chatgpt', 'claude', 'canva-magic-studio'];
    } catch {
      return ['chatgpt', 'claude'];
    }
  });

  // Tools data with admin persistence and version migration
  const TOOLS_VERSION = 'v4_google_collection_53';
  const [tools, setTools] = useState<AITool[]>(() => {
    try {
      const savedVersion = localStorage.getItem('nexus_tools_version');
      const saved = localStorage.getItem('nexus_tools_data');
      if (saved && savedVersion === TOOLS_VERSION) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasGemini = parsed.some((t: AITool) => t.slug === 'google-gemini' || t.slug === 'gemini');
          const hasVeo = parsed.some((t: AITool) => t.slug === 'google-veo');
          if (hasGemini && hasVeo && parsed.length >= INITIAL_AI_TOOLS.length) {
            return parsed;
          }
        }
      }
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Merge INITIAL_AI_TOOLS with existing custom/admin tools
          const customOrEdited = parsed.filter((t: AITool) => !INITIAL_AI_TOOLS.some((init) => init.id === t.id));
          const merged = [...INITIAL_AI_TOOLS, ...customOrEdited];
          localStorage.setItem('nexus_tools_version', TOOLS_VERSION);
          localStorage.setItem('nexus_tools_data', JSON.stringify(merged));
          return merged;
        }
      }
    } catch {
      // fallback
    }
    // Set fresh initial tools
    try {
      localStorage.setItem('nexus_tools_version', TOOLS_VERSION);
      localStorage.setItem('nexus_tools_data', JSON.stringify(INITIAL_AI_TOOLS));
    } catch {
      // ignore
    }
    return INITIAL_AI_TOOLS;
  });

  const [businessIdeas] = useState<BusinessIdea[]>(INITIAL_BUSINESS_IDEAS);
  const ARTICLES_VERSION = 'v5_38_curated_articles';
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const savedVersion = localStorage.getItem('nexus_articles_version');
      if (savedVersion === ARTICLES_VERSION) {
        const saved = localStorage.getItem('nexus_articles_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_ARTICLES.length) return parsed;
        }
      }
    } catch {
      // fallback
    }
    try {
      localStorage.setItem('nexus_articles_version', ARTICLES_VERSION);
      localStorage.setItem('nexus_articles_data', JSON.stringify(INITIAL_ARTICLES));
    } catch {
      // ignore
    }
    return INITIAL_ARTICLES;
  });

  const TUTORIALS_VERSION = 'v1_ai_tutorials_initial';
  const [tutorials, setTutorials] = useState<Tutorial[]>(() => {
    try {
      const savedVersion = localStorage.getItem('nexus_tutorials_version');
      if (savedVersion === TUTORIALS_VERSION) {
        const saved = localStorage.getItem('nexus_tutorials_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_TUTORIALS.length) return parsed;
        }
      }
    } catch {
      // fallback
    }
    try {
      localStorage.setItem('nexus_tutorials_version', TUTORIALS_VERSION);
      localStorage.setItem('nexus_tutorials_data', JSON.stringify(INITIAL_TUTORIALS));
    } catch {
      // ignore
    }
    return INITIAL_TUTORIALS;
  });

  // Keep path in sync with browser hash and history popstate
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(getPathFromLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    const formatted = path.startsWith('/') ? path : `/${path}`;
    try {
      if (formatted === '/admin') {
        window.history.pushState(null, '', '/admin');
      } else if (formatted === '/') {
        if (window.location.pathname !== '/') {
          window.history.pushState(null, '', '/');
        } else {
          window.location.hash = '';
        }
      } else if (window.location.pathname !== '/' && window.location.pathname !== '') {
        window.history.pushState(null, '', `/#${formatted}`);
      } else {
        window.location.hash = formatted;
      }
    } catch {
      window.location.hash = formatted;
    }
    setCurrentPath(formatted);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const toggleBookmark = (toolSlug: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(toolSlug);
      const updated = exists ? prev.filter((s) => s !== toolSlug) : [...prev, toolSlug];
      try {
        localStorage.setItem('nexus_bookmarks', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast(exists ? 'Removed from saved tools' : 'Saved to your tool bookmarks!');
      return updated;
    });
  };

  const isBookmarked = (toolSlug: string) => bookmarks.includes(toolSlug);

  const updateTool = (updated: AITool) => {
    setTools((prev) => {
      const updatedList = prev.map((t) => (t.id === updated.id ? updated : t));
      try {
        localStorage.setItem('nexus_tools_data', JSON.stringify(updatedList));
      } catch {
        // ignore
      }
      showToast(`Updated "${updated.name}" successfully`);
      return updatedList;
    });
  };

  const addTool = (newTool: AITool) => {
    setTools((prev) => {
      const updated = [newTool, ...prev];
      try {
        localStorage.setItem('nexus_tools_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast(`Added "${newTool.name}" to directory`);
      return updated;
    });
  };

  const deleteTool = (toolId: string) => {
    setTools((prev) => {
      const updated = prev.filter((t) => t.id !== toolId);
      try {
        localStorage.setItem('nexus_tools_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      showToast('Tool deleted from directory');
      return updated;
    });
  };

  const resetToolsData = () => {
    setTools(INITIAL_AI_TOOLS);
    try {
      localStorage.removeItem('nexus_tools_data');
    } catch {
      // ignore
    }
    showToast('Reset tools to original catalog');
  };

  const updateArticle = (updated: Article) => {
    setArticles((prev) => {
      const updatedList = prev.map((a) => (a.id === updated.id ? updated : a));
      try {
        localStorage.setItem('nexus_articles_data', JSON.stringify(updatedList));
      } catch {
        // ignore
      }
      showToast('Article updated');
      return updatedList;
    });
  };

  const addTutorial = (newTut: Tutorial) => {
    setTutorials((prev) => {
      const updated = [newTut, ...prev];
      try {
        localStorage.setItem('nexus_tutorials_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(`Tutorial "${newTut.title}" created successfully!`);
  };

  const updateTutorial = (updatedTut: Tutorial) => {
    setTutorials((prev) => {
      const updated = prev.map((t) => (t.id === updatedTut.id ? updatedTut : t));
      try {
        localStorage.setItem('nexus_tutorials_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(`Tutorial "${updatedTut.title}" updated!`);
  };

  const deleteTutorial = (tutorialId: string) => {
    setTutorials((prev) => {
      const updated = prev.filter((t) => t.id !== tutorialId);
      try {
        localStorage.setItem('nexus_tutorials_data', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast('Tutorial deleted successfully');
  };

  const toggleAds = () => {
    setAdsEnabled((prev) => !prev);
    showToast(adsEnabled ? 'Display Ads disabled' : 'Display Ads enabled');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        tools,
        updateTool,
        addTool,
        deleteTool,
        resetToolsData,
        businessIdeas,
        articles,
        updateArticle,
        tutorials,
        addTutorial,
        updateTutorial,
        deleteTutorial,
        adsEnabled,
        setAdsEnabled,
        toggleAds,
        pinterestLandings: PINTEREST_LANDINGS,
        toastMessage,
        toast: toastMessage,
        showToast,
        affiliateModalOpen,
        setAffiliateModalOpen,
        theme,
        toggleTheme,
        submitToolModalOpen,
        setSubmitToolModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
