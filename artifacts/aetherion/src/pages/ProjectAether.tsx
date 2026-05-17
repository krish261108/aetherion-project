import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ChevronDown, ChevronUp, Lock, Unlock, Eye } from "lucide-react";
import { projectPhases, keyFigures, classifiedLogs, projectMethods } from "@/data/projectAETHERData";
import SectionHeader from "@/components/SectionHeader";

const clearanceColors: Record<string, string> = {
  CLASSIFIED: "text-amber-400 border-amber-800",
  "TOP SECRET": "text-orange-400 border-orange-800",
  "EYES ONLY": "text-red-400 border-red-800",
  OMEGA: "text-violet-400 border-violet-800",
};

function ScanLines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-5"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,150,0.3) 2px, rgba(0,255,150,0.3) 4px)",
      }}
    />
  );
}

export default function ProjectAether() {
  const [openLogs, setOpenLogs] = useState<string[]>([]);

  const toggleLog = (id: string) =>
    setOpenLogs((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Warning banner */}
        <motion.div
          className="relative mb-8 p-4 rounded overflow-hidden"
          style={{
            background: "rgba(220,38,38,0.08)",
            border: "1px solid rgba(220,38,38,0.4)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ScanLines />
          <div className="relative z-20 flex items-center gap-3">
            <AlertTriangle size={20} className="text-red-400 shrink-0" />
            <div>
              <div
                className="text-xs font-mono text-red-400 tracking-widest mb-0.5"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                CLEARANCE LEVEL: OMEGA — RESTRICTED ACCESS
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Unauthorized access to Project AETHER files is a punishable offense under Directive 7-ALPHA. All access is logged.
              </div>
            </div>
          </div>
          {/* Warning stripes */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: "repeating-linear-gradient(90deg, rgba(220,38,38,0.6) 0px, rgba(220,38,38,0.6) 16px, rgba(0,0,0,0) 16px, rgba(0,0,0,0) 32px)",
            }}
          />
        </motion.div>

        <SectionHeader
          title="Project AETHER"
          subtitle="Humanity's attempt to understand, replicate, and ultimately control the Aetherion system. The reason reality begins to collapse."
          accent="CLASSIFIED INITIATIVE"
        />

        {/* Core concept */}
        <motion.div
          className="relative mb-10 p-6 rounded overflow-hidden"
          style={{
            background: "rgba(3,7,18,0.9)",
            border: "1px solid rgba(0,255,150,0.15)",
            fontFamily: "monospace",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ScanLines />
          <div className="relative z-20">
            <div className="text-xs text-green-400/60 mb-2">&gt; CORE DIRECTIVE</div>
            <p className="text-green-300/80 text-sm leading-relaxed">
              If reality follows rules, it can be controlled. Project AETHER was established to prove
              this hypothesis — and to use that control to protect humanity from forces it cannot
              understand.
            </p>
            <div className="mt-4 text-xs text-green-600/50">
              STATUS: PHASE 4 ACTIVE — ARKAN DIRECTIVE IN EFFECT
            </div>
          </div>
        </motion.div>

        {/* Phases */}
        <div className="mb-12">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5 text-center">OPERATIONAL PHASES</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projectPhases.map((phase, i) => (
              <motion.div
                key={phase.number}
                className="p-4 rounded relative overflow-hidden"
                style={{
                  background: phase.status === "CLASSIFIED" ? "rgba(139,92,246,0.06)" : phase.status === "ACTIVE" ? "rgba(0,212,255,0.06)" : "rgba(10,15,40,0.7)",
                  border: `1px solid ${phase.status === "CLASSIFIED" ? "rgba(139,92,246,0.25)" : phase.status === "ACTIVE" ? "rgba(0,212,255,0.2)" : "rgba(100,116,139,0.2)"}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-xs font-mono mb-1"
                  style={{ color: phase.status === "CLASSIFIED" ? "rgba(139,92,246,0.7)" : phase.status === "ACTIVE" ? "rgba(0,212,255,0.7)" : "rgba(100,116,139,0.6)" }}
                >
                  PHASE {phase.number} — {phase.status}
                </div>
                <div className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {phase.name}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Figures */}
        <div className="mb-12">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5 text-center">KEY PERSONNEL</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {keyFigures.map((fig, i) => (
              <motion.div
                key={fig.name}
                className="p-5 rounded relative overflow-hidden"
                style={{
                  background: "rgba(10,15,40,0.8)",
                  border: "1px solid rgba(220,38,38,0.2)",
                }}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono text-red-400/70 mb-1">{fig.clearance}</div>
                    <h3 className="text-base font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {fig.name}
                    </h3>
                    <div className="text-xs text-slate-500">{fig.role}</div>
                  </div>
                  <div className="text-xs font-mono text-slate-600 border border-slate-800 px-2 py-0.5 rounded">
                    {fig.status}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-3">{fig.belief}</p>
                <div className="border-t border-slate-800 pt-3">
                  <div className="text-xs font-mono text-slate-600 mb-1">RECORDED STATEMENT</div>
                  <p className="text-sm text-red-300/80 italic">"{fig.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Methods */}
        <div className="mb-12">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5 text-center">OPERATIONAL METHODS</div>
          <div
            className="relative p-5 rounded overflow-hidden"
            style={{ background: "rgba(3,7,18,0.9)", border: "1px solid rgba(0,255,150,0.1)", fontFamily: "monospace" }}
          >
            <ScanLines />
            <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projectMethods.map((method, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 text-xs text-green-300/70"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="text-green-600 mt-0.5 shrink-0">&gt;</span>
                  {method}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Classified Logs */}
        <div>
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5 text-center">CLASSIFIED ARCHIVE LOGS</div>
          <div className="space-y-3">
            {classifiedLogs.map((log, i) => {
              const isOpen = openLogs.includes(log.id);
              return (
                <motion.div
                  key={log.id}
                  className="rounded overflow-hidden"
                  style={{
                    border: `1px solid ${isOpen ? "rgba(0,212,255,0.3)" : "rgba(100,116,139,0.2)"}`,
                    background: isOpen ? "rgba(0,10,30,0.9)" : "rgba(10,15,40,0.6)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    className="w-full flex items-center gap-3 p-4 text-left"
                    onClick={() => toggleLog(log.id)}
                    data-testid={`button-log-${log.id}`}
                  >
                    {isOpen ? <Unlock size={14} className="text-cyan-400 shrink-0" /> : <Lock size={14} className="text-slate-600 shrink-0" />}
                    <span className="text-xs font-mono text-slate-500 w-20 shrink-0">{log.number}</span>
                    <span className="text-sm font-mono text-slate-300 flex-1">{log.title}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 border rounded hidden sm:block ${clearanceColors[log.clearance]}`}>
                      {log.clearance}
                    </span>
                    {isOpen ? <ChevronUp size={14} className="text-slate-500 shrink-0" /> : <ChevronDown size={14} className="text-slate-500 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-slate-800/50 pt-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Eye size={12} className="text-cyan-500" />
                            <span className="text-xs text-cyan-500/60 font-mono">DECRYPTING FILE...</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed font-mono">
                            {log.content}
                          </p>
                          {log.redacted && (
                            <div className="mt-3 p-2 rounded text-xs font-mono text-slate-600" style={{ background: "rgba(0,0,0,0.4)" }}>
                              [ADDITIONAL DATA REDACTED — CLEARANCE REQUIRED]
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
