import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type Preference = "restaurant" | "delivery";

interface PreferenceState {
  preference: Preference;

  //   Métodos
  setPreference: (preference: Preference) => void;
  resetPreference: () => void; // Método para restablecer el estado
}

export const usePreferenceDelivey= create<PreferenceState>()(
  persist(
    (set) => ({
        preference: "restaurant", // Valor inicial por defecto
        setPreference: (preference) => set({ preference }), // Método para actualizar la preferencia
        resetPreference: () => set({ preference: "restaurant" }),
    }),

    {
      name: "preference",
    } as PersistOptions<PreferenceState>
  )
);
