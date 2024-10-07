"use client";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";

export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [hydrated, setHydrated] = React.useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    return (
        hydrated && <Button variant="outline" size="icon" onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}>
            {theme === 'dark' ? <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> : <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}