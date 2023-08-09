/*
  Warnings:

  - You are about to drop the column `assignee_id` on the `progressive_claim` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "progressive_claim" DROP CONSTRAINT "progressive_claim_assignee_id_fkey";

-- AlterTable
ALTER TABLE "progressive_claim" DROP COLUMN "assignee_id",
ADD COLUMN     "user_id" UUID;

-- AddForeignKey
ALTER TABLE "progressive_claim" ADD CONSTRAINT "progressive_claim_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
