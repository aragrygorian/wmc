-- CreateTable
CREATE TABLE "company_brand" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "company_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "discount_rate" DOUBLE PRECISION,

    CONSTRAINT "company_brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_brand_company_id_brand_id_key" ON "company_brand"("company_id", "brand_id");

-- AddForeignKey
ALTER TABLE "company_brand" ADD CONSTRAINT "company_brand_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_brand" ADD CONSTRAINT "company_brand_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
