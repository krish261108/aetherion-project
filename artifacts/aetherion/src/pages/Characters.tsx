import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Zap, Target, GitBranch } from "lucide-react";
import { characters, Character } from "@/data/charactersData";
import SectionHeader from "@/components/SectionHeader";

const statusColors: Record<string, string> = {
  Active: "text-cyan-400 border-cyan-800",
  Unstable: "text-amber-400 border-amber-800",
  Antagonist: "text-orange-400 border-orange-800",
  "Primary Antagonist": "text-red-400 border-red-800",
};

const representColors: Record<string, { bg: string; border: string; glow: string; text: string; accent: string }> = {
  "Understanding": { bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.22)", glow: "rgba(0,212,255,0.18)", text: "text-cyan-400", accent: "rgba(0,212,255,0.35)" },
  "Balance": { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.22)", glow: "rgba(245,158,11,0.18)", text: "text-amber-400", accent: "rgba(245,158,11,0.35)" },
  "Imbalance": { bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.22)", glow: "rgba(220,38,38,0.18)", text: "text-red-400", accent: "rgba(220,38,38,0.35)" },
  "Humanity": { bg: "rgba(100,116,139,0.06)", border: "rgba(100,116,139,0.22)", glow: "rgba(100,116,139,0.18)", text: "text-slate-400", accent: "rgba(100,116,139,0.35)" },
  "Discipline and Legacy": { bg: "rgba(120,113,108,0.06)", border: "rgba(120,113,108,0.22)", glow: "rgba(120,113,108,0.18)", text: "text-stone-400", accent: "rgba(120,113,108,0.35)" },
  "Knowledge": { bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.22)", glow: "rgba(139,92,246,0.18)", text: "text-violet-400", accent: "rgba(139,92,246,0.35)" },
  "Control with Good Intention": { bg: "rgba(234,88,12,0.06)", border: "rgba(234,88,12,0.22)", glow: "rgba(234,88,12,0.18)", text: "text-orange-400", accent: "rgba(234,88,12,0.35)" },
  "Absolute Control": { bg: "rgba(185,28,28,0.06)", border: "rgba(185,28,28,0.22)", glow: "rgba(185,28,28,0.18)", text: "text-red-500", accent: "rgba(185,28,28,0.35)" },
};

function getColor(represents: string) {
  return representColors[represents] ?? { bg: "rgba(0,212,255,0.05)", border: "rgba(0,212,255,0.15)", glow: "rgba(0,212,255,0.15)", text: "text-cyan-400", accent: "rgba(0,212,255,0.3)" };
}

