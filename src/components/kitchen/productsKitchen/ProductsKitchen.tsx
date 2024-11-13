"use client";
import { productsToKitchen } from '@/actions/kitchen/products-to-kitchen';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductsKitchenProps {
    email: string;
}
export const ProductsKitchen = ({ email }: ProductsKitchenProps) => {
    const [products, setProducts] = useState<
        {
            id: string;
            mesa: string | null;
            status: string;
            createdAt: Date;
            orderItems: {
                quantity: number;
                extras: any;
                comentario: string | null;
                product: {
                    titulo: string;
                };
            }[];
        }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Función para obtener productos
    const fetchProducts = async () => {
        const response = await productsToKitchen(email);
        if (response.ok) {
            setProducts(response.productos || []);
        } else {
            setError(response.message);
        }
        setLoading(false);
    };

    // Ejecutar la función cada 10 segundos
    useEffect(() => {
        fetchProducts(); // Ejecutar cuando el componente se monta
        const interval = setInterval(() => {
            fetchProducts(); // Ejecutar cada 10 segundos
        }, 10000);

        return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonta
    }, [email]);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-8 text-center">Productos de la Cocina</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-red-700">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Cantidad</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Producto</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Extras</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Comentario</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Mesa</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Hora de Creación</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white border-r border-gray-300">Estado</th>
                            <th className="py-3 px-4 text-left text-sm font-bold text-white">Orden</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((order: any) =>
                            order.orderItems.map((item: any, index: number) => (
                                <tr key={index} className="border-t border-gray-300">
                                    <td className="py-3 px-4 text-center border-r border-gray-300">{item.quantity}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">{item.product.titulo}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">
                                        {Array.isArray(item.extras) ? (
                                            item.extras.map((extra: any, index: number) => (
                                                <span key={index} className="block">
                                                    {`* ${extra.name}`} 
                                                </span>
                                            ))
                                        ) : (
                                            typeof item.extras === 'string' && item.extras !== 'null' ? (
                                                JSON.parse(item.extras).map((extra: any, index: number) => (
                                                    <span key={index} className="block">
                                                        {`* ${extra.name}`} 
                                                    </span>
                                                ))
                                            ) : (
                                                <span>Sin extras</span>
                                            )
                                        )}
                                    </td>
                                    <td className="py-3 px-4 border-r border-gray-300">{item.comentario || "Sin comentario"}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">{order.mesa || "Domicilio"}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">{new Date(order.createdAt).toLocaleTimeString()}</td>
                                    <td className="py-3 px-4 border-r border-gray-300">{order.status}</td>
                                    <td className="py-3 px-4">
                                        <Link href={`/order/${order.id}`} className="text-blue-600 hover:underline">
                                            Ver Orden
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
