-- CreateTable
CREATE TABLE "progressive_claim" (
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
    "type" TEXT,
    "claim_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "billing_address_line_1" TEXT,
    "billing_address_line_2" TEXT,
    "billing_address_postal_code" TEXT,
    "billing_address_city" TEXT,
    "billing_address_country" TEXT,
    "external_notes" TEXT,
    "internal_notes" TEXT,
    "subtotal" DOUBLE PRECISION,
    "discount_rate" DOUBLE PRECISION,
    "shipping" DOUBLE PRECISION,
    "tax" DOUBLE PRECISION,
    "tax_rate" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "project_id" INTEGER,
    "company_id" INTEGER,
    "contact_id" INTEGER,
    "assignee_id" UUID,

    CONSTRAINT "progressive_claim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progressive_claim_line" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "position" INTEGER,
    "title" TEXT,
    "slug" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "quantity" INTEGER NOT NULL,
    "approved_quantity" INTEGER DEFAULT 0,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "progressive_claim_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "progressive_claim_line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim_line" ADD CONSTRAINT "progressive_claim_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim_line" ADD CONSTRAINT "progressive_claim_line_progressive_claim_id_fkey" FOREIGN KEY ("progressive_claim_id") REFERENCES "progressive_claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
