export interface ClanInteraction {
  clan: string;
  type: 'compatible' | 'opposed' | 'neutral';
  dynamic: string;
}

export interface Clan {
  id: string;
  name: string;
  tier: 'Core' | 'Foundational' | 'Functional';
  element: string;
  symbolDesc: string;
  philosophy: string;
  backstory: string;
  color: string;
  strength: string;
  weakness: string;
  internalConflict: string;
  roleInStory: string;
  notableMembers: string[];
  interactions: ClanInteraction[];
  image: string;
}

export const clans: Clan[] = [
  {
    id: "clan-1",
    name: "Solaryn",
    tier: "Core",
    element: "Life / Light / Preservation",
    symbolDesc: "A perfect circle with a glowing inner core and soft outward rays — life radiating outward",
    philosophy: "Life must be protected, not controlled. Forcing preservation destroys what it tries to save.",
    backstory: "In the earliest state of Aetherion, Solaryn emerged as the force that sustained existence. It was not created to rule — but to maintain harmony between all forces. When the Core fractured, Solaryn chose to protect what remained rather than restore what was lost. Its followers became guardians of life, often sacrificing action for stability. Over centuries, they were seen as passive — but their role was never dominance. It was survival. They believe that forcing change only accelerates collapse, and that preservation requires knowing when not to act.",
    color: "gold",
    strength: "Healing, energy restoration, stability, long-term preservation",
    weakness: "Cannot act aggressively without disrupting their own alignment",
    internalConflict: "Is protection through restraint still protection — or is it just watching things collapse more slowly?",
    roleInStory: "Represented by Liora Nyxara. Solaryn embodies the balance ideal that the series argues for — preservation through understanding, not domination.",
    notableMembers: ["Liora Nyxara"],
    interactions: [
      { clan: "Nytheris", type: "opposed", dynamic: "Fundamental opposition — life versus void, preservation versus decay" },
      { clan: "Terravon", type: "compatible", dynamic: "Stability and life reinforce each other" },
      { clan: "Aqualis", type: "compatible", dynamic: "Flow sustains life — natural partnership" },
      { clan: "Chronis", type: "neutral", dynamic: "Shared patience but different focus — time vs. preservation" }
    ],
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80"
  },
  {
    id: "clan-2",
    name: "Nytheris",
    tier: "Core",
    element: "Void / Entropy / The End",
    symbolDesc: "A broken ring with a hollow center and cracks spreading outward — the symbol of collapse",
    philosophy: "Everything must end for something new to exist. Resisting endings only makes them more violent.",
    backstory: "Nytheris formed from the absence left behind when the Aetherion Core fractured. It was not evil — it was the natural result of imbalance and loss. Where Solaryn preserves, Nytheris ensures that nothing remains forever. Its followers believe that endings are necessary for new beginnings. Over time, they were feared and misunderstood as destroyers. But in truth, they exist to complete the cycle that others try to resist. The Void is not malicious — it is honest. Everything that exists will eventually return to nothing. Nytheris simply acknowledges this openly.",
    color: "crimson",
    strength: "Destruction, dissolution, accelerating decay and entropy",
    weakness: "Cannot create, cannot sustain — only end",
    internalConflict: "If everything must end, what is the point of anything? This question shadows every Nytheris member.",
    roleInStory: "The void force connected to Riven's fracture. Nytheris represents the necessary but dangerous side of reality — what happens when endings stop being balanced and start being uncontrolled.",
    notableMembers: ["Riven (fractured connection)"],
    interactions: [
      { clan: "Solaryn", type: "opposed", dynamic: "Life versus void — the fundamental opposition of the universe" },
      { clan: "Chronis", type: "neutral", dynamic: "Both deal with endings — but Chronis measures them while Nytheris enacts them" },
      { clan: "Valekar", type: "compatible", dynamic: "Conflict and destruction share an edge — dangerous partnership" }
    ],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80"
  },
  {
    id: "clan-3",
    name: "Chronis",
    tier: "Core",
    element: "Time / Consequence / Continuity",
    symbolDesc: "An hourglass formed by two intersecting circles — continuous flow across time",
    philosophy: "Every action creates a consequence that cannot be avoided. Time is not a path — it is a responsibility.",
    backstory: "Chronis came into existence as the force that connected all events across reality. Before the fracture, time was seamless and unified. After the split, Chronis became responsible for maintaining order between cause and effect. Its followers study patterns, cycles, and inevitability. They do not interfere easily, because they understand that every action has consequences that ripple far beyond what is immediately visible. To Chronis, time is not neutral — it is the accountability system of the universe.",
    color: "teal",
    strength: "Time awareness, prediction, prevention of temporal paradox",
    weakness: "Cannot act outside the boundaries of time — bound by the very system they govern",
    internalConflict: "If you can see what is coming, and you know the consequences, and you still cannot stop it — what does that make you?",
    roleInStory: "Critical in Books V-VII when time becomes unstable. The Chronis clan and their artifacts become the last line of defense against full temporal collapse.",
    notableMembers: ["Chronis Keepers"],
    interactions: [
      { clan: "Nerathis", type: "compatible", dynamic: "Time and perception — understanding consequence requires awareness" },
      { clan: "Aetherion", type: "neutral", dynamic: "Space and time intersect but rarely align in purpose" },
      { clan: "Nytheris", type: "neutral", dynamic: "Both deal with endings — different approaches, uneasy coexistence" }
    ],
    image: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?w=800&q=80"
  },
  {
    id: "clan-4",
    name: "Aetherion",
    tier: "Core",
    element: "Space / Connection / Unity",
    symbolDesc: "A circle with intersecting arcs and a vertical portal line — the symbol of connection across distance",
    philosophy: "Everything is connected, even if unseen. Distance is an illusion of perception.",
    backstory: "Aetherion is the closest reflection of the original Core itself. It represents the connection between all things, even across layers. When the fracture occurred, Aetherion became the force that still holds the links between separated realities — a living reminder of what once was whole. Its followers act as travelers, observers, and connectors — the bridges between worlds. They believe nothing is truly separate, only unseen. Even now, the Aetherion clan quietly holds reality together from within, one connection at a time.",
    color: "violet",
    strength: "Movement between layers, linking worlds, maintaining spatial coherence",
    weakness: "Cannot control what it connects — a bridge has no say in what crosses it",
    internalConflict: "If you exist to connect everything, and the things you connect are destroying each other, are you helping or enabling?",
    roleInStory: "The clan whose name is also the force that defines the entire universe — the closest thing to the original, unified state of reality.",
    notableMembers: ["Portal Medallion bearers"],
    interactions: [
      { clan: "Chronis", type: "neutral", dynamic: "Space and time — parallel dimensions of reality that occasionally overlap" },
      { clan: "Solaryn", type: "compatible", dynamic: "Connection and preservation — linked in purpose" },
      { clan: "Terravon", type: "neutral", dynamic: "Movement versus stillness — necessary tension" }
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80"
  },
  {
    id: "clan-5",
    name: "Terravon",
    tier: "Foundational",
    element: "Earth / Stability / Endurance",
    symbolDesc: "A solid hexagon inside a circle — structure within structure, stability as foundation",
    philosophy: "Strength comes from being unshaken. Build what can survive — protect what has been built.",
    backstory: "Terravon formed as the grounding force of reality after the fracture. When everything became unstable, it was Terravon that gave form and structure. Its followers became protectors, builders, and defenders. They value strength, patience, and resilience above all else. However, their resistance to change can become a limitation — in a universe that requires adaptation for survival, standing firm is sometimes the same as refusing to see what is changing around you.",
    color: "amber",
    strength: "Defense, structure, environmental anchoring, resistance to void",
    weakness: "Slow to adapt, resistant to change — which becomes dangerous as the system evolves",
    internalConflict: "If you are built to endure, how do you know when enduring has become refusing to evolve?",
    roleInStory: "The foundational force that holds physical reality together. Their role becomes critical during layer collapse events.",
    notableMembers: ["Terravon Shield bearers"],
    interactions: [
      { clan: "Aqualis", type: "compatible", dynamic: "Stability and flow — earth and water balance naturally" },
      { clan: "Pyraxis", type: "neutral", dynamic: "Fire and earth — transformation versus endurance" },
      { clan: "Solaryn", type: "compatible", dynamic: "Preservation and stability reinforce each other" }
    ],
    image: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?w=800&q=80"
  },
  {
    id: "clan-6",
    name: "Pyraxis",
    tier: "Foundational",
    element: "Fire / Transformation / Evolution",
    symbolDesc: "A sharp upward flame made of angular lines — rising change, aggressive transformation",
    philosophy: "Growth only comes through transformation. Nothing should remain the same forever.",
    backstory: "Pyraxis was born from the instability of the fractured Core. It represents the energy of change — the force that reshapes rather than destroys. Unlike Nytheris, Pyraxis transforms rather than ends. Its followers embrace growth through challenge and intensity. They believe that comfort is the enemy of progress, and that the discomfort of change is the price of evolution. But without control, their power can become destructive instead of transformative — fire that burns through what it was meant to reshape.",
    color: "orange",
    strength: "Energy conversion, evolution, driving transformation at scale",
    weakness: "Extremely difficult to control — the force of change does not stop where you want it to",
    internalConflict: "When you transform something, you destroy what it was. At what point is transformation indistinguishable from destruction?",
    roleInStory: "A volatile but necessary force — transformation is required for the new reality that forms at the end of Book VII.",
    notableMembers: ["Ember Core bearers"],
    interactions: [
      { clan: "Voltrix", type: "compatible", dynamic: "Energy and transformation — they amplify each other, for better or worse" },
      { clan: "Aqualis", type: "neutral", dynamic: "Fire and water — necessary opposition, occasional balance" },
      { clan: "Terravon", type: "neutral", dynamic: "Change versus endurance — evolution versus stability" }
    ],
    image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80"
  },
  {
    id: "clan-7",
    name: "Aqualis",
    tier: "Foundational",
    element: "Water / Flow / Adaptation",
    symbolDesc: "A smooth wave curve inside a circle — fluid, continuous, adaptive",
    philosophy: "Survival comes from flexibility. Move with the system — do not resist what cannot be stopped.",
    backstory: "Aqualis emerged as the force that allows reality to adjust and survive change. After the fracture, it helped stabilise transitions between states — smoothing the edges of violent change. Its followers value flexibility, patience, and adaptation. They avoid resistance and instead move with the system, finding the path of least friction. However, too much adaptation can lead to loss of identity — a river that adjusts to every obstacle eventually loses the shape of itself.",
    color: "blue",
    strength: "Flow control, stabilisation of transitions, working with Pyraxis and Terravon",
    weakness: "Cannot resist strong force — bends until it breaks",
    internalConflict: "If you adapt to everything, what do you actually stand for?",
    roleInStory: "Critical for stabilisation during the collapse period — Aqualis members help manage the transition between states of reality.",
    notableMembers: ["Tide Relic bearers"],
    interactions: [
      { clan: "Terravon", type: "compatible", dynamic: "Water and earth — flow and stability reinforce each other" },
      { clan: "Pyraxis", type: "neutral", dynamic: "Water and fire — necessary tension, occasional balance" },
      { clan: "Aetherion", type: "neutral", dynamic: "Both move — but one through space, one through adaptation" }
    ],
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80"
  },
  {
    id: "clan-8",
    name: "Voltrix",
    tier: "Functional",
    element: "Energy / Power / Motion",
    symbolDesc: "A lightning bolt cutting through a circle — raw power, uncontained",
    philosophy: "Power is only useful when it is directed. Without direction, energy is destruction.",
    backstory: "Voltrix formed as the raw energy released during the fracture of the Core. It became the force that drives all movement and action. Its followers learned to harness and amplify this energy — becoming powerful, fast, and often unpredictable. They believe power is meaningless unless it is controlled, which creates an interesting internal tension: a clan built from uncontrolled energy that insists on the importance of control.",
    color: "yellow",
    strength: "Amplification of other forces and artifacts, speed, raw energy output",
    weakness: "Overload — the same amplification that makes them powerful makes them catastrophically unstable under pressure",
    internalConflict: "We are built from chaos trying to impose order on ourselves. Is that strength — or just delay?",
    roleInStory: "Voltrix energy is what powers Project AETHER's artificial systems — the Lightning Core artifact is the primary interface.",
    notableMembers: ["Lightning Core bearers"],
    interactions: [
      { clan: "Pyraxis", type: "compatible", dynamic: "Energy and transformation — dangerous but powerful combination" },
      { clan: "Nerathis", type: "neutral", dynamic: "Power and mind — what you can do versus what you should" },
      { clan: "Terravon", type: "neutral", dynamic: "Speed and stillness — necessary opposition" }
    ],
    image: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80"
  },
  {
    id: "clan-9",
    name: "Nerathis",
    tier: "Functional",
    element: "Mind / Perception / Awareness",
    symbolDesc: "A spiral inside a circle — thought that turns inward and outward simultaneously",
    philosophy: "Reality is shaped by how it is understood. The way you see the world determines what the world is to you.",
    backstory: "Nerathis emerged as the force that allows reality to be understood — thought, perception, and interpretation. After the fracture, it became essential in making sense of a divided world where different rules applied in different layers. Its followers explore consciousness and influence perception. They understand that reality is not just what exists — but what is seen. However, too much focus on perception can lead to distortion: a mind that shapes its own reality eventually loses touch with what is actually there.",
    color: "purple",
    strength: "Perception, influence, analysis of systems and forces",
    weakness: "Vulnerable to confusion — perception can be manipulated or distorted",
    internalConflict: "If reality is shaped by perception, and you can change your perception, can you change reality? And if you can — should you?",
    roleInStory: "Elena Voss belongs to Nerathis — her ability to perceive systems across both scientific and Aetherion frameworks makes her unique. The Mirror of Minds artifact is the clan's primary artifact.",
    notableMembers: ["Elena"],
    interactions: [
      { clan: "Chronis", type: "compatible", dynamic: "Time and perception — understanding consequence requires awareness" },
      { clan: "Aetherion", type: "neutral", dynamic: "Perception of connection — they see what Aetherion creates" },
      { clan: "Voltrix", type: "neutral", dynamic: "Mind and power — what you can do versus what you should" }
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80"
  },
  {
    id: "clan-10",
    name: "Valekar",
    tier: "Functional",
    element: "War / Conflict / Action",
    symbolDesc: "Two crossed blades inside a circle — conflict as the centre of all progress",
    philosophy: "Progress comes through struggle. Peace without earned strength is only temporary.",
    backstory: "Valekar was born from the clash of forces after the fracture. It represents struggle, action, and the push for change through conflict. Its followers are warriors, decision-makers, and catalysts — people who believe that growth only happens when resistance is overcome. They are decisive, experienced, and often right about the need for action. But constant conflict can destroy what it tries to build, and a clan defined by struggle sometimes cannot recognize when the fight is the problem, not the solution.",
    color: "red",
    strength: "Combat precision, decisive action, strategic force deployment",
    weakness: "Escalates conflict unnecessarily — the tool for breaking things is not always the right tool",
    internalConflict: "We believe in progress through struggle. But what if the struggle itself is causing the collapse?",
    roleInStory: "Kael operates from Valekar. The clan represents the active, conflict-oriented approach to the crisis — and the limits of that approach.",
    notableMembers: ["Kael"],
    interactions: [
      { clan: "Nytheris", type: "compatible", dynamic: "Conflict and destruction — dangerous alignment" },
      { clan: "Solaryn", type: "opposed", dynamic: "Action versus preservation — the fundamental tension" },
      { clan: "Terravon", type: "neutral", dynamic: "War and stability — needed together, incompatible in excess" }
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
  }
];
