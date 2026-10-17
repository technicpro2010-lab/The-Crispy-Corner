import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, boxBuilderData } from '../data/menuData';

export default function BoxPromoSection() {
  const { setIsBoxBuilderOpen } = useCart();

  return (
    <section className="rounded-3xl bg-gradient-to-br from-brand-card via-neutral-900 to-black p-6 sm:p-10 border border-brand-gold/30 shadow-xl relative overflow-hidden">
      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Text content */}
        <div className="space-y-4 text-center lg:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold text-xs font-black px-3.5 py-1.5 rounded-full border border-brand-gold/30 uppercase tracking-wider">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Custom Combo Builder
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading leading-tight">
            Build Your Own <span className="text-brand-gold">Crispy Box</span>
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Pick your favorite burger, crunchy side, signature dipping sauce, and ice-cold beverage. Bundled together with an exclusive <strong className="text-brand-gold">15% discount</strong> starting from only <strong className="text-white">{CURRENCY} {boxBuilderData.baseBundlePrice.toLocaleString()}</strong>!
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => setIsBoxBuilderOpen(true)}
              className="px-7 py-3.5 rounded-2xl bg-brand-gold text-black font-extrabold hover:bg-yellow-400 active:scale-95 transition-all shadow-lg shadow-brand-gold/30 flex items-center gap-2.5 cursor-pointer text-sm sm:text-base"
            >
              <i className="fa-solid fa-sliders text-base"></i> Open Box Customizer
            </button>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
              <i className="fa-solid fa-check text-emerald-400"></i> Saves up to {CURRENCY} 350
            </span>
          </div>
        </div>

        {/* Visual combo trio */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto max-w-full pb-2">
          <div className="relative group text-center">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=350&q=80" 
              alt="Crispy Burger" 
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-brand-gold/40 shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="block text-[11px] font-bold text-gray-300 mt-1.5">1. Main Burger</span>
          </div>
          <span className="text-brand-gold text-lg font-bold">+</span>
          <div className="relative group text-center">
            <img 
              src="https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=350&q=80" 
              alt="Fries Side" 
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="block text-[11px] font-bold text-gray-300 mt-1.5">2. Crispy Side</span>
          </div>
          <span className="text-brand-gold text-lg font-bold">+</span>
          <div className="relative group text-center">
            <img 
              src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=350&q=80" 
              alt="Chilled Drink" 
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-white/20 shadow-lg group-hover:scale-105 transition-transform"
            />
            <span className="block text-[11px] font-bold text-gray-300 mt-1.5">3. Chilled Drink</span>
          </div>
        </div>

      </div>
    </section>
  );
}

