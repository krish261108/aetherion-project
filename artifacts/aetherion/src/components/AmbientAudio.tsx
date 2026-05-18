import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Catchy sci-fi/fantasy melodic hook in C minor pentatonic
// Tempo: 90 BPM  →  beat = 666ms, eighth note = 333ms
const BPM = 90;
const BEAT = 60 / BPM;
const EIGHTH = BEAT / 2;

// 16-note melodic motif (Hz): ascending/descending with fantasy flavour
const MELODY: [number, number][] = [
  [523.25, EIGHTH],     // C5  — hook start
  [622.25, EIGHTH],     // Eb5
  [783.99, EIGHTH * 1.5], // G5 — leap
  [698.46, EIGHTH * 0.5], // F5 — passing note
  [622.25, EIGHTH],     // Eb5
  [523.25, EIGHTH],     // C5
  [466.16, EIGHTH * 1.5], // Bb4 — fantasy colour
  [392.00, EIGHTH * 0.5], // G4
  [466.16, EIGHTH],     // Bb4
  [523.25, EIGHTH],     // C5
  [622.25, EIGHTH],     // Eb5
  [783.99, EIGHTH],     // G5
  [1046.5, EIGHTH * 2], // C6 — high climax
  [783.99, EIGHTH],     // G5
  [622.25, EIGHTH],     // Eb5
  [523.25, EIGHTH * 2], // C5 — resolve
];

