/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `_RelatedProducts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seccionId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Section` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SeccionEnum" AS ENUM ('PLATOS_FUERTES', 'ENTRADAS', 'HAMBURGUESAS', 'PERROS_CALIENTES', 'CERVEZAS', 'BEBIDAS_CALIENTES', 'COCTELES', 'PIZZA');

-- CreateEnum
CREATE TYPE "TipoEnum" AS ENUM ('COMIDA', 'ENTRADAS', 'BEBIDAS', 'POSTRES');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- DropForeignKey
ALTER TABLE "_RelatedProducts" DROP CONSTRAINT "_RelatedProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_RelatedProducts" DROP CONSTRAINT "_RelatedProducts_B_fkey";

-- DropIndex
DROP INDEX "Product_sectionId_idx";

-- DropIndex
DROP INDEX "Product_typeId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sectionId",
DROP COLUMN "typeId",
ADD COLUMN     "seccionId" TEXT NOT NULL,
ADD COLUMN     "tipoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "name",
ADD COLUMN     "name" "SeccionEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "name",
ADD COLUMN     "name" "TipoEnum" NOT NULL;

-- DropTable
DROP TABLE "_RelatedProducts";

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seccionId_fkey" FOREIGN KEY ("seccionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
