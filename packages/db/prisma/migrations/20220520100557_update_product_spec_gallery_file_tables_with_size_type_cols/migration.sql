-- AlterTable
ALTER TABLE "product_gallery_image" ADD COLUMN     "size" INTEGER,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "product_spec_file" ADD COLUMN     "size" INTEGER,
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "product_spec_image" ADD COLUMN     "size" INTEGER,
ADD COLUMN     "type" TEXT;
