"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

/* three.js 只在桌機載入：手機和平板不下載 3D 程式碼，也不跑 WebGL 迴圈 */
const HeroDrone = dynamic(() => import("./HeroDrone"), { ssr: false });

const QUERY = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export default function HeroDroneMount() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
  return enabled ? <HeroDrone /> : null;
}
