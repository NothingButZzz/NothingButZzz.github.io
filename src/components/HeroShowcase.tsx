"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

const VIEWS = [
  { label: "01 / CAD 設計", src: "/media/projects/tdk/cad-render.webp", alt: "TDK 遙控組機器人的 SolidWorks 整車 CAD 設計", note: "SolidWorks · 整車機構設計" },
  { label: "02 / 實車組裝", src: "/media/projects/tdk/robot.webp", alt: "TDK 遙控組機器人完成整合後的實車", note: "從機械製圖，到加工與組裝" },
];

export default function HeroShowcase() {
  const [view, setView] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const current = VIEWS[view];

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (panel.current) panel.current.style.transform = "perspective(1100px) rotateX(" + (-y * 5) + "deg) rotateY(" + (x * 5) + "deg)";
  }

  return (
    <div className="hero-showcase" onPointerMove={tilt} onPointerLeave={() => { if (panel.current) panel.current.style.transform = ""; }}>
      <div className="showcase-orbit" aria-hidden="true" />
      <div ref={panel} className="showcase-panel">
        <div className="showcase-topline mono"><span><span className="status-dot" /> PROJECT / TDK–30</span><span>2026</span></div>
        <div className="showcase-image">
          <Image key={current.src} src={current.src} alt={current.alt} fill sizes="(max-width: 767px) 90vw, 45vw" loading={view === 0 ? "eager" : "lazy"} className="object-contain" />
          <span className="image-crosshair top-4 left-4" aria-hidden="true">+</span><span className="image-crosshair right-4 bottom-4" aria-hidden="true">+</span>
          <div className="showcase-caption mono">{current.note}</div>
        </div>
        <div className="showcase-switch" role="group" aria-label="機器人展示視圖">
          {VIEWS.map((item, index) => <button key={item.label} type="button" aria-pressed={view === index} onClick={() => setView(index)}>{item.label}<span aria-hidden="true">{view === index ? "●" : "○"}</span></button>)}
        </div>
        <div className="showcase-footer"><div><p className="text-sm font-semibold">從 CAD 到真實世界</p><p className="mt-1 text-xs text-muted">全向底盤 × 升降機構 × 模組化夾爪</p></div><a href="#project-tdk" aria-label="查看 TDK 機器人專案" className="showcase-link">↗</a></div>
      </div>
      <div className="showcase-note mono"><span aria-hidden="true">↳</span> DESIGNED. BUILT. INTEGRATED.</div>
    </div>
  );
}

