"use client";

import { useEffect, useState } from "react";
import ResumeCardOrders from "@/components/kitchen/resumeCardsComponent/ResumeCardsOrders";
import { getOrdersKitchen } from "@/actions/kitchen/get-orders-kitchen";
import { OrderStatus } from "@prisma/client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Order {
    id: string;
    status: OrderStatus;
    createdAt: Date;
    mesa?: string | null;
    preference: string;
    totalPrice: number;
    user: {
        name: string;
    };
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
        extras?: any; // Ajuste temporal
        product: {
            titulo: string;
        };
    }[];
}

interface Props {
    initialOrders: Order[];
    userId: string;
}

const ITEMS_PER_PAGE = 12;

const ResumeKitchenComponent = ({ initialOrders, userId }: Props) => {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [currentPage, setCurrentPage] = useState(1);

    // Función para actualizar las órdenes
    const fetchUpdatedOrders = async () => {
        const response = await getOrdersKitchen();
        if (response.ok) {
            setOrders(response.ordersKitchen ?? []);
        }
    };

    // Ejecuta la función cada 10 segundos
    useEffect(() => {
        const interval = setInterval(fetchUpdatedOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

    // Obtener las órdenes para la página actual
    const paginatedOrders = orders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Manejar el cambio de página
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="mb-4">
            <ResumeCardOrders orders={paginatedOrders} userId={userId} />

            {/* Componente de Paginación */}
            <Stack spacing={2} alignItems="center" className="mt-4">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            color: "#c1121f", // Cambia el color de los números
                            fontSize: "1.3rem", // Aumenta el tamaño de los números
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#003049", // Cambia el fondo del número seleccionado
                            color: "#fdf0d5", // Cambia el color del texto en el número seleccionado
                            "&:hover": {
                                backgroundColor: "#780000", // Color al pasar el ratón sobre el número seleccionado
                            },
                        },
                    }}
                />
            </Stack>
        </div>
    );
};

export default ResumeKitchenComponent;
