"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export default function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Content remains visible without JavaScript; animate only below-fold entries.
    if (node.getBoundingClientRect().top < window.innerHeight) return;
    node.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.remove("reveal-pending"); observer.disconnect(); }
    }, { threshold: 0.05 });
    observer.observe(node);
    return () => { observer.disconnect(); node.classList.remove("reveal-pending"); };
  }, []);
  return <div ref={ref} className={"reveal " + className} style={{ "--reveal-delay": delay + "s" } as CSSProperties}>{children}</div>;
}
