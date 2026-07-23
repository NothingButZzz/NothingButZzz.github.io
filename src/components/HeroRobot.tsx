"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Robot from "./Robot";

export default function HeroRobot() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} dpr={[1, 1.8]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.6} color="#e9eef2" />
        <pointLight position={[-4, -2, 2]} intensity={1} color="#a855f7" />
        <pointLight position={[3, 1, 4]} intensity={0.8} color="#2dd4bf" />
        <Robot />
      </Suspense>
    </Canvas>
  );
}
