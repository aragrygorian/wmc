-- AlterTable
ALTER TABLE "progressive_claim" ADD COLUMN     "sales_order_id" INTEGER;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
