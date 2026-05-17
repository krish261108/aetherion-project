export interface Book {
  id: string;
  title: string;
  type: 'Core' | 'Spin-off';
  theme: string;
  description?: string;
  danger: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'OMEGA';
}

export const books: Book[] = [
  {
    id: "book-1",
    title: "The Fractured Veil",
    type: "Core",
    theme: "Reality is not as stable as it seems.",
    description: "Adrian notices glitches, meets Liora, discovers Aetherion, Project AETHER introduced.",
    danger: "MEDIUM"
  },
  {
    id: "book-2",
    title: "Echoes of the Lost Clans",
    type: "Core",
    theme: "Understanding brings responsibility.",
    description: "Clan system explored, Riven deepens, Void begins.",
    danger: "MEDIUM"
  },
  {
    id: "book-3",
    title: "Shadows of the Voidborn",
    type: "Core",
    theme: "Imbalance has consequences.",
    description: "Void becomes real, Voidborn introduced, major collapse.",
    danger: "HIGH"
  },
  {
    id: "book-4",
    title: "Origin of the Aetherion Core",
    type: "Core",
    theme: "Understanding the truth changes everything.",
    description: "Celestial Plane reached, origin revealed, Core fractured.",
    danger: "HIGH"
  },
  {
    id: "book-5",
    title: "War of Fractured Realms",
    type: "Core",
    theme: "Power without balance leads to destruction.",
    description: "Full war, Arkan introduced, artifacts weaponized.",
    danger: "CRITICAL"
  },
  {
    id: "book-6",
    title: "Collapse of Infinity",
    type: "Core",
    theme: "Balance lost = everything collapses.",
    description: "Time loops, layers merge, Arkan forces convergence.",
    danger: "CRITICAL"
  },
  {
    id: "book-7",
    title: "The Eternal Aetherion",
    type: "Core",
    theme: "Balance is not forced; it is chosen.",
    description: "Final convergence, Adrian chooses balance, reality evolves.",
    danger: "OMEGA"
  },
  {
    id: "spinoff-1",
    title: "The Draven Legacy",
    type: "Spin-off",
    theme: "Kael + Riven backstory.",
    danger: "MEDIUM"
  },
  {
    id: "spinoff-2",
    title: "The First Epoch",
    type: "Spin-off",
    theme: "Ancient unified world before fracture.",
    danger: "LOW"
  },
  {
    id: "spinoff-3",
    title: "Project AETHER",
    type: "Spin-off",
    theme: "Science side, Victor Voss, Severed origins.",
    danger: "HIGH"
  },
  {
    id: "spinoff-4",
    title: "Chronis: Fractured Time",
    type: "Spin-off",
    theme: "Timelines, alternate outcomes.",
    danger: "CRITICAL"
  }
];
