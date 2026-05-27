export interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "facility" | "clan" | "portal" | "void" | "node" | "origin" | "broken" | "temporal";
  color: string;
  glowColor: string;
  access?: "Public" | "Restricted" | "Classified" | "Critical" | "Catastrophic";
  description: string;
  detail: string;
  connections: string[];
  artifact?: string;
  bookRef?: string;
  danger?: "LOW" | "MODERATE" | "HIGH" | "EXTREME";
}

export interface MapLayer {
  id: string;
  name: string;
  subtitle: string;
  number: number;
  primaryColor: string;
  secondaryColor: string;
  bgStyle: "grid" | "circular" | "rings" | "broken" | "clock";
  description: string;
  nodes: MapNode[];
}

export const mapLayers: MapLayer[] = [
  {
    id: "scientific",
    name: "Scientific World",
    subtitle: "Surface Layer — Project AETHER Territory",
    number: 1,
    primaryColor: "#00d4ff",
    secondaryColor: "#0ea5e9",
    bgStyle: "grid",
    description: "The visible world governed by science and logic. Project AETHER operates here, forcing breaches into deeper layers. Everything looks organized until the fractures appear.",
    nodes: [
      { id: "metro", name: "Metro Grid", x: 160, y: 100, type: "facility", color: "#94a3b8", glowColor: "rgba(148,163,184,0.4)", access: "Public", description: "Civilian population center.", detail: "The ordinary city zone where Adrian first notices temporal glitches, mirror anomalies, and reality stutters. Ground zero for public exposure.", connections: ["surface-alpha", "reflection"], bookRef: "Book I" },
      { id: "surface-alpha", name: "Surface Facility Alpha", x: 400, y: 200, type: "facility", color: "#00d4ff", glowColor: "rgba(0,212,255,0.5)", access: "Restricted", description: "Main public-facing AETHER research campus.", detail: "First large-scale anomaly research and resonance measurement. The front door of Project AETHER's scientific empire. Connected to classified sub-facilities below.", connections: ["metro", "deep-veil", "breach", "containment"], bookRef: "Book I–II", artifact: "Lightning Core (fragments)", danger: "HIGH" },
      { id: "deep-veil", name: "Deep Veil Lab", x: 400, y: 430, type: "facility", color: "#8b5cf6", glowColor: "rgba(139,92,246,0.5)", access: "Classified", description: "Underground forced Veil-contact facility.", detail: "Hidden beneath Surface Alpha. Forced Veil-contact tests and artificial Aetherion replication. The source of Victor's most dangerous experiments. The Veil is thinnest here.", connections: ["surface-alpha", "arkan-core", "temporal-room"], bookRef: "Book II–III", danger: "EXTREME" },
      { id: "breach", name: "Breach Chamber", x: 580, y: 290, type: "portal", color: "#ef4444", glowColor: "rgba(239,68,68,0.6)", access: "Critical", description: "Artificial portal experiment zone.", detail: "First successful artificial crossing attempt. This chamber is the direct cause of the Veil fracturing. Clicking through here connects to the Magical World — but dangerously.", connections: ["surface-alpha", "null-zone", "arkan-core"], bookRef: "Book II", danger: "EXTREME" },
      { id: "containment", name: "Artifact Containment Wing", x: 210, y: 310, type: "facility", color: "#f59e0b", glowColor: "rgba(245,158,11,0.5)", access: "Restricted", description: "Recovered artifact storage and testing.", detail: "Holds Lightning Core fragments, Portal Medallion shards, and unknown materials from Veil breaches. Artifacts here are unstable — containment failures have occurred.", connections: ["surface-alpha", "null-zone"], bookRef: "Book I–II", artifact: "Portal Medallion, Lightning Core", danger: "HIGH" },
      { id: "null-zone", name: "Null Observation Zone", x: 610, y: 430, type: "facility", color: "#64748b", glowColor: "rgba(100,116,139,0.4)", access: "Restricted", description: "Human research zone for Nulls.", detail: "Studies Null humans — those completely outside the Aetherion system. Victor believes understanding Nulls may unlock forced convergence. Ethically compromised research.", connections: ["containment", "breach", "sector-7"], bookRef: "Book III", danger: "MODERATE" },
      { id: "temporal-room", name: "Temporal Analysis Room", x: 220, y: 480, type: "facility", color: "#10b981", glowColor: "rgba(16,185,129,0.4)", access: "Classified", description: "Chronis-linked time detection lab.", detail: "Detects temporal loops, delays, and overlapping moments. Connected to Chronis Anchor fragment data. Adrian discovers his own timeline anomalies here in Book III.", connections: ["deep-veil", "sector-7"], bookRef: "Book III", artifact: "Chronis Mirror data", danger: "MODERATE" },
      { id: "sector-7", name: "Sector 7 Void Spread Site", x: 580, y: 530, type: "void", color: "#dc2626", glowColor: "rgba(220,38,38,0.6)", access: "Catastrophic", description: "First major containment failure area.", detail: "Where the void escaped containment for the first time. Physical space is warped here. Time loops occur. The Veil is broken in a 400-meter radius. Entry is survival-risk.", connections: ["null-zone", "temporal-room"], bookRef: "Book II", danger: "EXTREME" },
      { id: "reflection", name: "Reflection District", x: 150, y: 380, type: "node", color: "#a78bfa", glowColor: "rgba(167,139,250,0.4)", access: "Public", description: "Civilian anomaly hot zone.", detail: "An ordinary district where anomalies manifest as reflections showing alternate timelines, sounds repeating with slight changes, and objects appearing in two places simultaneously. Precursor to full fracture.", connections: ["metro", "temporal-room"], bookRef: "Book I" },
      { id: "arkan-core", name: "Arkan Directive Core", x: 400, y: 570, type: "facility", color: "#7c3aed", glowColor: "rgba(124,58,237,0.6)", access: "Catastrophic", description: "Late-stage engineered convergence center.", detail: "Arkan's control nucleus. Engineered convergence planning and forced stability models are coordinated here. Victor's final gambit. All AETHER operations ultimately report here in Books V–VI.", connections: ["deep-veil", "breach"], bookRef: "Book V–VI", danger: "EXTREME" },
    ],
  },
  {
    id: "magical",
    name: "Magical World",
    subtitle: "Hidden Layer — Aetherion Prime Atlas",
    number: 2,
    primaryColor: "#8b5cf6",
    secondaryColor: "#a78bfa",
    bgStyle: "circular",
    description: "The clan-based hidden layer where Aetherion flows naturally. Circular realm centered on Aetherion Nexus, with ten clan territories radiating outward like the petals of a cosmic flower.",
    nodes: [
      { id: "nexus", name: "Aetherion Nexus", x: 400, y: 360, type: "portal", color: "#00d4ff", glowColor: "rgba(0,212,255,0.7)", description: "The central portal city and convergence anchor.", detail: "Force-crossing hub, neutral archive point, spatial anchor for all layers. Where all clan roads meet. The artifact alignment lines converge here. Adrian arrives here at the end of Book II.", connections: ["chronis", "solaryn", "nytheris", "voltrix", "pyraxis", "terravon", "aqualis", "nerathis", "valekar"], bookRef: "Book II–VII", artifact: "Aetherion Heart, Portal Medallion" },
      { id: "chronis", name: "Chronis Spire", x: 400, y: 160, type: "clan", color: "#10b981", glowColor: "rgba(16,185,129,0.5)", description: "Time-frozen mountains and continuity observatory.", detail: "Northern territory of Clan Chronis. Frozen mountain ranges where time moves slower. Clock-ring towers observe causality streams. The Chronis Anchor is kept here.", connections: ["nexus", "voltrix", "nerathis"], bookRef: "Book III", artifact: "Chronis Anchor", danger: "MODERATE" },
      { id: "voltrix", name: "Voltrix Stormline", x: 563, y: 219, type: "clan", color: "#facc15", glowColor: "rgba(250,204,21,0.5)", description: "Lightning plains and kinetic storm conduits.", detail: "North-east territory of Clan Voltrix. Endless lightning storms power the kinetic towers. The Lightning Core was found here. Raw Aetherion energy is most visible and violent.", connections: ["nexus", "chronis", "solaryn"], bookRef: "Book II", artifact: "Lightning Core" },
      { id: "solaryn", name: "Solaryn Sanctum", x: 625, y: 360, type: "clan", color: "#f59e0b", glowColor: "rgba(245,158,11,0.5)", description: "Luminous forests and life-preservation sanctuaries.", detail: "Eastern territory of Clan Solaryn. Living light fills the forests. Healing sanctuaries hold the Sunstone. Life is extended and preserved here. Opposed to all void activity.", connections: ["nexus", "voltrix", "pyraxis"], bookRef: "Book I–II", artifact: "Sunstone" },
      { id: "pyraxis", name: "Pyraxis Rift", x: 563, y: 501, type: "clan", color: "#f97316", glowColor: "rgba(249,115,22,0.5)", description: "Volcanic transformation region and forges.", detail: "South-east territory of Clan Pyraxis. Volcanic rifts power transformation forges where matter and energy are reshaped. The Ember Core is their artifact. Change is worshipped.", connections: ["nexus", "solaryn", "terravon"], bookRef: "Book III", artifact: "Ember Core" },
      { id: "terravon", name: "Terravon Bastion", x: 400, y: 560, type: "clan", color: "#d97706", glowColor: "rgba(217,119,6,0.5)", description: "Stone fortress lands and foundation cities.", detail: "Southern territory of Clan Terravon. Massive stone fortresses and underground cities built into bedrock. The Terravon Shield anchors physical reality here. Most resistant to void spreading.", connections: ["nexus", "pyraxis", "aqualis"], bookRef: "Book II–III", artifact: "Terravon Shield" },
      { id: "aqualis", name: "Aqualis Veilsea", x: 237, y: 501, type: "clan", color: "#38bdf8", glowColor: "rgba(56,189,248,0.5)", description: "Adaptive coastal realm and flowing Veil passages.", detail: "South-west territory of Clan Aqualis. Vast sea where the Veil ripples visibly like water. The Tide Relic is kept in the deep. Aqualis is most flexible and adaptive of the clans.", connections: ["nexus", "terravon", "nytheris"], bookRef: "Book IV", artifact: "Tide Relic" },
      { id: "nytheris", name: "Nytheris Hollow", x: 175, y: 360, type: "void", color: "#dc2626", glowColor: "rgba(220,38,38,0.6)", description: "Void-scarred wasteland and entropy temples.", detail: "Western territory of Clan Nytheris. End-cycle ruins, entropy temples, and void-scarred landscape. The Nytheris Heart and Void Shard are kept here. Decay is their philosophy.", connections: ["nexus", "aqualis", "nerathis"], bookRef: "Book II–IV", artifact: "Nytheris Heart, Void Shard", danger: "HIGH" },
      { id: "nerathis", name: "Nerathis Mirrorfields", x: 237, y: 219, type: "clan", color: "#c084fc", glowColor: "rgba(192,132,252,0.5)", description: "Illusion and perception zone with reflective plains.", detail: "North-west territory of Clan Nerathis. The Mirror of Minds resonates across miles of reflective plains. Reality perception is manipulated here. Truth and illusion are indistinguishable.", connections: ["nexus", "nytheris", "chronis"], bookRef: "Book IV", artifact: "Mirror of Minds" },
      { id: "valekar", name: "Valekar Ironfront", x: 400, y: 660, type: "clan", color: "#ef4444", glowColor: "rgba(239,68,68,0.5)", description: "Outer conflict frontier and warfront.", detail: "Outer ring territory of Clan Valekar. Where wars are fought and pressure points gather. The Blade of Eternal Strike was forged here. Their philosophy: conflict is the engine of progress.", connections: ["nexus", "terravon"], bookRef: "Book III–IV", artifact: "Blade of Eternal Strike", danger: "HIGH" },
      { id: "veil-gate-n", name: "Veil Gate North", x: 400, y: 80, type: "portal", color: "#67e8f9", glowColor: "rgba(103,232,249,0.5)", description: "Controlled northern passage between layers.", detail: "One of four stable Veil Gates. Passage to the Celestial Planes is possible here under alignment conditions. Project AETHER has attempted to force it open. Chronis guards it.", connections: ["chronis", "nexus"], bookRef: "Book IV" },
      { id: "veil-gate-s", name: "Veil Gate South", x: 400, y: 720, type: "portal", color: "#fb7185", glowColor: "rgba(251,113,133,0.4)", description: "Southern gate — fractured and unstable.", detail: "The Veil Gate closest to Forbidden Dimensions. Currently fractured due to void pressure from Nytheris territory. Void bleed-through occurs here. Entry is dangerous.", connections: ["valekar", "nexus"], bookRef: "Book III", danger: "HIGH" },
    ],
  },
  {
    id: "celestial",
    name: "Celestial Planes",
    subtitle: "Origin Layer — Sacred Source of All Aetherion",
    number: 3,
    primaryColor: "#fbbf24",
    secondaryColor: "#e2e8f0",
    bgStyle: "rings",
    description: "Not a physical place but a state of pure Aetherion origin. Sacred, abstract, and vertical. The layer closest to the original unified Core before the fracture shattered it into the five.",
    nodes: [
      { id: "origin-axis", name: "Origin Axis", x: 400, y: 350, type: "origin", color: "#fbbf24", glowColor: "rgba(251,191,36,0.8)", description: "Vertical energy line — the original unified system.", detail: "The spine of all Aetherion reality. Before the fracture, this was the only point. Now it is a memory and a target. Convergence must be aligned with the Origin Axis or reality collapses.", connections: ["core-memory", "unity-obs", "fracture-archive", "resonance-bridge"], bookRef: "Book VI–VII" },
      { id: "core-memory", name: "Core Memory Ring", x: 400, y: 200, type: "origin", color: "#e2e8f0", glowColor: "rgba(226,232,240,0.6)", description: "Contains memory of the unified pre-fracture state.", detail: "A ring of pure compressed memory encoding everything before the fracture. This is what Project AETHER is trying to replicate artificially. Adrian must read it to understand true balance.", connections: ["origin-axis", "first-vault"], bookRef: "Book V" },
      { id: "liora-path", name: "Liora Balance Path", x: 540, y: 280, type: "node", color: "#34d399", glowColor: "rgba(52,211,153,0.5)", description: "Path toward true alignment — Liora's route.", detail: "The route Liora discovered to approach the Origin Axis without triggering collapse. Requires alignment, not force. The key to controlled convergence that Adrian must learn in Book VI.", connections: ["origin-axis", "unity-obs"], bookRef: "Book IV–VI" },
      { id: "fracture-archive", name: "Fracture Archive", x: 260, y: 400, type: "broken", color: "#f87171", glowColor: "rgba(248,113,113,0.5)", description: "Records the exact moment the Core broke.", detail: "A scar in the Celestial Planes where the fracture event is permanently encoded. Understanding this archive is how Adrian learns what NOT to repeat. Victor tried to delete it in Book V.", connections: ["origin-axis", "core-memory"], bookRef: "Book V" },
      { id: "first-vault", name: "First Epoch Vault", x: 400, y: 130, type: "origin", color: "#c4b5fd", glowColor: "rgba(196,181,253,0.5)", description: "Myth-history zone — before all known eras.", detail: "Records from before the Scientific World or Magical World existed. The original state of unified Aetherion. Only accessible after reaching Core Memory Ring. Contains the true origin of all clans.", connections: ["core-memory"], bookRef: "Book VII" },
      { id: "unity-obs", name: "Unity Observatory", x: 540, y: 440, type: "origin", color: "#fbbf24", glowColor: "rgba(251,191,36,0.5)", description: "View all forces before they were separated.", detail: "From here, all ten clan forces can be observed in their original unified state. Proof that control, balance, understanding, and imbalance are facets of one whole. Adrian's revelation happens here.", connections: ["origin-axis", "liora-path", "resonance-bridge"], bookRef: "Book VI" },
      { id: "resonance-bridge", name: "Resonance Bridge", x: 400, y: 530, type: "portal", color: "#00d4ff", glowColor: "rgba(0,212,255,0.5)", description: "Limited path back to lower layers.", detail: "The only stable connection from the Celestial Planes back to the Magical World. Requires alignment resonance to traverse. Unaligned crossing causes temporal paradox.", connections: ["origin-axis", "unity-obs"], bookRef: "Book VI–VII" },
    ],
  },
  {
    id: "forbidden",
    name: "Forbidden Dimensions",
    subtitle: "Broken Layer — Collapsed Reality & Void Domain",
    number: 4,
    primaryColor: "#ef4444",
    secondaryColor: "#7c3aed",
    bgStyle: "broken",
    description: "A non-Euclidean shattered geography. Laws of physics are suggestions. Space is fragmented. Void energy dominates. Nothing here behaves predictably. Entry without protection means dissolution.",
    nodes: [
      { id: "void-scar", name: "Void Scar", x: 200, y: 250, type: "void", color: "#dc2626", glowColor: "rgba(220,38,38,0.7)", access: "Catastrophic", description: "Primary scar caused by the original imbalance.", detail: "The wound in reality where the first major void outbreak occurred. Still actively expanding. Nytheris energy bleeds out of it. The Void Shard is drawn to this location.", connections: ["broken-gate", "nytheris-echo"], bookRef: "Book II–IV", artifact: "Void Shard", danger: "EXTREME" },
      { id: "broken-gate", name: "Broken Layer Gate", x: 460, y: 200, type: "portal", color: "#f97316", glowColor: "rgba(249,115,22,0.5)", access: "Critical", description: "Unstable forced entry point.", detail: "Where Project AETHER's breach experiments punched through. It cannot be sealed from this side. Reality inverts near the gate — gravity, time, and spatial laws all fail.", connections: ["void-scar", "collapse-field", "dead-zone"], bookRef: "Book II", danger: "EXTREME" },
      { id: "silent-expanse", name: "Silent Expanse", x: 600, y: 360, type: "void", color: "#475569", glowColor: "rgba(71,85,105,0.4)", access: "Catastrophic", description: "Empty region where all energy fails.", detail: "A zone of complete energy vacuum. Aetherion, void, even sound cease to function. Objects enter and stop existing. The most terrifying location in the Forbidden Dimensions.", connections: ["broken-gate", "collapse-field"], bookRef: "Book V", danger: "EXTREME" },
      { id: "collapse-field", name: "Collapse Field", x: 330, y: 460, type: "void", color: "#ef4444", glowColor: "rgba(239,68,68,0.6)", access: "Catastrophic", description: "High-risk space/time distortion zone.", detail: "Space and time are actively collapsing here. Entering this zone means experiencing all moments simultaneously. Riven was exposed to this in Book III — it caused his fracture.", connections: ["broken-gate", "dead-zone", "silent-expanse"], bookRef: "Book III", danger: "EXTREME" },
      { id: "dead-zone", name: "Dead Convergence Zone", x: 430, y: 340, type: "broken", color: "#7c3aed", glowColor: "rgba(124,58,237,0.5)", access: "Critical", description: "Failed alignment area — a warning.", detail: "Where a previous convergence attempt failed catastrophically. The energy is still radiating outward. Victor studied this as a model. Adrian must understand why it failed to succeed.", connections: ["broken-gate", "collapse-field", "riven-zone"], bookRef: "Book IV–V" },
      { id: "nytheris-echo", name: "Nytheris Echo Pits", x: 180, y: 490, type: "void", color: "#dc2626", glowColor: "rgba(220,38,38,0.5)", access: "Catastrophic", description: "Entropy-heavy subregions.", detail: "Echoes of the Nytheris Hollow bleeding into the Forbidden Dimensions. Everything here decays faster. Time runs backward in patches. The sound of ending is audible.", connections: ["void-scar", "corrupt-graveyard"], bookRef: "Book IV", danger: "EXTREME" },
      { id: "riven-zone", name: "Riven Fracture Zone", x: 530, y: 470, type: "broken", color: "#f59e0b", glowColor: "rgba(245,158,11,0.5)", access: "Catastrophic", description: "Symbolic region linked to Riven's imbalance.", detail: "A zone shaped by Riven's own fracturing. His exposure to both extremes of control and chaos created a unique spatial tear. His presence here caused it — and it follows him.", connections: ["dead-zone", "corrupt-graveyard"], bookRef: "Book III–V" },
      { id: "corrupt-graveyard", name: "Corrupted Artifact Graveyard", x: 360, y: 570, type: "broken", color: "#6b7280", glowColor: "rgba(107,114,128,0.4)", access: "Critical", description: "Destroyed or overused artifact remains.", detail: "Fragments of artifacts that were forced beyond their limits scatter here. Each fragment radiates corrupted force. Touching them without preparation causes permanent reality fragmentation.", connections: ["nytheris-echo", "riven-zone"], bookRef: "Book IV", danger: "HIGH" },
    ],
  },
  {
    id: "temporal",
    name: "Temporal Layer",
    subtitle: "System Layer — The Timeline Engine Beneath All Layers",
    number: 5,
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    bgStyle: "clock",
    description: "Not a place but the timeline engine beneath all places. Chronal rings, causality tracks, loops, and echoes. The clock that governs when convergence happens — and when it fails.",
    nodes: [
      { id: "chronis-loop", name: "Chronis Loop", x: 400, y: 350, type: "temporal", color: "#10b981", glowColor: "rgba(16,185,129,0.7)", description: "The main causality ring — the spine of time.", detail: "The core ring where all time events are recorded and ordered. Chronis clan is its keeper. Damaging this loop causes all other temporal structures to drift. Book VI's convergence plan must pass through here.", connections: ["past-echo", "present-fault", "final-node", "overlap"], bookRef: "Book I–VII", artifact: "Chronis Anchor" },
      { id: "past-echo", name: "Past Echo Ring", x: 400, y: 350, type: "temporal", color: "#06b6d4", glowColor: "rgba(6,182,212,0.5)", description: "Records consequences from earlier books.", detail: "The echo layer of all events from Books I–V. Reading the Past Echo Ring shows Adrian how every cause created its effect — and what can still be changed versus what is locked permanently.", connections: ["chronis-loop", "collapse-clock"], bookRef: "Book V" },
      { id: "present-fault", name: "Present Faultline", x: 400, y: 200, type: "broken", color: "#f59e0b", glowColor: "rgba(245,158,11,0.5)", description: "Active instability band — the present moment.", detail: "The fracture point of the current timeline. Instability here means the present moment is not stable — multiple versions of 'now' coexist. This is the battlefield of Book VI.", connections: ["chronis-loop", "future-branches"], bookRef: "Book VI", danger: "HIGH" },
      { id: "future-branches", name: "Future Fracture Branches", x: 570, y: 240, type: "temporal", color: "#a78bfa", glowColor: "rgba(167,139,250,0.4)", description: "Possible outcomes and failed futures.", detail: "Three fracture branches extend from the present faultline: the path of forced control (Victor's end), the path of total chaos (Riven's end), and the narrow path of aligned balance (Adrian's end).", connections: ["present-fault", "final-node"], bookRef: "Book VI–VII" },
      { id: "anchor-nodes", name: "Temporal Anchor Nodes", x: 230, y: 240, type: "temporal", color: "#10b981", glowColor: "rgba(16,185,129,0.4)", description: "Stable points linked to Chronis artifacts.", detail: "Six anchor nodes positioned around the main loops, each maintained by a Chronis artifact fragment. If more than two are destabilized simultaneously, the Chronis Loop begins to unravel.", connections: ["chronis-loop", "past-echo"], bookRef: "Book III", artifact: "Chronis Mirror" },
      { id: "overlap", name: "Overlap Corridor", x: 180, y: 350, type: "temporal", color: "#64748b", glowColor: "rgba(100,116,139,0.4)", description: "Simultaneous events from different layers.", detail: "Where timeline threads from different reality layers overlap in the same moment. Project AETHER's experiments created this corridor. It allows events in the Scientific World to influence the Magical World simultaneously.", connections: ["chronis-loop", "anchor-nodes"], bookRef: "Book IV" },
      { id: "collapse-clock", name: "Collapse Clock", x: 400, y: 150, type: "void", color: "#ef4444", glowColor: "rgba(239,68,68,0.6)", description: "Visual countdown toward full convergence collapse.", detail: "A temporal structure that appeared spontaneously after the Sector 7 event. It is counting toward the inevitable forced convergence of Books VI–VII. There is no way to stop it — only to align before it hits zero.", connections: ["past-echo", "present-fault"], bookRef: "Book VI", danger: "EXTREME" },
      { id: "final-node", name: "Final Alignment Node", x: 400, y: 540, type: "origin", color: "#fbbf24", glowColor: "rgba(251,191,36,0.7)", description: "True balance path — the destination of Book VII.", detail: "The only stable endpoint in all future fracture branches. Reaching this node requires all three — Adrian, Liora, and even Riven — to align their understanding simultaneously. The ending of The Aetherion Cycle.", connections: ["chronis-loop", "future-branches"], bookRef: "Book VII" },
    ],
  },
];
