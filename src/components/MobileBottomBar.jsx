import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/menuData';

export default function MobileBottomBar() {
  const { totalItemsCount, grandTotal, setIsCartOpen } = useCart();

  if (totalItemsCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-card/95 backdrop-blur-md border-t border-white/10 p-3 sm:hidden z-30 flex items-center justify-between shadow-2xl animate-fadeIn">
      <div>
        <div className="text-[10px] text-gray-400 uppercase font-semibold">Total Payable</div>
        <div className="text-lg font-black text-brand-gold font-heading leading-tight">
          {CURRENCY} {grandTotal.toLocaleString()}
        </div>
      </div>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="px-6 py-2.5 rounded-full bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-brand-gold/30 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
      >
        <i className="fa-solid fa-bag-shopping"></i>
        <span>View Cart ({totalItemsCount})</span>
      </button>
    </div>
  );
}

