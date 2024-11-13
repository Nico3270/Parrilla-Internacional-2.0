import React from "react";

interface TitulosProps {
  titulo: string;
}

const Titulos: React.FC<TitulosProps> = ({ titulo }) => {
  return (
    <h1 className="text-4xl font-extrabold text-red-500 tracking-wide text-center py-4">
      <span className="block text-red-700">{titulo}</span>
    </h1>
  );
};

export default Titulos;
