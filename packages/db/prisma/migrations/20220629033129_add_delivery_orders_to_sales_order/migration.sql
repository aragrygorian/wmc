-- AlterTable
ALTER TABLE "delivery_order" ADD COLUMN     "sales_order_id" INTEGER;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
