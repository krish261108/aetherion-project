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
  image: string;
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
    icon: "⚗",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
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
    icon: "✦",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=700&q=80",
  },
  {
    id: "layer-3",
    number: 3,
    name: "Aetherion Layer",
    subtitle: "Core Layer",
    description: "The layer where Aetherion itself exists as a physical force. Reality is fluid and energy is directly manipulable.",
    characteristics: ["Pure Aetherion energy", "Reality is malleable", "Convergence point"],
    role: "The battleground for the true conflict. Where the fracture must be healed or will be made permanent.",
    veilState: "Accessible only through deep Aetherion connection",
    color: "gold",
    icon: "◈",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=700&q=80",
  },
  {
    id: "layer-4",
    number: 4,
    name: "Void Layer",
    subtitle: "Destruction Layer",
    description: "The layer of pure entropy. Where things go when they are erased from existence. The Nytheris domain.",
    characteristics: ["Entropy-dominant", "Erased existence", "Nytheris homeland"],
    role: "Source of the collapse threat. Where the Void Shard draws its power. The anti-existence.",
    veilState: "Sealed by convergence protocols",
    color: "red",
    icon: "◌",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&q=80",
  },
  {
    id: "layer-5",
    number: 5,
    name: "Celestial Plane",
    subtitle: "Source Layer",
    description: "The highest layer — origin of all Aetherion. Where the original Core resided before the fracture. Inaccessible to most.",
    characteristics: ["Origin of existence", "Pre-fracture state", "Convergence destination"],
    role: "The ultimate goal — to heal the fracture and restore the Celestial Plane. Adrian's final destination.",
    veilState: "Shattered — the fracture happened here",
    color: "teal",
    icon: "✧",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&q=80",
  },
];

export const veilStages = [
  { stage: 0, name: "Intact", desc: "All layers perfectly separated. Reality stable." },
  { stage: 1, name: "Strained", desc: "Minor anomalies appear. Rare cross-layer bleed." },
  { stage: 2, name: "Fractured", desc: "Glitches visible in both worlds. Increasing instability." },
  { stage: 3, name: "Torn", desc: "Large cross-layer events. Active convergence zones." },
  { stage: 4, name: "Failing", desc: "Layers actively merging. Collapse accelerating." },
  { stage: 5, name: "Broken", desc: "Total Veil failure. Full convergence. Existence ends." },
];
