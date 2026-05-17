export interface Layer {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  description: string;
  characteristics: string[];
  role: string;
  veilState?: string;
  color: string;
  icon: string;
}

export const layers: Layer[] = [
  {
    id: "layer-1",
    number: 1,
    name: "Scientific World",
    subtitle: "Surface Layer",
    description: "The visible world governed by science and logic. Most of humanity lives here, unaware of deeper realities.",
    characteristics: ["Structured", "Predictable", "Limited perception"],
    role: "Starting point for Adrian. Location of Project AETHER. Represents control and incomplete understanding.",
    veilState: "Boundaries enforced by Veil",
    color: "blue",
    icon: "⚗"
  },
  {
    id: "layer-2",
    number: 2,
    name: "Magical World",
    subtitle: "Hidden Layer",
    description: "A parallel layer where Aetherion is naturally accessible. Clan-based society exists in balance with the system.",
    characteristics: ["Energy-driven interactions", "Clan-based society", "Deeper awareness"],
    role: "Introduces the clan system and natural balance. Liora operates here.",
    veilState: "Separated from Scientific World by the Veil",
    color: "violet",
    icon: "✦"
  },
  {
    id: "layer-3",
    number: 3,
    name: "Celestial Planes",
    subtitle: "Origin Layer",
    description: "A higher-level reality closer to the original Aetherion Core. Less physical, more abstract and energy-based.",
    characteristics: ["Abstract", "Energy-based", "Sacred knowledge"],
    role: "Site of major revelations. Adrian and Liora discover the origin truth here in Book IV.",
    veilState: "Accessible only through alignment or convergence",
    color: "gold",
    icon: "◈"
  },
  {
    id: "layer-4",
    number: 4,
    name: "Forbidden Dimensions",
    subtitle: "Broken Layer",
    description: "Corrupted parts of reality created by imbalance or failed interference. Void energy dominates here.",
    characteristics: ["Unstable", "Hostile", "Unpredictable"],
    role: "Source of Void spread and Voidborn entities. Consequence of imbalance and danger.",
    veilState: "Veil fractured — contains hostile energy",
    color: "red",
    icon: "⚠"
  },
  {
    id: "layer-5",
    number: 5,
    name: "Temporal Layer",
    subtitle: "System Layer",
    description: "The underlying layer connecting all others through time. Governs sequence, causality, and continuity across all realities.",
    characteristics: ["Time-governing", "Causality-based", "Connects all layers"],
    role: "Critical in Books V-VII. Unstable behavior produces loops, overlaps, and temporal distortions.",
    veilState: "Deeply embedded — destabilizes last during collapse",
    color: "teal",
    icon: "⧖"
  }
];

export const veilStages = [
  { stage: 1, name: "Small Anomalies", description: "Visual glitches and minor irregularities." },
  { stage: 2, name: "Unstable Zones", description: "Energy distortions and localized reality failures." },
  { stage: 3, name: "Layer Overlap", description: "Rule conflicts between adjacent layers." },
  { stage: 4, name: "Time Breakdown", description: "Spatial distortion and temporal loops." },
  { stage: 5, name: "Full Convergence", description: "Complete system collapse — all layers merging." }
];
