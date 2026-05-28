import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Zap, Star, Shield, Users, Trophy, Radio, Activity, Globe, Crown,
  MessageSquare, Send, CheckCircle, X, ChevronRight, Lock, Unlock,
  Cpu, Eye, Swords, Flame, Bolt, Wind, Sparkles, Atom
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────── */
type ClanIcon = React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;

interface Clan {
  id: string; name: string; color: string; glow: string;
  icon: ClanIcon; members: number; power: number; territory: number;
  tag: string; philosophy: string; rank: number;
}

interface Member {
  handle: string; clan: string; rank: string; xp: number; maxXp: number;
  level: number; status: "online" | "away" | "offline";
  badges: string[]; posts: number; color: string;
}

interface NewsItem {
  id: number; headline: string; time: string; tag: string; tagColor: string; hot: boolean;
}

/* ── Data ───────────────────────────────────────────────── */
const CLANS: Clan[] = [
  { id: "aetherion", name: "Aetherion", color: "#7DF9FF", glow: "rgba(125,249,255,0.4)", icon: Atom,     members: 312, power: 98, territory: 91, tag: "FOUNDATION", philosophy: "Balance through understanding", rank: 1 },
  { id: "solaryn",   name: "Solaryn",   color: "#F59E0B", glow: "rgba(245,158,11,0.4)",  icon: Flame,    members: 287, power: 89, territory: 84, tag: "LIGHT",       philosophy: "Truth lives in light",       rank: 2 },
  { id: "nytheris",  name: "Nytheris",  color: "#EF4444", glow: "rgba(239,68,68,0.4)",   icon: Swords,   members: 241, power: 86, territory: 78, tag: "SHADOW",      philosophy: "Power through darkness",     rank: 3 },
  { id: "chronis",   name: "Chronis",   color: "#14B8A6", glow: "rgba(20,184,166,0.4)",  icon: Zap,      members: 198, power: 83, territory: 72, tag: "TIME",        philosophy: "Every moment is fracture",   rank: 4 },
  { id: "nerathis",  name: "Nerathis",  color: "#A855F7", glow: "rgba(168,85,247,0.4)",  icon: Sparkles, members: 175, power: 79, territory: 68, tag: "MIND",        philosophy: "Thought shapes reality",     rank: 5 },
  { id: "terravon",  name: "Terravon",  color: "#10B981", glow: "rgba(16,185,129,0.4)",  icon: Shield,   members: 154, power: 74, territory: 65, tag: "EARTH",       philosophy: "Roots run deeper than veils",rank: 6 },
  { id: "valekar",   name: "Valekar",   color: "#F97316", glow: "rgba(249,115,22,0.4)",  icon: Bolt,     members: 143, power: 70, territory: 61, tag: "STORM",       philosophy: "Force is its own language",  rank: 7 },
  { id: "severed",   name: "Severed",   color: "#6EE7B7", glow: "rgba(110,231,183,0.4)", icon: Wind,     members: 128, power: 65, territory: 55, tag: "VOID",        philosophy: "Cut from all, free of all",  rank: 8 },
];

const MEMBERS: Member[] = [
  { handle: "VOID_WATCHER",    clan: "Nytheris",  rank: "SHADOW SENTINEL", xp: 8400, maxXp: 10000, level: 42, status: "online",  badges: ["THEORIST","LORE KEEPER","FIRST WAVE"], posts: 847, color: "#EF4444" },
  { handle: "LIORA_ARCHIVE",   clan: "Solaryn",   rank: "LIGHT KEEPER",    xp: 7200, maxXp: 8000,  level: 38, status: "online",  badges: ["VETERAN","BOOK MASTER","ANALYST"],     posts: 634, color: "#F59E0B" },
  { handle: "AETHER_ANALYST",  clan: "Nerathis",  rank: "MIND WEAVER",     xp: 6100, maxXp: 8000,  level: 35, status: "away",    badges: ["THEORIST","CHAPTER 1 OG"],             posts: 512, color: "#A855F7" },
  { handle: "FRACTURE_KEEPER", clan: "Chronis",   rank: "TIME FRACTURE",   xp: 5800, maxXp: 8000,  level: 33, status: "online",  badges: ["TIMELINE MASTER","SPIN-OFF SAGE"],     posts: 445, color: "#14B8A6" },
  { handle: "PROJECT_X",       clan: "Severed",   rank: "VOID WALKER",     xp: 5100, maxXp: 6000,  level: 30, status: "offline", badges: ["ARKAN EXPERT","DARK THEORIST"],        posts: 381, color: "#6EE7B7" },
  { handle: "VEIL_BREAKER",    clan: "Aetherion", rank: "CORE SENTINEL",   xp: 4900, maxXp: 6000,  level: 29, status: "online",  badges: ["BALANCE SEEKER","ARCHIVE DEEP DIVE"],  posts: 356, color: "#7DF9FF" },
];

