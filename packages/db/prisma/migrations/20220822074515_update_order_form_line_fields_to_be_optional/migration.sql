-- AlterTable
ALTER TABLE "delivery_order_line" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "unit_price" DROP NOT NULL;
