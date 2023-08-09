/*
  Warnings:

  - The `created_by` column on the `brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `contact` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `currency_factor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `currency_factor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `user_id` on the `feedback` table. All the data in the column will be lost.
  - The `created_by` column on the `feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `feedback` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `project_brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `project_brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `created_by` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_by` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "brand" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "category" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "company" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "contact" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "currency_factor" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "feedback" DROP COLUMN "user_id",
DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "project_brand" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "created_by",
ADD COLUMN     "created_by" UUID,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" UUID;
