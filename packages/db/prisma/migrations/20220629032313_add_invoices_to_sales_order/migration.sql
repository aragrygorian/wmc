-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "sales_order_id" INTEGER;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
