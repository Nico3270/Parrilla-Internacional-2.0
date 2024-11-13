import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface State {
  address: {
    name: string;
    address: string;
    city: string;
    department: string;
    phone: string;
    description?: string;
  };
//   Métodos
  setAddress: (address: State["address"]) => void;

}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        name: "",
        address: "",
        city: "",
        department: "",
        phone: "",
        description: "",
      },
      setAddress: (address) => {
        set({address})
      },


    }),

    {
      name: "address",
    } as PersistOptions<State>
  )
);
