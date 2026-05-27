import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search as SearchIcon, BookOpen, User, Shield, Gem, Clock, FileText, Users } from "lucide-react";
import { books } from "@/data/booksData";
import { characters } from "@/data/charactersData";
import { clans } from "@/data/clansData";
import { artifacts } from "@/data/artifactsData";
import { timelineEvents } from "@/data/timelineData";
import { peopleTypes } from "@/data/peopleTypesData";
import SectionHeader from "@/components/SectionHeader";

type Category = "All" | "Books" | "Characters" | "Clans" | "Artifacts" | "Timeline" | "People";

interface SearchResult {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  books.forEach((b) =>
    results.push({ id: b.id, category: "Books", title: b.title, subtitle: b.type, description: b.theme })
  );
  characters.forEach((c) =>
    results.push({ id: c.id, category: "Characters", title: c.name, subtitle: `Represents: ${c.represents}`, description: c.description })
  );
  clans.forEach((c) =>
    results.push({ id: c.id, category: "Clans", title: c.name, subtitle: c.element, description: c.philosophy ?? c.strength })
  );
  artifacts.forEach((a) =>
    results.push({ id: a.id, category: "Artifacts", title: a.name, subtitle: a.category, description: a.meaning })
  );
  timelineEvents.forEach((t) =>
    results.push({ id: t.id, category: "Timeline", title: t.title, subtitle: t.bookRef ?? t.era, description: t.description })
  );
  peopleTypes.forEach((p) =>
    results.push({ id: p.id, category: "People", title: p.name, subtitle: p.nature, description: p.definition })
  );

  return results;
}

const ALL_RESULTS = buildIndex();

const categoryIcons: Record<string, React.ElementType> = {
  Books: BookOpen,
  Characters: User,
  Clans: Shield,
  Artifacts: Gem,
  Timeline: Clock,
  People: Users,
};

const categoryColors: Record<string, string> = {
  Books: "text-cyan-400",
  Characters: "text-violet-400",
  Clans: "text-amber-400",
  Artifacts: "text-purple-400",
  Timeline: "text-teal-400",
  People: "text-slate-300",
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Books", "Characters", "Clans", "Artifacts", "Timeline", "People"];

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ALL_RESULTS.filter((r) => {
      const catOk = category === "All" || r.category === category;
      if (!q) return catOk;
      const textOk = r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Archive Search"
          subtitle="Search across all lore entries — books, characters, clans, artifacts, timeline events, and people types."
          accent="GLOBAL SEARCH"
        />

        {/* Search input */}
        <div className="relative mb-6">
          <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the archive..."
            className="w-full pl-10 pr-4 py-3 rounded-lg text-sm font-mono text-slate-200 placeholder-slate-600 outline-none"
            style={{
              background: "rgba(10,15,40,0.8)",
              border: "1px solid rgba(0,212,255,0.2)",
              boxShadow: query ? "0 0 20px rgba(0,212,255,0.08)" : "none",
            }}
            data-testid="input-search"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
                category === cat
                  ? "text-cyan-400 border-cyan-500/60 bg-cyan-950/40"
                  : "text-slate-500 border-slate-800 hover:text-slate-300"
              }`}
              data-testid={`filter-search-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="text-xs text-slate-600 font-mono mb-4">
          {results.length} result{results.length !== 1 ? "s" : ""} found
          {query && ` for "${query}"`}
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-4xl mb-4 opacity-20">⬡</div>
            <div className="text-slate-500 font-mono text-sm">No entries found in the archive.</div>
            <div className="text-slate-700 font-mono text-xs mt-2">Try different search terms or categories.</div>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {results.map((result, i) => {
              const Icon = (categoryIcons[result.category] ?? FileText) as React.ComponentType<{ size?: number; className?: string }>;
              const col = categoryColors[result.category] ?? "text-slate-400";
              return (
                <motion.div
                  key={result.id}
                  className="p-4 rounded flex gap-3 items-start"
                  style={{ background: "rgba(10,15,40,0.7)", border: "1px solid rgba(100,116,139,0.15)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.3) }}
                  whileHover={{ borderColor: "rgba(0,212,255,0.2)" }}
                  data-testid={`result-${result.id}`}
                >
                  <Icon size={14} className={`${col} shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-mono ${col}`}>{result.category}</span>
                      <span className="text-xs text-slate-600">—</span>
                      <span className="text-xs text-slate-600 font-mono truncate">{result.subtitle}</span>
                    </div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {result.title}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{result.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
