-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "is_discount_rate" BOOLEAN;

-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "is_discount_rate" BOOLEAN;

-- AlterTable
ALTER TABLE "sales_order" ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "is_discount_rate" BOOLEAN;
