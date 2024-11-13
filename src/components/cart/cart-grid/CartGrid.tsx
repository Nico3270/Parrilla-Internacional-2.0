import React from "react";

interface GridCartProps {
  children: React.ReactNode;
}

export const GridCart: React.FC<GridCartProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {children}
    </div>
  );
};
