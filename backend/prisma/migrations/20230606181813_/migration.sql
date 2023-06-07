/*
  Warnings:

  - The primary key for the `Note` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `isi` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `penulis` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Note` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Note_id_idx";

-- AlterTable
ALTER TABLE "Note" DROP CONSTRAINT "Note_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "isi",
DROP COLUMN "nama",
DROP COLUMN "penulis",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Note_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Note_id_seq";
