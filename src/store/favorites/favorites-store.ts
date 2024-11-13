import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { FavoriteProduct } from "@/interfaces";

interface State {
  favorites: FavoriteProduct[];
  addProductFavorites: (product: FavoriteProduct) => void;
  getTotalItems: () => number;
  removeProductFavorites: (id: string) => void;
}

export const useFavoritesStore = create<State>()(
  persist(
    (set, get) => ({
      favorites: [],
      addProductFavorites: (product: FavoriteProduct) => {
        set((state) => ({ favorites: [...state.favorites, product] }));
      },
      getTotalItems: () => {
        const { favorites } = get();
        return favorites.length;
      },
      
      removeProductFavorites: (id: string) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        })),
      // Nueva función para calcular el precio total del carrito
    }),
    {
      name: "favorites",
    } as PersistOptions<State>
  )
);
