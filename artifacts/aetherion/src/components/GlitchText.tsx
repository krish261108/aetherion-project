import { useState, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";
  className?: string;
  style?: React.CSSProperties;
  alwaysGlitch?: boolean;
  intensity?: "low" | "medium" | "high";
}

export default function GlitchText({
  children,
  as: Tag = "span",
  className = "",
  style = {},
  alwaysGlitch = false,
  intensity = "medium",
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);
  const timeoutRef = { current: null as ReturnType<typeof setTimeout> | null };

  const triggerGlitch = useCallback(() => {
    setGlitching(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setGlitching(false), 400);
  }, []);

  const text = typeof children === "string" ? children : undefined;
  const offsetAmounts = { low: 2, medium: 4, high: 7 };
  const off = offsetAmounts[intensity];

  return (
    <Tag
      className={`glitch-text relative inline-block ${className}`}
      style={{ ...style }}
      onMouseEnter={triggerGlitch}
      data-text={text}
    >
      {/* Original text */}
      {children}

      {/* Glitch layer 1 — cyan offset */}
      {glitching && (
        <motion.span
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
          style={{
            color: "rgba(0,212,255,0.8)",
            clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
            transform: `translate(-${off}px, 0)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-off, off, -2, 0] }}
          transition={{ duration: 0.25, times: [0, 0.1, 0.8, 1] }}
        >
          {children}
        </motion.span>
      )}

      {/* Glitch layer 2 — violet offset */}
      {glitching && (
        <motion.span
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden
          style={{
            color: "rgba(139,92,246,0.8)",
            clipPath: "polygon(0 55%, 100% 55%, 100% 75%, 0 75%)",
            transform: `translate(${off}px, 0)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], x: [off, -off, 2, 0] }}
          transition={{ duration: 0.25, times: [0, 0.15, 0.75, 1], delay: 0.05 }}
        >
          {children}
        </motion.span>
      )}
    </Tag>
  );
}
