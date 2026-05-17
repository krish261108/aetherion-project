export interface Clan {
  id: string;
  name: string;
  tier: 'Core' | 'Foundational' | 'Functional';
  element: string;
  symbolDesc: string;
  philosophy?: string;
  color: string;
  strength: string;
  weakness: string;
}

export const clans: Clan[] = [
  {
    id: "clan-1",
    name: "Solaryn",
    tier: "Core",
    element: "Life/Preservation/Balance",
    symbolDesc: "Perfect circle with glowing inner core and rays",
    philosophy: "Life must be protected, not controlled.",
    color: "gold",
    strength: "Healing, stability",
    weakness: "Cannot act aggressively"
  },
  {
    id: "clan-2",
    name: "Nytheris",
    tier: "Core",
    element: "Void/Entropy/End",
    symbolDesc: "Broken ring with hollow center and cracks",
    philosophy: "Everything must end for something new to exist.",
    color: "crimson/dark",
    strength: "Destruction",
    weakness: "Cannot create"
  },
  {
    id: "clan-3",
    name: "Chronis",
    tier: "Core",
    element: "Time/Consequence/Continuity",
    symbolDesc: "Hourglass of two intersecting circles",
    philosophy: "Every action creates consequence that cannot be avoided.",
    color: "silver/teal",
    strength: "Time awareness, prediction",
    weakness: "Cannot act outside time"
  },
  {
    id: "clan-4",
    name: "Aetherion",
    tier: "Core",
    element: "Space/Connection/Unity",
    symbolDesc: "Circle with intersecting arcs and portal line",
    philosophy: "Everything is connected, even if unseen.",
    color: "violet/cyan",
    strength: "Movement, linking worlds",
    weakness: "Cannot control what it connects"
  },
  {
    id: "clan-5",
    name: "Terravon",
    tier: "Foundational",
    element: "Earth/Stability/Endurance",
    symbolDesc: "Solid hexagon inside circle",
    color: "brown/amber",
    strength: "Defense, structure",
    weakness: "Slow and resistant to change"
  },
  {
    id: "clan-6",
    name: "Pyraxis",
    tier: "Foundational",
    element: "Fire/Transformation/Evolution",
    symbolDesc: "Sharp upward flame of angular lines",
    color: "orange/red",
    strength: "Energy conversion, evolution",
    weakness: "Hard to control"
  },
  {
    id: "clan-7",
    name: "Aqualis",
    tier: "Foundational",
    element: "Water/Flow/Adaptation",
    symbolDesc: "Smooth wave curve inside circle",
    color: "blue/teal",
    strength: "Flow control, stabilization",
    weakness: "Cannot resist strong force"
  },
  {
    id: "clan-8",
    name: "Voltrix",
    tier: "Functional",
    element: "Energy/Power/Motion",
    symbolDesc: "Lightning bolt cutting through circle",
    color: "yellow/electric",
    strength: "Amplification, speed",
    weakness: "Overload"
  },
  {
    id: "clan-9",
    name: "Nerathis",
    tier: "Functional",
    element: "Mind/Perception/Awareness",
    symbolDesc: "Spiral inside circle",
    color: "purple/lavender",
    strength: "Perception and influence",
    weakness: "Vulnerable to confusion"
  },
  {
    id: "clan-10",
    name: "Valekar",
    tier: "Functional",
    element: "War/Conflict/Action",
    symbolDesc: "Two crossed blades inside circle",
    color: "steel/crimson",
    strength: "Combat, decisive action",
    weakness: "Escalates conflict unnecessarily"
  }
];
