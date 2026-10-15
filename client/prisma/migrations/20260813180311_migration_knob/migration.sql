/*
  Warnings:

  - Changed the type of `type` on the `lock` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LockType" AS ENUM ('cylinder', 'suvaldny', 'cylinder_suvaldny', 'suvaldny_cylinder', 'code');

-- AlterTable
ALTER TABLE "lock" DROP COLUMN "type",
ADD COLUMN     "type" "LockType" NOT NULL;

-- CreateTable
CREATE TABLE "knob" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "knob_pkey" PRIMARY KEY ("id")
);
