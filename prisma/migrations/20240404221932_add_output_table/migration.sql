-- CreateTable
CREATE TABLE "OutputProducts" (
    "id" TEXT NOT NULL,
    "cod_output" SERIAL NOT NULL,
    "date_output" TEXT NOT NULL,
    "qtd_purchase" TEXT NOT NULL,
    "clientsID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,

    CONSTRAINT "OutputProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OutputProducts_clientsID_key" ON "OutputProducts"("clientsID");

-- CreateIndex
CREATE UNIQUE INDEX "OutputProducts_productID_key" ON "OutputProducts"("productID");

-- AddForeignKey
ALTER TABLE "OutputProducts" ADD CONSTRAINT "OutputProducts_clientsID_fkey" FOREIGN KEY ("clientsID") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutputProducts" ADD CONSTRAINT "OutputProducts_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
