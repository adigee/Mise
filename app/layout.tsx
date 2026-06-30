import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

// Three voices (BRIEF.md Section 4): serif = voice, sans = interface, mono = data.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mise · Pre-Shift Brief",
  description:
    "A 15-second pre-shift prep brief. What to prep today, and why. The best moment to reduce waste is before it happens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0a0807] text-fg">{children}</body>
    </html>
  );
}
