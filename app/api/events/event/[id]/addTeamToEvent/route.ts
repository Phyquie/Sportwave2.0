// /app/api/events/[id]/teams/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
    try {
        const { id } = params; // eventId
        const body = await request.json();
        const { teamIds } = body;

        if (!teamIds || !Array.isArray(teamIds) || teamIds.length === 0) {
            return NextResponse.json(
                { error: "teamIds array is required" },
                { status: 400 }
            );
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                teams: {
                    create: teamIds.map((tid: string) => ({
                        team: { connect: { id: tid } },
                    })),
                },
            },
            include: {
                teams: { include: { team: true } },
            },
        });

        return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
        console.error("Error adding teams:", error);
        return NextResponse.json(
            { error: "Failed to add teams" },
            { status: 500 }
        );
    }
}
