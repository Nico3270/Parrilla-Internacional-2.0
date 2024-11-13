/*
  Warnings:

  - You are about to drop the column `seccionId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tipoId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Section` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `Type` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_seccionId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_tipoId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "seccionId",
DROP COLUMN "tipoId",
ADD COLUMN     "sectionId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Type" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "SeccionEnum";

-- DropEnum
DROP TYPE "TipoEnum";

-- CreateTable
CREATE TABLE "_RelatedProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedProducts_AB_unique" ON "_RelatedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedProducts_B_index" ON "_RelatedProducts"("B");

-- CreateIndex
CREATE INDEX "Product_sectionId_idx" ON "Product"("sectionId");

-- CreateIndex
CREATE INDEX "Product_typeId_idx" ON "Product"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_key" ON "Section"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
