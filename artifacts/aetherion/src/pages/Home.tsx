import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Users, Shield, Zap, Map, Image, ChevronRight, Globe, Clock, Layers } from "lucide-react";
import AetherionCrystal from "@/components/AetherionCrystal";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHeader from "@/components/SectionHeader";

/* ── Data ─────────────────────────────────────────────────── */
const navCards = [
  { title: "Books Archive", desc: "Seven core volumes + spin-offs — every synopsis, arc, and story thread.", href: "/books", icon: BookOpen, accent: "#7DF9FF" },
  { title: "Characters", desc: "Every major figure — full profiles, arc progressions, relationship maps.", href: "/characters", icon: Users, accent: "#A855F7" },
  { title: "Clan System", desc: "10 clans, 10 philosophies. Each a living force of reality.", href: "/clans", icon: Shield, accent: "#C084FC" },
  { title: "Project AETHER", desc: "Classified files on the science division behind the collapse.", href: "/project-aether", icon: Zap, accent: "#00E5FF" },
  { title: "Reality Map", desc: "5-layer holographic atlas of every world and Veil node.", href: "/map", icon: Map, accent: "#7DF9FF" },
  { title: "Universe Codex", desc: "53 canon illustrations — the official visual record.", href: "/gallery", icon: Image, accent: "#A855F7" },
];

const stats = [
  { value: "7", label: "Core Books", icon: BookOpen },
  { value: "10", label: "Clans", icon: Shield },
  { value: "5", label: "Reality Layers", icon: Layers },
  { value: "14", label: "Artifacts", icon: Zap },
  { value: "3+", label: "Spin-offs", icon: Globe },
  { value: "1", label: "Convergence", icon: Clock },
];

const pillars = [
  {
    label: "CORE CONCEPT",
    title: "The Aetherion Force",
    content: "A living connection between science and magic. Adrian traces its truth from observation to understanding — learning that the world cannot be controlled, only balanced.",
    color: "#7DF9FF",
  },
  {
    label: "CENTRAL THEME",
    title: "Control vs. Balance",
    content: "Every attempt to dominate the system accelerates the collapse it was meant to prevent. True stability requires alignment, not dominance.",
    color: "#A855F7",
  },
  {
    label: "CONFLICT AXIS",
    title: "The Three Paths",
    content: "Control: Victor, Arkan, Project AETHER. Balance: Liora, natural forces, Aetherion. Understanding: Adrian. Imbalance: Riven, the Void, fractured reality.",
    color: "#C084FC",
  },
  {
    label: "FINAL TRUTH",
    title: "The Immutable Law",
    content: "Reality cannot be forced into perfection. Excess order or chaos both destroy. What defines a being is not ability — it is the choices made when power has no limit.",
    color: "#00E5FF",
  },
];

