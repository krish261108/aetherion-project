import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Burst = { id: number; x: number; y: number };

// Musical chime notes for click sound (C major pentatonic, quick arpeggio)
// Each click plays a random 3-note rising chime from this palette
const CHIME_NOTES = [
  [523.25, 659.25, 783.99],   // C5 E5 G5
  [622.25, 783.99, 1046.5],   // Eb5 G5 C6
  [392.0,  523.25, 659.25],   // G4 C5 E5
  [466.16, 587.33, 783.99],   // Bb4 D5 G5
  [698.46, 880.0,  1046.5],   // F5 A5 C6
];

export default function ClickEffect() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const idRef = useRef(0);

  const playChime = () => {
    try {
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const notes = CHIME_NOTES[Math.floor(Math.random() * CHIME_NOTES.length)];

      notes.forEach((freq, i) => {
        const t = ctx.currentTime + i * 0.045;

        // Primary tone — soft triangle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12 - i * 0.02, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32 - i * 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);

        // Harmonic shimmer — octave sine
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.value = freq * 2;
        gain2.gain.setValueAtTime(0, t);
        gain2.gain.linearRampToValueAtTime(0.035 - i * 0.005, t + 0.008);
        gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(t);
        osc2.stop(t + 0.2);
      });

      // Metallic "zap" transient on first note
      const zap = ctx.createOscillator();
      const zapG = ctx.createGain();
      const zapF = ctx.createBiquadFilter();
      zapF.type = "bandpass";
      zapF.frequency.value = 2400;
      zapF.Q.value = 3;
      zap.type = "sawtooth";
      zap.frequency.setValueAtTime(1800, ctx.currentTime);
      zap.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
      zapG.gain.setValueAtTime(0.05, ctx.currentTime);
      zapG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      zap.connect(zapF);
      zapF.connect(zapG);
      zapG.connect(ctx.destination);
      zap.start(ctx.currentTime);
      zap.stop(ctx.currentTime + 0.07);
    } catch (_) {}
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      playChime();
      const id = idRef.current++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 900);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const PARTICLE_COUNT = 10;
  const COLORS = ["#00d4ff", "#8b5cf6", "#f59e0b", "#10b981", "#ec4899", "#00d4ff", "#a78bfa", "#67e8f9", "#fbbf24", "#34d399"];

  return createPortal(
    <AnimatePresence>
      {bursts.map((b) => (
        <div
          key={b.id}
          className="pointer-events-none fixed z-[9999]"
          style={{ left: b.x, top: b.y, transform: "translate(-50%, -50%)" }}
        >
          {/* Center flash */}
          <motion.div
            style={{
              position: "absolute",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "rgba(0,212,255,1)",
              boxShadow: "0 0 18px 6px rgba(0,212,255,0.8)",
              left: -5,
              top: -5,
            }}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />

          {/* Expanding energy rings */}
          {[
            { size: 36, color: "rgba(0,212,255,0.8)", delay: 0, maxScale: 1 },
            { size: 60, color: "rgba(139,92,246,0.6)", delay: 0.04, maxScale: 1 },
            { size: 90, color: "rgba(0,212,255,0.25)", delay: 0.08, maxScale: 1 },
          ].map((ring, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: ring.size,
                height: ring.size,
                left: -ring.size / 2,
                top: -ring.size / 2,
                borderRadius: "50%",
                border: `1.5px solid ${ring.color}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: ring.maxScale, opacity: 0 }}
              transition={{ duration: 0.55 + i * 0.05, ease: "easeOut", delay: ring.delay }}
            />
          ))}

          {/* Particle burst — flies outward in all directions */}
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
            const dist = 40 + Math.random() * 30;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const color = COLORS[i % COLORS.length];
            const size = 3 + Math.random() * 3;
            return (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  left: -size / 2,
                  top: -size / 2,
                  borderRadius: "50%",
                  background: color,
                  boxShadow: `0 0 6px ${color}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: dx,
                  y: dy,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.2,
                  ease: "easeOut",
                  delay: Math.random() * 0.02,
                }}
              />
            );
          })}

          {/* Cross-hair flash lines */}
          {[0, 90].map((rot) => (
            <motion.div
              key={rot}
              style={{
                position: "absolute",
                width: 30,
                height: 1.5,
                left: -15,
                top: -0.75,
                background: "linear-gradient(to right, transparent, rgba(0,212,255,0.8), transparent)",
                transform: `rotate(${rot}deg)`,
                transformOrigin: "center",
              }}
              initial={{ scaleX: 0, opacity: 1 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}
    </AnimatePresence>,
    document.body
  );
}
