-- CreateTable
CREATE TABLE "project_product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "project_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "coefficient_rate" DOUBLE PRECISION,
    "markup_rate" DOUBLE PRECISION,
    "margin_rate" DOUBLE PRECISION,
    "discount_rate" DOUBLE PRECISION,
    "additional_discount_rate" DOUBLE PRECISION,
    "company_discount_rate" DOUBLE PRECISION,
    "handling_rate" DOUBLE PRECISION,
    "is_roundup_to_nearest_dollar" BOOLEAN,

    CONSTRAINT "project_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_product_project_id_product_id_key" ON "project_product"("project_id", "product_id");

-- AddForeignKey
ALTER TABLE "project_product" ADD CONSTRAINT "project_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_product" ADD CONSTRAINT "project_product_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
