import { PrismaClient } from "@prisma/client";

// Add `declare` to avoid TypeScript errors on global variable declarations
declare global {
    // Prevent the global `prisma` variable from conflicting with other PrismaClient declarations
    // This is required for global typing and proper Prisma Client reuse
    var prisma: PrismaClient | undefined;
}

// Use the existing global Prisma instance if it exists (prevents multiple instances in development)
export const prisma =
    globalThis.prisma ||
    new PrismaClient({
        log: ['query'], // Optional: Enable query logging for debugging
    });

// Assign the Prisma instance to `globalThis` in development to avoid multiple instances on hot reloads
if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}
