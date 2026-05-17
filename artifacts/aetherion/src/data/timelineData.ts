export interface TimelineEvent {
  id: string;
  number: number;
  title: string;
  description: string;
  bookRef?: string;
  era: 'ancient' | 'pre-series' | 'series' | 'convergence';
  color: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "tl-1",
    number: 1,
    title: "The Unified Age",
    description: "Aetherion exists as one whole living system. No separation between worlds. All forces balanced in perfect harmony.",
    era: "ancient",
    color: "gold"
  },
  {
    id: "tl-2",
    number: 2,
    title: "The Great Fracture",
    description: "The Core breaks. Forces separate. Reality splits into multiple distinct layers. The origin of all imbalance.",
    era: "ancient",
    color: "gold"
  },
  {
    id: "tl-3",
    number: 3,
    title: "Formation of Clans",
    description: "Each clan emerges as a manifestation of a fundamental force of reality — not just groups, but living philosophies.",
    era: "ancient",
    color: "gold"
  },
  {
    id: "tl-4",
    number: 4,
    title: "Creation of Artifacts",
    description: "Fragments of the broken Core crystallize into artifacts — each carrying a piece of the original unified system.",
    era: "ancient",
    color: "gold"
  },
  {
    id: "tl-5",
    number: 5,
    title: "Rise of the Hidden Layer",
    description: "The magical world develops its own clan-based society, operating in relative balance with natural Aetherion.",
    era: "pre-series",
    color: "violet"
  },
  {
    id: "tl-6",
    number: 6,
    title: "Scientific World Remains Unaware",
    description: "Humanity explains reality through science and logic alone, unaware of the deeper layers beneath their feet.",
    era: "pre-series",
    color: "violet"
  },
  {
    id: "tl-7",
    number: 7,
    title: "Early Anomalies",
    description: "Small patterns and irregularities begin appearing. Scientists notice structured energy behind unexplained events.",
    era: "pre-series",
    color: "violet"
  },
  {
    id: "tl-8",
    number: 8,
    title: "Formation of Project AETHER",
    description: "Scientists detect a hidden structured energy and establish Project AETHER — humanity's attempt to understand and control Aetherion.",
    era: "pre-series",
    color: "violet"
  },
  {
    id: "tl-9",
    number: 9,
    title: "Adrian Notices the Fractures",
    description: "Adrian begins seeing what others ignore — repeating patterns, time skips, reflection mismatches. Book I begins.",
    bookRef: "Book I",
    era: "series",
    color: "cyan"
  },
  {
    id: "tl-10",
    number: 10,
    title: "Veil Fractures",
    description: "The invisible boundary between layers begins to fail. Adrian crosses into the magical world and discovers Aetherion.",
    bookRef: "Book I — II",
    era: "series",
    color: "cyan"
  },
  {
    id: "tl-11",
    number: 11,
    title: "Void Emerges",
    description: "Imbalance becomes dangerous and tangible. Voidborn appear. Riven's connection to the Void is revealed.",
    bookRef: "Book III",
    era: "series",
    color: "cyan"
  },
  {
    id: "tl-12",
    number: 12,
    title: "Origin Revealed",
    description: "Adrian and Liora reach the Celestial Plane. The truth of the original Aetherion Core and the Great Fracture is discovered.",
    bookRef: "Book IV",
    era: "series",
    color: "cyan"
  },
  {
    id: "tl-13",
    number: 13,
    title: "War of Fractured Realms",
    description: "Project AETHER and the magical world collide in open conflict. Arkan Virel rises. Artifacts are weaponized.",
    bookRef: "Book V",
    era: "series",
    color: "cyan"
  },
  {
    id: "tl-14",
    number: 14,
    title: "Collapse of Infinity",
    description: "Reality no longer holds. Time loops and distorts. Layers begin to merge uncontrollably. The system is failing.",
    bookRef: "Book VI",
    era: "convergence",
    color: "red"
  },
  {
    id: "tl-15",
    number: 15,
    title: "Final Convergence",
    description: "All layers begin merging. Artifacts align into a larger structure. Reality hangs on the edge of complete annihilation.",
    bookRef: "Book VII",
    era: "convergence",
    color: "red"
  },
  {
    id: "tl-16",
    number: 16,
    title: "The Eternal Aetherion",
    description: "Adrian chooses balance over control. Liora activates the Core. Reality does not return to what it was — it evolves into something new.",
    bookRef: "Book VII",
    era: "convergence",
    color: "gold"
  }
];
