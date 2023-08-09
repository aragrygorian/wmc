/*
  Warnings:

  - You are about to drop the `sale_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_order_line` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_order_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sale_order" DROP CONSTRAINT "sale_order_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order" DROP CONSTRAINT "sale_order_contact_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order" DROP CONSTRAINT "sale_order_project_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order_line" DROP CONSTRAINT "sale_order_line_product_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order_line" DROP CONSTRAINT "sale_order_line_sale_order_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order_user" DROP CONSTRAINT "sale_order_user_sale_order_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order_user" DROP CONSTRAINT "sale_order_user_user_id_fkey";

-- DropTable
DROP TABLE "sale_order";

-- DropTable
DROP TABLE "sale_order_line";

-- DropTable
DROP TABLE "sale_order_user";

-- CreateTable
CREATE TABLE "sales_order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
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
    "external_notes" TEXT,
    "internal_notes" TEXT,
    "published_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "terms" TEXT,
    "payment_terms" TEXT,
    "subtotal" DOUBLE PRECISION,
    "discount_rate" DOUBLE PRECISION,
    "shipping" DOUBLE PRECISION,
    "tax" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "project_id" INTEGER,
    "company_id" INTEGER,
    "contact_id" INTEGER,

    CONSTRAINT "sales_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_order_line" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "note" TEXT,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "sales_order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "sales_order_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_order_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "sales_order_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "sales_order_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_order_user_sales_order_id_user_id_key" ON "sales_order_user"("sales_order_id", "user_id");

-- AddForeignKey
ALTER TABLE "sales_order" ADD CONSTRAINT "sales_order_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order" ADD CONSTRAINT "sales_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order" ADD CONSTRAINT "sales_order_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_line" ADD CONSTRAINT "sales_order_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_line" ADD CONSTRAINT "sales_order_line_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_user" ADD CONSTRAINT "sales_order_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order_user" ADD CONSTRAINT "sales_order_user_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
