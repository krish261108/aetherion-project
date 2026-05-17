import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  accent?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, accent = "ARCHIVE ENTRY", className = "" }: Props) {
  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
        <span
          className="text-xs tracking-widest uppercase text-cyan-400/70 font-mono"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {accent}
        </span>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
      </div>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          background: "linear-gradient(135deg, #e2e8f0 0%, #00d4ff 50%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        className="mt-6 h-px mx-auto"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(139,92,246,0.5), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
    </motion.div>
  );
}
