// /app/api/teams/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            createdById,
            sport,
            location,
            sportType,
            teamImage,
            memberIds,
        } = body;

        // ✅ Validate required fields
        if (!name || !createdById || !sport || !location || !sportType) {
            return NextResponse.json(
                {
                    error:
                        "Missing required fields: name, createdById, sport, location, sportType",
                },
                { status: 400 }
            );
        }

        const team = await prisma.team.create({
            data: {
                name,
                createdById,
                sport,
                location,
                sportType,
                teamImage: teamImage || null,

                // optional members
                members: memberIds?.length
                    ? {
                        connect: memberIds.map((uid: string) => ({ id: uid })),
                    }
                    : undefined,
            },
            include: {
                createdBy: true,
                members: true,
            },
        });

        return NextResponse.json(team, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json(
            { error: "Failed to create team" },
            { status: 500 }
        );
    }
}
