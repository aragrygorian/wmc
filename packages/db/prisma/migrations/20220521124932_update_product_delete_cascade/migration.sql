-- DropForeignKey
ALTER TABLE "product_gallery_image" DROP CONSTRAINT "product_gallery_image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_spec_file" DROP CONSTRAINT "product_spec_file_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_spec_image" DROP CONSTRAINT "product_spec_image_product_id_fkey";

-- AddForeignKey
ALTER TABLE "product_gallery_image" ADD CONSTRAINT "product_gallery_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_spec_image" ADD CONSTRAINT "product_spec_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_spec_file" ADD CONSTRAINT "product_spec_file_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
