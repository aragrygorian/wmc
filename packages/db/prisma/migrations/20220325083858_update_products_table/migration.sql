-- AlterTable
ALTER TABLE "products" ADD COLUMN     "expiry_date" TIMESTAMP(3),
ADD COLUMN     "is_itemized_commission" BOOLEAN,
ADD COLUMN     "model_code" TEXT,
ADD COLUMN     "model_sub_code" TEXT,
ADD COLUMN     "serial_number" TEXT;
