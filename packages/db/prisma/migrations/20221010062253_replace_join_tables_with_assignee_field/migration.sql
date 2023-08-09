/*
  Warnings:

  - You are about to drop the `debit_note_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `delivery_order_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `goods_return_note_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loan_form_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_form_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_order_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quotation_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales_order_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier_invoice_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "debit_note_user" DROP CONSTRAINT "debit_note_user_debit_note_id_fkey";

-- DropForeignKey
ALTER TABLE "debit_note_user" DROP CONSTRAINT "debit_note_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_order_user" DROP CONSTRAINT "delivery_order_user_delivery_order_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_order_user" DROP CONSTRAINT "delivery_order_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "goods_return_note_user" DROP CONSTRAINT "goods_return_note_user_goods_return_note_id_fkey";

-- DropForeignKey
ALTER TABLE "goods_return_note_user" DROP CONSTRAINT "goods_return_note_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_user" DROP CONSTRAINT "invoice_user_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_user" DROP CONSTRAINT "invoice_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "loan_form_user" DROP CONSTRAINT "loan_form_user_loan_form_id_fkey";

-- DropForeignKey
ALTER TABLE "loan_form_user" DROP CONSTRAINT "loan_form_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "order_form_user" DROP CONSTRAINT "order_form_user_order_form_id_fkey";

-- DropForeignKey
ALTER TABLE "order_form_user" DROP CONSTRAINT "order_form_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order_user" DROP CONSTRAINT "purchase_order_user_purchase_order_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order_user" DROP CONSTRAINT "purchase_order_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "quotation_user" DROP CONSTRAINT "quotation_user_quotation_id_fkey";

-- DropForeignKey
ALTER TABLE "quotation_user" DROP CONSTRAINT "quotation_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sales_order_user" DROP CONSTRAINT "sales_order_user_sales_order_id_fkey";

-- DropForeignKey
ALTER TABLE "sales_order_user" DROP CONSTRAINT "sales_order_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_invoice_user" DROP CONSTRAINT "supplier_invoice_user_supplier_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier_invoice_user" DROP CONSTRAINT "supplier_invoice_user_user_id_fkey";

-- AlterTable
ALTER TABLE "credit_note" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "debit_note" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "delivery_order" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "goods_return_note" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "invoice" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "loan_form" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "order_form" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "progressive_claim" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "sales_order" ADD COLUMN     "assignee_id" UUID;

-- AlterTable
ALTER TABLE "supplier_invoice" ADD COLUMN     "assignee_id" UUID;

-- DropTable
DROP TABLE "debit_note_user";

-- DropTable
DROP TABLE "delivery_order_user";

-- DropTable
DROP TABLE "goods_return_note_user";

-- DropTable
DROP TABLE "invoice_user";

-- DropTable
DROP TABLE "loan_form_user";

-- DropTable
DROP TABLE "order_form_user";

-- DropTable
DROP TABLE "purchase_order_user";

-- DropTable
DROP TABLE "quotation_user";

-- DropTable
DROP TABLE "sales_order_user";

-- DropTable
DROP TABLE "supplier_invoice_user";

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_order" ADD CONSTRAINT "sales_order_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order" ADD CONSTRAINT "delivery_order_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_invoice" ADD CONSTRAINT "supplier_invoice_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "debit_note" ADD CONSTRAINT "debit_note_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goods_return_note" ADD CONSTRAINT "goods_return_note_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan_form" ADD CONSTRAINT "loan_form_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_form" ADD CONSTRAINT "order_form_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