// Chord pads: Cm7 = C, Eb, G, Bb
const PAD_NOTES = [130.81, 155.56, 196.0, 233.08];

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const kickIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const melodyIdxRef = useRef(0);

  const buildAudio = () => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // ── Master chain ──────────────────────────────────────────────
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 3);
    master.connect(ctx.destination);
    masterRef.current = master;

    // Reverb (convolution-like via delay network)
    const rev1 = ctx.createDelay(3);
    rev1.delayTime.value = 0.55;
    const rev2 = ctx.createDelay(3);
    rev2.delayTime.value = 0.38;
    const revFb1 = ctx.createGain();
    const revFb2 = ctx.createGain();
    revFb1.gain.value = 0.28;
    revFb2.gain.value = 0.22;
    const revFilter = ctx.createBiquadFilter();
    revFilter.type = "lowpass";
    revFilter.frequency.value = 1800;
    const revOut = ctx.createGain();
    revOut.gain.value = 0.35;
    rev1.connect(revFb1); revFb1.connect(revFilter); revFilter.connect(rev1);
    rev2.connect(revFb2); revFb2.connect(rev2);
    rev1.connect(revOut); rev2.connect(revOut);
    revOut.connect(master);

    // ── Bass drone ───────────────────────────────────────────────
    const bassFreqs = [65.41, 65.45, 65.38]; // C2 slight chorus
    bassFreqs.forEach((f) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = 300;
      o.type = "sawtooth";
      o.frequency.value = f;
      g.gain.value = 0.12;
      o.connect(filt); filt.connect(g); g.connect(master);
      o.start();
    });

    // Sub bass pulse
    const subPulse = ctx.createOscillator();
    const subGain = ctx.createGain();
    subPulse.type = "sine";
    subPulse.frequency.value = 32.7; // C1
    subGain.gain.value = 0.09;
    subPulse.connect(subGain);
    subGain.connect(master);
    subPulse.start();

    // ── Chord pads (Cm7) ─────────────────────────────────────────
    PAD_NOTES.forEach((freq, i) => {
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      const filt = ctx.createBiquadFilter();
      filt.type = "lowpass";
      filt.frequency.value = 2400;
      o1.type = "triangle";
      o2.type = "sine";
      o1.frequency.value = freq;
      o2.frequency.value = freq * (1 + 0.003 * (i % 2 === 0 ? 1 : -1));
      g.gain.value = 0.055 - i * 0.004;
      o1.connect(filt); o2.connect(filt);
      filt.connect(g); g.connect(master); g.connect(rev1);
      o1.start(); o2.start();

      // Slow chorus LFO
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.07 + i * 0.02;
      lfoG.gain.value = 0.8;
      lfo.connect(lfoG);
      lfoG.connect(o1.frequency);
      lfo.start();
    });

    // ── Shimmer high layer (sparkle) ──────────────────────────────
    [1046.5, 1318.5, 1567.98].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.value = 0.012;
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      lfo.frequency.value = 0.12 + i * 0.04;
      lfoG.gain.value = 0.01;
      lfo.connect(lfoG);
      lfoG.connect(g.gain);
      lfo.start();
      o.connect(g); g.connect(rev1);
      o.start();
    });

    // Master volume LFO (breathing)
    const breathLfo = ctx.createOscillator();
    const breathG = ctx.createGain();
    breathLfo.frequency.value = 0.05;
    breathG.gain.value = 0.04;
    breathLfo.connect(breathG);
    breathG.connect(master.gain);
    breathLfo.start();

    // ── Kick drum ─────────────────────────────────────────────────
    const playKick = () => {
      const c = ctxRef.current;
      if (!c) return;
      const t = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.08);
      gain.gain.setValueAtTime(0.55, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      osc.type = "sine";
      osc.connect(gain); gain.connect(master);
      osc.start(t); osc.stop(t + 0.25);
    };

    // ── Hi-hat ────────────────────────────────────────────────────
    const playHat = (open: boolean) => {
      const c = ctxRef.current;
      if (!c) return;
      const t = c.currentTime;
      const bufSize = c.sampleRate * 0.04;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      const filt = c.createBiquadFilter();
      filt.type = "highpass";
      filt.frequency.value = open ? 8000 : 12000;
      const g = c.createGain();
      g.gain.setValueAtTime(open ? 0.09 : 0.055, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.07 : 0.025));
      src.connect(filt); filt.connect(g); g.connect(master);
      src.start(t); src.stop(t + 0.08);
    };

    // ── Snare ─────────────────────────────────────────────────────
    const playSnare = () => {
      const c = ctxRef.current;
      if (!c) return;
      const t = c.currentTime;
      const bufSize = c.sampleRate * 0.15;
      const buf = c.createBuffer(1, bufSize, c.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = buf;
      const filt = c.createBiquadFilter();
      filt.type = "bandpass";
      filt.frequency.value = 2200;
      filt.Q.value = 0.6;
      const g = c.createGain();
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      const toneOsc = c.createOscillator();
      const toneG = c.createGain();
      toneOsc.frequency.value = 220;
      toneG.gain.setValueAtTime(0.09, t);
      toneG.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      src.connect(filt); filt.connect(g); g.connect(master);
      toneOsc.connect(toneG); toneG.connect(master);
      src.start(t); src.stop(t + 0.18);
      toneOsc.start(t); toneOsc.stop(t + 0.07);
    };

    // ── Melodic hook sequencer ────────────────────────────────────
    const scheduleNote = () => {
      const c = ctxRef.current;
      if (!c) return;
      const t = c.currentTime;
      const [freq, dur] = MELODY[melodyIdxRef.current % MELODY.length];
      melodyIdxRef.current++;

      // Lead melody — two oscillators for richness
      const osc1 = c.createOscillator();
      const osc2 = c.createOscillator();
      const g = c.createGain();
      const filt = c.createBiquadFilter();
      filt.type = "bandpass";
      filt.frequency.value = freq * 2;
      filt.Q.value = 1.5;

      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.value = freq;
      osc2.frequency.value = freq * 2.002; // octave up slight chorus
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.07, t + 0.025);
      g.gain.setValueAtTime(0.07, t + dur * 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.98);

      osc1.connect(filt); osc2.connect(g);
      filt.connect(g);
      g.connect(master);
      g.connect(rev1);
      osc1.start(t); osc1.stop(t + dur);
      osc2.start(t); osc2.stop(t + dur);

      // Schedule next note
      schedulerRef.current = setTimeout(scheduleNote, dur * 1000);
    };

    // ── Rhythm pattern (4-beat loop at 90bpm) ─────────────────────
    let beatCount = 0;
    kickIntervalRef.current = setInterval(() => {
      const beat = beatCount % 4;
      if (beat === 0 || beat === 2) playKick();
      if (beat === 1 || beat === 3) playSnare();
      beatCount++;
    }, BEAT * 1000);

    let hatCount = 0;
    hatIntervalRef.current = setInterval(() => {
      playHat(hatCount % 4 === 2);
      hatCount++;
    }, EIGHTH * 1000);

    // Start melody after 1 bar
    schedulerRef.current = setTimeout(scheduleNote, BEAT * 4 * 1000);
  };

  const toggle = () => {
    if (!started) {
      buildAudio();
      setStarted(true);
      setPlaying(true);
    } else {
      const ctx = ctxRef.current;
      const master = masterRef.current;
      if (!ctx || !master) return;
      if (playing) {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      } else {
        master.gain.linearRampToValueAtTime(0.38, ctx.currentTime + 1.2);
      }
      setPlaying((p) => !p);
    }
  };

  useEffect(() => {
    return () => {
      if (schedulerRef.current) clearTimeout(schedulerRef.current);
      if (kickIntervalRef.current) clearInterval(kickIntervalRef.current);
      if (hatIntervalRef.current) clearInterval(hatIntervalRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      title={playing ? "Mute ambient music" : "Play ambient music"}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(3,7,18,0.92)",
        border: `1px solid ${playing ? "rgba(0,212,255,0.55)" : "rgba(255,255,255,0.12)"}`,
        boxShadow: playing
          ? "0 0 28px rgba(0,212,255,0.22), 0 0 6px rgba(139,92,246,0.15)"
          : "none",
        backdropFilter: "blur(14px)",
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
    >
      {playing ? (
        <Volume2 size={16} className="text-cyan-400" />
      ) : (
        <VolumeX size={16} className="text-slate-500" />
      )}

      {playing && (
        <>
          {[1.55, 2.1, 2.7].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{ border: `1px solid rgba(0,212,255,${0.35 - i * 0.09})` }}
              animate={{ scale: [1, scale], opacity: [0.6, 0] }}
              transition={{
                duration: 1.6 + i * 0.3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.45,
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
}
