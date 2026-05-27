import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Swords, AlertCircle } from "lucide-react";
import { clans, Clan } from "@/data/clansData";
import SectionHeader from "@/components/SectionHeader";
import HoloCard from "@/components/HoloCard";
import GlitchText from "@/components/GlitchText";

const clanColorMap: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  gold:     { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.25)", text: "text-amber-400" },
  crimson:  { bg: "rgba(220,38,38,0.07)",  border: "rgba(220,38,38,0.25)",  glow: "rgba(220,38,38,0.25)",  text: "text-red-400" },
  teal:     { bg: "rgba(0,212,200,0.07)",  border: "rgba(0,212,200,0.25)",  glow: "rgba(0,212,200,0.25)",  text: "text-teal-400" },
  violet:   { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.25)", text: "text-violet-400" },
  amber:    { bg: "rgba(180,120,60,0.07)", border: "rgba(180,120,60,0.25)", glow: "rgba(180,120,60,0.25)", text: "text-orange-300" },
  orange:   { bg: "rgba(234,88,12,0.07)",  border: "rgba(234,88,12,0.25)",  glow: "rgba(234,88,12,0.25)",  text: "text-orange-400" },
  blue:     { bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.25)", glow: "rgba(14,165,233,0.25)", text: "text-sky-400" },
  yellow:   { bg: "rgba(250,204,21,0.07)", border: "rgba(250,204,21,0.25)", glow: "rgba(250,204,21,0.25)", text: "text-yellow-400" },
  purple:   { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.25)", text: "text-purple-400" },
  red:      { bg: "rgba(150,60,60,0.07)",  border: "rgba(150,60,60,0.25)",  glow: "rgba(150,60,60,0.25)",  text: "text-rose-400" },
};

function getCol(color: string) {
  return clanColorMap[color] ?? { bg: "rgba(0,212,255,0.05)", border: "rgba(0,212,255,0.15)", glow: "rgba(0,212,255,0.2)", text: "text-cyan-400" };
}

