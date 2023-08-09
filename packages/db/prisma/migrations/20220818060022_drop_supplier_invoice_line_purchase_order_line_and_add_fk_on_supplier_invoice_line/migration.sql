/*
  Warnings:

  - You are about to drop the `supplier_invoice_line_purchase_order_line` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `purchase_order_line_id` to the `supplier_invoice_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "supplier_invoice_line_purchase_order_line" DROP CONSTRAINT "supplier_invoice_line_purchase_order_line_purchase_order_l_fkey";

-- DropForeignKey
ALTER TABLE "supplier_invoice_line_purchase_order_line" DROP CONSTRAINT "supplier_invoice_line_purchase_order_line_supplier_invoice_fkey";

-- AlterTable
ALTER TABLE "supplier_invoice_line" ADD COLUMN     "purchase_order_line_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "supplier_invoice_line_purchase_order_line";

-- AddForeignKey
ALTER TABLE "supplier_invoice_line" ADD CONSTRAINT "supplier_invoice_line_purchase_order_line_id_fkey" FOREIGN KEY ("purchase_order_line_id") REFERENCES "purchase_order_line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
