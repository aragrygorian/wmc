-- AlterTable
ALTER TABLE "credit_note_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "debit_note_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "delivery_order_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "goods_return_note_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "invoice_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "loan_form_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "purchase_order_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "sales_order_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;

-- AlterTable
ALTER TABLE "supplier_invoice_line" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "position" INTEGER;
