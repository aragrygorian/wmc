-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "currency_factor_id" INTEGER;

-- AlterTable
ALTER TABLE "companys" ADD COLUMN     "currency" TEXT;

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
