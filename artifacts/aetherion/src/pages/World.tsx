import { motion } from "framer-motion";
import { layers, veilStages } from "@/data/layersData";
import SectionHeader from "@/components/SectionHeader";

const layerColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  blue: { bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.25)", glow: "rgba(14,165,233,0.2)", text: "text-sky-400" },
  violet: { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.2)", text: "text-violet-400" },
  gold: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", glow: "rgba(245,158,11,0.2)", text: "text-amber-400" },
  red: { bg: "rgba(220,38,38,0.07)", border: "rgba(220,38,38,0.25)", glow: "rgba(220,38,38,0.2)", text: "text-red-400" },
  teal: { bg: "rgba(0,212,200,0.07)", border: "rgba(0,212,200,0.25)", glow: "rgba(0,212,200,0.2)", text: "text-teal-400" },
};

const stageColors = ["text-slate-400", "text-cyan-400/60", "text-cyan-400", "text-amber-400", "text-red-400", "text-violet-400"];

export default function World() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Reality Layers"
          subtitle="Reality is not a single world but a multi-layered system held together by Aetherion. Each layer is governed by different rules, separated for stability."
          accent="WORLD SYSTEM"
        />

        {/* Core principle */}
        <motion.div
          className="mb-12 p-5 rounded text-center"
          style={{
            background: "rgba(0,212,255,0.05)",
            border: "1px solid rgba(0,212,255,0.15)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-xs font-mono text-cyan-500/60 mb-2">CORE PRINCIPLE</div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
            Reality is stable only when its layers remain balanced and properly separated by the Veil.
            Controlled convergence creates aligned forces and a stable system. Uncontrolled convergence
            creates conflicting forces and total destruction.
          </p>
        </motion.div>

        {/* The Veil */}
        <div className="mb-12">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5">THE VEIL</div>
          <motion.div
            className="p-6 rounded"
            style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-300 text-sm mb-4">
              The invisible boundary between layers. The Veil separates different realities, prevents
              rule conflicts, and maintains stability. When the Veil is compromised, the consequences cascade.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { state: "STABLE", desc: "Worlds remain separate. Normal function.", color: "text-green-400 border-green-900" },
                { state: "FRACTURED", desc: "Anomalies occur. Glitches in reality.", color: "text-amber-400 border-amber-900" },
                { state: "BROKEN", desc: "Layers begin to merge. Collapse imminent.", color: "text-red-400 border-red-900" },
              ].map((v) => (
                <div key={v.state} className={`text-center p-3 rounded border ${v.color.split(" ")[1]}`} style={{ background: "rgba(0,0,0,0.3)" }}>
                  <div className={`text-xs font-mono mb-1 ${v.color.split(" ")[0]}`}>{v.state}</div>
                  <p className="text-xs text-slate-400">{v.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Reality Layers */}
        <div className="mb-12">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5">THE FIVE LAYERS</div>
          <div className="space-y-4">
            {layers.map((layer, i) => {
              const col = layerColors[layer.color];
              return (
                <motion.div
                  key={layer.id}
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid ${col.border}` }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ boxShadow: `0 0 30px ${col.glow}` }}
                >
                  {/* Image strip */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={layer.image}
                      alt={layer.name}
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.45) saturate(1.4)" }}
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(10,15,40,0.95) 0%, rgba(10,15,40,0.5) 50%, rgba(10,15,40,0.3) 100%)` }} />
                    <div className="absolute inset-0 flex items-center px-6 gap-5">
                      <div className={`text-5xl font-mono shrink-0 ${col.text}`} style={{ fontFamily: "'Orbitron', sans-serif", opacity: 0.85 }}>
                        {layer.number}
                      </div>
                      <div>
                        <div className={`text-xs font-mono mb-1 ${col.text}`} style={{ opacity: 0.7 }}>LAYER {layer.number} — {layer.subtitle}</div>
                        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          {layer.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5" style={{ background: col.bg }}>
                    <p className="text-sm text-slate-300 mb-3">{layer.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {layer.characteristics.map((c) => (
                        <span key={c} className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${col.border}`, color: "rgba(200,220,240,0.6)" }}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 italic">{layer.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Instability Stages */}
        <div>
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5">INSTABILITY STAGES</div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {veilStages.map((stage, i) => (
              <motion.div
                key={stage.stage}
                className="p-4 rounded text-center"
                style={{ background: "rgba(10,15,40,0.7)", border: "1px solid rgba(100,116,139,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={`text-xl font-bold mb-2 ${stageColors[stage.stage]}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {stage.stage}
                </div>
                <div className={`text-xs font-mono mb-2 ${stageColors[stage.stage]}`}>{stage.name}</div>
                <p className="text-xs text-slate-500">{stage.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
