export interface Character {
  id: string;
  name: string;
  represents: string;
  description: string;
  arc: string;
  clan: string;
  status: string;
  quote?: string;
}

export const characters: Character[] = [
  {
    id: "char-1",
    name: "Adrian",
    represents: "Understanding",
    description: "Protagonist, bridge between worlds. Observant, analytical.",
    arc: "confused → aware → understanding → responsibility → clarity → struggle → decision",
    clan: "None (Bridge)",
    status: "Active"
  },
  {
    id: "char-2",
    name: "Liora Nyxara",
    represents: "Balance",
    description: "Guide and heart of balance. Calm, empathetic.",
    arc: "guide → burdened → stabilizing force",
    clan: "Solaryn",
    status: "Active"
  },
  {
    id: "char-3",
    name: "Riven",
    represents: "Imbalance",
    description: "Embodiment of fracture. Conflicted, intense. Void-connected.",
    arc: "mysterious → central conflict → resolved",
    clan: "Nytheris (fractured)",
    status: "Unstable"
  },
  {
    id: "char-4",
    name: "Sophie",
    represents: "Humanity",
    description: "Grounded human perspective. Practical, loyal.",
    arc: "observer → protector",
    clan: "None",
    status: "Active"
  },
  {
    id: "char-5",
    name: "Kael",
    represents: "Discipline and legacy",
    description: "Linked to Riven. Calm, strict, experienced.",
    arc: "controller → learns limits",
    clan: "Valekar",
    status: "Active"
  },
  {
    id: "char-6",
    name: "Elena",
    represents: "Knowledge seeker",
    description: "Researcher connected to Project AETHER. Curious, analytical, ambitious.",
    arc: "seeker → chooses understanding",
    clan: "Nerathis",
    status: "Active"
  },
  {
    id: "char-7",
    name: "Victor Voss",
    represents: "Control with good intention",
    description: "Early Project AETHER leader.",
    arc: "early leader",
    clan: "Severed",
    status: "Antagonist",
    quote: "If we don't control it, it will destroy us."
  },
  {
    id: "char-8",
    name: "Dr. Arkan Virel",
    represents: "Absolute control",
    description: "Final human antagonist.",
    arc: "final antagonist",
    clan: "Severed",
    status: "Primary Antagonist",
    quote: "Balance is unreliable. Stability must be engineered."
  }
];
