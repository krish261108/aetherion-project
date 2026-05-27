---
name: WebGL in Replit preview
description: Three.js/R3F Canvas fails in Replit's headless preview (no GPU). Pre-detect before mounting.
---

The Replit screenshot/preview environment runs a headless Chromium without GPU access. WebGL context creation fails silently with "BindToCurrentSequence failed".

**Rule:** Always pre-detect WebGL availability before mounting `<Canvas>` from @react-three/fiber.

```tsx
function checkWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (!ctx) return false;
    (ctx as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch { return false; }
}

// In component:
const [webglOk] = useState(() => checkWebGL());
return webglOk ? <Canvas>...</Canvas> : <CSSFallback />;
```

**Why:** Without this guard, Three.js throws during WebGLRenderer construction (not a React lifecycle error), which bypasses error boundaries and triggers the Vite runtime error overlay. The check is synchronous and runs at component initialization before any render.

**How to apply:** Every time @react-three/fiber Canvas is used in this project, wrap with this pre-check + CSS fallback.
