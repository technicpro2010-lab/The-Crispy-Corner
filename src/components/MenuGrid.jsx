import React from 'react';
import { useCart } from '../context/CartContext';
import { menuItems, CURRENCY, getItemSizes } from '../data/menuData';

export default function MenuGrid() {
  const { 
    activeCategory, 
    searchQuery, 
    setSearchQuery, 
    setActiveCategory, 
    setCustomizeItem
  } = useCart();

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    setCustomizeItem(item);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-20 px-4 bg-brand-card/50 rounded-3xl border border-white/5 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-brand-surface flex items-center justify-center text-brand-gold text-2xl">
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <h3 className="text-xl font-bold text-white">No Crispy Items Found</h3>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          We couldn't find anything matching "{searchQuery}". Try searching for burgers, broast, or loaded fries.
        </p>
        <button
          onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
          className="px-5 py-2.5 rounded-full bg-brand-gold text-black font-bold text-xs hover:bg-yellow-400 transition-all cursor-pointer"
        >
          View Full Menu
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredItems.map(item => (
        <div 
          key={item.id}
          className="bg-brand-card border border-white/10 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-black/60"
        >
          {/* Card Image & Badges */}
          <div className="relative overflow-hidden cursor-pointer" onClick={() => setCustomizeItem(item)}>
            <img 
              src={item.image} 
              alt={item.name} 
              loading="lazy"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 via-transparent to-transparent opacity-60"></div>
            
            {/* Top Left Status Badge */}
            {item.badge && (
              <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-black tracking-wider px-2.5 py-1 rounded-full uppercase shadow-md border border-white/10">
                {item.badge}
              </span>
            )}

            {/* Top Right Pepper / Hot Indicator */}
            {item.spicy && (
              <span 
                title="Spicy Recipe"
                className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-brand-gold text-xs p-2 rounded-full border border-brand-gold/30 flex items-center justify-center shadow-lg"
              >
                <i className="fa-solid fa-pepper-hot text-xs"></i>
              </span>
            )}

            {/* Rating pill bottom-left of image */}
            <div className="absolute bottom-2 left-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-gray-200 flex items-center gap-1.5">
              <i className="fa-solid fa-star text-brand-gold text-[10px]"></i>
              <span className="font-bold text-white">{item.rating}</span>
              <span className="text-gray-400 text-[10px]">({item.reviewsCount})</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 
                onClick={() => setCustomizeItem(item)}
                className="font-bold text-white text-base group-hover:text-brand-gold transition-colors cursor-pointer line-clamp-1"
                title={item.name}
              >
                {item.name}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                {item.desc}
              </p>

              {/* Size options preview tags */}
              <div className="flex flex-wrap gap-1 pt-2">
                {getItemSizes(item).map(s => (
                  <span
                    key={s.id}
                    onClick={() => setCustomizeItem(item)}
                    className="text-[9px] bg-brand-surface/90 text-gray-300 hover:text-brand-gold border border-white/10 hover:border-brand-gold/40 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                    title={s.label}
                  >
                    {s.name}: <strong className="text-brand-gold">{CURRENCY}{s.price}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">
                  Starts From
                </span>
                <span className="text-lg font-black text-brand-gold font-heading">
                  {CURRENCY} {item.price.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCustomizeItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-brand-surface border border-white/10 text-xs font-semibold text-gray-200 hover:text-white hover:border-brand-gold hover:bg-brand-surface/80 transition-all cursor-pointer"
                  title="Select size and preferences"
                >
                  Select Size
                </button>
                <button 
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="w-8 h-8 rounded-xl bg-brand-gold text-black hover:bg-yellow-400 font-extrabold flex items-center justify-center transition-all shadow-md shadow-brand-gold/20 active:scale-90 cursor-pointer"
                  title="Select Size"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
