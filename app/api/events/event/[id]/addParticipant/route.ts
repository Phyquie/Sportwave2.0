// /app/api/events/[id]/participants/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
    try {
        const { id } = params; // eventId
        const body = await request.json();
        const { participantIds } = body;

        if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
            return NextResponse.json(
                { error: "participantIds array is required" },
                { status: 400 }
            );
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                participants: {
                    connect: participantIds.map((pid: string) => ({ id: pid })),
                },
            },
            include: { participants: true },
        });

        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Error adding participants:", error);
        return NextResponse.json(
            { error: "Failed to add participants" },
            { status: 500 }
        );
    }
}
