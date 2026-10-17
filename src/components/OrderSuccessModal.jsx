import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CURRENCY } from '../data/menuData';

export default function OrderSuccessModal({ order, isOpen, onClose, onTrackOrder }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFB800', '#FF3B30', '#ffffff', '#10b981']
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-brand-card border border-brand-gold/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto shadow-2xl text-center">
        
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 text-3xl animate-bounce">
          <i className="fa-solid fa-check"></i>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">Order Confirmed!</span>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Shukriya, {order.customer.name}! 🎉
          </h3>
          <p className="text-xs text-gray-300">
            Your crispy meal is being prepared hot & crunchy.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-brand-surface p-4 sm:p-5 rounded-2xl border border-white/10 text-left space-y-3 text-xs">
          
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Order Number</span>
              <span className="text-sm font-extrabold text-brand-gold font-heading">#{order.orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Est. Delivery</span>
              <span className="text-xs font-bold text-emerald-400">25 - 35 Mins</span>
            </div>
          </div>

          <div className="space-y-1 text-gray-300">
            <div><strong className="text-white">Delivery to:</strong> {order.customer.address}, {order.customer.city}</div>
            <div><strong className="text-white">Contact Phone:</strong> {order.customer.phone}</div>
            <div>
              <strong className="text-white">Payment:</strong>{' '}
              {order.customer.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 
               order.customer.paymentMethod === 'easypaisa' ? 'JazzCash / Easypaisa' : 'Debit/Credit Card'}
            </div>
          </div>

          {/* Ordered items quick preview */}
          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">Items Ordered:</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-gray-300">
                <span>{item.quantity}x {item.name} {item.spice ? `(${item.spice})` : ''}</span>
                <span className="font-semibold text-white">{CURRENCY} {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white">
            <span>Total Amount Paid / Due:</span>
            <span className="text-brand-gold font-heading text-base">{CURRENCY} {order.grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button 
            onClick={() => {
              onClose();
              onTrackOrder();
            }}
            className="w-full py-3.5 bg-brand-gold text-black font-extrabold rounded-2xl hover:bg-yellow-400 transition-all text-sm shadow-lg shadow-brand-gold/25 flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-clock-rotate-left"></i> Track Live Cooking & Delivery
          </button>

          <button 
            onClick={onClose}
            className="w-full py-2.5 bg-brand-surface text-gray-300 hover:text-white font-medium rounded-xl text-xs transition-colors"
          >
            Back to Home & Browse More
          </button>
        </div>

      </div>
    </div>
  );
}

