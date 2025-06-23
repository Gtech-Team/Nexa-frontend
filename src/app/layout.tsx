import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexa - Nigeria's #1 AI Local Business Platform",
  description:
    "AI-powered local commerce platform connecting users with businesses across Nigeria. Discover, book, and engage with local services effortlessly.",
  keywords: ["AI", "local commerce", "Nigeria", "business discovery", "booking platform"],
  authors: [{ name: "Nexa Team" }],
  openGraph: {
    title: "Nexa - Nigeria's #1 AI Local Commerce Platform",
    description: "AI-powered local commerce platform connecting users with businesses across Nigeria.",
    url: "https://nexa.ng",
    siteName: "Nexa",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexa - Nigeria's #1 AI Local Business Platform",
    description: "AI-powered local commerce platform connecting users with businesses across Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
