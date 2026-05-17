import { motion } from "framer-motion";
import { peopleTypes } from "@/data/peopleTypesData";
import SectionHeader from "@/components/SectionHeader";

const typeColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  cyan: { bg: "rgba(0,212,255,0.07)", border: "rgba(0,212,255,0.25)", glow: "rgba(0,212,255,0.2)", text: "text-cyan-400" },
  violet: { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)", glow: "rgba(139,92,246,0.2)", text: "text-violet-400" },
  slate: { bg: "rgba(100,116,139,0.07)", border: "rgba(100,116,139,0.25)", glow: "rgba(100,116,139,0.2)", text: "text-slate-400" },
  green: { bg: "rgba(34,197,94,0.07)", border: "rgba(34,197,94,0.25)", glow: "rgba(34,197,94,0.2)", text: "text-green-400" },
  red: { bg: "rgba(220,38,38,0.07)", border: "rgba(220,38,38,0.25)", glow: "rgba(220,38,38,0.2)", text: "text-red-400" },
};

export default function People() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="People System"
          subtitle="A person's relationship with Aetherion defines their abilities, limitations, and place in society."
          accent="PEOPLE CLASSIFICATION"
        />

        <div className="mb-8 p-4 rounded text-center" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <p className="text-xs font-mono text-slate-500 italic">
            Master rule: Power is not just ability — it is connection, understanding, and cost.
          </p>
        </div>

        <div className="space-y-5">
          {peopleTypes.map((type, i) => {
            const col = typeColors[type.color];
            return (
              <motion.div
                key={type.id}
                className="p-6 rounded"
                style={{ background: col.bg, border: `1px solid ${col.border}`, backdropFilter: "blur(10px)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ boxShadow: `0 0 30px ${col.glow}` }}
                data-testid={`card-people-${type.id}`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-48 shrink-0">
                    <div className={`text-xs font-mono mb-1 ${col.text}`}>TYPE {String(i + 1).padStart(2, "0")}</div>
                    <h3
                      className={`text-xl font-bold mb-2 ${col.text}`}
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {type.name}
                    </h3>
                    <div className="text-xs text-slate-500 leading-relaxed">{type.socialView}</div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-xs font-mono text-slate-500 mb-1">DEFINITION</div>
                      <p className="text-sm text-slate-300">{type.definition}</p>
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-500 mb-1">NATURE</div>
                      <p className="text-sm text-slate-400">{type.nature}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-mono text-green-600 mb-1">STRENGTHS</div>
                        <ul className="space-y-0.5">
                          {type.strengths.map((s) => (
                            <li key={s} className="text-xs text-slate-400 flex gap-1">
                              <span className="text-green-700">+</span> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-red-600 mb-1">WEAKNESSES</div>
                        <ul className="space-y-0.5">
                          {type.weaknesses.map((w) => (
                            <li key={w} className="text-xs text-slate-400 flex gap-1">
                              <span className="text-red-700">—</span> {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {type.hiddenNote && (
                      <div
                        className="p-3 rounded text-xs font-mono"
                        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(100,116,139,0.2)" }}
                      >
                        <span className="text-slate-600">NOTE: </span>
                        <span className={col.text}>{type.hiddenNote}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
