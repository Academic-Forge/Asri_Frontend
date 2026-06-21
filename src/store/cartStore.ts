import { create } from 'zustand';
import type { CartItem, Product } from '../types/buyer';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  selectedShippingId: string | null;
  selectedPaymentId: string | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setShipping: (id: string | null) => void;
  setPayment: (id: string | null) => void;
  clearCheckout: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  selectedShippingId: null,
  selectedPaymentId: null,

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          )
        : [...state.items, { product, quantity }];

      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const items = state.items.filter((i) => i.product.id !== productId);
      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const items = quantity <= 0
        ? state.items.filter((i) => i.product.id !== productId)
        : state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          );

      return {
        items,
        totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      };
    });
  },

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

  setShipping: (id) => set({ selectedShippingId: id }),

  setPayment: (id) => set({ selectedPaymentId: id }),

  clearCheckout: () => set({ selectedShippingId: null, selectedPaymentId: null }),
}));
