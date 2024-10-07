'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, User } from 'lucide-react'
import { EventCard } from './EventCard'
import { Event } from "@/types";

interface UserPageComponentProps {
    name: string;
    imageUrl: string;
    events: Event[];
    username: string;
}

export default function UserPageComponent({ name, imageUrl, events, username }: UserPageComponentProps) {

    const [hydrated, setHydrated] = React.useState(false);

    React.useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        hydrated && <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-8"
        >
            <Card className="max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-primary text-primary-foreground p-8 flex flex-col items-center space-y-4"
                    >
                        <Avatar className="w-24 h-24 border-4 border-background">
                            <AvatarImage src={String(imageUrl)} alt="User" />
                            <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                        </Avatar>
                        <h1 className="text-3xl font-bold">{name}</h1>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="p-8 space-y-8"
                    >
                        <div className="text-center">
                            <p className="text-xl text-muted-foreground">
                                Welcome to my scheduling page. Please select an event below to book a call with me.
                            </p>
                        </div>

                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-semibold flex items-center">
                                <CalendarDays className="mr-2" />
                                Available Events
                            </h2>
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                                >
                                    {/* TODO: replace name with username */}
                                    <EventCard key={event.id} event={event} username={String(username)} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}