/*
  Warnings:

  - You are about to drop the column `additional_discount_rel` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `discount_rel` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `additional_discount_rel` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `coefficient` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discount_rel` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `discount_status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `factor` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `margin` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `markup` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "additional_discount_rel",
DROP COLUMN "discount_rel",
ADD COLUMN     "additional_discount_rate" DOUBLE PRECISION,
ADD COLUMN     "discount_rate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "additional_discount_rel",
DROP COLUMN "coefficient",
DROP COLUMN "discount_rel",
DROP COLUMN "discount_status",
DROP COLUMN "factor",
DROP COLUMN "margin",
DROP COLUMN "markup",
ADD COLUMN     "additional_discount_rate" DOUBLE PRECISION,
ADD COLUMN     "coefficient_rate" DOUBLE PRECISION,
ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "factor_rate" DOUBLE PRECISION,
ADD COLUMN     "margin_rate" DOUBLE PRECISION,
ADD COLUMN     "markup_rate" DOUBLE PRECISION;
