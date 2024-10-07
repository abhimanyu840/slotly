import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays } from 'lucide-react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityFormSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold flex items-center justify-center mb-4">
                        <CalendarDays className="mr-3 h-10 w-10 text-primary" />
                        Set Your Availability
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Loading your availability settings...
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {daysOfWeek.map((day, index) => (
                                <motion.div
                                    key={day}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-0">
                                            <div className="bg-primary/10 p-4">
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-4 w-4 rounded" />
                                                    <Skeleton className="h-6 w-24" />
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-4">
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-5 w-5 rounded-full" />
                                                    <Skeleton className="h-9 w-full" />
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Skeleton className="h-5 w-5 rounded-full" />
                                                    <Skeleton className="h-9 w-full" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-6 w-6 rounded-full" />
                                        <Skeleton className="h-6 w-64" />
                                        <Skeleton className="h-9 w-24" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Skeleton className="h-11 w-48" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AvailabilityFormSkeleton;