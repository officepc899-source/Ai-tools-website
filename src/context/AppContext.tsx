import React, { createContext, useContext, useState, useEffect } from 'react';
import { AITool, BusinessIdea, DigitalProduct, Article } from '../types';
import { INITIAL_AI_TOOLS } from '../data/toolsData';
import { INITIAL_BUSINESS_IDEAS } from '../data/businessIdeasData';
import { INITIAL_DIGITAL_PRODUCTS } from '../data/digitalProductsData';
import { INITIAL_ARTICLES } from '../data/articlesData';

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
  toggleAds: () => void;
  checkoutModal: CheckoutModalData;
  openCheckout: (product: DigitalProduct) => void;
  closeCheckout: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  affiliateModalOpen: boolean;
  setAffiliateModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hash-based routing for robust browser back/forward and deep linking in SPA
  const getPathFromHash = () => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(getPathFromHash);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [adsEnabled, setAdsEnabled] = useState<boolean>(true);
  const [affiliateModalOpen, setAffiliateModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('nexus_articles_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ARTICLES;
  });

  // Keep path in sync with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getPathFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    const formatted = path.startsWith('/') ? path : `/${path}`;
    window.location.hash = formatted;
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
        toggleAds,
        checkoutModal,
        openCheckout,
        closeCheckout,
        toastMessage,
        showToast,
        affiliateModalOpen,
        setAffiliateModalOpen,
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
