import { Suspense } from "react";
import { getUserMeetings } from "@/actions/meetings";
import MeetingList from "@/components/custom/MeetingList";
import { Skeleton } from "@/components/ui/skeleton";
import MeetingTabs from "@/components/custom/MeetingTabs";

export const metadata = {
  title: "Your Meetings | Slotly",
  description: "View and manage your past and upcoming meetings with Slotly.",
};

const Meetings = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Meetings</h1>
      <MeetingTabs>
        <Suspense fallback={<MeetingsSkeletonList />}>
          <UpcomingMeetings />
        </Suspense>
        <Suspense fallback={<MeetingsSkeletonList />}>
          <PastMeetings />
        </Suspense>
      </MeetingTabs>
    </div>
  );
};

export default Meetings;

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming");
  // @ts-ignore
  return <MeetingList meetings={meetings} type="upcoming" />;
}

async function PastMeetings() {
  const meetings = await getUserMeetings("past");
  // @ts-ignore
  return <MeetingList meetings={meetings} type="past" />;
}

function MeetingsSkeletonList() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}
