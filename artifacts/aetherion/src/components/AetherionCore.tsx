import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
}

export default function AetherionCore({ size = 320, className = "" }: Props) {
  const s = size;
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: s, height: s, perspective: `${s * 4}px` }}
    >
      {/* Background energy field */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 1.4,
          height: s * 1.4,
          background: `radial-gradient(circle, rgba(0,212,255,0.04) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Ring 1 — outermost slow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.96, height: s * 0.96,
          border: "1px solid rgba(0,212,255,0.15)",
          boxShadow: "0 0 20px rgba(0,212,255,0.05)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div key={deg} className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              background: "rgba(0,212,255,0.6)",
              boxShadow: "0 0 8px rgba(0,212,255,0.8)",
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(-${s * 0.48}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Ring 2 — violet CCW */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.8, height: s * 0.8,
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow: "0 0 15px rgba(139,92,246,0.07)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {[45, 135, 225, 315].map((deg) => (
          <div key={deg} className="absolute w-2 h-2 rounded-full"
            style={{
              background: "rgba(139,92,246,0.8)",
              boxShadow: "0 0 6px rgba(139,92,246,1)",
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(-${s * 0.4}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Ring 3 — cyan fast */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.63, height: s * 0.63,
          border: "1px solid rgba(0,212,255,0.35)",
          boxShadow: "0 0 12px rgba(0,212,255,0.1)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {[0, 72, 144, 216, 288].map((deg) => (
          <div key={deg} className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: "rgba(0,212,255,0.9)",
              boxShadow: "0 0 5px rgba(0,212,255,1)",
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(-${s * 0.315}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Ring 4 — amber very fast CCW */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.46, height: s * 0.46,
          border: "1px solid rgba(245,158,11,0.2)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[0, 120, 240].map((deg) => (
          <div key={deg} className="absolute w-1 h-1 rounded-full"
            style={{
              background: "rgba(245,158,11,0.8)",
              boxShadow: "0 0 4px rgba(245,158,11,0.9)",
              top: "50%", left: "50%",
              transform: `rotate(${deg}deg) translateY(-${s * 0.23}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Fracture geometry */}
      <motion.svg
        className="absolute"
        width={s * 0.72} height={s * 0.72}
        viewBox="0 0 100 100"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[0, 60, 120].map((deg, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2="92"
            stroke={i === 0 ? "rgba(139,92,246,0.25)" : i === 1 ? "rgba(0,212,255,0.2)" : "rgba(245,158,11,0.15)"}
            strokeWidth="0.6"
            transform={`rotate(${deg}, 50, 50)`}
          />
        ))}
        {/* Hex inner structure */}
        {Array.from({ length: 6 }, (_, i) => {
          const a = (i * 60 * Math.PI) / 180;
          const r = 28;
          const x1 = 50 + r * Math.cos(a);
          const y1 = 50 + r * Math.sin(a);
          const a2 = ((i + 1) * 60 * Math.PI) / 180;
          const x2 = 50 + r * Math.cos(a2);
          const y2 = 50 + r * Math.sin(a2);
          return <line key={`h${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.15)" strokeWidth="0.4" />;
        })}
      </motion.svg>

      {/* Holographic shimmer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.34, height: s * 0.34,
          background: "conic-gradient(from 0deg, transparent, rgba(0,212,255,0.3), transparent, rgba(139,92,246,0.2), transparent)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Core orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: s * 0.28, height: s * 0.28,
          background: "radial-gradient(circle at 35% 30%, #ffffff, #00d4ff 25%, #8b5cf6 60%, #030712 100%)",
          boxShadow: `0 0 ${s * 0.12}px rgba(0,212,255,1), 0 0 ${s * 0.25}px rgba(0,212,255,0.5), 0 0 ${s * 0.45}px rgba(139,92,246,0.25)`,
        }}
        animate={{
          scale: [1, 1.07, 1],
          boxShadow: [
            `0 0 ${s * 0.12}px rgba(0,212,255,0.9), 0 0 ${s * 0.25}px rgba(0,212,255,0.4)`,
            `0 0 ${s * 0.18}px rgba(0,212,255,1), 0 0 ${s * 0.35}px rgba(0,212,255,0.6), 0 0 ${s * 0.5}px rgba(139,92,246,0.3)`,
            `0 0 ${s * 0.12}px rgba(0,212,255,0.9), 0 0 ${s * 0.25}px rgba(0,212,255,0.4)`,
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glitch layers */}
      <motion.div
        className="absolute rounded-full border"
        style={{ width: s * 0.32, height: s * 0.32, borderColor: "rgba(0,212,255,0.3)" }}
        animate={{ x: [0, 3, -2, 1, 0], y: [0, -2, 1, -1, 0], opacity: [0, 0.9, 0.7, 0.9, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 6 }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{ width: s * 0.30, height: s * 0.30, borderColor: "rgba(139,92,246,0.3)" }}
        animate={{ x: [0, -4, 2, -1, 0], y: [0, 2, -3, 1, 0], opacity: [0, 0.8, 0.6, 0.8, 0] }}
        transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 9, delay: 3 }}
      />

      {/* Energy sparks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = s * 0.5;
        return (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: "0 0 4px rgba(0,212,255,1)",
              left: "50%", top: "50%",
              translateX: "-50%", translateY: "-50%",
            }}
            animate={{
              x: [0, Math.cos(rad) * r * 0.3, Math.cos(rad) * r],
              y: [0, Math.sin(rad) * r * 0.3, Math.sin(rad) * r],
              opacity: [0, 0.8, 0],
              scale: [2, 1, 0],
            }}
            transition={{
              duration: 1.5 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 2 + i * 0.3,
              delay: i * 0.4,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
}
