"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ComponentProps, ReactNode } from "react"

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-white shadow-md px-4 flex flex-row justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <Image className="p-4" src="/assets/logo-nav.png" alt="logo" width={300} height={21.6} />
      </Link>
      <div className="text-primary-foreground flex justify-center px-4">{children}</div>
    </nav>
  )
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      className={cn(
        "text-transform: uppercase font-sans text-black p-4 hover:text-pink-800 focus-visible:bg-white-100 focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-pink-800 text-white hover:text-white rounded"
      )}
    />
  )
}
