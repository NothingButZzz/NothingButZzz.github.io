"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Drone from "./Drone";

export default function HeroDrone() {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 42 }} dpr={[1, 1.8]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.5} color="#e9eef2" />
        <pointLight position={[-4, -2, 2]} intensity={1} color="#a855f7" />
        <pointLight position={[3, 1, 4]} intensity={0.9} color="#2dd4bf" />
        <Drone />
      </Suspense>
    </Canvas>
  );
}
