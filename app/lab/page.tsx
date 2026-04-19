'use client';

import { useState, useCallback } from 'react';
import Sidebar from '@/components/dashboard/Sidebar'; 
import HandTracker from '@/components/dashboard/HandTracker'; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import QuickMessages from '@/components/dashboard/QuickMessages';

export default function SenyasIO() {
  const [activeTab, setActiveTab] = useState('translator'); 
  const [isDarkMode, setIsDarkMode] = useState(true); // Toggle is now live!
  const [sidebarWidth, setSidebarWidth] = useState(320);

  const [detectedWord, setDetectedWord] = useState("Awaiting Gesture...");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showQuickMessages, setShowQuickMessages] = useState(false);

  const startResizing = useCallback((mouseDownEvent: React.MouseEvent) => {
    mouseDownEvent.preventDefault();
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 250 && newWidth <= 500) setSidebarWidth(newWidth);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <main className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      
      <section className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[800px] animate-in fade-in zoom-in-95 duration-700">
          
          <Card className={`w-full backdrop-blur-2xl shadow-2xl rounded-[40px] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-neutral-900/50 border-white/10' : 'bg-white border-neutral-200'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-neutral-200/20">
              <CardTitle className="text-xs font-bold tracking-[0.2em] uppercase">Sign Translator System</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium opacity-50">Audio</span>
                <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} className="data-[state=checked]:bg-rose-500" />
              </div>
            </CardHeader>
            <CardContent className="p-10 flex flex-col items-center gap-10">
              <HandTracker setDetectedWord={setDetectedWord} />

              <div className={`w-full flex flex-col items-center py-8 rounded-[32px] border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-neutral-100 border-neutral-200'}`}>
                <p className="text-4xl font-bold tracking-tight">{detectedWord}</p>
              </div>
              
              <button 
                onClick={() => setShowQuickMessages(!showQuickMessages)}
                className={`w-full h-16 rounded-full font-black text-white text-lg transition-all duration-300 shadow-xl animate-btn-breathe hover:animate-none hover:scale-[1.02] active:scale-95
                  ${showQuickMessages ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {showQuickMessages ? "Hide Quick Messages" : "Quick Message"}
              </button>
            </CardContent>
          </Card>

          {showQuickMessages && (
            <div className="mt-6 animate-in slide-in-from-top-4 duration-300">
              <QuickMessages />
            </div>
          )}
        </div>
      </section>

      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        sidebarWidth={sidebarWidth}
        startResizing={startResizing}
      />
    </main>
  );
}