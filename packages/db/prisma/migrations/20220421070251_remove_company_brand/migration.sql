/*
  Warnings:

  - You are about to drop the `company_brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "company_brand" DROP CONSTRAINT "company_brand_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "company_brand" DROP CONSTRAINT "company_brand_company_id_fkey";

-- DropTable
DROP TABLE "company_brand";
