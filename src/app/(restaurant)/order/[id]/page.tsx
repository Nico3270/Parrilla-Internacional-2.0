"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChair, FaClock, FaCheckCircle, FaUtensils, FaTimesCircle, FaTruck, FaBan } from "react-icons/fa";
import { getOrderById } from "@/actions"; // Asegúrate de que esto esté en el cliente

// Enum para tipo de entrega
enum DeliveryType {
  Restaurante = "RESTAURANT",
  Domicilio = "DELIVERY",
}

// Función para obtener ícono y color basado en el estado de la orden
const getStatusIconAndColor = (status: string) => {
  switch (status) {
    case "CREADA":
      return {
        icon: <FaClock className="text-blue-500" />,
        color: "bg-blue-100 text-blue-600",
      };
    case "EN_PREPARACION":
      return {
        icon: <FaUtensils className="text-yellow-500" />,
        color: "bg-yellow-100 text-yellow-600",
      };
    case "ENTREGADA":
      return {
        icon: <FaCheckCircle className="text-green-500" />,
        color: "bg-green-100 text-green-600",
      };
    case "PAGADA":
      return {
        icon: <FaCheckCircle className="text-green-700" />,
        color: "bg-green-400 text-green-600",
      };
    case "NO_PAGADA":
      return {
        icon: <FaTimesCircle className="text-red-500" />,
        color: "bg-red-100 text-red-600",
      };
    case "CANCELADA":
      return {
        icon: <FaBan className="text-gray-500" />,
        color: "bg-gray-100 text-gray-600",
      };
    case "DOMICILIO":
      return {
        icon: <FaTruck className="text-indigo-500" />,
        color: "bg-indigo-100 text-indigo-600",
      };
    default:
      return { icon: null, color: "" };
  }
};

export default function OrderDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener datos de la orden al cargar la página
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrderById(id);
      if (response.ok) {
        setOrder(response.respuesta);
        setLoading(false);
      } else {
        setError(response.message);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="text-center p-6">Cargando...</div>;
  }

  if (error || !order) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Error al obtener la orden</h2>
        <p>{error}</p>
      </div>
    );
  }

  const { status, preference, mesa, totalPrice, orderItems, address, statusHistory } = order;
  // En lugar de usar orderItems.length
const totalProductos = orderItems.reduce((total: number, item: any) => total + item.quantity, 0);

  const { icon, color } = getStatusIconAndColor(status);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Información de la orden</h1>
      <p className="text-center text-gray-500 mb-6">
        Fecha de la orden: {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {orderItems.map((item: any, index: number) => (
            <div key={index} className="flex border rounded-lg shadow-md p-4 items-center space-x-4">
              <Image
                src={`/imgs/${item.product?.productImages?.[0]?.url || "placeholder.jpg"}`}
                alt={item.product?.titulo || "Producto"}
                width={150}
                height={150}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.product?.titulo}</h2>
                <p className="text-gray-500">{item.product?.description}</p>

                {item.extras && typeof item.extras === "string" && item.extras !== "null" ? (
                  <p className="text-sm mt-2">
                    <span className="font-bold">Extras:</span>{" "}
                    {JSON.parse(item.extras).map((extra: any, i: number) => (
                      <span key={i}>
                        {extra.name} (+${extra.price})
                        {i < JSON.parse(item.extras).length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                ) : (
                  <p className="text-sm mt-2">No hay extras.</p>
                )}

                <p className="font-bold text-red-600 mt-2">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`border rounded-lg shadow-md p-6 space-y-6 bg-slate-100`}>
          <h2 className="text-2xl font-bold mb-4">Información del pedido</h2>
          <div className={`flex items-center gap-3 p-4 border-2 rounded-lg ${color}`}>
            {icon}
            <span className="font-bold text-lg">{status}</span>
          </div>

          {preference === DeliveryType.Restaurante ? (
            <div className="w-full">
              <label htmlFor="mesa" className="font-bold text-gray-700 mb-2 block">
                Número de Mesa
              </label>
              <div className="relative w-full">
                <FaChair className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  id="mesa"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  placeholder={mesa ? mesa.toString() : "N/A"}
                  disabled
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="font-bold text-lg text-gray-700 mb-4 block">Dirección de Entrega</label>
              <div className="space-y-2 mt-2 bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Nombre Completo:</span>
                  <span className="text-gray-800">{address?.name || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Dirección:</span>
                  <span className="text-gray-800">{address?.address || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Ciudad:</span>
                  <span className="text-gray-800">{address?.city || "N/A"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-600">Teléfono:</span>
                  <span className="text-gray-800">{address?.phone || "N/A"}</span>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold mb-2">Resumen de Orden</h3>
            <p>
              <span className="font-bold">Total de productos:</span> {totalProductos}
            </p>
            <p className="font-bold text-red-600 text-lg">Total a pagar: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Mostrar el historial de estado aquí */}
          <div>
            <h3 className="text-xl font-bold mb-2">Historial de Estados</h3>
            <ul className="space-y-3">
              {statusHistory.map((history: any, index: number) => {
                const { icon, color } = getStatusIconAndColor(history.status);
                return (
                  <li key={index} className={`flex items-center p-4 rounded-lg shadow-md ${color}`}>
                    {icon}
                    <div className="ml-3">
                      <p className="font-bold">{history.status}</p>
                      <p className="text-sm text-gray-600">
                        Cambiado el {new Date(history.changedAt).toLocaleString()} por{" "}
                        {history.changedBy?.name || "Sistema"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
