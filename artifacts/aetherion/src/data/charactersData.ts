export interface Character {
  id: string;
  name: string;
  represents: string;
  role: string;
  description: string;
  fullBio: string;
  personality: string[];
  abilities: string[];
  arc: string;
  arcStages: string[];
  clan: string;
  status: string;
  quote?: string;
  keyRelationships: { name: string; dynamic: string }[];
  image: string;
}

export const characters: Character[] = [
  {
    id: "char-1",
    name: "Adrian",
    represents: "Understanding",
    role: "Protagonist — Bridge Between Worlds",
    description: "The boy who sees what others ignore. Highly observant, analytically minded, and increasingly unable to accept a world that does not add up. He is not special because of power — he is special because he refuses to stop asking why.",
    fullBio: "Adrian begins the series as an outsider in his own world — not because he is rejected, but because he perceives reality differently. While others dismiss small irregularities as noise, Adrian tracks them, records them, and eventually proves to himself that they are not random. They are a pattern. This analytical approach to reality is both his greatest strength and his greatest burden. When the Veil fractures and he crosses into the magical world, he becomes the first person in a long time to exist between both realities without fully belonging to either. He does not have the natural Aetherion connection of a Pureblood, nor the technological framework of the Severed. He has understanding — and gradually, that becomes the only thing that matters. Over the course of seven books, Adrian transforms from a confused observer into the person who must make the most important choice in the history of all reality. Not because he is the strongest. Because he is the only one who truly understands.",
    personality: ["Deeply observant — notices what others ignore", "Analytical — seeks patterns and systems over instinct", "Reluctant — takes action only when avoidance is impossible", "Carries responsibility heavily — does not let go of consequences", "Bridge-minded — sees merit in opposing perspectives simultaneously"],
    abilities: ["Exceptional pattern recognition across both worlds", "Ability to perceive Aetherion without clan alignment", "Functions as a resonance point between forces", "Understands the full system without being defined by any part of it"],
    arc: "Confused → Aware → Understanding → Responsibility → Clarity → Struggle → Decision",
    arcStages: [
      "Book I: Confused — aware something is wrong, no framework to explain it",
      "Book II: Aware — understands the system exists, begins learning its rules",
      "Book III: Understanding — sees the full picture of balance and imbalance",
      "Book IV: Responsibility — knows the truth and what it demands",
      "Book V: Struggle — fights the situation instead of the system",
      "Book VI: Searching — realises fighting is not the answer",
      "Book VII: Decision — makes the only choice that matters"
    ],
    clan: "None — The Bridge",
    status: "Active",
    quote: "I'm not trying to fix it. I'm trying to understand it. Those aren't the same thing.",
    keyRelationships: [
      { name: "Liora", dynamic: "Guide and grounding force — she shows him the system; he interprets it" },
      { name: "Riven", dynamic: "Mirror — Riven is what Adrian fears he could become if understanding fails" },
      { name: "Victor", dynamic: "Warning — a man who started with good intentions and chose control" },
      { name: "Arkan", dynamic: "Opposition — the embodiment of everything Adrian must reject" }
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
  },
  {
    id: "char-2",
    name: "Liora Nyxara",
    represents: "Balance",
    role: "Guide — Heart of the Aetherion System",
    description: "Calm, empathetic, and deeply connected to Aetherion. She is not passive — she actively maintains the balance of a system that is trying to fall apart. She represents what reality was supposed to be: not controlled, not destroyed, but understood and sustained.",
    fullBio: "Liora Nyxara carries the weight of balance in a world that is losing it. From the Solaryn clan — the guardians of life and preservation — she has spent her entire life not fighting, but holding. She understands the Aetherion system at a level few others do, and that understanding comes with a cost: she sees how badly everything is failing, and she knows that the burden of preventing collapse may ultimately fall on her. When she meets Adrian, she recognises in him something she has not encountered before — someone from the scientific world who does not want to control Aetherion, but to understand it. She becomes his guide, his anchor, and eventually his partner in the final act of the series. Her role culminates in Book VII, when she connects directly to the Aetherion Core — becoming the living channel through which true alignment flows. She does not save reality by fighting for it. She saves it by embodying what it should have always been.",
    personality: ["Calm under pressure — unshaken even when everything around her fails", "Empathetic — deeply attuned to both people and forces", "Carrying — holds burdens without showing their weight", "Protective — guards life as a principle, not just a reflex", "Honest — never withholds truth, even when truth is painful"],
    abilities: ["Natural Aetherion alignment — no effort required to connect", "Healing and stabilisation of damaged energy", "Perception of imbalance before it becomes visible", "Ability to connect directly to the Aetherion Core"],
    arc: "Guide → Burdened Protector → Heart of Balance",
    arcStages: [
      "Book I: Guide — introduces Adrian to the system with calm confidence",
      "Book II: Protector — begins carrying the weight of wider imbalance",
      "Book III: Burdened — realises balance is failing faster than she can maintain",
      "Book IV: Key — understands her role in the larger system",
      "Books V-VI: Struggling — on the edge of losing her ability to hold everything together",
      "Book VII: Heart of Balance — activates the Core and becomes the solution"
    ],
    clan: "Solaryn",
    status: "Active",
    quote: "Balance isn't something you achieve. It's something you choose to keep choosing.",
    keyRelationships: [
      { name: "Adrian", dynamic: "Partnership — she guides; he understands; together they complete the picture" },
      { name: "Riven", dynamic: "Compassion — she sees his fracture as a wound, not a threat" },
      { name: "Solaryn Clan", dynamic: "Responsibility — she carries the expectations of her entire lineage" }
    ],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
  },
  {
    id: "char-3",
    name: "Riven",
    represents: "Imbalance",
    role: "The Living Fracture — Embodiment of What the System Creates When It Breaks",
    description: "Riven is not a villain. He is a consequence. Connected to the Void by a fracture that runs through him at the level of his Aetherion alignment, he is a living example of what imbalance does to a person — and ultimately, to a world.",
    fullBio: "Riven represents the most honest thing the Aetherion universe has to say: that imbalance does not choose its victims. It creates them. His instability is not a character flaw or a moral failure — it is a direct result of the fracture in the Aetherion Core, manifested through the broken state of his alignment to the Void. He is connected to Nytheris by nature but unable to control that connection, resulting in someone who sometimes helps, sometimes endangers, and is always on the edge of losing himself completely. His backstory — explored in the spin-off The Draven Legacy — reveals who he was before the fracture took hold: someone who did not want to be this. His relationship with Kael is the emotional core of that story, and understanding it makes every scene with Riven in the main series carry far greater weight. In Book VII, his role reaches its resolution — standing between destruction and balance, his choice becomes as significant as Adrian's. What he decides defines whether the fracture inside him has destroyed him, or whether it was always, ultimately, something that could be aligned.",
    personality: ["Intense — exists at the edge of control at all times", "Conflicted — knows what he might do, and fights against it", "Isolated — cannot allow closeness without risking harm", "Honest in pain — never pretends to be something he is not", "Capable of choice — even when the system inside him says otherwise"],
    abilities: ["Void energy interaction — powerful but destabilising", "Resistance to standard Aetherion forces", "Unpredictable energy release", "In final resolution: ability to stand between forces as a bridge point"],
    arc: "Mysterious → Warning Sign → Central Conflict → Resolved Role",
    arcStages: [
      "Book I: Mysterious — a presence that doesn't fit",
      "Book II: Warning Sign — shows what imbalance creates",
      "Book III: Central Conflict — his instability becomes a narrative driver",
      "Book IV: Embodiment of Fracture — revealed as a direct result of the Core's break",
      "Books V-VI: Dangerous Force — almost entirely consumed",
      "Book VII: Resolved Role — stands between destruction and balance"
    ],
    clan: "Nytheris (Fractured)",
    status: "Unstable",
    quote: "I'm not trying to hurt anyone. I just can't always stop it.",
    keyRelationships: [
      { name: "Kael", dynamic: "Family — the person who tried to hold Riven together and couldn't" },
      { name: "Adrian", dynamic: "Mirror — what could happen if understanding is lost" },
      { name: "Liora", dynamic: "Compassion — she is one of few who sees him as a wound, not a threat" }
    ],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
  },
  {
    id: "char-4",
    name: "Sophie",
    represents: "Humanity",
    role: "The Grounded Perspective — What Ordinary People Are Risking",
    description: "Sophie represents the ordinary world that the extraordinary events of the series constantly threaten to consume. Practical, loyal, and grounded, she is the constant reminder that what is at stake is not abstract — it is people.",
    fullBio: "Sophie does not have a grand destiny. She does not have a clan alignment or a connection to Aetherion. She has clarity of judgment, practical intelligence, and the kind of loyalty that does not bend under pressure. As someone without extraordinary power, she represents the majority of people in both worlds: people who live in the consequences of decisions made by those more connected to the system. Her arc — from passive observer to active protector — traces the journey of someone who begins by watching and ends by choosing to act, not because she has developed power, but because she has developed understanding. She grounds the story in human stakes. She is the reason the abstract philosophical conflict matters at a personal level.",
    personality: ["Practical — cuts through complexity to what is real and immediate", "Loyal — does not abandon people, even when the situation calls for it", "Skeptical — requires evidence before belief, but changes when evidence arrives", "Perceptive — reads people with precision", "Grounded — not swayed by grandeur or ideology"],
    abilities: ["Exceptional situational awareness", "Resistance to Aetherion-based influence as a Null", "Strategic thinking without the distortion of power", "Emotional anchor for others"],
    arc: "Observer → Grounded Witness → Active Protector",
    arcStages: [
      "Book I: Observer — watches Adrian change with concern",
      "Books II-III: Witness — understands the stakes without being part of the system",
      "Books IV-V: Protector — begins acting to protect those she cares about",
      "Books VI-VII: Essential — her perspective grounds the final choices in human meaning"
    ],
    clan: "None",
    status: "Active",
    quote: "I don't need to understand all of it. I just need to know who I'm protecting.",
    keyRelationships: [
      { name: "Adrian", dynamic: "Grounding force — she keeps him connected to what is real" },
      { name: "Elena", dynamic: "Contrast — Elena pursues knowledge; Sophie pursues protection" }
    ],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80"
  },
  {
    id: "char-5",
    name: "Kael",
    represents: "Discipline and Legacy",
    role: "Experienced Operative — Riven's Keeper and Emotional Anchor",
    description: "Calm, strict, experienced. Kael carries a discipline forged by legacy and hardened by what he has witnessed. His connection to Riven is the emotional core of The Draven Legacy spin-off, and his presence in the main series is defined by what he tried to prevent.",
    fullBio: "Kael is what discipline looks like after it has been tested by something it could not contain. Aligned with the Valekar clan — war, conflict, action — he has spent his life believing that control and precision are sufficient tools for any challenge. His history with Riven is the evidence that they are not always enough. In the main series, Kael operates as an experienced force — someone who understands the system, has dealt with its failures, and carries the weight of having been unable to prevent one of the most tragic outcomes in his personal history. His arc is about learning the limit of discipline: what it can hold, what it cannot, and what that means for how you carry yourself afterward.",
    personality: ["Strict — holds himself and others to high standards", "Controlled — rarely displays emotion openly", "Experienced — has seen too much to be surprised by most things", "Loyal to duty before loyalty to people", "Carrying quiet grief — he has lost something he could not fix"],
    abilities: ["Combat and tactical precision", "Advanced Valekar energy interaction", "Strategic coordination across complex situations", "Ability to operate in high-stakes environments without deterioration"],
    arc: "Controller → Learns Limits",
    arcStages: [
      "Pre-series: The Draven Legacy — tries to hold Riven together, fails",
      "Books I-II: Experienced operative — carries the weight of past failure",
      "Books III-IV: Confronts the limits of discipline",
      "Books V-VII: Adapts — learns that some things require balance, not control"
    ],
    clan: "Valekar",
    status: "Active",
    quote: "Discipline is not cruelty. It is the only thing that holds when everything else breaks.",
    keyRelationships: [
      { name: "Riven", dynamic: "Family — the person he tried to save and couldn't fully reach" },
      { name: "Adrian", dynamic: "Complex respect — discipline meets understanding" }
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
  },
  {
    id: "char-6",
    name: "Elena",
    represents: "Knowledge",
    role: "Researcher — The Scientific World's Path to Understanding",
    description: "Curious, analytical, and ambitious. Elena works within the Project AETHER system but is drawn toward understanding rather than control. She represents the scientific world's best possibility — the path not taken by Victor or Arkan.",
    fullBio: "Elena exists at the intersection of the scientific and magical worlds in the same way Adrian does — but she arrives there from the opposite direction. Where Adrian begins in the scientific world and discovers magic, Elena begins inside Project AETHER and gradually discovers that what they are studying cannot be approached the way science typically approaches the unknown. Her Nerathis alignment — mind, perception, awareness — gives her the ability to understand systems that others cannot perceive, making her both valuable to Project AETHER and ultimately at odds with its methods. Her arc — seeker to someone who chooses understanding over control — mirrors the entire philosophical question of the series: when you are capable of taking power, do you? Her answer becomes one of the series' most important secondary arguments.",
    personality: ["Intensely curious — cannot leave a question unanswered", "Analytically rigorous — does not accept incomplete reasoning", "Ambitious — wants to know everything, not to control it", "Conflicted — sees the damage Project AETHER causes and stays anyway, until she doesn't", "Precise — measures words as carefully as data"],
    abilities: ["Advanced perception through Nerathis alignment", "Systems analysis across both scientific and Aetherion frameworks", "Ability to interface with artifacts through understanding rather than force", "Pattern recognition rivalling Adrian's"],
    arc: "Seeker → Chooses Understanding Over Control",
    arcStages: [
      "Books I-II: Inside Project AETHER — brilliant, driven, not yet questioning",
      "Book III: First doubts — sees damage that doesn't match the stated mission",
      "Book IV: Encounters the truth — understands what the Core fracture means",
      "Books V-VII: Breaks from the control approach — aligns with understanding"
    ],
    clan: "Nerathis",
    status: "Active",
    quote: "We keep calling it a resource. It's not a resource. It's a system. And we're inside it.",
    keyRelationships: [
      { name: "Victor", dynamic: "Mentor turned cautionary tale — she sees what he became" },
      { name: "Adrian", dynamic: "Parallel path — two people reaching understanding from opposite directions" },
      { name: "Arkan", dynamic: "Opposition — he represents the endpoint she is determined not to reach" }
    ],
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80"
  },
  {
    id: "char-7",
    name: "Victor Voss",
    represents: "Control with Good Intention",
    role: "Early Project AETHER Leader — The Cautionary Beginning",
    description: "Victor Voss is not evil. He is the most dangerous thing in the universe: a good person who chose the wrong method. Driven by the genuine desire to protect humanity, he built the system that eventually threatened everything.",
    fullBio: "Victor Voss built Project AETHER from the belief that what he did not understand could kill him — and he was right. Aetherion is dangerous. Uncontrolled Void energy is dangerous. Reality fracturing is dangerous. His error was not in recognising the danger — it was in believing that control was the solution to it. The Severed spin-off explores his formation: a scientist who detected real structured energy beneath the known world and responded to it with the only framework he had. His intentions were protective. His methods were the problem. By the time the main series begins, Victor has been overtaken by his own project — replaced in influence, if not in position, by the more extreme Dr. Arkan Virel. His arc is about watching something you built become something you cannot stop. The most painful kind of consequence.",
    personality: ["Driven by protection, not ambition — genuinely believes control keeps people safe", "Intelligent but bounded — cannot imagine a solution outside his framework", "Gradually losing grip — the project moves beyond him", "Haunted — knows at some level that something is wrong", "Cannot admit the foundational error — that would require dismantling everything"],
    abilities: ["Scientific analysis and Aetherion energy measurement", "Artificial Aetherion interaction through Severed technology", "Organisational and strategic leadership"],
    arc: "Idealistic Protector → Overtaken By His Own Creation",
    arcStages: [
      "Pre-series: Project AETHER spin-off — builds the project from genuine protective intent",
      "Books I-II: Background force — his project is active but he is not yet central",
      "Books III-IV: Active influence — the damage his project causes becomes visible",
      "Book V: Losing control — Arkan supersedes him",
      "Books VI-VII: A man watching what he built destroy what he tried to protect"
    ],
    clan: "Severed",
    status: "Antagonist",
    quote: "If we don't control it, it will destroy us.",
    keyRelationships: [
      { name: "Arkan", dynamic: "Creator and surpassed — Victor made the project; Arkan weaponised it" },
      { name: "Elena", dynamic: "The path not taken — she reaches understanding; he never does" }
    ],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
  },
  {
    id: "char-8",
    name: "Dr. Arkan Virel",
    represents: "Absolute Control",
    role: "Primary Antagonist — The Final Expression of the Control Ideology",
    description: "Arkan Virel is not motivated by cruelty. He is motivated by a belief in order — absolute, engineered, permanent order. He may be the most dangerous person in the series precisely because his logic is internally consistent. He is simply wrong about what reality is.",
    fullBio: "Dr. Arkan Virel represents the endpoint of the control ideology that runs through the antagonist side of the Aetherion Cycle. He is not Victor Voss's mistake grown large — he is the natural conclusion of the belief that reality can be forced into stability. More calculated, more extreme, and ultimately more dangerous than Victor, Arkan fully understands what Aetherion is. He has read the data, processed the evidence, and reached a conclusion: the system cannot balance itself, so someone must balance it artificially. Him. The problem is that his understanding of the system is correct in many of its details and catastrophically wrong in its core assumption. Reality is not a machine to be engineered. Balance cannot be imposed. When he forces convergence in Books VI and VII, he temporarily creates order — and accelerates the final collapse. He is the clearest possible argument that knowing a system and understanding it are not the same thing.",
    personality: ["Calculating — every action is the result of deliberate reasoning", "Patient — willing to wait years for the right moment", "Genuinely believes he is saving reality — and this makes him terrifying", "Cannot imagine being wrong — his framework has no room for it", "Operates without cruelty but without mercy — people are variables in an equation"],
    abilities: ["Master-level artificial Aetherion manipulation", "Forced convergence — temporary artificial stability at scale", "Complete analysis of the artifact network", "Command of the full Project AETHER system"],
    arc: "Researcher → Extreme Force → Failure",
    arcStages: [
      "Pre-series: Project AETHER spin-off — emerges as more extreme than Victor",
      "Book V: Dominant force — supersedes Victor in influence and method",
      "Book VI: Forcing convergence — false solutions that accelerate real collapse",
      "Book VII: Final antagonist — his control is disrupted and the real resolution begins"
    ],
    clan: "Severed",
    status: "Primary Antagonist",
    quote: "Balance is unreliable. Stability must be engineered. I am simply willing to do the engineering.",
    keyRelationships: [
      { name: "Victor", dynamic: "Predecessor — Arkan took what Victor built and pushed it past its limits" },
      { name: "Adrian", dynamic: "Final opposition — understanding versus forced control" },
      { name: "Liora", dynamic: "Ideological opposite — she embodies what he believes cannot exist naturally" }
    ],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&q=80"
  }
];
