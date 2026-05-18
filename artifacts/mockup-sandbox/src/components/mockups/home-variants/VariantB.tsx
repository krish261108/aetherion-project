import { useEffect, useState, useRef } from "react";

const stats = [
  { value: "7", label: "Core Books", color: "#00d4ff" },
  { value: "10", label: "Clans", color: "#8b5cf6" },
  { value: "5", label: "Reality Layers", color: "#10b981" },
  { value: "14", label: "Artifacts", color: "#f59e0b" },
  { value: "5", label: "People Types", color: "#ec4899" },
  { value: "3", label: "Spin-Offs", color: "#6366f1" },
  { value: "1", label: "Final Convergence", color: "#f97316" },
];

const briefingEntries = [
  { code: "ARC-01", label: "CORE CONCEPT", color: "#00d4ff", content: "Aetherion is the force connecting science and magic. Adrian follows its truth from observation to understanding — learning the world cannot be controlled, only balanced." },
  { code: "ARC-02", label: "MAIN THEME", color: "#8b5cf6", content: "Control vs Balance. Every attempt to dominate the system accelerates the collapse it was meant to prevent. True stability requires alignment, not domination." },
  { code: "ARC-03", label: "CONFLICT STRUCTURE", color: "#f59e0b", content: "Control: Victor, Arkan, Project AETHER. Balance: Liora, Aetherion. Understanding: Adrian. Imbalance: Riven, Void, fractured reality." },
  { code: "ARC-04", label: "FINAL TRUTH", color: "#94a3b8", content: "Reality cannot be forced into perfection. Too much order or chaos both lead to destruction. A person is defined by choices, not abilities." },
];

const navTiles = [
  { title: "Books Archive", desc: "Seven core books + spin-offs", color: "#00d4ff", gradient: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(0,100,150,0.08) 100%)", border: "rgba(0,212,255,0.3)" },
  { title: "Characters", desc: "Complete character database", color: "#8b5cf6", gradient: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(80,40,150,0.08) 100%)", border: "rgba(139,92,246,0.3)" },
  { title: "Clan System", desc: "10 clans, 10 philosophies", color: "#f59e0b", gradient: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(120,70,0,0.08) 100%)", border: "rgba(245,158,11,0.3)" },
  { title: "Project AETHER", desc: "Classified science files", color: "#ef4444", gradient: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(120,20,20,0.08) 100%)", border: "rgba(239,68,68,0.3)" },
];

