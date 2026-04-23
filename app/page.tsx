'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar"; 
import HeroSectionOne from "@/components/hero-section-demo-1";
import { DashboardStats } from "@/components/DashboardStats";
import HoverFooter from "@/components/ui/HoverFooter";
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-background text-foreground transition-colors duration-500 overflow-hidden pb-10">
      
      {/* 1. Global Navbar */}
      <Navbar />

      {/* 2. Hero Content - Added pt-20 to prevent overlap with fixed Navbar */}
      <div className="pt-20 w-full">
        <HeroSectionOne />
      </div>

      {/* 3. Dashboard Stats */}
      <section className="w-full relative z-10 flex flex-col items-center">
        <DashboardStats />
      </section>

      {/* 4. Footer */}
      <HoverFooter />
      
    </main>
  );
}