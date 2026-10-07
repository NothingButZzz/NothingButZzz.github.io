"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* 固定種子的亂數（mulberry32）：粒子分布每次 render 都一樣，保持 render 純粹 */
function seededRandom(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RADIUS = 1.25;

/* 頂點著色器：表面呼吸波動 → 捲動時沿各自方向飛散；背面的點較暗，營造景深 */
const vertexShader = /* glsl */ `
  attribute vec3 aDir;
  attribute float aRand;
  uniform float uTime;
  uniform float uScatter;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uRadius;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 unit = position / uRadius;

    // 緩慢的表面波動（兩組正弦疊加，像在呼吸）
    float wave = 0.045 * sin(dot(unit, vec3(2.1, 1.7, 2.9)) * 2.0 + uTime * 0.7)
               + 0.03 * sin(unit.y * 5.0 - uTime * 0.5 + aRand * 6.2831);
    vec3 p = position * (1.0 + wave);

    // 捲動飛散：每顆依自己的延遲漸進釋放，easeOut
    float local = clamp((uScatter - aRand * 0.35) / 0.65, 0.0, 1.0);
    float eased = 1.0 - (1.0 - local) * (1.0 - local);
    p += aDir * eased * (2.5 + aRand * 5.0);
    p.y += eased * 0.6;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) / -mv.z;

    // 青綠 → 紫的對角漸層
    vec3 teal = vec3(0.176, 0.831, 0.749);
    vec3 violet = vec3(0.659, 0.333, 0.969);
    vColor = mix(teal, violet, smoothstep(-0.9, 0.9, unit.y * 0.8 - unit.x * 0.4));

    // 面向鏡頭的點較亮；飛散末段淡出
    float facing = normalize(normalMatrix * unit).z;
    vAlpha = (0.18 + 0.82 * smoothstep(-0.5, 1.0, facing)) * (1.0 - smoothstep(0.75, 1.0, uScatter));
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * a * vAlpha);
  }
`;

type Cloud = { positions: Float32Array; dirs: Float32Array; rands: Float32Array };

/* 球面：Fibonacci 分布讓點均勻不聚團 */
function makeSphere(count: number, random: () => number): Cloud {
  const positions = new Float32Array(count * 3);
  const dirs = new Float32Array(count * 3);
  const rands = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    positions.set([x * RADIUS, y * RADIUS, z * RADIUS], i * 3);
    // 飛散方向：表面法線 + 隨機擾動
    const dir = new THREE.Vector3(x, y, z)
      .multiplyScalar(0.6)
      .add(new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5))
      .normalize();
    dirs.set([dir.x, dir.y, dir.z], i * 3);
    rands[i] = random();
  }
  return { positions, dirs, rands };
}

/* 環繞球體的一圈細軌道 */
function makeRing(count: number, random: () => number): Cloud {
  const positions = new Float32Array(count * 3);
  const dirs = new Float32Array(count * 3);
  const rands = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = RADIUS * 1.45 + (random() - 0.5) * 0.06;
    positions.set([Math.cos(a) * r, (random() - 0.5) * 0.03, Math.sin(a) * r], i * 3);
    const dir = new THREE.Vector3(Math.cos(a), random() - 0.5, Math.sin(a)).normalize();
    dirs.set([dir.x, dir.y, dir.z], i * 3);
    rands[i] = random();
  }
  return { positions, dirs, rands };
}

/* 一團點雲：自己持有 shader 材質，每幀更新時間與捲動進度 */
function CloudPoints({
  cloud,
  size,
  scroll,
}: {
  cloud: Cloud;
  size: number;
  scroll: { current: number };
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScatter: { value: 0 },
      uSize: { value: size },
      uPixelRatio: { value: 1 },
      uRadius: { value: RADIUS },
    }),
    [size]
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    m.uniforms.uScatter.value = scroll.current;
    m.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
  });

  return (
    <points>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[cloud.positions, 3]} />
        <bufferAttribute attach="attributes-aDir" args={[cloud.dirs, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[cloud.rands, 1]} />
      </bufferGeometry>
    </points>
  );
}

export default function ParticleSphere() {
  const rootRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  const { sphere, ring } = useMemo(() => {
    const random = seededRandom(20260920);
    return { sphere: makeSphere(4200, random), ring: makeRing(900, random) };
  }, []);
  // 追蹤滑鼠（整個視窗）與捲動進度
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / (window.innerHeight * 0.75), 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    // 微微看向滑鼠
    if (rootRef.current) {
      const ty = THREE.MathUtils.clamp(pointer.current.x * 0.35, -0.35, 0.35);
      const tx = THREE.MathUtils.clamp(pointer.current.y * 0.25, -0.25, 0.25);
      rootRef.current.rotation.y = THREE.MathUtils.damp(rootRef.current.rotation.y, ty, 3, delta);
      rootRef.current.rotation.x = THREE.MathUtils.damp(rootRef.current.rotation.x, tx, 3, delta);
    }
    // 球體慢轉、軌道反向轉
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.06;
    if (ringRef.current) ringRef.current.rotation.y -= delta * 0.1;
  });

  return (
    <group ref={rootRef} position={[0.45, 0, 0]}>
      <group ref={spinRef}>
        <CloudPoints cloud={sphere} size={22} scroll={scroll} />
      </group>
      <group rotation={[0.42, 0, -0.18]}>
        <group ref={ringRef}>
          <CloudPoints cloud={ring} size={18} scroll={scroll} />
        </group>
      </group>
    </group>
  );
}
