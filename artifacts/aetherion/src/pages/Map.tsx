import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { mapLayers, MapNode, MapLayer } from "@/data/mapData";
import { X, Layers, Radio, AlertTriangle, Info, ChevronRight } from "lucide-react";

const accessColors: Record<string, string> = {
  Public: "#94a3b8",
  Restricted: "#f59e0b",
  Classified: "#f97316",
  High: "#f97316",
  Critical: "#ef4444",
  Catastrophic: "#dc2626",
};
const dangerColors: Record<string, string> = {
  LOW: "#10b981",
  MODERATE: "#f59e0b",
  HIGH: "#f97316",
  EXTREME: "#ef4444",
};

function GridBackground({ color }: { color: string }) {
  return (
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="0.4" opacity="0.25" />
      </pattern>
      <pattern id="grid-big" width="200" height="200" patternUnits="userSpaceOnUse">
        <path d="M 200 0 L 0 0 0 200" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      </pattern>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-strong">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="glow-soft">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.08" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function ScientificMapBg({ color }: { color: string }) {
  return (
    <>
      <rect width="800" height="680" fill="url(#grid)" />
      <rect width="800" height="680" fill="url(#grid-big)" />
      <rect width="800" height="680" fill="url(#center-glow)" />
      {[120, 280, 440, 580].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="800" y2={y} stroke={color} strokeWidth="0.3" opacity="0.15" />
      ))}
      {[160, 320, 480, 640].map((x, i) => (
        <line key={i} x1={x} y1="0" x2={x} y2="680" stroke={color} strokeWidth="0.3" opacity="0.15" />
      ))}
      <text x="12" y="670" fill={color} opacity="0.25" fontSize="8" fontFamily="'Share Tech Mono', monospace">LAYER-01 // SURFACE WORLD // SECURITY GRID ACTIVE</text>
      <text x="600" y="670" fill={color} opacity="0.25" fontSize="8" fontFamily="'Share Tech Mono', monospace">PROJECT AETHER</text>
    </>
  );
}

function MagicalMapBg({ color }: { color: string }) {
  const cx = 400, cy = 360;
  const rings = [80, 160, 230, 300, 360];
  return (
    <>
      <rect width="800" height="740" fill="url(#center-glow)" />
      {rings.map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={i === 2 ? 0.8 : 0.4} opacity={0.15 + i * 0.03} strokeDasharray={i % 2 === 0 ? "none" : "4 8"} />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return <line key={i} x1={cx} y1={cy} x2={cx + 360 * Math.cos(angle)} y2={cy + 360 * Math.sin(angle)} stroke={color} strokeWidth="0.3" opacity="0.1" />;
      })}
      <text x="12" y="730" fill={color} opacity="0.25" fontSize="8" fontFamily="'Share Tech Mono', monospace">LAYER-02 // MAGICAL WORLD // AETHERION PRIME ATLAS</text>
    </>
  );
}

function CelestialMapBg({ color }: { color: string }) {
  const cx = 400, cy = 350;
  return (
    <>
      <radialGradient id="celestial-bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} stopOpacity="0.06" />
        <stop offset="60%" stopColor="#a855f7" stopOpacity="0.03" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <rect width="800" height="680" fill="url(#celestial-bg)" />
      {[60, 130, 210, 300, 380].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={i === 2 ? 1 : 0.5} opacity={0.3 - i * 0.04} strokeDasharray={i === 1 || i === 3 ? "3 6" : "none"} />
      ))}
      <line x1={cx} y1="30" x2={cx} y2="650" stroke={color} strokeWidth="0.8" opacity="0.2" strokeDasharray="5 8" />
      <text x="12" y="670" fill={color} opacity="0.25" fontSize="8" fontFamily="'Share Tech Mono', monospace">LAYER-03 // CELESTIAL PLANES // ORIGIN LAYER // SACRED</text>
    </>
  );
}