const NEWS: NewsItem[] = [
  { id: 1, headline: "Book VII final arc confirmed — The Convergence Protocol chapters leaked to inner circle.", time: "2H AGO",  tag: "CLASSIFIED", tagColor: "#EF4444", hot: true },
  { id: 2, headline: "Clan War Season III begins — Aetherion vs Nytheris territorial dispute escalates.", time: "6H AGO",  tag: "CLAN WAR",   tagColor: "#F59E0B", hot: true },
  { id: 3, headline: "New spin-off novella announced: The First Fracture — Origins of the Veil System.", time: "1D AGO",  tag: "RELEASE",    tagColor: "#7DF9FF", hot: false },
  { id: 4, headline: "Archive update: 14 new character relationship threads added to Characters Database.", time: "2D AGO",  tag: "ARCHIVE",    tagColor: "#A855F7", hot: false },
  { id: 5, headline: "Krish Singh confirms Project AETHER timeline correction — key dates shift forward.", time: "3D AGO",  tag: "AUTHOR",     tagColor: "#10B981", hot: false },
  { id: 6, headline: "Community theory: The Null paradox — 847 member votes confirm leading interpretation.", time: "4D AGO",  tag: "COMMUNITY", tagColor: "#14B8A6", hot: false },
];

const FEED_POSTS = [
  { user: "VOID_WATCHER",    clan: "Nytheris",  time: "2 MIN AGO",  color: "#EF4444", msg: "Just re-read Book III. The moment Riven connects to the Void — still the most powerful scene in the entire series. Nothing comes close.", status: "online" as const },
  { user: "LIORA_ARCHIVE",   clan: "Solaryn",   time: "8 MIN AGO",  color: "#F59E0B", msg: "Book IV spoiler: the Celestial Plane revelation recontextualizes every single interaction from Book I. Second read hits completely differently.", status: "online" as const },
  { user: "AETHER_ANALYST",  clan: "Nerathis",  time: "23 MIN AGO", color: "#A855F7", msg: "Theory: Nulls aren't missing Aetherion — they're hiding from it. 'Difficult to detect' has to be intentional design. New thread incoming.", status: "away" as const },
  { user: "FRACTURE_KEEPER", clan: "Chronis",   time: "1H AGO",     color: "#14B8A6", msg: "The Timeline clicks into place when you read spin-offs first. The First Epoch gives the emotional foundation for everything in Book IV.", status: "online" as const },
  { user: "PROJECT_X",       clan: "Severed",   time: "2H AGO",     color: "#6EE7B7", msg: "Arkan genuinely believes he's saving existence. That's what makes him terrifying — he's not wrong that balance is fragile. He's just wrong about the solution.", status: "offline" as const },
];

const RANK_TITLES = ["INITIATE","SEEKER","FRACTURE WALKER","VEIL GUARD","AETHER BOUND","SHADOW SENTINEL","CORE ASCENDANT","CONVERGENCE HERALD","ARCHIVE MASTER","VOID SOVEREIGN"];

/* ── Sub-components ─────────────────────────────────────── */

