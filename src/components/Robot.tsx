"use client";

import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { MathUtils } from "three";

/* 低多邊形小機器人：頭會看向滑鼠，眼睛與天線發光 */
export default function Robot() {
  const headRef = useRef<Group>(null);
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // 追蹤整個視窗的滑鼠位置（不只 canvas 範圍內）
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (headRef.current) {
      // 依滑鼠位置轉動頭部（限制角度），緩動跟隨
      const targetY = MathUtils.clamp(pointer.current.x * 0.6, -0.6, 0.6);
      const targetX = MathUtils.clamp(pointer.current.y * 0.4, -0.4, 0.4);
      headRef.current.rotation.y = MathUtils.damp(headRef.current.rotation.y, targetY, 4, delta);
      headRef.current.rotation.x = MathUtils.damp(headRef.current.rotation.x, targetX, 4, delta);
    }
    // 眼睛呼吸閃爍
    const blink = 1.6 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    if (leftEye.current) (leftEye.current.material as MeshStandardMaterial).emissiveIntensity = blink;
    if (rightEye.current) (rightEye.current.material as MeshStandardMaterial).emissiveIntensity = blink;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={headRef}>
        {/* 頭部主體 */}
        <RoundedBox args={[2, 1.7, 1.6]} radius={0.28} smoothness={5}>
          <meshStandardMaterial color="#1b2436" metalness={0.7} roughness={0.35} />
        </RoundedBox>

        {/* 面板（深色內嵌） */}
        <RoundedBox args={[1.6, 1.1, 0.2]} radius={0.18} smoothness={4} position={[0, 0, 0.78]}>
          <meshStandardMaterial color="#0d1420" metalness={0.5} roughness={0.4} />
        </RoundedBox>

        {/* 眼睛 */}
        <mesh ref={leftEye} position={[-0.4, 0.05, 0.9]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
        <mesh ref={rightEye} position={[0.4, 0.05, 0.9]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.6} toneMapped={false} />
        </mesh>

        {/* 側邊耳朵 */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 1.05, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.4, 16]} />
            <meshStandardMaterial color="#2dd4bf" emissive="#0e7490" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
          </mesh>
        ))}

        {/* 天線 */}
        <mesh position={[0, 1.15, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
          <meshStandardMaterial color="#8b82a6" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.4} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}
