-- AlterTable
ALTER TABLE "supplier_invoice" ADD COLUMN     "billing_address_city" TEXT,
ADD COLUMN     "billing_address_country" TEXT,
ADD COLUMN     "billing_address_line_1" TEXT,
ADD COLUMN     "billing_address_line_2" TEXT,
ADD COLUMN     "billing_address_postal_code" TEXT;
