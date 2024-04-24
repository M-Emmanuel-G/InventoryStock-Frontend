-- CreateTable
CREATE TABLE "ProductEntries" (
    "id" TEXT NOT NULL,
    "cod_entries" SERIAL NOT NULL,
    "qtd" DECIMAL(10,2) NOT NULL,
    "note_value" DECIMAL(10,2) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "date" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,

    CONSTRAINT "ProductEntries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductEntries_cod_entries_key" ON "ProductEntries"("cod_entries");

-- AddForeignKey
ALTER TABLE "ProductEntries" ADD CONSTRAINT "ProductEntries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductEntries" ADD CONSTRAINT "ProductEntries_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
