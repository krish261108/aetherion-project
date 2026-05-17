import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const lines = [
  "INITIALIZING AETHERION ARCHIVE...",
  "SCANNING VEIL STABILITY...",
  "DECRYPTING CLAN RECORDS...",
  "LOADING ARTIFACT VAULT...",
  "ACCESS GRANTED",
];

export default function LoadingScreen({ onComplete }: Props) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 2;
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
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(lineTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#030712" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated core */}
          <motion.div
            className="relative mb-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="w-24 h-24 rounded-full"
              style={{
                background: "radial-gradient(circle, #00d4ff, #8b5cf6, transparent)",
                boxShadow: "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(139,92,246,0.3)",
              }}
            />
          </motion.div>

          <div className="w-80 space-y-3 font-mono">
            {lines.slice(0, currentLine + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className={`text-sm ${i === lines.length - 1 ? "text-cyan-300 font-bold tracking-widest" : "text-slate-400"}`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {i === lines.length - 1 ? (
                  <span className="text-cyan-400">
                    {line}
                  </span>
                ) : (
                  <span>
                    <span className="text-cyan-600 mr-2">&gt;</span>
                    {line}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 w-80">
            <div className="h-0.5 bg-slate-800 rounded overflow-hidden">
              <motion.div
                className="h-full rounded"
                style={{
                  background: "linear-gradient(90deg, #00d4ff, #8b5cf6)",
                  boxShadow: "0 0 8px rgba(0,212,255,0.8)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-right text-xs text-slate-500 font-mono">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
