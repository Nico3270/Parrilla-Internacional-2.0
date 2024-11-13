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
import { getOrdersAdmin, changeStatusOrderAdmin } from "@/actions"; // Importar las actions
import { CircularProgress, Menu, MenuItem, IconButton } from "@mui/material";
import { useSearchParams } from "next/navigation"; // Importar para obtener parámetros de búsqueda
import { Pagination } from "@/components"; // Importar el componente de paginación


enum OrderStatus {
  CREADA = "CREADA",
  EN_PREPARACION = "EN_PREPARACION",
  ENTREGADA = "ENTREGADA",
  PAGADA = "PAGADA",
  NO_PAGADA = "NO_PAGADA",
  CANCELADA = "CANCELADA",
  DOMICILIO = "DOMICILIO"
}

// Definimos la estructura de los datos de una orden
interface Order {
  id: string;
  status: OrderStatus; // Cambiamos a tipo OrderStatus
  createdAt: string;
  totalPrice: number;
  preference: string;
  user: {
    name: string;
  };
}

// Definir cuántas órdenes por página
const ORDERS_PER_PAGE = 10;

// Función para mostrar el ícono y color basado en el estado de la orden
const getStatusIconAndColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.CREADA:
      return {
        icon: <FaClock className="text-blue-500" />,
        color: "bg-blue-100 text-blue-600",
      };
    case OrderStatus.EN_PREPARACION:
      return {
        icon: <FaUtensils className="text-yellow-500" />,
        color: "bg-yellow-100 text-yellow-600",
      };
    case OrderStatus.ENTREGADA:
      return {
        icon: <FaCheckCircle className="text-green-500" />,
        color: "bg-green-100 text-green-600",
      };
    case OrderStatus.PAGADA:
      return {
        icon: <FaCheckCircle className="text-green-700" />,
        color: "bg-green-400 text-green-600",
      };
    case OrderStatus.NO_PAGADA:
      return {
        icon: <FaTimesCircle className="text-red-500" />,
        color: "bg-red-100 text-red-600",
      };
    case OrderStatus.CANCELADA:
      return {
        icon: <FaBan className="text-gray-500" />,
        color: "bg-gray-100 text-gray-600",
      };
    case OrderStatus.DOMICILIO:
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
  const [userId, setUserId] = useState(""); // Nuevo estado para almacenar el userId
  const [filter, setFilter] = useState<OrderStatus | "ALL">("ALL"); // Estado para el filtro

  // Estado para controlar el menú desplegable del estado
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Obtener el parámetro "page" de la URL
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersAdmin();

      if (response.ok && response.orders) {
        setOrders(response.orders); // Aseguramos que no sea undefined
        setName(response.usuario.NameUser); // Guardar el nombre del usuario
        setRole(response.role.userRole); // Guardar el rol del usuario
        setUserId(response.usuario.userId); // Guardar el userId del usuario
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
        <h2 className="text-2xl font-bold mb-4">No tienes órdenes en este momento</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Función para abrir el menú desplegable
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, order: Order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  // Función para cerrar el menú desplegable
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  // Función para cambiar el estado de una orden
  const handleChangeStatus = async (newStatus: OrderStatus) => {
    if (selectedOrder && userId) {
      const response = await changeStatusOrderAdmin(selectedOrder.id, newStatus, userId); // Pasar userId
      if (response.ok) {
        // Actualizar la orden en el estado local
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id ? { ...order, status: newStatus } : order
          )
        );
      }
    }
    handleClose();
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  // Filtrar las órdenes según el estado seleccionado
  const filteredOrders = filter === "ALL" ? orders : orders.filter((order) => order.status === filter);

  // Obtener las órdenes que se deben mostrar en la página actual
  const startIndex = (page - 1) * ORDERS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);

  return (
    <div className="container mx-auto p-6">
      {/* Título dinámico con el nombre del usuario y rol */}
      <h1 className="text-4xl font-bold mb-8 text-center">
        Hola {name}, estas son tus órdenes
      </h1>

      {/* Botones de Filtro */}
      <div className="mb-4 flex justify-center space-x-4">
        <button onClick={() => setFilter("ALL")} className={`px-4 py-2 font-bold ${filter === "ALL" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Todas
        </button>
        {Object.values(OrderStatus).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-bold ${filter === status ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tabla de Órdenes */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="py-3 px-4 uppercase font-semibold text-sm">ID</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Usuario</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Estado</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Precio</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Servicio</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => {
            const { icon, color } = getStatusIconAndColor(order.status);
            return (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.user.name}</td>
                <td className="py-3 px-4">
                  <IconButton onClick={(e) => handleClick(e, order)} className={`text-sm ${color}`}>
                    {icon} {order.status}
                  </IconButton>
                </td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Mostrar fecha con hora */}
                </td>
                <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                <td className="py-3 px-4">{order.preference === "RESTAURANT" ? "Restaurante" : "Domicilio"}</td>
                <td className="py-3 px-4">
                  <Link href={`/order/${order.id}`} className="text-blue-600 hover:underline inline-flex items-center">
                    <FaEye className="mr-1" /> Ver orden
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Menú desplegable para cambiar el estado */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {Object.values(OrderStatus).map((status) => (
          <MenuItem key={status} onClick={() => handleChangeStatus(status)}>
            {getStatusIconAndColor(status).icon} {status}
          </MenuItem>
        ))}
      </Menu>

      {/* Componente de paginación */}
      <Pagination totalPages={totalPages} />
    </div>
  );
}

