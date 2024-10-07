export type Event = {
    id: string;
    title: string;
    description: string | null;
    duration: number;
    isPrivate: boolean;
    _count: {
        bookings?: number
    }
};

export interface DayAvailability {
    isAvailable: boolean;
    startTime?: string; // Optional, only present if isAvailable is true
    endTime?: string; // Optional, only present if isAvailable is true
}

export interface AvailabilitySchedule {
    monday: DayAvailability;
    tuesday: DayAvailability;
    wednesday: DayAvailability;
    thursday: DayAvailability;
    friday: DayAvailability;
    saturday: DayAvailability;
    sunday: DayAvailability;
    timeGap: number;
}

export enum DayOfWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
}

export const dayMapping: { [key: string]: DayOfWeek } = {
    monday: DayOfWeek.MONDAY,
    tuesday: DayOfWeek.TUESDAY,
    wednesday: DayOfWeek.WEDNESDAY,
    thursday: DayOfWeek.THURSDAY,
    friday: DayOfWeek.FRIDAY,
    saturday: DayOfWeek.SATURDAY,
    sunday: DayOfWeek.SUNDAY,
};

export interface BookingData {
    eventId: string;
    name: string;
    email: string;
    startTime: string;
    endTime: string;
    additionalInfo: string;
}

// export interface Meeting {
//     id: string;
//     title: string;
//     date: Date;  // We'll convert this to a string when rendering
//     startTime: string;
//     endTime: string;
//     joinLink?: string;
// }

export interface MeetingEvent {
    id: string;
    title: string;
    description: string;
    duration: number;
    userId: string;
    isPrivate: boolean;
    createdAt: string;
    updatedAt: string;
    user?: Record<string, any>; // Assuming `user` is an object but details are not provided
}

export interface Meeting {
    id: string;
    eventId: string;
    userId: string;
    name: string;
    email: string;
    additionalInfo: string;
    startTime: Date;
    endTime: Date;
    meetLink: string;
    googleEventId: string;
    createdAt: Date;
    updatedAt: Date;
    event: MeetingEvent;
}


