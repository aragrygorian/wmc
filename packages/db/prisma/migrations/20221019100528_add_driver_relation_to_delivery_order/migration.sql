-- AlterTable
ALTER TABLE "delivery_order" ADD COLUMN     "driver_id" UUID;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
