-- CreateTable
CREATE TABLE "warehouse" (
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
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "address_postal_code" TEXT,
    "address_city" TEXT,
    "address_country" TEXT,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("id")
);
