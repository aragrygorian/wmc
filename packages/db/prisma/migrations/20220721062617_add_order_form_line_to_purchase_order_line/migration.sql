/*
  Warnings:

  - A unique constraint covering the columns `[order_form_line_id]` on the table `purchase_order_line` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "purchase_order_line" DROP CONSTRAINT "purchase_order_line_product_id_fkey";

-- AlterTable
ALTER TABLE "purchase_order_line" ADD COLUMN     "order_form_line_id" INTEGER,
ALTER COLUMN "product_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_line_order_form_line_id_key" ON "purchase_order_line"("order_form_line_id");

-- AddForeignKey
ALTER TABLE "purchase_order_line" ADD CONSTRAINT "purchase_order_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_line" ADD CONSTRAINT "purchase_order_line_order_form_line_id_fkey" FOREIGN KEY ("order_form_line_id") REFERENCES "order_form_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;
