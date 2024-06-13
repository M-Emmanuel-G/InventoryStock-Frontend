/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Clients_cpf_key" ON "Clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");
