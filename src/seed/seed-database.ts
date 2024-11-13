import { PrismaClient, Prisma } from "@prisma/client";
import { initialData } from "./seed";
import { SeedProduct } from "../interfaces/product.interface";

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== "production") {
    await prisma.address.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.user.deleteMany();
    await prisma.customizationOptionsExtras.deleteMany();
    await prisma.extra.deleteMany();
    await prisma.choice.deleteMany();
    await prisma.customizationOptions.deleteMany();
    await prisma.review.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.type.deleteMany();
    await prisma.section.deleteMany();
  }

  // Insertar usuarios

  await prisma.user.createMany({
    data: initialData.users
  });

  // Crear secciones
  const sectionsMap: { [key: string]: { id: string } } = {};
  for (const sectionName of initialData.sections) {
    let section = await prisma.section.findUnique({
      where: { name: sectionName },
    });

    if (!section) {
      section = await prisma.section.create({
        data: { name: sectionName },
      });
    }

    sectionsMap[sectionName] = { id: section.id };
  }

  // Crear tipos
  const typesMap: { [key: string]: { id: string } } = {};
  for (const typeName of initialData.types) {
    let type = await prisma.type.findUnique({
      where: { name: typeName },
    });

    if (!type) {
      type = await prisma.type.create({
        data: { name: typeName },
      });
    }

    typesMap[typeName] = { id: type.id };
  }

  // Convertir los productos de SeedProduct a los productos que Prisma espera
  for (const product of initialData.products as SeedProduct[]) {
    const sectionId = sectionsMap[product.seccion]?.id;
    const typeId = typesMap[product.tipo]?.id;

    if (!sectionId) {
      console.error(`Sección no encontrada: ${product.seccion}`);
      continue;
    }

    if (!typeId) {
      console.error(`Tipo no encontrado: ${product.tipo}`);
      continue;
    }

    const createdProduct = await prisma.product.create({
      data: {
        titulo: product.titulo,
        description: product.description,
        shortDescription: product.shortDescription,
        available: product.available,
        precio: product.precio,
        discountPrice: product.discountPrice || 0,
        slug: product.slug,
        tags: product.tags,
        sectionId: sectionId, // Conectar a la sección
        typeId: typeId, // Conectar al tipo
        isAvailableDuring: product.isAvailableDuring
          ? product.isAvailableDuring
          : Prisma.JsonNull,
      },
    });

    // Crear opciones de personalización
    if (product.customizationOptions) {
      await prisma.customizationOptions.create({
        data: {
          productId: createdProduct.id,
          extras: {
            create: product.customizationOptions.extras.map((extra) => ({
              extra: {
                connectOrCreate: {
                  where: { name: extra.name },
                  create: { name: extra.name, price: extra.price },
                },
              },
            })),
          },
          choices: {
            create: product.customizationOptions.choices.map((choice) => ({
              name: choice.name,
              values: choice.values,
            })),
          },
        },
      });
    }

    // Insertar imágenes del producto
    if (product.images && product.images.length > 0) {
      await prisma.productImage.createMany({
        data: product.images.map((image) => ({
          url: image,
          productId: createdProduct.id,
        })),
      });
    }
  }

  console.log("Datos insertados correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
