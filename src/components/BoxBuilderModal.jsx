import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { boxBuilderData, CURRENCY } from '../data/menuData';

export default function BoxBuilderModal() {
  const { isBoxBuilderOpen, setIsBoxBuilderOpen, addToCart, setIsCartOpen } = useCart();

  const [selectedMainId, setSelectedMainId] = useState(boxBuilderData.mains[0].id);
  const [selectedSideId, setSelectedSideId] = useState(boxBuilderData.sides[0].id);
  const [selectedDrinkId, setSelectedDrinkId] = useState(boxBuilderData.drinks[0].id);
  const [selectedDipId, setSelectedDipId] = useState(boxBuilderData.dips[0].id);
  const [boxSpice, setBoxSpice] = useState('Crispy Spicy');

  if (!isBoxBuilderOpen) return null;

  const currentMain = boxBuilderData.mains.find(m => m.id === selectedMainId);
  const currentSide = boxBuilderData.sides.find(s => s.id === selectedSideId);
  const currentDrink = boxBuilderData.drinks.find(d => d.id === selectedDrinkId);
  const currentDip = boxBuilderData.dips.find(d => d.id === selectedDipId);

  const calculatedPrice = boxBuilderData.baseBundlePrice +
    (currentMain?.extraPrice || 0) +
    (currentSide?.extraPrice || 0) +
    (currentDrink?.extraPrice || 0) +
    (currentDip?.extraPrice || 0);

  const handleAddBox = () => {
    addToCart({
      id: 'custom-crispy-box',
      name: `Crispy Box (${currentMain.name})`,
      price: calculatedPrice,
      image: 'https://images.unsplash.com/photo-1610440042657-612c34d95e9f?auto=format&fit=crop&w=600&q=80',
      spice: boxSpice,
      sauce: `${currentSide.name} + ${currentDip.name} + ${currentDrink.name}`,
      boxDetails: {
        main: currentMain.name,
        side: currentSide.name,
        drink: currentDrink.name,
        dip: currentDip.name
      },
      quantity: 1
    });

    setIsBoxBuilderOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-brand-card border border-brand-gold/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-box-open text-brand-gold text-xl"></i>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
                Build Your Crispy Box
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Bundle your favorite burger, side, dip & drink — save 15%!
            </p>
          </div>
          <button 
            onClick={() => setIsBoxBuilderOpen(false)}
            className="text-gray-400 hover:text-white p-2 rounded-xl bg-brand-surface hover:bg-neutral-800 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Options Selection */}
        <div className="space-y-5 text-xs">
          
          {/* 1. Main Burger */}
          <div>
            <label className="block font-bold text-brand-gold text-xs uppercase tracking-wider mb-2">
              1. Choose Main Burger
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {boxBuilderData.mains.map(main => (
                <button
                  key={main.id}
                  type="button"
                  onClick={() => setSelectedMainId(main.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedMainId === main.id 
                      ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                      : 'bg-brand-surface border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{main.name}</span>
                    {main.extraPrice > 0 && (
                      <span className="text-[10px] text-brand-gold font-bold">+{CURRENCY} {main.extraPrice}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Spice Preference */}
          <div>
            <label className="block font-bold text-gray-300 text-xs mb-2">
              Burger Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild Cheesy 🧀', 'Crispy Spicy 🌶️', 'Extra Fire 🔥'].map((spice) => (
                <button
                  key={spice}
                  type="button"
                  onClick={() => setBoxSpice(spice)}
                  className={`py-2 px-1 text-center rounded-xl border text-[11px] font-semibold transition-all ${
                    boxSpice === spice 
                      ? 'bg-brand-surface border-brand-gold text-brand-gold' 
                      : 'bg-brand-surface/60 border-white/10 text-gray-400'
                  }`}
                >
                  {spice}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Crunchy Side */}
          <div>
            <label className="block font-bold text-brand-gold text-xs uppercase tracking-wider mb-2">
              2. Choose Crunchy Side
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {boxBuilderData.sides.map(side => (
                <button
                  key={side.id}
                  type="button"
                  onClick={() => setSelectedSideId(side.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedSideId === side.id 
                      ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                      : 'bg-brand-surface border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{side.name}</span>
                    {side.extraPrice > 0 && (
                      <span className="text-[10px] text-brand-gold font-bold">+{CURRENCY} {side.extraPrice}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Dipping Sauce */}
          <div>
            <label className="block font-bold text-brand-gold text-xs uppercase tracking-wider mb-2">
              3. Choose Signature Dip
            </label>
            <div className="grid grid-cols-3 gap-2">
              {boxBuilderData.dips.map(dip => (
                <button
                  key={dip.id}
                  type="button"
                  onClick={() => setSelectedDipId(dip.id)}
                  className={`p-2.5 rounded-xl text-center border text-[11px] transition-all ${
                    selectedDipId === dip.id 
                      ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                      : 'bg-brand-surface border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {dip.name}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Drink */}
          <div>
            <label className="block font-bold text-brand-gold text-xs uppercase tracking-wider mb-2">
              4. Choose Chilled Beverage
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {boxBuilderData.drinks.map(drink => (
                <button
                  key={drink.id}
                  type="button"
                  onClick={() => setSelectedDrinkId(drink.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedDrinkId === drink.id 
                      ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                      : 'bg-brand-surface border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs">{drink.name}</span>
                    {drink.extraPrice > 0 && (
                      <span className="text-[10px] text-brand-gold font-bold">+{CURRENCY} {drink.extraPrice}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer & Add to Order */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Bundle Price (PKR)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-brand-gold font-heading">
                {CURRENCY} {calculatedPrice.toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {CURRENCY} {(calculatedPrice + 250).toLocaleString()}
              </span>
            </div>
          </div>

          <button 
            onClick={handleAddBox}
            className="px-7 py-3.5 bg-brand-gold text-black font-extrabold rounded-2xl hover:bg-yellow-400 transition-all shadow-lg shadow-brand-gold/30 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <i className="fa-solid fa-cart-plus"></i> Add Crispy Box to Order
          </button>
        </div>

      </div>
    </div>
  );
}

