"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React, { ReactNode, useState, MouseEvent } from "react"

interface NavProps {
  children: ReactNode
}

interface CustomLinkProps extends LinkProps {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  children: ReactNode
}

export function Nav({ children }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-4 flex flex-row justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <Image className="p-4 w-2/3 md:w-3/4" src="/assets/logo-nav.png" alt="logo" width={300} height={21.6} />
      </Link>
      <div className="hidden md:flex text-primary-foreground justify-center px-4">{children}</div>
      <button
        className="md:hidden text-pink-800 focus:outline-none p-4"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white shadow-lg border border-gray-200">
          <div className="flex flex-col p-4 space-y-2">
            {React.Children.map(children, child => {
              if (React.isValidElement<CustomLinkProps>(child)) {
                return React.cloneElement(child, { onClick: handleCloseMenu });
              }
              return child;
            })}
          </div>
        </div>
      )}
    </nav>
  )
}

export function NavLink({ href, onClick, children }: CustomLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e)
  }

  return (
    <Link href={href} passHref

      onClick={handleClick}
      className={cn(
        "text-transform: uppercase font-sans text-black p-4 hover:text-pink-800 focus-visible:bg-white-100 focus-visible:text-secondary-foreground text-center flex justify-center items-center md:text-lg",
        pathname === href && "bg-pink-800 text-white hover:text-white rounded"
      )}>

      {children}

    </Link>
  )
}
