import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import ChatBot from "./ChatBot";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AidLink",
  description: "Superpowering natural disaster recovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider signInUrl="/sign-in">
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Toaster />
          <header className="px-4 lg:px-6 h-14 flex items-center">
            <Link className="flex items-center justify-center" href="/">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                AidLink
              </span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/feature"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/about"
              >
                About
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/contact"
              >
                Contact
              </Link>
              <SignedIn>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="/sign-in"
                >
                  Sign In
                </Link>
              </SignedOut>
            </nav>
          </header>
          {/* <ChatBot /> */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
