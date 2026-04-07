import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEON-GATE // Kaka's Cyber Outpost",
  description: "A cyberpunk bento grid digital business card",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        {children}
      </body>
    </html>
  );
}