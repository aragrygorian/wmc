-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_category_id" INTEGER;

-- CreateTable
CREATE TABLE "project_category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,

    CONSTRAINT "project_category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_project_category_id_fkey" FOREIGN KEY ("project_category_id") REFERENCES "project_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
