// /app/api/events/filter/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            id,             // single eventId
            createdById,    // filter by creator
            eventType,      // "soloEvent" | "teamEvent"
            sportType,      // enum sports
            location,       // match location
            dateFrom,       // filter by start date
            dateTo,         // filter by end date
        } = body;

        // ✅ Build dynamic filters
        const filters: any = {};

        if (id) filters.id = id;
        if (createdById) filters.createdById = createdById;
        if (eventType) filters.eventType = eventType;
        if (sportType) filters.sportType = sportType;
        if (location) filters.location = { contains: location, mode: "insensitive" };
        if (dateFrom || dateTo) {
            filters.date = {};
            if (dateFrom) filters.date.gte = new Date(dateFrom);
            if (dateTo) filters.date.lte = new Date(dateTo);
        }

        const events = await prisma.event.findMany({
            where: filters,
            include: {
                createdBy: true,
                participants: true,
                teams: { include: { team: true } },
            },
            orderBy: { date: "asc" },
        });

        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}
