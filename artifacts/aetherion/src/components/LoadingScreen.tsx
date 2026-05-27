import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const lines = [
  "INITIALIZING AETHERION ARCHIVE v7.0...",
  "ESTABLISHING VEIL LINK...",
  "SCANNING 5 REALITY LAYERS...",
  "DECRYPTING CLAN RECORDS [10 CLANS]...",
  "LOADING ARTIFACT VAULT [14 FRAGMENTS]...",
  "SYNCHRONIZING CONVERGENCE DATA...",
  "ACCESS GRANTED — UNIVERSE ARCHIVE ONLINE",
];

const corners = [
  { top: 16, left: 16 },
  { top: 16, right: 16 },
  { bottom: 16, left: 16 },
  { bottom: 16, right: 16 },
];

function HUDCorner({ pos }: { pos: { top?: number; bottom?: number; left?: number; right?: number } }) {
  const isLeft = "left" in pos;
  const isTop = "top" in pos;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ ...pos, width: 28, height: 28 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div
        className="absolute"
        style={{
          top: 0, [isLeft ? "left" : "right"]: 0,
          width: 28, height: 28,
          borderTop: "1px solid rgba(0,212,255,0.6)",
          [isLeft ? "borderLeft" : "borderRight"]: "1px solid rgba(0,212,255,0.6)",
          borderTopLeftRadius: isLeft && isTop ? 4 : 0,
          borderTopRightRadius: !isLeft && isTop ? 4 : 0,
          borderBottomLeftRadius: isLeft && !isTop ? 4 : 0,
          borderBottomRightRadius: !isLeft && !isTop ? 4 : 0,
        }}
      />
    </motion.div>
  );
}

export default function LoadingScreen({ onComplete }: Props) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 600);
          setTimeout(() => onComplete(), 1400);
        }
        return Math.min(next, 100);
      });
    }, 40);

    const lineTimer = setInterval(() => {
      setCurrentLine((l) => Math.min(l + 1, lines.length - 1));
    }, 750);

    return () => {
      clearInterval(interval);
      clearInterval(lineTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#030712" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7 }}
        >
          {/* Holographic grid bg */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
          }} />

          {/* HUD corners */}
          {corners.map((pos, i) => <HUDCorner key={i} pos={pos} />)}

          {/* Top system label */}
          <motion.div
            className="absolute top-8 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-[10px] tracking-[0.4em] text-cyan-500/50 font-mono" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              AETHERION // UNIVERSE ARCHIVE // INITIALIZING
            </span>
          </motion.div>

          {/* Holographic core orb */}
          <div className="relative mb-12">
            {/* Outer rings */}
            {[120, 90, 64].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: size, height: size,
                  borderColor: i === 0 ? "rgba(0,212,255,0.15)" : i === 1 ? "rgba(139,92,246,0.2)" : "rgba(0,212,255,0.3)",
                  top: "50%", left: "50%",
                  marginTop: -size / 2, marginLeft: -size / 2,
                  boxShadow: i === 2 ? "0 0 20px rgba(0,212,255,0.2)" : "none",
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 6 - i * 1.5, repeat: Infinity, ease: "linear" }}
              />
            ))}
            {/* Center orb */}
            <motion.div
              className="w-16 h-16 rounded-full relative"
              style={{
                background: "radial-gradient(circle at 35% 30%, #ffffff, #00d4ff 25%, #8b5cf6 65%, #030712)",
                boxShadow: "0 0 30px rgba(0,212,255,0.9), 0 0 60px rgba(0,212,255,0.4), 0 0 100px rgba(139,92,246,0.2)",
              }}
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 30px rgba(0,212,255,0.9), 0 0 60px rgba(0,212,255,0.4)",
                  "0 0 50px rgba(0,212,255,1), 0 0 100px rgba(0,212,255,0.6), 0 0 140px rgba(139,92,246,0.3)",
                  "0 0 30px rgba(0,212,255,0.9), 0 0 60px rgba(0,212,255,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glitch layer */}
              <motion.div
                className="absolute rounded-full inset-0"
                style={{ border: "1px solid rgba(0,212,255,0.6)" }}
                animate={{ x: [0, 3, -2, 0], y: [0, -2, 1, 0], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.12, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.div>
          </div>

          {/* Terminal lines */}
          <div className="w-96 max-w-full px-6 space-y-2 mb-8">
            {lines.slice(0, currentLine + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-2"
                style={{ fontFamily: "'Share Tech Mono', monospace" }}
              >
                <span className="text-cyan-600/60 text-xs mt-0.5 flex-shrink-0">
                  {i === lines.length - 1 ? ">>>" : ">"}
                </span>
                <span
                  className={`text-xs tracking-wide ${
                    i === lines.length - 1
                      ? "text-cyan-300 font-bold"
                      : i === currentLine
                      ? "text-slate-300"
                      : "text-slate-500"
                  }`}
                >
                  {line}
                  {i === currentLine && i < lines.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="ml-0.5 inline-block w-1.5 h-3 bg-cyan-400 align-middle"
                    />
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress */}
          <div className="w-96 max-w-full px-6">
            <div className="relative h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,212,255,0.08)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #8b5cf6, #00d4ff)",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 0 12px rgba(0,212,255,0.8), 0 0 4px rgba(139,92,246,0.6)",
                  animation: "holo-text-shift 2s linear infinite",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
              {/* Scan glint */}
              <motion.div
                className="absolute top-0 h-full w-8 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                animate={{ x: ["-200%", "2000%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="mt-1.5 flex justify-between">
              <span className="text-[9px] text-slate-600 font-mono">LOADING ARCHIVE</span>
              <span className="text-[9px] text-cyan-500/70 font-mono" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                {Math.floor(progress)}%
              </span>
            </div>
          </div>

          {/* Bottom status */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {["VEIL: STABLE", "LAYERS: 5", "CLANS: 10"].map((s) => (
              <span key={s} className="text-[9px] font-mono text-slate-700" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
