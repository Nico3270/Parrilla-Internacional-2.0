import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  removeProduct: (id: string) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  updateProductOptions: (id: string, newOptions: { name: string; price: number }[]) => void;
  updateProductComment: (id: string, newComment: string) => void;
  getTotalPrice: () => number; // Nueva función para obtener el precio total del carrito
  clearCart : () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        set((state) => ({ cart: [...state.cart, product] }));
      },
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateProductQuantity: (cartItemId: string, quantity: number) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        })),
      updateProductOptions: (cartItemId: string, newOptions: { name: string; price: number }[]) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, opcionesPersonalizacion: newOptions }
              : item
          ),
        })),
      updateProductComment: (cartItemId: string, newComment: string) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, comentario: newComment }
              : item
          ),
        })),
      removeProduct: (cartItemId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),
      // Nueva función para calcular el precio total del carrito
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          const totalAdiciones = item.opcionesPersonalizacion.reduce(
            (sum, option) => sum + option.price,
            0
          );
          return total + (item.price + totalAdiciones) * item.quantity;
        }, 0);
      },
      clearCart: () => {
        set({cart: []})
      }

    }),
    {
      name: "shopping-cart",
    } as PersistOptions<State>
  )
);
