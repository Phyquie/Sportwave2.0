import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { eventId, participantId } = body;

        if (!eventId || !participantId) {
            return NextResponse.json(
                { error: "Missing required fields: eventId and participantId" },
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

        // Check if the participant (user) exists
        const participant = await prisma.user.findUnique({
            where: { id: participantId }
        });

        if (!participant) {
            return NextResponse.json(
                { error: "Participant not found" },
                { status: 404 }
            );
        }

        // Add the participant to the event
        await prisma.event.update({
            where: { id: eventId },
            data: {
                participants: {
                    connect: { id: participantId }
                }
            }
        });

        return NextResponse.json({
            success: true,
            message: "Participant added to event successfully"
        });
    } catch (error) {
        console.error("Error adding participant to event:", error);
        return NextResponse.json(
            { error: "Failed to add participant to event" },
            { status: 500 }
        );
    }
}
