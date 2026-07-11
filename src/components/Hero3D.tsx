"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";

/* 內層發光核心 + 外層旋轉線框 */
function Core() {
  const coreRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.15;
      coreRef.current.rotation.y += delta * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.06;
      wireRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[0, 0.1, -2.5]}>
        <mesh ref={coreRef} scale={0.38}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#22d3ee"
            emissive="#0e7490"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.7}
            distort={0.4}
            speed={2}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh ref={wireRef} scale={0.72}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({ radius, speed, tilt, color, opacity }: {
  radius: number; speed: number; tilt: number; color: string; opacity: number;
}) {
  const ringRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0.2, 0]} position={[0, 0.1, -2.5]}>
      <torusGeometry args={[radius, 0.008, 8, 220]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* 環繞核心的粒子雲 */
function ParticleField() {
  const pointsRef = useRef<Points>(null);

  const positions = useMemo(() => {
    const count = 350;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2.5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#7dd3fc" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* 讓整個場景跟著滑鼠輕微傾斜，做出視差感 */
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.2;
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
          <pointLight position={[5, 5, 5]} intensity={1.4} color="#22d3ee" />
          <pointLight position={[-5, -3, -5]} intensity={1} color="#a855f7" />
          <Stars radius={60} depth={40} count={2200} factor={2.6} fade speed={0.8} />
          <ParallaxRig>
            <Core />
            <OrbitRing radius={1.55} speed={0.1} tilt={Math.PI / 2.4} color="#a855f7" opacity={0.45} />
            <OrbitRing radius={1.9} speed={-0.07} tilt={Math.PI / 1.9} color="#22d3ee" opacity={0.25} />
            <ParticleField />
          </ParallaxRig>
        </Suspense>
      </Canvas>
    </div>
  );
}
