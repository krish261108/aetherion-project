import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, AlertTriangle, FileText, Eye } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const archiveFiles = [
  {
    id: "af-001",
    code: "FILE-7A",
    title: "Anomaly Report: First Veil Fracture",
    clearance: "CLASSIFIED",
    type: "ANOMALY REPORT",
    content: `DATE: [REDACTED]\nLOCATION: Sector 7, Scientific World\nREPORTER: Field Agent [REDACTED]\n\nInitial contact with Veil fracture confirmed at coordinates [REDACTED]. Duration: 4.7 seconds. Visual phenomena: light refraction anomaly, apparent doubling of local geometry.\n\nSubjects in proximity reported: brief audio duplication, time displacement sensation of approximately 0.3 seconds, visual afterimage persisting 12 seconds post-event.\n\nConclusion: The Veil is not as stable as previously assumed. Pattern analysis suggests this is not an isolated event.`,
    color: "cyan",
  },
  {
    id: "af-002",
    code: "FILE-12B",
    title: "Veilbreaker Internal Communication",
    clearance: "TOP SECRET",
    type: "INTERCEPTED TRANSMISSION",
    content: `TRANSMISSION INTERCEPTED — SOURCE: UNKNOWN\nDESTINATION: [REDACTED]\n\n"The outer organization has no idea how far we've gotten. Victor trusts us. The next phase requires infiltration at Level 3 clearance. Do not move until the artifact is secured. The old system cannot be reformed. It must be broken. All of it."\n\n[TRANSMISSION ENDS]\n\nAnalysis: Veilbreaker cell is operating within Project AETHER at senior levels. Identity of sender: unconfirmed. Threat assessment: CRITICAL.`,
    color: "orange",
  },
  {
    id: "af-003",
    code: "FILE-19C",
    title: "Artifact Containment Failure Record",
    clearance: "EYES ONLY",
    type: "INCIDENT REPORT",
    content: `INCIDENT: Containment failure — Artifact designation VOID-SHARD-7\nCASUALTIES: 3 researchers [NAMES REDACTED]\nFACILITY STATUS: Quarantined\n\nThe artifact resisted all synthetic containment protocols. Upon direct contact with Field Array 3, energy output increased by 340% before containment breach. Void energy spread through connected systems within 4.2 seconds.\n\nNote: The artifact appears to respond to emotional states in proximity. Fear amplified output. This contradicts all previous models.\n\nRecommendation: No direct interaction until new containment theory is developed.`,
    color: "red",
  },
  {
    id: "af-004",
    code: "FILE-28D",
    title: "Temporal Observation Log — Loop Event",
    clearance: "OMEGA",
    type: "TEMPORAL ANOMALY",
    content: `OBSERVER: Dr. [REDACTED]\nLOCATION: Temporal Layer Interface, Lab 3\n\n17:32:14 — Temporal field detected. Chronis resonance signature confirmed.\n17:32:41 — Present moment appears to replay. All subjects freeze involuntarily.\n17:33:02 — 48 seconds of experienced time elapsed. Wall clock shows 0 elapsed.\n17:33:02 — Second iteration begins. I am aware I have done this before.\n17:33:49 — Loop breaks. Reality stabilizes.\n\nConclusion: The Temporal Layer is destabilizing. We are no longer just observing the system — we are inside the symptom.`,
    color: "violet",
  },
  {
    id: "af-005",
    code: "FILE-35E",
    title: "Subject Profile — Riven [DESIGNATION: FRACTURE-1]",
    clearance: "OMEGA",
    type: "SUBJECT PROFILE",
    content: `SUBJECT: Riven [FULL NAME REDACTED]\nCLASSIFICATION: Conflux — Nytheris primary, secondary clan [REDACTED]\nAETHERION SIGNATURE: Unstable. Pattern matches theoretical 'fracture-origin' profile.\n\nSubject shows direct resonance with Void energy. Unlike standard Nytheris, subject does not control entropy — subject IS entropy in local field.\n\nBehavioral notes: Unpredictable. Alternates between stability and critical imbalance. Shows awareness of their condition but limited control.\n\nHypothesis: Subject may be a direct result of the original fracture event — not a consequence of imbalance, but a surviving fragment of it.`,
    color: "red",
  },
  {
    id: "af-006",
    code: "FILE-41F",
    title: "Pre-Convergence Warning — Liora Nyxara",
    clearance: "TOP SECRET",
    type: "INTELLIGENCE REPORT",
    content: `SOURCE: Embedded agent, Magical World sector.\n\nLiora Nyxara, Solaryn-aligned, is aware of Project AETHER's Phase 3 operations. She has been monitoring Veil stability independently and her readings appear to be accurate beyond our own instruments.\n\nMost concerning: she is already anticipating Phase 4 before we have announced it internally.\n\nNote from analyst: If she is connected to Aetherion at the depth we suspect, she may not be tracking us. She may be tracking the system itself — and the system is telling her what we are about to do.`,
    color: "amber",
  },
  {
    id: "af-007",
    code: "FILE-FINAL",
    title: "Last Known Entry — Archive Unknown Author",
    clearance: "CLASSIFIED",
    type: "FINAL RECORD",
    content: `I don't know if anyone will read this.\n\nWe tried to control it. We built systems, protocols, containment arrays. We mapped it, measured it, quantified it.\n\nWe were wrong about what it was.\n\nAetherion is not a resource. It is not an energy field. It is the reason anything exists at all.\n\nAnd we tried to put it in a box.\n\nIf you're reading this after everything — after the convergence, after whatever comes next — then something survived. I hope it was the right thing.\n\nI hope it was balance, not control.\n\n[FILE ENDS]`,
    color: "slate",
  },
];

