/*
  Warnings:

  - You are about to drop the column `supplier_invoices` on the `company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "supplier_invoices";

-- CreateTable
CREATE TABLE "sale_order" (
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

    CONSTRAINT "sale_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_order_line" (
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
    "sale_order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "sale_order_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_order_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "sale_order_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "sale_order_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
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

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_line" (
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
    "purchase_order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "purchase_order_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_order_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "purchase_order_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "purchase_order_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_order" (
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

    CONSTRAINT "delivery_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_order_line" (
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
    "delivery_order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "delivery_order_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_order_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "delivery_order_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "delivery_order_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
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

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_line" (
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
    "invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "invoice_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "invoice_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_invoice" (
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

    CONSTRAINT "supplier_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_invoice_line" (
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
    "supplier_invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "supplier_invoice_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_invoice_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "supplier_invoice_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "supplier_invoice_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_note" (
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

    CONSTRAINT "credit_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_note_line" (
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
    "credit_note_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "credit_note_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_note_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "credit_note_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "credit_note_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debit_note" (
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

    CONSTRAINT "debit_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debit_note_line" (
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
    "debit_note_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "debit_note_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "debit_note_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "debit_note_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "debit_note_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_return_note" (
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

    CONSTRAINT "goods_return_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_return_note_line" (
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
    "goods_return_note_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "goods_return_note_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goods_return_note_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "goods_return_note_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "goods_return_note_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_form" (
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

    CONSTRAINT "loan_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_form_line" (
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
    "loan_form_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "loan_form_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan_form_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "loan_form_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "loan_form_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale_order_user_sale_order_id_user_id_key" ON "sale_order_user"("sale_order_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_order_user_purchase_order_id_user_id_key" ON "purchase_order_user"("purchase_order_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_order_user_delivery_order_id_user_id_key" ON "delivery_order_user"("delivery_order_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_user_invoice_id_user_id_key" ON "invoice_user"("invoice_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_invoice_user_supplier_invoice_id_user_id_key" ON "supplier_invoice_user"("supplier_invoice_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "credit_note_user_credit_note_id_user_id_key" ON "credit_note_user"("credit_note_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "debit_note_user_debit_note_id_user_id_key" ON "debit_note_user"("debit_note_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "goods_return_note_user_goods_return_note_id_user_id_key" ON "goods_return_note_user"("goods_return_note_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "loan_form_user_loan_form_id_user_id_key" ON "loan_form_user"("loan_form_id", "user_id");

-- AddForeignKey
ALTER TABLE "sale_order" ADD CONSTRAINT "sale_order_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order" ADD CONSTRAINT "sale_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order" ADD CONSTRAINT "sale_order_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_sale_order_id_fkey" FOREIGN KEY ("sale_order_id") REFERENCES "sale_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_user" ADD CONSTRAINT "sale_order_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_user" ADD CONSTRAINT "sale_order_user_sale_order_id_fkey" FOREIGN KEY ("sale_order_id") REFERENCES "sale_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_line" ADD CONSTRAINT "purchase_order_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_line" ADD CONSTRAINT "purchase_order_line_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_user" ADD CONSTRAINT "purchase_order_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order_user" ADD CONSTRAINT "purchase_order_user_purchase_order_id_fkey" FOREIGN KEY ("purchase_order_id") REFERENCES "purchase_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order_line" ADD CONSTRAINT "delivery_order_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order_line" ADD CONSTRAINT "delivery_order_line_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order_user" ADD CONSTRAINT "delivery_order_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order_user" ADD CONSTRAINT "delivery_order_user_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_user" ADD CONSTRAINT "invoice_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_user" ADD CONSTRAINT "invoice_user_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice" ADD CONSTRAINT "supplier_invoice_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice" ADD CONSTRAINT "supplier_invoice_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice" ADD CONSTRAINT "supplier_invoice_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_line" ADD CONSTRAINT "supplier_invoice_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_line" ADD CONSTRAINT "supplier_invoice_line_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_user" ADD CONSTRAINT "supplier_invoice_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice_user" ADD CONSTRAINT "supplier_invoice_user_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_line" ADD CONSTRAINT "credit_note_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_line" ADD CONSTRAINT "credit_note_line_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "credit_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_user" ADD CONSTRAINT "credit_note_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_user" ADD CONSTRAINT "credit_note_user_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "credit_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note_line" ADD CONSTRAINT "debit_note_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note_line" ADD CONSTRAINT "debit_note_line_debit_note_id_fkey" FOREIGN KEY ("debit_note_id") REFERENCES "debit_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note_user" ADD CONSTRAINT "debit_note_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note_user" ADD CONSTRAINT "debit_note_user_debit_note_id_fkey" FOREIGN KEY ("debit_note_id") REFERENCES "debit_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note_line" ADD CONSTRAINT "goods_return_note_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note_line" ADD CONSTRAINT "goods_return_note_line_goods_return_note_id_fkey" FOREIGN KEY ("goods_return_note_id") REFERENCES "goods_return_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note_user" ADD CONSTRAINT "goods_return_note_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note_user" ADD CONSTRAINT "goods_return_note_user_goods_return_note_id_fkey" FOREIGN KEY ("goods_return_note_id") REFERENCES "goods_return_note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form" ADD CONSTRAINT "loan_form_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form" ADD CONSTRAINT "loan_form_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form" ADD CONSTRAINT "loan_form_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_loan_form_id_fkey" FOREIGN KEY ("loan_form_id") REFERENCES "loan_form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_user" ADD CONSTRAINT "loan_form_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_user" ADD CONSTRAINT "loan_form_user_loan_form_id_fkey" FOREIGN KEY ("loan_form_id") REFERENCES "loan_form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
