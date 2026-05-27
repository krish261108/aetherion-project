import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, BookOpen, Users, Shield, Zap, Map, Image } from "lucide-react";
import AetherionCore from "@/components/AetherionCore";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHeader from "@/components/SectionHeader";
import HoloCard from "@/components/HoloCard";
import GlitchText from "@/components/GlitchText";

const stats = [
  { value: "7", label: "Core Books" },
  { value: "10", label: "Clans" },
  { value: "5", label: "Reality Layers" },
  { value: "14", label: "Artifacts" },
  { value: "5", label: "People Types" },
  { value: "3", label: "Spin-Offs" },
  { value: "1", label: "Convergence" },
];

const navCards = [
  { title: "Books Archive", desc: "Seven core books + spin-offs", href: "/books", icon: BookOpen, color: "#00d4ff", glow: "rgba(0,212,255,0.25)", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { title: "Characters", desc: "Complete character database", href: "/characters", icon: Users, color: "#8b5cf6", glow: "rgba(139,92,246,0.25)", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80" },
  { title: "Clan System", desc: "10 clans, 10 philosophies", href: "/clans", icon: Shield, color: "#f59e0b", glow: "rgba(245,158,11,0.25)", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80" },
  { title: "Project AETHER", desc: "Classified science files", href: "/project-aether", icon: Zap, color: "#ef4444", glow: "rgba(220,38,38,0.25)", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80" },
  { title: "Reality Map", desc: "5-layer holographic atlas", href: "/map", icon: Map, color: "#10b981", glow: "rgba(16,185,129,0.25)", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80" },
  { title: "Universe Codex", desc: "53 canon illustrations", href: "/gallery", icon: Image, color: "#a78bfa", glow: "rgba(167,139,250,0.25)", image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80" },
];

const coreCards = [
  { label: "CORE CONCEPT", content: "Aetherion is a force connecting science and magic. Adrian follows its truth from observation to understanding — learning that the world cannot be controlled, only balanced.", color: "#00d4ff" },
  { label: "MAIN THEME", content: "Control vs Balance. Every attempt to dominate the system accelerates the collapse it was meant to prevent. True stability requires alignment, not domination.", color: "#8b5cf6" },
  { label: "CONFLICT STRUCTURE", content: "Control: Victor, Arkan, Project AETHER. Balance: Liora, natural system, Aetherion. Understanding: Adrian. Imbalance: Riven, Void, fractured reality.", color: "#f59e0b" },
  { label: "FINAL TRUTH", content: "Reality cannot be forced into perfection. Too much order or too much chaos both lead to destruction. A person is defined by choices, not abilities.", color: "#64748b" },
];

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className="relative z-10">
        {/* ─── Hero ──────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-16 relative overflow-hidden">

          {/* Holographic perspective grid floor */}
          <div
            className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,212,255,0.04) 0%, transparent 100%)",
              backgroundImage: "linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              transform: "perspective(400px) rotateX(60deg)",
              transformOrigin: "bottom center",
              maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
            }}
          />

          {/* Corner HUD decorations */}
          <div className="absolute top-20 left-6 hidden lg:block pointer-events-none">
            <div className="text-[9px] font-mono text-cyan-500/20 space-y-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              <div>SYS // ARCHIVE-7</div>
              <div>LAYER STATUS: STABLE</div>
              <div>VEIL INTEGRITY: 78%</div>
              <div>CONVERGENCE: PENDING</div>
            </div>
          </div>
          <div className="absolute top-20 right-6 hidden lg:block pointer-events-none text-right">
            <div className="text-[9px] font-mono text-cyan-500/20 space-y-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              <div>KRISH SINGH // AUTHOR</div>
              <div>BOOKS PUBLISHED: 0/7</div>
              <div>CLANS ACTIVE: 10/10</div>
              <div>AETHERION CORE: ACTIVE</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center relative z-10"
          >
            {/* Accent label */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <motion.div className="w-1 h-1 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px rgba(0,212,255,0.8)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <span className="text-xs tracking-[0.3em] text-cyan-500/70 font-mono" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                OFFICIAL UNIVERSE ARCHIVE — CLEARANCE GRANTED
              </span>
              <motion.div className="w-1 h-1 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px rgba(0,212,255,0.8)" }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }} />
            </motion.div>

            {/* Aetherion Core */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={loaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1.2, type: "spring", stiffness: 80 }}
              className="mb-8"
            >
              <AetherionCore size={300} />
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <GlitchText
                as="h1"
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider mb-4 leading-tight"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #8b5cf6 60%, #00d4ff 80%, #ffffff 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 20px rgba(0,212,255,0.3))",
                }}
                intensity="high"
              >
                THE AETHERION CYCLE
              </GlitchText>
            </motion.div>

            <motion.p
              className="text-lg sm:text-xl mb-3 max-w-2xl"
              style={{ color: "rgba(103,232,249,0.85)", textShadow: "0 0 20px rgba(0,212,255,0.3)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              A broken reality. A hidden system. A war between control and balance.
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-slate-400 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
            >
              A futuristic science-fantasy universe where reality exists in layers, magic and science are
              two interpretations of the same force, and humanity's attempt to control Aetherion threatens
              to collapse existence itself.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.3 }}
            >
              {[
                { href: "/books", label: "ENTER THE ARCHIVE", color: "#00d4ff", border: "rgba(0,212,255,0.4)", bg: "rgba(0,212,255,0.06)", shadow: "rgba(0,212,255,0.4)", testId: "button-enter-archive" },
                { href: "/map", label: "3D REALITY MAP", color: "#10b981", border: "rgba(16,185,129,0.4)", bg: "rgba(16,185,129,0.06)", shadow: "rgba(16,185,129,0.4)", testId: "button-3d-map" },
                { href: "/project-aether", label: "PROJECT AETHER", color: "#ef4444", border: "rgba(220,38,38,0.4)", bg: "rgba(220,38,38,0.05)", shadow: "rgba(220,38,38,0.4)", testId: "button-project-aether" },
              ].map((btn) => (
                <Link key={btn.href} href={btn.href}>
                  <motion.button
                    className="px-6 py-2.5 text-xs font-mono tracking-widest rounded border relative overflow-hidden holo-shine"
                    style={{ color: btn.color, borderColor: btn.border, background: btn.bg, fontFamily: "'Share Tech Mono', monospace" }}
                    whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${btn.shadow}, 0 0 48px ${btn.shadow.replace("0.4", "0.15")}` }}
                    whileTap={{ scale: 0.97 }}
                    data-testid={btn.testId}
                  >
                    {btn.label}
                  </motion.button>
                </Link>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-slate-600"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Stats ─────────────────────────────────────────────── */}
        <section className="py-12 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <HoloCard
                    className="text-center p-4 rounded-lg"
                    style={{
                      background: "rgba(0,212,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.1)",
                    }}
                    color="rgba(0,212,255,1)"
                    glowColor="rgba(0,212,255,0.15)"
                    intensity={8}
                    cornerBrackets={false}
                    animatedBorder={false}
                  >
                    <div className="text-2xl font-bold text-cyan-400 mb-1 neon-cyan" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
                  </HoloCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Universe Core ──────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Universe Core"
              subtitle="The central philosophy behind The Aetherion Cycle"
              accent="UNIVERSE OVERVIEW"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {coreCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HoloCard
                    className="p-6 rounded-xl h-full"
                    style={{
                      background: "rgba(6,9,26,0.8)",
                      border: `1px solid ${card.color}20`,
                      backdropFilter: "blur(12px)",
                    }}
                    color={card.color}
                    glowColor={`${card.color.slice(0, -1)}, 0.2)`}
                    intensity={10}
                    cornerBrackets
                  >
                    <div className="text-xs font-mono tracking-widest mb-3" style={{ color: card.color, fontFamily: "'Share Tech Mono', monospace" }}>
                      {card.label}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{card.content}</p>
                  </HoloCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Nav Cards ──────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader title="Explore the Archive" accent="NAVIGATION" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {navCards.map((card, i) => (
                <Link key={card.href} href={card.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <HoloCard
                      className="rounded-xl cursor-pointer overflow-hidden"
                      style={{ border: `1px solid ${card.color}25` }}
                      color={card.color}
                      glowColor={card.glow}
                      intensity={14}
                      cornerBrackets
                      animatedBorder
                      data-testid={`card-nav-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {/* Image */}
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          style={{ filter: "brightness(0.4) saturate(1.4)" }}
                        />
                        {/* Holographic overlay */}
                        <div className="absolute inset-0 scanlines" style={{ background: `linear-gradient(to bottom, ${card.color}08 0%, rgba(6,9,26,0.95) 100%)` }} />
                        {/* Icon */}
                        <card.icon
                          size={22}
                          className="absolute top-3 left-3"
                          style={{ color: card.color, filter: `drop-shadow(0 0 8px ${card.color})` }}
                        />
                        {/* Scan line */}
                        <motion.div
                          className="absolute left-0 right-0 h-px"
                          style={{ background: `linear-gradient(90deg, transparent, ${card.color}60, transparent)` }}
                          animate={{ y: [0, 144, 0] }}
                          transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className="p-4"
                        style={{ background: `linear-gradient(135deg, ${card.color}08, rgba(6,9,26,0.9))` }}
                      >
                        <GlitchText
                          as="h3"
                          className="font-bold text-white mb-1 text-sm tracking-wide"
                          style={{ fontFamily: "'Orbitron', sans-serif" }}
                          intensity="low"
                        >
                          {card.title}
                        </GlitchText>
                        <p className="text-slate-400 text-xs mb-3">{card.desc}</p>
                        <div className="flex items-center gap-1 text-xs font-mono" style={{ color: card.color, fontFamily: "'Share Tech Mono', monospace" }}>
                          <span>EXPLORE</span>
                          <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </div>
                      </div>
                    </HoloCard>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bottom convergence banner ───────────────────────────── */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <HoloCard
              className="rounded-2xl p-10 text-center relative overflow-hidden"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.08) 0%, rgba(6,9,26,0.95) 60%)",
                border: "1px solid rgba(0,212,255,0.15)",
              }}
              color="rgba(0,212,255,1)"
              glowColor="rgba(0,212,255,0.2)"
              intensity={6}
              cornerBrackets
              animatedBorder
            >
              <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-500/50 mb-3" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                THE FINAL STATE
              </div>
              <GlitchText
                as="h2"
                className="text-2xl md:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                intensity="medium"
              >
                CONVERGENCE IS COMING
              </GlitchText>
              <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
                Seven books. Ten clans. One Aetherion. The layers are thinning. The Veil is fracturing.
                What happens when everything reconnects will determine whether reality survives — or ends.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ background: i < 3 ? "#00d4ff" : "rgba(0,212,255,0.2)", boxShadow: i < 3 ? "0 0 6px rgba(0,212,255,0.8)" : "none" }}
                    animate={i < 3 ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-600">BOOK 3 OF 7 — IN PROGRESS</div>
            </HoloCard>
          </div>
        </section>
      </div>
    </>
  );
}
