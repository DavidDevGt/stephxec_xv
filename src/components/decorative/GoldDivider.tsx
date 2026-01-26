import React from 'react';
import { Star } from 'lucide-react';

/**
 * Gold divider component with centered star
 * Memoized to prevent unnecessary re-renders
 */
const GoldDivider: React.FC = () => (
  <div className="flex justify-center items-center py-16 opacity-100 relative">
    <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent w-full max-w-xs"></div>
    <div className="mx-4 text-gold transform rotate-45">
      <Star size={16} fill="currentColor" aria-hidden="true" />
    </div>
    <div className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent w-full max-w-xs"></div>
  </div>
);

export default React.memo(GoldDivider);
