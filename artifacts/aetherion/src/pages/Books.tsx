import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, X, AlertTriangle, Skull } from "lucide-react";
import { books, Book } from "@/data/booksData";
import SectionHeader from "@/components/SectionHeader";

const dangerColors: Record<string, string> = {
  LOW: "text-green-400 border-green-800",
  MEDIUM: "text-cyan-400 border-cyan-800",
  HIGH: "text-amber-400 border-amber-800",
  CRITICAL: "text-red-400 border-red-800",
  OMEGA: "text-violet-400 border-violet-800",
};

const bookDetails: Record<string, { mainIdea: string; keyEvent: string; hook: string }> = {
  "book-1": {
    mainIdea: "Something is wrong with the world, but no one sees it except Adrian.",
    keyEvent: "Adrian crosses the Veil and discovers the magical world. Liora reveals Aetherion. Project AETHER is introduced.",
    hook: "The Veil is no longer stable.",
  },
  "book-2": {
    mainIdea: "Adrian learns how the system works but realizes it is already unstable.",
    keyEvent: "Full exploration of the clan system. Riven deepens. First real collision between science and magic.",
    hook: "This is no longer about discovery — this is about what happens next.",
  },
  "book-3": {
    mainIdea: "The Void is no longer a concept; it is becoming real and dangerous.",
    keyEvent: "Voidborn emerge. Riven revealed as void-connected. Major collapse proves the system is out of control.",
    hook: "The Void is not just spreading — it is growing.",
  },
  "book-4": {
    mainIdea: "The world was never meant to be like this; everything was once whole.",
    keyEvent: "Adrian and Liora reach the Celestial Plane. The Great Fracture origin is revealed.",
    hook: "If reality was once whole… can it be restored — or will it collapse completely?",
  },
  "book-5": {
    mainIdea: "All sides try to take control, and that makes everything worse.",
    keyEvent: "Project AETHER vs magical world. Arkan Virel rises. Artifacts weaponized across all layers.",
    hook: "War cannot fix the system.",
  },
  "book-6": {
    mainIdea: "Reality is no longer breaking; it is actively collapsing.",
    keyEvent: "Time loops and distorts. Layers merge. Arkan forces convergence. Adrian finds clarity.",
    hook: "They are running out of time to fix it.",
  },
  "book-7": {
    mainIdea: "Reality is collapsing, and the final choice decides how existence continues.",
    keyEvent: "All layers converge. Liora connects to the Core. Adrian chooses balance. Reality evolves.",
    hook: "The story follows Adrian's journey from observation to understanding.",
  },
};

export default function Books() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [filter, setFilter] = useState<"All" | "Core" | "Spin-off">("All");

  const filtered = books.filter((b) => filter === "All" || b.type === filter);
  const coreBooks = books.filter((b) => b.type === "Core");
  const spinoffs = books.filter((b) => b.type === "Spin-off");

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Books Archive"
          subtitle="The complete seven-book core series and spin-off expansions of The Aetherion Cycle."
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
              <div className="text-xs text-cyan-500/60 font-mono tracking-widest mb-6 text-center">CORE SERIES</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(filter === "All" ? coreBooks : filtered).map((book, i) => (
                <motion.div
                  key={book.id}
                  className="p-5 rounded-lg cursor-pointer relative overflow-hidden"
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
                    boxShadow: "0 0 25px rgba(0,212,255,0.12)",
                    scale: 1.02,
                  }}
                  onClick={() => setSelected(book)}
                  data-testid={`card-book-${book.id}`}
                >
                  <div className="text-xs text-slate-600 font-mono mb-1">BOOK {i + 1}</div>
                  <h3
                    className="text-base font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs text-cyan-400/70 italic mb-3">{book.theme}</p>
                  {book.description && (
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">{book.description}</p>
                  )}
                  <div className={`inline-block text-xs px-2 py-0.5 border rounded font-mono ${dangerColors[book.danger]}`}>
                    {book.danger === "OMEGA" ? <Skull size={10} className="inline mr-1" /> : <AlertTriangle size={10} className="inline mr-1" />}
                    {book.danger}
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
              <div className="text-xs text-violet-500/60 font-mono tracking-widest mb-6 text-center">SPIN-OFF ARCHIVE</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {(filter === "All" ? spinoffs : filtered).map((book, i) => (
                <motion.div
                  key={book.id}
                  className="p-5 rounded-lg cursor-pointer"
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
                    boxShadow: "0 0 25px rgba(139,92,246,0.12)",
                    scale: 1.02,
                  }}
                  onClick={() => setSelected(book)}
                  data-testid={`card-book-${book.id}`}
                >
                  <div className="text-xs text-violet-500/60 font-mono mb-1">SPIN-OFF</div>
                  <h3
                    className="text-sm font-bold text-white mb-2 leading-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {book.title}
                  </h3>
                  <p className="text-xs text-violet-400/70 italic mb-3">{book.theme}</p>
                  <div className={`inline-block text-xs px-2 py-0.5 border rounded font-mono ${dangerColors[book.danger]}`}>
                    {book.danger}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(3,7,18,0.92)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-lg p-6 rounded-lg relative"
              style={{
                background: "rgba(10,15,40,0.95)",
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow: "0 0 60px rgba(0,212,255,0.15)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
                onClick={() => setSelected(null)}
                data-testid="button-modal-close"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} className="text-cyan-400" />
                <span className="text-xs font-mono text-slate-500">{selected.type.toUpperCase()}</span>
              </div>
              <h2
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {selected.title}
              </h2>
              <p className="text-cyan-400/80 text-sm italic mb-4">{selected.theme}</p>
              {selected.description && (
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{selected.description}</p>
              )}
              {bookDetails[selected.id] && (
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">MAIN IDEA</div>
                    <p className="text-slate-300 text-sm">{bookDetails[selected.id].mainIdea}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 mb-1">KEY EVENTS</div>
                    <p className="text-slate-300 text-sm">{bookDetails[selected.id].keyEvent}</p>
                  </div>
                  <div className="border-t border-slate-800 pt-3">
                    <div className="text-xs font-mono text-cyan-500/60 mb-1">HOOK</div>
                    <p className="text-cyan-300/80 text-sm italic">"{bookDetails[selected.id].hook}"</p>
                  </div>
                </div>
              )}
              <div className={`mt-4 inline-block text-xs px-2 py-0.5 border rounded font-mono ${dangerColors[selected.danger]}`}>
                DANGER: {selected.danger}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