function ForbiddenMapBg({ color }: { color: string }) {
  const cracks = [
    "M 150 100 L 280 230 L 220 310 L 350 400",
    "M 600 150 L 480 260 L 540 350 L 420 450",
    "M 100 400 L 230 480 L 180 560",
    "M 650 400 L 550 500 L 620 580",
    "M 300 100 L 380 200",
  ];
  return (
    <>
      <rect width="800" height="680" fill="url(#center-glow)" />
      {cracks.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
      ))}
      {[200, 350, 500].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="800" y2={y + (i % 2 === 0 ? 20 : -15)} stroke={color} strokeWidth="0.3" opacity="0.08" strokeDasharray="20 40" />
      ))}
      <text x="12" y="670" fill={color} opacity="0.3" fontSize="8" fontFamily="'Share Tech Mono', monospace">LAYER-04 // FORBIDDEN // UNSTABLE // ENTER AT OWN RISK</text>
      <text x="500" y="670" fill="#ef4444" opacity="0.4" fontSize="8" fontFamily="'Share Tech Mono', monospace">WARNING: VOID ACTIVE</text>
    </>
  );
}

function TemporalMapBg({ color }: { color: string }) {
  const cx = 400, cy = 350;
  return (
    <>
      <rect width="800" height="680" fill="url(#center-glow)" />
      {[80, 160, 240, 310].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.5} opacity={0.2} strokeDasharray={i % 2 === 0 ? "none" : "6 10"} />
      ))}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180;
        return <line key={i} x1={cx} y1={cy} x2={cx + 320 * Math.cos(a)} y2={cy + 320 * Math.sin(a)} stroke={color} strokeWidth="0.4" opacity="0.12" />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const r = 160;
        return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r="2.5" fill={color} opacity="0.2" />;
      })}
      <text x="12" y="670" fill={color} opacity="0.25" fontSize="8" fontFamily="'Share Tech Mono', monospace">LAYER-05 // TEMPORAL LAYER // CAUSALITY ENGINE // CHRONIS</text>
    </>
  );
}

function ConnectionLines({ nodes, active }: { nodes: MapNode[]; active: string | null }) {
  const drawn = new Set<string>();
  return (
    <>
      {nodes.flatMap((node) =>
        node.connections.map((targetId) => {
          const key = [node.id, targetId].sort().join("-");
          if (drawn.has(key)) return null;
          drawn.add(key);
          const target = nodes.find((n) => n.id === targetId);
          if (!target) return null;
          const isHighlit = active === node.id || active === targetId;
          return (
            <line
              key={key}
              x1={node.x} y1={node.y}
              x2={target.x} y2={target.y}
              stroke={isHighlit ? node.color : "rgba(148,163,184,0.15)"}
              strokeWidth={isHighlit ? 1.5 : 0.6}
              strokeDasharray={isHighlit ? "none" : "4 8"}
              opacity={isHighlit ? 0.7 : 1}
            />
          );
        })
      )}
    </>
  );
}

