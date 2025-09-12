import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            createdById,
            memberIds,
            sport,
            location,
            teamImage,
            sportType
        } = body;

        if (!name || !createdById || !sport || !location || !sportType) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create the team
        const team = await prisma.team.create({
            data: {
                name,
                createdById,
                sport,
                location,
                teamImage,
                sportType,
                members: memberIds ? {
                    connect: memberIds.map((id: string) => ({ id }))
                } : undefined
            },
        });

        return NextResponse.json(team);
    } catch (error) {
        console.error("Error creating team:", error);
        return NextResponse.json(
            { error: "Failed to create team" },
            { status: 500 }
        );
    }
}