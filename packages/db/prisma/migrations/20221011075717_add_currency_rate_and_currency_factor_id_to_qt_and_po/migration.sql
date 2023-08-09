-- AlterTable
ALTER TABLE "purchase_order" ADD COLUMN     "currency_factor_id" INTEGER,
ADD COLUMN     "currency_rate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "currency_factor_id" INTEGER,
ADD COLUMN     "currency_rate" DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "quotation" ADD CONSTRAINT "quotation_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
