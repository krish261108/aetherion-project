import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Menu, X, Map, Zap } from "lucide-react";

const navLinks: { label: string; href: string; highlight?: boolean; color?: string }[] = [
  { label: "Home",          href: "/" },
  { label: "Books",         href: "/books" },
  { label: "Characters",    href: "/characters" },
  { label: "Clans",         href: "/clans" },
  { label: "Artifacts",     href: "/artifacts" },
  { label: "Project AETHER",href: "/project-aether" },
  { label: "World",         href: "/world" },
  { label: "Map",           href: "/map",     highlight: true, color: "#C084FC" },
  { label: "Gallery",       href: "/gallery", highlight: true, color: "#A855F7" },
  { label: "Power",         href: "/power" },
  { label: "Timeline",      href: "/timeline" },
  { label: "People",        href: "/people" },
  { label: "Archive",       href: "/archive" },
  { label: "Search",        href: "/search" },
  { label: "Author",        href: "/author",  highlight: true, color: "#C084FC" },
];

function NavLink({ link, active }: { link: typeof navLinks[0]; active: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => `${v}%`);
  const glowY = useTransform(mouseY, (v) => `${v}%`);

  const activeColor = link.color ?? "#7DF9FF";
  const baseColor = link.highlight ? (link.color ?? "#A855F7") : "#475569";

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <Link href={link.href}>
      <motion.span
        ref={ref}
        onMouseMove={onMove}
        className="relative px-2.5 py-1.5 text-[10px] rounded cursor-pointer tracking-wide block overflow-hidden group/navlink"
        style={{
          color: active ? activeColor : baseColor,
          background: active ? `${activeColor}0A` : "transparent",
          fontFamily: "'Share Tech Mono', monospace",
        }}
        whileHover={{
          color: activeColor,
          background: `${activeColor}0D`,
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Magnetic glow on hover */}
        <motion.div
          className="absolute pointer-events-none opacity-0 group-hover/navlink:opacity-100 transition-opacity duration-200 rounded"
          style={{
            width: "60%",
            height: "60%",
            background: `radial-gradient(circle at ${glowX} ${glowY}, ${activeColor}20 0%, transparent 70%)`,
            top: "20%",
            left: "20%",
          }}
        />

        {link.label}

        {/* Active underline that slides in */}
        {active && (
          <motion.div
            className="absolute bottom-0 left-2 right-2 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)`, boxShadow: `0 0 6px ${activeColor}` }}
            layoutId="nav-active-bar"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}

        {/* Hover energy pulse */}
        <motion.div
          className="absolute inset-0 rounded pointer-events-none opacity-0 group-hover/navlink:opacity-100"
          style={{ border: `1px solid ${activeColor}20` }}
          initial={false}
          transition={{ duration: 0.15 }}
        />
      </motion.span>
    </Link>
  );
}

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [signalStrength, setSignalStrength] = useState(4);

  useEffect(() => {
    const updateTime = () => setTimeStr(new Date().toTimeString().slice(0, 8));
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Randomly fluctuate signal strength for immersion
  useEffect(() => {
    const t = setInterval(() => {
      setSignalStrength(prev => Math.min(5, Math.max(2, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: scrolled
            ? "rgba(3,5,14,0.97)"
            : "rgba(3,5,14,0.82)",
          backdropFilter: "blur(28px) saturate(1.8)",
          borderBottom: "1px solid rgba(125,249,255,0.08)",
          boxShadow: scrolled
            ? "0 4px 40px rgba(0,0,0,0.7), 0 1px 0 rgba(125,249,255,0.06), inset 0 -1px 0 rgba(125,249,255,0.04)"
            : "none",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Top scanning energy border */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-[200%]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(125,249,255,0.0) 30%, rgba(125,249,255,0.9) 48%, rgba(168,85,247,0.7) 52%, rgba(125,249,255,0.0) 70%, transparent 100%)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />
        </div>

        {/* Bottom subtle glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(125,249,255,0.06) 30%, rgba(168,85,247,0.06) 70%, transparent 100%)" }}
        />

        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-8 h-8">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: "rgba(125,249,255,0.2)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                {/* Mid ring */}
                <motion.div
                  className="absolute rounded-full border"
                  style={{ inset: 3, borderColor: "rgba(168,85,247,0.25)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                {/* Core */}
                <motion.div
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    inset: 7,
                    background: "radial-gradient(circle at 40% 35%, rgba(125,249,255,0.8), rgba(168,85,247,0.4))",
                    boxShadow: "0 0 10px rgba(125,249,255,0.6), 0 0 24px rgba(125,249,255,0.2)",
                  }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              <div className="hidden sm:block">
                <motion.div
                  className="text-[11px] font-bold tracking-[0.22em]"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: "#7DF9FF" }}
                  whileHover={{ textShadow: "0 0 20px rgba(125,249,255,0.8)" }}
                >
                  AETHERION
                </motion.div>
                <div className="text-[7px] text-slate-600 tracking-[0.2em] leading-none mt-0.5" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  UNIVERSE ARCHIVE
                </div>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <NavLink key={link.href} link={link} active={location === link.href} />
              ))}
            </div>

            {/* ── RIGHT HUD ── */}
            <div className="flex items-center gap-2.5">
              {/* Signal bars */}
              <div className="hidden xl:flex items-end gap-0.5 h-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-sm"
                    style={{
                      width: 2.5,
                      height: 4 + i * 2.5,
                      background: i < signalStrength ? "#7DF9FF" : "rgba(125,249,255,0.12)",
                      boxShadow: i < signalStrength ? "0 0 4px rgba(125,249,255,0.6)" : "none",
                    }}
                    animate={{ opacity: i < signalStrength ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Time HUD */}
              <div
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                style={{
                  background: "rgba(125,249,255,0.04)",
                  border: "1px solid rgba(125,249,255,0.09)",
                }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#22C55E", boxShadow: "0 0 5px rgba(34,197,94,0.8)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] font-mono text-slate-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  {timeStr}
                </span>
              </div>

              {/* Veil status */}
              <div className="hidden xl:flex items-center gap-1 px-2 py-1 rounded" style={{ background: "rgba(125,249,255,0.03)", border: "1px solid rgba(125,249,255,0.07)" }}>
                <Zap size={8} style={{ color: "#7DF9FF" }} />
                <span className="text-[8px] font-mono text-cyan-700">VEIL</span>
                <span className="text-[8px] font-mono text-cyan-500">STABLE</span>
              </div>

              {/* Map quick-link */}
              <Link href="/map">
                <motion.div
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer"
                  style={{ border: "1px solid rgba(168,85,247,0.25)", background: "rgba(168,85,247,0.04)" }}
                  whileHover={{
                    borderColor: "rgba(168,85,247,0.6)",
                    background: "rgba(168,85,247,0.1)",
                    boxShadow: "0 0 16px rgba(168,85,247,0.25), 0 0 32px rgba(168,85,247,0.1)",
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Map size={10} className="text-violet-400" />
                  <span className="text-[9px] font-mono text-violet-400" style={{ fontFamily: "'Share Tech Mono', monospace" }}>MAP</span>
                </motion.div>
              </Link>

              {/* Mobile menu toggle */}
              <motion.button
                className="lg:hidden text-slate-400 hover:text-cyan-400 transition-colors p-1.5 rounded"
                onClick={() => setMenuOpen(!menuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {menuOpen
                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.div>
                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.div>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-14 z-30 lg:hidden overflow-hidden"
            style={{
              background: "rgba(3,5,14,0.99)",
              borderBottom: "1px solid rgba(125,249,255,0.1)",
              backdropFilter: "blur(32px)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top edge glow */}
            <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(125,249,255,0.4), rgba(168,85,247,0.3), transparent)" }} />

            <div className="px-4 py-5 grid grid-cols-2 gap-1.5">
              {navLinks.map((link, i) => {
                const active = location === link.href;
                const color = link.color ?? "#7DF9FF";
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2.5 text-[10px] font-mono rounded-lg cursor-pointer transition-all"
                      style={{
                        color: active ? color : link.highlight ? link.color ?? "#A78BFA" : "#475569",
                        background: active ? `${color}0D` : "rgba(255,255,255,0.02)",
                        border: `1px solid ${active ? color + "30" : "rgba(255,255,255,0.05)"}`,
                        fontFamily: "'Share Tech Mono', monospace",
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.025 }}
                      whileHover={{ scale: 1.02, color, borderColor: `${color}40` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Footer HUD */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <span className="text-[8px] font-mono text-slate-700">VEIL NETWORK · 247 OPERATIVES ONLINE</span>
              <span className="text-[8px] font-mono text-cyan-800">{timeStr}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
