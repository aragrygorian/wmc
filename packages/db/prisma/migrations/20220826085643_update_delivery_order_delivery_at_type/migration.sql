-- AlterTable
ALTER TABLE "delivery_order" ALTER COLUMN "delivery_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "delivery_at" SET DATA TYPE TIMESTAMPTZ;
