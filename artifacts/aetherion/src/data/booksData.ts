export interface BookAct {
  title: string;
  events: string[];
}

export interface Book {
  id: string;
  number?: number;
  title: string;
  type: 'Core' | 'Spin-off';
  theme: string;
  coreIdea: string;
  description: string;
  fullSynopsis: string;
  acts: BookAct[];
  characterProgression: { name: string; arc: string }[];
  hook: string;
  danger: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'OMEGA';
  image: string;
}

export const books: Book[] = [
  {
    id: "book-1",
    number: 1,
    title: "The Fractured Veil",
    type: "Core",
    theme: "Reality is not as stable as it seems.",
    coreIdea: "Something is wrong with the world, but no one sees it except Adrian.",
    description: "Adrian notices glitches in reality that no one else acknowledges. As the Veil begins to fracture, he crosses into a hidden world and meets Liora — who shows him that science and magic are not separate forces, but two ways of reading the same truth.",
    fullSynopsis: "Adrian's life appears completely normal from the outside — but he has always noticed things others dismiss. Repeating patterns in the street. Sounds that echo a half-second too late. Reflections that don't quite match. As these anomalies intensify and begin forming a structured pattern, Adrian realises he isn't imagining them — reality itself is cracking. When he encounters Liora for the first time, everything shifts. She is calm, composed, and already aware of what is happening. She introduces him to a concept that shakes his entire framework of understanding: the Veil — the invisible boundary separating the scientific world from a deeper hidden layer of reality. Through her, Adrian takes his first steps into the magical world, discovering that the laws of science he grew up with are not wrong — they are simply incomplete. Meanwhile, in the background of the scientific world, Project AETHER begins its operations, driven by humanity's desire to harness whatever energy lies beneath the surface. Adrian doesn't yet understand how deeply these two worlds are about to collide.",
    acts: [
      { title: "The World Isn't Right", events: ["Adrian lives a normal life but notices repeating patterns", "Small glitches: time skips, reflection mismatches, repeated sounds", "Internal disconnection — he feels like something is missing"] },
      { title: "Discovery", events: ["Anomalies intensify and form a recognisable pattern", "Adrian first encounters Liora — calm, aware, different", "Liora reveals: reality has layers, Aetherion exists, science and magic are connected"] },
      { title: "Entering the Truth", events: ["Adrian crosses the Veil for the first time", "First view of the magical world — energy is alive, rules are different", "Liora introduces clans, artifacts, and balance — but not the full truth"] },
      { title: "Conflict Begins", events: ["Project AETHER introduced — strange experiments underway", "Victor Voss makes his first appearance", "Severed and Veilbreakers hinted at — someone is leaking information"] },
      { title: "Breaking Point", events: ["Anomalies become severe — a small collapse event occurs", "Adrian accepts: his world is not normal and he cannot ignore this anymore", "Final scene: he looks at reality differently — and sees patterns no one else can"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Confused → Aware" },
      { name: "Liora", arc: "Guide → Mysterious Protector" },
      { name: "Victor", arc: "Background → Important Force" }
    ],
    hook: "The Veil is no longer stable. And this is just the beginning.",
    danger: "MEDIUM",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80"
  },
  {
    id: "book-2",
    number: 2,
    title: "Echoes of the Lost Clans",
    type: "Core",
    theme: "Understanding brings responsibility.",
    coreIdea: "Adrian learns how the system works — but realises it is already unstable.",
    description: "Adrian returns to the magical world intentionally for the first time. He learns about the clan system, explores the history of artifacts, and begins to understand the deeper philosophy behind each force — just as the Void begins spreading and Project AETHER escalates its operations.",
    fullSynopsis: "After the events of Book I, Adrian is no longer confused — he is aware. This time his entry into the magical world is deliberate, not accidental. What he finds is a fully structured society built around the ten clans, each representing a fundamental force of reality. Through Liora's guidance, he begins to understand that clans are not just power groups — they are living philosophies. Solaryn guards life. Nytheris accepts destruction. Chronis studies consequence. Each carries a way of seeing reality that is as essential as any other. But the system is already fragile. Riven appears more prominently, and Adrian begins to understand what he represents: the consequence of imbalance. Void energy is spreading through unstable zones. And back in the scientific world, Project AETHER is no longer passive — it is actively interfering with Aetherion. The Severed and Veilbreakers emerge from the shadows. Adrian now sees danger in both approaches to reality — control and natural balance — and realises that understanding the system also means carrying responsibility for what happens to it.",
    acts: [
      { title: "Entering a New World", events: ["Adrian returns to the magical world intentionally", "First real exposure to multiple clans and their ideologies", "The world opens up in full"] },
      { title: "The Clan System", events: ["Solaryn, Nytheris, Chronis, and others introduced", "Adrian learns: each clan is a way of thinking, not just a power", "Underlying tension — clans don't fully trust each other"] },
      { title: "Artifacts and History", events: ["Artifacts revealed as fragments of something larger", "Partial history: the world was once unified — something caused the split", "Full truth still withheld (for Book IV)"] },
      { title: "Riven and the Void", events: ["Riven's role deepens — he represents imbalance", "Void energy spreading through unstable zones", "Adrian sees firsthand what happens when balance is lost"] },
      { title: "Project AETHER Rises", events: ["Experiments increase in frequency and scale", "Severed and Veilbreakers become visible", "First real clash: science begins interfering with Aetherion"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Aware → Understanding" },
      { name: "Liora", arc: "Guide → Protector of Balance" },
      { name: "Riven", arc: "Mysterious → Warning Sign" },
      { name: "Victor", arc: "Background → Active Influence" }
    ],
    hook: "This is no longer about discovery — this is about what happens next.",
    danger: "MEDIUM",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80"
  },
  {
    id: "book-3",
    number: 3,
    title: "Shadows of the Voidborn",
    type: "Core",
    theme: "Imbalance has consequences.",
    coreIdea: "The Void is no longer a concept — it is becoming real and dangerous.",
    description: "The Void is no longer theoretical. Voidborn entities appear in areas where balance has completely failed. Riven's connection to the Void is revealed — he is not evil, but a living embodiment of fracture. A major collapse event shakes everyone's understanding of how close to the edge reality already is.",
    fullSynopsis: "Book III begins in the aftermath of the growing imbalance from Book II, but the stakes are immediately higher. The anomalies Adrian tracked are now full damage zones — areas where reality feels genuinely wrong. Empty. Distorted. Unnatural. Voidborn appear for the first time: beings or people whose exposure to void energy has made them not fully human, not fully stable. They are the first real threat Adrian faces, not ideological but physical. The revelation of Riven's full connection to the Void changes the emotional stakes of the series. He is not evil — he is broken. He sometimes helps, sometimes endangers, always unstable. He becomes a living example of what imbalance creates. Project AETHER escalates further: extracting energy, forcing experiments, pushing beyond any safe boundary. The Severed and Veilbreakers are now fully active and directly involved. Then a major collapse event — a portal failure, a void outbreak, or an artifact instability — causes real destruction and real loss. For the first time, Adrian shifts from curiosity to fear. This is no longer about understanding. This is about preventing something irreversible.",
    acts: [
      { title: "Aftermath", events: ["Unstable zones increasing in size and frequency", "Energy behaving unpredictably across both worlds", "Not just anomalies anymore — damage"] },
      { title: "The Void Emerges", events: ["First encounter with a true void-affected area", "Voidborn entities appear — distorted, unstable, dangerous", "First genuine threat that cannot be reasoned with"] },
      { title: "Riven's Truth", events: ["Riven revealed to be directly connected to the Void", "Not evil — but unable to fully control himself", "He becomes a living example of imbalance"] },
      { title: "System Breakdown", events: ["Layers begin slightly overlapping", "Time glitches become visible and frequent", "Liora realises balance is failing faster than expected"] },
      { title: "Major Incident", events: ["Large-scale collapse: portal failure or void outbreak", "Real destruction and loss", "Adrian shifts: from curiosity to fear and responsibility"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Understanding → Responsibility" },
      { name: "Liora", arc: "Protector → Burdened" },
      { name: "Riven", arc: "Unstable → Central Conflict" },
      { name: "Victor", arc: "Active → Dangerous" }
    ],
    hook: "The Void is not just spreading — it is growing. And it is hungry.",
    danger: "HIGH",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
  },
  {
    id: "book-4",
    number: 4,
    title: "Origin of the Aetherion Core",
    type: "Core",
    theme: "Understanding the truth changes everything.",
    coreIdea: "The world was never meant to be like this — everything was once whole.",
    description: "Adrian and Liora reach the Celestial Plane — the origin layer of reality — and discover the full truth. Aetherion was once a unified system. All forces were balanced together. A catastrophic fracture split the Core, creating the separated worlds, the clans, the artifacts, and all imbalance. Everything they know is a broken version of what should exist.",
    fullSynopsis: "After the collapse events of Book III, the world is in visible decay. Void spreading. Anomalies common. Adrian overwhelmed. Liora struggling. Riven more dangerous than ever. It is in this state of desperate clarity that Adrian begins his most important journey: not to fight, but to understand why. Following ancient clues, he and Liora reach the Celestial Plane — a layer of reality that is less physical, more abstract, existing closer to the original Aetherion Core. What they find there is not just information. It is a complete recontextualisation of everything they have experienced. Aetherion was once a single unified system. All forces — life, void, time, space, energy — were balanced together in one whole structure. Something caused the Core to fracture. Forces separated. Reality split into layers. From that fracture came the clans, the artifacts, the imbalance. Everything they know — every war, every struggle, every danger — is a symptom of a break that happened long before any of them existed. Most devastating of all: Project AETHER is not doing something new. It is repeating the same mistake that caused the fracture in the first place. Forcing control where balance should exist.",
    acts: [
      { title: "After the Collapse", events: ["World unstable after Book III", "Adrian overwhelmed, Liora struggling, Riven more dangerous", "The emotional and physical toll is visible"] },
      { title: "Search for Answers", events: ["Adrian asks: why is this happening?", "Clues point toward ancient knowledge and hidden truths", "The journey becomes truth-seeking, not conflict"] },
      { title: "The Celestial Layer", events: ["Adrian and Liora reach the Celestial Plane", "Less physical, more energy-based, almost sacred", "The original version of reality — before everything broke"] },
      { title: "The Truth Revealed", events: ["Aetherion was once ONE unified system", "The Core fractured — forces separated — reality split", "This created the clans, the artifacts, and all imbalance"] },
      { title: "Riven's Role Deepens", events: ["Riven is revealed as a direct result of the fracture", "Not just unstable — he is a living fragment of broken reality", "His resolution becomes essential to the endgame"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Responsibility → Understanding" },
      { name: "Liora", arc: "Guide → Key to Balance" },
      { name: "Riven", arc: "Conflict → Embodiment of Fracture" },
      { name: "Victor", arc: "Control → Dangerous Path" }
    ],
    hook: "If reality was once whole — can it be restored? Or will it collapse completely?",
    danger: "HIGH",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80"
  },
  {
    id: "book-5",
    number: 5,
    title: "War of Fractured Realms",
    type: "Core",
    theme: "Power without balance leads to destruction.",
    coreIdea: "All sides try to take control — and that is what makes everything worse.",
    description: "Armed with the truth from Book IV, every faction makes its move. Project AETHER becomes aggressive. The Veilbreakers sabotage from within. The clans resist. Fights break out across the scientific world, the magical world, and unstable zones between them. Artifacts are weaponised. And for the first time, war proves itself unable to solve a problem that war created.",
    fullSynopsis: "Book V begins with the knowledge gained in Book IV — and the desperation it creates. Adrian now understands the origin of the fracture, the nature of the system, and the gravity of what is happening. But knowing the truth does not give him the power to act on it. Project AETHER, now fully aware of what Aetherion is, becomes aggressive. No longer experimenting — they are acting, extracting, weaponising. The Veilbreakers operate from inside both worlds, sabotaging balance and opening breaches. Conflict erupts across all layers: scientific world, magical world, unstable zones. Artifacts are no longer used for understanding — they are used as weapons, causing massive power shifts and destabilising reactions. Every battle makes the system worse. Arkan Virel, a more calculated and extreme figure than Victor, emerges as the dominant force on the control side. A major turning point event — a significant defeat or the collapse of a critical location — forces Adrian to realise that war cannot fix a system that is fundamentally broken. What is needed is not victory. Something else entirely.",
    acts: [
      { title: "After the Truth", events: ["Adrian knows the origin of Aetherion", "But knowing is not fixing", "Void spreading faster, layers overlapping more often"] },
      { title: "War Begins", events: ["Project AETHER stops experimenting — starts acting", "Veilbreakers open breaches and leak critical intelligence", "Science vs magic becomes open conflict"] },
      { title: "Multiple Battles", events: ["Fights across the scientific world, magical world, and unstable zones", "Artifacts weaponised — causing massive power shifts", "War damages reality itself"] },
      { title: "Character Strain", events: ["Adrian: fighting won't fix this — but what will?", "Liora: losing control of stability", "Riven: stronger but more dangerous"] },
      { title: "Turning Point", events: ["Major loss: defeat, collapsed location, destroyed region", "Realisation: war is making everything worse, not better", "Adrian begins thinking differently — not control, not destruction"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Understanding → Searching for Solution" },
      { name: "Liora", arc: "Protector → Breaking Under Pressure" },
      { name: "Riven", arc: "Unstable → Dangerous Force" },
      { name: "Arkan", arc: "Introduced → Dominant Force" }
    ],
    hook: "If war cannot fix the system — what can?",
    danger: "CRITICAL",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
  },
  {
    id: "book-6",
    number: 6,
    title: "Collapse of Infinity",
    type: "Core",
    theme: "Balance lost completely means everything collapses.",
    coreIdea: "Reality is no longer breaking — it is actively collapsing.",
    description: "The aftermath of war leaves no winners. Layers overlap. Time behaves unpredictably — looping, delaying, merging moments. Arkan forces partial convergence, creating temporary order that makes the overall system catastrophically worse. The emotional low point of the series. Every character is breaking. Reality is on the edge of no return.",
    fullSynopsis: "Book VI opens in the wreckage of the war from Book V. No side won. Everything lost. The damage is visible in reality itself: layers overlapping at random, rules shifting mid-scene, environments unstable, time becoming unpredictable. Loops. Delays. Overlapping moments. The Chronis artifacts become critical — they are the only tools that can interact with a collapsing time layer. Scientific and magical worlds begin merging in places. Celestial energy bleeds into physical space. Forbidden zones expand. Every character hits their emotional low point. Adrian understands everything but cannot fix it. Liora is losing her ability to maintain balance. Riven is almost entirely consumed by the imbalance inside him. Arkan enacts his plan: forced convergence. He temporarily stabilises areas through artificial control, creating the appearance of order. But the underlying system becomes worse with every forced stabilisation. The false solution makes the real problem accelerate. A massive convergence zone forms — an entire region destabilises. The point of no return approaches. But in the chaos, Adrian experiences a breakthrough. Not a plan. A direction. Control won't work. Destruction won't work. Balance — true, chosen, aligned balance — is the only path.",
    acts: [
      { title: "After the War", events: ["No winners — only damage", "Layers overlapping frequently and unpredictably", "Reality feels inconsistent everywhere"] },
      { title: "Time Breaks", events: ["Loops, delays, overlapping moments", "Chronis artifacts become essential", "Not just space breaking — time is collapsing too"] },
      { title: "Layers Merging", events: ["Scientific and magical worlds overlap in places", "Celestial energy visible in physical reality", "Forbidden zones expand across both worlds"] },
      { title: "Character Low Point", events: ["Adrian: understands everything — can't fix it", "Liora: losing ability to maintain balance", "Riven: almost fully consumed by imbalance"] },
      { title: "Arkan's False Solution", events: ["Forces convergence — temporary artificial stability", "Looks like order — is actually making the system worse", "Adrian has his breakthrough: balance must be chosen, not forced"] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Searching → Clarity" },
      { name: "Liora", arc: "Struggling → Last Hope" },
      { name: "Riven", arc: "Unstable → Critical Role" },
      { name: "Arkan", arc: "Control → Overreach" }
    ],
    hook: "The end has already started. There is no time left to find a different answer.",
    danger: "CRITICAL",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80"
  },
  {
    id: "book-7",
    number: 7,
    title: "The Eternal Aetherion",
    type: "Core",
    theme: "Balance is not forced — it is chosen.",
    coreIdea: "Reality is collapsing, and the final choice will decide how existence continues.",
    description: "All layers converge. Artifacts align into a larger structure. Arkan attempts to seize total control of the convergence. Adrian, Liora, and Riven must each play their essential roles. The final choice — control, destruction, or balance — decides the future of all existence. Reality does not return to what it was. It evolves into something entirely new.",
    fullSynopsis: "Book VII begins with reality almost gone. Layers merging everywhere. Scientific and magical worlds overlapping. Celestial energy visible at the surface level. Forbidden zones consuming entire regions. The Aetherion system, in its dying state, is attempting to reform — all layers converging back into the unified Core they once were. But convergence without alignment is annihilation. Arkan makes his final move: seizing control of the convergence to force artificial stability onto the entire system. Temporary order. Unnatural. Brittle. Built on force. Adrian, who now understands the full system — its origin, its fracture, its nature — realises that defeating Arkan is not enough. Disrupting forced control will make the system unstable again. But now that instability will be open — and real balance becomes possible. Liora connects to the Aetherion Core itself, becoming the living channel through which true alignment flows. Riven, who has spent the entire series embodying imbalance, must confront his own nature — standing between destruction and balance, his choice is as significant as Adrian's. The final decision: control gives false stability. Destruction collapses everything. Balance — uncertain, organic, chosen — is the only real path forward. Adrian chooses balance. Reality does not restore itself to what it was. It evolves. Becomes something new. Stable, but different. The Eternal Aetherion.",
    acts: [
      { title: "The Final State", events: ["Reality almost gone — layers merging everywhere", "Celestial energy visible at the physical surface", "The edge of annihilation"] },
      { title: "Convergence Begins", events: ["All layers begin converging into one system", "Artifacts start reacting to each other — forming a larger structure", "The Aetherion system is trying to reform"] },
      { title: "Final Conflict", events: ["Arkan seizes control of convergence — forces artificial stability", "Temporary order — unnatural and brittle", "Control is shown to be fundamentally flawed"] },
      { title: "Character Decisions", events: ["Adrian: understands the full system — control will destroy everything", "Liora: connects to the Aetherion Core — becomes the channel for balance", "Riven: stands between destruction and balance — his choice is essential"] },
      { title: "The Final Choice", events: ["Adrian disrupts forced control — the system becomes unstable but open", "Liora activates the Core — true alignment flows", "Reality does not restore — it evolves. The Eternal Aetherion."] }
    ],
    characterProgression: [
      { name: "Adrian", arc: "Observer → Understanding → Decision-Maker" },
      { name: "Liora", arc: "Guide → Heart of Balance" },
      { name: "Riven", arc: "Fracture → Resolved Role" },
      { name: "Arkan", arc: "Control → Failure" }
    ],
    hook: "At its heart, the story follows Adrian's journey from observation to understanding — as he learns that the world cannot be controlled. Only balanced.",
    danger: "OMEGA",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&q=80"
  },
  {
    id: "spinoff-1",
    title: "The Draven Legacy",
    type: "Spin-off",
    theme: "What created Riven?",
    coreIdea: "The emotional origin of the series' most tragic character.",
    description: "A character-driven prequel exploring Kael and Riven's shared history — the family legacy, the pressure, the loss, and the chain of events that fractured Riven's connection to Aetherion long before the main series begins.",
    fullSynopsis: "The Draven Legacy explores the backstory of Riven and Kael — the family history and emotional foundation that makes Riven's role in the main series so devastating. It follows the origin of Riven's instability: what he was before the fracture took hold, who Kael was to him, and what pressures, losses, and choices set the trajectory of both their lives. Understanding this story makes Books III through VII carry far greater emotional weight. This is not a story about power — it is a story about what happens to a person when they cannot hold themselves together.",
    acts: [
      { title: "The Legacy", events: ["The Draven family history revealed", "Kael's role as a stabilising force", "Riven's early signs of instability"] },
      { title: "The Fracture", events: ["A pivotal loss event", "Riven begins losing control", "Kael's attempts to help — and their limits"] },
      { title: "Before the Series", events: ["How Riven became what he is in Book I", "Kael's choice to continue watching", "The foundation of a tragedy"] }
    ],
    characterProgression: [
      { name: "Riven", arc: "Whole → Fractured" },
      { name: "Kael", arc: "Protector → Helpless Witness" }
    ],
    hook: "Before Riven was a warning sign — he was someone who didn't want to be broken.",
    danger: "MEDIUM",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
  },
  {
    id: "spinoff-2",
    title: "The First Epoch",
    type: "Spin-off",
    theme: "What was lost when the Core fractured?",
    coreIdea: "The ancient world before the fracture — when everything was whole.",
    description: "A lore-driven prequel set in the Unified Age — before the Great Fracture split the Aetherion Core into separated forces. Explores how the original system worked, how balance existed naturally, and what event shattered everything.",
    fullSynopsis: "The First Epoch is the mythology of the Aetherion universe. Set before the Great Fracture, it shows a world where science and magic were not separated — where Aetherion flowed as one unified system without the Veil, without clan separation, without imbalance. It explores what that world looked like, how the forces interacted, and what the fateful event was that shattered the Core. This spin-off gives Book IV its full emotional resonance — when Adrian discovers the truth about the origin in the Celestial Plane, readers of The First Epoch will understand exactly what was lost and why that loss matters.",
    acts: [
      { title: "The Unified Age", events: ["The world as it was meant to be", "All forces in natural balance", "No separation — science and magic as one system"] },
      { title: "The First Signs", events: ["Something disturbs the balance", "The earliest fractures form", "Those who tried to control versus those who warned"] },
      { title: "The Great Fracture", events: ["The Core breaks", "Forces separate", "Reality splits into layers — and nothing is ever the same"] }
    ],
    characterProgression: [
      { name: "Ancient Keepers", arc: "Guardians → Witnesses to Destruction" }
    ],
    hook: "The world of the Aetherion Cycle is not the original world. It is the broken version.",
    danger: "LOW",
    image: "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?w=800&q=80"
  },
  {
    id: "spinoff-3",
    title: "Project AETHER",
    type: "Spin-off",
    theme: "Why did humans try to control it?",
    coreIdea: "The science side of the story — told from inside.",
    description: "A system-driven story following Victor Voss and the formation of Project AETHER — from the first detection of structured energy beneath known science, through the early experiments, to the founding of the Severed faction and the moral compromises that made the main-series conflict inevitable.",
    fullSynopsis: "Project AETHER explores the villain's origin as something more complex than villainy. Victor Voss is not a monster — he is a scientist who detected something real and responded to it with the only tools he had. The story follows the formation of Project AETHER from its earliest days: the initial anomalies, the first successful experiments, the growing awareness that what they were touching was both more powerful and more dangerous than anything they understood. It follows the birth of the Severed as a faction — people who turned away from Aetherion and toward science. And it ends with the decisions that made Arkan Virel inevitable. By the time you return to the main series, the antagonist side of the conflict makes sense not as evil — but as a very human mistake made at enormous scale.",
    acts: [
      { title: "First Detection", events: ["Scientists notice structured energy behind unexplained events", "Project AETHER formally established", "Early optimism — this could change everything"] },
      { title: "Experiments Begin", events: ["First attempts to interact with Aetherion artificially", "Successes — and dangerous failures", "The cost of interference becomes visible"] },
      { title: "The Severed Form", events: ["Those who reject the natural system align with science", "Victor Voss makes choices that define the faction", "Arkan Virel appears — more calculating, more extreme"] }
    ],
    characterProgression: [
      { name: "Victor Voss", arc: "Idealist → Compromised Leader" },
      { name: "Arkan Virel", arc: "Researcher → Extremist" }
    ],
    hook: "They weren't wrong that Aetherion was real. They were wrong about what to do with it.",
    danger: "HIGH",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    id: "spinoff-4",
    title: "Chronis: Fractured Time",
    type: "Spin-off",
    theme: "What could have happened differently?",
    coreIdea: "The time layer destabilises — and alternate timelines become visible.",
    description: "A concept-driven exploration of the Temporal Layer — following the Chronis clan as they attempt to manage the collapsing time system during the events of Book VI. Explores alternate timelines, divergent outcomes, and the philosophical question of whether consequence can be escaped.",
    fullSynopsis: "Chronis: Fractured Time is set during the events of Book VI's temporal collapse — the period when time itself becomes unstable and begins looping, overlapping, and fragmenting. From the perspective of the Chronis clan — guardians of time and consequence — this spin-off explores what happens when their core function begins to fail. Alternate timelines become visible. Moments from the past and future overlap. Chronis members must navigate a temporal landscape that no longer follows rules. But threaded through the concept-driven story is a deeply philosophical question: if you could see every possible outcome, and understand that consequence cannot truly be escaped, what does it mean to still make a choice?",
    acts: [
      { title: "The Temporal Fracture", events: ["Time begins behaving unpredictably", "Loops, overlaps, and distortions become common", "The Chronis clan mobilises"] },
      { title: "Alternate Timelines", events: ["Different outcomes become visible", "Characters encounter versions of themselves", "The weight of consequence becomes tangible"] },
      { title: "The Question of Choice", events: ["Can consequence be escaped?", "Chronis must decide what to preserve", "Final philosophical resolution"] }
    ],
    characterProgression: [
      { name: "Chronis Keepers", arc: "Confident → Uncertain → Resolute" }
    ],
    hook: "Even if you can see every possible future — the choice still belongs to you.",
    danger: "CRITICAL",
    image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80"
  }
];
