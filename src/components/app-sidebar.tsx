import { Home, User, Users, Briefcase, GraduationCap, Inbox } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const roleMap = {
  student: { title: "Student Dashboard", icon: User },
  faculty: { title: "Faculty Dashboard", icon: Users },
  admin: { title: "Admin Dashboard", icon: Home },
  exabyte: { title: "Industry Partner – Exabyte", icon: Briefcase },
  petabyte: { title: "Industry Partner – Petabyte", icon: Briefcase },
  terabyte: { title: "Industry Partner – Terabyte", icon: Briefcase },
  alumni: { title: "Alumni Dashboard", icon: GraduationCap },
}

export function AppSidebar({ role }: { role: keyof typeof roleMap }) {
  const item = roleMap[role]
  if (!item) return null
  const Icon = item.icon

  // Admin-only extra items
  const adminExtras =
    role === "admin"
      ? [
          {
            title: "User Requests",
            url: "/dashboard/admin/requests",
            icon: Inbox,
          },
        ]
      : []

  // Combine default and extra items
  const menuItems = [
    {
      title: item.title,
      url: "#",
      icon: Icon,
    },
    ...adminExtras,
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ title, url, icon: MenuIcon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a href={url}>
                      <MenuIcon className="mr-2 h-4 w-4" />
                      <span>{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
