import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            createdById,
            eventType,
            date,
            location,
            description,
            images,
            sportType,
            teamIds,
            participantIds
        } = body;

        if (!name || !createdById || !date || !location || !sportType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create the event
        const event = await prisma.event.create({
            data: {
                name,
                createdById,
                eventType: eventType || "soloEvent",
                date: new Date(date),
                location,
                description,
                images: images || [],
                sportType,
                participants: participantIds ? {
                    connect: participantIds.map((id: string) => ({ id }))
                } : undefined
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
