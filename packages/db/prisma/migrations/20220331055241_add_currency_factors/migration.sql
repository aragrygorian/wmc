-- CreateTable
CREATE TABLE "currency_factors" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "factor_rate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "currency_factors_pkey" PRIMARY KEY ("id")
);
