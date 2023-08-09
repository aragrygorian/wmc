/*
  Warnings:

  - You are about to drop the column `order_form_line_id` on the `delivery_order_line` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "delivery_order_line" DROP CONSTRAINT "delivery_order_line_order_form_line_id_fkey";

-- DropIndex
DROP INDEX "delivery_order_line_order_form_line_id_key";

-- AlterTable
ALTER TABLE "delivery_order_line" DROP COLUMN "order_form_line_id";
