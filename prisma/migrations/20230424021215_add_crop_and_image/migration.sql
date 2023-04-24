/*
  Warnings:

  - The primary key for the `Plant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `planted` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Crop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateSown" DATETIME NOT NULL,
    "notes" TEXT,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "plantId" INTEGER NOT NULL,
    CONSTRAINT "Crop_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CropImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "cropId" INTEGER NOT NULL,
    CONSTRAINT "CropImage_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "markdown" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "daysToMaturity" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Plant" ("createdAt", "markdown", "name", "slug", "updatedAt") SELECT "createdAt", "markdown", "name", "slug", "updatedAt" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
CREATE UNIQUE INDEX "Plant_slug_key" ON "Plant"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
