"use client";

import { useEffect, useRef } from "react";

/* 圈 + 點的自訂游標：點精準跟隨，外圈帶延遲緩動，滑到連結時放大 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 觸控裝置不啟用
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      // 點：立即跟隨
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      hovering = !!target.closest("a, button, [role='button']");
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const tick = () => {
      // 外圈：緩動跟隨（lerp）
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      const scale = hovering ? 1.8 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = hovering
        ? "rgba(45, 212, 191, 0.9)"
        : "rgba(45, 212, 191, 0.5)";
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] hidden lg:block" aria-hidden>
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border opacity-0 transition-[opacity,border-color] duration-300"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
