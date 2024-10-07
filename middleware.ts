import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes using a route matcher for pattern matching
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/events(.*)',
    '/meetings(.*)',
    '/availability(.*)',
]);

export default clerkMiddleware((auth, req) => {
    if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
    }
});

// Configuration to skip Next.js internals, static files, and run for all API routes
export const config = {
    matcher: [
        // Skip internals and static files (unless referenced in search params)
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

        // Always apply middleware for API and tRPC routes
        '/(api|trpc)(.*)',
    ],
};
