"use server";
import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { google } from "googleapis";
import { BookingData } from "@/types";

export async function createBooking(bookingData: BookingData) {
    try {
        const event = await prisma.event.findUnique({
            where: { id: bookingData.eventId },
            include: { user: true }
        });
        if (!event) { throw new Error("Event not found"); }

        const { data } = await clerkClient.users.getUserOauthAccessToken(event.user.clerkUserId, "oauth_google");
        const token = data[0]?.token;
        console.log(token,'token');

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: token });
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        // Create Google Meet link
        const meetResponse = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: {
                summary: `${bookingData.name} - ${event.title}`,
                description: bookingData.additionalInfo,
                start: { dateTime: bookingData.startTime },
                end: { dateTime: bookingData.endTime },
                attendees: [{ email: bookingData.email }, { email: event.user.email }],
                conferenceData: {
                    createRequest: { requestId: `${event.id}-${Date.now()}` },
                },
            },
        });

        console.log(meetResponse,'meetResponse');

        const meetLink = meetResponse.data.hangoutLink;
        const googleEventId = meetResponse.data.id;

        // Create booking in database
        const booking = await prisma.booking.create({
            data: {
                eventId: event.id,
                userId: event.userId,
                name: bookingData.name,
                email: bookingData.email,
                startTime: bookingData.startTime,
                endTime: bookingData.endTime,
                additionalInfo: bookingData.additionalInfo,
                meetLink: String(meetLink),
                googleEventId: String(googleEventId),
            },
        });

        return { success: true, booking, meetLink };

    } catch (error) {
        console.error("Error creating booking:", error);
        return { success: false, error: (error as Error).message };
    }
}