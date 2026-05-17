export interface ProjectPhase {
  number: number;
  name: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'CLASSIFIED';
}

export interface ClassifiedLog {
  id: string;
  number: string;
  title: string;
  clearance: 'CLASSIFIED' | 'TOP SECRET' | 'EYES ONLY' | 'OMEGA';
  content: string;
  redacted: boolean;
}

export interface KeyFigure {
  name: string;
  role: string;
  clearance: string;
  belief: string;
  quote: string;
  status: string;
}

export const projectPhases: ProjectPhase[] = [
  {
    number: 1,
    name: "Understanding",
    description: "Study anomalies and collect data on unexplained energy patterns. Document irregularities in the scientific world.",
    status: "COMPLETED"
  },
  {
    number: 2,
    name: "Replication",
    description: "Recreate Aetherion artificially. Build systems capable of generating structured energy without natural sources.",
    status: "COMPLETED"
  },
  {
    number: 3,
    name: "Control",
    description: "Manipulate energy and directly influence reality. Deploy containment units and resonance scanners across key zones.",
    status: "ACTIVE"
  },
  {
    number: 4,
    name: "Domination — Arkan Directive",
    description: "Redesign the system. Enforce engineered stability over natural balance. Complete control of Aetherion.",
    status: "CLASSIFIED"
  }
];

export const keyFigures: KeyFigure[] = [
  {
    name: "Victor Voss",
    role: "Founder & Early Director",
    clearance: "LEVEL ALPHA",
    belief: "Control is protection. If we don't control Aetherion, it will destroy us.",
    quote: "If we don't control it, it will destroy us.",
    status: "Former Director"
  },
  {
    name: "Dr. Arkan Virel",
    role: "Current Director & Primary Architect",
    clearance: "LEVEL OMEGA",
    belief: "Balance is unreliable. Stability must be engineered through absolute control of the system.",
    quote: "Balance is unreliable. Stability must be engineered.",
    status: "Active — Priority One"
  }
];

export const classifiedLogs: ClassifiedLog[] = [
  {
    id: "log-001",
    number: "LOG 001",
    title: "First Anomaly Detection",
    clearance: "CLASSIFIED",
    content: "Initial detection of structured energy patterns in sector 7. Readings do not conform to known physical laws. Pattern suggests intelligent design. Source: unknown. Recommend further investigation. Team assembled under Director Voss authority.",
    redacted: false
  },
  {
    id: "log-014",
    number: "LOG 014",
    title: "Resonance Pattern Confirmed",
    clearance: "TOP SECRET",
    content: "Resonance patterns confirmed across multiple detection sites. Energy source appears to be systemic — not localized. Initial hypothesis: structured field underlying physical reality. Project AETHER formally established. Funding authorized at [REDACTED] classification level.",
    redacted: true
  },
  {
    id: "log-032",
    number: "LOG 032",
    title: "Artifact Contact Failure",
    clearance: "TOP SECRET",
    content: "Attempt to interface with recovered artifact [DESIGNATION: VOID-SHARD-7] resulted in catastrophic containment failure. Three researchers [NAMES REDACTED]. Artifact energy not compatible with synthetic containment. New approach required. Victor Voss has suspended artifact interaction protocols pending review.",
    redacted: true
  },
  {
    id: "log-047",
    number: "LOG 047",
    title: "Void Spread Incident",
    clearance: "EYES ONLY",
    content: "Sector 12 has been quarantined. Void energy spreading beyond projected boundaries. Voidborn entities detected for the first time outside theoretical models. They exist. Classification: EXTREME THREAT. Public communications suppressed per [REDACTED] directive. Veilbreaker division activated.",
    redacted: true
  },
  {
    id: "log-066",
    number: "LOG 066",
    title: "Temporal Overlap Recorded",
    clearance: "EYES ONLY",
    content: "Time anomaly recorded in Lab 3. Events from [REDACTED] hours in the future were observed simultaneously with present events. Duration: 47 seconds. No physical harm. Psychological reports filed separately. This confirms the Temporal Layer hypothesis. Implications: staggering. Arkan Virel has been briefed.",
    redacted: true
  },
  {
    id: "log-100",
    number: "LOG 100",
    title: "Arkan Directive",
    clearance: "OMEGA",
    content: "By order of Director Arkan Virel, Project AETHER enters Phase 4 immediately. All previous balance-preservation protocols are hereby suspended. Natural Aetherion is a liability. Engineered stability is the only viable path forward. Opposition within the organization will be treated as a security threat. Veilbreakers are authorized for internal enforcement. The balance era is over.",
    redacted: false
  },
  {
    id: "log-final",
    number: "LOG FINAL",
    title: "Convergence Cannot Be Controlled",
    clearance: "OMEGA",
    content: "Our models were wrong. The system cannot be forced. Every attempt at control has accelerated the collapse we tried to prevent. Arkan's directive has triggered the very event we feared. The convergence is now inevitable. Only balance — not control — can resolve this. Note submitted for archive by [IDENTITY UNKNOWN]. This may be the last entry.",
    redacted: false
  }
];

export const projectMethods = [
  "Energy extraction from Aetherion field",
  "Artificial resonance amplification",
  "Artifact integration into power systems",
  "Reality simulation matrices",
  "Energy containment units",
  "Resonance scanners and field mappers",
  "Artificial stability enforcer arrays",
  "Experimental portal generators",
  "Veil boundary manipulation devices",
  "Void containment protocols"
];
