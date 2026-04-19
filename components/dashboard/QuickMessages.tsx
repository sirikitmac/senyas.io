'use client';

const MESSAGES = [
  { label: "Help Needed", text: "I need help, please assist me." },
  { label: "Emergency", text: "Emergency! Please call for help." },
  { label: "Yes", text: "Yes." },
  { label: "No", text: "No." },
  { label: "Need Water", text: "I need some water." },
  { label: "Thank You", text: "Thank you so much." },
];

export default function QuickMessages() {
  const speak = (text: string) => {
    if (typeof window !== 'undefined') {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 0.9;
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {MESSAGES.map((msg) => (
        <button
          key={msg.label}
          onClick={() => speak(msg.text)}
          className="h-24 rounded-3xl transition-all border border-rose-500/20 shadow-sm font-bold text-lg 
            bg-neutral-900 text-white hover:bg-rose-500/10 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(255,183,197,0.3)]"
        >
          {msg.label}
        </button>
      ))}
    </div>
  );
}