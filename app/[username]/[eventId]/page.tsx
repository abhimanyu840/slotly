import { getEventAvailability } from "@/actions/availability";
import { getEventDetails } from "@/actions/events";
import BookingForm from "@/components/custom/BookingForm";
import EventDetails from "@/components/custom/EventDetails";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }: { params: { username: string, eventId: string } }) {
    const { username, eventId } = params;
    const event = await getEventDetails(username, eventId);
    if (!event) return null;

    return {
        title: `Book ${event.title} with ${event.user.name} | Slotly`,
        description: `Book an event with ${event.user.name} on Slotly, a scheduling app that helps you find the perfect time for your appointments and events.`,
    };
}

export default async function EventPage({ params }: { params: { username: string, eventId: string } }) {
    const { username, eventId } = params;
    const event = await getEventDetails(username, eventId);
    const availability = await getEventAvailability(eventId);
    // console.log(availability);
    if (!event) return notFound();

    return (
        <div>
            {/* <h1>{event.title}</h1>
            <p>{event.description}</p> */}

            <EventDetails avatarUrl={event.user.imageUrl!} name={event.user.name!} username={event.user.username!} title={event.title!} duration={event.duration!} description={event.description!} />
            <Suspense fallback={<div>Loading Booking Form...</div>}>
                <div className="-mt-60">
                    <BookingForm event={event} availability={availability} />
                </div>
            </Suspense>

        </div>
    );
}
