import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

interface Props {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
  accentColor?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  accent = "ARCHIVE ENTRY",
  className = "",
  accentColor = "#00d4ff",
}: Props) {
  return (
    <motion.div
      className={`text-center mb-16 relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* HUD brackets */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-2 pointer-events-none">
        <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: `1px solid ${accentColor}60`, borderLeft: `1px solid ${accentColor}60` }} />
        <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: `1px solid ${accentColor}60`, borderRight: `1px solid ${accentColor}60` }} />
      </div>

      {/* Accent label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <motion.div
          className="h-px"
          style={{ width: 60, background: `linear-gradient(to right, transparent, ${accentColor}80)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span
            className="text-xs tracking-[0.25em] uppercase font-mono"
            style={{ color: `${accentColor}90`, fontFamily: "'Share Tech Mono', monospace" }}
          >
            {accent}
          </span>
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
          />
        </div>
        <motion.div
          className="h-px"
          style={{ width: 60, background: `linear-gradient(to left, transparent, ${accentColor}80)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Title */}
      <GlitchText
        as="h2"
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          background: "linear-gradient(135deg, #e2e8f0 0%, #00d4ff 35%, #8b5cf6 65%, #00d4ff 85%, #e2e8f0 100%)",
          backgroundSize: "200% 200%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        intensity="medium"
      >
        {title}
      </GlitchText>

      {subtitle && (
        <motion.p
          className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated divider */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <motion.div
          className="h-px"
          style={{
            maxWidth: 200,
            flex: 1,
            background: `linear-gradient(to right, transparent, ${accentColor}60, rgba(139,92,246,0.6))`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="h-px"
          style={{
            maxWidth: 200,
            flex: 1,
            background: `linear-gradient(to left, transparent, ${accentColor}60, rgba(139,92,246,0.6))`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
