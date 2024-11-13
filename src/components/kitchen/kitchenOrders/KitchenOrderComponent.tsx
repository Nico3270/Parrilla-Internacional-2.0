"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEye, FaClock, FaCheckCircle, FaUtensils } from "react-icons/fa";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { OrderStatus } from "@prisma/client"; // Importa el enum de Prisma directamente
import { ChangeStatusOrderKitchen } from "@/actions/kitchen/change-status-order-kitchen";

interface Order {
  id: string;
  status: OrderStatus;
  createdAt: Date;
  totalPrice: number;
  preference: string;
  mesa?: string | null;  // Cambia 'tableNumber' a 'mesa'
  user: {
    name: string;
  };
  orderItems: {
    product: {
      titulo: string;
    };
  }[]; // Agregamos los títulos de los productos
}

interface Props {
  orders: Order[];
  userId: string;
  userName: string;
}

const KitchenOrderComponent = ({ orders, userId, userName }: Props) => {
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: Order
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleChangeStatus = async (newStatus: OrderStatus) => {
    if (selectedOrder) {
      try {
        const response = await ChangeStatusOrderKitchen(
          selectedOrder.id,
          newStatus,
          userId
        );

        if (response.ok) {
          setOrderList((prevOrders) =>
            prevOrders.map((order) =>
              order.id === selectedOrder.id
                ? { ...order, status: newStatus }
                : order
            )
          );
        } else {
          console.error("Error al cambiar el estado:", response.message);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      } finally {
        handleClose();
      }
    }
  };

  // Función para mostrar el ícono y color basado en el estado de la orden
  const getStatusIconAndColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.CREADA:
        return { icon: <FaClock />, color: "bg-blue-500 text-white" };
      case OrderStatus.EN_PREPARACION:
        return { icon: <FaUtensils />, color: "bg-yellow-500 text-white" };
      case OrderStatus.ENTREGADA:
        return { icon: <FaCheckCircle />, color: "bg-green-500 text-white" };
      default:
        return { icon: null, color: "" };
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-red-700 text-white text-left">
            {/* Quitar columna de ID */}
            <th className="py-3 px-4 uppercase font-semibold text-sm">Usuario</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Productos</th> {/* Nueva columna */}
            <th className="py-3 px-4 uppercase font-semibold text-sm">Estado</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Fecha</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Mesa</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Precio</th>
            <th className="py-3 px-4 uppercase font-semibold text-sm">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            const { icon, color } = getStatusIconAndColor(order.status);
            return (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{order.user.name}</td>
                
                {/* Mostrar los títulos de los productos */}
                <td className="py-3 px-4">
                  {order.orderItems.map((item, index) => (
                    <span key={index} className="block">
                      {item.product.titulo}
                    </span>
                  ))}
                </td>

                <td className="py-3 px-4">
                  <IconButton
                    onClick={(e) => handleClick(e, order)}
                    className={`text-sm ${color}`}
                    style={{ padding: "5px", borderRadius: "5px" }} // Ajuste de estilo para evitar botones ovalados
                  >
                    {icon} <span className="ml-1">{order.status}</span> {/* Espacio entre icono y texto */}
                  </IconButton>
                </td>
                
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString("es-ES")}{" "}
                  {new Date(order.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>

                {/* Usar el campo 'mesa' en lugar de 'tableNumber' */}
                <td className="py-3 px-4">
                  {order.mesa && order.mesa.trim() !== ""
                    ? order.mesa
                    : "Domicilio"}
                </td>

                <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
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
        {[OrderStatus.CREADA, OrderStatus.EN_PREPARACION, OrderStatus.ENTREGADA].map(
          (status) => (
            <MenuItem key={status} onClick={() => handleChangeStatus(status)}>
              <span className="mr-2">{getStatusIconAndColor(status).icon}</span> {/* Margen entre ícono y texto */}
              {status}
            </MenuItem>
          )
        )}
      </Menu>
    </div>
  );
};

export default KitchenOrderComponent;
