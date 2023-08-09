-- CreateTable
CREATE TABLE "supplier_invoice_payment" (
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
    "supplier_invoice_id" INTEGER NOT NULL,

    CONSTRAINT "supplier_invoice_payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "supplier_invoice_payment" ADD CONSTRAINT "supplier_invoice_payment_supplier_invoice_id_fkey" FOREIGN KEY ("supplier_invoice_id") REFERENCES "supplier_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
