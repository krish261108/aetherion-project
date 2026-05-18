import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noteIdxRef = useRef(0);

  const NOTES = [130.81, 155.56, 174.61, 196.0, 220.0, 261.63, 293.66, 311.13];

  const buildAudio = () => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 3);
    master.connect(ctx.destination);
    masterRef.current = master;

    const delay = ctx.createDelay(2.5);
    delay.delayTime.value = 0.42;
    const fbGain = ctx.createGain();
    fbGain.gain.value = 0.38;
    const fbFilter = ctx.createBiquadFilter();
    fbFilter.type = "lowpass";
    fbFilter.frequency.value = 900;
    delay.connect(fbGain);
    fbGain.connect(fbFilter);
    fbFilter.connect(delay);
    delay.connect(master);

    const lowFilter = ctx.createBiquadFilter();
    lowFilter.type = "lowshelf";
    lowFilter.frequency.value = 200;
    lowFilter.gain.value = 6;
    lowFilter.connect(master);

    [55, 55.3, 54.7, 82.5, 110].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = i < 3 ? "sine" : "triangle";
      osc.frequency.value = freq;
      g.gain.value = i < 3 ? 0.15 : 0.05;
      osc.connect(g);
      g.connect(lowFilter);
      osc.start();
    });

    [220, 221.2, 218.8, 330, 330.7, 440, 440.5].forEach((freq) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      g.gain.value = 0.035;
      osc.connect(g);
      g.connect(master);
      g.connect(delay);
      osc.start();
    });

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuffer.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 3000;
    noiseFilter.Q.value = 0.5;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.006;
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start();

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.06;
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    lfo.start();

    const lfo2 = ctx.createOscillator();
    const lfo2Gain = ctx.createGain();
    lfo2.frequency.value = 0.15;
    lfo2Gain.gain.value = 0.015;
    lfo2.connect(lfo2Gain);
    lfo2Gain.connect(noiseGain.gain);
    lfo2.start();

    const scheduleArp = () => {
      const c = ctxRef.current;
      if (!c) return;
      const freq = NOTES[noteIdxRef.current % NOTES.length];
      noteIdxRef.current++;

      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, c.currentTime);
      g.gain.linearRampToValueAtTime(0.055, c.currentTime + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 2.2);
      osc.connect(g);
      g.connect(delay);
      osc.start();
      osc.stop(c.currentTime + 2.2);

      if (noteIdxRef.current % 5 === 0) {
        const osc2 = c.createOscillator();
        const g2 = c.createGain();
        osc2.type = "triangle";
        osc2.frequency.value = freq * 2;
        g2.gain.setValueAtTime(0, c.currentTime);
        g2.gain.linearRampToValueAtTime(0.025, c.currentTime + 0.08);
        g2.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.2);
        osc2.connect(g2);
        g2.connect(delay);
        osc2.start();
        osc2.stop(c.currentTime + 1.2);
      }
    };

    scheduleArp();
    schedulerRef.current = setInterval(scheduleArp, 900);
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
        master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.5);
      }
      setPlaying((p) => !p);
    }
  };

  useEffect(() => {
    return () => {
      if (schedulerRef.current) clearInterval(schedulerRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      title={playing ? "Mute ambient music" : "Play ambient music"}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(3,7,18,0.92)",
        border: `1px solid ${playing ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.12)"}`,
        boxShadow: playing ? "0 0 24px rgba(0,212,255,0.18)" : "none",
        backdropFilter: "blur(12px)",
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
    >
      {playing ? (
        <Volume2 size={15} className="text-cyan-400" />
      ) : (
        <VolumeX size={15} className="text-slate-500" />
      )}

      {playing && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(0,212,255,0.35)" }}
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(0,212,255,0.2)" }}
            animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
        </>
      )}
    </motion.button>
  );
}
