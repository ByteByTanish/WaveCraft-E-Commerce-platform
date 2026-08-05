import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import client from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await client.get('/cart');
      setCart(res.data.cart);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = async (productId, quantity = 1) => {
    const res = await client.post('/cart/items', { productId, quantity });
    setCart(res.data.cart);
  };

  const updateItem = async (productId, quantity) => {
    const res = await client.put(`/cart/items/${productId}`, { quantity });
    setCart(res.data.cart);
  };

  const removeItem = async (productId) => {
    const res = await client.delete(`/cart/items/${productId}`);
    setCart(res.data.cart);
  };

  const clearCart = async () => {
    const res = await client.delete('/cart');
    setCart(res.data.cart);
  };

  const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.items.reduce(
    (sum, i) => sum + (i.product?.price || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, loading, itemCount, subtotal, addItem, updateItem, removeItem, clearCart, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
