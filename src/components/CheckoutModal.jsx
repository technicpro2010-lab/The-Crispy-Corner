import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY, STORE_CONTACT } from '../data/menuData';

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const { 
    cart, 
    subtotal, 
    deliveryFee, 
    grandTotal, 
    setActiveOrder,
    clearCart
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'jazzcash',
    transactionId: ''
  });

  const [copiedJazzCash, setCopiedJazzCash] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyJazzCash = () => {
    navigator.clipboard.writeText(STORE_CONTACT.jazzCashNumber);
    setCopiedJazzCash(true);
    setTimeout(() => setCopiedJazzCash(false), 2000);
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const orderId = 'TCC-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        ...formData
      },
      items: [...cart],
      subtotal,
      deliveryFee,
      grandTotal,
      status: 1, // 1: Received, 2: Frying, 3: On The Way, 4: Delivered
      statusText: 'Order Received & Kitchen Notified'
    };

    setTimeout(() => {
      setActiveOrder(newOrder);
      clearCart();
      setSubmitting(false);
      onClose();
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-brand-card border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
              <i className="fa-solid fa-receipt"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-heading">Complete Your Order</h3>
              <p className="text-[11px] text-gray-400">Express Delivery in Pakistan</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-bold mb-1">Full Name *</label>
              <input
                type="text"
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Hamza Ali"
                className="w-full bg-brand-surface text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">WhatsApp / Phone *</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0300-1234567"
                className="w-full bg-brand-surface text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Complete Street Address *</label>
            <textarea 
              rows="2"
              required 
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="House #, Street #, Apartment / Landmark"
              className="w-full bg-brand-surface text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-bold mb-1">Delivery Notes (Optional)</label>
            <input 
              type="text" 
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Special instructions for rider (e.g. call upon arrival)"
              className="w-full bg-brand-surface text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-gray-300 font-bold mb-2 uppercase text-[11px] tracking-wider">
              Payment Method (Pakistan)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label 
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'jazzcash' 
                    ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                    : 'bg-brand-surface border-white/10 text-gray-400'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="jazzcash" 
                  checked={formData.paymentMethod === 'jazzcash'} 
                  onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                  className="hidden" 
                />
                <i className="fa-solid fa-mobile-screen-button text-brand-gold text-base mb-1"></i>
                <span className="text-xs">JazzCash</span>
                <span className="text-[9px] text-brand-gold font-semibold mt-0.5">{STORE_CONTACT.jazzCashNumber}</span>
              </label>

              <label 
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'easypaisa'
                    ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                    : 'bg-brand-surface border-white/10 text-gray-400'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="easypaisa"
                  checked={formData.paymentMethod === 'easypaisa'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                  className="hidden" 
                />
                <i className="fa-solid fa-mobile-screen-button text-emerald-400 text-base mb-1"></i>
                <span className="text-xs">Easypaisa</span>
                <span className="text-[9px] text-emerald-400 font-semibold mt-0.5">Mobile wallet</span>
              </label>

              <label 
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'bg-brand-gold/15 border-brand-gold text-white font-bold ring-1 ring-brand-gold' 
                    : 'bg-brand-surface border-white/10 text-gray-400'
                }`}
              >
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="card" 
                  checked={formData.paymentMethod === 'card'} 
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className="hidden" 
                />
                <i className="fa-solid fa-credit-card text-brand-red text-base mb-1"></i>
                <span className="text-xs">Debit / Credit Card</span>
                <span className="text-[9px] text-gray-400 mt-0.5">Visa / Mastercard</span>
              </label>
            </div>

            {/* JazzCash Details Box */}
            {formData.paymentMethod === 'jazzcash' && (
              <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-brand-surface border border-brand-gold/40 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold text-xs font-bold">
                      <i className="fa-solid fa-money-bill-transfer"></i>
                    </span>
                    <span className="text-xs font-bold text-white">JazzCash Payment Details</span>
                  </div>
                  <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-bold">
                    Instant Transfer
                  </span>
                </div>

                <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block">JazzCash Account Number</span>
                    <span className="text-base sm:text-lg font-black text-brand-gold font-heading tracking-wide">
                      {STORE_CONTACT.jazzCashNumber}
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">
                      Title: <strong className="text-white">{STORE_CONTACT.jazzCashTitle}</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyJazzCash}
                    className="px-3 py-1.5 rounded-xl bg-brand-surface border border-white/15 hover:border-brand-gold text-xs font-bold text-gray-200 hover:text-white transition-all flex items-center gap-1.5"
                  >
                    <i className={copiedJazzCash ? "fa-solid fa-check text-emerald-400" : "fa-regular fa-copy"}></i>
                    <span>{copiedJazzCash ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-gray-300 font-semibold text-[11px]">
                    Sender Mobile / Transaction ID (TID)
                  </label>
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    placeholder="Enter your JazzCash number or TID (e.g. 03xx-xxxxxxx)"
                    className="w-full bg-brand-surface text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold text-xs"
                  />
                  <p className="text-[10px] text-gray-400 italic">
                    💡 Please send <strong>{CURRENCY} {grandTotal.toLocaleString()}</strong> to <strong>{STORE_CONTACT.jazzCashNumber}</strong>. We'll verify and prepare your meal right away!
                  </p>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'easypaisa' && (
              <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-brand-surface border border-emerald-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen-button text-emerald-400"></i>
                  <span className="text-xs font-bold text-white">Easypaisa Payment</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Submit your order and we’ll contact you with Easypaisa payment instructions. Please wait for confirmation before sending payment.
                </p>
                <label className="block text-gray-300 font-semibold text-[11px]">
                  Sender Mobile / Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  value={formData.transactionId}
                  onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                  placeholder="Enter your Easypaisa number or transaction ID"
                  className="w-full bg-brand-surface text-white p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-brand-gold text-xs"
                />
              </div>
            )}

            {formData.paymentMethod === 'card' && (
              <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-brand-surface border border-brand-red/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-credit-card text-brand-red"></i>
                  <span className="text-xs font-bold text-white">Debit / Credit Card</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Card payments are not processed on this site yet. Submit your order and we’ll contact you to arrange payment.
                </p>
              </div>
            )}
          </div>

          {/* Quick Order Bill Summary */}
          <div className="bg-brand-surface p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex justify-between text-gray-400">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="text-white font-medium">{CURRENCY} {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Delivery Charges</span>
              <span className={deliveryFee === 0 ? "text-emerald-400 font-bold" : "text-white font-medium"}>
                {deliveryFee === 0 ? "FREE" : `${CURRENCY} ${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-white/10">
              <span>Grand Total</span>
              <span className="text-brand-gold font-heading text-base">
                {CURRENCY} {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-3.5 bg-brand-gold text-black font-extrabold rounded-2xl hover:bg-yellow-400 active:scale-98 transition-all text-sm shadow-lg shadow-brand-gold/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                <span>Placing Your Order...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-circle-check"></i>
                <span>Confirm & Place Order ({CURRENCY} {grandTotal.toLocaleString()})</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
