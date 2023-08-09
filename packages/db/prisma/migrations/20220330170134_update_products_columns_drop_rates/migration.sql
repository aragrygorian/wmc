/*
  Warnings:

  - You are about to drop the column `additional_discount_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `coefficient_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discount_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `factor_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `margin_rate` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `markup_rate` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "additional_discount_rate",
DROP COLUMN "coefficient_rate",
DROP COLUMN "discount_rate",
DROP COLUMN "factor_rate",
DROP COLUMN "margin_rate",
DROP COLUMN "markup_rate";
