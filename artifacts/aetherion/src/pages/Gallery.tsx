import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const BASE = import.meta.env.BASE_URL;

const TOTAL = 53;
const images = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  file: `${BASE}gallery/img-${String(i).padStart(3, "0")}.jpg`,
  page: i + 1,
}));

const categories = [
  { label: "All", range: [0, 52] },
  { label: "Universe Overview", range: [0, 6] },
  { label: "Layer Maps", range: [7, 13] },
  { label: "Characters", range: [14, 20] },
  { label: "Clans & Artifacts", range: [21, 28] },
  { label: "Project AETHER", range: [29, 35] },
  { label: "Story Events", range: [36, 43] },
  { label: "Convergence", range: [44, 52] },
];

const chapterTitles = [
  "The Aetherion Cycle — Universe Overview",
  "The Five Layers of Reality",
  "Aetherion: The Connecting Force",
  "The Fracture — Origin Event",
  "Scientific World & Project AETHER",
  "The Veil — Boundary Between Worlds",
  "Control vs Balance — The Central Conflict",
  "Layer I: Scientific World Map",
  "Layer II: Magical World — Clan Territory Atlas",
  "Layer III: Celestial Planes",
  "Layer IV: Forbidden Dimensions",
  "Layer V: Temporal Layer",
  "Cross-Layer Synchronization",
  "Convergence Geography",
  "Adrian — The Protagonist",
  "Liora — The Balance Keeper",
  "Victor — The Controller",
  "Riven — The Imbalance",
  "Arkan — The Enforcer",
  "Secondary Characters",
  "Character Relationship Map",
  "The Ten Clans — Overview",
  "Aetherion & Nytheris Clans",
  "Chronis & Solaryn Clans",
  "Terravon & Aqualis Clans",
  "Voltrix & Pyraxis Clans",
  "Nerathis & Valekar Clans",
  "Artifact Vault — Core Artifacts",
  "Artifact Vault — Primary Artifacts",
  "Project AETHER — Origins",
  "The AETHER Experiments",
  "Breach Events — Timeline",
  "Arkan Directive Files",
  "The Null Research Program",
  "Project AETHER — Full Network",
  "Book I: The Fractured Signal",
  "Book II: The Hidden Layer",
  "Book III: The Collapse Protocol",
  "Book IV: Convergence Rising",
  "Book V: The Arkan War",
  "Book VI: The Final Fracture",
  "Book VII: The Aetherion Cycle",
  "Spin-Offs & Side Stories",
  "Convergence — What It Means",
  "The Three Paths to Convergence",
  "Aligned Convergence vs Forced",
  "The Final Battle — Layer Overlap",
  "After Convergence — A New Layer",
  "The Aetherion Cycle — Legacy",
  "Universe Bible Summary",
  "Author Notes — Krish Singh",
  "The Archive Index",
  "Final Plate — The Completed Cycle",
];

export default function Gallery() {
  const [selectedCat, setSelectedCat] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    selectedCat === 0
      ? images
      : images.filter(
          (img) =>
            img.id >= categories[selectedCat].range[0] &&
            img.id <= categories[selectedCat].range[1]
        );

  const openNext = () => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((img) => img.id === lightbox);
    if (idx < filtered.length - 1) setLightbox(filtered[idx + 1].id);
  };
  const openPrev = () => {
    if (lightbox === null) return;
    const idx = filtered.findIndex((img) => img.id === lightbox);
    if (idx > 0) setLightbox(filtered[idx - 1].id);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Universe Codex"
          subtitle="The complete visual atlas of The Aetherion Cycle — 53 canon illustrations extracted from the official universe document."
          accent="VISUAL ARCHIVE"
        />

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setSelectedCat(i)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                selectedCat === i
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300 hover:border-slate-600"
              }`}
            >
              {cat.label} {i > 0 && <span className="opacity-50">({categories[i].range[1] - categories[i].range[0] + 1})</span>}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                className="group cursor-pointer rounded-lg overflow-hidden relative"
                style={{
                  background: "rgba(10,15,40,0.8)",
                  border: "1px solid rgba(0,212,255,0.1)",
                  aspectRatio: "1684/1191",
                }}
                onClick={() => setLightbox(img.id)}
                whileHover={{ scale: 1.03, borderColor: "rgba(0,212,255,0.4)", boxShadow: "0 0 20px rgba(0,212,255,0.15)" }}
              >
                <img
                  src={img.file}
                  alt={chapterTitles[img.id] || `Universe Illustration ${img.page}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-75"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center"
                  style={{ background: "rgba(3,7,18,0.7)", backdropFilter: "blur(2px)" }}>
                  <ZoomIn size={24} className="text-cyan-400 mb-2" />
                  <span className="text-xs font-mono text-cyan-400/80 text-center px-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                    PLATE {String(img.page).padStart(2, "0")}
                  </span>
                </div>
                {/* Page badge */}
                <div className="absolute top-2 left-2 text-[9px] font-mono text-slate-500 px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(3,7,18,0.85)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {String(img.page).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 text-center">
          <span className="text-xs font-mono text-slate-600">{filtered.length} ILLUSTRATIONS — UNIVERSE ARCHIVE COMPLETE</span>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(3,7,18,0.97)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox image */}
              <div
                className="rounded-lg overflow-hidden relative"
                style={{ border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 60px rgba(0,212,255,0.15)" }}
              >
                <img
                  src={images[lightbox].file}
                  alt={chapterTitles[lightbox]}
                  className="w-full h-auto"
                />
                {/* Title overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: "linear-gradient(to top, rgba(3,7,18,0.95) 0%, transparent 100%)" }}
                >
                  <div className="text-xs font-mono text-cyan-500/60 mb-1">PLATE {String(lightbox + 1).padStart(2, "0")} — THE AETHERION CYCLE</div>
                  <div className="text-base font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {chapterTitles[lightbox]}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={openPrev}
                  disabled={filtered.findIndex(img => img.id === lightbox) === 0}
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono"
                >
                  <ChevronLeft size={16} /> PREV
                </button>
                <span className="text-xs font-mono text-slate-600">
                  {filtered.findIndex(img => img.id === lightbox) + 1} / {filtered.length}
                </span>
                <button
                  onClick={openNext}
                  disabled={filtered.findIndex(img => img.id === lightbox) === filtered.length - 1}
                  className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono"
                >
                  NEXT <ChevronRight size={16} />
                </button>
              </div>

              {/* Close */}
              <button
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                style={{ background: "rgba(3,7,18,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                onClick={() => setLightbox(null)}
              >
                <X size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
