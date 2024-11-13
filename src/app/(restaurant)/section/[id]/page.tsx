export const revalidate = 60;


import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import { PageNotFound, Pagination, ProductGrid } from "@/components";
import { idSecciones } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string
  },
  searchParams: {
    page? : string;
  }
}



export default async function Home({params, searchParams}: Props) {
  const {id} = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const idSection = idSecciones(id);

  if (idSection === null) {return  <PageNotFound />}
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, take: 8, id:idSection });
  
  if (products.length === 0) {
    redirect(`/section/${id}`);
  }


  if (idSection === "Not found") {
    return (
      <PageNotFound />
    )
  };
 
  
  return (
    <div>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
