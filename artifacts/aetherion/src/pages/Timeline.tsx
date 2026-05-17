import { motion } from "framer-motion";
import { timelineEvents } from "@/data/timelineData";
import SectionHeader from "@/components/SectionHeader";

const eraColors: Record<string, { dot: string; line: string; badge: string; text: string }> = {
  ancient: { dot: "bg-amber-400", line: "border-amber-900/40", badge: "text-amber-400 border-amber-800", text: "text-amber-400" },
  "pre-series": { dot: "bg-violet-400", line: "border-violet-900/40", badge: "text-violet-400 border-violet-800", text: "text-violet-400" },
  series: { dot: "bg-cyan-400", line: "border-cyan-900/40", badge: "text-cyan-400 border-cyan-800", text: "text-cyan-400" },
  convergence: { dot: "bg-red-400", line: "border-red-900/40", badge: "text-red-400 border-red-800", text: "text-red-400" },
};

const eraLabels: Record<string, string> = {
  ancient: "ANCIENT ERA",
  "pre-series": "PRE-SERIES",
  series: "THE SERIES",
  convergence: "CONVERGENCE",
};

export default function Timeline() {
  let lastEra = "";

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="The Timeline"
          subtitle="From the Unified Age to the Eternal Aetherion — the complete history of the Aetherion Cycle universe."
          accent="HISTORICAL ARCHIVE"
        />

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.2), rgba(139,92,246,0.2), rgba(220,38,38,0.2))" }}
          />

          <div className="space-y-2">
            {timelineEvents.map((event, i) => {
              const col = eraColors[event.era];
              const showEraLabel = event.era !== lastEra;
              lastEra = event.era;

              return (
                <div key={event.id}>
                  {showEraLabel && (
                    <motion.div
                      className="flex items-center gap-4 py-4 pl-16 sm:pl-20"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`text-xs font-mono tracking-widest ${col.text}`}>
                        — {eraLabels[event.era]} —
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    className="flex gap-4 sm:gap-6 relative"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.5 }}
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 w-12 sm:w-16 flex justify-center">
                      <div className={`w-3 h-3 rounded-full ${col.dot} mt-5 shrink-0 z-10 relative`}
                        style={{ boxShadow: `0 0 8px currentColor` }}
                      />
                    </div>

                    {/* Content */}
                    <motion.div
                      className="flex-1 p-4 rounded mb-2"
                      style={{ background: "rgba(10,15,40,0.7)", border: `1px solid rgba(100,116,139,0.15)` }}
                      whileHover={{ borderColor: "rgba(0,212,255,0.2)", boxShadow: "0 0 15px rgba(0,212,255,0.06)" }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <div
                          className={`text-xs font-mono px-1.5 py-0.5 border rounded ${col.badge}`}
                          style={{ background: "rgba(0,0,0,0.3)" }}
                        >
                          #{event.number.toString().padStart(2, "0")}
                        </div>
                        {event.bookRef && (
                          <div className="text-xs font-mono text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">
                            {event.bookRef}
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{event.description}</p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
