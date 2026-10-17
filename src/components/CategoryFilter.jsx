import React from 'react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/menuData';

export default function CategoryFilter() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useCart();

  return (
    <div className="space-y-4 border-b border-white/10 pb-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Explore Our Crispy Menu
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Handcrafted with 100% fresh chicken, secret batter spices & melted cheese.
          </p>
        </div>

        {searchQuery && (
          <div className="flex items-center gap-2 bg-brand-surface border border-brand-gold/30 rounded-full px-3 py-1 text-xs text-brand-gold self-start md:self-auto">
            <span>Filtering by: <strong className="text-white">"{searchQuery}"</strong></span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-white ml-1 font-bold"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar pb-1 pt-1">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-brand-gold text-black shadow-lg shadow-brand-gold/25 font-bold scale-105'
                  : 'bg-brand-surface text-gray-300 hover:bg-neutral-800 hover:text-white border border-white/5'
              }`}
            >
              <i className={`fa-solid ${cat.icon} text-xs`}></i>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

