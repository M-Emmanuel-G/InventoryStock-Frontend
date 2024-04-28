/*
  Warnings:

  - You are about to drop the column `total_value` on the `Products` table. All the data in the column will be lost.
  - The `cod_product` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `qtd_stock` on the `Products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to drop the column `status` on the `Suppliers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cod_output]` on the table `OutputProducts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OutputProducts_clientsID_key";

-- DropIndex
DROP INDEX "OutputProducts_productID_key";

-- DropIndex
DROP INDEX "Products_cod_product_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "total_value",
DROP COLUMN "cod_product",
ADD COLUMN     "cod_product" SERIAL NOT NULL,
ALTER COLUMN "qtd_stock" SET DEFAULT 0,
ALTER COLUMN "qtd_stock" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Suppliers" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password",
DROP COLUMN "role",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "cod_audit" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "changed" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "OutputProducts_cod_output_key" ON "OutputProducts"("cod_output");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
