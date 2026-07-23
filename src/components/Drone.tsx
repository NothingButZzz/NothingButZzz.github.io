"use client";

import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

const ARM_ANGLES = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
const MOTOR_R = 1.25;

/* 合併出無人機的實體幾何（機身 + 四臂 + 馬達） */
function useDroneGeometry() {
  return useMemo(() => {
    const parts: THREE.BufferGeometry[] = [];

    const body = new THREE.CylinderGeometry(0.62, 0.78, 0.34, 6);
    parts.push(body);

    const dome = new THREE.SphereGeometry(0.4, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    dome.translate(0, 0.16, 0);
    parts.push(dome);

    for (const angle of ARM_ANGLES) {
      const arm = new THREE.BoxGeometry(1.15, 0.1, 0.14);
      arm.translate(0.62, 0, 0);
      arm.rotateY(angle);
      parts.push(arm);

      const mx = Math.cos(angle) * MOTOR_R;
      const mz = -Math.sin(angle) * MOTOR_R;
      const motor = new THREE.CylinderGeometry(0.17, 0.17, 0.24, 12);
      motor.translate(mx, 0.02, mz);
      parts.push(motor);
    }

    return BufferGeometryUtils.mergeGeometries(parts, false)!;
  }, []);
}

export default function Drone() {
  const rootRef = useRef<THREE.Group>(null);
  const solidRef = useRef<THREE.Group>(null);
  const rotorsRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useDroneGeometry();
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // 由表面取樣出粒子的基準位置 + 每顆的飛散方向
  const { basePositions, directions, count } = useMemo(() => {
    const N = 2200;
    const mesh = new THREE.Mesh(geometry);
    const sampler = new MeshSurfaceSampler(mesh).build();
    const base = new Float32Array(N * 3);
    const dir = new Float32Array(N * 3);
    const temp = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      sampler.sample(temp);
      base[i * 3] = temp.x;
      base[i * 3 + 1] = temp.y;
      base[i * 3 + 2] = temp.z;
      // 向外 + 向上飄散
      const out = temp.clone().normalize();
      dir[i * 3] = out.x + (Math.random() - 0.5) * 0.6;
      dir[i * 3 + 1] = out.y + 0.6 + Math.random() * 0.8;
      dir[i * 3 + 2] = out.z + (Math.random() - 0.5) * 0.6;
    }
    return { basePositions: base, directions: dir, count: N };
  }, [geometry]);

  const livePositions = useMemo(() => basePositions.slice(), [basePositions]);

  // 追蹤滑鼠（整個視窗）與捲動進度
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / (window.innerHeight * 0.7), 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const d = scroll.current; // 0 → 1 消散程度

    // 看向滑鼠
    if (rootRef.current) {
      const ty = THREE.MathUtils.clamp(pointer.current.x * 0.5, -0.5, 0.5);
      const tx = THREE.MathUtils.clamp(pointer.current.y * 0.35, -0.35, 0.35);
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, ty, 4, delta);
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, tx, 4, delta);
    }

    // 螺旋槳旋轉
    if (rotorsRef.current) rotorsRef.current.children.forEach((r) => (r.rotation.y += delta * 40));

    // 實體隨捲動淡出
    const solidOpacity = THREE.MathUtils.clamp(1 - d * 1.6, 0, 1);
    solidRef.current?.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.material) {
        const mat = mesh.material as THREE.Material & { opacity: number; transparent: boolean };
        mat.transparent = true;
        mat.opacity = solidOpacity;
      }
    });

    // 粒子隨捲動向外飛散
    if (pointsRef.current) {
      const spread = d * 3.2;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const drift = Math.sin(state.clock.elapsedTime * 2 + i) * 0.04 * d;
        livePositions[i3] = basePositions[i3] + directions[i3] * spread + drift;
        livePositions[i3 + 1] = basePositions[i3 + 1] + directions[i3 + 1] * spread;
        livePositions[i3 + 2] = basePositions[i3 + 2] + directions[i3 + 2] * spread + drift;
      }
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array.set(livePositions);
      attr.needsUpdate = true;
      const mat = pointsRef.current.material as THREE.PointsMaterial;
      // 靜止時粒子藏在表面，捲動時浮現再淡出
      mat.opacity = THREE.MathUtils.clamp(d < 0.85 ? d * 3 : (1 - d) * 5.6, 0, 1);
    }
  });

  return (
    <group ref={rootRef}>
      <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* 實體無人機 */}
        <group ref={solidRef}>
          <mesh geometry={geometry}>
            <meshStandardMaterial color="#1b2436" metalness={0.75} roughness={0.3} />
          </mesh>
          {/* 中央發光核心 */}
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
          {/* 馬達頂端的燈 */}
          {ARM_ANGLES.map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * MOTOR_R, 0.16, -Math.sin(angle) * MOTOR_R]}
            >
              <sphereGeometry args={[0.06, 10, 10]} />
              <meshStandardMaterial
                color={i % 2 ? "#a855f7" : "#2dd4bf"}
                emissive={i % 2 ? "#a855f7" : "#2dd4bf"}
                emissiveIntensity={1.4}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>

        {/* 螺旋槳 */}
        <group ref={rotorsRef}>
          {ARM_ANGLES.map((angle, i) => (
            <mesh key={i} position={[Math.cos(angle) * MOTOR_R, 0.16, -Math.sin(angle) * MOTOR_R]}>
              <boxGeometry args={[0.62, 0.012, 0.05]} />
              <meshStandardMaterial color="#8b82a6" metalness={0.6} roughness={0.4} transparent opacity={0.7} />
            </mesh>
          ))}
        </group>

        {/* 消散粒子 */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[livePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#2dd4bf"
            size={0.03}
            sizeAttenuation
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>
    </group>
  );
}
