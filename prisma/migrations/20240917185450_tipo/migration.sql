/*
  Warnings:

  - Added the required column `tipoId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tipoId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TipoProducto" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TipoProducto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TipoProducto_name_key" ON "TipoProducto"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
