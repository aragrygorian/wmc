-- CreateTable
CREATE TABLE "quotation_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "quotation_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "quotation_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quotation_user_quotation_id_user_id_key" ON "quotation_user"("quotation_id", "user_id");

-- AddForeignKey
ALTER TABLE "quotation_user" ADD CONSTRAINT "quotation_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotation_user" ADD CONSTRAINT "quotation_user_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
