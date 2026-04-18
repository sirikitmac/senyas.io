"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

export function DashboardStats() {
  const [stats, setStats] = useState({
    signs: 0,
    users: 0,
    convos: 0,
    messages: 0,
  });

  useEffect(() => {
    // Randomized low-key stats
    setStats({
      signs: Math.floor(Math.random() * (10000 - 7000 + 1) + 6000),
      users: Math.floor(Math.random() * (2000 - 800 + 1) + 800),
      convos: Math.floor(Math.random() * (3000 - 2000 + 1) + 2000),
      messages: Math.floor(Math.random() * (10000 - 8000 + 1) + 8000),
    });
  }, []);

  const data = [
    { label: "Signs Translated", value: stats.signs, sub: "+5 today" },
    { label: "Active Users", value: stats.users, sub: "+12 active now" },
    { label: "Conversations", value: stats.convos, sub: "+3 recently" },
    { label: "Quick Messages", value: stats.messages, sub: "+8 used today" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 mt-24 mb-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            // Glassmorphism classes
            className="w-full glass p-4 md:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-all"
          >
            <p className="text-neutral-400 text-[10px] md:text-xs uppercase tracking-wider font-semibold">
              {item.label}
            </p>
            <div className="mt-4">
              <h3 className="text-xl md:text-3xl font-bold text-foreground">
                <AnimatedCounter target={item.value} />
              </h3>
              <p className="text-primary text-[10px] md:text-sm mt-1 font-medium">
                {item.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}