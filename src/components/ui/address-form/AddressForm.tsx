"use client";

import { useAddressStore } from "@/store";
import clsx from "clsx"; // Importamos clsx para manejar clases condicionales
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  address: string;
  city: string;
  department: string;
  phone: string;
  description?: string;
};

export const AddressForm = () => {
  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);
  const router = useRouter();
  
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<FormInputs>({
    mode: "onChange",
  });

  // useEffect para resetear el formulario con los datos del localStorage (store)
  useEffect(() => {
    if (address && address.name) {
      reset(address); // Rellenar los inputs con los datos desde el store
    }
  }, [address, reset]); // Dependencia en address y reset para actualizar cuando cambie

  const onSubmit = (data: FormInputs) => {
    setAddress(data); // Guardar los datos en el store (que se persiste en localStorage)
    router.push("/checkout"); // Redirigir a la página de checkout
    
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Ingresa tu Dirección de Envío
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre completo <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className={clsx(
              "mt-1 block w-full border rounded-lg shadow-sm p-2",
              errors.name ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Juan Pérez"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Dirección <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className={clsx(
              "mt-1 block w-full border rounded-lg shadow-sm p-2",
              errors.address ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Calle 123, N° 45"
            {...register("address", {
              required: "La dirección es obligatoria",
            })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Ciudad <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className={clsx(
              "mt-1 block w-full border rounded-lg shadow-sm p-2",
              errors.city ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Bogotá"
            {...register("city", { required: "La ciudad es obligatoria" })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            Estado/Provincia <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            className={clsx(
              "mt-1 block w-full border rounded-lg shadow-sm p-2",
              errors.department ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Cundinamarca"
            {...register("department", {
              required: "El estado/provincia es obligatorio",
            })}
          />
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">
              {errors.department.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Teléfono <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            className={clsx(
              "mt-1 block w-full border rounded-lg shadow-sm p-2",
              errors.phone ? "border-red-500" : "border-gray-300"
            )}
            placeholder="300 123 4567"
            {...register("phone", {
              required: "El número de teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "El número debe tener 10 dígitos",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción adicional (Opcional)
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2"
            placeholder="Detalles adicionales sobre la entrega"
            rows={4}
            {...register("description")}
          />
        </div>

        {/* Botón de enviar */}
        <div className="text-center">
          <button
            disabled={!isValid}
            type="submit"
            className={clsx(
              "px-6 py-2 rounded-lg font-bold text-white",
              isValid
                ? "bg-red-600 hover:bg-red-700"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};
