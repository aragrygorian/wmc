-- AlterTable
ALTER TABLE "sales_order" ADD COLUMN     "quotation_id" INTEGER;

-- AddForeignKey
ALTER TABLE "sales_order" ADD CONSTRAINT "sales_order_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
