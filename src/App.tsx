import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AffiliateDisclosureBanner } from './components/AffiliateDisclosure';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';

// Views
import { HomeView } from './views/HomeView';
import { ToolsDirectoryView } from './views/ToolsDirectoryView';
import { ToolDetailView } from './views/ToolDetailView';
import { FreeAIToolsView } from './views/FreeAIToolsView';
import { AIToolsForBusinessView } from './views/AIToolsForBusinessView';
import { AIToolsForStudentsView } from './views/AIToolsForStudentsView';
import { AIImageGeneratorsView } from './views/AIImageGeneratorsView';
import { ChatGPTAlternativesView } from './views/ChatGPTAlternativesView';
import { AIPromptsView } from './views/AIPromptsView';
import { BusinessIdeasView } from './views/BusinessIdeasView';
import { BusinessIdeaDetailView } from './views/BusinessIdeaDetailView';
import { DigitalProductsView } from './views/DigitalProductsView';
import { GadgetsView } from './views/GadgetsView';
import { GadgetDetailView } from './views/GadgetDetailView';
import { BlogView } from './views/BlogView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { PinterestLandingView } from './views/PinterestLandingView';
import { NotFoundView } from './views/NotFoundView';
import {
  AboutView,
  ContactView,
  PrivacyPolicyView,
  TermsView,
  DisclaimerView,
  CookiePolicyView,
  EditorialPolicyView,
  DMCAPolicyView,
  WriteForUsView,
  AdvertiseView,
  AffiliateDisclosureView,
  AIEthicsView,
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
    // Strip query parameters for routing match
    const cleanPath = currentPath.split('?')[0].replace(/\/$/, '') || '/';

    if (cleanPath === '/') {
      return <HomeView />;
    }

    if (cleanPath === '/tools' || cleanPath === '/ai-tools') {
      return <ToolsDirectoryView />;
    }

    if (cleanPath === '/free-ai-tools') {
      return <FreeAIToolsView />;
    }

    if (cleanPath === '/ai-tools-for-business') {
      return <AIToolsForBusinessView />;
    }

    if (cleanPath === '/ai-tools-for-students') {
      return <AIToolsForStudentsView />;
    }

    if (cleanPath === '/ai-image-generators') {
      return <AIImageGeneratorsView />;
    }

    if (cleanPath === '/chatgpt-alternatives') {
      return <ChatGPTAlternativesView />;
    }

    if (cleanPath === '/ai-prompts') {
      return <AIPromptsView />;
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

    if (cleanPath === '/ai-gadgets' || cleanPath === '/gadgets') {
      return <GadgetsView />;
    }

    if (cleanPath.startsWith('/ai-gadgets/')) {
      const slug = cleanPath.replace('/ai-gadgets/', '');
      return <GadgetDetailView slug={slug} />;
    }

    if (cleanPath.startsWith('/gadget/')) {
      const slug = cleanPath.replace('/gadget/', '');
      return <GadgetDetailView slug={slug} />;
    }

    if (cleanPath.startsWith('/gadgets/')) {
      const slug = cleanPath.replace('/gadgets/', '');
      return <GadgetDetailView slug={slug} />;
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

    // Essential Pages
    if (cleanPath === '/about' || cleanPath === '/about-us') {
      return <AboutView />;
    }

    if (cleanPath === '/contact' || cleanPath === '/contact-us' || cleanPath === '/support') {
      return <ContactView />;
    }

    if (cleanPath === '/privacy' || cleanPath === '/privacy-policy') {
      return <PrivacyPolicyView />;
    }

    if (cleanPath === '/terms' || cleanPath === '/terms-and-conditions' || cleanPath === '/terms-of-service') {
      return <TermsView />;
    }

    if (cleanPath === '/disclaimer') {
      return <DisclaimerView />;
    }

    if (cleanPath === '/cookie-policy' || cleanPath === '/cookies') {
      return <CookiePolicyView />;
    }

    if (cleanPath === '/editorial-policy' || cleanPath === '/editorial') {
      return <EditorialPolicyView />;
    }

    if (cleanPath === '/dmca-policy' || cleanPath === '/dmca') {
      return <DMCAPolicyView />;
    }

    if (cleanPath === '/write-for-us' || cleanPath === '/contribute') {
      return <WriteForUsView />;
    }

    if (cleanPath === '/advertise' || cleanPath === '/advertise-with-us') {
      return <AdvertiseView />;
    }

    if (cleanPath === '/affiliate-disclosure') {
      return <AffiliateDisclosureView />;
    }

    if (cleanPath === '/ai-ethics' || cleanPath === '/ethics') {
      return <AIEthicsView />;
    }

    if (cleanPath === '/sitemap' || cleanPath === '/sitemap.xml') {
      return <SitemapView />;
    }

    if (cleanPath === '/admin') {
      return <AdminView />;
    }

    // 404 fallback
    return <NotFoundView />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
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
      <SubmitToolModal />

      {/* Floating Scroll to Top */}
      <ScrollToTop />

      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-slate-700 dark:border-slate-200 text-xs sm:text-sm font-medium animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-600" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
