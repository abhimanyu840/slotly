"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconBrandTabler,
    IconCalendar,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Clock, User } from "lucide-react";
import { usePathname } from 'next/navigation';

export function SidebarCustom() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Events",
            href: "/events",
            icon: (
                <IconCalendar className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Meetings",
            href: "/meetings",
            icon: (
                <User className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
        {
            label: "Availability",
            href: "/availability",
            icon: (
                <Clock className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isMobile) {
        return (
            hydrated && <div className="fixed bottom-0 left-0 right-0 z-20 bg-gray-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-around items-center h-16">
                    {links.map((link, idx) => (
                        <Link key={idx} href={link.href} className={cn(
                            "flex flex-col items-center justify-center w-full h-full",
                            pathname === link.href ? "text-primary" : "text-neutral-700 dark:text-neutral-200"
                        )}>
                            {link.icon}
                            <span className="text-xs mt-1">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return (
        hydrated && <div
            className={cn(
                "fixed top-0 left-0 h-screen z-20 pt-5",
                "rounded-r-md flex flex-col bg-gray-100 dark:bg-neutral-900 w-64 border-r border-neutral-200 dark:border-neutral-700 overflow-hidden",
                open ? "w-48" : "w-14"
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}