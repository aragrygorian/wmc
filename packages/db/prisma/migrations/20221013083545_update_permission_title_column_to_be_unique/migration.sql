/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `permission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "permission_title_key" ON "permission"("title");
