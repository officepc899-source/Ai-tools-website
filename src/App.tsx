import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AffiliateDisclosureBanner } from './components/AffiliateDisclosure';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HomeView } from './views/HomeView';
import { ToolsDirectoryView } from './views/ToolsDirectoryView';
import { ToolDetailView } from './views/ToolDetailView';
import { BusinessIdeasView } from './views/BusinessIdeasView';
import { BusinessIdeaDetailView } from './views/BusinessIdeaDetailView';
import { DigitalProductsView } from './views/DigitalProductsView';
import { BlogView } from './views/BlogView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { PinterestLandingView } from './views/PinterestLandingView';
import {
  PrivacyPolicyView,
  TermsView,
  DisclaimerView,
  ContactView,
  AboutView,
  SitemapView
} from './views/LegalViews';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { currentPath, toast } = useApp();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const renderRoute = () => {
    // Strip query parameters for basic routing match
    const cleanPath = currentPath.split('?')[0];

    if (cleanPath === '' || cleanPath === '/') {
      return <HomeView />;
    }

    if (cleanPath === '/tools' || cleanPath === '/ai-tools') {
      return <ToolsDirectoryView />;
    }

    if (cleanPath.startsWith('/category/') || cleanPath.startsWith('/ai-tools/category/')) {
      return <ToolsDirectoryView />;
    }

    if (cleanPath.startsWith('/ai-tools/')) {
      const slug = cleanPath.replace('/ai-tools/', '');
      return <ToolDetailView slug={slug} />;
    }

    if (cleanPath.startsWith('/tool/')) {
      const slug = cleanPath.replace('/tool/', '');
      return <ToolDetailView slug={slug} />;
    }

    if (cleanPath === '/business-ideas') {
      return <BusinessIdeasView />;
    }

    if (cleanPath.startsWith('/business-idea/')) {
      const slug = cleanPath.replace('/business-idea/', '');
      return <BusinessIdeaDetailView slug={slug} />;
    }

    if (cleanPath === '/digital-products') {
      return <DigitalProductsView />;
    }

    if (cleanPath === '/blog') {
      return <BlogView />;
    }

    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      return <ArticleDetailView slug={slug} />;
    }

    if (cleanPath.startsWith('/landing/')) {
      const slug = cleanPath.replace('/landing/', '');
      return <PinterestLandingView slug={slug} />;
    }

    if (cleanPath === '/privacy-policy') {
      return <PrivacyPolicyView />;
    }

    if (cleanPath === '/terms') {
      return <TermsView />;
    }

    if (cleanPath === '/disclaimer') {
      return <DisclaimerView />;
    }

    if (cleanPath === '/contact') {
      return <ContactView />;
    }

    if (cleanPath === '/about') {
      return <AboutView />;
    }

    if (cleanPath === '/admin') {
      return <AdminView />;
    }

    if (cleanPath === '/sitemap.xml' || cleanPath === '/robots.txt') {
      return <SitemapView />;
    }

    // Default Fallback
    return <HomeView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* FTC Affiliate Compliance Banner */}
      <AffiliateDisclosureBanner />

      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <GlobalSearchModal />
      <CheckoutModal />

      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs sm:text-sm font-medium animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
