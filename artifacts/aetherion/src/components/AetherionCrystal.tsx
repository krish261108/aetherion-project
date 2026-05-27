import { useRef, useEffect, useState, Component } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── WebGL Error Boundary ───────────────────────────────── */
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/* ── CSS fallback when WebGL is unavailable ─────────────── */
function CrystalFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Animated CSS rings */}
      {[2.8, 2.2, 1.6].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${scale * 80}px`,
            height: `${scale * 80}px`,
            borderColor: i === 1 ? "rgba(168,85,247,0.35)" : "rgba(125,249,255,0.25)",
            animation: `ambient-rotate ${8 + i * 4}s linear infinite${i % 2 === 1 ? " reverse" : ""}`,
            borderStyle: i === 2 ? "dashed" : "solid",
          }}
        />
      ))}
      {/* Core orb */}
      <div
        className="relative w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(125,249,255,0.9), rgba(0,229,255,0.5), rgba(168,85,247,0.3))",
          boxShadow: "0 0 40px rgba(125,249,255,0.5), 0 0 80px rgba(125,249,255,0.2), 0 0 120px rgba(168,85,247,0.15)",
          animation: "holo-float 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ── Inner crystal mesh ─────────────────────────────────── */
function CrystalCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.025);
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.5 + Math.sin(clock.elapsedTime * 0.9) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.25, 0]} />
      <meshStandardMaterial
        color="#00E5FF"
        emissive="#0044cc"
        emissiveIntensity={0.5}
        roughness={0.08}
        metalness={0.25}
        transparent
        opacity={0.72}
      />
    </mesh>
  );
}

/* ── Outer wireframe shell ──────────────────────────────── */
function WireShell({ scale = 1.22, color = "#7DF9FF", opacity = 0.3, speed = 1, reverse = false }: {
  scale?: number; color?: string; opacity?: number; speed?: number; reverse?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += (reverse ? -1 : 1) * delta * 0.12 * speed;
    ref.current.rotation.z += (reverse ? 1 : -1) * delta * 0.08 * speed;
  });
  return (
    <mesh ref={ref} scale={scale}>
      <icosahedronGeometry args={[1.25, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Orbiting energy ring ───────────────────────────────── */
function EnergyRing({ radius, thickness, color, opacity, rotSpeed, initRot }: {
  radius: number; thickness: number; color: string; opacity: number;
  rotSpeed: [number, number, number]; initRot: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * rotSpeed[0];
    ref.current.rotation.y += delta * rotSpeed[1];
    ref.current.rotation.z += delta * rotSpeed[2];
  });
  return (
    <mesh ref={ref} rotation={initRot}>
      <torusGeometry args={[radius, thickness, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

/* ── Scene root ─────────────────────────────────────────── */
function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x +=
      (mouse.current.y * 0.35 - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.z +=
      (-mouse.current.x * 0.12 - groupRef.current.rotation.z) * 0.04;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.12} color="#050816" />
      <pointLight position={[4, 5, 5]} color="#7DF9FF" intensity={4} />
      <pointLight position={[-5, -4, -4]} color="#A855F7" intensity={3} />
      <pointLight position={[0, -6, 4]} color="#00E5FF" intensity={2} />

      <group ref={groupRef}>
        {/* Floating inner crystal */}
        <Float speed={1.8} floatIntensity={0.4} rotationIntensity={0}>
          <CrystalCore />
        </Float>

        {/* Wireframe shells */}
        <WireShell scale={1.22} color="#7DF9FF" opacity={0.32} speed={1} />
        <WireShell scale={1.55} color="#A855F7" opacity={0.14} speed={0.6} reverse />

        {/* Large outer wireframe (icosphere detail) */}
        <mesh rotation={[0.4, 0.3, 0.2]} scale={2.1}>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshBasicMaterial color="#C084FC" wireframe transparent opacity={0.07} />
        </mesh>

        {/* Energy rings */}
        <EnergyRing radius={2.1} thickness={0.018} color="#7DF9FF" opacity={0.75}
          rotSpeed={[0.35, 0, 0]} initRot={[Math.PI / 2, 0, 0]} />
        <EnergyRing radius={2.65} thickness={0.012} color="#A855F7" opacity={0.55}
          rotSpeed={[0.22, 0.08, 0]} initRot={[Math.PI / 3.5, Math.PI / 5, 0]} />
        <EnergyRing radius={3.3} thickness={0.008} color="#C084FC" opacity={0.35}
          rotSpeed={[0, 0.12, 0.09]} initRot={[0.9, 0.4, 0.2]} />
        <EnergyRing radius={3.9} thickness={0.005} color="#00E5FF" opacity={0.22}
          rotSpeed={[-0.06, 0, 0.14]} initRot={[0.2, 0.8, 1.1]} />

        {/* Particle clouds */}
        <Sparkles count={140} scale={8} size={1.2} speed={0.35} color="#7DF9FF" opacity={0.5} />
        <Sparkles count={70} scale={11} size={0.8} speed={0.18} color="#A855F7" opacity={0.3} />
        <Sparkles count={40} scale={5} size={2} speed={0.6} color="#00E5FF" opacity={0.35} />
      </group>
    </>
  );
}

/* ── WebGL pre-detection (runs before any Canvas mounts) ─── */
function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (!ctx) return false;
    const ext = (ctx as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    if (ext) ext.loseContext();
    return true;
  } catch {
    return false;
  }
}

/* ── Public component ───────────────────────────────────── */
interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function AetherionCrystal({ className = "", style = {} }: Props) {
  const mouse = useRef({ x: 0, y: 0 });
  // Detect WebGL once on mount — never attempt Canvas if unavailable
  const [webglOk] = useState(() => checkWebGL());

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={className} style={style}>
      {webglOk ? (
        <WebGLErrorBoundary fallback={<CrystalFallback />}>
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 44 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
          >
            <Scene mouse={mouse} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <CrystalFallback />
      )}
    </div>
  );
}
