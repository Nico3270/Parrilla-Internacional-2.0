import { create } from "zustand";

//Creando la interface
interface State {
  isSideMenuOpen: boolean;
  numero: number;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  increaseNumber: () => void;
  decreaseNumber: () => void;
}

export const useUIStore = create<State>()((set) => ({
    // Valores predeterminados
  isSideMenuOpen: false,
  numero: 5,
    // Funciones
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
  increaseNumber: () => set( (state) => ({numero: state.numero + 1})),
  decreaseNumber: () => set( (state) => ({numero: state.numero - 1})),
}));
