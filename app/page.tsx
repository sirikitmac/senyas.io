import HeroSectionOne from "@/components/hero-section-demo-1";
import { DashboardStats } from "@/components/DashboardStats";

export default function LandingPage() {
  return (
    // bg-black ensures a solid dark canvas
    <main className="relative w-full min-h-screen flex flex-col items-center bg-black transition-colors duration-500 overflow-hidden pb-10">
      
      {/* 1. Hero Content */}
      <HeroSectionOne />

      {/* 2. Logo Placeholder + Dashboard Stats */}
      <section className="w-full relative z-10 flex flex-col items-center">
        {/* Head space for your future logo */}
        <div className="h-16 w-16 mb-8 flex items-center justify-center">
           {/* Space reserved for logo */}
        </div>

        <DashboardStats />
      </section>
      
    </main>
  );
}