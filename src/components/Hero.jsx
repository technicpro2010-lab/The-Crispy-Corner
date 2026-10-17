import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/menuData';

export default function Hero({ onScrollToMenu }) {
  const { setIsBoxBuilderOpen, setCustomizeItem } = useCart();

  const handleOrderHeroItem = () => {
    // Open customize modal for the Monster Crispy Crunch Burger directly or scroll to menu
    onScrollToMenu();
  };

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-neutral-950 via-stone-900 to-brand-card border border-white/10 shadow-2xl">
      {/* Radial Gold Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold/25 via-brand-red/10 to-transparent pointer-events-none blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-red/15 via-transparent to-transparent pointer-events-none blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-8">
        
        {/* Left Column Text & CTAs */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-red text-xs font-bold tracking-wide uppercase shadow-sm">
            <i className="fa-solid fa-fire text-brand-red animate-bounce"></i> #1 Most Popular Crispy Order in Pakistan
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight font-heading">
            Monster Crispy <br className="hidden sm:inline" />
            <span className="text-brand-gold drop-shadow-[0_2px_15px_rgba(255,184,0,0.3)]">Crunch Burger</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Double crispy zesty chicken patty, melt-in-your-mouth cheddar cheese, signature dynamite sauce, and freshly shredded iceberg lettuce on a golden buttered brioche bun.
          </p>

          {/* Pricing Highlight */}
          <div className="flex items-baseline justify-center lg:justify-start gap-3">
            <span className="text-3xl sm:text-4xl font-black text-brand-gold font-heading">
              {CURRENCY} 890
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              {CURRENCY} 1,050
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              Save 15%
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button 
              onClick={handleOrderHeroItem}
              className="px-7 py-3.5 rounded-full bg-brand-gold text-black font-extrabold hover:bg-yellow-400 active:scale-95 transition-all shadow-lg shadow-brand-gold/30 flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
            >
              <i className="fa-solid fa-utensils"></i> Order Now
            </button>
            
            <button 
              onClick={() => setIsBoxBuilderOpen(true)}
              className="px-6 py-3.5 rounded-full bg-brand-surface text-white font-semibold border border-white/20 hover:border-brand-gold hover:text-brand-gold active:scale-95 transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
            >
              <i className="fa-solid fa-box-open text-brand-gold"></i> Build Your Box
            </button>
          </div>

          {/* Micro Features Bar */}
          <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-brand-gold text-sm"></i> 
              <span className="font-medium text-gray-300">30 Min Hot Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-emerald-400 text-sm"></i> 
              <span className="font-medium text-gray-300">100% Halal Crispy Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-motorcycle text-brand-red text-sm"></i> 
              <span className="font-medium text-gray-300">Free Delivery &gt; {CURRENCY} 2,000</span>
            </div>
          </div>
        </div>

        {/* Right Column Burger Showcase */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-brand-gold/15 absolute animate-glow blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 group">
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" 
              alt="Monster Crispy Crunch Burger" 
              className="w-full max-w-xs sm:max-w-sm rounded-3xl object-cover shadow-2xl border-2 border-brand-gold/40 group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
            />
            
            {/* Floating Floating Rating Badge */}
            <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-brand-dark/90 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                <i className="fa-solid fa-star text-sm"></i>
              </div>
              <div className="text-left leading-tight">
                <div className="text-white text-xs font-bold">4.9 / 5.0 Rating</div>
                <div className="text-gray-400 text-[10px]">Over 1,200+ Reviews</div>
              </div>
            </div>

            {/* Floating Crispy Spicy Badge */}
            <div className="absolute -top-3 -right-3 bg-brand-red text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 uppercase">
              <i className="fa-solid fa-pepper-hot"></i> Extra Crunchy
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

