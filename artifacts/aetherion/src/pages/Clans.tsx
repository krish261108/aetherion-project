import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { clans, Clan } from "@/data/clansData";
import SectionHeader from "@/components/SectionHeader";

const clanColorMap: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  gold: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.3)", text: "text-amber-400" },
  "crimson/dark": { bg: "rgba(220,38,38,0.07)", border: "rgba(220,38,38,0.25)", glow: "rgba(220,38,38,0.3)", text: "text-red-400" },
  "silver/teal": { bg: "rgba(0,212,200,0.07)", border: "rgba(0,212,200,0.25)", glow: "rgba(0,212,200,0.3)", text: "text-teal-400" },
  "violet/cyan": { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.3)", text: "text-violet-400" },
  "brown/amber": { bg: "rgba(180,120,60,0.07)", border: "rgba(180,120,60,0.25)", glow: "rgba(180,120,60,0.3)", text: "text-orange-300" },
  "orange/red": { bg: "rgba(234,88,12,0.07)", border: "rgba(234,88,12,0.25)", glow: "rgba(234,88,12,0.3)", text: "text-orange-400" },
  "blue/teal": { bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.25)", glow: "rgba(14,165,233,0.3)", text: "text-sky-400" },
  "yellow/electric": { bg: "rgba(250,204,21,0.07)", border: "rgba(250,204,21,0.25)", glow: "rgba(250,204,21,0.3)", text: "text-yellow-400" },
  "purple/lavender": { bg: "rgba(168,85,247,0.07)", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.3)", text: "text-purple-400" },
  "steel/crimson": { bg: "rgba(150,100,100,0.07)", border: "rgba(150,100,100,0.25)", glow: "rgba(150,100,100,0.3)", text: "text-rose-400" },
};

function getCol(color: string) {
  return clanColorMap[color] ?? { bg: "rgba(0,212,255,0.05)", border: "rgba(0,212,255,0.15)", glow: "rgba(0,212,255,0.2)", text: "text-cyan-400" };
}

// SVG clan symbols
function ClanSymbol({ clan, size = 40 }: { clan: Clan; size?: number }) {
  const col = getCol(clan.color);
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

export default function Clans() {
  const [selected, setSelected] = useState<Clan | null>(null);
  const [tierFilter, setTierFilter] = useState<"All" | "Core" | "Foundational" | "Functional">("All");

  const filtered = tierFilter === "All" ? clans : clans.filter((c) => c.tier === tierFilter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Clan System"
          subtitle="Clans are not just groups — they are manifestations of fundamental forces of reality, each representing a philosophy about existence."
          accent="CLAN ARCHIVE"
        />

        <div className="text-center mb-8">
          <p className="text-xs text-slate-500 font-mono italic">
            Master rule: Clans are not defined by power, but by what they believe about reality.
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
                className="p-5 rounded-lg cursor-pointer"
                style={{ background: col.bg, border: `1px solid ${col.border}`, backdropFilter: "blur(10px)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${col.glow}` }}
                onClick={() => setSelected(clan)}
                data-testid={`card-clan-${clan.id}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <ClanSymbol clan={clan} size={44} />
                  <div className="text-xs font-mono text-slate-600 border border-slate-800 rounded px-2 py-0.5">
                    {clan.tier}
                  </div>
                </div>
                <h3 className={`text-lg font-bold mb-1 ${col.text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {clan.name}
                </h3>
                <div className="text-xs text-slate-500 mb-3">{clan.element}</div>
                {clan.philosophy && (
                  <p className="text-xs text-slate-400 italic leading-relaxed">"{clan.philosophy}"</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

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
                border: `1px solid ${getCol(selected.color).border}`,
                boxShadow: `0 0 60px ${getCol(selected.color).glow}`,
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-slate-500 hover:text-white" onClick={() => setSelected(null)}>
                <X size={18} />
              </button>
              <div className="flex items-center gap-4 mb-4">
                <ClanSymbol clan={selected} size={56} />
                <div>
                  <div className="text-xs font-mono text-slate-500">{selected.tier} Clan</div>
                  <h2 className={`text-2xl font-bold ${getCol(selected.color).text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {selected.name}
                  </h2>
                  <div className="text-xs text-slate-400">{selected.element}</div>
                </div>
              </div>
              {selected.philosophy && (
                <p className={`text-sm italic mb-4 ${getCol(selected.color).text}`}>"{selected.philosophy}"</p>
              )}
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1">SYMBOL</div>
                  <p className="text-slate-300 text-sm">{selected.symbolDesc}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs font-mono text-green-600 mb-1">STRENGTH</div>
                    <p className="text-slate-300 text-sm">{selected.strength}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-red-600 mb-1">WEAKNESS</div>
                    <p className="text-slate-300 text-sm">{selected.weakness}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
