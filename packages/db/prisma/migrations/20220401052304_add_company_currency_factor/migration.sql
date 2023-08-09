/*
  Warnings:

  - You are about to drop the column `currency` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `companys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "companys" DROP COLUMN "currency",
ADD COLUMN     "currency_factor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "companys" ADD CONSTRAINT "companys_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
