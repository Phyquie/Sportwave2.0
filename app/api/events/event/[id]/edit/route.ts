import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// adjust import path if needed

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const {
            id,
            name,
            eventType,
            date,
            location,
            description,
            images,
            sportType,
            participantIds,
            teamIds,
        } = body;

        // ✅ Validate event ID
        if (!id) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }

        // ✅ Check event exists
        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                // Update only if provided, otherwise keep old value
                name: name ?? existingEvent.name,
                eventType: eventType ?? existingEvent.eventType,
                date: date ? new Date(date) : existingEvent.date,
                location: location ?? existingEvent.location,
                description: description ?? existingEvent.description,
                images: images ?? existingEvent.images,
                sportType: sportType ?? existingEvent.sportType,

                // Relations update
                participants: participantIds
                    ? {
                        set: participantIds.map((id: string) => ({ id })),
                    }
                    : undefined,

                teams: teamIds
                    ? {
                        deleteMany: {}, // remove all existing team links
                        create: teamIds.map((teamId: string) => ({
                            team: { connect: { id: teamId } },
                        })),
                    }
                    : undefined,
            },
            include: {
                participants: true,
                teams: { include: { team: true } },
            },
        });

        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { error: "Failed to update event" },
            { status: 500 }
        );
    }
}
