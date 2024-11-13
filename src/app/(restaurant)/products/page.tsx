export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { ProductGrid, Pagination } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 12 });

  if (products.length === 0) {
    redirect("/products");
  }


  return (
    <div>
      <ProductGrid products={products} />
      <Pagination  totalPages={totalPages}/>
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
    </div>
  );
}

