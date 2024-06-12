/*
  Warnings:

  - A unique constraint covering the columns `[cod_product]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Products_cod_product_key" ON "Products"("cod_product");
