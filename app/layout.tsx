import type React from "react"
import type { Metadata, Viewport } from "next"
import { Lexend, Roboto_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" })
const robotoSerif = Roboto_Serif({ subsets: ["latin"], variable: "--font-roboto-serif" })

export const metadata: Metadata = {
  title: "Eurekathon sTEM",
  description:
    "Eurekathon sTEM — Eureka Institute's STEM competition platform.",
  generator: "eurekathon-stem",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B0C0F",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#0B0C0F]">
      <body className={`${lexend.variable} ${robotoSerif.variable} font-sans antialiased bg-[#0B0C0F]`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
