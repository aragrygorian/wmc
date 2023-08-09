-- CreateTable
CREATE TABLE "quotation_attachment_file" (
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
    "quotation_id" INTEGER NOT NULL,

    CONSTRAINT "quotation_attachment_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quotation_attachment_file" ADD CONSTRAINT "quotation_attachment_file_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
