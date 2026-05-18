import { useEffect, useState } from "react";

const stats = [
  { value: "7", label: "Core Books", color: "#00d4ff" },
  { value: "10", label: "Clans", color: "#8b5cf6" },
  { value: "5", label: "Reality Layers", color: "#10b981" },
  { value: "14", label: "Artifacts", color: "#f59e0b" },
  { value: "5", label: "People Types", color: "#ec4899" },
  { value: "3", label: "Spin-Offs", color: "#6366f1" },
  { value: "1", label: "Final Convergence", color: "#f97316" },
];

const coreCards = [
  { label: "CORE CONCEPT", color: "#00d4ff", content: "Aetherion is a force connecting science and magic. Adrian follows its truth from observation to understanding — learning that the world cannot be controlled, only balanced." },
  { label: "MAIN THEME", color: "#8b5cf6", content: "Control vs Balance. Every attempt to dominate the system accelerates the collapse it was meant to prevent. True stability requires alignment, not domination." },
  { label: "CONFLICT STRUCTURE", color: "#f59e0b", content: "Control: Victor, Arkan, Project AETHER. Balance: Liora, Aetherion. Understanding: Adrian. Imbalance: Riven, Void, fractured reality." },
  { label: "FINAL TRUTH", color: "#94a3b8", content: "Reality cannot be forced into perfection. Too much order or too much chaos both lead to destruction. A person is defined by choices, not abilities." },
];

const navTiles = [
  { title: "Books Archive", desc: "Seven core books + spin-offs", color: "#00d4ff", bg: "rgba(0,212,255,0.07)", border: "rgba(0,212,255,0.25)", icon: "📖" },
  { title: "Characters", desc: "Complete character database", color: "#8b5cf6", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.25)", icon: "⚡" },
  { title: "Clan System", desc: "10 clans, 10 philosophies", color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.25)", icon: "🔰" },
  { title: "Project AETHER", desc: "Classified science files", color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.25)", icon: "⚗️" },
];

function StarOrb() {
  return (
    <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto" }}>
      {/* outer glow rings */}
      {[1, 0.7, 0.5, 0.3].map((op, i) => (
        <div key={i} style={{
          position: "absolute", inset: i * 18,
          borderRadius: "50%",
          border: `1px solid rgba(0,212,255,${op * 0.25})`,
          boxShadow: `0 0 ${12 + i * 8}px rgba(0,212,255,${op * 0.15})`,
        }} />
      ))}
      {/* core planet */}
      <div style={{
        position: "absolute", inset: "30%",
        borderRadius: "50%",
        background: "radial-gradient(circle at 38% 38%, rgba(139,92,246,0.9) 0%, rgba(0,212,255,0.6) 45%, rgba(3,7,18,1) 100%)",
        boxShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(139,92,246,0.3), inset 0 0 20px rgba(0,212,255,0.2)",
      }} />
      {/* equatorial ring */}
      <div style={{
        position: "absolute", inset: "22%",
        borderRadius: "50%",
        border: "1.5px solid rgba(0,212,255,0.5)",
        transform: "rotateX(72deg)",
        boxShadow: "0 0 12px rgba(0,212,255,0.3)",
      }} />
    </div>
  );
}

