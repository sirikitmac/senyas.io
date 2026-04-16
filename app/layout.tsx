import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senyas.IO | Interaction Lab",
  description: "Real-time Sign Language Translator & Gesture Recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full", 
        "antialiased", 
        geistSans.variable, 
        geistMono.variable, 
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-neutral-950">
        {children}

        {/* MEDIAPIPE GLOBAL SCRIPTS 
          These load the 'brain' directly into the browser window 
          to prevent 'Export not found' errors in Turbopack.
        */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js" 
          strategy="beforeInteractive" 
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js" 
          strategy="beforeInteractive" 
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js" 
          strategy="beforeInteractive" 
        />
      </body>
    </html>
  );
}