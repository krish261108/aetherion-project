import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, BookOpen, Users, Shield, Zap } from "lucide-react";
import AetherionCore from "@/components/AetherionCore";
import StarfieldBackground from "@/components/StarfieldBackground";
import LoadingScreen from "@/components/LoadingScreen";
import SectionHeader from "@/components/SectionHeader";

const stats = [
  { value: "7", label: "Core Books" },
  { value: "10", label: "Clans" },
  { value: "5", label: "Reality Layers" },
  { value: "14", label: "Artifacts" },
  { value: "5", label: "People Types" },
  { value: "3", label: "Core Spin-Offs" },
  { value: "1", label: "Final Convergence" },
];

const navCards = [
  { title: "Books Archive", desc: "Seven core books + spin-offs", href: "/books", icon: BookOpen, color: "cyan" },
  { title: "Characters", desc: "Complete character database", href: "/characters", icon: Users, color: "violet" },
  { title: "Clan System", desc: "10 clans, 10 philosophies", href: "/clans", icon: Shield, color: "gold" },
  { title: "Project AETHER", desc: "Classified science files", href: "/project-aether", icon: Zap, color: "red" },
];

const colorMap: Record<string, string> = {
  cyan: "rgba(0,212,255,0.15)",
  violet: "rgba(139,92,246,0.15)",
  gold: "rgba(245,158,11,0.15)",
  red: "rgba(220,38,38,0.15)",
};
const borderMap: Record<string, string> = {
  cyan: "rgba(0,212,255,0.3)",
  violet: "rgba(139,92,246,0.3)",
  gold: "rgba(245,158,11,0.3)",
  red: "rgba(220,38,38,0.3)",
};

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <StarfieldBackground />

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            {/* Accent line */}
            <motion.div
              className="text-xs tracking-widest text-cyan-500/70 mb-6 font-mono"
              initial={{ opacity: 0, y: -10 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              OFFICIAL UNIVERSE ARCHIVE — CLEARANCE GRANTED
            </motion.div>

            {/* Aetherion Core */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={loaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
              className="mb-8"
            >
              <AetherionCore size={280} />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-wider mb-4 leading-tight"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #8b5cf6 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              THE AETHERION CYCLE
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-cyan-300/80 mb-4 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              A broken reality. A hidden system. A war between control and balance.
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-slate-400 mb-10 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
            >
              A futuristic science-fantasy universe where reality exists in layers, magic and science are
              two interpretations of the same force, and humanity's attempt to control Aetherion threatens
              to collapse existence itself.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              <Link href="/books">
                <motion.button
                  className="px-6 py-3 text-sm font-mono tracking-wider rounded border text-cyan-400 border-cyan-500/50 hover:bg-cyan-950/50 transition-all"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                  data-testid="button-enter-archive"
                >
                  ENTER THE ARCHIVE
                </motion.button>
              </Link>
              <Link href="/project-aether">
                <motion.button
                  className="px-6 py-3 text-sm font-mono tracking-wider rounded border text-red-400 border-red-500/50 hover:bg-red-950/40 transition-all"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(220,38,38,0.3)" }}
                  data-testid="button-project-aether"
                >
                  PROJECT AETHER FILES
                </motion.button>
              </Link>
              <Link href="/books">
                <motion.button
                  className="px-6 py-3 text-sm font-mono tracking-wider rounded border text-violet-400 border-violet-500/50 hover:bg-violet-950/40 transition-all"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(139,92,246,0.3)" }}
                  data-testid="button-seven-books"
                >
                  EXPLORE SEVEN BOOKS
                </motion.button>
              </Link>
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

        {/* Stats */}
        <section className="py-12 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-lg"
                  style={{
                    background: "rgba(0,212,255,0.05)",
                    border: "1px solid rgba(0,212,255,0.1)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ borderColor: "rgba(0,212,255,0.4)", background: "rgba(0,212,255,0.08)" }}
                >
                  <div
                    className="text-2xl font-bold text-cyan-400 mb-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Universe Overview */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              title="Universe Core"
              subtitle="The central philosophy behind The Aetherion Cycle"
              accent="UNIVERSE OVERVIEW"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  label: "CORE CONCEPT",
                  content: "Aetherion is a force connecting science and magic. Adrian follows its truth from observation to understanding — learning that the world cannot be controlled, only balanced.",
                  color: "cyan",
                },
                {
                  label: "MAIN THEME",
                  content: "Control vs Balance. Every attempt to dominate the system accelerates the collapse it was meant to prevent. True stability requires alignment, not domination.",
                  color: "violet",
                },
                {
                  label: "CONFLICT STRUCTURE",
                  content: "Control: Victor, Arkan, Project AETHER. Balance: Liora, natural system, Aetherion. Understanding: Adrian. Imbalance: Riven, Void, fractured reality.",
                  color: "gold",
                },
                {
                  label: "FINAL TRUTH",
                  content: "Reality cannot be forced into perfection. Too much order or too much chaos both lead to destruction. A person is defined by choices, not abilities.",
                  color: "slate",
                },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  className="p-6 rounded-lg"
                  style={{
                    background: "rgba(10,15,40,0.6)",
                    border: `1px solid ${card.color === "cyan" ? "rgba(0,212,255,0.2)" : card.color === "violet" ? "rgba(139,92,246,0.2)" : card.color === "gold" ? "rgba(245,158,11,0.2)" : "rgba(100,116,139,0.2)"}`,
                    backdropFilter: "blur(10px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div
                    className={`text-xs font-mono tracking-widest mb-3 ${card.color === "cyan" ? "text-cyan-500" : card.color === "violet" ? "text-violet-500" : card.color === "gold" ? "text-amber-500" : "text-slate-500"}`}
                  >
                    {card.label}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader title="Explore the Archive" accent="NAVIGATION" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {navCards.map((card, i) => (
                <Link key={card.href} href={card.href}>
                  <motion.div
                    className="p-6 rounded-lg cursor-pointer h-full"
                    style={{
                      background: colorMap[card.color],
                      border: `1px solid ${borderMap[card.color]}`,
                      backdropFilter: "blur(10px)",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `0 0 30px ${borderMap[card.color]}`,
                    }}
                    data-testid={`card-nav-${card.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <card.icon
                      size={28}
                      className={`mb-4 ${card.color === "cyan" ? "text-cyan-400" : card.color === "violet" ? "text-violet-400" : card.color === "gold" ? "text-amber-400" : "text-red-400"}`}
                    />
                    <h3
                      className="font-bold text-white mb-2 text-sm tracking-wide"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-slate-400 text-xs">{card.desc}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
