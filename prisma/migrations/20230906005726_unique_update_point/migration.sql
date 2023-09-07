/*
  Warnings:

  - A unique constraint covering the columns `[id,updateId]` on the table `UpdatePoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UpdatePoint_id_updateId_key" ON "UpdatePoint"("id", "updateId");
