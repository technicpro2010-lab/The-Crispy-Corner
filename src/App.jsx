import React, { useRef, useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import MenuGrid from './components/MenuGrid';
import BoxPromoSection from './components/BoxPromoSection';
import OrderTracker from './components/OrderTracker';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import BoxBuilderModal from './components/BoxBuilderModal';
import CustomizeModal from './components/CustomizeModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';

function MainContent() {
  const menuSectionRef = useRef(null);
  const trackerSectionRef = useRef(null);
  
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTracker = () => {
    trackerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderPlaced = (newOrder) => {
    setPlacedOrder(newOrder);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 sm:pb-0 bg-[#0d0d0d] text-gray-100">
      
      {/* Top Navbar */}
      <Navbar onScrollToTracker={scrollToTracker} />

      {/* Main Page Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* Hero Section */}
        <Hero onScrollToMenu={scrollToMenu} />

        {/* Menu Section */}
        <section ref={menuSectionRef} id="menuSection" className="space-y-6 pt-2">
          <CategoryFilter />
          <MenuGrid />
        </section>

        {/* Custom Box Builder Promotional Section */}
        <BoxPromoSection />

        {/* Live Order Tracker Showcase & Ongoing Tracking */}
        <OrderTracker trackerRef={trackerSectionRef} />

        {/* Customer Testimonials Across Pakistan */}
        <Testimonials />

      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Bar */}
      <MobileBottomBar />

      {/* Slide-over Cart Drawer */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />

      {/* Modals */}
      <BoxBuilderModal />
      <CustomizeModal />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />
      <OrderSuccessModal 
        order={placedOrder}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onTrackOrder={scrollToTracker}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

