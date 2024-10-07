"use server";

import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { Booking, User } from "@prisma/client"; // Assuming these types exist in your Prisma schema
import { Meeting } from "@/types";

type MeetingType = "upcoming" | "past";

// Define the return structure of getUserMeetings
// interface Meeting {
//     id: string;
//     userId: string;
//     startTime: Date;
//     event: {
//         user: {
//             name: string;
//             email: string;
//         };
//     };
// }

// Function to fetch user meetings
export async function getUserMeetings(type: MeetingType = "upcoming") {
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

    const meetings = await prisma.booking.findMany({
        where: {
            userId: user.id,
            startTime: type === "upcoming" ? { gte: now } : { lt: now },
        },
        include: {
            event: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            startTime: type === "upcoming" ? "asc" : "desc",
        },
    });

    return meetings;
}

// Define the response structure for cancelMeeting
interface CancelMeetingResponse {
    success: boolean;
}

// Function to cancel a meeting
export async function cancelMeeting(meetingId: string): Promise<CancelMeetingResponse> {
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

    const meeting = await prisma.booking.findUnique({
        where: { id: meetingId },
        include: { event: true, user: true },
    });

    if (!meeting || meeting.userId !== user.id) {
        throw new Error("Meeting not found or unauthorized");
    }

    // Cancel the meeting in Google Calendar
    const { data } = await clerkClient.users.getUserOauthAccessToken(
        meeting.user.clerkUserId,
        "oauth_google"
    );

    const token = data[0]?.token;

    if (!token) {
        throw new Error("Unable to retrieve OAuth token");
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    try {
        await calendar.events.delete({
            calendarId: "primary",
            eventId: meeting.googleEventId,
        });
    } catch (error) {
        console.error("Failed to delete event from Google Calendar:", error);
    }

    // Delete the meeting from the database
    await prisma.booking.delete({
        where: { id: meetingId },
    });

    return { success: true };
}
