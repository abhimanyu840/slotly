"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { EventForm } from './EventForm';
import useFetch from '@/hooks/use-fetch';
import { createEvent } from '@/actions/events';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { eventFormSchema } from '@/zodSchema/schemas';

export function CreateEventDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsOpen(searchParams.get('create') === 'true');
    }, [searchParams]);

    const handleClose = () => {
        router.push('/events');
    };


    const { loading, error, fn: createEventFn } = useFetch(createEvent);

    const handleSubmit = async (data: z.infer<typeof eventFormSchema>) => {
        console.log('Event data:', data);
        await createEventFn(data);
        toast({
            title: "Event created!",
            description: "Your event has been created successfully.",
        });

        console.log("control is here");

        // Here you would typically send the data to your backend
        handleClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleClose}>
            <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold mb-4">Create New Event</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                    <EventForm onSubmit={handleSubmit} onCancel={handleClose} loading={loading} />
                </div>
            </SheetContent>
        </Sheet>
    );
}