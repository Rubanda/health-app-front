import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    mainNav: [
      {
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        title: "Admin",
        href: "/admin",
      },
    ],  
    sidebarNav: [
        {
            title: "Dashboard",
            href: "/dashboard",
        },
        {
            title: "Admin",
            href: "/admin",
            icon: "user",
        },
    ],
}