/*
  Warnings:

  - Added the required column `project_currency_factor_id` to the `project_brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_brand" ADD COLUMN     "project_currency_factor_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "project_brand" ADD CONSTRAINT "project_brand_project_currency_factor_id_fkey" FOREIGN KEY ("project_currency_factor_id") REFERENCES "project_currency_factor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
