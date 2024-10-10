"use client";
import { SidebarCustom } from "@/components/custom/SidebarCustom";
import { CreateEventDrawer } from "@/components/custom/CreateEventDrawer";
import { useUser } from "@clerk/nextjs";
import LoadingPage from "@/components/custom/LoadingPage";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { isLoaded, user } = useUser();

    if (!isLoaded) {
        return <LoadingPage />
    }

    return (
            <div className="">
                <SidebarCustom />
                <div className="md:mx-14">
                    {children}
                </div>
                <CreateEventDrawer /> 
            </div>
    )
}