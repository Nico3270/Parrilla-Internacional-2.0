import { getProductBySlug } from "@/actions";
import { notFound } from "next/navigation";
import {
  ProductGridProduct,
  ResponsiveSlideShow,
  AddToCart,  // Importamos AddToCart
  ClientCommentSection,  // Importamos el componente de comentarios
  Precio
} from "@/components";
import type { Metadata } from 'next'


interface Props {
  params: {
    slug: string;
  };
  searchParams: {[key:string]:string | string[] | undefined};
}

// Corregimos la función generateMetadata para manejar el caso donde productData es null
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = params.slug;
  const productData = await getProductBySlug(slug);

  if (!productData || !productData.product) {
    return {
      title: "Producto no encontrado",
      description: "El producto que estás buscando no existe.",
      robots: {
        index: false, // No indexar páginas de productos que no existen
      },
    };
  }

  const { product } = productData;
  const imageUrl = `/products/${product.images[0] ?? 'default-image.jpg'}`;

  return {
    title: product.titulo,
    description: product.description ?? "",
    openGraph: {
      title: product.titulo,
      description: product.description ?? "",
      images: [imageUrl],
      url: `https://www.tusitio.com/product/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.titulo,
      description: product.description ?? "",
      images: [imageUrl],
    },
  };
}


export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  
  // Llamamos a la función getProductBySlug para obtener los datos del servidor
  const productData = await getProductBySlug(slug);

  if (!productData || !productData.product) {
    notFound();  // Mostrar una página 404 si no se encuentra el producto
  }

  const { product, similarProducts } = productData;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <ResponsiveSlideShow
            images={product.images}
            title={product.titulo}
          />
        </div>

        <div className="flex flex-col space-y-6 md:space-y-4 md:flex-grow">
          <div>
            <h1 className="text-3xl font-bold">{product.titulo}</h1>
            <h2 className="text-xl">{product.description}</h2>
            <Precio value={product.precio} />
          </div>

          {/* Renderizamos el componente AddToCart */}
          <AddToCart product={product} />

        </div>
      </div>

      {/* Nueva sección dividida en dos columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          {/* Usamos el nuevo componente interactivo ClientCommentSection */}
          <ClientCommentSection productReviews={product.reviews || []} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Productos Similares</h2>
          <ProductGridProduct products={similarProducts} />
        </div>
      </div>
    </div>
  );
}
