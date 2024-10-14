'use client'

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarDays, PenBox, Menu, X } from "lucide-react"
import ThemeButton from "./ThemeButton";
import LoginLogoutButton from "./LoginLogoutButton";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const NavItems = ({ isMobile = false }) => (
        <>
            <Link href="/events?create=true" className={`text-gray-500 hover:text-gray-700 ${isMobile ? 'w-full' : ''}`}>
                <Button className={`${isMobile ? 'w-full justify-start' : ''}`}>
                    <PenBox className="mr-2" size={18} /> Create Event
                </Button>
            </Link>
            <LoginLogoutButton />
            <ThemeButton />
        </>
    );

    return (
        <nav className="relative">
            <div className="flex items-center justify-between w-full h-16 px-4 py-2 bg-white dark:bg-neutral-950 shadow-md dark:shadow-slate-800 z-30 sticky top-0">
                <div className="flex items-center">
                    <Link className="flex items-center justify-center" href="/">
                        <CalendarDays className="h-8 w-8 text-primary font-bold" />
                        <span className="ml-2 text-2xl font-bold text-primary">Slotly</span>
                    </Link>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex gap-2 items-center">
                    <NavItems />
                </div>

                {/* Mobile menu toggle */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-16 left-0 right-0 bg-white dark:bg-neutral-950 shadow-md dark:shadow-slate-800 z-20 md:hidden"
                    >
                        <nav className="flex flex-col gap-4 p-4">
                            <NavItems isMobile={true} />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;