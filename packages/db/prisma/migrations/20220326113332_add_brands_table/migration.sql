/*
  Warnings:

  - You are about to drop the column `brands` on the `companys` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companys" DROP COLUMN "brands";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "company",
ADD COLUMN     "brand_id" INTEGER;

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "code" TEXT,
    "currency" TEXT,
    "is_auto_round_up" BOOLEAN,
    "coefficient" DOUBLE PRECISION,
    "factor" DOUBLE PRECISION,
    "markup" DOUBLE PRECISION,
    "margin" DOUBLE PRECISION,
    "discount_rel" DOUBLE PRECISION,
    "additional_discount_rel" DOUBLE PRECISION,
    "company_id" INTEGER,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
