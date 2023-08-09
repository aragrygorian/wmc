-- DropForeignKey
ALTER TABLE "supplier_invoice_line" DROP CONSTRAINT "supplier_invoice_line_supplier_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_invoice_payment" DROP CONSTRAINT "supplier_invoice_payment_supplier_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_invoice_user" DROP CONSTRAINT "supplier_invoice_user_supplier_invoice_id_fkey";

-- AddForeignKey
ALTER TABLE "supplier_invoice_line" ADD CONSTRAINT "supplier_invoice_line_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_user" ADD CONSTRAINT "supplier_invoice_user_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_payment" ADD CONSTRAINT "supplier_invoice_payment_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
