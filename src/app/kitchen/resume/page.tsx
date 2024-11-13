// page.tsx en la ruta /kitchen/resume
import { getOrdersKitchen } from "@/actions/kitchen/get-orders-kitchen";
import { auth } from "@/auth.config";
import ResumeKitchenComponent from "@/components/kitchen/resumeKitchenComponent/ResumeKitchenComponent";


export default async function ResumeKitchenPage() {
  const session = await auth();
  if (!session?.user.email) {
    return {
      ok: false,
      message: "Debe estar autenticado",
    };
  }

  const initialResponse = await getOrdersKitchen(); // Llamar al servidor para obtener las órdenes iniciales
  const initialOrders = initialResponse.ordersKitchen ?? [];
  const userId = initialResponse.userId ?? "";

  if (!initialResponse.ok) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">No tienes órdenes en este momento</h2>
        <p>{initialResponse.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Pasamos los datos iniciales a ResumeKitchenComponent */}
      <ResumeKitchenComponent initialOrders={initialOrders} userId={userId} />
    </div>
  );
}
