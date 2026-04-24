"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Note: We are importing from the new file we just created
import { Highlight } from "@/components/ui/hero-highlight";

const words = ["Simple", "Fast", "Accessible"];

export const HeroTextSwitcher = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center gap-2 text-2xl md:text-5xl font-bold text-foreground">
      <span>Senyas.IO is</span>
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <Highlight className="text-black dark:text-white">
            {words[index]}
          </Highlight>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};