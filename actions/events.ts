"use server";
import { eventFormSchema } from "@/zodSchema/schemas";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

type Data = z.infer<typeof eventFormSchema>;


export async function createEvent(data: Data) {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    const validatedData = eventFormSchema.parse(data);

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) throw new Error("User not found");

    const event = await prisma.event.create({
        data: { ...validatedData, userId: user.id },
    });

    return event;

}

export async function getUserEvents() {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");


    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId,
        },
    });
    if (!user) throw new Error("User not found");

    const events = await prisma.event.findMany({
        where: { userId: user.id, },
        orderBy: { createdAt: 'desc' },
        include: {
            _count: { select: { bookings: true } },
        },
    })

    return { events, username: user.username };

}

export async function deleteEvent(eventId: string) {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");

    // Find the event, ensuring it belongs to the user
    const event = await prisma.event.findFirst({
        where: { id: eventId, user: { clerkUserId: userId, } },
    });

    // If the event does not exist, throw an error
    if (!event) throw new Error(`Event not found`);

    // Delete the event
    await prisma.event.delete({
        where: { id: eventId },
    });

    return { success: true };
}

export async function getEventDetails(username: string, eventId: string) {
    const event = await prisma.event.findUnique({
        where: { id: eventId, user: { username } },

        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    username: true,
                    imageUrl: true,
                }
            }
        }
    });

    if (!event) throw new Error("Event not found");
    return event;

}

