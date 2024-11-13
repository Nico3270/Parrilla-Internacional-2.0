"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChair, FaHome, FaChevronDown } from 'react-icons/fa';
import { OrderStatus } from "@prisma/client";
import { ChangeStatusOrderKitchen } from "@/actions/kitchen/change-status-order-kitchen";

// Función para obtener el color de fondo y el texto basado en el estado de la orden
const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 'CREADA':
      return { bgColor: 'bg-red-500', textColor: 'text-white' };
    case 'EN_PREPARACION':
      return { bgColor: 'bg-yellow-500', textColor: 'text-white' };
    case 'ENTREGADA':
      return { bgColor: 'bg-green-500', textColor: 'text-white' };
    case 'DOMICILIO':
      return { bgColor: 'bg-blue-500', textColor: 'text-white' };
    default:
      return { bgColor: 'bg-gray-300', textColor: 'text-gray-900' };
  }
};

interface Order {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  mesa?: string | null;
  user: {
    name: string;
  };
  preference: string;
  totalPrice: number;
  address?: {
    address: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    name: string;
    city: string;
    department: string;
    phone: string;
  } | null;
  orderItems: {
    id: string;
    quantity: number;
    comentario?: string | null;
    extras?: { name: string; price: number }[] | string | null;
    product: {
      titulo: string;
    };
  }[];
}


interface Props {
  orders: Order[];
  userId: string;
}

// Componente principal de tarjetas de orden
const ResumeCardOrders = ({ orders, userId }: Props) => {
  const [filter, setFilter] = useState<OrderStatus | "TODAS">("TODAS");
  const [menuOpen, setMenuOpen] = useState(false);

  const orderedOrders = (orders: Order[]) => {
    const priority: Partial<Record<OrderStatus, number>> = {
      CREADA: 1,
      DOMICILIO: 2,
      EN_PREPARACION: 3,
      ENTREGADA: 4,
    };
    return [...orders].sort((a, b) => (priority[a.status] ?? 5) - (priority[b.status] ?? 5));
  };

  const filteredOrders = () => {
    const filtered = filter === "TODAS" ? orders : orders.filter(order => order.status === filter);
    return orderedOrders(filtered);
  };

  return (
    <div>
      {/* Barra de Filtros - Responsive con menú desplegable en móviles */}
      <div className="flex justify-center mb-4 mt-6 relative">
        <div className="hidden sm:flex space-x-2">
          {["TODAS", "CREADA", "EN_PREPARACION", "ENTREGADA", "DOMICILIO"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as OrderStatus | "TODAS")}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === status
                  ? "bg-gradient-to-r from-gray-400 to-red-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
            </button>
          ))}
        </div>
        <div className="sm:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold flex items-center"
          >
            Filtros
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg mt-2 z-10">
              {["TODAS", "CREADA", "EN_PREPARACION", "ENTREGADA", "DOMICILIO"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status as OrderStatus | "TODAS");
                    setMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left ${
                    filter === status ? "bg-blue-500 text-white" : "text-gray-800"
                  }`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase().replace("_", " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de Órdenes Filtradas */}
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2">
        {filteredOrders().map((order) => (
          <OrderCard key={order.id} order={order} userId={userId} />
        ))}
      </div>
    </div>
  );
};

// Componente de la tarjeta de cada orden
const OrderCard = ({ order, userId }: { order: Order; userId: string }) => {
  const { bgColor, textColor } = getStatusStyle(order.status);
  const formattedDate = new Date(order.createdAt).toLocaleString('es-ES');
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    const response = await ChangeStatusOrderKitchen(order.id, newStatus, userId);

    if (response.ok) {
      setCurrentStatus(newStatus);
    } else {
      console.error(response.message);
    }
  };

  // Formato para mostrar los productos con extras y comentarios
  const formatOrderItems = () => {
    return order.orderItems.map((item) => {
      let extras = "";

      if (Array.isArray(item.extras) && item.extras.length > 0) {
        extras = item.extras.map(extra => extra.name).join(", ");
      } else if (typeof item.extras === "string" && item.extras !== "null") {
        try {
          const parsedExtras = JSON.parse(item.extras);
          if (Array.isArray(parsedExtras) && parsedExtras.length > 0) {
            extras = parsedExtras.map((extra: any) => extra.name).join(", ");
          }
        } catch (error) {
          console.error("Error parsing extras:", error);
        }
      }

      return (
        <li key={item.id} className="mb-1">
          {`* ${item.quantity} ${item.product.titulo}`}
          {extras && <span className="text-red-500"> - Extras: </span>}
          <span>{extras}</span>
          {item.comentario && <span className="text-red-500"> - Comentario: </span>}
          <span>{item.comentario}</span>
        </li>
      );
    });
  };

  return (
    <div className="relative w-full max-w-xs m-2 p-4 bg-white rounded-lg shadow-lg overflow-y-auto max-h-64">
      {/* Encabezado con estado y botón de cambio de estado */}
      <div className={`flex justify-between items-center px-4 py-2 ${bgColor} ${textColor} rounded-t-lg`}>
        <span className="text-xs uppercase font-bold">Estado: {currentStatus}</span>
        <OrderStatusDropdown currentStatus={currentStatus} onStatusChange={handleStatusChange} />
      </div>

      {/* Enlace de la tarjeta */}
      <Link href={`/order/${order.id}`} className="block mt-4">
        <div className="flex items-center justify-center space-x-2 text-gray-700">
          {order.mesa ? (
            <>
              <FaChair className="text-3xl" />
              <span className="text-2xl font-bold">Mesa {order.mesa}</span>
            </>
          ) : (
            <>
              <FaHome className="text-3xl" />
              <span className="text-2xl font-bold">Domicilio</span>
            </>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-600">Información de la orden</h3>
          <ul className="mt-2 text-sm text-gray-700">
            {formatOrderItems()}
          </ul>
        </div>
      </Link>
    </div>
  );
};

// Dropdown de cambio de estado
const OrderStatusDropdown = ({
  currentStatus,
  onStatusChange
}: {
  currentStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const statusOptions: OrderStatus[] = ["CREADA", "EN_PREPARACION", "ENTREGADA", "DOMICILIO"];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
        className="flex items-center space-x-1"
      >
        <FaChevronDown className="text-white ml-2" />
      </button>
      {dropdownOpen && (
        <div className="absolute top-8 right-0 bg-white shadow-lg rounded-lg z-10 p-2 w-32">
          {statusOptions
            .filter((status) => status !== currentStatus)
            .map((status) => (
              <button
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(false);
                  onStatusChange(status);
                }}
                className="block w-full text-left px-2 py-1 text-gray-700 hover:bg-gray-100 rounded"
              >
                {status}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ResumeCardOrders;
