import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const invitationSerif = localFont({
  src: [
    { path: "../public/fonts/NotoSerif-Regular.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/NotoSerif-Italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-invitation-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A Little Invitation | Minh Tri\u1ec1u",
  description: "L\u1eddi m\u1eddi t\u1ed1t nghi\u1ec7p t\u1eeb Minh Tri\u1ec1u. H\u1eb9n b\u1ea1n ng\u00e0y 29/11/2026.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={invitationSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
