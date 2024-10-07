"use client";

import { bookingSchema } from '@/zodSchema/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, Clock, CheckCircle, Calendar, LinkIcon } from 'lucide-react';
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { useTheme } from 'next-themes';
import useFetch from '@/hooks/use-fetch';
import { createBooking } from '@/actions/bookings';
import { toast } from '@/hooks/use-toast';
import { BookingData } from '@/types';

type BookingFormProps = {
    event: any
    availability: any
}

const BookingForm = ({ event, availability }: BookingFormProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const { theme } = useTheme();

    const { data, loading, fn: fnCreateBooking } = useFetch(createBooking);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(bookingSchema),
    });

    const availableDays = availability.map((day: any) => new Date(day.date));
    const timeSlots = selectedDate ? availability.find((day: any) => isSameDay(new Date(day.date), selectedDate))?.slots || [] : [];

    const onSubmit = async (data: any) => {
        // Log form data for debugging
        console.log("Form Data Submitted:", data);

        // Log selected date and time to check if they are correctly passed
        console.log("Selected Date:", selectedDate);
        console.log("Selected Time:", selectedTime);

        if (!selectedDate || !selectedTime) {
            console.error("Date or time not selected");
            return
        }

        const startTime = new Date(
            `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`
        );
        const endTime = new Date(startTime.getTime() + event.duration * 60000);

        const bookingData: BookingData = {
            eventId: event.id,
            name: data.name,
            email: data.email,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            additionalInfo: data.additionalInfo,
        };

        await fnCreateBooking(bookingData);

        // Handle form submission
        setIsFormOpen(false);
    };

    console.log(data, 'data');

    if (data && data.error) {
        toast({
            title: "Error",
            description: "An error occurred while creating your booking. Please try again later.",
            variant: "destructive",
        });
    }

    if (data && data.success) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center min-h-screen bg-gradient-to-b from-primary/5 to-background p-4"
            >
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                        >
                            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                        </motion.div>
                        <CardTitle className="text-2xl font-bold">Booking Successful!</CardTitle>
                        <CardDescription>Your event has been scheduled</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center space-x-2 text-muted-foreground"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>{data?.eventTitle}</span>
                        </motion.div> */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex items-center space-x-2 text-muted-foreground"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>{data.booking.startTime.toISOString().slice(0, 10)} at {data.booking.startTime.toISOString().slice(11, 16)}</span>
                        </motion.div>
                        {data.meetLink && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-6"
                            >
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => window.open(data.meetLink, '_blank', 'noopener,noreferrer')}
                                >
                                    <LinkIcon className="w-4 h-4 mr-2" />
                                    Join Meeting
                                </Button>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        )
    }

    return (
        hydrated && <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-1 p-4"
        >
            <Card className="shadow-lg overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle className="text-2xl font-bold flex items-center">
                        <CalendarIcon className="mr-2" />
                        Book Your Session
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <DayPicker
                                    mode='single'
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date)
                                        setSelectedTime(undefined)
                                    }}
                                    disabled={[{ before: new Date() }]}
                                    modifiers={{ available: availableDays }}
                                    modifiersStyles={{
                                        available: {
                                            backgroundColor: `${theme === 'dark' ? 'darkgray' : 'lightblue'}`,
                                            borderRadius: '100%'
                                        }
                                    }}
                                />
                            </div>
                            {selectedDate && (
                                <motion.div
                                    key="time-slots"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-1"
                                >
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Clock className="mr-2" />
                                        Available Time Slots
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {timeSlots.map((slot: any, index: number) => (
                                            <motion.div
                                                key={slot}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Button
                                                    type="button"
                                                    variant={selectedTime === slot ? "default" : "outline"}
                                                    onClick={() => {
                                                        setSelectedTime(slot)
                                                        setIsFormOpen(true)
                                                    }}
                                                >
                                                    {slot}
                                                    {selectedTime === slot && <CheckCircle className="ml-auto h-4 w-4" />}
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Schedule Your Event</DialogTitle>
                        <DialogDescription>
                            Please provide your details to book the event on {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" {...register('name')} />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
                        </div>
                        <div>
                            <Label htmlFor="additionalInfo">Additional Information</Label>
                            <Textarea id="additionalInfo" {...register('additionalInfo')} />
                            {errors.additionalInfo && <p className="text-red-500 text-sm mt-1">{errors.additionalInfo.message as string}</p>}
                        </div>
                        {/* Hidden inputs to include selected date and time */}
                        <input type="hidden" value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''} {...register('date')} />
                        <input type="hidden" value={selectedTime || ''} {...register('time')} />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Scheduling...' : 'Schedule Event'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </motion.div>
    )
}

export default BookingForm;
