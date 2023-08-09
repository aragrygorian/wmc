-- DropForeignKey
ALTER TABLE "loan_form_line" DROP CONSTRAINT "loan_form_line_loan_form_id_fkey";

-- DropForeignKey
ALTER TABLE "loan_form_line" DROP CONSTRAINT "loan_form_line_product_id_fkey";

-- DropForeignKey
ALTER TABLE "loan_form_line" DROP CONSTRAINT "loan_form_line_warehouse_id_fkey";

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_loan_form_id_fkey" FOREIGN KEY ("loan_form_id") REFERENCES "loan_form"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form_line" ADD CONSTRAINT "loan_form_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
