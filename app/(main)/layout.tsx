import { SidebarCustom } from "@/components/custom/SidebarCustom";
import MainProviders from "./main-providers";
import { CreateEventDrawer } from "@/components/custom/CreateEventDrawer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainProviders>
            <div className="">
                <SidebarCustom />
                <div className="md:mx-14">
                    {children}
                </div>
                <CreateEventDrawer /> 
            </div>
        </MainProviders>
    )
}