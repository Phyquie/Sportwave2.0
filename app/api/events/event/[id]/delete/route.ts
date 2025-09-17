import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
// adjust path if needed

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }

        // ✅ Check event exists
        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });

        if (!existingEvent) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // ✅ Delete related event-team links first
        await prisma.eventTeam.deleteMany({
            where: { eventId: id },
        });

        // ✅ Delete the event
        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Event deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: "Failed to delete event" },
            { status: 500 }
        );
    }
}
