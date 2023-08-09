/*
  Warnings:

  - You are about to drop the column `billing_price_amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `billing_price_currency` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `foreign_cost_amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `foreign_cost_currency` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `local_cost_amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `local_cost_currency` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `retail_price_amount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `retail_price_currency` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "billing_price_amount",
DROP COLUMN "billing_price_currency",
DROP COLUMN "foreign_cost_amount",
DROP COLUMN "foreign_cost_currency",
DROP COLUMN "local_cost_amount",
DROP COLUMN "local_cost_currency",
DROP COLUMN "retail_price_amount",
DROP COLUMN "retail_price_currency",
ADD COLUMN     "supplier_cost_amount" DOUBLE PRECISION,
ADD COLUMN     "supplier_cost_currency" TEXT;
