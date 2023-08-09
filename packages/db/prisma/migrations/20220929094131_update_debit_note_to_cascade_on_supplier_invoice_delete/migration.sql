-- DropForeignKey
ALTER TABLE "debit_note" DROP CONSTRAINT "debit_note_supplier_invoice_id_fkey";

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
