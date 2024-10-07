"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface Event {
    title: string;
}

interface Booking {
    id: string;
    userId: string;
    startTime: Date;
    event: Event;
}

export async function getLatestUpdates(): Promise<Booking[]> {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const now = new Date();

    const upcomingMeetings = await prisma.booking.findMany({
        where: {
            userId: user.id,
            startTime: { gte: now },
        },
        include: {
            event: {
                select: {
                    title: true,
                },
            },
        },
        orderBy: {
            startTime: "asc",
        },
        take: 3,
    });

    return upcomingMeetings;
}
