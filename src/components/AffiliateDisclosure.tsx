import React from 'react';
import { Info, X, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AffiliateDisclosureBanner: React.FC = () => {
  const { setAffiliateModalOpen } = useApp();

  return (
    <aside aria-label="Affiliate disclosure" className="bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs py-1.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <Info className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="truncate">
            <strong className="text-slate-900 dark:text-white">Affiliate Transparency:</strong> When you purchase through links on our site (including AliExpress &amp; software partners), we may earn a commission at no extra cost to you.
          </span>
        </div>
        <button
          onClick={() => setAffiliateModalOpen(true)}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline underline-offset-2 shrink-0 cursor-pointer"
        >
          Disclosure Details
        </button>
      </div>
    </aside>
  );
};

export const AffiliateBadge: React.FC<{ merchant?: string; className?: string }> = ({
  merchant = 'AliExpress',
  className = ''
}) => {
  const { setAffiliateModalOpen } = useApp();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setAffiliateModalOpen(true);
      }}
      title="FTC Disclosure: We may earn a commission from purchases made through this link"
      className={`inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors cursor-pointer ${className}`}
    >
      <Info className="w-2.5 h-2.5" />
      <span>{merchant} Affiliate • Commission Eligible</span>
    </button>
  );
};

export const AffiliateDisclosureModal: React.FC = () => {
  const { affiliateModalOpen, setAffiliateModalOpen, navigate } = useApp();

  if (!affiliateModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setAffiliateModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Space_Grotesk']">
              Affiliate &amp; Commercial Disclosure
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              FTC (16 CFR § 255.5) &amp; Consumer Protection Compliance
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            At <strong className="text-slate-900 dark:text-white">AIToolNest</strong>, we operate with full financial transparency. Our goal is to connect entrepreneurs, creators, and engineers with high-utility AI tools and hardware.
          </p>

          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base pt-1">
            AliExpress &amp; Software Partner Affiliation
          </h4>
          <p>
            AIToolNest participates in the <strong>AliExpress Portals Affiliate Program</strong> and various software affiliate networks. When you click on product links (e.g. &ldquo;Check Price on AliExpress&rdquo; or &ldquo;Claim Deal&rdquo;) and complete a qualifying purchase, we may receive a small referral commission at <strong className="text-slate-900 dark:text-white">zero extra cost to you</strong>.
          </p>

          <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base pt-1">
            Our Strict Editorial Integrity
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
            <li>We curate and test products based on merit, buyer protection, and specifications.</li>
            <li>No manufacturer or seller can pay to alter our pros, cons, or editorial verdicts.</li>
            <li>We actively outline limitations and trade-offs alongside strengths for every product.</li>
            <li>Sponsored ad banners are always explicitly marked with &ldquo;Sponsored&rdquo; or &ldquo;Advertisement&rdquo;.</li>
          </ul>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setAffiliateModalOpen(false);
                navigate('/disclaimer');
              }}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Read Full Earnings Disclaimer
            </button>
            <button
              onClick={() => setAffiliateModalOpen(false)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
