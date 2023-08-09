/*
  Warnings:

  - Added the required column `sales_order_line_id` to the `progressive_claim_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "progressive_claim_line" ADD COLUMN     "sales_order_line_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "progressive_claim_line" ADD CONSTRAINT "progressive_claim_line_sales_order_line_id_fkey" FOREIGN KEY ("sales_order_line_id") REFERENCES "sales_order_line"("id") ON DELETE CASCADE ON UPDATE CASCADE;
