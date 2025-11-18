import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_KEY = "cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setCart(stored);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }, [cart]);

  const count = useMemo(() => cart.reduce((sum, i) => sum + (i.quantity || 1), 0), [cart]);
  const total = useMemo(() => cart.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0), [cart]);

  const add = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product_id === item.product_id && i.size === item.size && i.color === item.color
      );
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: (copy[idx].quantity || 1) + (item.quantity || 1) };
        return copy;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const remove = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index, qty) => {
    setCart((prev) => prev.map((it, i) => (i === index ? { ...it, quantity: Math.max(1, qty) } : it)));
  };

  const clear = () => setCart([]);

  const value = { cart, setCart, add, remove, updateQty, clear, count, total };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
