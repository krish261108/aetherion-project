import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gem, Skull } from "lucide-react";
import { artifacts, Artifact } from "@/data/artifactsData";
import SectionHeader from "@/components/SectionHeader";
import HoloCard from "@/components/HoloCard";
import GlitchText from "@/components/GlitchText";

const dangerConfig: Record<string, { color: string; bg: string; border: string }> = {
  EXTREME: { color: "text-violet-400", bg: "rgba(139,92,246,0.1)", border: "rgba(139,92,246,0.4)" },
  HIGH: { color: "text-red-400", bg: "rgba(220,38,38,0.08)", border: "rgba(220,38,38,0.3)" },
  MODERATE: { color: "text-amber-400", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  LOW: { color: "text-green-400", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
};

const categoryConfig: Record<string, { border: string; glow: string }> = {
  "Core": { border: "rgba(139,92,246,0.3)", glow: "rgba(139,92,246,0.2)" },
  "Primary": { border: "rgba(0,212,255,0.25)", glow: "rgba(0,212,255,0.15)" },
  "Functional": { border: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.1)" },
  "Flow & Balance": { border: "rgba(14,165,233,0.2)", glow: "rgba(14,165,233,0.1)" },
};

export default function Artifacts() {
  const [selected, setSelected] = useState<Artifact | null>(null);
  const [catFilter, setCatFilter] = useState("All");
  const [dangerFilter, setDangerFilter] = useState("All");

  const categories = ["All", "Core", "Primary", "Functional", "Flow & Balance"];
  const dangers = ["All", "EXTREME", "HIGH", "MODERATE"];

  const filtered = artifacts.filter((a) => {
    const catOk = catFilter === "All" || a.category === catFilter;
    const dangerOk = dangerFilter === "All" || a.danger === dangerFilter;
    return catOk && dangerOk;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Artifact Vault"
          subtitle="Fragments of the broken Aetherion Core, each carrying a piece of the original unified system."
          accent="ARTIFACT RECORDS"
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                catFilter === c
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-artifact-cat-${c.toLowerCase().replace(/\s/g, "-")}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Danger filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {dangers.map((d) => (
            <button
              key={d}
              onClick={() => setDangerFilter(d)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                dangerFilter === d
                  ? "text-red-400 border-red-500/60 bg-red-950/30"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-artifact-danger-${d.toLowerCase()}`}
            >
              {d === "All" ? "All Danger Levels" : `DANGER: ${d}`}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((art, i) => {
            const dc = dangerConfig[art.danger];
            const cc = categoryConfig[art.category];
            return (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
              <HoloCard
                className="rounded-lg cursor-pointer overflow-hidden h-full"
                style={{ background: "rgba(6,9,26,0.85)", border: `1px solid ${cc.border}`, backdropFilter: "blur(12px)" }}
                color={cc.border.replace("0.3", "1").replace("0.25", "1").replace("0.2", "1")}
                glowColor={cc.glow}
                intensity={12}
                cornerBrackets
                animatedBorder
                onClick={() => setSelected(art)}
                data-testid={`card-artifact-${art.id}`}
              >
                {/* Image header */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.name}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.55) saturate(1.3)" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,15,40,0.95) 100%)" }}
                  />
                  <div
                    className={`absolute top-3 right-3 text-xs font-mono px-2 py-0.5 border rounded ${dc.color}`}
                    style={{ borderColor: dc.border, background: "rgba(3,7,18,0.82)", backdropFilter: "blur(8px)" }}
                  >
                    {art.danger === "EXTREME" && <Skull size={8} className="inline mr-1" />}
                    {art.danger}
                  </div>
                  <div
                    className="absolute bottom-3 left-3 w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ background: dc.bg, border: `1px solid ${dc.border}` }}
                  >
                    <Gem size={14} className={dc.color} />
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <h3
                    className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {art.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mb-2">{art.category}</div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{art.meaning}</p>
                  {art.clan && (
                    <div className="mt-3 text-xs text-slate-600 font-mono">Clan: {art.clan}</div>
                  )}
                </div>
              </HoloCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
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
              className="w-full max-w-lg rounded-lg relative overflow-hidden"
              style={{
                background: "rgba(10,15,40,0.97)",
                border: `1px solid ${categoryConfig[selected.category].border}`,
                boxShadow: `0 0 60px ${categoryConfig[selected.category].glow}`,
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal image header */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.5) saturate(1.4)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(3,7,18,0.15) 0%, rgba(10,15,40,0.98) 100%)" }}
                />
                <button
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  style={{ background: "rgba(3,7,18,0.7)", borderRadius: "50%", padding: 6, backdropFilter: "blur(8px)" }}
                  onClick={() => setSelected(null)}
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <Gem size={22} className={dangerConfig[selected.danger].color} />
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-0.5">{selected.category} Artifact</div>
                    <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {selected.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Modal body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">ORIGIN</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{selected.origin}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">MEANING</div>
                    <p className="text-slate-300 text-sm italic leading-relaxed">{selected.meaning}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">SYSTEM CONNECTION</div>
                    <p className="text-slate-300 text-sm leading-relaxed">{selected.connection}</p>
                  </div>
                  <div className="flex items-center gap-6 pt-3 border-t border-slate-800">
                    <div>
                      <div className="text-xs font-mono text-slate-600 mb-1">DANGER LEVEL</div>
                      <div
                        className={`text-xs font-mono px-2 py-0.5 border rounded ${dangerConfig[selected.danger].color}`}
                        style={{ borderColor: dangerConfig[selected.danger].border, background: dangerConfig[selected.danger].bg }}
                      >
                        {selected.danger === "EXTREME" && <Skull size={8} className="inline mr-1" />}
                        {selected.danger}
                      </div>
                    </div>
                    {selected.clan && (
                      <div>
                        <div className="text-xs font-mono text-slate-600 mb-1">CLAN</div>
                        <div className="text-xs text-slate-300 font-mono">{selected.clan}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-mono text-slate-600 mb-1">CATEGORY</div>
                      <div className="text-xs text-slate-400 font-mono">{selected.category}</div>
                    </div>
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
