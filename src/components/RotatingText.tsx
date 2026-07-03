"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-block h-[1.4em] min-w-[14ch] align-bottom overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gradient absolute left-0 top-0 font-mono"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
