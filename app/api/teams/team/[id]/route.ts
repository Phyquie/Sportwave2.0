// /app/api/teams/[id]/members/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

type Params = { params: { id: string } };

export async function POST(request: Request, { params }: Params) {
    try {
        const { id } = params; // teamId
        const body = await request.json();
        const { memberIds } = body;

        if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
            return NextResponse.json(
                { error: "memberIds array is required" },
                { status: 400 }
            );
        }

        const updatedTeam = await prisma.team.update({
            where: { id },
            data: {
                members: {
                    connect: memberIds.map((uid: string) => ({ id: uid })),
                },
            },
            include: {
                createdBy: true,
                members: true,
            },
        });

        return NextResponse.json(updatedTeam, { status: 200 });
    } catch (error) {
        console.error("Error adding members to team:", error);
        return NextResponse.json(
            { error: "Failed to add members to team" },
            { status: 500 }
        );
    }
}
