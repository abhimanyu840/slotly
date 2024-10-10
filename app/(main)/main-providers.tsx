"use client";
import LoadingPage from "@/components/custom/LoadingPage";
import { useUser } from "@clerk/nextjs";
import React from "react";

export default function MainProviders({ children }: { children: React.ReactNode }) {




    return <>
        {children}
    </>;
}
