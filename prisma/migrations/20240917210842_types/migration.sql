/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `seccion` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tipoId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoProducto` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sectionId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tipoId_fkey";

-- DropIndex
DROP INDEX "Product_seccion_idx";

-- DropIndex
DROP INDEX "Product_tipo_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
DROP COLUMN "seccion",
DROP COLUMN "tipo",
DROP COLUMN "tipoId",
ADD COLUMN     "sectionId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "TipoProducto";

-- DropEnum
DROP TYPE "Seccion";

-- DropEnum
DROP TYPE "Tipo";

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "Product_sectionId_idx" ON "Product"("sectionId");

-- CreateIndex
CREATE INDEX "Product_typeId_idx" ON "Product"("typeId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
