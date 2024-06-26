import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "China Goods",
  description: "An e-commerce site",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Suspense>{children}</Suspense>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
