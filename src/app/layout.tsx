import type { Metadata } from "next"
import { Teko } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"


const teko = Teko({ subsets: ["latin"], display: 'swap', variable: "--font-sans" })

export const metadata: Metadata = {
  title: "DABEATZ | High Quality Audio Samples",
  description: "High Quality Audio Samples",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen text-xl antialiased",
          teko.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
