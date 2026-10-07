"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleSphere from "./ParticleSphere";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.8]} gl={{ antialias: false, alpha: true }}>
      <Suspense fallback={null}>
        <ParticleSphere />
      </Suspense>
    </Canvas>
  );
}
