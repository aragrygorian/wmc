/*
  Warnings:

  - Added the required column `project_brand_id` to the `project_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_product" ADD COLUMN     "project_brand_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "project_product" ADD CONSTRAINT "project_product_project_brand_id_fkey" FOREIGN KEY ("project_brand_id") REFERENCES "project_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
