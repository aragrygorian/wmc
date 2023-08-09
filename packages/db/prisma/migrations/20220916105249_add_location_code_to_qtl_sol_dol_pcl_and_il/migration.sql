-- AlterTable
ALTER TABLE "delivery_order_line" ADD COLUMN     "location_code" TEXT;

-- AlterTable
ALTER TABLE "invoice_line" ADD COLUMN     "location_code" TEXT;

-- AlterTable
ALTER TABLE "progressive_claim_line" ADD COLUMN     "location_code" TEXT;

-- AlterTable
ALTER TABLE "quotation_line" ADD COLUMN     "location_code" TEXT;

-- AlterTable
ALTER TABLE "sales_order_line" ADD COLUMN     "location_code" TEXT;
