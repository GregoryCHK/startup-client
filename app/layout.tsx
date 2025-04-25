import type { Metadata } from "next";
import { Roboto, Nunito, Poppins } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/navbar/Navbar";
import BreadCrumbs from "@/components/breadcrumbs";
import QueryProvider from "@/providers/query-provider";

import { Toaster } from "@/components/ui/sonner";

// Set up Roboto font
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const nunito = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pilot StartUp",
  description: "Full Back Office Travel Operators Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <QueryProvider>
          <div className="sticky top-0 z-50 bg-background">
            <NavBar />
            <BreadCrumbs/>
          </div>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
