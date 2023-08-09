-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "external_notes" TEXT,
ADD COLUMN     "internal_notes" TEXT,
ADD COLUMN     "shipping" DOUBLE PRECISION,
ADD COLUMN     "subtotal" DOUBLE PRECISION,
ADD COLUMN     "tax" DOUBLE PRECISION,
ADD COLUMN     "total" DOUBLE PRECISION;
