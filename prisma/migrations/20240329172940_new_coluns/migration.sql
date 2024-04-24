/*
  Warnings:

  - Added the required column `predicted_profit` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sales_percentage` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "predicted_profit" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "sales_percentage" DECIMAL(10,2) NOT NULL;
