'use client';

import { useState, useEffect } from 'react';
import HeroSectionOne from "@/components/hero-section-demo-1";
import { DashboardStats } from "@/components/DashboardStats";
import HoverFooter from "@/components/ui/HoverFooter";
import AuthModal from "@/components/ui/AuthModal"; // 1. Import your new modal
import { useTheme } from "next-themes";

export default function LandingPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // 2. Add state for the modal

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center bg-background text-foreground transition-colors duration-500 overflow-hidden pb-10">
      
      {/* 1. Hero Content */}
      {/* 3. Pass the open function to your Hero if it has a button */}
      <HeroSectionOne onTrySenyas={() => setIsAuthOpen(true)} />

      {/* 2. Logo Placeholder + Dashboard Stats */}
      <section className="w-full relative z-10 flex flex-col items-center">
        <div className="h-16 w-16 mb-8 flex items-center justify-center">
           {/* Space reserved for logo */}
        </div>
        <DashboardStats />
      </section>

      {/* 3. Footer */}
      <HoverFooter />
      
      {/* 4. The Auth Modal Layer */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
    </main>
  );
}