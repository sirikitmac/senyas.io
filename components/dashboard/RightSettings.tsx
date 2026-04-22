'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function RightSettings({ isOpen, viewMode, setViewMode, selectedVoice, setSelectedVoice, voices }: any) {
  const { theme } = useTheme();
  
  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-0'} border-l ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'} overflow-hidden`}>
      <div className="p-8 space-y-8">
        <h3 className="text-xs font-bold uppercase opacity-50">Settings</h3>
        
        {/* View Mode */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold opacity-50">View Mode</label>
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="camera">Camera On</SelectItem>
              <SelectItem value="hands-only">Hands Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Voice Selection */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold opacity-50">Voice Settings</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {voices.map((v: any) => <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}