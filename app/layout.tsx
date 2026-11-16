import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { invitationMetadata } from "@/lib/site-metadata";

const invitationSerif = localFont({
  src: [
    { path: "../public/fonts/NotoSerif-Regular.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/NotoSerif-Italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-invitation-serif",
  display: "swap",
});

export const metadata: Metadata = invitationMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={invitationSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
