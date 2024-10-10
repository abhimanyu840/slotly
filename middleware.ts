import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes using a route matcher for pattern matching
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/events(.*)',
    '/meetings(.*)',
    '/availability(.*)',
]);

export default clerkMiddleware((auth, req) => {
    const userId = auth().userId;

    // Retry logic: if userId is null, attempt to re-check
    if (!userId && isProtectedRoute(req)) {
        // Optional: add logging to monitor when this happens
        console.warn('User ID is null, redirecting to sign-in.');
        return auth().redirectToSignIn();
    }

    return NextResponse.next();
});

// Configuration to skip Next.js internals, static files, and run for all API routes
export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        '/dashboard(.*)',
        '/events(.*)',
        '/meetings(.*)',
        '/availability(.*)',
    ],
};
