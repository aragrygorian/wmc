-- AlterTable
ALTER TABLE "memo" ADD COLUMN     "user_id" UUID;

-- AddForeignKey
ALTER TABLE "memo" ADD CONSTRAINT "memo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
