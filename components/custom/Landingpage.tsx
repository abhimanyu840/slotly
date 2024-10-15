"use client";

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Globe, Users } from "lucide-react"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { WavyBackground } from "@/components/ui/wavy-background"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const people = [
    {
        id: 1,
        name: "Abhimanyu Kumar",
        designation: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
];

function LandingPage() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        hydrated && <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 dark:from-gray-900 dark:to-purple-900 text-neutral-900 dark:text-neutral-100">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                    <BackgroundBeams />
                    <div className="container px-4 md:px-6 relative z-10">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                    <TextGenerateEffect words="Simplify Your Scheduling with Slotly" />
                                </h1>
                                <p className="mx-auto max-w-[700px] text-neutral-200 md:text-xl">
                                    Effortlessly manage your appointments and boost your productivity. Say goodbye to back-and-forth emails.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href={'/dashboard'}>
                                    <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-purple-100">
                                        Get Started for Free
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="text-black dark:text-white border-white hover:bg-white/20">
                                    Learn More
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <WavyBackground className="max-w-4xl mx-auto pb-40" colors={['#3b82f6', '#8b5cf6', '#d946ef']}>
                    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg rounded-lg shadow-xl">
                        <div className="container px-4 md:px-6">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-purple-600 dark:text-purple-400">Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Card className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 border-blue-200 dark:border-blue-700">
                                        <CardHeader>
                                            <Clock className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
                                            <CardTitle className="text-blue-700 dark:text-blue-300">Easy Scheduling</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-blue-600 dark:text-blue-200">Share your Slotly link and let others book time slots that work for both of you.</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 border-purple-200 dark:border-purple-700">
                                        <CardHeader>
                                            <Globe className="w-12 h-12 text-purple-500 dark:text-purple-400 mb-4" />
                                            <CardTitle className="text-purple-700 dark:text-purple-300">Time Zone Intelligence</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-purple-600 dark:text-purple-200">Automatically detects and adjusts for time zones, eliminating confusion.</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Card className="bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900 dark:to-red-900 border-pink-200 dark:border-pink-700">
                                        <CardHeader>
                                            <Users className="w-12 h-12 text-pink-500 dark:text-pink-400 mb-4" />
                                            <CardTitle className="text-pink-700 dark:text-pink-300">Team Scheduling</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-pink-600 dark:text-pink-200">Coordinate with your team members and manage group availability effortlessly.</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </WavyBackground>
                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-white text-green-500 flex items-center justify-center text-2xl font-bold mb-4">1</div>
                                <h3 className="text-xl font-bold mb-2 text-white">Set Your Availability</h3>
                                <p className="text-green-100">Define your working hours and break times in Slotly.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-white text-blue-500 flex items-center justify-center text-2xl font-bold mb-4">2</div>
                                <h3 className="text-xl font-bold mb-2 text-white">Share Your Link</h3>
                                <p className="text-blue-100">Send your unique Slotly link to clients or colleagues.</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 rounded-full bg-white text-purple-500 flex items-center justify-center text-2xl font-bold mb-4">3</div>
                                <h3 className="text-xl font-bold mb-2 text-white">Get Booked</h3>
                                <p className="text-purple-100">Receive notifications and manage your appointments with ease.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                {/* Rest of the sections remain unchanged */}
                {/* ... */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-100 dark:bg-neutral-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                                    <CardHeader>
                                        <CardTitle>Sarah T.</CardTitle>
                                        <CardDescription>Freelance Designer</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        "Slotly has revolutionized my client booking process. It's so easy to use and has saved me countless hours!"
                                    </CardContent>
                                </Card>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                                    <CardHeader>
                                        <CardTitle>Mark R.</CardTitle>
                                        <CardDescription>Marketing Manager</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        "The team scheduling feature is a game-changer. Coordinating meetings has never been this simple."
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-neutral-900">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Simple, Transparent Pricing</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                                    <CardHeader>
                                        <CardTitle>Basic</CardTitle>
                                        <CardDescription>For individuals</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">$0</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Free forever</p>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> 1 Calendar</li>
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Basic integrations</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Get Started</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                                    <CardHeader>
                                        <CardTitle>Pro</CardTitle>
                                        <CardDescription>For power users</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">$10</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">per month</p>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Unlimited calendars</li>
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Advanced integrations</li>
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Team scheduling</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Upgrade to Pro</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Card className="bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                                    <CardHeader>
                                        <CardTitle>Enterprise</CardTitle>
                                        <CardDescription>For large teams</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-4xl font-bold">Custom</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Contact us for pricing</p>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> All Pro features</li>
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Dedicated support</li>
                                            <li className="flex items-center"><CheckCircle className="text-primary dark:text-primary-dark mr-2" /> Custom integrations</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">Contact Sales</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-neutral-100 dark:bg-neutral-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>How does Slotly work?</AccordionTrigger>
                                <AccordionContent>
                                    Slotly allows you to set your availability, share your booking link, and let others schedule meetings with you without the back-and-forth emails.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Can I integrate Slotly with my existing calendar?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, Slotly integrates seamlessly with popular calendar services like Google Calendar, Outlook, and iCloud.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is there a free plan available?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, we offer a free Basic plan that includes essential features for individuals. For more advanced features, check out our Pro and Enterprise plans.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-primary dark:bg-primary-dark">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white dark:text-black">
                                    Ready to Simplify Your Scheduling?
                                </h2>
                                <p className="mx-auto max-w-[700px] text-neutral-200 dark:text-neutral-800 md:text-xl">
                                    Join thousands of professionals who trust Slotly to manage their appointments.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button variant="secondary" size="lg">
                                    Get Started for Free
                                </Button>
                                <Button variant="outline" size="lg" className="text-black dark:text-white border-white hover:bg-white/20 dark:hover:text-black">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-12 bg-white dark:bg-neutral-900">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Meet Our Team</h2>
                                <p className="max-w-[900px] text-neutral-500 dark:text-neutral-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                                    The brilliant minds behind Slotly's innovative scheduling solutions.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-6">
                            <AnimatedTooltip items={people} />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">© 2024 Slotly. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4 text-neutral-500 dark:text-neutral-400" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4 text-neutral-500 dark:text-neutral-400" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

export default LandingPage;