function HoloCard3D({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

function StatusDot({ status }: { status: "online" | "away" | "offline" }) {
  const colors = { online: "#22C55E", away: "#F59E0B", offline: "#475569" };
  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ background: colors[status], boxShadow: status === "online" ? `0 0 6px ${colors[status]}` : "none" }}
      animate={status === "online" ? { opacity: [1, 0.4, 1], scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
}

function XpBar({ xp, maxXp, color }: { xp: number; maxXp: number; color: string }) {
  const pct = (xp / maxXp) * 100;
  return (
    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 8px ${color}60` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
      <motion.div
        className="absolute inset-y-0 w-8 rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }}
        animate={{ left: ["-10%", "110%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
      />
    </div>
  );
}

/* ── NEWS TICKER ────────────────────────────────────────── */
function NewsTicker() {
  const allText = NEWS.map(n => `[${n.tag}] ${n.headline}`).join("     ◆     ");
  return (
    <div className="overflow-hidden relative" style={{ background: "rgba(5,8,22,0.9)", borderTop: "1px solid rgba(125,249,255,0.1)", borderBottom: "1px solid rgba(125,249,255,0.1)" }}>
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(125,249,255,0.08)", borderRight: "1px solid rgba(125,249,255,0.15)" }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Radio size={10} style={{ color: "#7DF9FF" }} />
          </motion.div>
          <span className="text-[9px] font-mono text-cyan-400 tracking-widest whitespace-nowrap">LIVE FEED</span>
        </div>
        <div className="flex-1 overflow-hidden py-2.5">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-[9px] font-mono text-slate-400 px-8">{allText} &nbsp;&nbsp;&nbsp; {allText}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── CLAN BANNER ────────────────────────────────────────── */
function ClanBanner({ clan, delay = 0 }: { clan: Clan; delay?: number }) {
  const IconComp = clan.icon;
  return (
    <HoloCard3D>
      <motion.div
        className="relative overflow-hidden rounded-lg p-4 cursor-pointer"
        style={{
          background: `linear-gradient(135deg, rgba(5,8,22,0.95) 0%, ${clan.color}08 100%)`,
          border: `1px solid ${clan.color}30`,
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ borderColor: `${clan.color}70`, boxShadow: `0 0 30px ${clan.glow}, 0 0 60px ${clan.glow}40` }}
      >
        {/* Rank badge */}
        <div className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: `${clan.color}18`, color: clan.color, border: `1px solid ${clan.color}30` }}>
          #{clan.rank}
        </div>

        {/* Animated corner accent */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-8"
          style={{ borderTop: `2px solid ${clan.color}60`, borderLeft: `2px solid ${clan.color}60`, borderRadius: "4px 0 0 0" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        />

        <div className="flex items-start gap-3">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${clan.color}15`, border: `1px solid ${clan.color}40` }}
            animate={{ boxShadow: [`0 0 8px ${clan.glow}`, `0 0 20px ${clan.glow}`, `0 0 8px ${clan.glow}`] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
          >
            <IconComp size={18} style={{ color: clan.color }} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold tracking-wider" style={{ color: clan.color, fontFamily: "'Orbitron', sans-serif", fontSize: "0.65rem" }}>
                {clan.name.toUpperCase()}
              </span>
              <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm" style={{ background: `${clan.color}18`, color: `${clan.color}cc` }}>{clan.tag}</span>
            </div>
            <div className="text-[9px] text-slate-500 font-mono mb-2 italic">"{clan.philosophy}"</div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono text-slate-600">POWER</span>
                <span className="text-[8px] font-mono" style={{ color: clan.color }}>{clan.power}</span>
              </div>
              <XpBar xp={clan.power} maxXp={100} color={clan.color} />

              <div className="flex justify-between items-center mt-1.5">
                <span className="text-[8px] font-mono text-slate-600">{clan.members} MEMBERS</span>
                <span className="text-[8px] font-mono text-slate-600">{clan.territory}% TERRITORY</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </HoloCard3D>
  );
}

/* ── MEMBER CARD ────────────────────────────────────────── */
function MemberCard({ member, index }: { member: Member; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <HoloCard3D>
      <motion.div
        className="relative overflow-hidden rounded-lg p-3.5 cursor-pointer"
        style={{ background: "rgba(5,8,22,0.9)", border: `1px solid ${member.color}20` }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08 }}
        onClick={() => setExpanded(!expanded)}
        whileHover={{ borderColor: `${member.color}50`, boxShadow: `0 0 20px ${member.color}20` }}
      >
        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, transparent 0%, ${member.color}06 50%, transparent 100%)`, height: "40%" }}
          animate={{ top: ["-40%", "140%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
        />

        <div className="flex items-center gap-3 relative z-10">
          {/* Avatar */}
          <div className="relative">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: `${member.color}18`, border: `1.5px solid ${member.color}50`, color: member.color, fontFamily: "'Orbitron', sans-serif" }}
              animate={{ boxShadow: [`0 0 6px ${member.color}40`, `0 0 14px ${member.color}60`, `0 0 6px ${member.color}40`] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              {member.handle.slice(0, 2)}
            </motion.div>
            <div className="absolute -bottom-0.5 -right-0.5">
              <StatusDot status={member.status} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.6rem" }}>{member.handle}</span>
              <span className="text-[7px] px-1.5 py-0.5 rounded-sm font-mono" style={{ background: `${member.color}15`, color: member.color }}>LVL {member.level}</span>
            </div>
            <div className="text-[8px] font-mono text-slate-500 mb-1.5">{member.rank} · {member.clan}</div>
            <XpBar xp={member.xp} maxXp={member.maxXp} color={member.color} />
          </div>

          <div className="text-right">
            <div className="text-xs font-mono" style={{ color: member.color }}>{member.posts}</div>
            <div className="text-[7px] font-mono text-slate-600">POSTS</div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {member.badges.map((badge) => (
                    <span key={badge} className="text-[7px] font-mono px-2 py-0.5 rounded-sm" style={{ background: `${member.color}12`, color: `${member.color}cc`, border: `1px solid ${member.color}25` }}>
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[8px] font-mono text-slate-600">XP: {member.xp.toLocaleString()} / {member.maxXp.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </HoloCard3D>
  );
}

/* ── JOIN PROTOCOL ──────────────────────────────────────── */
function JoinProtocol() {
  const [phase, setPhase] = useState<"idle" | "form" | "scanning" | "complete">("idle");
  const [handle, setHandle] = useState("");
  const [selectedClan, setSelectedClan] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [scanLines, setScanLines] = useState<string[]>([]);

  const handleJoin = () => {
    if (!handle.trim() || !selectedClan) return;
    setPhase("scanning");
    const lines = [
      `> VALIDATING DESIGNATION: ${handle.toUpperCase()}`,
      "> SCANNING AETHERION SIGNATURE...",
      `> CLAN AFFILIATION DETECTED: ${selectedClan.toUpperCase()}`,
      "> VEIL FREQUENCY CALIBRATING...",
      "> ARCHIVE ACCESS GRANTED",
      `> GENERATING OPERATIVE ID...`,
      "> PROFILE INITIALIZED",
    ];
    lines.forEach((line, i) => {
      setTimeout(() => {
        setScanLines(prev => [...prev, line]);
        if (i === lines.length - 1) {
          const id = `ARC-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
          setGeneratedId(id);
          setTimeout(() => setPhase("complete"), 600);
        }
      }, i * 350);
    });
  };

  if (phase === "idle") {
    return (
      <motion.div className="text-center py-10">
        <motion.div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: "rgba(192,132,252,0.1)", border: "1px solid rgba(192,132,252,0.3)" }}
          animate={{ boxShadow: ["0 0 20px rgba(192,132,252,0.2)", "0 0 40px rgba(192,132,252,0.4)", "0 0 20px rgba(192,132,252,0.2)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Unlock size={22} style={{ color: "#C084FC" }} />
        </motion.div>
        <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>JOIN THE VEIL NETWORK</div>
        <div className="text-xs text-slate-500 font-mono mb-6">247 OPERATIVES ACTIVE · RECRUITMENT OPEN</div>
        <motion.button
          onClick={() => setPhase("form")}
          className="px-6 py-2.5 rounded font-mono text-xs tracking-widest"
          style={{ background: "rgba(192,132,252,0.12)", border: "1px solid rgba(192,132,252,0.4)", color: "#C084FC" }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(192,132,252,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          INITIATE PROTOCOL
        </motion.button>
      </motion.div>
    );
  }

  if (phase === "form") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div>
          <div className="text-[9px] font-mono text-slate-500 mb-1.5 tracking-wider">&gt; OPERATIVE DESIGNATION</div>
          <input
            type="text"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            placeholder="Choose your archive handle..."
            className="w-full px-3 py-2 text-sm font-mono text-violet-300 placeholder-slate-700 outline-none rounded"
            style={{ background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.2)" }}
            autoFocus
          />
        </div>
        <div>
          <div className="text-[9px] font-mono text-slate-500 mb-2 tracking-wider">&gt; CLAN AFFILIATION</div>
          <div className="grid grid-cols-4 gap-1.5">
            {CLANS.map(clan => {
              const IconComp = clan.icon;
              return (
                <motion.button
                  key={clan.id}
                  onClick={() => setSelectedClan(clan.name)}
                  className="p-2 rounded text-center"
                  style={{
                    background: selectedClan === clan.name ? `${clan.color}18` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${selectedClan === clan.name ? clan.color + "60" : "rgba(255,255,255,0.07)"}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComp size={14} style={{ color: selectedClan === clan.name ? clan.color : "#475569", margin: "0 auto 4px" }} />
                  <div className="text-[7px] font-mono" style={{ color: selectedClan === clan.name ? clan.color : "#475569" }}>{clan.name}</div>
                </motion.button>
              );
            })}
          </div>
        </div>
        <motion.button
          onClick={handleJoin}
          disabled={!handle.trim() || !selectedClan}
          className="w-full py-2.5 text-xs font-mono rounded tracking-widest disabled:opacity-30"
          style={{ background: "rgba(192,132,252,0.15)", border: "1px solid rgba(192,132,252,0.4)", color: "#C084FC" }}
          whileHover={handle.trim() && selectedClan ? { scale: 1.02, boxShadow: "0 0 25px rgba(192,132,252,0.3)" } : {}}
        >
          REQUEST NETWORK ACCESS
        </motion.button>
      </motion.div>
    );
  }

  if (phase === "scanning") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
        <div className="space-y-1.5 mb-4 font-mono text-[10px]">
          {scanLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-cyan-400"
            >
              {line}
              {i === scanLines.length - 1 && (
                <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block ml-1 w-1.5 h-3 bg-cyan-400 align-middle" />
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center">
          <motion.div
            className="w-12 h-12 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(192,132,252,0.3), transparent)", border: "1px solid rgba(192,132,252,0.5)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ background: "rgba(192,132,252,0.2)", border: "1px solid rgba(192,132,252,0.5)", boxShadow: "0 0 40px rgba(192,132,252,0.4)" }}
      >
        <CheckCircle size={28} style={{ color: "#C084FC" }} />
      </motion.div>
      <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>WELCOME, {handle.toUpperCase()}</div>
      <div className="text-xs font-mono text-slate-500 mb-3">CLAN {selectedClan.toUpperCase()} · RANK: INITIATE</div>
      <div className="inline-block px-4 py-2 rounded font-mono text-[10px] tracking-widest" style={{ background: "rgba(192,132,252,0.08)", border: "1px solid rgba(192,132,252,0.25)", color: "#C084FC" }}>
        OPERATIVE ID: {generatedId}
      </div>
    </motion.div>
  );
}

/* ── MAIN PAGE ──────────────────────────────────────────── */
export default function AuthorPage() {
  const [activeSection, setActiveSection] = useState<"overview" | "clans" | "members" | "news" | "join">("overview");
  const [tickerActive, setTickerActive] = useState(true);

  const tabs = [
    { id: "overview" as const,  label: "OVERVIEW",  icon: Eye },
    { id: "clans" as const,     label: "CLANS",     icon: Shield },
    { id: "members" as const,   label: "OPERATIVES",icon: Users },
    { id: "news" as const,      label: "INTEL FEED",icon: Radio },
    { id: "join" as const,      label: "RECRUIT",   icon: Unlock },
  ];

  return (
    <div className="min-h-screen pt-16" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── HERO SECTION ── */}
      <div className="relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(192,132,252,0.12) 0%, transparent 65%)" }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 40% 60% at 80% 50%, rgba(125,249,255,0.06) 0%, transparent 60%)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          />
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "#C084FC" : "#7DF9FF",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.4,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-8">
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.4))" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} />
            <div className="flex items-center gap-2">
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Crown size={10} style={{ color: "#C084FC" }} />
              </motion.div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-violet-400">CREATOR COMMAND HUB</span>
            </div>
            <motion.div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, rgba(192,132,252,0.4), transparent)" }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8 }} />
          </div>

          {/* Author Profile — Krish Singh Commander Card */}
          <motion.div
            className="max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <HoloCard3D>
              <div
                className="relative overflow-hidden rounded-xl p-6"
                style={{
                  background: "linear-gradient(135deg, rgba(5,8,22,0.97) 0%, rgba(192,132,252,0.05) 60%, rgba(125,249,255,0.03) 100%)",
                  border: "1px solid rgba(192,132,252,0.2)",
                  boxShadow: "0 0 60px rgba(192,132,252,0.08)",
                }}
              >
                {/* Animated scan line */}
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(192,132,252,0.6), transparent)" }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* HUD corners */}
                {[["top-0 left-0", "border-t-2 border-l-2"], ["top-0 right-0", "border-t-2 border-r-2"], ["bottom-0 left-0", "border-b-2 border-l-2"], ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, borders], i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${pos} w-4 h-4 ${borders}`}
                    style={{ borderColor: "rgba(192,132,252,0.5)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}

                <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, rgba(192,132,252,0.2), rgba(125,249,255,0.1))", border: "1.5px solid rgba(192,132,252,0.4)", fontFamily: "'Orbitron', sans-serif", color: "#C084FC" }}
                      animate={{ boxShadow: ["0 0 20px rgba(192,132,252,0.3)", "0 0 40px rgba(192,132,252,0.5)", "0 0 20px rgba(192,132,252,0.3)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      KS
                      {/* Inner shimmer */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)" }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                      <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                      <span className="text-[7px] font-mono text-green-400">ACTIVE</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>KRISH SINGH</h1>
                      <span className="text-[8px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(192,132,252,0.15)", color: "#C084FC", border: "1px solid rgba(192,132,252,0.3)" }}>UNIVERSE ARCHITECT</span>
                      <span className="text-[8px] px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,193,7,0.1)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.3)" }}>SOVEREIGN RANK</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mb-3">OPERATIVE ID: ARC-KRSH-∞ · CLAN: ALL · VEIL CLEARANCE: ABSOLUTE</div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Creator of The Aetherion Cycle — a seven-book epic spanning science, magic, consciousness, and the nature of reality. The architect of the Veil System, the Clan Network, and Project AETHER.
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: "BOOKS", value: "7",    color: "#7DF9FF" },
                        { label: "CLANS",  value: "10",   color: "#F59E0B" },
                        { label: "CHARS",  value: "47",   color: "#A855F7" },
                        { label: "PAGES",  value: "3.2K", color: "#10B981" },
                      ].map(stat => (
                        <div key={stat.label} className="text-center p-2 rounded" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <motion.div className="text-lg font-bold" style={{ color: stat.color, fontFamily: "'Orbitron', sans-serif" }}
                            animate={{ textShadow: [`0 0 8px ${stat.color}60`, `0 0 20px ${stat.color}`, `0 0 8px ${stat.color}60`] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >{stat.value}</motion.div>
                          <div className="text-[7px] font-mono text-slate-600 tracking-widest">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* XP / Reputation */}
                  <div className="md:text-right space-y-2 min-w-[120px]">
                    <div className="text-[8px] font-mono text-slate-600 tracking-widest">UNIVERSE XP</div>
                    <div className="text-2xl font-bold" style={{ color: "#C084FC", fontFamily: "'Orbitron', sans-serif" }}>∞</div>
                    <div className="text-[8px] font-mono" style={{ color: "rgba(192,132,252,0.6)" }}>MAX LEVEL</div>
                    <div className="mt-3 space-y-1.5">
                      {[["LORE", 100, "#C084FC"], ["WORLD", 98, "#7DF9FF"], ["CHARS", 96, "#A855F7"]].map(([k, v, c]) => (
                        <div key={k as string}>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-[7px] font-mono text-slate-600">{k}</span>
                            <span className="text-[7px] font-mono" style={{ color: c as string }}>{v}%</span>
                          </div>
                          <XpBar xp={v as number} maxXp={100} color={c as string} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </HoloCard3D>
          </motion.div>
        </div>
      </div>

      {/* ── NEWS TICKER ── */}
      {tickerActive && <NewsTicker />}

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Tab navigation */}
        <div className="flex items-center gap-1 mb-8 overflow-x-auto py-1">
          {tabs.map((tab, i) => {
            const IconComp = tab.icon;
            const active = activeSection === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[10px] font-mono tracking-wider whitespace-nowrap transition-all"
                style={{
                  background: active ? "rgba(192,132,252,0.12)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${active ? "rgba(192,132,252,0.4)" : "rgba(255,255,255,0.06)"}`,
                  color: active ? "#C084FC" : "#475569",
                }}
                whileHover={{ scale: 1.03, color: "#C084FC", borderColor: "rgba(192,132,252,0.3)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <IconComp size={11} />
                {tab.label}
                {active && (
                  <motion.div
                    className="w-1 h-1 rounded-full"
                    style={{ background: "#C084FC" }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ── SECTIONS ── */}
        <AnimatePresence mode="wait">
          {/* OVERVIEW */}
          {activeSection === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Community stats */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="text-[9px] font-mono text-slate-500 tracking-widest mb-3">NETWORK OVERVIEW</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "OPERATIVES", value: "247",  color: "#7DF9FF", icon: Users },
                      { label: "ONLINE NOW", value: "43",   color: "#22C55E", icon: Activity },
                      { label: "CLANS",      value: "10",   color: "#F59E0B", icon: Shield },
                      { label: "THEORIES",   value: "1.2K", color: "#A855F7", icon: Cpu },
                    ].map(stat => {
                      const IconComp = stat.icon;
                      return (
                        <HoloCard3D key={stat.label}>
                          <motion.div
                            className="p-4 rounded-lg text-center"
                            style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}
                            whileHover={{ borderColor: `${stat.color}50`, boxShadow: `0 0 20px ${stat.color}20` }}
                          >
                            <IconComp size={16} style={{ color: stat.color, margin: "0 auto 8px" }} />
                            <motion.div
                              className="text-2xl font-bold mb-1"
                              style={{ color: stat.color, fontFamily: "'Orbitron', sans-serif" }}
                              animate={{ textShadow: [`0 0 8px ${stat.color}`, `0 0 20px ${stat.color}`, `0 0 8px ${stat.color}`] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >{stat.value}</motion.div>
                            <div className="text-[7px] font-mono text-slate-600 tracking-widest">{stat.label}</div>
                          </motion.div>
                        </HoloCard3D>
                      );
                    })}
                  </div>

                  {/* Live feed preview */}
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-widest mb-3">LIVE COMMUNITY FEED</div>
                    <div className="space-y-2">
                      {FEED_POSTS.slice(0, 3).map((post, i) => (
                        <motion.div
                          key={i}
                          className="p-3.5 rounded-lg relative overflow-hidden"
                          style={{ background: "rgba(5,8,22,0.8)", border: `1px solid ${post.color}18` }}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ borderColor: `${post.color}40`, boxShadow: `0 0 20px ${post.color}15` }}
                        >
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[8px] font-bold relative" style={{ background: `${post.color}15`, border: `1px solid ${post.color}40`, color: post.color, fontFamily: "'Orbitron', sans-serif" }}>
                              {post.user.slice(0, 2)}
                              <div className="absolute -bottom-0.5 -right-0.5"><StatusDot status={post.status} /></div>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>{post.user}</span>
                              <span className="text-[8px] font-mono text-slate-600 ml-2">[{post.clan}]</span>
                            </div>
                            <span className="text-[8px] font-mono text-slate-700 ml-auto">{post.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{post.msg}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => setActiveSection("members")}
                      className="mt-3 w-full py-2 rounded text-[9px] font-mono tracking-widest text-slate-500 flex items-center justify-center gap-2"
                      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                      whileHover={{ color: "#C084FC", borderColor: "rgba(192,132,252,0.3)" }}
                    >
                      VIEW ALL OPERATIVES <ChevronRight size={10} />
                    </motion.button>
                  </div>
                </div>

                {/* Right panel — top clans + news */}
                <div className="space-y-4">
                  <div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-widest mb-3">TOP FACTIONS</div>
                    <div className="space-y-2">
                      {CLANS.slice(0, 5).map((clan, i) => {
                        const IconComp = clan.icon;
                        return (
                          <motion.div
                            key={clan.id}
                            className="flex items-center gap-3 p-2.5 rounded-lg"
                            style={{ background: "rgba(5,8,22,0.8)", border: `1px solid ${clan.color}20` }}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ borderColor: `${clan.color}50`, background: `${clan.color}06` }}
                          >
                            <div className="text-[8px] font-mono text-slate-600 w-3">#{clan.rank}</div>
                            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: `${clan.color}15` }}>
                              <IconComp size={12} style={{ color: clan.color }} />
                            </div>
                            <div className="flex-1">
                              <div className="text-[9px] font-mono font-bold" style={{ color: clan.color }}>{clan.name.toUpperCase()}</div>
                              <div className="text-[7px] font-mono text-slate-600">{clan.members} MEMBERS</div>
                            </div>
                            <div className="w-16">
                              <XpBar xp={clan.power} maxXp={100} color={clan.color} />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] font-mono text-slate-500 tracking-widest mb-3">LATEST INTEL</div>
                    <div className="space-y-2">
                      {NEWS.slice(0, 3).map((item, i) => (
                        <motion.div
                          key={item.id}
                          className="p-2.5 rounded-lg relative"
                          style={{ background: "rgba(5,8,22,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ borderColor: `${item.tagColor}30` }}
                        >
                          {item.hot && (
                            <motion.div
                              className="absolute top-1.5 right-1.5 text-[6px] font-mono px-1 py-0.5 rounded"
                              style={{ background: "rgba(239,68,68,0.2)", color: "#EF4444" }}
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >HOT</motion.div>
                          )}
                          <div className="text-[8px] px-1.5 py-0.5 rounded mb-1.5 inline-block font-mono" style={{ background: `${item.tagColor}12`, color: item.tagColor }}>{item.tag}</div>
                          <div className="text-[9px] text-slate-400 leading-relaxed">{item.headline}</div>
                          <div className="text-[7px] font-mono text-slate-700 mt-1">{item.time}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CLANS */}
          {activeSection === "clans" && (
            <motion.div key="clans" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="mb-4">
                <div className="text-[9px] font-mono text-slate-500 tracking-widest">CLAN WAR BOARD — SEASON III</div>
                <div className="text-xs font-mono text-slate-600 mt-1">10 factions. 1 territory. Active conflict in progress.</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {CLANS.map((clan, i) => <ClanBanner key={clan.id} clan={clan} delay={i * 0.06} />)}
              </div>
            </motion.div>
          )}

          {/* MEMBERS */}
          {activeSection === "members" && (
            <motion.div key="members" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-mono text-slate-500 tracking-widest">OPERATIVE ROSTER — {MEMBERS.length} FEATURED</div>
                  <div className="text-xs font-mono text-slate-600 mt-1">Click any operative card to expand their profile.</div>
                </div>
                <div className="flex items-center gap-2 text-[8px] font-mono text-slate-600">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  43 ONLINE
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MEMBERS.map((m, i) => <MemberCard key={m.handle} member={m} index={i} />)}
              </div>

              {/* Rank system */}
              <div className="mt-8 p-4 rounded-xl" style={{ background: "rgba(5,8,22,0.8)", border: "1px solid rgba(192,132,252,0.15)" }}>
                <div className="text-[9px] font-mono text-slate-500 tracking-widest mb-4">RANK PROGRESSION SYSTEM</div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {RANK_TITLES.map((rank, i) => (
                    <div key={rank} className="p-2 rounded text-center" style={{ background: "rgba(192,132,252,0.04)", border: "1px solid rgba(192,132,252,0.1)" }}>
                      <div className="text-[7px] font-mono text-slate-600 mb-1">RANK {i + 1}</div>
                      <div className="text-[8px] font-mono text-violet-400">{rank}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* NEWS */}
          {activeSection === "news" && (
            <motion.div key="news" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[9px] font-mono text-slate-500 tracking-widest">INTEL FEED — LIVE TRANSMISSIONS</div>
                <div className="flex items-center gap-2">
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                    <Radio size={10} style={{ color: "#7DF9FF" }} />
                  </motion.div>
                  <span className="text-[8px] font-mono text-cyan-500">LIVE</span>
                </div>
              </div>

              <div className="space-y-3">
                {NEWS.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="relative overflow-hidden rounded-xl p-5"
                    style={{ background: "rgba(5,8,22,0.9)", border: `1px solid ${item.tagColor}20` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ borderColor: `${item.tagColor}50`, boxShadow: `0 0 25px ${item.tagColor}15` }}
                  >
                    {/* Left accent bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5"
                      style={{ background: item.tagColor }}
                      animate={{ opacity: item.hot ? [0.4, 1, 0.4] : 0.3 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />

                    <div className="flex items-start gap-4 pl-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[8px] font-mono px-2 py-0.5 rounded" style={{ background: `${item.tagColor}15`, color: item.tagColor }}>{item.tag}</span>
                          {item.hot && (
                            <motion.span
                              className="text-[7px] font-mono px-1.5 py-0.5 rounded"
                              style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            >● HOT</motion.span>
                          )}
                          <span className="text-[8px] font-mono text-slate-600 ml-auto">{item.time}</span>
                        </div>
                        <div className="text-sm text-slate-200 leading-relaxed">{item.headline}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Newsletter signup */}
              <motion.div
                className="mt-6 p-5 rounded-xl text-center relative overflow-hidden"
                style={{ background: "rgba(5,8,22,0.9)", border: "1px solid rgba(125,249,255,0.15)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(125,249,255,0.06), transparent)" }}
                />
                <Radio size={18} style={{ color: "#7DF9FF", margin: "0 auto 12px" }} />
                <div className="text-sm font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>AETHER INTELLIGENCE NETWORK</div>
                <div className="text-xs font-mono text-slate-500 mb-4">Get classified updates delivered as they happen.</div>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="your@transmission.com"
                    className="flex-1 px-3 py-2 text-xs font-mono text-cyan-300 placeholder-slate-700 outline-none rounded"
                    style={{ background: "rgba(125,249,255,0.06)", border: "1px solid rgba(125,249,255,0.2)" }}
                  />
                  <motion.button
                    className="px-4 py-2 rounded flex items-center gap-1.5 text-xs font-mono text-cyan-400"
                    style={{ background: "rgba(125,249,255,0.12)", border: "1px solid rgba(125,249,255,0.3)" }}
                    whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(125,249,255,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send size={11} /> LINK
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* JOIN */}
          {activeSection === "join" && (
            <motion.div key="join" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <div className="max-w-2xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-8">
                  <motion.div
                    className="text-3xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                    animate={{ textShadow: ["0 0 20px rgba(192,132,252,0.4)", "0 0 40px rgba(192,132,252,0.7)", "0 0 20px rgba(192,132,252,0.4)"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >VEIL NETWORK</motion.div>
                  <div className="text-xs font-mono text-slate-500">JOIN 247 OPERATIVES ACROSS 10 CLANS</div>
                </div>

                {/* Join card */}
                <div
                  className="rounded-xl p-6 relative overflow-hidden"
                  style={{ background: "rgba(5,8,22,0.95)", border: "1px solid rgba(192,132,252,0.25)", boxShadow: "0 0 60px rgba(192,132,252,0.08)" }}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(192,132,252,0.08), transparent)" }}
                  />
                  <JoinProtocol />
                </div>

                {/* Perks */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { icon: Shield, label: "CLAN AFFILIATION", desc: "Join one of 10 powerful factions", color: "#F59E0B" },
                    { icon: Trophy, label: "RANK SYSTEM",      desc: "10 ranks from Initiate to Sovereign", color: "#7DF9FF" },
                    { icon: Star,   label: "XP & BADGES",      desc: "Earn rewards for lore engagement", color: "#A855F7" },
                    { icon: MessageSquare, label: "COMMUNITY", desc: "Access the Veil Network feed", color: "#10B981" },
                  ].map(perk => {
                    const IconComp = perk.icon;
                    return (
                      <HoloCard3D key={perk.label}>
                        <motion.div
                          className="p-4 rounded-lg"
                          style={{ background: `${perk.color}06`, border: `1px solid ${perk.color}20` }}
                          whileHover={{ borderColor: `${perk.color}50` }}
                        >
                          <IconComp size={18} style={{ color: perk.color, marginBottom: 8 }} />
                          <div className="text-[9px] font-mono font-bold mb-1" style={{ color: perk.color }}>{perk.label}</div>
                          <div className="text-[8px] font-mono text-slate-500">{perk.desc}</div>
                        </motion.div>
                      </HoloCard3D>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
