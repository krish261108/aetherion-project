import { motion } from "framer-motion";

interface Props {
  size?: number;
  className?: string;
}

export default function AetherionCore({ size = 320, className = "" }: Props) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 1.1,
          height: size * 1.1,
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outermost rotating ring */}
      <motion.div
        className="absolute rounded-full border border-cyan-500/20"
        style={{ width: size * 0.95, height: size * 0.95 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/40"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateY(-${size * 0.475}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Second ring */}
      <motion.div
        className="absolute rounded-full border border-violet-500/30"
        style={{ width: size * 0.78, height: size * 0.78 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[45, 135, 225, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/60"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateY(-${size * 0.39}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Third ring */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/40"
        style={{ width: size * 0.6, height: size * 0.6 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {[0, 72, 144, 216, 288].map((deg) => (
          <div
            key={deg}
            className="absolute w-1 h-1 rounded-full bg-cyan-300/80"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${deg}deg) translateY(-${size * 0.3}px) translate(-50%, -50%)`,
            }}
          />
        ))}
      </motion.div>

      {/* Fracture lines */}
      <motion.svg
        className="absolute"
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 100 100"
        animate={{ rotate: -360, opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", opacity: { duration: 3, repeat: Infinity } }}
      >
        {[0, 60, 120].map((deg, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="rgba(139,92,246,0.3)"
            strokeWidth="0.5"
            transform={`rotate(${deg}, 50, 50)`}
          />
        ))}
      </motion.svg>

      {/* Core orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          background: "radial-gradient(circle at 35% 35%, #ffffff, #00d4ff 30%, #8b5cf6 70%, #030712 100%)",
          boxShadow: `0 0 ${size * 0.15}px rgba(0,212,255,0.8), 0 0 ${size * 0.3}px rgba(0,212,255,0.3), 0 0 ${size * 0.5}px rgba(139,92,246,0.2)`,
        }}
        animate={{
          scale: [1, 1.06, 1],
          boxShadow: [
            `0 0 ${size * 0.15}px rgba(0,212,255,0.8), 0 0 ${size * 0.3}px rgba(0,212,255,0.3)`,
            `0 0 ${size * 0.2}px rgba(0,212,255,1), 0 0 ${size * 0.4}px rgba(0,212,255,0.5)`,
            `0 0 ${size * 0.15}px rgba(0,212,255,0.8), 0 0 ${size * 0.3}px rgba(0,212,255,0.3)`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glitch layer */}
      <motion.div
        className="absolute rounded-full border border-cyan-300/20"
        style={{ width: size * 0.32, height: size * 0.32 }}
        animate={{
          x: [0, 2, -1, 0],
          y: [0, -1, 2, 0],
          opacity: [0, 0.8, 0],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  );
}
