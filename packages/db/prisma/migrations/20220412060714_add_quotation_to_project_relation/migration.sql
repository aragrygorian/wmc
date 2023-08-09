-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "project_id" INTEGER;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
