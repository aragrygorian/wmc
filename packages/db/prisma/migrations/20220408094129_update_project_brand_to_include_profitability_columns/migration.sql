-- AlterTable
ALTER TABLE "project_brand" ADD COLUMN     "additional_discount_rate" DOUBLE PRECISION,
ADD COLUMN     "coefficient_rate" DOUBLE PRECISION,
ADD COLUMN     "company_discount_rate" DOUBLE PRECISION,
ADD COLUMN     "discount_rate" DOUBLE PRECISION,
ADD COLUMN     "is_roundup_to_nearest_dollar" BOOLEAN,
ADD COLUMN     "margin_rate" DOUBLE PRECISION,
ADD COLUMN     "markup_rate" DOUBLE PRECISION;
