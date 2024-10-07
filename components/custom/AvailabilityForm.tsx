"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Clock, CalendarDays } from 'lucide-react';
import { daysOfWeek } from '@/constants';
import { availabilitySchema } from '@/zodSchema/schemas';
import { z } from 'zod';
import { timeSlots } from '@/app/(main)/availability/data';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '../ui/input';
import useFetch from '@/hooks/use-fetch';
import { updateAvailability } from '@/actions/availability';

type AvailabilityFormData = z.infer<typeof availabilitySchema>;

interface AvailabilityFormProps {
    initialData?: AvailabilityFormData;
}

const AvailabilityForm = ({ initialData }: AvailabilityFormProps) => {
    const { toast } = useToast();
    const { loading, fn: functionUpdateAvailability } = useFetch(updateAvailability);
    const { control, handleSubmit, watch, formState: { errors } } = useForm<AvailabilityFormData>({
        resolver: zodResolver(availabilitySchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: AvailabilityFormData) => {
        await functionUpdateAvailability(data);
        toast({
            title: "Availability Updated",
            description: "Your availability has been successfully updated.",
        });
    };

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        hydrated && <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
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
                        Define your working hours and minimum booking gap to streamline your scheduling process.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                                                    <Controller
                                                        name={`${day.toLowerCase()}.isAvailable` as keyof AvailabilityFormData}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <div className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`${day.toLowerCase()}-available`}
                                                                    checked={!!field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                                <Label htmlFor={`${day.toLowerCase()}-available`} className="text-lg font-semibold">
                                                                    {day}
                                                                </Label>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                                {watch(`${day.toLowerCase()}.isAvailable` as keyof AvailabilityFormData) && (
                                                    <div className="p-4 space-y-4">
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium">Start Time</Label>
                                                            <Controller
                                                                name={`${day.toLowerCase()}.startTime` as keyof AvailabilityFormData}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    // @ts-ignore
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select start time" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {timeSlots.map((time) => (
                                                                                <SelectItem key={time} value={time}>
                                                                                    {time}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            {/* @ts-ignore */}
                                                            {errors[day.toLowerCase()]?.startTime && (
                                                                // @ts-ignore
                                                                <p className="text-red-500 text-sm mt-1">{errors[day.toLowerCase()]?.startTime?.message}</p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-medium">End Time</Label>
                                                            <Controller
                                                                name={`${day.toLowerCase()}.endTime` as keyof AvailabilityFormData}
                                                                control={control}
                                                                render={({ field }) => (
                                                                    // @ts-ignore
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Select end time" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {timeSlots.map((time) => (
                                                                                <SelectItem key={time} value={time}>
                                                                                    {time}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            />
                                                            {/* @ts-ignore */}
                                                            {errors[day.toLowerCase()]?.endTime && (
                                                                // @ts-ignore
                                                                <p className="text-red-500 text-sm mt-1">{errors[day.toLowerCase()]?.endTime?.message}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                            >
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <Clock className="h-6 w-6 text-primary" />
                                            <Label htmlFor="timeGap" className="text-lg">Minimum gap before booking (minutes)</Label>
                                            <Controller
                                                name="timeGap"
                                                control={control}
                                                defaultValue={15}
                                                render={({ field }) => (
                                                    <Input type="number" id="timeGap" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="w-24" />
                                                )}
                                            />
                                        </div>
                                        {errors.timeGap && (
                                            <p className="text-red-500 text-sm mt-1">{errors.timeGap.message}</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.9 }}
                                className="flex justify-end"
                            >
                                <Button type="submit" size="lg" className="px-8" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Availability'}
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AvailabilityForm;