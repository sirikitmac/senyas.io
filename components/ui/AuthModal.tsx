"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Clean, white Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M21.35 11.1h-9.2v3.7h5.27c-.45 2.23-2.4 3.7-4.47 3.7-2.93 0-5.3-2.38-5.3-5.3s2.37-5.3 5.3-5.3c1.3 0 2.45.47 3.37 1.25l2.75-2.75C17.75 3.37 15.35 2.5 12.5 2.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5c5.25 0 9.5-4.25 9.5-9.5 0-.6-.05-1.15-.15-1.7z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
    <path d="M17.05 20.28c-.98 1.12-2.02 2.25-3.3 2.28-1.28.04-1.7-.75-3.18-.75-1.48 0-1.94.75-3.18.78-1.32.04-2.44-1.2-3.43-2.74-1.3-2.05-2.27-5.78-.96-8.33.68-1.35 1.9-2.18 3.25-2.2 1.3-.04 2.12.87 3.2.87 1.07 0 2.05-1.07 3.5-1.03 1.8.04 2.92 1.38 3.65 2.58-2.5 1.5-2.25 4.87.12 6.35zM12.5 6.48c.6-1.05 1.05-2.48-.1-3.65-1.08 1.25-2.47 2.15-3.2 3.75.98.07 2.15-.35 3.3-.1z" />
  </svg>
);

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-[#0F0F11]/80 border border-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl text-white overflow-hidden z-10"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">Create an account</h2>

          {/* Form */}
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Enter email or contact number"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#E7C5C5]/50 transition-all duration-200"
            />
            <button className="w-full bg-[#E7C5C5] text-black font-semibold py-4 rounded-2xl hover:bg-[#E7C5C5]/90 transition-all duration-75 hover:scale-[1.02] active:scale-[0.98]">
              Continue
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <span className="relative bg-[#0F0F11] px-4 text-xs text-white/40 uppercase tracking-widest font-mono">OR CONTINUE WITH</span>
          </div>

          {/* Stacked Social Buttons */}
          <div className="space-y-3 mb-8">
            {[
              { icon: <GoogleIcon />, label: "Google" },
              { icon: <FacebookIcon />, label: "Facebook" },
              { icon: <AppleIcon />, label: "Apple" },
            ].map((social) => (
              <button key={social.label} className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-200 font-medium">
                {social.icon}
                <span className="text-white">Continue with {social.label}</span>
              </button>
            ))}
          </div>

          {/* Guest Button - Link to /lab */}
          <Link href="/lab" className="block w-full">
            <button 
              onClick={onClose} 
              className="w-full bg-[#E7C5C5] text-black font-bold py-4 rounded-2xl animate-btn-breathe transition-all duration-75 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
            >
              Continue as Guest
            </button>
          </Link>

          {/* Sign In Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{" "}
              <span className="text-[#E7C5C5] hover:text-[#E7C5C5]/80 font-medium transition-colors duration-200 cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}