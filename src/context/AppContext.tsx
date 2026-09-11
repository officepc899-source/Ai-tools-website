import React, { createContext, useContext, useState, useEffect } from 'react';
import { AITool, BusinessIdea, DigitalProduct, Article, PinterestLandingTopic } from '../types';
import { INITIAL_AI_TOOLS } from '../data/toolsData';
import { INITIAL_BUSINESS_IDEAS } from '../data/businessIdeasData';
import { INITIAL_DIGITAL_PRODUCTS } from '../data/digitalProductsData';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { PINTEREST_LANDINGS } from '../data/pinterestLandingsData';

interface CheckoutModalData {
  isOpen: boolean;
  product: DigitalProduct | null;
}

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
  digitalProducts: DigitalProduct[];
  articles: Article[];
  updateArticle: (updated: Article) => void;
  adsEnabled: boolean;
  setAdsEnabled: (enabled: boolean) => void;
  toggleAds: () => void;
  pinterestLandings: PinterestLandingTopic[];
  checkoutModal: CheckoutModalData;
  openCheckout: (product: DigitalProduct) => void;
  closeCheckout: () => void;
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
  if (typeof window !== 'undefined') {
    const p = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const h = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
    if (p === '/admin' || p.startsWith('/admin/')) return true;
    if (h === 'admin' || h.startsWith('admin/')) return true;
  }
  if (path) {
    const clean = path.toLowerCase().split('?')[0].replace(/\/+$/, '') || '/';
    if (clean === '/admin' || clean.startsWith('/admin/') || clean === 'admin' || clean.startsWith('admin/')) {
      return true;
    }
  }
  return false;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dual hash and pathname routing for browser back/forward, deep linking, and direct URLs
  const getPathFromLocation = (): string => {
    // 1. Always prioritize checking for /admin route
    if (isAdminPath()) {
      return '/admin';
    }

    // 2. Check window.location.hash first (e.g., #/tools)
    const rawHash = window.location.hash.replace(/^#/, '').split('?')[0].trim();
    if (rawHash && rawHash !== '/') {
      return rawHash.startsWith('/') ? rawHash : `/${rawHash}`;
    }

    // 3. Fall back to standard browser pathname (e.g., /tools)
    const pathname = window.location.pathname.split('?')[0].trim();
    if (pathname && pathname !== '/') {
      return pathname.replace(/\/$/, '') || '/';
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
  const [checkoutModal, setCheckoutModal] = useState<CheckoutModalData>({
    isOpen: false,
    product: null
  });

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
  const TOOLS_VERSION = 'v2_complete_directory_49';
  const [tools, setTools] = useState<AITool[]>(() => {
    try {
      const savedVersion = localStorage.getItem('nexus_tools_version');
      if (savedVersion === TOOLS_VERSION) {
        const saved = localStorage.getItem('nexus_tools_data');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_AI_TOOLS.length) return parsed;
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
  const [digitalProducts] = useState<DigitalProduct[]>(INITIAL_DIGITAL_PRODUCTS);
  const ARTICLES_VERSION = 'v3_20_seo_articles';
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

  const toggleAds = () => {
    setAdsEnabled((prev) => !prev);
    showToast(adsEnabled ? 'Display Ads disabled' : 'Display Ads enabled');
  };

  const openCheckout = (product: DigitalProduct) => {
    setCheckoutModal({ isOpen: true, product });
  };

  const closeCheckout = () => {
    setCheckoutModal({ isOpen: false, product: null });
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
        digitalProducts,
        articles,
        updateArticle,
        adsEnabled,
        setAdsEnabled,
        toggleAds,
        pinterestLandings: PINTEREST_LANDINGS,
        checkoutModal,
        openCheckout,
        closeCheckout,
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
