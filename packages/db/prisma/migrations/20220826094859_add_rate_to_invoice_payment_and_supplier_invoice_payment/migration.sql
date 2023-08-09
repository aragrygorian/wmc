-- AlterTable
ALTER TABLE "invoice_payment" ADD COLUMN     "rate" DOUBLE PRECISION DEFAULT 1;

-- AlterTable
ALTER TABLE "supplier_invoice_payment" ADD COLUMN     "rate" DOUBLE PRECISION DEFAULT 1;
