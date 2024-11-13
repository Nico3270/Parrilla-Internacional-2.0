/*
  Warnings:

  - You are about to drop the column `optionsId` on the `Extra` table. All the data in the column will be lost.
  - The `isAvailableDuring` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Extra" DROP CONSTRAINT "Extra_optionsId_fkey";

-- AlterTable
ALTER TABLE "Extra" DROP COLUMN "optionsId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isAvailableDuring",
ADD COLUMN     "isAvailableDuring" JSONB;

-- CreateTable
CREATE TABLE "CustomizationOptionsExtras" (
    "customizationOptionsId" TEXT NOT NULL,
    "extraId" TEXT NOT NULL,

    CONSTRAINT "CustomizationOptionsExtras_pkey" PRIMARY KEY ("customizationOptionsId","extraId")
);

-- AddForeignKey
ALTER TABLE "CustomizationOptionsExtras" ADD CONSTRAINT "CustomizationOptionsExtras_customizationOptionsId_fkey" FOREIGN KEY ("customizationOptionsId") REFERENCES "CustomizationOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomizationOptionsExtras" ADD CONSTRAINT "CustomizationOptionsExtras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extra"("id") ON DELETE CASCADE ON UPDATE CASCADE;