function NodeMarker({
  node,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  node: MapNode;
  selected: boolean;
  hovered: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const pulse = selected || hovered;
  const size = node.type === "portal" || node.id === "nexus" || node.id === "origin-axis" ? 10 : 7;

  return (
    <g
      className="cursor-pointer"
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* outer pulse ring */}
      {pulse && (
        <circle cx={node.x} cy={node.y} r={size + 12} fill="none" stroke={node.color} strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values={`${size + 8};${size + 18};${size + 8}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      {/* static glow ring */}
      <circle cx={node.x} cy={node.y} r={size + 5} fill="none" stroke={node.color} strokeWidth="0.6" opacity="0.25">
        <animate attributeName="opacity" values="0.1;0.35;0.1" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
      </circle>
      {/* main dot */}
      <circle
        cx={node.x} cy={node.y} r={size}
        fill={pulse ? node.color : `${node.color}33`}
        stroke={node.color}
        strokeWidth={pulse ? 2 : 1}
        opacity={pulse ? 1 : 0.8}
        filter={pulse ? "url(#glow)" : undefined}
      />
      {/* center dot */}
      <circle cx={node.x} cy={node.y} r={3} fill={node.color} opacity={0.9} />
      {/* label */}
      <text
        x={node.x}
        y={node.y + size + 16}
        textAnchor="middle"
        fill={pulse ? node.color : "rgba(226,232,240,0.7)"}
        fontSize={pulse ? "10" : "9"}
        fontFamily="'Share Tech Mono', monospace"
        fontWeight={pulse ? "bold" : "normal"}
        filter={pulse ? "url(#glow-soft)" : undefined}
      >
        {node.name.toUpperCase()}
      </text>
    </g>
  );
}

function SvgMap({
  layer,
  selectedNode,
  onSelectNode,
}: {
  layer: MapLayer;
  selectedNode: MapNode | null;
  onSelectNode: (n: MapNode | null) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const h = layer.bgStyle === "circular" ? 740 : 680;

  return (
    <svg
      viewBox={`0 0 800 ${h}`}
      width="100%"
      height="100%"
      style={{ overflow: "visible" }}
    >
      <GridBackground color={layer.primaryColor} />

      {layer.bgStyle === "grid" && <ScientificMapBg color={layer.primaryColor} />}
      {layer.bgStyle === "circular" && <MagicalMapBg color={layer.primaryColor} />}
      {layer.bgStyle === "rings" && <CelestialMapBg color={layer.primaryColor} />}
      {layer.bgStyle === "broken" && <ForbiddenMapBg color={layer.primaryColor} />}
      {layer.bgStyle === "clock" && <TemporalMapBg color={layer.primaryColor} />}

      <ConnectionLines nodes={layer.nodes} active={selectedNode?.id ?? hovered} />

      {layer.nodes.map((node) => (
        <NodeMarker
          key={node.id}
          node={node}
          selected={selectedNode?.id === node.id}
          hovered={hovered === node.id}
          onSelect={() => onSelectNode(selectedNode?.id === node.id ? null : node)}
          onHover={(v) => setHovered(v ? node.id : null)}
        />
      ))}
    </svg>
  );
}

export default function Map() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [is3D, setIs3D] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [is3D ? 22 : 0, is3D ? 8 : 0]), { stiffness: 100, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [is3D ? -8 : 0, is3D ? 8 : 0]), { stiffness: 100, damping: 25 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const layer = mapLayers[activeLayer];

  return (
    <div className="min-h-screen pt-20 pb-10 relative z-10 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: layer.primaryColor, boxShadow: `0 0 8px ${layer.primaryColor}` }} />
              <span className="text-xs font-mono tracking-widest" style={{ color: layer.primaryColor, fontFamily: "'Share Tech Mono', monospace" }}>
                AETHERION ATLAS // INTERACTIVE LAYER MAP
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              Reality Layer System
            </h1>
            <p className="text-sm text-slate-400 max-w-xl">{layer.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIs3D(!is3D)}
              className="px-3 py-1.5 text-xs font-mono rounded border transition-all"
              style={{
                borderColor: is3D ? layer.primaryColor : "rgba(148,163,184,0.3)",
                color: is3D ? layer.primaryColor : "#94a3b8",
                background: is3D ? `${layer.primaryColor}15` : "transparent",
              }}
            >
              3D HOLOGRAM {is3D ? "ON" : "OFF"}
            </button>
          </div>
        </div>
      </div>

      {/* Layer selector */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {mapLayers.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { setActiveLayer(i); setSelectedNode(null); }}
              className="flex-shrink-0 px-4 py-2.5 rounded text-xs font-mono transition-all border whitespace-nowrap"
              style={{
                background: activeLayer === i ? `${l.primaryColor}20` : "rgba(10,15,40,0.6)",
                borderColor: activeLayer === i ? l.primaryColor : "rgba(255,255,255,0.08)",
                color: activeLayer === i ? l.primaryColor : "#64748b",
                boxShadow: activeLayer === i ? `0 0 20px ${l.primaryColor}25` : "none",
              }}
            >
              <span className="opacity-50 mr-2">0{l.number}</span>
              {l.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main map + panel layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-4 items-start">
          {/* Map container */}
          <div className="flex-1 min-w-0">
            {/* Map frame */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                perspective: "1400px",
                perspectiveOrigin: "50% 35%",
              }}
            >
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 z-20 pointer-events-none rounded-xl"
                style={{
                  background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
                  mixBlendMode: "overlay",
                }}
              />
              {/* Top scan bar animation */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${layer.primaryColor}, transparent)`, opacity: 0.4 }}
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              {/* Corner decorations */}
              {[
                { top: 0, left: 0, borderTop: `2px solid ${layer.primaryColor}`, borderLeft: `2px solid ${layer.primaryColor}`, borderRadius: "12px 0 0 0" },
                { top: 0, right: 0, borderTop: `2px solid ${layer.primaryColor}`, borderRight: `2px solid ${layer.primaryColor}`, borderRadius: "0 12px 0 0" },
                { bottom: 0, left: 0, borderBottom: `2px solid ${layer.primaryColor}`, borderLeft: `2px solid ${layer.primaryColor}`, borderRadius: "0 0 0 12px" },
                { bottom: 0, right: 0, borderBottom: `2px solid ${layer.primaryColor}`, borderRight: `2px solid ${layer.primaryColor}`, borderRadius: "0 0 12px 0" },
              ].map((style, i) => (
                <div key={i} className="absolute z-30 pointer-events-none" style={{ ...style, width: 24, height: 24 }} />
              ))}

              {/* 3D Map */}
              <motion.div
                ref={mapRef}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  background: `radial-gradient(ellipse at 50% 40%, ${layer.primaryColor}08 0%, rgba(3,7,18,0.97) 70%)`,
                  border: `1px solid ${layer.primaryColor}25`,
                  borderRadius: "12px",
                  minHeight: "480px",
                  padding: "8px",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <SvgMap
                  layer={layer}
                  selectedNode={selectedNode}
                  onSelectNode={setSelectedNode}
                />
              </motion.div>
            </div>

            {/* Bottom HUD bar */}
            <div className="mt-3 flex items-center justify-between px-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: layer.primaryColor }} />
                  <span className="text-xs font-mono text-slate-500">LAYER {layer.number} ACTIVE</span>
                </div>
                <span className="text-xs font-mono text-slate-600">{layer.nodes.length} LOCATIONS</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-slate-600">CLICK NODE FOR INFO</span>
                <div className="flex items-center gap-1.5">
                  <Radio size={10} className="text-cyan-500 animate-pulse" />
                  <span className="text-xs font-mono text-cyan-600/60">AETHER SIGNAL ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                className="w-80 flex-shrink-0 rounded-xl overflow-hidden"
                style={{
                  background: "rgba(6,9,26,0.97)",
                  border: `1px solid ${selectedNode.glowColor}`,
                  boxShadow: `0 0 30px ${selectedNode.glowColor.replace("0.", "0.1")}`,
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.25 }}
              >
                {/* Panel header */}
                <div className="p-4 border-b" style={{ borderColor: `${selectedNode.color}20` }}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: selectedNode.color, fontFamily: "'Share Tech Mono', monospace" }}>
                        LOCATION DATA — LAYER {layer.number}
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {selectedNode.name}
                      </h3>
                    </div>
                    <button onClick={() => setSelectedNode(null)} className="text-slate-500 hover:text-slate-300 flex-shrink-0 mt-1">
                      <X size={14} />
                    </button>
                  </div>
                  {/* Type + danger row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-mono uppercase"
                      style={{ background: `${selectedNode.color}20`, color: selectedNode.color, border: `1px solid ${selectedNode.color}40` }}
                    >
                      {selectedNode.type}
                    </span>
                    {selectedNode.danger && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono flex items-center gap-1"
                        style={{ background: `${dangerColors[selectedNode.danger]}20`, color: dangerColors[selectedNode.danger], border: `1px solid ${dangerColors[selectedNode.danger]}40` }}>
                        <AlertTriangle size={9} />
                        {selectedNode.danger}
                      </span>
                    )}
                    {selectedNode.access && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ color: accessColors[selectedNode.access] ?? "#94a3b8", opacity: 0.8, border: "1px solid rgba(255,255,255,0.08)" }}>
                        {selectedNode.access.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Panel body */}
                <div className="p-4 space-y-4">
                  <p className="text-xs text-slate-400 leading-relaxed">{selectedNode.detail}</p>

                  {selectedNode.artifact && (
                    <div className="rounded p-3" style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
                      <div className="text-xs font-mono text-amber-400/70 mb-1">LINKED ARTIFACT</div>
                      <div className="text-xs text-amber-300/80">{selectedNode.artifact}</div>
                    </div>
                  )}

                  {selectedNode.bookRef && (
                    <div className="flex items-center gap-2">
                      <Info size={10} className="text-slate-500 flex-shrink-0" />
                      <span className="text-xs font-mono text-slate-500">APPEARS IN: <span className="text-slate-400">{selectedNode.bookRef}</span></span>
                    </div>
                  )}

                  {/* Connections */}
                  {selectedNode.connections.length > 0 && (
                    <div>
                      <div className="text-xs font-mono text-slate-600 mb-2">CONNECTED LOCATIONS</div>
                      <div className="space-y-1">
                        {selectedNode.connections.map((connId) => {
                          const conn = layer.nodes.find((n) => n.id === connId);
                          if (!conn) return null;
                          return (
                            <button
                              key={connId}
                              onClick={() => setSelectedNode(conn)}
                              className="w-full flex items-center justify-between px-3 py-1.5 rounded text-xs transition-all hover:bg-white/5"
                              style={{ border: `1px solid ${conn.color}20` }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: conn.color }} />
                                <span className="font-mono text-slate-400">{conn.name}</span>
                              </div>
                              <ChevronRight size={10} className="text-slate-600" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="instructions"
                className="w-80 flex-shrink-0 rounded-xl p-5"
                style={{ background: "rgba(6,9,26,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-xs font-mono mb-3" style={{ color: layer.primaryColor, fontFamily: "'Share Tech Mono', monospace" }}>
                  ATLAS NAVIGATION
                </div>
                <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {layer.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{layer.subtitle}</p>
                <div className="space-y-2">
                  {layer.nodes.slice(0, 6).map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs transition-all hover:bg-white/5 text-left"
                      style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: node.color, boxShadow: `0 0 6px ${node.color}` }} />
                      <div>
                        <div className="text-slate-400 font-mono">{node.name}</div>
                        <div className="text-slate-600 text-[10px] mt-0.5 truncate">{node.description}</div>
                      </div>
                    </button>
                  ))}
                  {layer.nodes.length > 6 && (
                    <div className="text-xs font-mono text-slate-600 text-center pt-1">
                      +{layer.nodes.length - 6} more locations — click nodes on map
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Layer status bar */}
        <div className="mt-6 grid grid-cols-5 gap-3">
          {mapLayers.map((l, i) => (
            <button
              key={l.id}
              onClick={() => { setActiveLayer(i); setSelectedNode(null); }}
              className="p-3 rounded text-left transition-all"
              style={{
                background: activeLayer === i ? `${l.primaryColor}15` : "rgba(10,15,40,0.5)",
                border: `1px solid ${activeLayer === i ? l.primaryColor + "50" : "rgba(255,255,255,0.05)"}`,
              }}
            >
              <div className="text-[10px] font-mono mb-1" style={{ color: l.primaryColor, opacity: activeLayer === i ? 1 : 0.5 }}>
                LAYER {l.number}
              </div>
              <div className="text-xs font-bold truncate" style={{ color: activeLayer === i ? "white" : "#475569", fontFamily: "'Orbitron', sans-serif", fontSize: "10px" }}>
                {l.name}
              </div>
              <div className="mt-1.5 flex items-center gap-1">
                <div className="h-0.5 flex-1 rounded" style={{ background: `${l.primaryColor}40` }}>
                  <div className="h-full rounded" style={{ background: l.primaryColor, width: activeLayer === i ? "100%" : "30%", transition: "width 0.5s" }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
