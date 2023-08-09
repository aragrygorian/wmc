-- CreateTable
CREATE TABLE "company_file" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "src" TEXT NOT NULL,
    "alt" TEXT,
    "name" TEXT,
    "size" INTEGER,
    "type" TEXT,
    "position" DOUBLE PRECISION,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "company_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_file" ADD CONSTRAINT "company_file_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