function ClanSymbol({ clan, size = 40 }: { clan: Clan; size?: number }) {
  const c = size / 2;
  const r = size * 0.42;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {clan.name === "Solaryn" && (
        <>
          <circle cx={c} cy={c} r={r * 0.55} fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5" />
          <circle cx={c} cy={c} r={r * 0.25} fill="rgba(245,158,11,0.4)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return <line key={deg} x1={c + Math.cos(rad) * r * 0.58} y1={c + Math.sin(rad) * r * 0.58} x2={c + Math.cos(rad) * r * 0.85} y2={c + Math.sin(rad) * r * 0.85} stroke="rgba(245,158,11,0.6)" strokeWidth="1" />;
          })}
        </>
      )}
      {clan.name === "Nytheris" && (
        <>
          <circle cx={c} cy={c} r={r * 0.75} fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1={c - r * 0.3} y1={c} x2={c + r * 0.3} y2={c} stroke="rgba(220,38,38,0.6)" strokeWidth="1" />
          <circle cx={c} cy={c} r={r * 0.15} fill="rgba(220,38,38,0.2)" />
        </>
      )}
      {clan.name === "Chronis" && (
        <>
          <ellipse cx={c} cy={c - r * 0.3} rx={r * 0.45} ry={r * 0.45} fill="none" stroke="rgba(0,212,200,0.6)" strokeWidth="1.5" />
          <ellipse cx={c} cy={c + r * 0.3} rx={r * 0.45} ry={r * 0.45} fill="none" stroke="rgba(0,212,200,0.6)" strokeWidth="1.5" />
          <line x1={c - r * 0.15} y1={c} x2={c + r * 0.15} y2={c} stroke="rgba(0,212,200,0.4)" strokeWidth="1" />
        </>
      )}
      {clan.name === "Aetherion" && (
        <>
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
          <ellipse cx={c} cy={c} rx={r * 0.7} ry={r * 0.25} fill="none" stroke="rgba(139,92,246,0.35)" strokeWidth="1" />
          <line x1={c} y1={c - r * 0.7} x2={c} y2={c + r * 0.7} stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" />
        </>
      )}
      {clan.name === "Terravon" && (
        <>
          <polygon points={`${c},${c - r * 0.6} ${c + r * 0.52},${c - r * 0.3} ${c + r * 0.52},${c + r * 0.3} ${c},${c + r * 0.6} ${c - r * 0.52},${c + r * 0.3} ${c - r * 0.52},${c - r * 0.3}`} fill="rgba(180,120,60,0.1)" stroke="rgba(180,120,60,0.6)" strokeWidth="1.5" />
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(180,120,60,0.25)" strokeWidth="1" />
        </>
      )}
      {clan.name === "Pyraxis" && (
        <>
          <polygon points={`${c},${c - r * 0.8} ${c + r * 0.25},${c + r * 0.1} ${c + r * 0.55},${c + r * 0.6} ${c},${c + r * 0.3} ${c - r * 0.55},${c + r * 0.6} ${c - r * 0.25},${c + r * 0.1}`} fill="rgba(234,88,12,0.15)" stroke="rgba(234,88,12,0.6)" strokeWidth="1.5" />
        </>
      )}
      {clan.name === "Aqualis" && (
        <>
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(14,165,233,0.3)" strokeWidth="1" />
          <path d={`M${c - r * 0.6},${c} Q${c - r * 0.3},${c - r * 0.4} ${c},${c} Q${c + r * 0.3},${c + r * 0.4} ${c + r * 0.6},${c}`} fill="none" stroke="rgba(14,165,233,0.7)" strokeWidth="2" />
        </>
      )}
      {clan.name === "Voltrix" && (
        <>
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(250,204,21,0.25)" strokeWidth="1" />
          <polygon points={`${c - r * 0.15},${c - r * 0.7} ${c - r * 0.35},${c + r * 0.05} ${c},${c + r * 0.05} ${c + r * 0.15},${c + r * 0.7} ${c + r * 0.35},${c - r * 0.05} ${c},${c - r * 0.05}`} fill="rgba(250,204,21,0.2)" stroke="rgba(250,204,21,0.7)" strokeWidth="1.5" />
        </>
      )}
      {clan.name === "Nerathis" && (
        <>
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
          <path d={`M${c},${c} m0,-${r * 0.55} a${r * 0.55},${r * 0.55} 0 1,1 0,${r * 1.1} a${r * 0.35},${r * 0.35} 0 1,0 0,-${r * 0.7}`} fill="none" stroke="rgba(168,85,247,0.7)" strokeWidth="1.5" />
        </>
      )}
      {clan.name === "Valekar" && (
        <>
          <circle cx={c} cy={c} r={r * 0.7} fill="none" stroke="rgba(150,100,100,0.25)" strokeWidth="1" />
          <line x1={c - r * 0.55} y1={c - r * 0.55} x2={c + r * 0.55} y2={c + r * 0.55} stroke="rgba(220,38,38,0.7)" strokeWidth="2" />
          <line x1={c + r * 0.55} y1={c - r * 0.55} x2={c - r * 0.55} y2={c + r * 0.55} stroke="rgba(220,38,38,0.7)" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

const interactionColors = {
  compatible: "text-green-400",
  opposed: "text-red-400",
  neutral: "text-slate-400",
};

export default function Clans() {
  const [selected, setSelected] = useState<Clan | null>(null);
  const [tierFilter, setTierFilter] = useState<"All" | "Core" | "Foundational" | "Functional">("All");
  const [activeSection, setActiveSection] = useState<"lore" | "dynamics" | "story">("lore");

  const filtered = tierFilter === "All" ? clans : clans.filter((c) => c.tier === tierFilter);

  const handleOpen = (clan: Clan) => {
    setSelected(clan);
    setActiveSection("lore");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Clan System"
          subtitle="Clans are not just groups — they are living philosophies, each representing a fundamental force of reality. Ten clans. Ten ways of understanding existence."
          accent="CLAN ARCHIVE"
        />

        <div className="text-center mb-8">
          <p className="text-xs text-slate-500 font-mono italic">
            Master rule: Clans are not defined by power. They are defined by what they believe about reality.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {(["All", "Core", "Foundational", "Functional"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                tierFilter === t
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-clan-${t.toLowerCase()}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((clan, i) => {
            const col = getCol(clan.color);
            return (
              <motion.div
                key={clan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
              <HoloCard
                className="rounded-xl cursor-pointer overflow-hidden h-full"
                style={{ background: col.bg, border: `1px solid ${col.border}`, backdropFilter: "blur(12px)" }}
                color={col.border.replace("0.25", "1")}
                glowColor={col.glow}
                intensity={12}
                cornerBrackets
                animatedBorder
                onClick={() => handleOpen(clan)}
                data-testid={`card-clan-${clan.id}`}
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={clan.image}
                    alt={clan.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, ${col.bg.replace("0.07", "0.97")} 100%)` }} />
                  <div className="absolute top-3 right-3">
                    <div className="text-xs font-mono text-slate-400 border border-slate-700/60 rounded px-2 py-0.5"
                      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}>
                      {clan.tier}
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <ClanSymbol clan={clan} size={36} />
                    <div>
                      <h3 className={`text-base font-bold ${col.text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {clan.name}
                      </h3>
                      <div className="text-xs text-slate-500">{clan.element}</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic leading-relaxed line-clamp-2">"{clan.philosophy}"</p>
                </div>
              </HoloCard>
              </motion.div>
            );
          })}
        </div>
      </div>

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
                border: `1px solid ${getCol(selected.color).border}`,
                boxShadow: `0 0 80px ${getCol(selected.color).glow}`,
              }}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero */}
              <div className="relative h-48 overflow-hidden">
                <img src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(8,12,35,0.97) 100%)` }} />
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                  onClick={() => setSelected(null)}
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-5 left-6 right-16 flex items-end gap-4">
                  <ClanSymbol clan={selected} size={52} />
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-0.5">{selected.tier} Clan</div>
                    <h2 className={`text-2xl font-bold ${getCol(selected.color).text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {selected.name}
                    </h2>
                    <div className="text-xs text-slate-400">{selected.element}</div>
                  </div>
                </div>
              </div>

              {/* Philosophy Banner */}
              <div className="px-6 py-3" style={{ background: `${getCol(selected.color).bg}`, borderBottom: `1px solid ${getCol(selected.color).border}` }}>
                <p className={`text-sm italic ${getCol(selected.color).text}`}>"{selected.philosophy}"</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-800/60">
                {(["lore", "dynamics", "story"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSection(tab)}
                    className={`flex-1 py-3 text-xs font-mono tracking-widest transition-all ${
                      activeSection === tab
                        ? `${getCol(selected.color).text} border-b-2`
                        : "text-slate-600 hover:text-slate-400"
                    }`}
                    style={activeSection === tab ? { borderColor: getCol(selected.color).border } : {}}
                  >
                    {tab === "lore" ? "LORE" : tab === "dynamics" ? "STRENGTHS" : "STORY ROLE"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeSection === "lore" && (
                    <motion.div key="lore" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-4">
                      <div>
                        <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">ORIGIN & BACKSTORY</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{selected.backstory}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle size={12} className="text-slate-500" />
                          <div className="text-xs font-mono text-slate-500 tracking-widest">INTERNAL CONFLICT</div>
                        </div>
                        <p className="text-slate-400 text-sm italic leading-relaxed">{selected.internalConflict}</p>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">SYMBOL</div>
                        <p className="text-slate-400 text-sm">{selected.symbolDesc}</p>
                      </div>
                    </motion.div>
                  )}

                  {activeSection === "dynamics" && (
                    <motion.div key="dynamics" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 rounded-lg" style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Shield size={12} className="text-green-400" />
                            <div className="text-xs font-mono text-green-600 tracking-widest">STRENGTH</div>
                          </div>
                          <p className="text-slate-300 text-sm">{selected.strength}</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)" }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Swords size={12} className="text-red-400" />
                            <div className="text-xs font-mono text-red-600 tracking-widest">WEAKNESS</div>
                          </div>
                          <p className="text-slate-300 text-sm">{selected.weakness}</p>
                        </div>
                      </div>
                      {selected.notableMembers && selected.notableMembers.length > 0 && (
                        <div>
                          <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">NOTABLE MEMBERS</div>
                          <div className="flex flex-wrap gap-2">
                            {selected.notableMembers.map((m, i) => (
                              <span key={i} className={`text-xs px-3 py-1 rounded-full font-mono ${getCol(selected.color).text}`}
                                style={{ background: getCol(selected.color).bg, border: `1px solid ${getCol(selected.color).border}` }}>
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selected.interactions && selected.interactions.length > 0 && (
                        <div>
                          <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">CLAN DYNAMICS</div>
                          <div className="space-y-2">
                            {selected.interactions.map((inter, i) => (
                              <div key={i} className="flex gap-3 items-start p-2 rounded"
                                style={{ background: "rgba(255,255,255,0.02)" }}>
                                <span className={`text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${interactionColors[inter.type]}`}>
                                  {inter.type === "compatible" ? "+" : inter.type === "opposed" ? "×" : "~"}
                                </span>
                                <div>
                                  <span className="text-xs text-white font-mono">{inter.clan}</span>
                                  <span className="text-xs text-slate-500 ml-2">— {inter.dynamic}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeSection === "story" && (
                    <motion.div key="story" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      className="space-y-4">
                      <div>
                        <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">ROLE IN THE STORY</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{selected.roleInStory}</p>
                      </div>
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
