import { ProductGrid } from "@/components";
import prisma from "@/lib/prisma";
import { Product as ProductInterface, SeccionEnum, TipoEnum } from "@/interfaces";
import Titulos from "@/components/ui/titulos/Titulo";

interface Props {
  params: {
    tipo: string;
  };
}

const Tipos = [
  { COMIDA: "Comida" },
  { ENTRADAS: "Entradas" },
  { BEBIDAS: "Bebidas" },
  { POSTRES: "Postres" }
];

export default async function CategoryPage({ params }: Props) {
  const { tipo } = params;

  // Buscamos el tipo en el array Tipos; si no existe, usamos "COMIDA" por defecto
  const tipoEncontrado = Tipos.find((t) => Object.values(t).includes(tipo)) || { COMIDA: "Comida" };

  const tipoClave = Object.keys(tipoEncontrado)[0];
  const tipoNombre = Object.values(tipoEncontrado)[0]; // Extraemos el nombre para mostrar en el título

  // Realizamos la consulta a Prisma
  const productsFromDB = await prisma.product.findMany({
    where: {
      type: {
        name: tipoClave,
      }
    },
    select: {
      id: true,
      titulo: true,
      description: true,
      available: true,
      precio: true,
      slug: true,
      tags: true,
      productImages: { select: { url: true } },
      type: true,
      section: true
    }
  });

  // Mapeamos los productos para ajustarlos a la interfaz ProductInterface
  const productsTipo: ProductInterface[] = productsFromDB.map((product) => ({
    id: product.id,
    titulo: product.titulo,
    description: product.description,
    available: product.available,
    precio: product.precio,
    slug: product.slug,
    tags: product.tags,
    images: product.productImages.map((img) => img.url),
    tipo: product.type.name as TipoEnum,
    seccion: product.section.name as SeccionEnum,
  }));

  return (
    <div className="container mx-auto p-4">
      {/* Título de la categoría */}
      <Titulos titulo={tipoNombre}/>
      {/* Mostramos los productos */}
      <ProductGrid products={productsTipo} />
    </div>
  );
}
