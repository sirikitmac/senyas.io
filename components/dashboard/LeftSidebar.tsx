'use client';

import { useState } from 'react';
import { useTheme } from "next-themes";
import { User, Plus, Check, Pencil, Trash2, Moon, Sun } from 'lucide-react';

export default function LeftSidebar({ isOpen }: { isOpen: boolean }) {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState("Juan Dela Cruz");
  const [userContact, setUserContact] = useState("+63 912 345 6789");
  
  // Trusted People State
  const [trustedPeople, setTrustedPeople] = useState([
    { name: "Maria", rel: "Sister", contact: "+63 917 111 2222" },
    { name: "Pedro", rel: "Father", contact: "+63 918 333 4444" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', rel: '', contact: '' });

  return (
    <div className={`fixed md:static inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'w-80' : 'w-0'} ${isDarkMode ? 'bg-zinc-950 border-r border-zinc-800' : 'bg-white border-r border-gray-200'} overflow-hidden`}>
      <div className="h-full flex flex-col p-8">
        <div className="flex-1 overflow-y-auto">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8 mt-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-900' : 'bg-purple-100'}`}>
              <User size={28} className={isDarkMode ? 'text-zinc-400' : 'text-purple-700'} />
            </div>
            <button onClick={() => setIsEditing(!isEditing)} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'}`}>
              {isEditing ? <Check size={20} className="text-green-500"/> : <Pencil size={20} className="opacity-50"/>}
            </button>
          </div>

          {/* Profile Info */}
          <div className="mb-8 space-y-2">
            {isEditing ? (
              <>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full p-2 rounded text-sm ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100 border'}`}/>
                <input value={userContact} onChange={(e) => setUserContact(e.target.value)} className={`w-full p-2 rounded text-sm ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100 border'}`}/>
              </>
            ) : (
              <>
                <p className="text-xl font-bold">{userName}</p>
                <p className="text-sm opacity-50">{userContact}</p>
              </>
            )}
          </div>

          {/* Trusted People */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-50">Trusted People</h3>
            <button onClick={() => setShowAddForm(!showAddForm)} className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all hover:bg-emerald-500">
              Add Contact <Plus size={14}/>
            </button>
          </div>

          {showAddForm && (
            <div className={`p-4 rounded-xl mb-6 space-y-3 border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200 shadow-lg'}`}>
              <input placeholder="Name" className={`w-full text-sm p-2 rounded ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 border'}`} value={newPerson.name} onChange={e => setNewPerson({...newPerson, name: e.target.value})}/>
              <input placeholder="Relationship" className={`w-full text-sm p-2 rounded ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 border'}`} value={newPerson.rel} onChange={e => setNewPerson({...newPerson, rel: e.target.value})}/>
              <input placeholder="Contact" className={`w-full text-sm p-2 rounded ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 border'}`} value={newPerson.contact} onChange={e => setNewPerson({...newPerson, contact: e.target.value})}/>
              <div className="flex gap-2 pt-2">
                <button onClick={() => { setTrustedPeople([...trustedPeople, newPerson]); setShowAddForm(false); setNewPerson({name:'', rel:'', contact:''}) }} className="flex-1 py-2 bg-blue-600 text-white rounded text-sm font-bold">Add</button>
                <button onClick={() => setShowAddForm(false)} className={`flex-1 py-2 rounded text-sm ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-200'}`}>Cancel</button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {trustedPeople.map((p, i) => (
              <div key={i} className={`p-4 rounded-xl flex justify-between items-center ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                <div>
                  <p className="font-semibold text-sm">{p.name} <span className="opacity-50 font-normal">({p.rel})</span></p>
                  <p className="text-xs opacity-60">{p.contact}</p>
                </div>
                <button onClick={() => setTrustedPeople(trustedPeople.filter((_, idx) => idx !== i))} className="opacity-30 hover:opacity-100 hover:text-red-500"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
          className={`mt-4 w-full py-3 px-4 rounded-full border flex items-center justify-center gap-2 transition-all text-sm font-medium
            ${isDarkMode ? 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
}