export default function Characters() {
  const [selected, setSelected] = useState<Character | null>(null);
  const [filter, setFilter] = useState("All");
  const [activeSection, setActiveSection] = useState<"bio" | "arc" | "relationships">("bio");

  const statuses = ["All", "Active", "Unstable", "Antagonist", "Primary Antagonist"];
  const filtered = filter === "All" ? characters : characters.filter((c) => c.status === filter);

  const handleOpen = (char: Character) => {
    setSelected(char);
    setActiveSection("bio");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Characters Database"
          subtitle="Every major figure in The Aetherion Cycle — full profiles, arc progressions, and relationship dynamics."
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
                className="rounded-xl cursor-pointer relative overflow-hidden group"
                style={{ background: col.bg, border: `1px solid ${col.border}`, backdropFilter: "blur(10px)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${col.glow}` }}
                onClick={() => handleOpen(char)}
                data-testid={`card-character-${char.id}`}
              >
                {/* Photo */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, ${col.bg.replace("0.06", "0.97")} 100%)` }} />
                  <div className="absolute top-3 right-3">
                    <div className={`text-xs font-mono px-2 py-0.5 border rounded ${statusColors[char.status] ?? "text-slate-400 border-slate-800"}`}
                      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}>
                      {char.status}
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className={`text-xs font-mono mb-0.5 ${col.text}`}>Represents: {char.represents}</div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {char.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mb-2">{char.role}</div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{char.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-slate-600 font-mono">Clan: {char.clan}</div>
                    <div className="text-xs text-slate-700 font-mono">View profile</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-xl relative overflow-hidden mb-8"
              style={{
                background: "rgba(8,12,35,0.98)",
                border: `1px solid ${getColor(selected.represents).border}`,
                boxShadow: `0 0 80px ${getColor(selected.represents).glow}`,
              }}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero */}
              <div className="relative h-56 overflow-hidden">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(8,12,35,0.95) 100%)` }} />
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                  onClick={() => setSelected(null)}
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <div className={`text-xs font-mono mb-1 ${getColor(selected.represents).text}`}>
                    REPRESENTS: {selected.represents.toUpperCase()}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {selected.name}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`text-xs font-mono px-2 py-0.5 border rounded inline-block ${statusColors[selected.status] ?? "text-slate-400 border-slate-800"}`}
                      style={{ background: "rgba(0,0,0,0.5)" }}>
                      {selected.status}
                    </div>
                    <div className="text-xs text-slate-500 font-mono">Clan: {selected.clan}</div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800/60">
                {(["bio", "arc", "relationships"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSection(tab)}
                    className={`flex-1 py-3 text-xs font-mono tracking-widest transition-all ${
                      activeSection === tab
                        ? `${getColor(selected.represents).text} border-b-2`
                        : "text-slate-600 hover:text-slate-400"
                    }`}
                    style={activeSection === tab ? { borderColor: getColor(selected.represents).accent } : {}}
                  >
                    {tab === "bio" ? "PROFILE" : tab === "arc" ? "ARC STAGES" : "RELATIONSHIPS"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeSection === "bio" && (
                    <motion.div key="bio" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-4">
                      <p className="text-slate-300 text-sm leading-relaxed">{selected.fullBio}</p>

                      {/* Personality */}
                      {selected.personality && selected.personality.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User size={12} className="text-slate-500" />
                            <div className="text-xs font-mono text-slate-500 tracking-widest">PERSONALITY TRAITS</div>
                          </div>
                          <div className="space-y-1.5">
                            {selected.personality.map((trait, i) => (
                              <div key={i} className="flex gap-2 text-xs text-slate-400">
                                <span className="text-slate-600 flex-shrink-0 mt-0.5">—</span>
                                <span>{trait}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Abilities */}
                      {selected.abilities && selected.abilities.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Zap size={12} className="text-slate-500" />
                            <div className="text-xs font-mono text-slate-500 tracking-widest">ABILITIES</div>
                          </div>
                          <div className="space-y-1.5">
                            {selected.abilities.map((ab, i) => (
                              <div key={i} className="flex gap-2 text-xs text-slate-400">
                                <span className={`flex-shrink-0 mt-0.5 ${getColor(selected.represents).text}`}>›</span>
                                <span>{ab}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quote */}
                      {selected.quote && (
                        <div className="rounded-lg p-4" style={{ background: `${getColor(selected.represents).bg}`, border: `1px solid ${getColor(selected.represents).border}` }}>
                          <div className="text-xs font-mono text-slate-600 mb-1.5 tracking-widest">RECORDED QUOTE</div>
                          <p className={`text-sm italic ${getColor(selected.represents).text}`}>"{selected.quote}"</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeSection === "arc" && (
                    <motion.div key="arc" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <GitBranch size={12} className="text-slate-500" />
                          <div className="text-xs font-mono text-slate-500 tracking-widest">FULL ARC</div>
                        </div>
                        <p className={`text-sm font-mono italic ${getColor(selected.represents).text}`}>{selected.arc}</p>
                      </div>
                      {selected.arcStages && selected.arcStages.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-mono text-slate-500 tracking-widest mb-3">BOOK-BY-BOOK PROGRESSION</div>
                          {selected.arcStages.map((stage, i) => (
                            <motion.div
                              key={i}
                              className="flex gap-3 p-3 rounded-lg"
                              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-mono ${getColor(selected.represents).text}`}
                                style={{ background: getColor(selected.represents).bg, border: `1px solid ${getColor(selected.represents).border}` }}>
                                {i + 1}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">{stage}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeSection === "relationships" && (
                    <motion.div key="relationships" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-3">
                      <div className="flex items-center gap-2 mb-4">
                        <Target size={12} className="text-slate-500" />
                        <div className="text-xs font-mono text-slate-500 tracking-widest">KEY RELATIONSHIPS</div>
                      </div>
                      {selected.keyRelationships && selected.keyRelationships.map((rel, i) => (
                        <motion.div
                          key={i}
                          className="p-4 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.07 }}
                        >
                          <div className={`text-sm font-bold mb-1 ${getColor(selected.represents).text}`}
                            style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.8rem" }}>
                            {rel.name}
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{rel.dynamic}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
