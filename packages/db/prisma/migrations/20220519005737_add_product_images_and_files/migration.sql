-- AlterTable
ALTER TABLE "product" ADD COLUMN     "avatar_alt" TEXT,
ADD COLUMN     "avatar_src" TEXT;

-- CreateTable
CREATE TABLE "product_gallery_image" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_gallery_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_spec_image" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_spec_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_spec_file" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_spec_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_gallery_image" ADD CONSTRAINT "product_gallery_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_spec_image" ADD CONSTRAINT "product_spec_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_spec_file" ADD CONSTRAINT "product_spec_file_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
