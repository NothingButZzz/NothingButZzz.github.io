"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2600);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-gradient"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="h-[1.15em] w-[2px] animate-pulse rounded-full bg-accent" aria-hidden />
    </span>
  );
}
