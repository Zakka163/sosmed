/*
  Warnings:

  - You are about to drop the column `no` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "no",
ADD COLUMN     "nomor" SERIAL NOT NULL;
