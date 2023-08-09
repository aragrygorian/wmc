-- AlterTable
ALTER TABLE "delivery_order" ADD COLUMN     "customer_contact" TEXT,
ADD COLUMN     "delivered_on" TIMESTAMPTZ,
ADD COLUMN     "received_by" TEXT;

-- AlterTable
ALTER TABLE "delivery_order_line" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "remark" TEXT;
