-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "billing_address_city" TEXT,
ADD COLUMN     "billing_address_country" TEXT,
ADD COLUMN     "billing_address_line_1" TEXT,
ADD COLUMN     "billing_address_line_2" TEXT,
ADD COLUMN     "billing_address_postal_code" TEXT,
ADD COLUMN     "is_billing_address_same_as_shipping_address" BOOLEAN,
ADD COLUMN     "shipping_address_city" TEXT,
ADD COLUMN     "shipping_address_country" TEXT,
ADD COLUMN     "shipping_address_line_1" TEXT,
ADD COLUMN     "shipping_address_line_2" TEXT,
ADD COLUMN     "shipping_address_postal_code" TEXT;
