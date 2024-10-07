'use client';
import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";

export function UserMenu() {
    return (
        <UserButton appearance={{
            elements: {
                avatarBox: "w-9 h-9"
            }
        }} >
            <UserButton.MenuItems >
                <UserButton.Link href="/events" label="My Events" labelIcon={<ChartNoAxesGantt size={15} />} />
                <UserButton.Action label="manageAccount" />
            </UserButton.MenuItems>
        </UserButton >
    )
};
