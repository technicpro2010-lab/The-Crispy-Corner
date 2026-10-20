import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { sauceOptions, spiceLevels, CURRENCY } from '../data/menuData';

export default function CustomizeModal() {
  const { customizeItem, setCustomizeItem, addToCart, setIsCartOpen } = useCart();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSpice, setSelectedSpice] = useState('Crispy Spicy');
  const [selectedSauce, setSelectedSauce] = useState(sauceOptions[0].name);
  const [addExtraCheese, setAddExtraCheese] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (customizeItem) {
      setSelectedSize(customizeItem.sizes && customizeItem.sizes.length > 0 ? customizeItem.sizes[0] : null);
      setSelectedSpice(customizeItem.spicy ? 'Crispy Spicy' : 'Mild Cheesy');
      setSelectedSauce(sauceOptions[0].name);
      setAddExtraCheese(false);
      setSpecialNote('');
      setQuantity(1);
    }
  }, [customizeItem]);

  if (!customizeItem) return null;

  const extraCheesePrice = addExtraCheese ? 100 : 0;
  const sauceExtraPrice = 80; // Included dipping sauce addon
  const basePrice = selectedSize ? selectedSize.price : customizeItem.price;
  const unitPrice = basePrice + extraCheesePrice + (selectedSauce ? sauceExtraPrice : 0);
  const totalPrice = unitPrice * quantity;

  const handleConfirmAdd = () => {
    addToCart({
      id: customizeItem.id,
      name: customizeItem.name,
      size: selectedSize ? selectedSize.name : null,
      sizeLabel: selectedSize ? selectedSize.label : null,
      price: unitPrice,
      image: customizeItem.image,
      spice: selectedSpice,
      sauce: selectedSauce,
      extraCheese: addExtraCheese,
      specialNote: specialNote.trim(),
      quantity: quantity
    });

    setCustomizeItem(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-brand-card border border-white/10 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl space-y-4 p-6 sm:p-7 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/10 pb-3">
          <div className="pr-4">
            <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
              {customizeItem.name}
            </h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {customizeItem.desc}
            </p>
          </div>
          <button 
            onClick={() => setCustomizeItem(null)}
            className="text-gray-400 hover:text-white p-1 rounded-lg bg-brand-surface"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Form */}
        <div className="space-y-4 text-xs">
          
          {/* Size Selection (for Pizza & Kabuli Burger items with sizes) */}
          {customizeItem.sizes && customizeItem.sizes.length > 0 && (
            <div className="bg-brand-surface/70 p-3.5 rounded-2xl border border-brand-gold/30 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-extrabold text-brand-gold uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-arrows-up-down-left-right text-xs"></i>
                  <span>Select Size & Portion</span>
                </label>
                <span className="text-[10px] text-gray-400 font-medium">
                  {selectedSize ? selectedSize.name : 'Select'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {customizeItem.sizes.map((s) => {
                  const isSelected = selectedSize?.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-brand-gold/20 border-brand-gold text-white ring-2 ring-brand-gold/40 shadow-lg'
                          : 'bg-brand-dark/80 border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                          {s.name}
                        </span>
                        <span className="text-xs font-black text-brand-gold font-heading">
                          {CURRENCY} {s.price.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 line-clamp-1">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level */}
          <div>
            <label className="block font-bold text-gray-300 mb-2 uppercase text-[11px] tracking-wider">
              Choose Spice Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {spiceLevels.map((lvl) => {
                const isSelected = selectedSpice === lvl.label;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSelectedSpice(lvl.label)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-surface border-brand-gold text-brand-gold font-bold shadow-md shadow-brand-gold/15'
                        : 'bg-brand-surface/60 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="text-base mb-1">{lvl.icon}</div>
                    <div className="text-[11px] font-semibold">{lvl.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dipping Sauce Addon */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block font-bold text-gray-300 uppercase text-[11px] tracking-wider">
                Signature Dipping Sauce
              </label>
              <span className="text-[11px] text-brand-gold font-bold">+{CURRENCY} 80</span>
            </div>
            <select
              value={selectedSauce}
              onChange={(e) => setSelectedSauce(e.target.value)}
              className="w-full bg-brand-surface text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold cursor-pointer"
            >
              {sauceOptions.map(sauce => (
                <option key={sauce.id} value={sauce.name} className="bg-brand-card">
                  {sauce.name} (+{CURRENCY} {sauce.price})
                </option>
              ))}
            </select>
          </div>

          {/* Extra Cheese Slice */}
          <div className="p-3 rounded-2xl bg-brand-surface border border-white/10 flex items-center justify-between cursor-pointer"
               onClick={() => setAddExtraCheese(!addExtraCheese)}>
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🧀</span>
              <div>
                <div className="font-bold text-white text-xs">Extra Melted Cheese Slice</div>
                <div className="text-[10px] text-gray-400">Warm American cheddar slice</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-gold">+{CURRENCY} 100</span>
              <input 
                type="checkbox" 
                checked={addExtraCheese}
                onChange={() => {}}
                className="w-4 h-4 rounded text-brand-gold focus:ring-0 cursor-pointer accent-brand-gold"
              />
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block font-bold text-gray-300 mb-1.5 uppercase text-[11px] tracking-wider">
              Special Instructions (Optional)
            </label>
            <input 
              type="text" 
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Extra crispy, less mayo, extra napkins"
              className="w-full bg-brand-surface text-white p-2.5 rounded-xl border border-white/10 text-xs focus:outline-none focus:border-brand-gold"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-gray-300 text-xs">Quantity</span>
            <div className="flex items-center gap-3 bg-brand-surface px-3 py-1.5 rounded-xl border border-white/10">
              <button 
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-400 hover:text-white px-2 text-sm font-bold cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-black text-white w-4 text-center">{quantity}</span>
              <button 
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="text-gray-400 hover:text-white px-2 text-sm font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Price</span>
            <span className="text-xl font-black text-brand-gold font-heading">
              {CURRENCY} {totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setCustomizeItem(null)}
              className="px-4 py-2.5 rounded-xl bg-brand-surface text-gray-300 text-xs hover:text-white"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleConfirmAdd}
              className="px-6 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold text-xs hover:bg-yellow-400 transition-all shadow-md shadow-brand-gold/20 cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

