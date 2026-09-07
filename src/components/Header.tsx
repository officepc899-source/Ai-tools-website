import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bookmark,
  Menu,
  X,
  ChevronDown,
  Layers,
  Settings,
  Lightbulb,
  ShoppingBag,
  BookOpen,
  Pin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { currentPath, navigate, setIsSearchOpen, bookmarks } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pinterestDropdownOpen, setPinterestDropdownOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setPinterestDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-8">
          {/* Logo - Clean Minimalism */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              AITool<span className="text-indigo-600">Nest</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('/')}
              className={`transition-colors cursor-pointer ${
                isActive('/') && currentPath === '/' ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('/tools')}
              className={`transition-colors cursor-pointer ${
                isActive('/tools') || currentPath.startsWith('/tool/') || currentPath.startsWith('/ai-tools') || currentPath.startsWith('/category/') ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              AI Tools
            </button>

            <button
              onClick={() => handleNav('/business-ideas')}
              className={`transition-colors cursor-pointer ${
                isActive('/business-ideas') || currentPath.startsWith('/business-idea/') ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              Business Ideas
            </button>

            <button
              onClick={() => handleNav('/digital-products')}
              className={`transition-colors cursor-pointer ${
                isActive('/digital-products') ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              Digital Products
            </button>

            <button
              onClick={() => handleNav('/blog')}
              className={`transition-colors cursor-pointer ${
                isActive('/blog') ? 'text-indigo-600 font-semibold' : 'hover:text-indigo-600'
              }`}
            >
              Blog
            </button>

            {/* Pinterest Landing Pages Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPinterestDropdownOpen(!pinterestDropdownOpen)}
                className={`transition-colors inline-flex items-center gap-1 cursor-pointer ${
                  currentPath.startsWith('/landing/') ? 'text-rose-600 font-semibold' : 'hover:text-rose-600'
                }`}
              >
                <Pin className="w-3.5 h-3.5 text-rose-500" />
                <span>Pinterest Topics</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${pinterestDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {pinterestDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-fadeIn text-xs"
                  onMouseLeave={() => setPinterestDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    High-Converting Topic Hubs
                  </div>
                  <button onClick={() => handleNav('/landing/free-ai-tools')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center justify-between">
                    <span>Free AI Tools</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold uppercase">Hot</span>
                  </button>
                  <button onClick={() => handleNav('/landing/ai-tools')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    Top 50 AI Tools Directory
                  </button>
                  <button onClick={() => handleNav('/landing/online-business-ideas')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    Online Business Ideas
                  </button>
                  <button onClick={() => handleNav('/landing/ai-writing-tools')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    AI Writing Tools
                  </button>
                  <button onClick={() => handleNav('/landing/ai-design-tools')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    AI Design Tools
                  </button>
                  <button onClick={() => handleNav('/landing/digital-product-ideas')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    Digital Product Ideas
                  </button>
                  <button onClick={() => handleNav('/landing/best-ai-websites')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    Best AI Websites
                  </button>
                  <button onClick={() => handleNav('/landing/ai-tools-for-business')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    AI Tools for Business
                  </button>
                  <button onClick={() => handleNav('/landing/ai-tools-for-students')} className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700">
                    AI Tools for Students
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Search - Clean Minimalism pill search bar */}
          <div className="flex items-center gap-3">
            {/* Minimalist Pill Search Bar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="w-40 sm:w-64 pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/70 border-none rounded-full text-xs sm:text-sm text-slate-500 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <span>Search AI tools...</span>
                <kbd className="hidden sm:inline-block bg-white border border-slate-200 text-slate-400 text-[10px] font-mono px-1 rounded">
                  ⌘K
                </kbd>
              </button>
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => handleNav('/tools?filter=saved')}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Saved AI Tools"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Admin Management System Button */}
            <button
              onClick={() => handleNav('/admin')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isActive('/admin') ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Admin Dashboard (Manage Tools & Affiliate Links)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-fadeIn text-sm">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
              isActive('/') && currentPath === '/' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('/tools')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
              isActive('/tools') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            AI Tools Directory
          </button>
          <button
            onClick={() => handleNav('/business-ideas')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
              isActive('/business-ideas') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Business Ideas
          </button>
          <button
            onClick={() => handleNav('/digital-products')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
              isActive('/digital-products') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Digital Products & Templates
          </button>
          <button
            onClick={() => handleNav('/blog')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
              isActive('/blog') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Blog & Guides
          </button>

          <div className="pt-2 border-t border-slate-100">
            <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Pinterest Landing Hubs
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1 text-xs">
              <button onClick={() => handleNav('/landing/free-ai-tools')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • Free AI Tools
              </button>
              <button onClick={() => handleNav('/landing/online-business-ideas')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • Online Business Ideas
              </button>
              <button onClick={() => handleNav('/landing/ai-writing-tools')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • AI Writing Tools
              </button>
              <button onClick={() => handleNav('/landing/ai-design-tools')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • AI Design Tools
              </button>
              <button onClick={() => handleNav('/landing/digital-product-ideas')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • Digital Products
              </button>
              <button onClick={() => handleNav('/landing/best-ai-websites')} className="text-left px-3 py-1.5 text-slate-600 hover:text-indigo-600 truncate">
                • Best AI Websites
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
            <button
              onClick={() => handleNav('/admin')}
              className="text-xs font-semibold text-indigo-600 flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Management Hub</span>
            </button>
            <button
              onClick={() => handleNav('/about')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              About Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
