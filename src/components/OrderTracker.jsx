import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../data/menuData';

export default function OrderTracker({ trackerRef }) {
  const { activeOrder, setActiveOrder } = useCart();

  // If there's an active order, track it. If not, provide demo mode
  const [currentStep, setCurrentStep] = useState(activeOrder ? activeOrder.status || 1 : 1);
  const orderNumber = activeOrder ? activeOrder.orderId : 'CC-8492';
  const customerName = activeOrder?.customer?.name || 'Valued Foodie';
  const deliveryCity = activeOrder?.customer?.city || 'Karachi';

  useEffect(() => {
    if (activeOrder && activeOrder.status) {
      setCurrentStep(activeOrder.status);
    }
  }, [activeOrder]);

  const stages = [
    {
      step: 1,
      title: '1. Received',
      icon: 'fa-file-invoice',
      desc: 'Order confirmed! Kitchen received your ticket.'
    },
    {
      step: 2,
      title: '2. Deep Frying',
      icon: 'fa-fire-burner',
      desc: 'Sizzling & Frying! Your chicken is being cooked to crispy perfection.'
    },
    {
      step: 3,
      title: '3. On the Way',
      icon: 'fa-motorcycle',
      desc: `Rider dispatched! Speeding through ${deliveryCity} with your piping hot order.`
    },
    {
      step: 4,
      title: '4. Delivered',
      icon: 'fa-house-chimney-check',
      desc: 'Delivered hot & crunchy! Enjoy every single bite.'
    }
  ];

  const handleNextStage = () => {
    const next = (currentStep % 4) + 1;
    setCurrentStep(next);
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status: next
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    if (activeOrder) {
      setActiveOrder({
        ...activeOrder,
        status: 1
      });
    }
  };

  const activeStage = stages[currentStep - 1];

  return (
    <section 
      ref={trackerRef}
      id="orderTrackerSection"
      className="bg-brand-card border border-brand-gold/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Real-Time Kitchen Feed
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 font-heading">
            <i className="fa-solid fa-clock-rotate-left text-brand-gold"></i> Live Order Tracker
          </h3>
          <p className="text-xs text-gray-400">
            Tracking order <strong className="text-brand-gold">#{orderNumber}</strong> for {customerName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentStep === 4 && (
            <button 
              onClick={handleReset}
              className="px-3 py-2 bg-brand-surface border border-white/10 rounded-xl text-xs text-gray-300 hover:text-white transition-colors"
            >
              Reset to Step 1
            </button>
          )}
          <button 
            onClick={handleNextStage}
            className="px-4 py-2.5 bg-brand-surface border border-brand-gold/40 hover:border-brand-gold rounded-xl text-xs font-bold text-brand-gold hover:text-white hover:bg-brand-gold/20 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Simulate Next Stage</span>
            <i className="fa-solid fa-forward text-xs"></i>
          </button>
        </div>
      </div>

      {/* 4 Interactive Progress Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
        {stages.map((stage) => {
          const isPassedOrCurrent = stage.step <= currentStep;
          const isCurrent = stage.step === currentStep;

          return (
            <div 
              key={stage.step}
              onClick={() => setCurrentStep(stage.step)}
              className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-brand-surface border-brand-gold text-brand-gold shadow-lg shadow-brand-gold/15 scale-102 ring-2 ring-brand-gold/20'
                  : isPassedOrCurrent
                  ? 'bg-brand-surface/80 border-emerald-500/60 text-emerald-400'
                  : 'bg-brand-surface/40 border-white/10 text-gray-500'
              }`}
            >
              <div className="relative inline-block">
                <i className={`fa-solid ${stage.icon} text-xl sm:text-2xl mb-2`}></i>
                {isPassedOrCurrent && stage.step < currentStep && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-black w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black">
                    ✓
                  </span>
                )}
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                {stage.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Status Box with Progress Bar */}
      <div className="bg-brand-surface/80 rounded-2xl p-4 sm:p-5 border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="text-white font-bold">{activeStage.title}:</span>
            <span className="text-gray-300">{activeStage.desc}</span>
          </div>
          <div className="text-brand-gold font-bold self-end sm:self-auto">
            {currentStep === 4 ? 'Status: Complete' : 'Est: ~15-20 Mins remaining'}
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/10">
          <div 
            className="bg-gradient-to-r from-brand-gold via-yellow-400 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Extra order info preview if active order */}
      {activeOrder && (
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-3">
          <div>
            <span>Rider Contact: </span>
            <strong className="text-white">+92 312 9876543 (Ali - Rider)</strong>
          </div>
          <div>
            <span>Delivery Amount: </span>
            <strong className="text-brand-gold font-bold">{CURRENCY} {activeOrder.grandTotal.toLocaleString()}</strong>
          </div>
        </div>
      )}
    </section>
  );
}

