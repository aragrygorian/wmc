-- CreateTable
CREATE TABLE "progressive_claim_attachment_file" (
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
    "progressive_claim_id" INTEGER NOT NULL,

    CONSTRAINT "progressive_claim_attachment_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "progressive_claim_attachment_file" ADD CONSTRAINT "progressive_claim_attachment_file_progressive_claim_id_fkey" FOREIGN KEY ("progressive_claim_id") REFERENCES "progressive_claim"("id") ON DELETE CASCADE ON UPDATE CASCADE;
