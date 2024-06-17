/*
  Warnings:

  - You are about to drop the column `available` on the `Clients` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "available",
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT true;
