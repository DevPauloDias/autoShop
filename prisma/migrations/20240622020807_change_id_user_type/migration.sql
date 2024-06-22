/*
  Warnings:

  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `veiculos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `propostas` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `year` on the `veiculos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP CONSTRAINT "usuarios_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "usuarios_id_seq";

-- AlterTable
ALTER TABLE "veiculos" DROP CONSTRAINT "veiculos_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL,
ADD CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "veiculos_id_seq";

-- DropTable
DROP TABLE "propostas";

-- CreateTable
CREATE TABLE "anuncio" (
    "id" TEXT NOT NULL,
    "idVehicle" TEXT NOT NULL,
    "idOwner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "anuncio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_idOwner_fkey" FOREIGN KEY ("idOwner") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_idVehicle_fkey" FOREIGN KEY ("idVehicle") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
