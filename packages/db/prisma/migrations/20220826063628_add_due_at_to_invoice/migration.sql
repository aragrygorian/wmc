/*
  Warnings:

  - You are about to drop the column `published_at` on the `invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "published_at",
ADD COLUMN     "due_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
