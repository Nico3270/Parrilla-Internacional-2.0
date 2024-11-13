"use server"

import prisma from "@/lib/prisma";



export const productsToKitchen = async (email: string) => {
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }, select: {
                name: true,
                role: true,
                id: true
            }
        });

        if (user?.role !== "kitchen" && user?.role !== "admin") {
            return {
                ok: false,
                message: "El usuario debe ser administrador u operario de cocina"
            }
        };

        const products = await prisma.order.findMany({
            where: {
                status: { in: ["CREADA", "DOMICILIO", "EN_PREPARACION"] }
            },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,  // Selecciona el id de la orden
                status: true,  // Selecciona el estado de la orden
                mesa: true,  // Selecciona el campo 'mesa'
                createdAt: true,  // Selecciona la fecha de creación
                orderItems: {
                    select: {
                        comentario: true,  // Selecciona el comentario del OrderItem
                        quantity: true,    // Selecciona la cantidad del producto
                        extras: true,      // Selecciona los extras del producto
                        product: {
                            select: {
                                titulo: true,  // Título del producto
                                reviews: true,  // Incluye los comentarios sobre el producto
                                customizationOptions: {
                                    include: {
                                        extras: true,  // Incluye los extras de personalización del producto
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        return {
            ok: true,
            message: "Productos extraídos correctamente",
            productos: products || []
        }


    } catch (error) {
        return {
            ok: false,
            message: `Al intentar extraer los productos ocurrío el siguiente error ${error} `,
        }

    }
}

