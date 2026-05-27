import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Map } from "lucide-react";

const navLinks: { label: string; href: string; highlight?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Characters", href: "/characters" },
  { label: "Clans", href: "/clans" },
  { label: "Artifacts", href: "/artifacts" },
  { label: "Project AETHER", href: "/project-aether" },
  { label: "World", href: "/world" },
  { label: "Map", href: "/map", highlight: true },
  { label: "Gallery", href: "/gallery", highlight: true },
  { label: "Power", href: "/power" },
  { label: "Timeline", href: "/timeline" },
  { label: "People", href: "/people" },
  { label: "Archive", href: "/archive" },
  { label: "Search", href: "/search" },
  { label: "Author", href: "/author" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tick for animated elements
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = new Date().toTimeString().slice(0, 8);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 scan-line-anim"
        style={{
          background: scrolled
            ? "rgba(3,7,18,0.97)"
            : "rgba(3,7,18,0.85)",
          backdropFilter: "blur(24px) saturate(1.6)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.05)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Top animated scanning border */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.8) 20%, rgba(139,92,246,0.6) 50%, rgba(0,212,255,0.8) 80%, transparent 100%)",
              width: "200%",
              x: "-50%",
            }}
            animate={{ x: ["0%", "50%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: "rgba(0,212,255,0.3)", width: 30, height: 30 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner core */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center relative"
                  style={{
                    background: "radial-gradient(circle at 40% 35%, rgba(0,212,255,0.5), rgba(139,92,246,0.3), rgba(3,7,18,0.9))",
                    boxShadow: "0 0 14px rgba(0,212,255,0.5), 0 0 28px rgba(0,212,255,0.2)",
                    border: "1px solid rgba(0,212,255,0.4)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#00d4ff", boxShadow: "0 0 8px rgba(0,212,255,1)" }}
                  />
                </div>
              </div>
              <div className="hidden sm:block">
                <div
                  className="text-xs font-bold tracking-[0.2em] text-cyan-400 group-hover:text-white transition-colors leading-none"
                  style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 12px rgba(0,212,255,0.6)" }}
                >
                  AETHERION
                </div>
                <div
                  className="text-[8px] text-slate-600 tracking-widest leading-none mt-0.5"
                  style={{ fontFamily: "'Share Tech Mono', monospace" }}
                >
                  UNIVERSE ARCHIVE
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className="relative px-2 py-1 text-[10px] font-mono rounded cursor-pointer tracking-wide transition-all duration-200 group/link block"
                      style={{
                        color: active ? "#00d4ff" : link.highlight ? "#a78bfa" : "#64748b",
                        background: active ? "rgba(0,212,255,0.06)" : "transparent",
                        fontFamily: "'Share Tech Mono', monospace",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.color = link.highlight ? "#c4b5fd" : "#00d4ff";
                        (e.currentTarget as HTMLElement).style.background = active ? "rgba(0,212,255,0.06)" : "rgba(0,212,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.color = link.highlight ? "#a78bfa" : "#64748b";
                        (e.currentTarget as HTMLElement).style.background = active ? "rgba(0,212,255,0.06)" : "transparent";
                      }}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          className="absolute bottom-0 left-1 right-1 h-px"
                          style={{ background: "linear-gradient(90deg, transparent, #00d4ff, transparent)" }}
                          layoutId="active-link"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Right HUD */}
            <div className="flex items-center gap-3">
              {/* Time display */}
              <div
                className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded"
                style={{
                  background: "rgba(0,212,255,0.04)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                <div className="w-1 h-1 rounded-full bg-cyan-400" style={{ animation: "hud-blink 2s infinite", boxShadow: "0 0 4px rgba(0,212,255,0.8)" }} />
                <span className="text-[9px] text-slate-500">{timeStr}</span>
              </div>

              {/* Map quick-link */}
              <Link href="/map">
                <motion.div
                  className="hidden sm:flex items-center gap-1 px-2 py-1 rounded cursor-pointer"
                  style={{ border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.05)" }}
                  whileHover={{ borderColor: "rgba(139,92,246,0.6)", background: "rgba(139,92,246,0.1)", boxShadow: "0 0 12px rgba(139,92,246,0.2)" }}
                >
                  <Map size={10} className="text-violet-400" />
                  <span className="text-[9px] font-mono text-violet-400" style={{ fontFamily: "'Share Tech Mono', monospace" }}>MAP</span>
                </motion.div>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-slate-400 hover:text-cyan-400 transition-colors p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                data-testid="button-menu-toggle"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-14 z-30 lg:hidden overflow-hidden"
            style={{
              background: "rgba(3,7,18,0.99)",
              borderBottom: "1px solid rgba(0,212,255,0.1)",
              backdropFilter: "blur(24px)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-4 py-4 grid grid-cols-2 gap-1">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <div
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2.5 text-xs font-mono rounded cursor-pointer transition-colors ${
                        active
                          ? "text-cyan-400 bg-cyan-950/40"
                          : link.highlight
                          ? "text-violet-400 hover:text-violet-300 hover:bg-violet-950/20"
                          : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50"
                      }`}
                      style={{ fontFamily: "'Share Tech Mono', monospace" }}
                    >
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
