/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "avatar_alt" TEXT,
ADD COLUMN     "avatar_src" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar_url";

-- CreateTable
CREATE TABLE "memo" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "title" TEXT,
    "content" TEXT,
    "priority" TEXT,
    "lat" TEXT,
    "lng" TEXT,
    "contact_id" INTEGER,
    "project_id" INTEGER,

    CONSTRAINT "memo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "memo" ADD CONSTRAINT "memo_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memo" ADD CONSTRAINT "memo_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
