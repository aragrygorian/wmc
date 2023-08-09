/*
  Warnings:

  - A unique constraint covering the columns `[order_form_line_id]` on the table `delivery_order_line` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "delivery_order_line" ADD COLUMN     "order_form_line_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "delivery_order_line_order_form_line_id_key" ON "delivery_order_line"("order_form_line_id");

-- AddForeignKey
ALTER TABLE "delivery_order_line" ADD CONSTRAINT "delivery_order_line_order_form_line_id_fkey" FOREIGN KEY ("order_form_line_id") REFERENCES "order_form_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;
