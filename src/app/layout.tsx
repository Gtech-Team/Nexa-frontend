import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexa - Nigeria's #1 AI Local Business Platform",
  description:
    "AI-powered local commerce platform connecting users with businesses across Nigeria. Discover, book, and engage with local services effortlessly.",
  keywords: [
    "AI",
    "local commerce",
    "e-commerce",
    "Nigeria",
    "business discovery",
    "booking platform",
  ],
  authors: [{ name: "Nexa Team" }],
  icons: {
    icon: [
      { url: "/nexa-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/nexa-favicon.png", sizes: "16x16", type: "image/png" }
    ],
    shortcut: ["/nexa-favicon.png"],
    apple: [
      { url: "/nexa-favicon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Nexa - Nigeria's #1 AI Local Commerce Platform",
    description:
      "AI-powered local commerce platform connecting users with businesses across Nigeria.",
    url: "https://nexa.ng",
    siteName: "Nexa",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexa - Nigeria's #1 AI Local Business Platform",
    description:
      "AI-powered local commerce platform connecting users with businesses across Nigeria.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<div>Loading Nexa...</div>}>{children}</Suspense>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
