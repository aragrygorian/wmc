-- CreateTable
CREATE TABLE "order_form_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "type" TEXT NOT NULL,
    "order_form_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "order_form_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_form_user_order_form_id_user_id_key" ON "order_form_user"("order_form_id", "user_id");

-- AddForeignKey
ALTER TABLE "order_form_user" ADD CONSTRAINT "order_form_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_form_user" ADD CONSTRAINT "order_form_user_order_form_id_fkey" FOREIGN KEY ("order_form_id") REFERENCES "order_form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
