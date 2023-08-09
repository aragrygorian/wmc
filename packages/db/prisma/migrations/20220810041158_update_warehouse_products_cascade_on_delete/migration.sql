-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_warehouse_product_id_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_warehouse_product_id_fkey";

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_product_id_fkey" FOREIGN KEY ("warehouse_product_id") REFERENCES "warehouse_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_warehouse_product_id_fkey" FOREIGN KEY ("warehouse_product_id") REFERENCES "warehouse_product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
