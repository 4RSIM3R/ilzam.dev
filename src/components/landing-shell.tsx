import type { PropsWithChildren } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { LandingSidebar } from "@/components/landing-sidebar"
import { LandingTopbar } from "@/components/landing-topbar"

export function LandingShell({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <LandingSidebar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <LandingTopbar />
        <div className="flex-1 overflow-y-auto snap-y snap-mandatory">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
