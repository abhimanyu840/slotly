import Link from "next/link";
import { Button } from "../ui/button";
import { CalendarDays, PenBox, } from "lucide-react"
import { checkUser } from "@/lib/checkUser";
import ThemeButton from "./ThemeButton";
import LoginLogoutButton from "./LoginLogoutButton";

const Navbar = async () => {
    await checkUser();

    return (
        <nav className="flex items-center justify-between w-full h-16 px-4 py-2 bg-white dark:bg-neutral-950 shadow-md dark:shadow-slate-800 z-30 sticky top-0">
            <div className="flex items-center">
                <Link className="flex items-center justify-center" href="/">
                    <CalendarDays className="h-8 w-8 text-primary font-bold" />
                    <span className="ml-2 text-2xl font-bold text-primary">Slotly</span>
                </Link>
            </div>
            <div className="flex gap-2 items-center">
                <Link href="/events?create=true" className="text-gray-500 hover:text-gray-700">
                    <Button> <PenBox className="mr-2 " size={18} /> Create Event</Button>
                </Link>
                <LoginLogoutButton />
                <ThemeButton />
            </div>
        </nav>
    );
};

export default Navbar;