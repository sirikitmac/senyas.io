'use client';

const MESSAGES = [
  { label: "Help Needed", text: "I need help, please assist me." },
  { label: "Emergency", text: "Emergency! Please call for help." },
  { label: "Yes", text: "Yes." },
  { label: "No", text: "No." },
  { label: "Need Water", text: "I need some water." },
  { label: "Thank You", text: "Thank you so much." },
];

export default function QuickMessages({ selectedVoice, theme }: { selectedVoice: string, theme?: string }) {
  const isDarkMode = theme === 'dark';

  const speak = (text: string) => {
    if (typeof window === 'undefined') return;

    // Interrupt previous speech immediately
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.9;
    
    // Find the voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) speech.voice = voice;
    
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6 w-full animate-in slide-in-from-top-4 duration-300">
      {MESSAGES.map((msg) => (
        <button
          key={msg.label}
          onClick={() => speak(msg.text)}
          className={`
            h-24 rounded-3xl transition-all duration-300 font-bold text-xl
            backdrop-blur-xl border shadow-lg flex items-center justify-center
            ${isDarkMode 
              ? 'bg-zinc-900/60 border-zinc-700 text-white hover:bg-zinc-800/80 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
              : 'bg-white/70 border-gray-200 text-gray-900 hover:bg-white hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]'
            }
          `}
        >
          {msg.label}
        </button>
      ))}
    </div>
  );
}