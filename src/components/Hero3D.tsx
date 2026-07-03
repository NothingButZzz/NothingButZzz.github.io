"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function DistortedCore() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} scale={0.42} position={[0, 0.1, -2.5]}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={0.4}
          roughness={0.15}
          metalness={0.6}
          distort={0.45}
          speed={2}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.08;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0, 0]} position={[0, 0.1, -2.5]}>
      <torusGeometry args={[1.7, 0.01, 16, 200]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
          <pointLight position={[-5, -3, -5]} intensity={0.8} color="#a855f7" />
          <Stars radius={60} depth={40} count={2500} factor={3} fade speed={1} />
          <DistortedCore />
          <OrbitRing />
        </Suspense>
      </Canvas>
    </div>
  );
}
