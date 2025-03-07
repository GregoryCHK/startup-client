import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/navbar/Navbar";
import BreadCrumbs from "@/components/breadcrumbs";
import QueryProvider from "@/providers/query-provider";

// Set up Roboto font
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

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
      <body className={roboto.className}>
        <QueryProvider>
          <div className="sticky top-0 z-50 bg-background">
            <NavBar />
            <BreadCrumbs/>
          </div>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
