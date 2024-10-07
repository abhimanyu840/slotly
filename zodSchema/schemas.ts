import { daysOfWeek } from "@/constants";
import { z } from "zod";


export const userNameSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters.", }).max(20, { message: "Username must be at most 20 characters." }).regex(/^[a-zA-Z0-9]+$/, { message: "Username can only contain letters and numbers." }),
});


export const eventFormSchema = z.object({
    title: z.string().min(3, {
        message: "Event title must be at least 3 characters.",
    }),
    description: z.string().optional(),
    duration: z.number().min(1, {
        message: "Duration must be at least 1 minute.",
    }),
    isPrivate: z.boolean(),
});

// export const availabilitySchema = z.object({
//     ...Object.fromEntries(
//         daysOfWeek.map(day => [
//             day.toLowerCase(),
//             z.object({
//                 isAvailable: z.boolean(),
//                 startTime: z.string(),
//                 endTime: z.string(),
//             })
//         ])
//     ),
//     timeGap: z.number().min(0, "Minimum gap must be a positive number"),
// });

export const daySchema = z.object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
}).refine((data) => {
    if (data.isAvailable && data.startTime && data.endTime) {
        return data.startTime < data.endTime;
    }
    return true;
}, {
    message: "End time must be greater than start time",
    path: ["endTime"],
});

export const availabilitySchema = z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap: z.number().min(0, "Minimum gap must be a positive number").int(),
});

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    additionalInfo: z.string().optional(),
});
