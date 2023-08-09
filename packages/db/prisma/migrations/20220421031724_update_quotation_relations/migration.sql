-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "company_id" INTEGER,
ADD COLUMN     "contact_id" INTEGER;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
