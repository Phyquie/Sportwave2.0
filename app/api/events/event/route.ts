import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v2 as cloudinary } from "cloudinary";


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
            participantIds,
        } = body;

        // ✅ Validate required fields
        if (!name || !createdById || !date || !location || !sportType) {
            return NextResponse.json(
                { error: "Missing required fields: name, createdById, date, location, sportType are mandatory" },
                { status: 400 }
            );
        }

        // Upload images to Cloudinary and get URLs
        let imageUrls: string[] = [];
        if (images && Array.isArray(images) && images.length > 0) {
            for (const image of images) {
                // image can be a base64 string or a file path/url
                const uploadResponse = await cloudinary.uploader.upload(image, {
                    folder: "events",
                });
                imageUrls.push(uploadResponse.secure_url);
            }
        }

        const event = await prisma.event.create({
            data: {
                name,
                createdById,
                eventType: eventType || "soloEvent",
                date: new Date(date),
                location,
                description: description || null,
                images: imageUrls, // store Cloudinary URLs
                sportType,

                // optional relations — handled later if not provided
                participants: participantIds?.length
                    ? {
                        connect: participantIds.map((id: string) => ({ id })),
                    }
                    : undefined,

                teams: teamIds?.length
                    ? {
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

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}


