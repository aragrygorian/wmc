/*
  Warnings:

  - You are about to drop the column `contacts` on the `companys` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companys" DROP COLUMN "contacts";

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "email" TEXT,
    "mobile" TEXT,
    "phone" TEXT,
    "fax" TEXT,
    "website" TEXT,
    "shipping_address_line_1" TEXT,
    "shipping_address_line_2" TEXT,
    "shipping_address_postal_code" TEXT,
    "shipping_address_city" TEXT,
    "shipping_address_country" TEXT,
    "billing_address_line_1" TEXT,
    "billing_address_line_2" TEXT,
    "billing_address_postal_code" TEXT,
    "billing_address_city" TEXT,
    "billing_address_country" TEXT,
    "is_billing_address_same_as_shipping_address" BOOLEAN,
    "company_id" INTEGER,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
