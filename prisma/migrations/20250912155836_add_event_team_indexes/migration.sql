/*
  Warnings:

  - You are about to drop the column `teamId` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "teamId";

-- CreateTable
CREATE TABLE "public"."EventTeam" (
    "eventId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "EventTeam_pkey" PRIMARY KEY ("eventId","teamId")
);

-- CreateIndex
CREATE INDEX "EventTeam_eventId_idx" ON "public"."EventTeam"("eventId");

-- CreateIndex
CREATE INDEX "EventTeam_teamId_idx" ON "public"."EventTeam"("teamId");

-- AddForeignKey
ALTER TABLE "public"."EventTeam" ADD CONSTRAINT "EventTeam_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventTeam" ADD CONSTRAINT "EventTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
