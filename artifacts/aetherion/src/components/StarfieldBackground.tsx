import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number; speed: number;
  opacity: number; color: number; twinkle: number;
}
interface Nebula {
  x: number; y: number; r: number; hue: number; opacity: number;
}
interface Streak {
  x: number; y: number; len: number; speed: number;
  life: number; maxLife: number; angle: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const stars: Star[] = [];
    const nebulae: Nebula[] = [];
    const streaks: Streak[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nebulae.length = 0;
      // Cinematic volumetric nebulae — fewer, bigger, subtler
      const configs = [
        { hue: 220, ox: 0.15, oy: 0.2, r: 380, o: 0.022 },
        { hue: 270, ox: 0.82, oy: 0.35, r: 450, o: 0.018 },
        { hue: 200, ox: 0.5,  oy: 0.7,  r: 320, o: 0.016 },
        { hue: 250, ox: 0.3,  oy: 0.85, r: 280, o: 0.012 },
        { hue: 280, ox: 0.7,  oy: 0.1,  r: 260, o: 0.015 },
      ];
      configs.forEach((c) => {
        nebulae.push({ x: c.ox * canvas.width, y: c.oy * canvas.height, r: c.r, hue: c.hue, opacity: c.o });
      });
    };
    resize();
    window.addEventListener("resize", resize);

    // Stars: a lot of tiny ones, a few larger
    for (let i = 0; i < 340; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.pow(Math.random(), 2.5) * 1.8 + 0.2,
        speed: Math.random() * 0.08 + 0.005,
        opacity: Math.random() * 0.7 + 0.15,
        color: Math.floor(Math.random() * 5),
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    const starColors = [
      (o: number) => `rgba(220,235,255,${o})`,      // white-blue
      (o: number) => `rgba(125,249,255,${o})`,       // #7DF9FF electric cyan
      (o: number) => `rgba(168,85,247,${o * 0.8})`,  // #A855F7 violet
      (o: number) => `rgba(192,132,252,${o * 0.7})`, // #C084FC light violet
      (o: number) => `rgba(0,229,255,${o * 0.6})`,   // #00E5FF cyan
    ];

    let t = 0;
    let nextStreak = 4;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.002;

      // Deep space base gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#050816");
      bg.addColorStop(0.5, "#060a1c");
      bg.addColorStop(1, "#050816");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Volumetric nebulae
      nebulae.forEach((n) => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, `hsla(${n.hue},65%,55%,${n.opacity})`);
        g.addColorStop(0.5, `hsla(${n.hue},60%,40%,${n.opacity * 0.5})`);
        g.addColorStop(1, `hsla(${n.hue},60%,30%,0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Stars
      stars.forEach((s) => {
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
        const flicker = Math.sin(t * 1.2 + s.twinkle) * 0.15;
        const o = Math.min(1, Math.max(0, s.opacity + flicker));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = starColors[s.color](o);
        ctx.fill();
        // 4-point cross flare on bright stars
        if (s.r > 1.3 && o > 0.65) {
          ctx.save();
          ctx.strokeStyle = starColors[s.color](o * 0.25);
          ctx.lineWidth = 0.4;
          const fl = s.r * 3;
          ctx.beginPath();
          ctx.moveTo(s.x - fl, s.y); ctx.lineTo(s.x + fl, s.y);
          ctx.moveTo(s.x, s.y - fl); ctx.lineTo(s.x, s.y + fl);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Shooting stars
      if (t > nextStreak) {
        nextStreak = t + 3 + Math.random() * 8;
        streaks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.45,
          len: 100 + Math.random() * 180,
          speed: 7 + Math.random() * 9,
          life: 0, maxLife: 28 + Math.random() * 18,
          angle: Math.PI / 6 + Math.random() * (Math.PI / 5),
        });
      }
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;
        if (s.life > s.maxLife) { streaks.splice(i, 1); continue; }
        const a = (1 - s.life / s.maxLife) * 0.55;
        const g = ctx.createLinearGradient(
          s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len, s.x, s.y
        );
        g.addColorStop(0, `rgba(220,245,255,0)`);
        g.addColorStop(1, `rgba(220,245,255,${a})`);
        ctx.beginPath();
        ctx.moveTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
