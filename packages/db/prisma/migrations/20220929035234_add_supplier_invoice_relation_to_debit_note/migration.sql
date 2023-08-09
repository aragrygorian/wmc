-- AlterTable
ALTER TABLE "debit_note" ADD COLUMN     "supplier_invoice_id" INTEGER;

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
