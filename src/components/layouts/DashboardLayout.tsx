import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({
  children,
  role,
}: {
  children: React.ReactNode
  role: string
}) {
  return (
    <SidebarProvider>
      <AppSidebar role={role as any} />
      <main className="flex-1 p-6">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
