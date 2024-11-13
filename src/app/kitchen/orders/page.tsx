// page.tsx

import { getOrdersKitchen } from "@/actions/kitchen/get-orders-kitchen";
import KitchenOrderComponent from "@/components/kitchen/kitchenOrders/KitchenOrderComponent";

export default async function KitchenOrdersPage() {
  const response = await getOrdersKitchen(); // Llamar al servidor para obtener las órdenes

  if (!response.ok) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">No tienes órdenes en este momento</h2>
        <p>{response.message}</p>
      </div>
    );
  }

  // Asegurarse de que `ordersKitchen` y `userName` no sean undefined
  const orders = response.ordersKitchen ?? []; // Si es undefined, se asigna un arreglo vacío
  const userName = response.userName ?? ""; // Si es undefined, se asigna una cadena vacía
  // page.tsx
const userId = response.userId ?? ""; // Si es undefined, asignamos una cadena vacía


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Órdenes de Cocina</h1>
      <KitchenOrderComponent
        orders={orders}
        userId={userId} // Aquí asumes que userId siempre está definido, si no, 
        //deberías hacer una verificación similar
        userName={userName}
      />
    </div>
  );
}
