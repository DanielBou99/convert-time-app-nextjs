"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <body className={inter.className}>
          {children}
          <Analytics />
        </body>
      </LocalizationProvider>
    </html>
  );
}
