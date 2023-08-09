-- DropForeignKey
ALTER TABLE "credit_note_line" DROP CONSTRAINT "credit_note_line_product_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_line" DROP CONSTRAINT "invoice_line_product_id_fkey";

-- AlterTable
ALTER TABLE "credit_note_line" ALTER COLUMN "product_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invoice_line" ALTER COLUMN "product_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_line" ADD CONSTRAINT "credit_note_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
