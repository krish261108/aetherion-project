import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { characters, Character } from "@/data/charactersData";
import SectionHeader from "@/components/SectionHeader";

const statusColors: Record<string, string> = {
  Active: "text-cyan-400 border-cyan-800",
  Unstable: "text-amber-400 border-amber-800",
  Antagonist: "text-orange-400 border-orange-800",
  "Primary Antagonist": "text-red-400 border-red-800",
};

const representColors: Record<string, { bg: string; border: string; text: string }> = {
  "Understanding": { bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.25)", text: "text-cyan-400" },
  "Balance": { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", text: "text-amber-400" },
  "Imbalance": { bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.25)", text: "text-red-400" },
  "Humanity": { bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.25)", text: "text-slate-400" },
  "Discipline and legacy": { bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.25)", text: "text-slate-300" },
  "Knowledge seeker": { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.25)", text: "text-violet-400" },
  "Control with good intention": { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)", text: "text-orange-400" },
  "Absolute control": { bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.25)", text: "text-red-500" },
};

function getColor(represents: string) {
  return representColors[represents] ?? { bg: "rgba(0,212,255,0.05)", border: "rgba(0,212,255,0.15)", text: "text-cyan-400" };
}

export default function Characters() {
  const [selected, setSelected] = useState<Character | null>(null);
  const [filter, setFilter] = useState("All");

  const statuses = ["All", "Active", "Unstable", "Antagonist", "Primary Antagonist"];
  const filtered = filter === "All" ? characters : characters.filter((c) => c.status === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Characters Database"
          subtitle="A searchable archive of every major figure in The Aetherion Cycle."
          accent="CHARACTER RECORDS"
        />

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                filter === s
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-char-${s.toLowerCase().replace(/\s/g, "-")}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((char, i) => {
            const col = getColor(char.represents);
            return (
              <motion.div
                key={char.id}
                className="p-5 rounded-lg cursor-pointer"
                style={{ background: col.bg, border: `1px solid ${col.border}`, backdropFilter: "blur(10px)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${col.border}` }}
                onClick={() => setSelected(char)}
                data-testid={`card-character-${char.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: col.bg, border: `1px solid ${col.border}` }}
                  >
                    <User size={18} className={col.text} />
                  </div>
                  <div className={`text-xs font-mono px-2 py-0.5 border rounded ${statusColors[char.status] ?? "text-slate-400 border-slate-800"}`}>
                    {char.status}
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {char.name}
                </h3>
                <div className={`text-xs font-mono mb-2 ${col.text}`}>Represents: {char.represents}</div>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{char.description}</p>
                <div className="mt-3 text-xs text-slate-600 font-mono">Clan: {char.clan}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(3,7,18,0.92)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-md p-6 rounded-lg relative"
              style={{
                background: "rgba(10,15,40,0.97)",
                border: `1px solid ${getColor(selected.represents).border}`,
                boxShadow: `0 0 60px ${getColor(selected.represents).border}`,
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
                onClick={() => setSelected(null)}
              >
                <X size={18} />
              </button>

              <div className={`text-xs font-mono mb-1 ${getColor(selected.represents).text}`}>
                REPRESENTS: {selected.represents.toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {selected.name}
              </h2>
              <div className={`text-xs font-mono px-2 py-0.5 border rounded inline-block mb-4 ${statusColors[selected.status] ?? "text-slate-400 border-slate-800"}`}>
                {selected.status}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">{selected.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">CHARACTER ARC</div>
                  <p className="text-slate-300 text-sm italic">{selected.arc}</p>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">CLAN AFFILIATION</div>
                  <p className="text-slate-300 text-sm">{selected.clan}</p>
                </div>
                {selected.quote && (
                  <div className="border-t border-slate-800 pt-3">
                    <div className="text-xs font-mono text-slate-600 mb-1">RECORDED QUOTE</div>
                    <p className={`text-sm italic ${getColor(selected.represents).text}`}>"{selected.quote}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
