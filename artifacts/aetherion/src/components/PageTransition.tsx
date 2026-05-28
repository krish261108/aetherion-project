import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";

const pageThemes: Record<string, { color: string; label: string }> = {
  "/":              { color: "#7DF9FF", label: "UNIVERSE ARCHIVE" },
  "/books":         { color: "#00E5FF", label: "SERIES CATALOG" },
  "/characters":    { color: "#A855F7", label: "CHARACTER RECORDS" },
  "/clans":         { color: "#F59E0B", label: "CLAN ARCHIVE" },
  "/artifacts":     { color: "#EF4444", label: "ARTIFACT VAULT" },
  "/project-aether":{ color: "#10B981", label: "PROJECT AETHER" },
  "/world":         { color: "#3B82F6", label: "WORLD ATLAS" },
  "/map":           { color: "#06B6D4", label: "REALITY MAP" },
  "/gallery":       { color: "#8B5CF6", label: "VISUAL CODEX" },
  "/power":         { color: "#F97316", label: "POWER SYSTEM" },
  "/timeline":      { color: "#14B8A6", label: "TIMELINE" },
  "/people":        { color: "#EC4899", label: "PEOPLE FILES" },
  "/archive":       { color: "#6366F1", label: "HIDDEN ARCHIVE" },
  "/search":        { color: "#22D3EE", label: "SEARCH" },
  "/author":        { color: "#C084FC", label: "CREATOR HUB" },
};

export function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const theme = pageThemes[location] ?? { color: "#7DF9FF", label: "ARCHIVE" };

  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Page entry flash */}
      <PortalFlash color={theme.color} label={theme.label} />
      {children}
    </motion.div>
  );
}

function PortalFlash({ color, label }: { color: string; label: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Horizontal sweep lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color}14 40%, ${color}28 50%, ${color}14 60%, transparent 100%)`,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Center vignette flash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${color}20 0%, transparent 70%)`,
        }}
      />

      {/* Top + bottom edge bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />

      {/* Page label flash */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 1, scale: 0.9, letterSpacing: "0.4em" }}
          animate={{ opacity: 0, scale: 1.08, letterSpacing: "0.8em" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[10px] font-mono tracking-[0.4em]"
          style={{ color, fontFamily: "'Share Tech Mono', monospace", textShadow: `0 0 20px ${color}` }}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
}
