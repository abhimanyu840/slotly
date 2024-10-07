import { getUserEvents } from "@/actions/events";
import { EventCard } from "@/components/custom/EventCard";
import { Suspense } from "react";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function EventsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold flex items-center mx-auto">
                    <CalendarDays className="mr-2 h-8 w-8 text-primary " />
                    Your Events
                </h1>
                {/* <Link href="/events?create=true">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                </Link> */}
            </header>
            <Suspense fallback={<EventsSkeleton />}>
                <Events />
            </Suspense>
        </div>
    );
}
// TODO: update events page when nuw event is created
const Events = async () => {
    const { events, username } = await getUserEvents();

    if (events.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">No events found</h2>
                <p className="text-gray-600 mb-8">Create your first event to get started!</p>
                <Link href="/events?create=true">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event.id} event={event} username={String(username)} />
            ))}
        </div>
    );
};

const EventsSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
                <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        ))}
    </div>
);

