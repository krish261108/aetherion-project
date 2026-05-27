import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          background: "rgba(3,7,18,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle, rgba(0,212,255,0.4), rgba(139,92,246,0.2))",
                  boxShadow: "0 0 12px rgba(0,212,255,0.4)",
                  border: "1px solid rgba(0,212,255,0.3)",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <span
                className="text-sm font-bold text-cyan-400 tracking-widest hidden sm:block group-hover:text-white transition-colors"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                AETHERION
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`px-2 py-1 text-[10px] font-mono rounded transition-all duration-200 cursor-pointer tracking-wide ${
                        active
                          ? "text-cyan-400 bg-cyan-950/50"
                          : link.highlight
                          ? "text-violet-400 hover:text-violet-300 hover:bg-violet-950/30"
                          : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50"
                      }`}
                      style={{
                        borderBottom: active
                          ? "1px solid rgba(0,212,255,0.5)"
                          : link.highlight && !active
                          ? "1px solid rgba(139,92,246,0.3)"
                          : "1px solid transparent",
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-slate-400 hover:text-cyan-400 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="button-menu-toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-x-0 top-16 z-30 lg:hidden"
            style={{
              background: "rgba(3,7,18,0.98)",
              borderBottom: "1px solid rgba(0,212,255,0.1)",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <div
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 text-sm font-mono rounded cursor-pointer transition-colors ${
                        active ? "text-cyan-400 bg-cyan-950/50" : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900/50"
                      }`}
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
