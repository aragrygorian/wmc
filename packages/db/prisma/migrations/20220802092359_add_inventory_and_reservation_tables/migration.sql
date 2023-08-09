-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "in" INTEGER NOT NULL DEFAULT 0,
    "out" INTEGER NOT NULL DEFAULT 0,
    "warehouse_product_id" INTEGER NOT NULL,
    "purchase_order_line_id" INTEGER,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "quantity" INTEGER NOT NULL,
    "warehouse_product_id" INTEGER NOT NULL,
    "order_form_line_id" INTEGER NOT NULL,
    "purchase_order_line_id" INTEGER,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reservation_purchase_order_line_id_key" ON "reservation"("purchase_order_line_id");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_purchase_order_line_id_fkey" FOREIGN KEY ("purchase_order_line_id") REFERENCES "purchase_order_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_product_id_fkey" FOREIGN KEY ("warehouse_product_id") REFERENCES "warehouse_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_purchase_order_line_id_fkey" FOREIGN KEY ("purchase_order_line_id") REFERENCES "purchase_order_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_warehouse_product_id_fkey" FOREIGN KEY ("warehouse_product_id") REFERENCES "warehouse_product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_order_form_line_id_fkey" FOREIGN KEY ("order_form_line_id") REFERENCES "order_form_line"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
