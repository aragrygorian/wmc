/*
  Warnings:

  - You are about to drop the `brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categorys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `companys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currency_factors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects_brands` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_company_id_fkey";

-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_currency_factor_id_fkey";

-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_company_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "projects_brands" DROP CONSTRAINT "projects_brands_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "projects_brands" DROP CONSTRAINT "projects_brands_project_id_fkey";

-- DropTable
DROP TABLE "brands";

-- DropTable
DROP TABLE "categorys";

-- DropTable
DROP TABLE "companys";

-- DropTable
DROP TABLE "currency_factors";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "projects_brands";

-- CreateTable
CREATE TABLE "product" (
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
    "brand_id" INTEGER,
    "category_id" INTEGER,
    "sku" TEXT,
    "barcode" TEXT,
    "hscode" TEXT,
    "serial_number" TEXT,
    "model_code" TEXT,
    "model_sub_code" TEXT,
    "expiry_date" TIMESTAMP(3),
    "country_of_supply" TEXT,
    "country_of_manufacture" TEXT,
    "country_of_origin" TEXT,
    "width_mm" INTEGER,
    "height_mm" INTEGER,
    "depth_mm" INTEGER,
    "weight_g" DOUBLE PRECISION,
    "color" TEXT,
    "supplier_cost_amount" DOUBLE PRECISION,
    "is_itemized_commission" BOOLEAN,
    "stock_count" INTEGER,
    "restock_count" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
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
    "coefficient_rate" DOUBLE PRECISION,
    "markup_rate" DOUBLE PRECISION,
    "margin_rate" DOUBLE PRECISION,
    "discount_rate" DOUBLE PRECISION,
    "additional_discount_rate" DOUBLE PRECISION,
    "company_discount_rate" DOUBLE PRECISION,
    "is_roundup_to_nearest_dollar" BOOLEAN,
    "company_id" INTEGER,
    "currency_factor_id" INTEGER,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
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

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_brand" (
    "id" SERIAL NOT NULL,
    "project_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "project_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency_factor" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "factor_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "currency_factor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
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

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
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
    "type" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "website" TEXT,
    "shipping_address_line_1" TEXT,
    "shipping_address_line_2" TEXT,
    "shipping_address_postal_code" TEXT,
    "shipping_address_city" TEXT,
    "shipping_address_country" TEXT,
    "billing_address_line_1" TEXT,
    "billing_address_line_2" TEXT,
    "billing_address_postal_code" TEXT,
    "billing_address_city" TEXT,
    "billing_address_country" TEXT,
    "is_billing_address_same_as_shipping_address" BOOLEAN,
    "documents" TEXT,
    "workspace_id" TEXT,
    "projects" TEXT,
    "supplier_invoices" TEXT,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brand" ADD CONSTRAINT "brand_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_brand" ADD CONSTRAINT "project_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_brand" ADD CONSTRAINT "project_brand_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
