-- AlterTable
ALTER TABLE "project" ADD COLUMN     "project_group_id" INTEGER;

-- CreateTable
CREATE TABLE "project_group" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "project_group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_project_group_id_fkey" FOREIGN KEY ("project_group_id") REFERENCES "project_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
