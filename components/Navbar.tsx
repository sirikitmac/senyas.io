// components/Navbar.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/50 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#ffb3c6] to-pink-500" />
          <span className="text-xl font-black text-[#ffb3c6]">Senyas.IO</span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-foreground/80 uppercase tracking-wide">
          <Link href="#features" className="hover:text-[#ffb3c6] transition-colors">Feature</Link>
          <Link href="#vision" className="hover:text-[#ffb3c6] transition-colors">Vision</Link>
          <Link href="#contact" className="hover:text-[#ffb3c6] transition-colors">Contact</Link>
        </div>

        {/* Right: Sign Up + Theme Toggle */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button asChild className="rounded-full bg-[#ffb3c6] text-black font-bold hover:bg-[#ffb3c6]/90 px-6">
            <Link href="/login">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};