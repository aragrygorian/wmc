/*
  Warnings:

  - A unique constraint covering the columns `[project_id,currency_factor_id]` on the table `project_currency_factor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "project_currency_factor_project_id_currency_factor_id_key" ON "project_currency_factor"("project_id", "currency_factor_id");
