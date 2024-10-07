'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Video, X } from 'lucide-react';
import { Meeting } from '@/types';
import { cancelMeeting } from '@/actions/meetings';
import useFetch from '@/hooks/use-fetch';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const MeetingList = ({ meetings, type }: { meetings: Meeting[]; type: 'upcoming' | 'past' }) => {
    const router = useRouter();
    const { loading, error, fn: fnCancelMeeting } = useFetch(cancelMeeting);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    const handleCancelClick = (meeting: Meeting) => {
        setSelectedMeeting(meeting);
        setIsModalOpen(true);
    };

    const handleCancel = async () => {
        if (selectedMeeting) {
            await fnCancelMeeting(selectedMeeting.id);
            setIsModalOpen(false);
            router.refresh();
        }
    };

    return (
        <>
            <div className="space-y-4">
                <AnimatePresence>
                    {meetings.map((meeting, index) => (
                        <motion.div
                            key={meeting.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>{meeting.event?.title || 'Untitled Meeting'}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{new Date(meeting.startTime).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>
                                            {new Date(meeting.startTime).toLocaleTimeString()} - {new Date(meeting.endTime).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end space-x-2">
                                    {type === 'upcoming' && meeting.meetLink && (
                                        <Button
                                            variant="outline"
                                            onClick={() => window.open(meeting.meetLink, '_blank', 'noopener,noreferrer')}
                                        >
                                            <Video className="w-4 h-4 mr-2" />
                                            Join Meeting
                                        </Button>
                                    )}
                                    {type === 'upcoming' && (
                                        <Button variant="destructive" onClick={() => handleCancelClick(meeting)} disabled={loading}>
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel Meeting
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {meetings.length === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-muted-foreground"
                    >
                        No {type} meetings found.
                    </motion.p>
                )}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Cancellation</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel this meeting?
                            {selectedMeeting && (
                                <p className="mt-2 font-semibold">
                                    {selectedMeeting.event?.title || 'Untitled Meeting'} on {new Date(selectedMeeting.startTime).toLocaleString()}
                                </p>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            {loading ? 'Cancelling...' : 'Yes, Cancel Meeting'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                        >
                            No, Keep Meeting
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-100 text-red-700 rounded-md"
                >
                    <p>{error.message}</p>
                </motion.div>
            )}
        </>
    );
};

export default MeetingList;