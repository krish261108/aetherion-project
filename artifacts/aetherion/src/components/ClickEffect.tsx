import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Ripple = { id: number; x: number; y: number };

export default function ClickEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ctxRef = useRef<AudioContext | null>(null);
  const idRef = useRef(0);

  const playClick = () => {
    try {
      if (!ctxRef.current || ctxRef.current.state === "closed") {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1200;
      filter.Q.value = 2;

      osc.type = "sine";
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1800, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      gain2.gain.setValueAtTime(0.06, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.09);
    } catch (_) {}
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      playClick();
      const id = idRef.current++;
      const ripple = { id, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 750);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return createPortal(
    <AnimatePresence>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed z-[9999]"
          style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              left: -3,
              top: -3,
              background: "rgba(0,212,255,0.9)",
              boxShadow: "0 0 8px rgba(0,212,255,1)",
            }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full border"
            style={{
              width: 40,
              height: 40,
              left: -20,
              top: -20,
              borderColor: "rgba(0,212,255,0.7)",
            }}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute rounded-full border"
            style={{
              width: 70,
              height: 70,
              left: -35,
              top: -35,
              borderColor: "rgba(139,92,246,0.45)",
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
          />
        </div>
      ))}
    </AnimatePresence>,
    document.body
  );
}
