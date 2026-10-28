import React from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, STORE_CONTACT } from '../data/menuData';

export default function CartDrawer({ onOpenCheckout }) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    grandTotal, 
    amountNeededForFreeDelivery,
    FREE_DELIVERY_THRESHOLD
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = `🍗 *NEW ORDER - THE CRISPY CORNER*\n`;
    message += `💳 *Payment:* Cash on Delivery (COD)\n`;
    message += `──────────────────\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* x ${item.quantity}\n`;
      if (item.size) message += `   📏 Size: ${item.sizeLabel || item.size}\n`;
      if (item.spice) message += `   🌶️ Spice: ${item.spice}\n`;
      if (item.sauce) message += `   🥣 Dip/Side: ${item.sauce}\n`;
      if (item.extraCheese) message += `   🧀 Extra Cheese: Yes\n`;
      if (item.specialNote) message += `   📝 Note: ${item.specialNote}\n`;
      message += `   💰 Price: ${CURRENCY} ${(item.price * item.quantity).toLocaleString()}\n\n`;
    });

    message += `──────────────────\n`;
    message += `*Subtotal:* ${CURRENCY} ${subtotal.toLocaleString()}\n`;
    message += `*Delivery Fee:* ${deliveryFee === 0 ? 'FREE' : `${CURRENCY} ${deliveryFee}`}\n`;
    message += `*TOTAL PAYABLE:* ${CURRENCY} ${grandTotal.toLocaleString()}\n\n`;
    message += `Please confirm my order and share estimated delivery time. I will provide my delivery address in this chat. Shukriya!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONTACT.whatsappRaw}?text=${encoded}`, '_blank');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-card border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-brand-dark">
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-cart-shopping text-brand-gold text-lg"></i>
              <h3 className="text-lg font-bold text-white font-heading">Your Crispy Order</h3>
              <span className="text-xs bg-brand-surface text-gray-300 px-2.5 py-0.5 rounded-full border border-white/10">
                {cart.reduce((sum, i) => sum + i.quantity, 0)} items
              </span>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button 
                  onClick={clearCart}
                  className="text-gray-400 hover:text-brand-red text-xs transition-colors p-1"
                  title="Clear Cart"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              )}
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          <div className="bg-brand-surface/90 px-5 py-3 border-b border-white/5 space-y-1.5">
            <div className="flex justify-between text-xs">
              {amountNeededForFreeDelivery > 0 ? (
                <span className="text-gray-300">
                  Add <strong className="text-brand-gold">{CURRENCY} {amountNeededForFreeDelivery.toLocaleString()}</strong> more for <strong className="text-emerald-400">FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check"></i> FREE Delivery Unlocked!
                </span>
              )}
              <span className="text-[11px] text-gray-400">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
              <div 
                className="bg-gradient-to-r from-brand-gold to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-grow overflow-y-auto p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-gray-500 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-brand-surface flex items-center justify-center text-gray-400 text-2xl">
                  <i className="fa-solid fa-basket-shopping"></i>
                </div>
                <h4 className="text-base font-bold text-gray-300">Your tray is empty</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Add some sizzling burgers, crunchy broast or loaded fries to satisfy your cravings.
                </p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs text-brand-gold font-bold underline cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={item.cartId}
                  className="bg-brand-surface p-3.5 rounded-2xl border border-white/10 flex items-start justify-between gap-3 shadow-sm hover:border-white/20 transition-all"
                >
                  <div className="space-y-1 flex-1">
                    <div className="font-bold text-white text-sm leading-snug">{item.name}</div>
                    
                    <div className="text-[11px] text-gray-400 flex flex-wrap gap-1.5 items-center">
                      {item.size && (
                        <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-2 py-0.5 rounded text-[10px] font-bold">
                          {item.size}
                        </span>
                      )}
                      {item.spice && <span>{item.spice}</span>}
                      {item.sauce && <span>• {item.sauce}</span>}
                      {item.extraCheese && <span className="text-brand-gold">• +Cheese</span>}
                    </div>

                    {item.specialNote && (
                      <div className="text-[10px] text-gray-400 italic">
                        "{item.specialNote}"
                      </div>
                    )}

                    <div className="text-xs font-black text-brand-gold font-heading pt-1">
                      {CURRENCY} {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-gray-500 hover:text-brand-red text-xs transition-colors p-1"
                      title="Remove item"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>

                    <div className="flex items-center gap-2 bg-brand-dark px-2.5 py-1 rounded-xl border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-extrabold text-white w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-brand-dark space-y-4">
              <div className="space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">{CURRENCY} {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-400 uppercase text-[11px]">FREE</span>
                  ) : (
                    <span className="font-semibold text-white">{CURRENCY} {deliveryFee.toLocaleString()}</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Payable</span>
                  <span className="text-brand-gold font-heading text-lg">
                    {CURRENCY} {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98 cursor-pointer"
                >
                  <i className="fa-brands fa-whatsapp text-xl"></i>
                  <span>Order via WhatsApp (COD)</span>
                </button>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onOpenCheckout();
                  }}
                  className="w-full py-3 rounded-xl bg-brand-gold text-black font-extrabold hover:bg-yellow-400 transition-all text-sm shadow-md shadow-brand-gold/25 active:scale-98 cursor-pointer"
                >
                  Direct Web Checkout (Online)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
