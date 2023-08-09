-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('warehouse_staff', 'driver', 'salesperson', 'admin', 'procurement_officer', 'sales_manager', 'finance_manager');

-- AlterTable
ALTER TABLE "role" ADD COLUMN     "type" "RoleType";
