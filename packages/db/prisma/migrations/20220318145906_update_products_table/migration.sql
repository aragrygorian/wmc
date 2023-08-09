-- AlterTable
ALTER TABLE "products" ADD COLUMN     "additional_discount_rel" DOUBLE PRECISION,
ADD COLUMN     "billing_price_amount" DOUBLE PRECISION,
ADD COLUMN     "billing_price_currency" DOUBLE PRECISION,
ADD COLUMN     "coefficient" DOUBLE PRECISION,
ADD COLUMN     "country_of_origin" TEXT,
ADD COLUMN     "country_of_supply" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "discount_rel" DOUBLE PRECISION,
ADD COLUMN     "discount_status" TEXT,
ADD COLUMN     "factor" DOUBLE PRECISION,
ADD COLUMN     "foreign_cost_amount" DOUBLE PRECISION,
ADD COLUMN     "foreign_cost_currency" TEXT,
ADD COLUMN     "local_cost_amount" DOUBLE PRECISION,
ADD COLUMN     "local_cost_currency" TEXT,
ADD COLUMN     "margin" DOUBLE PRECISION,
ADD COLUMN     "markup" DOUBLE PRECISION,
ADD COLUMN     "selling_price_amount" DOUBLE PRECISION,
ADD COLUMN     "selling_price_currency" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT;
