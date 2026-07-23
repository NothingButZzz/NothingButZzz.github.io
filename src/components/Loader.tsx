"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // 計數 0 → 100
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOut，讓尾段稍微放慢
      const eased = 1 - Math.pow(1 - t, 2);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 載入期間鎖住捲動並固定在頂端
  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      return;
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-8">初始化中 · INITIALIZING</p>

          <div className="font-display text-7xl font-bold tracking-tight sm:text-8xl">
            <span className="text-gradient">{String(count).padStart(3, "0")}</span>
          </div>

          {/* 進度線 */}
          <div className="mt-8 h-px w-56 overflow-hidden bg-line sm:w-72">
            <div
              className="h-full bg-accent transition-[width] duration-100 ease-out"
              style={{ width: `${count}%` }}
            />
          </div>

          <p className="mono mt-4 text-[0.65rem] tracking-widest text-muted">
            KENNY // DEV — MMXXVI
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
