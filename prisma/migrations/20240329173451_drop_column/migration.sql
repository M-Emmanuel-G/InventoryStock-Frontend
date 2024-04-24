/*
  Warnings:

  - You are about to drop the column `predicted_profit` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "predicted_profit",
ALTER COLUMN "sales_percentage" SET DEFAULT 1.25;