export function VariantA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.05) 0%, transparent 50%), #03070f",
      color: "#fff",
      fontFamily: "'Inter', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        .orb { font-family: 'Orbitron', sans-serif; }
        .mono { font-family: 'Share Tech Mono', monospace; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-ring { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.04); } }
        .fade-up-1 { animation: fadeUp 0.8s ease forwards 0.2s; opacity: 0; }
        .fade-up-2 { animation: fadeUp 0.8s ease forwards 0.5s; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.8s ease forwards 0.8s; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.8s ease forwards 1.1s; opacity: 0; }
        .fade-up-5 { animation: fadeUp 0.8s ease forwards 1.4s; opacity: 0; }
        .stat-card:hover { transform: translateY(-3px); border-color: var(--stat-color) !important; background: rgba(0,212,255,0.08) !important; }
        .stat-card { transition: all 0.2s; }
        .nav-tile:hover { transform: translateY(-4px) scale(1.02); }
        .nav-tile { transition: all 0.25s; }
        .btn-primary { transition: all 0.2s; }
        .btn-primary:hover { transform: scale(1.04); box-shadow: 0 0 28px rgba(0,212,255,0.45); }
        .btn-ghost:hover { transform: scale(1.03); }
        .btn-ghost { transition: all 0.2s; }
      `}</style>

      {/* Starfield dots */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: Math.random() > 0.8 ? 2 : 1,
            height: Math.random() > 0.8 ? 2 : 1,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.6)",
            top: `${(i * 137.5) % 100}%`,
            left: `${(i * 97.3) % 100}%`,
            opacity: 0.2 + (i % 5) * 0.1,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ─── HERO ─── */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "96px 24px 48px" }}>
          <div className="fade-up-1 mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(0,212,255,0.6)", marginBottom: 32 }}>
            OFFICIAL UNIVERSE ARCHIVE — CLEARANCE GRANTED
          </div>

          <div className="fade-up-2" style={{ marginBottom: 32 }}>
            <StarOrb />
          </div>

          {/* Title block with tight layered hierarchy */}
          <div className="fade-up-3" style={{ marginBottom: 20 }}>
            <div style={{
              display: "inline-block",
              borderTop: "1px solid rgba(0,212,255,0.3)",
              borderBottom: "1px solid rgba(0,212,255,0.3)",
              padding: "4px 16px",
              marginBottom: 16,
            }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(0,212,255,0.5)" }}>
                BOOK SERIES — KRISH SINGH
              </span>
            </div>
            <h1 className="orb" style={{
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 900,
              letterSpacing: "0.06em",
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 45%, #8b5cf6 85%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: 0,
            }}>
              THE AETHERION
            </h1>
            <h1 className="orb" style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
              fontWeight: 700,
              letterSpacing: "0.25em",
              color: "rgba(0,212,255,0.85)",
              margin: "4px 0 0",
            }}>
              CYCLE
            </h1>
          </div>

          <p className="fade-up-3" style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "rgba(0,212,255,0.9)",
            fontStyle: "italic",
            marginBottom: 10,
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}>
            A broken reality. A hidden system. A war between control and balance.
          </p>
          <p className="fade-up-4" style={{ fontSize: 14, color: "rgba(148,163,184,0.7)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
            A futuristic science-fantasy universe where reality exists in layers, magic and science are two interpretations of the same force, and humanity's attempt to control Aetherion threatens to collapse existence itself.
          </p>

          {/* CTA group — one primary, two ghost */}
          <div className="fade-up-5" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn-primary orb" style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(0,180,255,0.15) 100%)",
              border: "1.5px solid rgba(0,212,255,0.7)",
              borderRadius: 6,
              color: "#00d4ff",
              fontSize: 12,
              letterSpacing: "0.18em",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(0,212,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}>
              ENTER THE ARCHIVE
            </button>
            <button className="btn-ghost mono" style={{
              padding: "13px 24px",
              background: "transparent",
              border: "1px solid rgba(220,38,38,0.5)",
              borderRadius: 6,
              color: "rgba(239,68,68,0.9)",
              fontSize: 12,
              letterSpacing: "0.15em",
              cursor: "pointer",
            }}>
              PROJECT AETHER FILES
            </button>
            <button className="btn-ghost mono" style={{
              padding: "13px 24px",
              background: "transparent",
              border: "1px solid rgba(139,92,246,0.5)",
              borderRadius: 6,
              color: "rgba(167,139,250,0.9)",
              fontSize: 12,
              letterSpacing: "0.15em",
              cursor: "pointer",
            }}>
              EXPLORE SEVEN BOOKS
            </button>
          </div>

          {/* scroll hint */}
          <div style={{ marginTop: 48, color: "rgba(100,116,139,0.5)", fontSize: 22, animation: "pulse-ring 2s ease-in-out infinite" }}>↓</div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section style={{ padding: "0 24px 64px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* thin rule */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)" }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(0,212,255,0.4)" }}>UNIVERSE METRICS</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(0,212,255,0.3), transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
              {stats.map((s) => (
                <div key={s.label} className="stat-card" style={{
                  textAlign: "center",
                  padding: "18px 8px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  // @ts-ignore
                  "--stat-color": s.color,
                  borderTop: `2px solid ${s.color}`,
                }}>
                  <div className="orb" style={{ fontSize: 26, fontWeight: 800, color: s.color, marginBottom: 6, lineHeight: 1 }}>{s.value}</div>
                  <div className="mono" style={{ fontSize: 9, color: "rgba(100,116,139,0.8)", letterSpacing: "0.08em", lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── UNIVERSE CORE ─── */}
        <section style={{ padding: "20px 24px 80px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,212,255,0.5)", marginBottom: 10 }}>UNIVERSE OVERVIEW</div>
              <h2 className="orb" style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>Universe Core</h2>
              <p style={{ color: "rgba(148,163,184,0.6)", fontSize: 14 }}>The central philosophy behind The Aetherion Cycle</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {coreCards.map((card) => (
                <div key={card.label} style={{
                  padding: "24px 24px 24px 28px",
                  borderRadius: 10,
                  background: "rgba(10,15,40,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: `3px solid ${card.color}`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `inset 0 0 30px rgba(0,0,0,0.2)`,
                }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: "0.25em", color: card.color, marginBottom: 12, opacity: 0.85 }}>{card.label}</div>
                  <p style={{ color: "rgba(203,213,225,0.85)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NAVIGATION TILES ─── */}
        <section style={{ padding: "0 24px 80px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,212,255,0.4)", marginBottom: 10 }}>NAVIGATION</div>
              <h2 className="orb" style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>Explore the Archive</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {navTiles.map((tile) => (
                <div key={tile.title} className="nav-tile" style={{
                  padding: "28px 20px",
                  borderRadius: 10,
                  background: tile.bg,
                  border: `1px solid ${tile.border}`,
                  cursor: "pointer",
                  boxShadow: `0 0 0 rgba(0,0,0,0)`,
                }}>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>{tile.icon}</div>
                  <div className="orb" style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "0.04em" }}>{tile.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(148,163,184,0.6)" }}>{tile.desc}</div>
                  <div style={{ marginTop: 16, fontSize: 11, color: tile.color, letterSpacing: "0.1em" }} className="mono">→ ENTER</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{
          padding: "40px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          <div>
            <div className="orb" style={{ fontSize: 14, color: "rgba(0,212,255,0.8)", marginBottom: 4 }}>THE AETHERION CYCLE</div>
            <div className="mono" style={{ fontSize: 10, color: "rgba(100,116,139,0.5)" }}>BY KRISH SINGH</div>
          </div>
          <div className="mono" style={{ fontSize: 10, color: "rgba(100,116,139,0.4)", letterSpacing: "0.1em" }}>
            OFFICIAL UNIVERSE ARCHIVE
          </div>
        </footer>
      </div>
    </div>
  );
}
