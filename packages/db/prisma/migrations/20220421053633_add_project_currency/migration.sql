-- CreateTable
CREATE TABLE "project_currency" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "project_id" INTEGER,

    CONSTRAINT "project_currency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_currency" ADD CONSTRAINT "project_currency_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
