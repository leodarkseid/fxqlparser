-- CreateTable
CREATE TABLE "TransactionPool" (
    "id" TEXT NOT NULL,
    "sourceCurrency" TEXT NOT NULL,
    "destinationCurrency" TEXT NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "capAmount" BIGINT NOT NULL,

    CONSTRAINT "TransactionPool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPool_id_key" ON "TransactionPool"("id");
