/*
  Warnings:

  - A unique constraint covering the columns `[project_id,brand_id]` on the table `project_brand` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_brand_project_id_brand_id_key" ON "project_brand"("project_id", "brand_id");
