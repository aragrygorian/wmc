-- CreateTable
CREATE TABLE "projects_brands" (
    "project_id" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "projects_brands_pkey" PRIMARY KEY ("project_id","brand_id")
);

-- AddForeignKey
ALTER TABLE "projects_brands" ADD CONSTRAINT "projects_brands_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects_brands" ADD CONSTRAINT "projects_brands_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
