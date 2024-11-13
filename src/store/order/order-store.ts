import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// Definir el tipo del estado
interface OrderState {
  orderCreated: boolean; // Para saber si la orden ha sido creada
  // Métodos para actualizar y restablecer el estado
  setOrderCreated: (created: boolean) => void;
  resetOrderCreated: () => void; // Método para restablecer el estado
}

// Configurar el store de Zustand con persistencia
export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      // Estado inicial
      orderCreated: false,

      // Método para establecer si la orden fue creada y restablecer automáticamente después de un tiempo
      setOrderCreated: (created: boolean) => {
        set({ orderCreated: created });

        // Si se ha creado la orden, configurar un temporizador para restablecer el estado
        if (created) {
          setTimeout(() => {
            set({ orderCreated: false }); // Restablecer el estado después de 3 segundos
          }, 3000);
        }
      },

      // Método para restablecer el estado de la orden manualmente
      resetOrderCreated: () => set({ orderCreated: false }),
    }),
    {
      name: "order-status", // Nombre del almacenamiento persistente
    } as PersistOptions<OrderState>
  )
);
