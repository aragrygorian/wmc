/*
  Warnings:

  - You are about to drop the column `payment_terms` on the `purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `purchase_order` table. All the data in the column will be lost.
  - You are about to drop the column `terms` on the `purchase_order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "purchase_order" DROP COLUMN "payment_terms",
DROP COLUMN "published_at",
DROP COLUMN "terms",
ADD COLUMN     "arrived_at" TIMESTAMPTZ,
ADD COLUMN     "ready_at" TIMESTAMPTZ,
ADD COLUMN     "ship_via" TEXT,
ADD COLUMN     "shipped_at" TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "purchase_order_line" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "slug" DROP NOT NULL;
