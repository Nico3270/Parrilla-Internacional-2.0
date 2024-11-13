/*
  Warnings:

  - The values [RESTAURANTE] on the enum `OrderPreference` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderPreference_new" AS ENUM ('RESTAURANT', 'DELIVERY');
ALTER TABLE "Order" ALTER COLUMN "preference" TYPE "OrderPreference_new" USING ("preference"::text::"OrderPreference_new");
ALTER TYPE "OrderPreference" RENAME TO "OrderPreference_old";
ALTER TYPE "OrderPreference_new" RENAME TO "OrderPreference";
DROP TYPE "OrderPreference_old";
COMMIT;
