"use client";
import React, { useEffect } from "react";

interface CustomizationOptionsProps {
  customizationOptions: {
    extras: { name: string; price: number }[];
  } | undefined;
  selectedOptions: { name: string; price: number }[];
  onUpdateOptions: (newOptions: { name: string; price: number }[]) => void;
}

export const PersonalizationOptions: React.FC<CustomizationOptionsProps> = ({
  customizationOptions,
  selectedOptions,
  onUpdateOptions,
}) => {
  const handleExtraChange = (extra: { name: string; price: number }) => {
    const isSelected = selectedOptions.some((option) => option.name === extra.name);
    const newOptions = isSelected
      ? selectedOptions.filter((option) => option.name !== extra.name)
      : [...selectedOptions, extra];

    onUpdateOptions(newOptions); // Actualizamos las opciones directamente
  };

  // Efecto para sincronizar las opciones seleccionadas con las opciones disponibles
  useEffect(() => {
    if (customizationOptions?.extras.length) {
      const validSelectedOptions = selectedOptions.filter((selected) =>
        customizationOptions.extras.some((extra) => extra.name === selected.name)
      );
      if (validSelectedOptions.length !== selectedOptions.length) {
        onUpdateOptions(validSelectedOptions); // Elimina opciones seleccionadas no válidas
      }
    }
  }, [customizationOptions, selectedOptions, onUpdateOptions]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Personaliza tu producto</h3>

      {/* Mostrar las opciones de personalización solo si hay extras */}
      {customizationOptions && customizationOptions.extras?.length > 0 ? (
        <div className="flex flex-col gap-2 mt-2">
          {customizationOptions.extras.map((extra, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value={extra.name}
                checked={selectedOptions.some((option) => option.name === extra.name)} // Usamos `selectedOptions` del prop
                onChange={() => handleExtraChange(extra)}
              />
              {extra.name} (+${extra.price.toFixed(2)})
            </label>
          ))}
        </div>
      ) : (
        <p>No hay opciones de personalización disponibles.</p>
      )}
    </div>
  );
};