/* ── Animate variant helpers ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: "easeOut" } as const,
});
const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: "easeOut" } as const,
});

/* ── Component ────────────────────────────────────────────── */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div className="relative z-10">

        {/* ════════════════════════ HERO ════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden">

          {/* Top radial ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(125,249,255,0.06) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)",
            }}
          />

          {/* Label */}
          <motion.div {...fadeUp(0.15)} className="mt-24 mb-6 flex items-center gap-3">
            <span className="block w-8 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(125,249,255,0.5))" }} />
            <span
              className="text-[10px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(125,249,255,0.6)", fontFamily: "'Share Tech Mono', monospace" }}
            >
              Official Universe Archive · Krish Singh
            </span>
            <span className="block w-8 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(125,249,255,0.5))" }} />
          </motion.div>

          {/* Main title */}
          <motion.div {...fadeUp(0.25)} className="text-center px-6 relative z-10">
            <h1
              className="leading-[0.9] font-black tracking-tight select-none"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(3rem, 10vw, 8.5rem)",
                background: "linear-gradient(160deg, #ffffff 0%, #7DF9FF 30%, #A855F7 60%, #7DF9FF 80%, #e2e8f0 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "holo-text-shift 10s ease-in-out infinite",
              }}
            >
              THE AETHERION
              <br />
              <span style={{ fontSize: "0.55em", letterSpacing: "0.25em" }}>CYCLE</span>
            </h1>
          </motion.div>

          {/* Crystal — centerpiece */}
          <motion.div
            className="relative w-full"
            style={{ maxWidth: 680, height: "min(62vh, 580px)" }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <AetherionCrystal className="w-full h-full" />

            {/* Bottom crystal fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{ background: "linear-gradient(to top, #050816, transparent)" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.7)}
            className="text-center text-base md:text-lg text-slate-400 max-w-xl px-6 -mt-8 leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            A fractured reality. A hidden truth. Seven books charting one universe's
            war between order, chaos, and the force that was never meant to be controlled.
          </motion.p>

          {/* CTA group */}
          <motion.div {...fadeUp(0.85)} className="flex flex-wrap items-center justify-center gap-4 mt-10 px-4">
            <Link
              href="/books"
              className="relative inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium tracking-widest uppercase overflow-hidden rounded-sm"
              style={{
                background: "linear-gradient(135deg, rgba(125,249,255,0.12), rgba(168,85,247,0.08))",
                border: "1px solid rgba(125,249,255,0.35)",
                color: "#7DF9FF",
                fontFamily: "'Share Tech Mono', monospace",
                letterSpacing: "0.2em",
                boxShadow: "0 0 24px rgba(125,249,255,0.1), inset 0 1px 0 rgba(125,249,255,0.06)",
              }}
            >
              <span>Enter Archive</span>
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-widest uppercase rounded-sm"
              style={{
                background: "rgba(11,16,38,0.5)",
                border: "1px solid rgba(168,85,247,0.3)",
                color: "#C084FC",
                fontFamily: "'Share Tech Mono', monospace",
                letterSpacing: "0.2em",
              }}
            >
              <Map size={14} />
              <span>Reality Map</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-widest uppercase rounded-sm"
              style={{
                background: "rgba(11,16,38,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "'Share Tech Mono', monospace",
                letterSpacing: "0.2em",
              }}
            >
              <Image size={14} />
              <span>Codex</span>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 mb-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(125,249,255,0.3)", fontFamily: "'Share Tech Mono', monospace" }}>
              scroll
            </div>
            <motion.div
              className="w-px h-10"
              style={{ background: "linear-gradient(to bottom, rgba(125,249,255,0.35), transparent)" }}
              animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </section>

        {/* ═══════════════════════ STATS ════════════════════════ */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-0 rounded-sm overflow-hidden"
              style={{ border: "1px solid rgba(125,249,255,0.08)", background: "rgba(11,16,38,0.4)", backdropFilter: "blur(24px)" }}
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  {...fadeUpView(i * 0.06)}
                  className="flex flex-col items-center justify-center py-8 px-3 text-center"
                  style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(125,249,255,0.07)" : "none" }}
                >
                  <div
                    className="text-3xl md:text-4xl font-black mb-1"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: "#7DF9FF", textShadow: "0 0 20px rgba(125,249,255,0.4)" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase text-slate-500" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ ARCHIVE CARDS ═══════════════════ */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Explore the Archive"
              subtitle="The complete canon — every world, person, clan, and secret documented in the Aetherion Cycle."
              accent="UNIVERSE DATABASE"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {navCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div key={card.href} {...fadeUpView(i * 0.08)}>
                    <Link
                      href={card.href}
                      className="group flex flex-col gap-4 p-6 rounded-sm cursor-pointer relative overflow-hidden holo-shine hud-corners"
                      style={{
                        background: "rgba(11,16,38,0.6)",
                        border: "1px solid rgba(125,249,255,0.1)",
                        backdropFilter: "blur(24px)",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        display: "flex",
                        textDecoration: "none",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${card.accent}40`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${card.accent}12`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(125,249,255,0.1)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center"
                        style={{ background: `${card.accent}14`, border: `1px solid ${card.accent}30` }}
                      >
                        <Icon size={18} style={{ color: card.accent }} />
                      </div>

                      {/* Text */}
                      <div>
                        <h3
                          className="font-bold text-base mb-1.5 tracking-wide"
                          style={{ fontFamily: "'Orbitron', sans-serif", color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {card.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="mt-auto flex items-center gap-1.5 text-xs tracking-widest uppercase"
                        style={{ color: card.accent, fontFamily: "'Share Tech Mono', monospace", opacity: 0.7, transition: "opacity 0.2s" }}
                      >
                        <span>Access Records</span>
                        <ChevronRight size={11} />
                      </div>

                      {/* Hover glow corner */}
                      <div
                        className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle, ${card.accent}15 0%, transparent 70%)`, transition: "opacity 0.4s" }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════ UNIVERSE PILLARS ═════════════════ */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Universe Architecture"
              subtitle="The immutable laws and living philosophies that govern existence in the Aetherion Cycle."
              accent="FOUNDATIONAL LORE"
              accentColor="#A855F7"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  {...fadeUpView(i * 0.1)}
                  className="p-7 rounded-sm relative overflow-hidden holo-shine"
                  style={{
                    background: "rgba(11,16,38,0.55)",
                    border: `1px solid ${p.color}20`,
                    backdropFilter: "blur(24px)",
                  }}
                >
                  {/* Top accent bar */}
                  <div className="h-px w-full mb-6" style={{ background: `linear-gradient(to right, ${p.color}60, transparent)` }} />

                  <div
                    className="text-[9px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: `${p.color}80`, fontFamily: "'Share Tech Mono', monospace" }}
                  >
                    {p.label}
                  </div>
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: p.color, textShadow: `0 0 16px ${p.color}40` }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {p.content}
                  </p>

                  {/* Corner glow */}
                  <div
                    className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${p.color}10 0%, transparent 70%)` }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ CONVERGENCE CTA ═════════════════ */}
        <section className="py-28 px-4">
          <motion.div
            {...fadeUpView(0)}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="text-[10px] tracking-[0.35em] uppercase mb-5"
              style={{ color: "rgba(125,249,255,0.4)", fontFamily: "'Share Tech Mono', monospace" }}
            >
              The Convergence Approaches
            </div>
            <h2
              className="text-3xl md:text-5xl font-black mb-6 leading-tight"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(135deg, #e2e8f0, #7DF9FF, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Where Reality
              <br />Fractures
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Seven books. Ten clans. Five layers of reality collapsing into one moment.
              The archive contains everything. Begin where you must.
            </p>
            <Link
              href="/books"
              className="inline-flex items-center gap-3 px-10 py-4 text-sm font-medium tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, rgba(125,249,255,0.15), rgba(168,85,247,0.1))",
                border: "1px solid rgba(125,249,255,0.25)",
                color: "#7DF9FF",
                fontFamily: "'Share Tech Mono', monospace",
                letterSpacing: "0.2em",
                boxShadow: "0 0 40px rgba(125,249,255,0.08)",
                borderRadius: "2px",
              }}
            >
              Begin the Cycle
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        </section>

      </div>
    </>
  );
}
