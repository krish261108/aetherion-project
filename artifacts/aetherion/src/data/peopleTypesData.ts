export interface PeopleType {
  id: string;
  name: string;
  definition: string;
  nature: string;
  strengths: string[];
  weaknesses: string[];
  socialView: string;
  hiddenNote?: string;
  color: string;
}

export const peopleTypes: PeopleType[] = [
  {
    id: "people-1",
    name: "Purebloods",
    definition: "Individuals fully aligned with a single clan.",
    nature: "Stable, predictable, deeply connected to one force.",
    strengths: ["Reliability", "Mastery", "Clear identity"],
    weaknesses: ["Limited perspective", "Struggle with opposing forces"],
    socialView: "Respected and considered the societal norm.",
    color: "cyan"
  },
  {
    id: "people-2",
    name: "Conflux",
    definition: "Individuals born with connection to two clans.",
    nature: "Unstable but powerful. Can be balanced, strained, or fractured.",
    strengths: ["Versatility", "Adaptability", "High potential"],
    weaknesses: ["Instability", "Internal conflict", "Risk of losing control"],
    socialView: "Sometimes feared, sometimes valued — rarely understood.",
    color: "violet"
  },
  {
    id: "people-3",
    name: "Nulls",
    definition: "Individuals with no connection to Aetherion.",
    nature: "Outside the system entirely. Neither aligned nor opposed.",
    strengths: ["Difficult to detect", "Unaffected by many abilities", "Unpredictable"],
    weaknesses: ["No natural defense against direct harm"],
    socialView: "Largely invisible to those who track Aetherion signatures.",
    hiddenNote: "They are the only ones not controlled by the system. Hidden importance remains classified.",
    color: "slate"
  },
  {
    id: "people-4",
    name: "Severed",
    definition: "Individuals who reject or cannot access Aetherion and turn to science.",
    nature: "Disconnected from the natural system. Rely on technology and engineered power.",
    strengths: ["Intelligence", "Adaptability", "Strategic thinking"],
    weaknesses: ["Dependence on technology", "Unstable artificial power"],
    socialView: "Viewed as outsiders by clan society. Founders of Project AETHER.",
    hiddenNote: "Core belief: Power should be built, not inherited.",
    color: "green"
  },
  {
    id: "people-5",
    name: "Veilbreakers",
    definition: "Extremist group within the Severed, actively helping Project AETHER.",
    nature: "Ideological, aggressive, willing to betray clan members and former allies.",
    strengths: ["Infiltration", "Sabotage", "System manipulation"],
    weaknesses: ["Extreme ideology", "No regard for consequences"],
    socialView: "Considered traitors and internal antagonists. Most dangerous from within.",
    hiddenNote: "Core belief: The system must be broken to be rebuilt.",
    color: "red"
  }
];
