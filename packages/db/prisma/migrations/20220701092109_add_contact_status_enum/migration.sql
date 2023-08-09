/*
  Warnings:

  - The `status` column on the `contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('New', 'Unqualified', 'Qualified', 'Buyer');

-- AlterTable
ALTER TABLE "contact" DROP COLUMN "status",
ADD COLUMN     "status" "ContactStatus";
