/*
  Warnings:

  - A unique constraint covering the columns `[cod_reg]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "cod_reg" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Normal';

-- CreateIndex
CREATE UNIQUE INDEX "Users_cod_reg_key" ON "Users"("cod_reg");
