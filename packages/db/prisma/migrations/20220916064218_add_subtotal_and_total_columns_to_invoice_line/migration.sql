-- AlterTable
ALTER TABLE "invoice_line" ADD COLUMN     "subtotal" DOUBLE PRECISION,
ADD COLUMN     "total" DOUBLE PRECISION,
ALTER COLUMN "unit_price" DROP NOT NULL;
