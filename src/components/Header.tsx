import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bookmark,
  Menu,
  X,
  ChevronDown,
  Settings,
  Sun,
  Moon,
  PlusCircle,
  Zap,
  Grid,
  Pin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentPath, navigate, setIsSearchOpen, bookmarks, theme, toggleTheme, setSubmitToolModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Logo - Modern AI Startup Branding */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-transform group-hover:scale-105">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-['Space_Grotesk']">
              AITool<span className="text-indigo-600 dark:text-indigo-400">Nest</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => handleNav('/')}
              className={`transition-colors cursor-pointer py-1.5 ${
                isActive('/') && currentPath === '/' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/ai-tools')}
              className={`transition-colors cursor-pointer py-1.5 ${
                currentPath.startsWith('/ai-tools') || currentPath === '/tools' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              AI Directory
            </button>

            <button
              onClick={() => handleNav('/free-ai-tools')}
              className={`transition-colors cursor-pointer py-1.5 inline-flex items-center gap-1 ${
                currentPath === '/free-ai-tools' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <span>Free Tools</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold uppercase">100% Free</span>
            </button>

            <button
              onClick={() => handleNav('/ai-prompts')}
              className={`transition-colors cursor-pointer py-1.5 ${
                currentPath === '/ai-prompts' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              Prompt Library
            </button>

            {/* Explore Hubs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className={`transition-colors inline-flex items-center gap-1 cursor-pointer py-1.5 ${
                  categoriesDropdownOpen || currentPath.startsWith('/chatgpt-') || currentPath.startsWith('/ai-image-') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-indigo-600 dark:hover:text-white'
                }`}
              >
                <span>Curated Hubs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fadeIn text-xs"
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                >
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    High-Impact Guides
                  </div>
                  <button onClick={() => handleNav('/chatgpt-alternatives')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between">
                    <span>ChatGPT Alternatives</span>
                    <span className="text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-bold uppercase">Top 5</span>
                  </button>
                  <button onClick={() => handleNav('/ai-image-generators')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                    AI Image Generators
                  </button>
                  <button onClick={() => handleNav('/ai-tools-for-business')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                    AI Tools for Business
                  </button>
                  <button onClick={() => handleNav('/ai-tools-for-students')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                    AI Tools for Students
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
                  <button onClick={() => handleNav('/business-ideas')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                    AI Business Blueprints
                  </button>
                  <button onClick={() => handleNav('/digital-products')} className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200">
                    Digital Products & Kits
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('/blog')}
              className={`transition-colors cursor-pointer py-1.5 ${
                isActive('/blog') ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'hover:text-indigo-600 dark:hover:text-white'
              }`}
            >
              Guides & Blog
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pill Search Bar */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="px-3 sm:px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search AI tools...</span>
              <kbd className="hidden sm:inline-block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400 text-[10px] font-mono px-1 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => handleNav('/ai-tools?filter=saved')}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
              title="Saved AI Tools"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Submit Tool CTA Button */}
            <button
              onClick={() => setSubmitToolModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Tool</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2 shadow-xl animate-fadeIn text-sm">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium ${
              isActive('/') && currentPath === '/' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/ai-tools')}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium ${
              currentPath.startsWith('/ai-tools') ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            AI Tools Directory
          </button>
          <button
            onClick={() => handleNav('/free-ai-tools')}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium ${
              currentPath === '/free-ai-tools' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            100% Free AI Tools
          </button>
          <button
            onClick={() => handleNav('/ai-prompts')}
            className={`w-full text-left px-3 py-2 rounded-xl font-medium ${
              currentPath === '/ai-prompts' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Prompt Library
          </button>
          <button
            onClick={() => handleNav('/chatgpt-alternatives')}
            className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            ChatGPT Alternatives
          </button>
          <button
            onClick={() => handleNav('/ai-image-generators')}
            className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            AI Image Generators
          </button>
          <button
            onClick={() => handleNav('/business-ideas')}
            className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Business Ideas
          </button>
          <button
            onClick={() => handleNav('/blog')}
            className="w-full text-left px-3 py-2 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Blog & Guides
          </button>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between px-2">
            <button
              onClick={() => { setSubmitToolModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Your AI Tool</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

