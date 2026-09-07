import React, { useState } from 'react';
import { X, Check, ShieldCheck, Download, Lock, Sparkles, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const { checkoutModal, closeCheckout, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!checkoutModal.isOpen || !checkoutModal.product) return null;

  const product = checkoutModal.product;
  const finalPrice = Math.max(0, product.price - appliedDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'PIN10' || discountCode.trim().toUpperCase() === 'AIHUB') {
      setAppliedDiscount(5);
      showToast('Coupon code applied! $5 discount granted.');
    } else {
      showToast('Invalid promo code. Try "AIHUB" for $5 off!');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      showToast('Payment confirmed! Download link generated.');
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail('');
    setDiscountCode('');
    setAppliedDiscount(0);
    closeCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Instant Digital Delivery</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">Instant Checkout</h3>
            <p className="text-xs text-slate-500 mb-4">
              Get immediate access to files, templates, and lifetime updates.
            </p>

            {/* Product Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 font-mono">
                  {product.categoryLabel}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5">{product.title}</h4>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Format: {product.format}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-slate-900">${finalPrice}</span>
                {appliedDiscount > 0 && (
                  <div className="text-[10px] text-emerald-600 font-semibold line-through">
                    ${product.price}
                  </div>
                )}
              </div>
            </div>

            {/* Included highlights */}
            <div className="space-y-1.5 mb-5 text-xs text-slate-600">
              <div className="font-semibold text-slate-700 mb-1">Package Includes:</div>
              {product.downloadIncludes.slice(0, 3).map((inc, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
            </div>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Promo code (Try: AIHUB)"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 uppercase font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Customer Email Form */}
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Your instant download link and license key will be delivered here.
                </p>
              </div>

              {/* Payment simulation button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-75 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>Generating Secure Link...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Complete Order • ${finalPrice}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>30-Day Guarantee</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Order Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-1">
                Receipt and download credentials have been sent to <strong>{email}</strong>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2">
              <div className="text-xs font-semibold text-slate-700">Immediate Access Link:</div>
              <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-indigo-600 truncate">
                  https://download.aitoolnest.com/vault/{product.slug}?token=lic_8824f
                </span>
                <button
                  onClick={() => showToast('Download started in background!')}
                  className="px-2.5 py-1 bg-indigo-600 text-white rounded text-xs font-semibold hover:bg-indigo-700 shrink-0"
                >
                  Download
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                You can also access your Notion template or Canva link directly from the confirmation email.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close & Return to Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
