"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Copy, Trash2, Globe, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useFetch from '@/hooks/use-fetch';
import { deleteEvent } from '@/actions/events';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventCardProps {
    event: {
        id: string;
        title: string;
        description: string | null;
        duration: number;
        isPrivate: boolean;
        _count: {
            bookings?: number
        }
    };
    username: string;
}


export function EventCard({ event, username }: EventCardProps) {
    const { toast } = useToast();
    const { loading, error, fn: deleteEventFn } = useFetch(deleteEvent);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const copyLink = () => {
        const link = `${window.location.origin}/${username}/${event.id}`;
        navigator.clipboard.writeText(link).then(() => {
            toast({
                title: "Link Copied!",
                description: "The event link has been copied to your clipboard.",
            });
        });
    };

    const handleDeleteEvent = async () => {
        await deleteEventFn(event.id);
        if (error) {
            toast({
                title: "Error",
                description: "An error occurred while deleting the event.",
                variant: "destructive",
            });
            return;
        }
        toast({
            title: "Event Deleted",
            description: "The event has been successfully deleted.",
        });
        setIsDeleteDialogOpen(false);
    };

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent navigation if the click originated from a button or its child elements
        const targetElement = e.target as HTMLElement;
        if (targetElement.closest('button')) {
            return;
        }

        // Open the event link in a new tab
        window.open(`${window.location.origin}/${username}/${event.id}`, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="w-full max-w-md mx-auto mb-4 overflow-hidden transition-shadow hover:shadow-md cursor-pointer" onClick={handleCardClick}>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span className="text-xl font-semibold truncate">{event.title}</span>
                        {!event.isPrivate ? (
                            <Globe className="h-5 w-5 text-green-500" />
                        ) : (
                            <Lock className="h-5 w-5 text-yellow-500" />
                        )}
                    </CardTitle>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{event.duration} minutes | {!event.isPrivate ? 'Public' : 'Private'}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {event._count.bookings} bookings
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={copyLink}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                    </Button>
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure you want to delete this event?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the event
                                    and remove all associated data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteEvent} disabled={loading}>
                                    {loading ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
