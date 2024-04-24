-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'normal';

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "cod_supplier" SERIAL NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_cod_supplier_key" ON "Suppliers"("cod_supplier");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_cnpj_key" ON "Suppliers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_email_key" ON "Suppliers"("email");
