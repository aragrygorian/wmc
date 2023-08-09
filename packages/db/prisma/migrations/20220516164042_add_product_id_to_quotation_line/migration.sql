/*
  Warnings:

  - Added the required column `product_id` to the `quotation_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quotation_line" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "quotation_line" ADD CONSTRAINT "quotation_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
