/*
  Warnings:

  - You are about to drop the column `discount_rate` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `is_billing_address_same_as_shipping_address` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `payment_terms` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_city` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_country` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_line_1` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_line_2` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_postal_code` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the column `terms` on the `credit_note` table. All the data in the column will be lost.
  - You are about to drop the `credit_note_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invoice_id` to the `credit_note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "credit_note_line" DROP CONSTRAINT "credit_note_line_credit_note_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_note_user" DROP CONSTRAINT "credit_note_user_credit_note_id_fkey";

-- DropForeignKey
ALTER TABLE "credit_note_user" DROP CONSTRAINT "credit_note_user_user_id_fkey";

-- AlterTable
ALTER TABLE "credit_note" DROP COLUMN "discount_rate",
DROP COLUMN "is_billing_address_same_as_shipping_address",
DROP COLUMN "payment_terms",
DROP COLUMN "shipping",
DROP COLUMN "shipping_address_city",
DROP COLUMN "shipping_address_country",
DROP COLUMN "shipping_address_line_1",
DROP COLUMN "shipping_address_line_2",
DROP COLUMN "shipping_address_postal_code",
DROP COLUMN "subtotal",
DROP COLUMN "tax",
DROP COLUMN "terms",
ADD COLUMN     "invoice_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" UUID;

-- AlterTable
ALTER TABLE "credit_note_line" ADD COLUMN     "invoice_line_id" INTEGER,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;

-- DropTable
DROP TABLE "credit_note_user";

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note" ADD CONSTRAINT "credit_note_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_line" ADD CONSTRAINT "credit_note_line_invoice_line_id_fkey" FOREIGN KEY ("invoice_line_id") REFERENCES "invoice_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_note_line" ADD CONSTRAINT "credit_note_line_credit_note_id_fkey" FOREIGN KEY ("credit_note_id") REFERENCES "credit_note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
