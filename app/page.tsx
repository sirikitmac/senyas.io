'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SenyasIO() {
  const [activeTab, setActiveTab] = useState('translator'); 
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Custom Sidebar Width State
  const [sidebarWidth, setSidebarWidth] = useState(320); // Default width

  // Omni Sense States
  const videoRef = useRef(null);
  const [detectedWord, setDetectedWord] = useState("Awaiting Gesture...");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  // Camera Handling
  useEffect(() => {
    let stream = null;
    async function startCamera() {
      if (activeTab === 'translator') {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) { videoRef.current.srcObject = stream; }
        } catch (err) { console.error("Camera access denied:", err); }
      }
    }
    startCamera();
    return () => { if (stream) { stream.getTracks().forEach(track => track.stop()); } };
  }, [activeTab]);

  const speakWord = (word) => {
    setDetectedWord(word);
    if (voiceEnabled) {
      const speech = new SpeechSynthesisUtterance(word);
      speech.rate = 0.9; 
      window.speechSynthesis.speak(speech);
    }
  };

  // Custom Dragging Logic (No external libraries needed!)
  const startResizing = useCallback((mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    
    const handleMouseMove = (e) => {
      // Calculate width from the right edge of the screen
      const newWidth = window.innerWidth - e.clientX;
      // Set limits: Min 250px, Max 500px
      if (newWidth >= 250 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto'; // Turn text selection back on
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Stop text from highlighting while dragging
  }, []);

  // Helper to render glowing buttons
  const GlowingButton = ({ id, label, colorClass, glowColor }) => (
    <div className="relative group w-full mb-3">
      {activeTab === id && (
        <div className={`absolute -inset-1 rounded-xl blur-md opacity-70 animate-pulse ${glowColor}`}></div>
      )}
      <Button 
        onClick={() => setActiveTab(id)}
        variant="ghost"
        className={`relative w-full justify-start text-sm h-12 rounded-xl transition-all border border-white/5 
          ${activeTab === id ? `bg-white/10 text-white border-white/20` : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/5'}
        `}
      >
        <div className={`w-2 h-2 rounded-full mr-3 ${colorClass} ${activeTab === id ? 'animate-ping' : ''}`}></div>
        {label}
      </Button>
    </div>
  );

  return (
    <main className={`flex h-screen w-full overflow-hidden transition-colors duration-500 font-sans ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* ================= MAIN CONTENT (LEFT) ================= */}
      <section className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-[1200px] animate-in fade-in zoom-in-95 duration-700">
          
          {activeTab === 'translator' ? (
            <Card className={`w-full backdrop-blur-2xl shadow-2xl rounded-[40px] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200'}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/5">
                <CardTitle className="text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">Sign Translator System</CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium opacity-50">Audio</span>
                  <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} className="data-[state=checked]:bg-purple-500" />
                </div>
              </CardHeader>
              <CardContent className="p-10 flex flex-col items-center gap-10">
                <div className={`w-full aspect-video rounded-[32px] overflow-hidden relative shadow-2xl border transition-all duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-neutral-200 border-neutral-300'} ${isDetecting ? 'ring-4 ring-purple-500/30' : ''}`}>
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover -scale-x-100 opacity-80" />
                  {isDetecting && <div className="absolute inset-0 bg-purple-500/10 animate-pulse pointer-events-none" />}
                </div>
                <div className={`w-full flex flex-col items-center py-8 rounded-[32px] border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-neutral-100 border-neutral-200'}`}>
                  <p className="text-4xl font-bold tracking-tight">{detectedWord}</p>
                </div>
                <Button 
                  onClick={() => { setIsDetecting(true); speakWord("Help Needed"); setTimeout(() => setIsDetecting(false), 2000); }} 
                  className="w-full max-w-md h-16 rounded-full text-lg font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20 shadow-2xl transition-transform active:scale-95"
                >
                  Test Assistance
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-[600px] text-center">
              <div className="w-20 h-20 rounded-full bg-purple-500/20 animate-bounce mb-6 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.8)]"></div>
              </div>
              <h2 className="text-5xl font-black tracking-tighter mb-4">Loading {activeTab.replace('_', ' ')}</h2>
              <p className="text-neutral-500 max-w-sm">Drop Kuya Heri's HTML logic here to activate this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= THE DRAGGABLE HANDLE ================= */}
      <div 
        onMouseDown={startResizing}
        className={`w-1.5 flex-shrink-0 cursor-col-resize transition-colors flex items-center justify-center ${isDarkMode ? 'bg-white/5 hover:bg-purple-500' : 'bg-neutral-200 hover:bg-purple-500'}`}
      >
        <div className={`h-12 w-0.5 rounded-full pointer-events-none ${isDarkMode ? 'bg-white/20' : 'bg-neutral-400'}`} />
      </div>

      {/* ================= NEON SIDEBAR (RIGHT) ================= */}
      {/* Notice the custom style={{ width: sidebarWidth }} here! */}
      <aside 
        style={{ width: `${sidebarWidth}px` }} 
        className={`flex-shrink-0 flex flex-col p-8 transition-colors duration-500 ${isDarkMode ? 'bg-black/40' : 'bg-white shadow-2xl'}`}
      >
        <div className="mb-10">
          <h1 className="text-xl font-black tracking-tighter mb-1">Senyas.IO</h1>
          <p className="text-[10px] font-bold text-neutral-500 tracking-[0.3em] uppercase">Interaction Lab</p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[10px] font-bold text-neutral-600 tracking-widest mb-4 uppercase">Main System</p>
          <GlowingButton id="translator" label="Senyas.IO" colorClass="bg-purple-500" glowColor="bg-purple-500" />
          
          <div className="h-px bg-white/5 my-6" />
          
          <p className="text-[10px] font-bold text-neutral-600 tracking-widest mb-4 uppercase">Camera Filters</p>
          <GlowingButton id="air_canvas" label="Air Canvas" colorClass="bg-blue-500" glowColor="bg-blue-500" />
          <GlowingButton id="face_mesh" label="Face Mesh" colorClass="bg-emerald-500" glowColor="bg-emerald-500" />
          <GlowingButton id="finger_distort" label="Finger Tap Distortion" colorClass="bg-orange-500" glowColor="bg-orange-500" />
          <GlowingButton id="interactive_poly" label="Interactive Poly" colorClass="bg-pink-500" glowColor="bg-pink-500" />
          <GlowingButton id="interactive_water" label="Interactive Water" colorClass="bg-cyan-500" glowColor="bg-cyan-500" />
          <GlowingButton id="ripple_snap" label="Ripple Filter Snap" colorClass="bg-yellow-500" glowColor="bg-yellow-500" />
          <GlowingButton id="sparkler" label="Sparkler" colorClass="bg-red-500" glowColor="bg-red-500" />
        </div>

        {/* Theme Toggle at Bottom */}
        <div className={`mt-8 p-4 rounded-2xl border flex items-center justify-between flex-shrink-0 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'}`}>
          <span className="text-xs font-bold uppercase tracking-wider opacity-60">Dark Mode</span>
          <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} className="data-[state=checked]:bg-purple-500" />
        </div>
      </aside>
    </main>
  );
}