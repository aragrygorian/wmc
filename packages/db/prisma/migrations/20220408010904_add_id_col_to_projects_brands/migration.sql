/*
  Warnings:

  - The primary key for the `projects_brands` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "projects_brands" DROP CONSTRAINT "projects_brands_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "projects_brands_pkey" PRIMARY KEY ("id");
