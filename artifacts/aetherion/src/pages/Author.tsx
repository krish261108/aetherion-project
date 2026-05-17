import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pen, BookOpen, Globe, MessageSquare, X, Send, Radio, Users, CheckCircle, Zap, Lock, Signal, Activity } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

function NewsletterModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"input" | "transmitting" | "done">("input");
  const [typedText, setTypedText] = useState("");

  const confirmText = "TRANSMISSION RECEIVED. YOU ARE NOW PART OF THE AETHER INTELLIGENCE NETWORK. UPDATES ON THE AETHERION CYCLE WILL BE RELAYED AS EVENTS UNFOLD. STAY AWARE. THE VEIL IS WATCHING.";

  useEffect(() => {
    if (phase !== "done") return;
    let i = 0;
    const t = setInterval(() => {
      setTypedText(confirmText.slice(0, i));
      i++;
      if (i > confirmText.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [phase]);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setPhase("transmitting");
    setTimeout(() => setPhase("done"), 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md relative overflow-hidden rounded-lg"
        style={{ background: "rgba(3,7,18,0.98)", border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 80px rgba(0,212,255,0.12)" }}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scan lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,1) 2px, rgba(0,212,255,1) 4px)" }} />

        {/* Header stripe */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.8), rgba(139,92,246,0.8), transparent)" }} />

        <div className="p-6 relative z-10">
          <button className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors" onClick={onClose}>
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Radio size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-500/70 tracking-widest">AETHER INTELLIGENCE NETWORK</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Universe Newsletter
          </h2>
          <p className="text-xs text-slate-500 font-mono mb-6">
            Receive classified updates as the Aetherion Cycle universe expands.
          </p>

          <AnimatePresence mode="wait">
            {phase === "input" && (
              <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-4">
                  <div className="text-xs font-mono text-slate-500 mb-2">&gt; ENTER TRANSMISSION ADDRESS</div>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      placeholder="your@email.com"
                      className="flex-1 px-3 py-2 text-sm font-mono text-cyan-300 placeholder-slate-700 outline-none rounded"
                      style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
                      autoFocus
                    />
                    <motion.button
                      onClick={handleSubmit}
                      className="px-4 py-2 rounded flex items-center gap-2 text-xs font-mono text-cyan-400"
                      style={{ background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.3)" }}
                      whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,212,255,0.3)" }}
                      whileTap={{ scale: 0.97 }}
                      data-testid="button-newsletter-submit"
                    >
                      <Send size={12} /> Send
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2">
                  {["Book release announcements", "Classified lore drops", "Universe expansion updates", "Project AETHER intelligence reports"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <Zap size={10} className="text-cyan-700" /> {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {phase === "transmitting" && (
              <motion.div key="transmitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center">
                <motion.div
                  className="w-12 h-12 rounded-full mx-auto mb-4"
                  style={{ background: "radial-gradient(circle, rgba(0,212,255,0.3), transparent)", border: "1px solid rgba(0,212,255,0.4)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <div className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse">TRANSMITTING...</div>
              </motion.div>
            )}

            {phase === "done" && (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={16} className="text-cyan-400 shrink-0" />
                  <span className="text-xs font-mono text-cyan-400 tracking-widest">ACCESS CONFIRMED</span>
                </div>
                <div
                  className="p-4 rounded text-xs font-mono leading-relaxed"
                  style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.8)", minHeight: 80 }}
                >
                  {typedText}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block ml-0.5 w-1.5 h-3 bg-cyan-400 align-middle" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const channels = [
  { id: "books", label: "BOOK RELEASE SIGNAL", desc: "Alerts when a new volume of The Aetherion Cycle is released or announced.", freq: "AIN-001", icon: BookOpen, color: "rgba(0,212,255,1)", colorDim: "rgba(0,212,255,0.15)" },
  { id: "archive", label: "ARCHIVE UPDATE FEED", desc: "Notifications when new lore, characters, or world entries are added to this archive.", freq: "AIN-002", icon: Activity, color: "rgba(245,158,11,1)", colorDim: "rgba(245,158,11,0.15)" },
  { id: "world", label: "WORLD EXPANSION BROADCAST", desc: "Updates on spin-offs, visual systems, and new corners of the Aetherion universe.", freq: "AIN-003", icon: Globe, color: "rgba(139,92,246,1)", colorDim: "rgba(139,92,246,0.15)" },
  { id: "author", label: "AUTHOR TRANSMISSION", desc: "Direct messages and notes from Krish Singh on the creation of the universe.", freq: "AIN-004", icon: Pen, color: "rgba(0,212,180,1)", colorDim: "rgba(0,212,180,0.15)" },
];

function FollowUpdatesModal({ onClose }: { onClose: () => void }) {
  const [locked, setLocked] = useState<Set<string>>(new Set());
  const [allLocked, setAllLocked] = useState(false);

  const toggle = (id: string) => {
    setLocked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      if (next.size === channels.length) setAllLocked(true);
      return next;
    });
  };

  const lockAll = () => {
    setLocked(new Set(channels.map((c) => c.id)));
    setAllLocked(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md relative overflow-hidden rounded-lg"
        style={{ background: "rgba(4,8,22,0.99)", border: "1px solid rgba(245,158,11,0.25)", boxShadow: "0 0 80px rgba(245,158,11,0.08)" }}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.8), rgba(0,212,255,0.5), transparent)" }} />

        <div className="p-6 relative z-10">
          <button className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors" onClick={onClose}>
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Signal size={14} className="text-amber-400" />
            <span className="text-xs font-mono text-amber-500/70 tracking-widest">AETHERION SIGNAL NETWORK</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Follow Updates
          </h2>
          <p className="text-xs text-slate-500 font-mono mb-5">
            Lock into the frequencies you want to track. Each channel broadcasts separately.
          </p>

          <div className="space-y-2 mb-4">
            {channels.map((ch) => {
              const isLocked = locked.has(ch.id);
              return (
                <motion.button
                  key={ch.id}
                  onClick={() => toggle(ch.id)}
                  className="w-full text-left p-3 rounded flex items-start gap-3 transition-all"
                  style={{
                    background: isLocked ? ch.colorDim : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isLocked ? ch.color.replace("1)", "0.4)") : "rgba(255,255,255,0.07)"}`,
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`channel-${ch.id}`}
                >
                  <div
                    className="mt-0.5 w-6 h-6 rounded shrink-0 flex items-center justify-center"
                    style={{ background: isLocked ? ch.colorDim : "transparent", border: `1px solid ${isLocked ? ch.color.replace("1)", "0.5)") : "rgba(255,255,255,0.1)"}` }}
                  >
                    {isLocked
                      ? <CheckCircle size={12} style={{ color: ch.color }} />
                      : <ch.icon size={11} className="text-slate-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-mono font-bold" style={{ color: isLocked ? ch.color : "rgba(148,163,184,0.7)" }}>
                        {ch.label}
                      </span>
                      {isLocked && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                          style={{ background: ch.colorDim, color: ch.color }}
                        >
                          LOCKED IN
                        </motion.span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">{ch.freq} &nbsp;·&nbsp; {ch.desc}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {allLocked ? (
              <motion.div
                key="all-locked"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded text-center"
                style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                    <Signal size={12} className="text-amber-400" />
                  </motion.div>
                  <span className="text-xs font-mono text-amber-400 tracking-widest">ALL FREQUENCIES ACTIVE</span>
                </div>
                <div className="text-[10px] text-slate-600 font-mono">Full-spectrum monitoring engaged. The archive will find you.</div>
              </motion.div>
            ) : (
              <motion.button
                key="lock-all"
                onClick={lockAll}
                className="w-full py-2 text-xs font-mono rounded border transition-all"
                style={{ color: "rgba(245,158,11,0.7)", borderColor: "rgba(245,158,11,0.2)", background: "rgba(245,158,11,0.04)" }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(245,158,11,0.15)" }}
                data-testid="button-lock-all-frequencies"
              >
                Lock All Frequencies
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

const communityPosts = [
  { user: "VOID_WATCHER", time: "2 HOURS AGO", clan: "Nytheris", msg: "Just re-read Book III. The moment Riven connects to the Void — I still can't believe how that scene lands. Everything changes there.", clearance: "LEVEL 2" },
  { user: "LIORA_ARCHIVE", time: "5 HOURS AGO", clan: "Solaryn", msg: "Book IV spoiler: the Celestial Plane revelation actually recontextualizes every single interaction from Book I. Second read hits completely differently.", clearance: "LEVEL 3" },
  { user: "AETHER_ANALYST", time: "11 HOURS AGO", clan: "Nerathis", msg: "Theory: Nulls aren't missing Aetherion — they're *hiding* from it. The archive says they're 'difficult to detect.' That has to be intentional.", clearance: "LEVEL 2" },
  { user: "FRACTURE_KEEPER", time: "1 DAY AGO", clan: "Chronis", msg: "The Timeline makes so much more sense when you read the spin-offs first. The First Epoch gives you the emotional foundation for everything in Book IV.", clearance: "LEVEL 1" },
  { user: "PROJECT_X", time: "1 DAY AGO", clan: "Severed", msg: "I think Arkan genuinely believes he's saving existence. That's what makes him terrifying — he's not wrong that balance is fragile. He's just completely wrong about the solution.", clearance: "LEVEL 3" },
];

const clanColors: Record<string, string> = {
  Nytheris: "text-red-400",
  Solaryn: "text-amber-400",
  Nerathis: "text-purple-400",
  Chronis: "text-teal-400",
  Severed: "text-green-400",
};

function CommunityModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"feed" | "join">("feed");
  const [joined, setJoined] = useState(false);
  const [handle, setHandle] = useState("");
  const [selectedClan, setSelectedClan] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleJoin = () => {
    if (!handle || !selectedClan) return;
    setScanning(true);
    setTimeout(() => { setScanning(false); setJoined(true); }, 2200);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(20px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg relative overflow-hidden rounded-lg"
        style={{ background: "rgba(5,8,25,0.99)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 0 80px rgba(139,92,246,0.12)" }}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(0,212,255,0.8), transparent)" }} />

        <div className="p-6 relative z-10">
          <button className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors" onClick={onClose}>
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-violet-400" />
            <span className="text-xs font-mono text-violet-500/70 tracking-widest">AETHERION COMMUNITY — VEIL NETWORK</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            The Veil Network
          </h2>

          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {(["feed", "join"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${activeTab === tab ? "text-violet-400 border-violet-500/60 bg-violet-950/40" : "text-slate-500 border-slate-800 hover:text-slate-300"}`}
              >
                {tab === "feed" ? "Community Feed" : "Join the Network"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "feed" && (
              <motion.div key="feed" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {communityPosts.map((post, i) => (
                    <motion.div
                      key={i}
                      className="p-3 rounded"
                      style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.12)" }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)" }}>
                          <Lock size={8} className="text-violet-400" />
                        </div>
                        <span className="text-xs font-mono text-violet-300">{post.user}</span>
                        <span className={`text-xs font-mono ${clanColors[post.clan] ?? "text-slate-500"}`}>[{post.clan}]</span>
                        <span className="text-xs text-slate-700 ml-auto font-mono">{post.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{post.msg}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 text-center text-xs text-slate-700 font-mono">247 MEMBERS — VEIL NETWORK ACTIVE</div>
              </motion.div>
            )}

            {activeTab === "join" && !joined && !scanning && (
              <motion.div key="join" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1.5">&gt; DESIGNATION (USERNAME)</div>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="Choose your archive handle..."
                      className="w-full px-3 py-2 text-sm font-mono text-violet-300 placeholder-slate-700 outline-none rounded"
                      style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)" }}
                      autoFocus
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1.5">&gt; CLAN AFFILIATION</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["Solaryn", "Nytheris", "Chronis", "Aetherion", "Terravon", "Nerathis", "Valekar", "Severed"].map((clan) => (
                        <button
                          key={clan}
                          onClick={() => setSelectedClan(clan)}
                          className={`px-2 py-1.5 text-xs font-mono rounded border transition-all text-left ${selectedClan === clan ? "text-violet-300 border-violet-500/60 bg-violet-950/50" : "text-slate-500 border-slate-800 hover:text-slate-300"}`}
                        >
                          {selectedClan === clan && <span className="mr-1 text-violet-400">&#10003;</span>}
                          {clan}
                        </button>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    onClick={handleJoin}
                    disabled={!handle || !selectedClan}
                    className="w-full py-2.5 text-xs font-mono rounded tracking-widest transition-all disabled:opacity-30"
                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)", color: "rgba(167,139,250,1)" }}
                    whileHover={handle && selectedClan ? { scale: 1.02, boxShadow: "0 0 25px rgba(139,92,246,0.3)" } : {}}
                    data-testid="button-community-join"
                  >
                    REQUEST VEIL NETWORK ACCESS
                  </motion.button>
                </div>
              </motion.div>
            )}

            {scanning && (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10 text-center">
                <motion.div
                  className="w-14 h-14 rounded-full mx-auto mb-4"
                  style={{ background: "radial-gradient(circle, rgba(139,92,246,0.3), transparent)", border: "1px solid rgba(139,92,246,0.5)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-xs font-mono text-violet-400 tracking-widest">SCANNING AETHERION SIGNATURE...</div>
                <div className="text-xs font-mono text-slate-600 mt-2">VERIFYING CLAN AFFILIATION</div>
              </motion.div>
            )}

            {joined && !scanning && (
              <motion.div key="joined" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.5)", boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                >
                  <CheckCircle size={24} className="text-violet-400" />
                </motion.div>
                <div className="text-sm font-bold text-violet-300 mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  WELCOME, {handle.toUpperCase()}
                </div>
                <div className={`text-xs font-mono mb-3 ${clanColors[selectedClan] ?? "text-slate-400"}`}>
                  [{selectedClan}] AFFILIATION CONFIRMED
                </div>
                <p className="text-xs text-slate-500 font-mono leading-relaxed">
                  You are now part of the Veil Network.<br />
                  The archive sees you. The system remembers.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Author() {
  const [modal, setModal] = useState<null | "newsletter" | "community" | "follow">(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Krish Singh"
          subtitle="Creator of The Aetherion Cycle"
          accent="AUTHOR FILE"
        />

        {/* Author hero */}
        <motion.div
          className="mb-10 p-8 rounded text-center relative overflow-hidden"
          style={{ background: "rgba(10,15,40,0.8)", border: "1px solid rgba(0,212,255,0.2)", boxShadow: "0 0 60px rgba(0,212,255,0.06)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.4), transparent 60%)" }} />
          <div className="relative z-10">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2), rgba(139,92,246,0.1))", border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 30px rgba(0,212,255,0.2)" }}
            >
              <Pen size={28} className="text-cyan-400" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              KRISH SINGH
            </h2>
            <div className="text-cyan-400/70 text-sm font-mono mb-4">Creator — The Aetherion Cycle</div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto">
              Krish Singh is the creator of The Aetherion Cycle, a large-scale science-fantasy universe
              built around fractured realities, Aetherion, ancient forces, Project AETHER, and the
              philosophical conflict between control, destruction, and balance.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { icon: BookOpen, title: "Author Mission", content: "To build a universe that explores the deepest questions of existence — not through fantasy tropes or sci-fi clichés, but through a system that makes the reader think. The Aetherion Cycle is designed to feel like uncovering a truth that was always there.", color: "cyan" },
            { icon: Globe, title: "Universe Vision", content: "A universe that grows across books, spin-offs, visual systems, lore files, and interactive storytelling. Not a standalone story — a living world with enough depth to explore indefinitely.", color: "violet" },
            { icon: Pen, title: "Why Aetherion Exists", content: "The Aetherion Cycle exists because the question 'what if science and magic were the same thing, just misunderstood?' deserved a full universe to explore. Not a short answer — a seven-book journey from confusion to understanding.", color: "gold" },
            { icon: MessageSquare, title: "Future Plans", content: "Seven core books. Three confirmed spin-offs. A visual identity system, an interactive archive, a timeline that expands with each release, and a community that grows with the universe.", color: "teal" },
          ].map((card, i) => {
            const colors: Record<string, { bg: string; border: string; text: string }> = {
              cyan: { bg: "rgba(0,212,255,0.06)", border: "rgba(0,212,255,0.2)", text: "text-cyan-400" },
              violet: { bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.2)", text: "text-violet-400" },
              gold: { bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)", text: "text-amber-400" },
              teal: { bg: "rgba(0,212,200,0.06)", border: "rgba(0,212,200,0.2)", text: "text-teal-400" },
            };
            const col = colors[card.color];
            return (
              <motion.div
                key={card.title}
                className="p-6 rounded"
                style={{ background: col.bg, border: `1px solid ${col.border}` }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <card.icon size={20} className={`${col.text} mb-3`} />
                <h3 className={`text-sm font-bold mb-3 ${col.text}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.content}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Creator note */}
        <motion.div
          className="p-6 rounded text-center"
          style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.15)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-xs font-mono text-slate-600 mb-3">CREATOR NOTE</div>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto italic">
            "This archive is the foundation of a universe designed to grow across books, spin-offs,
            visual systems, lore files, and interactive storytelling."
          </p>
          <div className="mt-4 text-xs text-slate-600 font-mono">— KRISH SINGH</div>
        </motion.div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <motion.a
            href="mailto:singh.krish261108@gmail.com"
            className="px-4 py-2 text-xs font-mono rounded border text-slate-400 border-slate-700 hover:text-cyan-400 hover:border-cyan-900 transition-all cursor-pointer"
            whileHover={{ scale: 1.04 }}
            data-testid="button-author-contact-the-author"
          >
            Contact the Author
          </motion.a>

          <motion.button
            onClick={() => setModal("follow")}
            className="relative px-4 py-2 text-xs font-mono rounded border overflow-hidden transition-all cursor-pointer"
            style={{ color: "rgba(245,158,11,0.8)", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.05)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(245,158,11,0.2)" }}
            data-testid="button-author-follow-updates"
          >
            <motion.span
              className="absolute inset-0 opacity-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.1), transparent)" }}
              animate={{ opacity: [0, 1, 0], x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.8 }}
            />
            Follow Updates
          </motion.button>

          <motion.button
            onClick={() => setModal("newsletter")}
            className="relative px-4 py-2 text-xs font-mono rounded border overflow-hidden transition-all cursor-pointer"
            style={{ color: "rgba(0,212,255,0.8)", borderColor: "rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.05)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
            data-testid="button-author-universe-newsletter"
          >
            <motion.span
              className="absolute inset-0 opacity-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)" }}
              animate={{ opacity: [0, 1, 0], x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            />
            Universe Newsletter
          </motion.button>

          <motion.button
            onClick={() => setModal("community")}
            className="relative px-4 py-2 text-xs font-mono rounded border overflow-hidden transition-all cursor-pointer"
            style={{ color: "rgba(139,92,246,0.8)", borderColor: "rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.07)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(139,92,246,0.25)" }}
            data-testid="button-author-community"
          >
            <motion.span
              className="absolute inset-0 opacity-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.15), transparent)" }}
              animate={{ opacity: [0, 1, 0], x: ["-100%", "100%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
            Community
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {modal === "follow" && <FollowUpdatesModal onClose={() => setModal(null)} />}
        {modal === "newsletter" && <NewsletterModal onClose={() => setModal(null)} />}
        {modal === "community" && <CommunityModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
}
