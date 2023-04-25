/*
  Warnings:

  - Added the required column `name` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Crop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dateSown" DATETIME NOT NULL,
    "notes" TEXT,
    "quantity" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plantId" INTEGER NOT NULL,
    CONSTRAINT "Crop_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Crop" ("dateSown", "id", "location", "notes", "plantId", "quantity") SELECT "dateSown", "id", "location", "notes", "plantId", "quantity" FROM "Crop";
DROP TABLE "Crop";
ALTER TABLE "new_Crop" RENAME TO "Crop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