function EnergyField() {
  return (
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-rev { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulse-core { 0%,100% { opacity: 0.7; transform: scale(0.97); } 50% { opacity: 1; transform: scale(1.03); } }
        .ring-1 { animation: spin-slow 18s linear infinite; }
        .ring-2 { animation: spin-rev 12s linear infinite; }
        .ring-3 { animation: spin-slow 30s linear infinite; }
        .pulse-c { animation: pulse-core 4s ease-in-out infinite; }
      `}</style>
      {/* ambient glow */}
      <div style={{ position: "absolute", inset: "15%", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)", filter: "blur(18px)" }} />
      {/* rotating rings */}
      <div className="ring-3" style={{ position: "absolute", inset: "8%", borderRadius: "50%", border: "1px solid rgba(0,212,255,0.12)" }} />
      <div className="ring-1" style={{ position: "absolute", inset: "18%", borderRadius: "50%", border: "1px dashed rgba(139,92,246,0.35)", boxShadow: "0 0 8px rgba(139,92,246,0.2)" }} />
      <div className="ring-2" style={{ position: "absolute", inset: "30%", borderRadius: "50%", border: "1.5px solid rgba(0,212,255,0.5)", boxShadow: "0 0 12px rgba(0,212,255,0.2)" }} />
      {/* core sphere */}
      <div className="pulse-c" style={{
        position: "absolute", inset: "36%",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.8) 30%, rgba(0,212,255,0.6) 60%, rgba(3,7,18,1) 100%)",
        boxShadow: "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(139,92,246,0.3), 0 0 100px rgba(0,212,255,0.15)",
      }} />
      {/* inner ring */}
      <div style={{ position: "absolute", inset: "32%", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", transform: "rotateX(70deg)" }} />
      {/* tick marks */}
      {[0,45,90,135,180,225,270,315].map(deg => {
        const r = (deg * Math.PI) / 180;
        const R = 100, cx = 130, cy = 130;
        return (
          <div key={deg} style={{
            position: "absolute",
            width: 3, height: 3,
            borderRadius: "50%",
            background: "rgba(0,212,255,0.5)",
            top: cy + Math.sin(r) * R * 0.45 - 1.5,
            left: cx + Math.cos(r) * R * 0.45 - 1.5,
          }} />
        );
      })}
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setShown(text.slice(0, ++i));
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);
  return <>{shown}</>;
}

export function VariantB() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 80); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 30% 0%, rgba(139,92,246,0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 100%, rgba(0,212,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(99,102,241,0.05) 0%, transparent 40%), #03070f",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        .orb { font-family: 'Orbitron', sans-serif; }
        .mono { font-family: 'Share Tech Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100vh); } }
        @keyframes flicker { 0%,100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.85; } 94% { opacity: 1; } }
        .fade-1 { animation: fadeUp 0.9s ease forwards 0.1s; opacity: 0; }
        .fade-2 { animation: fadeUp 0.9s ease forwards 0.4s; opacity: 0; }
        .fade-3 { animation: fadeUp 0.9s ease forwards 0.7s; opacity: 0; }
        .fade-4 { animation: fadeUp 0.9s ease forwards 1.0s; opacity: 0; }
        .fade-5 { animation: fadeUp 0.9s ease forwards 1.3s; opacity: 0; }
        .flicker { animation: flicker 8s ease-in-out infinite; }
        .tile-hover { transition: all 0.3s; }
        .tile-hover:hover { transform: translateY(-6px); filter: brightness(1.12); }
        .btn-glow:hover { filter: brightness(1.2); transform: scale(1.04); box-shadow: 0 0 32px rgba(139,92,246,0.5) !important; }
        .btn-glow { transition: all 0.2s; }
        .briefing-row:hover { background: rgba(255,255,255,0.025) !important; }
        .briefing-row { transition: background 0.2s; }
      `}</style>

      {/* Subtle scanline effect */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", opacity: 0.015 }}>
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,212,255,0.5) 2px, rgba(0,212,255,0.5) 3px)", backgroundSize: "100% 4px" }} />
      </div>

      {/* Stars */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 90 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: i % 12 === 0 ? 2.5 : i % 5 === 0 ? 1.5 : 1,
            height: i % 12 === 0 ? 2.5 : i % 5 === 0 ? 1.5 : 1,
            borderRadius: "50%",
            background: i % 12 === 0 ? "rgba(139,92,246,0.9)" : i % 7 === 0 ? "rgba(0,212,255,0.8)" : "rgba(255,255,255,0.55)",
            top: `${(i * 131.7) % 100}%`,
            left: `${(i * 99.1) % 100}%`,
            opacity: 0.15 + (i % 4) * 0.12,
            boxShadow: i % 12 === 0 ? "0 0 4px rgba(139,92,246,0.6)" : "none",
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ─── HERO ─── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "96px 24px 60px" }}>

          <div className="fade-1 mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(139,92,246,0.7)", marginBottom: 40, border: "1px solid rgba(139,92,246,0.2)", borderRadius: 4, padding: "6px 20px", display: "inline-block", background: "rgba(139,92,246,0.05)" }}>
            OFFICIAL UNIVERSE ARCHIVE — CLEARANCE GRANTED
          </div>

          <div className="fade-2" style={{ marginBottom: 40 }}>
            <EnergyField />
          </div>

          {/* Cinematic stacked title */}
          <div className="fade-3" style={{ marginBottom: 24 }}>
            <div className="orb flicker" style={{
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              fontWeight: 400,
              letterSpacing: "0.55em",
              color: "rgba(139,92,246,0.8)",
              marginBottom: 8,
            }}>
              THE
            </div>
            <h1 className="orb" style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 900,
              letterSpacing: "0.04em",
              lineHeight: 0.9,
              background: "linear-gradient(160deg, #ffffff 10%, #a78bfa 50%, #00d4ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0 8px",
              textShadow: "none",
            }}>
              AETHERION
            </h1>
            <div className="orb" style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "0.55em",
              color: "rgba(0,212,255,0.7)",
            }}>
              CYCLE
            </div>
          </div>

          <p className="fade-4" style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
            color: "rgba(167,139,250,0.9)",
            fontStyle: "italic",
            marginBottom: 8,
            letterSpacing: "0.03em",
          }}>
            A broken reality. A hidden system. A war between control and balance.
          </p>
          <p className="fade-4" style={{ fontSize: 13, color: "rgba(148,163,184,0.6)", maxWidth: 500, lineHeight: 1.75, marginBottom: 44 }}>
            A futuristic science-fantasy universe where reality exists in layers, magic and science are two interpretations of the same force, and humanity's attempt to control Aetherion threatens to collapse existence itself.
          </p>

          {/* CTA — violet gradient primary */}
          <div className="fade-5" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn-glow orb" style={{
              padding: "14px 36px",
              background: "linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.25) 100%)",
              border: "1.5px solid rgba(139,92,246,0.65)",
              borderRadius: 6,
              color: "#c4b5fd",
              fontSize: 12,
              letterSpacing: "0.18em",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}>
              ENTER THE ARCHIVE
            </button>
            <button className="mono" style={{
              padding: "13px 24px",
              background: "transparent",
              border: "1px solid rgba(239,68,68,0.4)",
              borderRadius: 6,
              color: "rgba(248,113,113,0.85)",
              fontSize: 12,
              letterSpacing: "0.14em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              PROJECT AETHER FILES
            </button>
            <button className="mono" style={{
              padding: "13px 24px",
              background: "transparent",
              border: "1px solid rgba(0,212,255,0.35)",
              borderRadius: 6,
              color: "rgba(0,212,255,0.8)",
              fontSize: 12,
              letterSpacing: "0.14em",
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              SEVEN VOLUMES
            </button>
          </div>

          <div style={{ marginTop: 56, color: "rgba(139,92,246,0.35)", fontSize: 18 }}>↓</div>
        </section>

        {/* ─── STATS — data readout style ─── */}
        <section style={{ padding: "0 24px 72px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 0,
              border: "1px solid rgba(139,92,246,0.15)",
              borderRadius: 10,
              overflow: "hidden",
              background: "rgba(139,92,246,0.03)",
            }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  textAlign: "center",
                  padding: "22px 12px",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(139,92,246,0.12)" : "none",
                  position: "relative",
                  transition: "background 0.2s",
                }}>
                  <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, background: s.color, opacity: 0.7 }} />
                  <div className="orb" style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 7, lineHeight: 1 }}>{s.value}</div>
                  <div className="mono" style={{ fontSize: 9, color: "rgba(100,116,139,0.7)", letterSpacing: "0.06em", lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INTELLIGENCE BRIEFING ─── */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(139,92,246,0.5)", marginBottom: 10 }}>UNIVERSE OVERVIEW</div>
              <h2 className="orb" style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>Universe Core</h2>
              <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 13 }}>The central philosophy behind The Aetherion Cycle</p>
            </div>

            {/* Intelligence file style */}
            <div style={{
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: 10,
              overflow: "hidden",
              background: "rgba(6,8,24,0.7)",
              backdropFilter: "blur(12px)",
            }}>
              {/* file header */}
              <div className="mono" style={{
                padding: "12px 20px",
                background: "rgba(139,92,246,0.08)",
                borderBottom: "1px solid rgba(139,92,246,0.15)",
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "rgba(139,92,246,0.6)",
                display: "flex",
                justifyContent: "space-between",
              }}>
                <span>AETHERION INTELLIGENCE FILE</span>
                <span>CLASSIFICATION: OMEGA</span>
              </div>
              {briefingEntries.map((entry, i) => (
                <div key={entry.code} className="briefing-row" style={{
                  display: "grid",
                  gridTemplateColumns: "80px 160px 1fr",
                  gap: 0,
                  borderBottom: i < briefingEntries.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  alignItems: "stretch",
                }}>
                  <div className="mono" style={{ padding: "20px 16px", fontSize: 10, color: "rgba(100,116,139,0.5)", borderRight: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center" }}>{entry.code}</div>
                  <div style={{ padding: "20px 16px", borderRight: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 3, height: 18, borderRadius: 2, background: entry.color, flexShrink: 0 }} />
                      <span className="mono" style={{ fontSize: 9, letterSpacing: "0.15em", color: entry.color }}>{entry.label}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                    <p style={{ color: "rgba(203,213,225,0.75)", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{entry.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NAV TILES ─── */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(139,92,246,0.4)", marginBottom: 10 }}>NAVIGATION</div>
              <h2 className="orb" style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Explore the Archive</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {navTiles.map((tile) => (
                <div key={tile.title} className="tile-hover" style={{
                  padding: "28px 20px",
                  borderRadius: 10,
                  background: tile.gradient,
                  border: `1px solid ${tile.border}`,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* corner accent */}
                  <div style={{ position: "absolute", top: 0, right: 0, width: 40, height: 40, background: `radial-gradient(circle at 100% 0%, ${tile.color}22 0%, transparent 70%)` }} />
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: `${tile.color}18`,
                    border: `1px solid ${tile.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: `0 0 12px ${tile.color}22`,
                  }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: `radial-gradient(circle, ${tile.color} 0%, transparent 100%)`, opacity: 0.8 }} />
                  </div>
                  <div className="orb" style={{ fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "0.06em" }}>{tile.title}</div>
                  <div style={{ fontSize: 11, color: "rgba(148,163,184,0.5)" }}>{tile.desc}</div>
                  <div style={{ marginTop: 18, height: 1, background: `linear-gradient(to right, ${tile.color}40, transparent)` }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          padding: "36px 24px",
          borderTop: "1px solid rgba(139,92,246,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 860,
          margin: "0 auto",
        }}>
          <div>
            <div className="orb" style={{ fontSize: 13, color: "rgba(167,139,250,0.8)", marginBottom: 4 }}>THE AETHERION CYCLE</div>
            <div className="mono" style={{ fontSize: 10, color: "rgba(100,116,139,0.4)" }}>BY KRISH SINGH</div>
          </div>
          <div className="mono" style={{ fontSize: 10, color: "rgba(100,116,139,0.3)", letterSpacing: "0.1em" }}>
            OFFICIAL UNIVERSE ARCHIVE
          </div>
        </footer>
      </div>
    </div>
  );
}
