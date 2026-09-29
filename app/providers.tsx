"use client";

import { SidebarProvider } from "@/shared/ui/shadcn/sidebar";
import { TooltipProvider } from "@/shared/ui/shadcn/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <TooltipProvider>{children}</TooltipProvider>
        </SidebarProvider>
    );
}
