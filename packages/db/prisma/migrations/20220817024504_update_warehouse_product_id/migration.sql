/*
  Warnings:

  - You are about to drop the column `warehouse_product_id` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `warehouse_product_id` on the `reservation` table. All the data in the column will be lost.
  - The primary key for the `warehouse_product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `warehouse_product` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_warehouse_product_id_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_warehouse_product_id_fkey";

-- DropIndex
DROP INDEX "warehouse_product_warehouse_id_product_id_key";

-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "warehouse_product_id",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "warehouse_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "warehouse_product_id",
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "warehouse_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "warehouse_product" DROP CONSTRAINT "warehouse_product_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "warehouse_product_pkey" PRIMARY KEY ("warehouse_id", "product_id");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_warehouse_id_product_id_fkey" FOREIGN KEY ("warehouse_id", "product_id") REFERENCES "warehouse_product"("warehouse_id", "product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_warehouse_id_product_id_fkey" FOREIGN KEY ("warehouse_id", "product_id") REFERENCES "warehouse_product"("warehouse_id", "product_id") ON DELETE CASCADE ON UPDATE CASCADE;
