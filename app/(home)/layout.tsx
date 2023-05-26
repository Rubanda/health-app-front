import Link from "next/link"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { signOut } from "next-auth/react"
import { Logout } from "@/components/logout"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {

  const user: any = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="
        absolute
        top-0
        left-0
        w-full
        h-96
        bg-gradient-to-br
        from-[#8EC5FC]
        to-[#E0C3FC]
        rounded-md
        filter
        blur-3xl
        opacity-50
        -z-50
        dark:from-[#1A202C]
    "
      />
      <header className="container z-40 ">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <nav>
            {user ? <Logout /> : <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}