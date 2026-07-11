"use client";

import { useEffect, useState } from "react";

/* 跟隨游標的微弱光暈，桌機限定 */
export default function MouseSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(34, 211, 238, 0.045), transparent 80%)`,
      }}
    />
  );
}
