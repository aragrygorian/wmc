-- CreateTable
CREATE TABLE "delivery_instruction" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "counter" INTEGER,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "pick_up_at" TIMESTAMPTZ,
    "delivery_order_id" INTEGER,
    "warehouse_id" INTEGER NOT NULL,

    CONSTRAINT "delivery_instruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_instruction_line" (
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
    "note" TEXT,
    "delivery_instruction_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "delivery_instruction_line_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "delivery_instruction" ADD CONSTRAINT "delivery_instruction_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_instruction" ADD CONSTRAINT "delivery_instruction_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_instruction_line" ADD CONSTRAINT "delivery_instruction_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_instruction_line" ADD CONSTRAINT "delivery_instruction_line_delivery_instruction_id_fkey" FOREIGN KEY ("delivery_instruction_id") REFERENCES "delivery_instruction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
