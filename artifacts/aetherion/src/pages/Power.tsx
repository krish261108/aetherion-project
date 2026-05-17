import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const rules = [
  { num: 1, rule: "Power requires connection.", explanation: "Without alignment to Aetherion, no ability can be accessed or sustained." },
  { num: 2, rule: "Connection requires compatibility.", explanation: "A person's nature determines which forces they can interface with. Forcing incompatible connections causes fracturing." },
  { num: 3, rule: "Every use has cost.", explanation: "Aetherion drawn through a person leaves a residual imprint. Overuse destabilizes the user and the surrounding field." },
  { num: 4, rule: "Opposing forces create instability.", explanation: "Conflux individuals who carry opposing clan connections exist in constant tension. Imbalance worsens over time without resolution." },
  { num: 5, rule: "Control without balance accelerates collapse.", explanation: "Forcing Aetherion into engineered systems without respect for its natural flow causes fractures that spread." },
  { num: 6, rule: "Artifacts amplify but also destabilize.", explanation: "Artifact energy magnifies a user's connection exponentially — but also magnifies any existing imbalance they carry." },
  { num: 7, rule: "The Void is not evil; it is imbalance and entropy.", explanation: "Void energy is a natural force of ending and return. It only becomes destructive when it dominates without counterbalance." },
  { num: 8, rule: "True stability requires alignment, not domination.", explanation: "The system cannot be forced into order. It must be understood and worked with. Domination causes the very collapse it tries to prevent." },
];

const concepts = [
  {
    title: "Aetherion",
    desc: "The force underlying all reality. Not a resource to be consumed — a living system to be aligned with. Science and magic are two incomplete descriptions of the same thing.",
    color: "rgba(0,212,255,0.15)",
    border: "rgba(0,212,255,0.3)",
    text: "text-cyan-400",
  },
  {
    title: "Science vs Magic",
    desc: "Two interpretations of the same force. Science measures and replicates. Magic aligns and channels. Neither is wrong — both are incomplete without the other.",
    color: "rgba(139,92,246,0.1)",
    border: "rgba(139,92,246,0.25)",
    text: "text-violet-400",
  },
  {
    title: "Connection & Cost",
    desc: "Every interaction with Aetherion is a transaction. Greater connection equals greater power — but greater strain. Unchecked, it tears the user apart from within.",
    color: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
    text: "text-amber-400",
  },
  {
    title: "Clans as Living Forces",
    desc: "Clans are not groups — they are manifestations of fundamental forces. A clan member doesn't just belong to a philosophy; they embody it at the level of Aetherion itself.",
    color: "rgba(0,212,200,0.08)",
    border: "rgba(0,212,200,0.2)",
    text: "text-teal-400",
  },
  {
    title: "Artifacts as Fragments",
    desc: "Each artifact is a shard of the original unified Core. They don't grant power — they transmit it. Using an artifact means interfacing with a fragment of pre-fracture reality.",
    color: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    text: "text-purple-400",
  },
  {
    title: "The Void",
    desc: "Not destruction for its own sake, but entropy — the force of ending that makes room for new beginnings. Nytheris is not evil. Imbalance is. When Void dominates, it is because balance has already failed elsewhere.",
    color: "rgba(220,38,38,0.07)",
    border: "rgba(220,38,38,0.2)",
    text: "text-red-400",
  },
];

export default function Power() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Power System"
          subtitle="Aetherion is not a tool. It is the hidden system behind all reality — and the most dangerous thing any being can try to control."
          accent="AETHERION RULES"
        />

        {/* Core Concepts */}
        <div className="mb-14">
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5">CORE CONCEPTS</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {concepts.map((c, i) => (
              <motion.div
                key={c.title}
                className="p-5 rounded"
                style={{ background: c.color, border: `1px solid ${c.border}`, backdropFilter: "blur(10px)" }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className={`text-sm font-bold mb-2 ${c.text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {c.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Eight Rules */}
        <div>
          <div className="text-xs text-slate-500 font-mono tracking-widest mb-5">THE EIGHT LAWS OF AETHERION</div>
          <div className="space-y-3">
            {rules.map((rule, i) => (
              <motion.div
                key={rule.num}
                className="flex gap-4 p-5 rounded"
                style={{ background: "rgba(10,15,40,0.7)", border: "1px solid rgba(0,212,255,0.1)" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ borderColor: "rgba(0,212,255,0.25)", boxShadow: "0 0 15px rgba(0,212,255,0.07)" }}
              >
                <div
                  className="text-2xl font-bold text-cyan-900 shrink-0 w-8 text-center"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {rule.num}
                </div>
                <div>
                  <div className="text-sm font-bold text-cyan-300 mb-1">{rule.rule}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{rule.explanation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final line */}
        <motion.div
          className="mt-12 text-center p-6 rounded"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-300 text-sm italic leading-relaxed max-w-xl mx-auto">
            "At its heart, the story follows Adrian's journey from observation to understanding — as he
            learns that the world cannot be controlled, only balanced."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
