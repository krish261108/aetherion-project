import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const smoothRef = useRef({ x: -1000, y: -1000 });
  const targetRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      smoothRef.current = {
        x: lerp(smoothRef.current.x, targetRef.current.x, 0.07),
        y: lerp(smoothRef.current.y, targetRef.current.y, 0.07),
      };
      setPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Large ambient glow */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, rgba(125,249,255,0.055) 0%, rgba(168,85,247,0.035) 35%, transparent 65%)`,
        }}
      />
      {/* Sharp inner dot */}
      <div
        className="fixed z-[2] pointer-events-none rounded-full"
        style={{
          width: 6,
          height: 6,
          left: pos.x - 3,
          top: pos.y - 3,
          background: "rgba(125,249,255,0.7)",
          boxShadow: "0 0 12px rgba(125,249,255,0.6), 0 0 24px rgba(125,249,255,0.2)",
          transform: "translate(0,0)",
        }}
      />
    </>
  );
}
