"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Review } from "@/interfaces"; // Asegúrate de importar tu tipo de Review

interface CommentSectionProps {
  productReviews: Review[];  // Los comentarios (reviews) vienen desde el producto
  onCommentSubmit: (rating: number, comment: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  productReviews,
  onCommentSubmit,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    onCommentSubmit(rating, newComment);
    setNewComment("");
    setRating(0);
  };

  return (
    <div>
      <h4 className="text-lg font-bold">Opiniones</h4>
      {/* Si hay comentarios, los mostramos, de lo contrario, mostramos un mensaje */}
      {productReviews.length > 0 ? (
        <div className="space-y-4">
          {productReviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-bold">{review.username}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-yellow-500 ${
                      star <= review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">
          Sé el primero en dejar un comentario y una puntuación.
        </p>
      )}

      {/* Sección para agregar un nuevo comentario */}
      <h4 className="text-lg font-bold mt-4">Tu puntuación</h4>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <FaStar />
          </button>
        ))}
      </div>

      <h4 className="text-lg font-bold mt-4">Deja tu comentario</h4>
      <input
        type="text"
        placeholder="Escribe tu comentario..."
        value={newComment}
        onChange={handleCommentChange}
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
      />
      <button
        onClick={handleCommentSubmit}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Enviar
      </button>
    </div>
  );
};
