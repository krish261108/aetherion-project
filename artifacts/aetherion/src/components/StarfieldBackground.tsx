import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number; r: number; speed: number;
  opacity: number; color: number; twinkleOffset: number;
}
interface Particle {
  x: number; y: number; vx: number; vy: number; life: number; maxLife: number; hue: number;
}
interface Nebula {
  x: number; y: number; r: number; hue: number; opacity: number;
}
interface Streak {
  x: number; y: number; len: number; speed: number; life: number; maxLife: number; angle: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const stars: Star[] = [];
    const particles: Particle[] = [];
    const nebulae: Nebula[] = [];
    const streaks: Streak[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nebulae.length = 0;
      for (let i = 0; i < 5; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 150 + Math.random() * 300,
          hue: [195, 260, 280, 200, 40][i],
          opacity: 0.015 + Math.random() * 0.02,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.6 + 0.2,
        speed: Math.random() * 0.12 + 0.01,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.floor(Math.random() * 4),
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    const starColors = [
      (o: number) => `rgba(200,230,255,${o})`,
      (o: number) => `rgba(0,212,255,${o})`,
      (o: number) => `rgba(167,139,250,${o})`,
      (o: number) => `rgba(251,191,36,${o * 0.6})`,
    ];

    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        life: Math.random() * 300,
        maxLife: 250 + Math.random() * 300,
        hue: [195, 260, 45][Math.floor(Math.random() * 3)],
      });
    }

    let t = 0;
    let nextStreak = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.003;

      // Nebulae
      nebulae.forEach((n) => {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `hsla(${n.hue},70%,60%,${n.opacity})`);
        grad.addColorStop(1, `hsla(${n.hue},60%,40%,0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Holographic grid (very faint)
      ctx.save();
      ctx.strokeStyle = "rgba(0,212,255,0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      ctx.restore();

      // Stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        const flicker = Math.sin(t * 1.5 + star.twinkleOffset) * 0.18;
        const o = Math.min(1, Math.max(0, star.opacity + flicker));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = starColors[star.color](o);
        ctx.fill();
        // Small cross on bright stars
        if (star.r > 1.2 && o > 0.7) {
          ctx.save();
          ctx.strokeStyle = starColors[star.color](o * 0.3);
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.moveTo(star.x - 4, star.y); ctx.lineTo(star.x + 4, star.y);
          ctx.moveTo(star.x, star.y - 4); ctx.lineTo(star.x, star.y + 4);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Shooting star streaks
      if (t > nextStreak) {
        nextStreak = t + 2 + Math.random() * 6;
        streaks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          len: 80 + Math.random() * 160,
          speed: 6 + Math.random() * 8,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          angle: (Math.PI / 6) + Math.random() * (Math.PI / 6),
        });
      }
      for (let i = streaks.length - 1; i >= 0; i--) {
        const s = streaks[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life++;
        if (s.life > s.maxLife) { streaks.splice(i, 1); continue; }
        const a = (1 - s.life / s.maxLife) * 0.6;
        const grad = ctx.createLinearGradient(
          s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len,
          s.x, s.y
        );
        grad.addColorStop(0, `rgba(200,240,255,0)`);
        grad.addColorStop(1, `rgba(200,240,255,${a})`);
        ctx.beginPath();
        ctx.moveTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Floating particles
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.life++;
        if (p.life > p.maxLife) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.life = 0;
        }
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${alpha})`;
        ctx.fill();
      });

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
