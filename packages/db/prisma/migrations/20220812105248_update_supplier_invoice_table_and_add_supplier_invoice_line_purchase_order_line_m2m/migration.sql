/*
  Warnings:

  - You are about to drop the column `billing_address_city` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address_country` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address_line_1` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address_line_2` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `billing_address_postal_code` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `discount_rate` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `is_billing_address_same_as_shipping_address` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `payment_terms` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_city` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_country` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_line_1` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_line_2` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_postal_code` on the `supplier_invoice` table. All the data in the column will be lost.
  - You are about to drop the column `terms` on the `supplier_invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "supplier_invoice" DROP COLUMN "billing_address_city",
DROP COLUMN "billing_address_country",
DROP COLUMN "billing_address_line_1",
DROP COLUMN "billing_address_line_2",
DROP COLUMN "billing_address_postal_code",
DROP COLUMN "discount_rate",
DROP COLUMN "is_billing_address_same_as_shipping_address",
DROP COLUMN "payment_terms",
DROP COLUMN "published_at",
DROP COLUMN "shipping",
DROP COLUMN "shipping_address_city",
DROP COLUMN "shipping_address_country",
DROP COLUMN "shipping_address_line_1",
DROP COLUMN "shipping_address_line_2",
DROP COLUMN "shipping_address_postal_code",
DROP COLUMN "terms";

-- AlterTable
ALTER TABLE "supplier_invoice_line" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- CreateTable
CREATE TABLE "supplier_invoice_line_purchase_order_line" (
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "supplier_invoice_line_id" INTEGER NOT NULL,
    "purchase_order_line_id" INTEGER NOT NULL,

    CONSTRAINT "supplier_invoice_line_purchase_order_line_pkey" PRIMARY KEY ("supplier_invoice_line_id","purchase_order_line_id")
);

-- AddForeignKey
ALTER TABLE "supplier_invoice_line_purchase_order_line" ADD CONSTRAINT "supplier_invoice_line_purchase_order_line_purchase_order_l_fkey" FOREIGN KEY ("purchase_order_line_id") REFERENCES "purchase_order_line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_line_purchase_order_line" ADD CONSTRAINT "supplier_invoice_line_purchase_order_line_supplier_invoice_fkey" FOREIGN KEY ("supplier_invoice_line_id") REFERENCES "supplier_invoice_line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
