/*
  Warnings:

  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price_amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price_currency` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "price",
DROP COLUMN "selling_price_amount",
DROP COLUMN "selling_price_currency",
ADD COLUMN     "retail_price_amount" DOUBLE PRECISION,
ADD COLUMN     "retail_price_currency" DOUBLE PRECISION,
ADD COLUMN     "subtitle" TEXT;
