/*
  Warnings:

  - You are about to drop the column `command_id` on the `commands` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commands" DROP CONSTRAINT "commands_command_id_fkey";

-- AlterTable
ALTER TABLE "commands" DROP COLUMN "command_id";

-- AddForeignKey
ALTER TABLE "commands" ADD CONSTRAINT "commands_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "commands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
