-- DropForeignKey
ALTER TABLE "invoice_line" DROP CONSTRAINT "invoice_line_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_user" DROP CONSTRAINT "invoice_user_invoice_id_fkey";

-- CreateTable
CREATE TABLE "invoice_payment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID,
    "updated_by" UUID,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "paid_at" TIMESTAMP(3) NOT NULL,
    "paid_to" TEXT NOT NULL,
    "note" TEXT,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "invoice_payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoice_line" ADD CONSTRAINT "invoice_line_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_user" ADD CONSTRAINT "invoice_user_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_payment" ADD CONSTRAINT "invoice_payment_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
