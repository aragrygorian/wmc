/*
  Warnings:

  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_id_fkey";

-- DropForeignKey
ALTER TABLE "prices" DROP CONSTRAINT "prices_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_price_id_fkey";

-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_user_id_fkey";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "plans";

-- DropTable
DROP TABLE "prices";

-- DropTable
DROP TABLE "subscriptions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "customer" (
    "id" UUID NOT NULL,
    "stripe_customer_id" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" TEXT NOT NULL,
    "active" BOOLEAN,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "metadata" JSONB,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT,
    "active" BOOLEAN,
    "unit_amount" BIGINT,
    "currency" TEXT,
    "type" "pricing_type",
    "interval" "pricing_plan_interval",
    "interval_count" INTEGER,
    "trial_period_days" INTEGER,
    "metadata" JSONB,

    CONSTRAINT "price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "status" "subscription_status",
    "metadata" JSONB,
    "price_id" TEXT,
    "quantity" INTEGER,
    "cancel_at_period_end" BOOLEAN,
    "created" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "current_period_start" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "current_period_end" TIMESTAMPTZ(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "ended_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "cancel_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "canceled_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "trial_start" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "trial_end" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,
    "status" TEXT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "full_name" TEXT,
    "avatar_url" TEXT,
    "billing_address" JSONB,
    "payment_method" JSONB,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_id_fkey" FOREIGN KEY ("id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "price" ADD CONSTRAINT "price_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "price"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
