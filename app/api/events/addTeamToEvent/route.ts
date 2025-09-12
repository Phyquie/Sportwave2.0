import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventId, teamId } = body;

        if (!eventId || !teamId) {
            return NextResponse.json(
                { error: "Missing required fields: eventId and teamId" },
                { status: 400 }
            );
        }

        // Check if the event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Check if the team exists
        const team = await prisma.team.findUnique({
            where: { id: teamId }
        });

        if (!team) {
            return NextResponse.json(
                { error: "Team not found" },
                { status: 404 }
            );
        }

        // Create an EventTeam relationship
        // Using raw SQL as a workaround since we're encountering issues with Prisma client
        await prisma.$executeRaw`
      INSERT INTO "EventTeam" ("eventId", "teamId")
      VALUES (${eventId}, ${teamId})
      ON CONFLICT ("eventId", "teamId") DO NOTHING
    `;

        return NextResponse.json({
            success: true,
            message: "Team added to event successfully"
        });
    } catch (error) {
        console.error("Error adding team to event:", error);
        return NextResponse.json(
            { error: "Failed to add team to event" },
            { status: 500 }
        );
    }
}
