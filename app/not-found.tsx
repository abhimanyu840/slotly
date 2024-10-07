"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CalendarDays, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function NotFound() {
    // const [searchQuery, setSearchQuery] = React.useState('');

    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Implement search functionality here
    //     console.log('Searching for:', searchQuery);
    // };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <CalendarDays className="w-24 h-24 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-primary mb-2">404 - Page Not Found</h1>
                <p className="text-xl text-muted-foreground mb-8">Oops! It seems this time slot doesn&apos;t exist.</p>
            </motion.div>

            {/* <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-md mb-8"
            >
                <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search for pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="submit" variant="outline">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                    </Button>
                </form>
            </motion.div> */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link href="/">
                    <Button variant="default" size="lg">
                        <Home className="w-4 h-4 mr-2" />
                        Return to Homepage
                    </Button>
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 text-sm text-muted-foreground"
            >
                <p>Need help? <Link href="/contact" className="text-primary hover:underline">Contact our support team</Link></p>
            </motion.div>
        </div>
    );
}