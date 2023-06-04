-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "isi" TEXT,
    "penulis" VARCHAR(255) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);
