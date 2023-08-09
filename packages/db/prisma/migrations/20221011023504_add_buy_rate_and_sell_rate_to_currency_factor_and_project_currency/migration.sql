/*
  Warnings:

  - You are about to drop the column `factor_rate` on the `currency_factor` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `project_currency` table. All the data in the column will be lost.
  - Added the required column `buy_rate` to the `currency_factor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sell_rate` to the `currency_factor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buy_rate` to the `project_currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sell_rate` to the `project_currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "currency_factor" DROP COLUMN "factor_rate",
ADD COLUMN     "buy_rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sell_rate" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "project_currency" DROP COLUMN "rate",
ADD COLUMN     "buy_rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sell_rate" DOUBLE PRECISION NOT NULL;
