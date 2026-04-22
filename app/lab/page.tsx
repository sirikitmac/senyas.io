'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";
import { Menu } from 'lucide-react';
import QuickMessages from '@/components/dashboard/QuickMessages';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LeftSidebar from '@/components/dashboard/LeftSidebar';
import RightSettings from '@/components/dashboard/RightSettings';

const HandTracker = dynamic(() => import('@/components/dashboard/HandTracker'), { ssr: false });

export default function LabPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  // State
  const [isCameraOn] = useState(true);
  const [showQuickMessages, setShowQuickMessages] = useState(false);
  const [detectedWord, setDetectedWord] = useState("Awaiting Gesture...");
  const [viewMode, setViewMode] = useState<'camera' | 'hands-only'>('camera');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setMounted(true);
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      if (available.length > 0 && !selectedVoice) setSelectedVoice(available[0].name);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, [selectedVoice]);

  if (!mounted) return null;

  const isDarkMode = theme === 'dark';

  return (
    <main className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <LeftSidebar isOpen={leftSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <button onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className="absolute top-6 left-6 z-50 p-2 rounded-lg bg-zinc-800 text-white transition hover:bg-zinc-700"><Menu size={24} /></button>
        <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className="absolute top-6 right-6 z-50 p-2 rounded-lg bg-zinc-800 text-white transition hover:bg-zinc-700"><Menu size={24} /></button>

        <div className="w-full max-w-4xl space-y-6">
          {/* Main Card: Fixing Light Mode Color and adding padding around camera */}
          <Card className={`rounded-3xl shadow-2xl overflow-hidden border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white/80 border-gray-200'}`}>
            <CardHeader className="border-b border-zinc-800 p-6">
              <CardTitle className="text-xs uppercase tracking-widest opacity-70">Sign Translator</CardTitle>
            </CardHeader>
            <CardContent className="p-8 flex flex-col items-center gap-6">
              
              {/* Camera Container: object-contain to prevent stretching */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-inner p-1">
                <div className="w-full h-full relative">
                  <HandTracker 
                    setDetectedWord={setDetectedWord} 
                    isVisible={isCameraOn} 
                    viewMode={viewMode} 
                  />
                  {/* CSS override within the JSX to ensure object-fit: contain */}
                  <style jsx global>{`
                    #hand-tracker-video {
                      object-fit: contain !important;
                      width: 100% !important;
                      height: 100% !important;
                    }
                  `}</style>
                </div>
              </div>
              
              {/* Status Box */}
              <div className={`w-full py-6 text-center rounded-2xl border ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
                <p className="text-3xl font-bold">{detectedWord}</p>
              </div>

              {/* Big "Quick Messages" Button: Increased font size to text-2xl */}
              <button 
                onClick={() => setShowQuickMessages(!showQuickMessages)} 
                className="w-full h-20 bg-emerald-600 rounded-2xl text-2xl font-bold text-white transition hover:bg-emerald-500 shadow-lg"
              >
                Quick Messages
              </button>

              {/* Message Buttons Grid: Passing the theme to fix colors */}
              {showQuickMessages && <QuickMessages selectedVoice={selectedVoice} theme={theme} />}
            </CardContent>
          </Card>
        </div>
      </div>

      <RightSettings 
        isOpen={rightSidebarOpen} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        selectedVoice={selectedVoice} 
        setSelectedVoice={setSelectedVoice}
        voices={voices}
      />
    </main>
  );
}