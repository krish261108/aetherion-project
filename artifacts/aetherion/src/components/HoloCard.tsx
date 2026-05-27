import { useRef, useCallback, ReactNode } from "react";

interface HoloCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  glowColor?: string;
  intensity?: number;
  onClick?: () => void;
  scanline?: boolean;
  cornerBrackets?: boolean;
  animatedBorder?: boolean;
  as?: "div" | "button";
  "data-testid"?: string;
}

export default function HoloCard({
  children,
  className = "",
  style = {},
  color = "rgba(0,212,255,1)",
  glowColor = "rgba(0,212,255,0.2)",
  intensity = 12,
  onClick,
  scanline = true,
  cornerBrackets = true,
  animatedBorder = true,
  as: Tag = "div",
  "data-testid": testId,
}: HoloCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotY = (x - 0.5) * intensity * 2;
      const rotX = (y - 0.5) * -intensity * 1.2;
      cardRef.current.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      cardRef.current.style.boxShadow = `0 ${8 + Math.abs(rotX)}px ${30 + Math.abs(rotX) * 2}px ${glowColor}, 0 0 0 1px ${color.replace("1)", "0.35)")}`;
      // Move shine
      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }
    });
  }, [intensity, color, glowColor]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    cardRef.current.style.boxShadow = "";
    if (shineRef.current) shineRef.current.style.background = "none";
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        willChange: "transform",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-testid={testId}
    >
      {/* Animated border */}
      {animatedBorder && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0 opacity-0 hover-show-border"
          style={{
            background: `conic-gradient(from var(--border-angle, 0deg), transparent 40deg, ${color.replace("1)", "0.8)")} 90deg, rgba(139,92,246,0.8) 180deg, ${color.replace("1)", "0.3)")} 220deg, transparent 260deg)`,
            animation: "border-spin 3s linear infinite",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      )}

      {/* Scanline overlay */}
      {scanline && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[inherit]"
          style={{
            background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)",
          }}
        />
      )}

      {/* Mouse-follow shine */}
      <div ref={shineRef} className="absolute inset-0 pointer-events-none z-10 rounded-[inherit] transition-all duration-100" />

      {/* Corner brackets */}
      {cornerBrackets && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none z-30" style={{ borderTop: `1px solid ${color.replace("1)", "0.5)")}`, borderLeft: `1px solid ${color.replace("1)", "0.5)")}` }} />
          <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none z-30" style={{ borderTop: `1px solid ${color.replace("1)", "0.5)")}`, borderRight: `1px solid ${color.replace("1)", "0.5)")}` }} />
          <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none z-30" style={{ borderBottom: `1px solid ${color.replace("1)", "0.5)")}`, borderLeft: `1px solid ${color.replace("1)", "0.5)")}` }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none z-30" style={{ borderBottom: `1px solid ${color.replace("1)", "0.5)")}`, borderRight: `1px solid ${color.replace("1)", "0.5)")}` }} />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
