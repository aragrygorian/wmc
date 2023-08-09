/*
  Warnings:

  - You are about to drop the column `project_id` on the `purchase_order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchase_order" DROP CONSTRAINT "purchase_order_project_id_fkey";

-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "project_id";
