'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, User } from 'lucide-react'

interface EventDetailsProps {
    title: string
    name: string
    username: string
    avatarUrl: string
    duration: number
    description: string
}

export default function EventDetails({
    title,
    name,
    username,
    avatarUrl,
    duration,
    description
}: EventDetailsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-4 md:p-8"
        >
            <Card className="max-w-2xl mx-auto overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground p-6">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                    </motion.div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-center space-x-4"
                    >
                        <Avatar className="w-16 h-16 border-2 border-primary">
                            <AvatarImage src={avatarUrl} alt={name} />
                            <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{name}</h2>
                            <p className="text-muted-foreground">@{username}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex items-center space-x-2 text-muted-foreground"
                    >
                        <Clock className="w-5 h-5" />
                        <span>{duration} minutes</span>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <h3 className="text-lg font-semibold mb-2">About this event</h3>
                        <p className="text-muted-foreground">{description}</p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="bg-secondary p-4 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <CalendarDays className="w-5 h-5 mr-2" />
                            How to book
                        </h3>
                        <p className="text-muted-foreground">
                            Select a date and time from the available slots to schedule your event with {name}.
                        </p>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    )
}