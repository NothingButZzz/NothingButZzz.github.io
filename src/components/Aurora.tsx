"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./Aurora.module.css";

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const WIDTH = 1440;
const HEIGHT = 680;

function noise(position: number) {
  const cell = Math.floor(position);
  const fraction = position - cell;
  const blend = fraction * fraction * (3 - 2 * fraction);
  const hash = (value: number) => {
    const seed = Math.sin(value * 127.1 + 311.7) * 43758.5453;
    return seed - Math.floor(seed);
  };
  return hash(cell) * (1 - blend) + hash(cell + 1) * blend;
}

/** Layered, uneven light curtains. Each fold evolves independently over time. */
function paintAurora(context: CanvasRenderingContext2D, time: number, compact: boolean) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.globalCompositeOperation = "screen";

  for (let layer = 0; layer < 3; layer++) {
    const phase = time * (layer === 2 ? 0.88 : 0.65) + layer * 2.3;
    const colour = layer === 0 ? "137, 119, 213" : layer === 1 ? "55, 185, 153" : "111, 235, 173";
    const strength = layer === 0 ? 0.2 : layer === 1 ? 0.34 : 0.56;
    const step = compact ? 6 : 4;

    for (let x = -40; x <= WIDTH + 40; x += step) {
      const u = x / WIDTH;
      const sweep = Math.sin(u * 6.2 + phase);
      const fold = Math.sin(u * 15.5 - phase * 1.3);
      const ripple = Math.sin(u * 32 + phase * 1.7);
      const base = 240 + layer * 27 + sweep * 68 + fold * 27 + ripple * 7 + (noise(u * 9 + phase * 0.35) - 0.5) * 22;
      const length = 140 + layer * 23 + 35 * Math.sin(u * 9 + phase * 0.6);
      const lean = 25 + 19 * Math.sin(u * 5 - phase * 0.5);
      const envelope = Math.pow(Math.max(0, Math.sin(Math.PI * Math.max(0, Math.min(1, u)))), 0.55);
      // Unequal spacing and brightness avoid a regular striped or sinusoidal look.
      const threads = 0.3 + 0.5 * noise(x * 0.12 + phase * 0.3) + 0.2 * noise(x * 0.43 - phase * 0.4);
      const folds = 0.6 + 0.4 * Math.pow(Math.sin(u * 12 - phase), 2);
      const alpha = strength * envelope * threads * folds;
      const light = context.createLinearGradient(x + lean, base - length, x, base + 20);
      light.addColorStop(0, "rgba(131, 114, 197, 0)");
      light.addColorStop(0.18, `rgba(131, 114, 197, ${alpha * 0.04})`);
      light.addColorStop(0.52, `rgba(${colour}, ${alpha * 0.11})`);
      light.addColorStop(0.78, `rgba(${colour}, ${alpha * 0.4})`);
      light.addColorStop(0.9, `rgba(${colour}, ${alpha})`);
      light.addColorStop(0.95, `rgba(${colour}, ${alpha * 0.6})`);
      light.addColorStop(1, `rgba(${colour}, 0)`);
      context.fillStyle = light;
      context.beginPath();
      context.moveTo(x + lean, base - length);
      context.lineTo(x + lean + step + 1, base - length);
      context.lineTo(x + step + 1, base + 20);
      context.lineTo(x, base + 20);
      context.closePath();
      context.fill();
    }
  }
  context.globalCompositeOperation = "source-over";
}

export default function Aurora() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(4);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, () => false);

  useEffect(() => {
    const node = root.current;
    const field = canvas.current;
    const context = field?.getContext("2d", { alpha: true });
    if (!node || !field || !context) return;

    let frame = 0;
    let lastTick = 0;
    let lastPaint = 0;
    let inView = false;
    let compact = false;
    let disposed = false;
    const canPlay = () => inView && !document.hidden && !paused && !reducedMotion;
    const paint = () => paintAurora(context, elapsed.current, compact);

    const tick = (now: number) => {
      frame = 0;
      if (disposed || !canPlay()) return;
      if (lastTick) elapsed.current += Math.min(now - lastTick, 100) / 1000;
      lastTick = now;
      // Limit painting work, especially on phones. No React updates per frame.
      const interval = 1000 / (compact ? 24 : 30);
      if (now - lastPaint >= interval) {
        paint();
        lastPaint = now - ((now - lastPaint) % interval);
      }
      frame = requestAnimationFrame(tick);
    };

    const syncMotion = () => {
      const playing = canPlay();
      node.dataset.active = String(playing);
      if (playing && !frame) {
        lastTick = 0;
        frame = requestAnimationFrame(tick);
      } else if (!playing) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTick = 0;
      }
    };

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      compact = window.innerWidth < 768;
      const scale = Math.min(window.devicePixelRatio || 1, compact ? 1 : 1.25);
      field.width = Math.min(1800, Math.round(bounds.width * scale));
      field.height = Math.min(900, Math.round(bounds.height * scale));
      context.setTransform(field.width / WIDTH, 0, 0, field.height / HEIGHT, 0, 0);
      paint();
    };

    resize();
    const sizes = new ResizeObserver(resize);
    sizes.observe(field);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncMotion();
    });
    visibility.observe(field);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizes.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, [paused, reducedMotion]);

  return (
    <div ref={root} className={styles.root} data-paused={paused}>
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.haze} />
        <canvas ref={canvas} className={styles.field} />
      </div>
      <button type="button" className={styles.toggle} disabled={reducedMotion} aria-pressed={paused || reducedMotion} aria-label={reducedMotion ? "極光靜態：系統已開啟減少動態效果" : "暫停極光動畫"} onClick={() => setPaused(!paused)}>
        <span className={styles.indicator} aria-hidden="true" />
        <span>極光<span className={styles.divider}> / </span>{reducedMotion ? "系統減少動態" : paused ? "已暫停" : "流動中"}</span>
        <span aria-hidden="true">{reducedMotion ? "—" : paused ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
