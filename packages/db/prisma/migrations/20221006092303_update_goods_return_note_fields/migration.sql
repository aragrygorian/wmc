-- AlterTable
ALTER TABLE "goods_return_note_line" ADD COLUMN     "invoice_line_id" INTEGER,
ADD COLUMN     "location_code" TEXT;

-- AddForeignKey
ALTER TABLE "goods_return_note_line" ADD CONSTRAINT "goods_return_note_line_invoice_line_id_fkey" FOREIGN KEY ("invoice_line_id") REFERENCES "invoice_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;
