import React from 'react';
import { Info, X, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AffiliateDisclosureBanner: React.FC = () => {
  const { setAffiliateModalOpen } = useApp();

  return (
    <aside aria-label="Affiliate disclosure" className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 truncate">
          <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="truncate">
            <strong>Transparency First:</strong> When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.
          </span>
        </div>
        <button
          onClick={() => setAffiliateModalOpen(true)}
          className="text-indigo-600 hover:text-indigo-800 font-medium underline underline-offset-2 shrink-0 cursor-pointer"
        >
          Learn How We Review Tools
        </button>
      </div>
    </aside>
  );
};

export const AffiliateDisclosureModal: React.FC = () => {
  const { affiliateModalOpen, setAffiliateModalOpen, navigate } = useApp();

  if (!affiliateModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setAffiliateModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Affiliate & Editorial Disclosure</h3>
            <p className="text-xs text-slate-500">FTC & Consumer Protection Compliance</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            At <strong>AIToolNest</strong>, we believe in radical transparency. Our primary mission is to help creators, solopreneurs, and business owners discover genuinely useful AI tools, business models, and digital templates.
          </p>

          <h4 className="font-semibold text-slate-800 text-base pt-1">How We Fund Our Research</h4>
          <p>
            Some of the links on our website are affiliate links. This means that if you click through and purchase a paid subscription or license, we may receive a referral commission directly from the software provider. This comes at <strong>zero additional cost to you</strong>—in fact, we frequently negotiate exclusive discount codes or extended trial periods for our readers.
          </p>

          <h4 className="font-semibold text-slate-800 text-base pt-1">Our Strict Editorial Independence</h4>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>We test free and paid tools rigorously before recommending them.</li>
            <li>No software company can pay to receive a positive editorial review or artificially inflated rating.</li>
            <li>We highlight cons, drawbacks, and limitations transparently alongside pros.</li>
            <li>Sponsored listings are always explicitly labeled with a "Sponsored" or "Featured" badge.</li>
          </ul>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setAffiliateModalOpen(false);
                navigate('/disclaimer');
              }}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              Read Full Earnings Disclaimer
            </button>
            <button
              onClick={() => setAffiliateModalOpen(false)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Got it, thank you
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
