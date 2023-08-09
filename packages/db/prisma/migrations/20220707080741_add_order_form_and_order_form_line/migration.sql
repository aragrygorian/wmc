-- CreateTable
CREATE TABLE "order_form" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "due_at" TIMESTAMP(3),
    "company_id" INTEGER,
    "sales_order_id" INTEGER,

    CONSTRAINT "order_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_form_line" (
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
    "note" TEXT,
    "quantity" INTEGER NOT NULL,
    "order_form_id" INTEGER,
    "product_id" INTEGER,

    CONSTRAINT "order_form_line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_form" ADD CONSTRAINT "order_form_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "sales_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_form" ADD CONSTRAINT "order_form_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_form_line" ADD CONSTRAINT "order_form_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_form_line" ADD CONSTRAINT "order_form_line_order_form_id_fkey" FOREIGN KEY ("order_form_id") REFERENCES "order_form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
