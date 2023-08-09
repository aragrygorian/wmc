-- AlterTable
ALTER TABLE "quotation" ADD COLUMN     "payment_terms" TEXT,
ADD COLUMN     "published_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "terms" TEXT;
