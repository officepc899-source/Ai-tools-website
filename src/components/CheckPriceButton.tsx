import React from 'react';
import { ExternalLink, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CheckPriceButtonProps {
  affiliateLink: string;
  productName?: string;
  price?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  showMerchantBadge?: boolean;
}

export const CheckPriceButton: React.FC<CheckPriceButtonProps> = ({
  affiliateLink,
  productName = 'Product',
  price,
  label = 'Check Price',
  size = 'md',
  fullWidth = false,
  className = '',
  showMerchantBadge = false,
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-bold',
  };

  return (
    <div className={`inline-flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      <a
        href={affiliateLink}
        target="_blank"
        rel="nofollow sponsored noopener"
        aria-label={`Check price for ${productName} on AliExpress`}
        className={`inline-flex items-center justify-center font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 active:scale-[0.98] shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer select-none ${
          sizeClasses[size]
        } ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        <ShoppingBag className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
        <span>{label}</span>
        {price && (
          <span className="ml-1 px-1.5 py-0.5 rounded-md bg-white/20 text-xs font-bold font-mono">
            {price}
          </span>
        )}
        <ExternalLink className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} opacity-80`} />
      </a>

      {showMerchantBadge && (
        <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>AliExpress Buyer Protection Verified</span>
        </div>
      )}
    </div>
  );
};
