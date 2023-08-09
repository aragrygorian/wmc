/*
  Warnings:

  - Added the required column `quantity` to the `quotation_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `quotation_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotation_line" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unit_price" DOUBLE PRECISION NOT NULL;
