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
            icon: "dashboard",
        },
        {
            title: "Location",
            href: "/dashboard/map",
            icon: "map",
        },
        {
            title: "Report",
            href: "/dashboard/report",
            icon: "post",
        },
        {
            title: "Admin",
            href: "/admin",
            icon: "user",
        },
    ],
}