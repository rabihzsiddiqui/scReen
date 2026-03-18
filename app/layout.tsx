import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "scReen",
  description: "browser-native display size comparison tool. compare screens to scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased bg-zinc-950 text-zinc-100`}>
        {children}
      </body>
    </html>
  );
}
