import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href='#'
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              AI Student Neu
            </a>
            . Hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel {" "}
            </a>
            Mobile Version{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Dili
            </a>
            .

          </p>
        </div>
        <div>
          Special thanks to  <a
            href='https://www.linkedin.com/in/natasha-hemed-4a5888212/'
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >Tasha H</a> and Professor{" "}

          <a
            href='mailto:fadi.alturjman@neu.edu.tr'
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Prof. Dr. Fadi AL-TURJMAN
          </a>
          .
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
