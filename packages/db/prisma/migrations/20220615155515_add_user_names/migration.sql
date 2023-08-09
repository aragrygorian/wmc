-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "full_name" TEXT,
ADD COLUMN     "last_name" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "mobile" TEXT;
