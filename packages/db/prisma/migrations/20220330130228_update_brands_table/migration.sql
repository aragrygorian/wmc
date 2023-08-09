/*
  Warnings:

  - You are about to drop the column `coefficient` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `factor` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `margin` on the `brands` table. All the data in the column will be lost.
  - You are about to drop the column `markup` on the `brands` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "brands" DROP COLUMN "coefficient",
DROP COLUMN "factor",
DROP COLUMN "margin",
DROP COLUMN "markup",
ADD COLUMN     "coefficient_rate" DOUBLE PRECISION,
ADD COLUMN     "factor_rate" DOUBLE PRECISION,
ADD COLUMN     "margin_rate" DOUBLE PRECISION,
ADD COLUMN     "markup_rate" DOUBLE PRECISION;
