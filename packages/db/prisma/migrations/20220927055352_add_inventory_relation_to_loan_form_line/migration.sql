-- AlterTable
ALTER TABLE "inventory" ADD COLUMN     "loan_form_line_id" INTEGER;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_loan_form_line_id_fkey" FOREIGN KEY ("loan_form_line_id") REFERENCES "loan_form_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;
