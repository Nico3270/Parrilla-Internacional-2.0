"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Review } from "@/interfaces";

interface ClientCommentSectionProps {
  productReviews: Review[];
}

export const ClientCommentSection: React.FC<ClientCommentSectionProps> = ({
    productReviews,
  }) => {
    const [rating, setRating] = useState<number>(0);
    const [newComment, setNewComment] = useState("");
  
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewComment(e.target.value);
    };
  
    const handleCommentSubmit = () => {
      console.log("Comentario enviado:", newComment, "Puntuación:", rating);
      setNewComment("");
      setRating(0);
    };
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h4 className="text-lg font-bold">Opiniones</h4>
        {productReviews.length > 0 ? (
          productReviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
              <p className="font-bold">{review.username}</p>
              <p>{review.comment}</p>
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            Sé el primero en dejar un comentario.
          </p>
        )}
  
        <div className="mt-4">
          <h4 className="text-md font-bold">Deja tu puntuación</h4>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
  
          <h4 className="text-md font-bold mt-2">Deja tu comentario</h4>
          <input
            type="text"
            placeholder="Escribe tu comentario..."
            value={newComment}
            onChange={handleCommentChange}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
          >
            Enviar
          </button>
        </div>
      </div>
    );
  };
  
