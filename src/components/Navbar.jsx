import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, pakistaniCities } from '../data/menuData';

export default function Navbar({ onScrollToTracker }) {
  const { 
    totalItemsCount, 
    grandTotal, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    activeOrder
  } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-11 h-11 bg-brand-gold rounded-2xl flex items-center justify-center font-heading font-black text-2xl text-black shadow-lg shadow-brand-gold/25 transform group-hover:rotate-6 transition-all duration-300">
                C
              </div>
              <div>
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-white block leading-none">
                  THE CRISPY <span className="text-brand-gold">CORNER</span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 tracking-wider uppercase font-medium">
                  Crunch in Every Bite 🇵🇰
                </span>
              </div>
            </div>

            {/* City selector badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-brand-surface/80 border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300">
              <i className="fa-solid fa-location-dot text-brand-gold text-[11px]"></i>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Select delivery city"
                className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer pr-1"
              >
                {pakistaniCities.map(city => (
                  <option key={city} value={city} className="bg-brand-card text-white">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burgers, broast, loaded fries, dips..." 
              className="w-full bg-brand-surface text-sm text-white pl-10 pr-9 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-brand-gold transition-colors placeholder:text-gray-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-gray-400 text-sm"></i>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-gray-400 hover:text-white p-1"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Order Tracker Button (if active order exists) */}
            {activeOrder && (
              <button 
                onClick={onScrollToTracker}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold hover:bg-brand-gold/25 transition-all animate-pulse"
                title="View ongoing order progress"
              >
                <i className="fa-solid fa-clock-rotate-left"></i>
                <span>Track Order</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            )}

            {/* WhatsApp Contact */}
            <a 
              href="https://wa.me/923001234567?text=Hi%20The%20Crispy%20Corner!%20I%20have%20an%20inquiry%20about%20the%20menu" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              <i className="fa-brands fa-whatsapp text-base"></i>
              <span>WhatsApp</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 bg-brand-surface rounded-full border border-white/10 hover:border-brand-gold text-white transition-all flex items-center gap-2.5 group"
            >
              <div className="relative">
                <i className="fa-solid fa-cart-shopping text-base group-hover:text-brand-gold transition-colors"></i>
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-brand-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Cart</span>
                <span className="font-extrabold text-brand-gold">{CURRENCY} {grandTotal.toLocaleString()}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & City Selector */}
        <div className="pb-3 pt-1 md:hidden space-y-2">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crispy burgers, wings, loaded fries..." 
              className="w-full bg-brand-surface text-sm text-white pl-10 pr-9 py-2.5 rounded-full border border-white/10 focus:outline-none focus:border-brand-gold placeholder:text-gray-500"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-gray-400 text-sm"></i>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-gray-400 hover:text-white p-1"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-location-dot text-brand-gold"></i>
              <span>Delivering in:</span>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Select mobile delivery city"
                className="bg-brand-surface text-white rounded px-2 py-0.5 border border-white/10 text-xs font-semibold focus:outline-none"
              >
                {pakistaniCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            {activeOrder && (
              <button 
                onClick={onScrollToTracker} 
                className="text-brand-gold font-bold flex items-center gap-1 underline"
              >
                <i className="fa-solid fa-clock-rotate-left text-[11px]"></i> Track Order
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

