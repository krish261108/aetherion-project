import { motion } from "framer-motion";
import { Pen, BookOpen, Globe, MessageSquare } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export default function Author() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Krish Singh"
          subtitle="Creator of The Aetherion Cycle"
          accent="AUTHOR FILE"
        />

        {/* Author hero */}
        <motion.div
          className="mb-10 p-8 rounded text-center relative overflow-hidden"
          style={{
            background: "rgba(10,15,40,0.8)",
            border: "1px solid rgba(0,212,255,0.2)",
            boxShadow: "0 0 60px rgba(0,212,255,0.06)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.4), transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.2), rgba(139,92,246,0.1))",
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow: "0 0 30px rgba(0,212,255,0.2)",
              }}
            >
              <Pen size={28} className="text-cyan-400" />
            </div>
            <h2
              className="text-3xl font-black text-white mb-2 tracking-wider"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              KRISH SINGH
            </h2>
            <div className="text-cyan-400/70 text-sm font-mono mb-4">Creator — The Aetherion Cycle</div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">
              Krish Singh is the creator of The Aetherion Cycle, a large-scale science-fantasy universe
              built around fractured realities, Aetherion, ancient forces, Project AETHER, and the
              philosophical conflict between control, destruction, and balance.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              icon: BookOpen,
              title: "Author Mission",
              content: "To build a universe that explores the deepest questions of existence — not through fantasy tropes or sci-fi clichés, but through a system that makes the reader think. The Aetherion Cycle is designed to feel like uncovering a truth that was always there.",
              color: "cyan",
            },
            {
              icon: Globe,
              title: "Universe Vision",
              content: "A universe that grows across books, spin-offs, visual systems, lore files, and interactive storytelling. Not a standalone story — a living world with enough depth to explore indefinitely.",
              color: "violet",
            },
            {
              icon: Pen,
              title: "Why Aetherion Exists",
              content: "The Aetherion Cycle exists because the question 'what if science and magic were the same thing, just misunderstood?' deserved a full universe to explore. Not a short answer — a seven-book journey from confusion to understanding.",
              color: "gold",
            },
            {
              icon: MessageSquare,
              title: "Future Plans",
              content: "Seven core books. Three confirmed spin-offs. A visual identity system, an interactive archive, a timeline that expands with each release, and a community that grows with the universe.",
              color: "teal",
            },
          ].map((card, i) => {
            const colors: Record<string, { bg: string; border: string; text: string }> = {
              cyan: { bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.2)", text: "text-cyan-400" },
              violet: { bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.2)", text: "text-violet-400" },
              gold: { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)", text: "text-amber-400" },
              teal: { bg: "rgba(0,212,200,0.06)", border: "rgba(0,212,200,0.2)", text: "text-teal-400" },
            };
            const col = colors[card.color];
            return (
              <motion.div
                key={card.title}
                className="p-6 rounded"
                style={{ background: col.bg, border: `1px solid ${col.border}` }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <card.icon size={20} className={`${col.text} mb-3`} />
                <h3 className={`text-sm font-bold mb-3 ${col.text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.content}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Creator note */}
        <motion.div
          className="p-6 rounded text-center"
          style={{
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-xs font-mono text-slate-600 mb-3">CREATOR NOTE</div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto italic">
            "This archive is the foundation of a universe designed to grow across books, spin-offs,
            visual systems, lore files, and interactive storytelling."
          </p>
          <div className="mt-4 text-xs text-slate-600 font-mono">— KRISH SINGH</div>
        </motion.div>

        {/* Social placeholders */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {["Contact the Author", "Follow Updates", "Universe Newsletter", "Community"].map((label) => (
            <motion.button
              key={label}
              className="px-4 py-2 text-xs font-mono rounded border text-slate-500 border-slate-800 hover:text-cyan-400 hover:border-cyan-900 transition-all"
              whileHover={{ scale: 1.04 }}
              data-testid={`button-author-${label.toLowerCase().replace(/\s/g, "-")}`}
            >
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
