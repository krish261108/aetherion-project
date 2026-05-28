import { useEffect, useRef } from "react";

export default function DepthParallax() {
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const lerpFactor = 0.055;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerpFactor;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerpFactor;

      const { x, y } = currentRef.current;

      const root = document.documentElement;
      root.style.setProperty("--parallax-x", `${x.toFixed(4)}`);
      root.style.setProperty("--parallax-y", `${y.toFixed(4)}`);
      root.style.setProperty("--parallax-tx", `${(x * 18).toFixed(2)}px`);
      root.style.setProperty("--parallax-ty", `${(y * 12).toFixed(2)}px`);
      root.style.setProperty("--parallax-rot-x", `${(-y * 4).toFixed(2)}deg`);
      root.style.setProperty("--parallax-rot-y", `${(x * 4).toFixed(2)}deg`);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}
