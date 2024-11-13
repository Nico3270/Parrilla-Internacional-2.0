import { ProductsKitchen } from "@/components/kitchen/productsKitchen/ProductsKitchen";
import { auth } from "@/auth.config"


export default async function ProductsKitchenPage() {
  const session = await auth();
  if (!session?.user.email) {
      return {
          ok: false,
          message: "Debe estar autenticado",
      };
  }
  return (
    <div>
      <ProductsKitchen email={session.user.email} />
    </div>
  );
}