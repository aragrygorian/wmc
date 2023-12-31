-- AlterTable
ALTER TABLE "products" ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "company" TEXT,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "depth_mm" INTEGER,
ADD COLUMN     "height_mm" INTEGER,
ADD COLUMN     "hscode" TEXT,
ADD COLUMN     "restock_count" INTEGER,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "stock_count" INTEGER,
ADD COLUMN     "updated_by" TEXT,
ADD COLUMN     "weight_g" DOUBLE PRECISION,
ADD COLUMN     "width_mm" INTEGER;
