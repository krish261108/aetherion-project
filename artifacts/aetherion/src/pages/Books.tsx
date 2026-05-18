import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, AlertTriangle, Skull, ChevronDown, ChevronUp } from "lucide-react";
import { books, Book } from "@/data/booksData";
import SectionHeader from "@/components/SectionHeader";

const dangerColors: Record<string, string> = {
  LOW: "text-green-400 border-green-800",
  MEDIUM: "text-cyan-400 border-cyan-800",
  HIGH: "text-amber-400 border-amber-800",
  CRITICAL: "text-red-400 border-red-800",
  OMEGA: "text-violet-400 border-violet-800",
};

const dangerGlows: Record<string, string> = {
  LOW: "rgba(74,222,128,0.2)",
  MEDIUM: "rgba(0,212,255,0.2)",
  HIGH: "rgba(245,158,11,0.2)",
  CRITICAL: "rgba(220,38,38,0.2)",
  OMEGA: "rgba(139,92,246,0.25)",
};

export default function Books() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [filter, setFilter] = useState<"All" | "Core" | "Spin-off">("All");
  const [expandedAct, setExpandedAct] = useState<number | null>(null);

  const coreBooks = books.filter((b) => b.type === "Core");
  const spinoffs = books.filter((b) => b.type === "Spin-off");

  const handleOpen = (book: Book) => {
    setSelected(book);
    setExpandedAct(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Books Archive"
          subtitle="The complete seven-book core series and spin-off expansions of The Aetherion Cycle — every synopsis, act breakdown, and story thread."
          accent="SERIES CATALOG"
        />

        {/* Filter */}
        <div className="flex gap-3 justify-center mb-10">
          {(["All", "Core", "Spin-off"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-mono rounded border transition-all ${
                filter === f
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-books-${f.toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Core Books */}
        {(filter === "All" || filter === "Core") && (
          <div className="mb-16">
            {filter === "All" && (
              <div className="text-xs text-cyan-500/60 font-mono tracking-widest mb-6 text-center">CORE SERIES — 7 VOLUMES</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(filter === "All" ? coreBooks : books.filter((b) => b.type === "Core")).map((book, i) => (
                <motion.div
                  key={book.id}
                  className="rounded-xl cursor-pointer relative overflow-hidden group"
                  style={{
                    background: "rgba(10,15,40,0.7)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{
                    borderColor: "rgba(0,212,255,0.4)",
                    boxShadow: `0 0 30px ${dangerGlows[book.danger]}`,
                    scale: 1.02,
                  }}
                  onClick={() => handleOpen(book)}
                  data-testid={`card-book-${book.id}`}
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(10,15,40,0.95) 100%)" }} />
                    <div className="absolute top-3 left-3 text-xs text-cyan-400/60 font-mono">
                      {book.number ? `BOOK ${book.number}` : "CORE"}
                    </div>
                    <div className={`absolute top-3 right-3 inline-block text-xs px-2 py-0.5 border rounded font-mono ${dangerColors[book.danger]}`}
                      style={{ background: "rgba(0,0,0,0.5)" }}>
                      {book.danger === "OMEGA" ? <Skull size={9} className="inline mr-1" /> : <AlertTriangle size={9} className="inline mr-1" />}
                      {book.danger}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3
                      className="text-sm font-bold text-white mb-1.5 leading-tight"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-cyan-400/70 italic mb-2">{book.theme}</p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{book.coreIdea}</p>
                    <div className="mt-3 text-xs text-slate-600 font-mono">Click to read full synopsis</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Spin-offs */}
        {(filter === "All" || filter === "Spin-off") && (
          <div>
            {filter === "All" && (
              <div className="text-xs text-violet-500/60 font-mono tracking-widest mb-6 text-center">SPIN-OFF ARCHIVE — 4 VOLUMES</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(filter === "All" ? spinoffs : books.filter((b) => b.type === "Spin-off")).map((book, i) => (
                <motion.div
                  key={book.id}
                  className="rounded-xl cursor-pointer overflow-hidden group"
                  style={{
                    background: "rgba(15,10,40,0.7)",
                    border: "1px solid rgba(139,92,246,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{
                    borderColor: "rgba(139,92,246,0.4)",
                    boxShadow: "0 0 25px rgba(139,92,246,0.18)",
                    scale: 1.02,
                  }}
                  onClick={() => handleOpen(book)}
                  data-testid={`card-book-${book.id}`}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,10,40,0.3) 0%, rgba(15,10,40,0.97) 100%)" }} />
                    <div className="absolute top-2 left-3 text-xs text-violet-400/60 font-mono">SPIN-OFF</div>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-sm font-bold text-white mb-1.5 leading-tight"
                      style={{ fontFamily: "'Orbitron', sans-serif" }}
                    >
                      {book.title}
                    </h3>
                    <p className="text-xs text-violet-400/70 italic mb-2">{book.theme}</p>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{book.coreIdea}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            style={{ background: "rgba(3,7,18,0.94)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-xl relative overflow-hidden mb-8"
              style={{
                background: "rgba(8,12,35,0.98)",
                border: `1px solid ${selected.type === "Core" ? "rgba(0,212,255,0.3)" : "rgba(139,92,246,0.3)"}`,
                boxShadow: `0 0 80px ${dangerGlows[selected.danger]}`,
              }}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero image */}
              <div className="relative h-52 overflow-hidden">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(8,12,35,1) 100%)" }} />
                <button
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
                  onClick={() => setSelected(null)}
                  data-testid="button-modal-close"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={14} className={selected.type === "Core" ? "text-cyan-400" : "text-violet-400"} />
                    <span className={`text-xs font-mono ${selected.type === "Core" ? "text-cyan-500/70" : "text-violet-500/70"}`}>
                      {selected.number ? `BOOK ${selected.number} — ` : ""}{selected.type.toUpperCase()}
                    </span>
                    <div className={`ml-auto inline-block text-xs px-2 py-0.5 border rounded font-mono ${dangerColors[selected.danger]}`}
                      style={{ background: "rgba(0,0,0,0.5)" }}>
                      {selected.danger === "OMEGA" ? <Skull size={9} className="inline mr-1" /> : <AlertTriangle size={9} className="inline mr-1" />}
                      {selected.danger}
                    </div>
                  </div>
                  <h2
                    className="text-2xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {selected.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Theme + Core Idea */}
                <div>
                  <p className={`text-sm italic mb-2 ${selected.type === "Core" ? "text-cyan-400/80" : "text-violet-400/80"}`}>
                    Theme: {selected.theme}
                  </p>
                  <p className="text-slate-300 text-sm font-medium">{selected.coreIdea}</p>
                </div>

                {/* Full Synopsis */}
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-2 tracking-widest">SYNOPSIS</div>
                  <p className="text-slate-300 text-sm leading-relaxed">{selected.fullSynopsis}</p>
                </div>

                {/* Acts */}
                {selected.acts && selected.acts.length > 0 && (
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-3 tracking-widest">ACT BREAKDOWN</div>
                    <div className="space-y-2">
                      {selected.acts.map((act, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg overflow-hidden"
                          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
                        >
                          <button
                            className="w-full flex items-center justify-between p-3 text-left"
                            onClick={() => setExpandedAct(expandedAct === idx ? null : idx)}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-slate-600">ACT {idx + 1}</span>
                              <span className="text-sm text-slate-200 font-medium">{act.title}</span>
                            </div>
                            {expandedAct === idx ? (
                              <ChevronUp size={14} className="text-slate-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown size={14} className="text-slate-500 flex-shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedAct === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <ul className="px-3 pb-3 space-y-1.5">
                                  {act.events.map((event, ei) => (
                                    <li key={ei} className="flex gap-2 text-xs text-slate-400">
                                      <span className="text-slate-600 flex-shrink-0 mt-0.5">—</span>
                                      <span>{event}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Character Progressions */}
                {selected.characterProgression && selected.characterProgression.length > 0 && (
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-2 tracking-widest">CHARACTER PROGRESSIONS</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.characterProgression.map((cp, i) => (
                        <div key={i} className="text-xs px-3 py-1.5 rounded-full font-mono"
                          style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.15)" }}>
                          <span className="text-cyan-400">{cp.name}</span>
                          <span className="text-slate-500 mx-1">—</span>
                          <span className="text-slate-300">{cp.arc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hook */}
                <div className="rounded-lg p-4" style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                  <div className="text-xs font-mono text-cyan-600 mb-1.5 tracking-widest">HOOK</div>
                  <p className="text-cyan-200/80 text-sm italic">"{selected.hook}"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
