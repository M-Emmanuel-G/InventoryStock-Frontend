/*
  Warnings:

  - Changed the type of `qtd_purchase` on the `OutputProducts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "OutputProducts" DROP COLUMN "qtd_purchase",
ADD COLUMN     "qtd_purchase" INTEGER NOT NULL;
