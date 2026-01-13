-- CreateTable
CREATE TABLE "DoorModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "outside" TEXT,
    "inside" TEXT,
    "isDouble" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoorModel_pkey" PRIMARY KEY ("id")
);
