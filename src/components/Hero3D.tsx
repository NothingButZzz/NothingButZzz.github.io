"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

/* 內層發光核心 + 外層旋轉線框 */
function Core() {
  const coreRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.1;
      coreRef.current.rotation.y += delta * 0.14;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.04;
      wireRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={[0, 0.1, -2.5]}>
        <mesh ref={coreRef} scale={0.38}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0e7490"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.6}
            distort={0.32}
            speed={1.6}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh ref={wireRef} scale={0.72}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.14} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.06;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2.4, 0.2, 0]} position={[0, 0.1, -2.5]}>
      <torusGeometry args={[1.6, 0.006, 8, 220]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0.3} />
    </mesh>
  );
}

/* 讓整個場景跟著滑鼠輕微傾斜，做出視差感 */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.08;
    const targetY = state.pointer.x * 0.14;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
          <pointLight position={[-5, -3, -5]} intensity={0.7} color="#a855f7" />
          <Stars radius={60} depth={40} count={1000} factor={2} fade speed={0.5} />
          <ParallaxRig>
            <Core />
            <OrbitRing />
          </ParallaxRig>
        </Suspense>
      </Canvas>
    </div>
  );
}
