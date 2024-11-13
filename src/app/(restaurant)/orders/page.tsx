"use client";

import Link from "next/link";
import {
  FaEye,
  FaClock,
  FaCheckCircle,
  FaUtensils,
  FaTimesCircle,
  FaTruck,
  FaBan,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getOrdersByUser } from "@/actions"; // Importar la action
import { CircularProgress } from "@mui/material";

// Definimos la estructura de los datos de una orden
interface Order {
  id: string;
  status: string;
  createdAt: string;
  totalPrice: number;
  preference: string;
}

// Función para mostrar el ícono y color basado en el estado de la orden
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState(""); // Estado para el nombre del usuario
  const [role, setRole] = useState(""); // Estado para el rol del usuario

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersByUser();

      if (response.ok && response.orders) {
        setOrders(response.orders); // Aseguramos que no sea undefined
        setName(response.usuario.NameUser); // Guardar el nombre del usuario
        setRole(response.role.userRole); // Guardar el rol del usuario
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress className="mt-20" color="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">
          No tienes órdenes en este momento
        </h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Título dinámico con el nombre del usuario y rol */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hola {name}, estas son tus órdenes
      </h1>

      {/* Tabla de Órdenes */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm">ID</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">
              Estado
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">
              Precio
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">
              Servicio
            </th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">
              Opciones
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const { icon, color } = getStatusIconAndColor(order.status);
            return (
              <tr
                key={order.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-2 py-1 px-3 rounded-full text-sm font-medium ${color}`}
                  >
                    {icon} {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-4">
                  {order.preference === "RESTAURANT"
                    ? "Restaurante"
                    : "Domicilio"}
                </td>
                <td className="py-3 px-4">
                  <Link
                    href={`/order/${order.id}`}
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <FaEye className="mr-1" /> Ver orden
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