const clearanceColors: Record<string, string> = {
  CLASSIFIED: "text-amber-400 border-amber-800",
  "TOP SECRET": "text-orange-400 border-orange-800",
  "EYES ONLY": "text-red-400 border-red-800",
  OMEGA: "text-violet-400 border-violet-800",
};

const typeColors: Record<string, string> = {
  cyan: "rgba(0,212,255,0.07)",
  orange: "rgba(234,88,12,0.07)",
  red: "rgba(220,38,38,0.07)",
  violet: "rgba(139,92,246,0.07)",
  amber: "rgba(245,158,11,0.07)",
  slate: "rgba(100,116,139,0.07)",
};
const typeBorders: Record<string, string> = {
  cyan: "rgba(0,212,255,0.2)",
  orange: "rgba(234,88,12,0.2)",
  red: "rgba(220,38,38,0.2)",
  violet: "rgba(139,92,246,0.2)",
  amber: "rgba(245,158,11,0.2)",
  slate: "rgba(100,116,139,0.2)",
};

export default function Archive() {
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setUnlocked((prev) => (prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Warning */}
        <motion.div
          className="mb-8 p-3 rounded text-center"
          style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-violet-400">
            <AlertTriangle size={12} />
            AETHER ARCHIVE — RESTRICTED ACCESS — ALL ACCESS IS LOGGED
            <AlertTriangle size={12} />
          </div>
        </motion.div>

        <SectionHeader
          title="Hidden Archives"
          subtitle="Classified records, intercepted transmissions, and restricted files from the Aetherion Cycle universe. Click to unlock."
          accent="CLASSIFIED LOGS"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {archiveFiles.map((file, i) => {
            const open = unlocked.includes(file.id);
            return (
              <motion.div
                key={file.id}
                className="rounded overflow-hidden"
                style={{
                  background: open ? typeColors[file.color] : "rgba(10,15,40,0.7)",
                  border: `1px solid ${open ? typeBorders[file.color] : "rgba(100,116,139,0.15)"}`,
                  transition: "all 0.3s",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  className="w-full p-4 text-left"
                  onClick={() => toggle(file.id)}
                  data-testid={`button-archive-${file.id}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {open ? <Unlock size={14} className="text-cyan-400" /> : <Lock size={14} className="text-slate-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono text-slate-600">{file.code}</span>
                        <span className={`text-xs font-mono px-1.5 py-0.5 border rounded ${clearanceColors[file.clearance]}`}>
                          {file.clearance}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {file.title}
                      </div>
                      <div className="text-xs text-slate-600 font-mono mt-1">{file.type}</div>
                    </div>
                    <div className="mt-1">
                      <FileText size={14} className={open ? "text-cyan-400" : "text-slate-700"} />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-slate-800/50 pt-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Eye size={11} className="text-cyan-500" />
                          <span className="text-xs font-mono text-cyan-500/50">ACCESS GRANTED — READING FILE</span>
                        </div>
                        <pre className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                          {file.content}
                        </pre>
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
  );
}
