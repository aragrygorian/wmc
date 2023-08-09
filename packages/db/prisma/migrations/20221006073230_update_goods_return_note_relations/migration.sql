-- AlterTable
ALTER TABLE "goods_return_note" ADD COLUMN     "invoice_id" INTEGER,
ADD COLUMN     "warehouse_id" INTEGER;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
