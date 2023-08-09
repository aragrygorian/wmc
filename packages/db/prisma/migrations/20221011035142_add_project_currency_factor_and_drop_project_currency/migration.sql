/*
  Warnings:

  - You are about to drop the `project_currency` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "project_currency" DROP CONSTRAINT "project_currency_project_id_fkey";

-- DropTable
DROP TABLE "project_currency";

-- CreateTable
CREATE TABLE "project_currency_factor" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "buy_rate" DOUBLE PRECISION NOT NULL,
    "sell_rate" DOUBLE PRECISION NOT NULL,
    "project_id" INTEGER NOT NULL,
    "currency_factor_id" INTEGER NOT NULL,

    CONSTRAINT "project_currency_factor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_currency_factor" ADD CONSTRAINT "project_currency_factor_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_currency_factor" ADD CONSTRAINT "project_currency_factor_currency_factor_id_fkey" FOREIGN KEY ("currency_factor_id") REFERENCES "currency_factor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
