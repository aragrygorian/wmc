/*
  Warnings:

  - Added the required column `warehouse_id` to the `loan_form_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "loan_form_line" ADD COLUMN     "warehouse_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
