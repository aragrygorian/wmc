-- DropForeignKey
ALTER TABLE "delivery_instruction" DROP CONSTRAINT "delivery_instruction_delivery_order_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_instruction_line" DROP CONSTRAINT "delivery_instruction_line_delivery_instruction_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_order_line" DROP CONSTRAINT "delivery_order_line_delivery_order_id_fkey";

-- DropForeignKey
ALTER TABLE "delivery_order_user" DROP CONSTRAINT "delivery_order_user_delivery_order_id_fkey";

-- AddForeignKey
ALTER TABLE "delivery_order_line" ADD CONSTRAINT "delivery_order_line_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_order_user" ADD CONSTRAINT "delivery_order_user_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_instruction" ADD CONSTRAINT "delivery_instruction_delivery_order_id_fkey" FOREIGN KEY ("delivery_order_id") REFERENCES "delivery_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_instruction_line" ADD CONSTRAINT "delivery_instruction_line_delivery_instruction_id_fkey" FOREIGN KEY ("delivery_instruction_id") REFERENCES "delivery_instruction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
