import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-900/30 mt-24">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), rgba(139,92,246,0.4), transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div
              className="text-lg font-bold text-cyan-400 mb-3 tracking-widest"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              THE AETHERION CYCLE
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Where reality fractures, understanding begins. A seven-book science-fantasy universe by KRISH SINGH.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-mono">Archive Sections</div>
            <div className="grid grid-cols-2 gap-1">
              {[
                ["Books", "/books"],
                ["Characters", "/characters"],
                ["Clans", "/clans"],
                ["Artifacts", "/artifacts"],
                ["Project AETHER", "/project-aether"],
                ["World & Layers", "/world"],
                ["Power System", "/power"],
                ["People Types", "/people"],
                ["Timeline", "/timeline"],
                ["Hidden Archive", "/archive"],
                ["Search", "/search"],
                ["Author", "/author"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-slate-400 text-sm hover:text-cyan-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Classification */}
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-mono">Classification</div>
            <div
              className="inline-block px-3 py-1 text-xs font-mono border border-cyan-900/50 text-cyan-600 rounded mb-3"
              style={{ background: "rgba(0,212,255,0.05)" }}
            >
              AETHERION ARCHIVE v1.0.0
            </div>
            <div className="text-xs text-slate-600 font-mono">ALL DATA CLASSIFIED</div>
            <div className="text-xs text-slate-600 font-mono mt-1">CLEARANCE REQUIRED FOR ACCESS</div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600 font-mono">
            THE AETHERION CYCLE — Created by KRISH SINGH
          </div>
          <div className="text-xs text-slate-700 font-mono">
            AETHER ARCHIVE — UNAUTHORIZED ACCESS PROHIBITED
          </div>
        </div>
      </div>
    </footer>
  );
}
