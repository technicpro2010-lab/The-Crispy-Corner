import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'crispy_corner_cart_v1';
const ORDER_STORAGE_KEY = 'crispy_corner_active_order_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState(false);
  const [customizeItem, setCustomizeItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('Karachi');

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [activeOrder]);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Delivery rule: Free delivery in Pakistan above Rs. 2,000, otherwise Rs. 150
  const FREE_DELIVERY_THRESHOLD = 2000;
  const standardDeliveryFee = totalItemsCount > 0 ? 150 : 0;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const addToCart = (newItem) => {
    setCart(prev => {
      // Check if identical item with same customizations exists
      const existingIdx = prev.findIndex(item => 
        item.id === newItem.id &&
        item.spice === newItem.spice &&
        item.sauce === newItem.sauce &&
        item.extraCheese === newItem.extraCheese &&
        item.boxDetails === newItem.boxDetails
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity || 1;
        return updated;
      }

      return [
        ...prev,
        {
          ...newItem,
          cartId: Date.now() + Math.random().toString(36).substring(2, 7),
          quantity: newItem.quantity || 1
        }
      ];
    });
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        grandTotal,
        amountNeededForFreeDelivery,
        FREE_DELIVERY_THRESHOLD,
        isCartOpen,
        setIsCartOpen,
        isBoxBuilderOpen,
        setIsBoxBuilderOpen,
        customizeItem,
        setCustomizeItem,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        activeOrder,
        setActiveOrder,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        selectedCity,
        setSelectedCity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

