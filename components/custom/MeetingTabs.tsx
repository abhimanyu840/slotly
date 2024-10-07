'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from 'framer-motion'

const MeetingTabs = ({ children }: { children: React.ReactNode[] }) => {
    return (
        <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="upcoming">Upcoming Meetings</TabsTrigger>
                <TabsTrigger value="past">Past Meetings</TabsTrigger>
            </TabsList>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <TabsContent value="upcoming">
                    {children[0]}
                </TabsContent>
                <TabsContent value="past">
                    {children[1]}
                </TabsContent>
            </motion.div>
        </Tabs>
    )
}

export default MeetingTabs