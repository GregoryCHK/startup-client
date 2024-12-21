import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar/NavBar";
import BreadCrumbs from "@/components/BreadCrumbs";

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
        <NavBar />
        <BreadCrumbs/>
        {children}
      </body>
    </html>
  );
}
