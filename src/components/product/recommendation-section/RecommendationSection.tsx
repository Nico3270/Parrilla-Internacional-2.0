"use client";
import React from "react";

interface RecommendationSectionProps {
  comment: string;
  onUpdateComment: (newComment: string) => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  comment,
  onUpdateComment,
}) => {
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateComment(e.target.value); // Usamos el valor directamente
  };

  return (
    <div className="mt-4">
      <h4 className="text-md font-bold">Deja una recomendación</h4>
      <textarea
        value={comment} // Usamos el valor directamente desde `comment`
        onChange={handleCommentChange}
        placeholder="Ejemplo: Sin cebolla, bebida sin azúcar..."
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
        rows={3}
      />
    </div>
  );
};
