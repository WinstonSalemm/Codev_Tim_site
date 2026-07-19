"use client";

import { useEffect, useRef } from "react";
import { readMeshPalette } from "./mesh-palette";

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_COUNT_MIN = 55;
const NODE_COUNT_MAX = 110;
const NODE_AREA_DIVISOR = 14_000;

const CONN_DIST = 160;
const CONN_DIST_SQ = CONN_DIST * CONN_DIST;

const MOUSE_DIST = 220;
const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
const MOUSE_REPULSE = 0.013;
const MOUSE_ATTRACT_NEAR = 0.004;

const MAX_SPEED = 1.1;
const SPEED_DAMP = 0.998;

const GLOW_RADIUS = 300;
const GRID_CELL = CONN_DIST;

// ─── Types ────────────────────────────────────────────────────────────────────

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number; // 0..1, closer = 1
  phase: number; // pulse phase offset
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function resolveNodeCount(width: number, height: number, density = 1): number {
  const area = width * height;
  const base = Math.min(
    NODE_COUNT_MAX,
    Math.max(NODE_COUNT_MIN, Math.round(area / NODE_AREA_DIVISOR))
  );
  return Math.max(28, Math.round(base * density));
}

function createNodes(
  count: number,
  width: number,
  height: number,
  clustered = false
): Node[] {
  const clusterSeeds = clustered
    ? Array.from({ length: 4 }, () => ({
        x: width * (0.12 + Math.random() * 0.76),
        y: height * (0.1 + Math.random() * 0.8),
      }))
    : null;

  return Array.from({ length: count }, (_, index) => {
    const depth = 0.3 + Math.random() * 0.7;
    let x = Math.random() * width;
    let y = Math.random() * height;

    // Prefer peripheral clusters so the content column stays clearer
    if (clusterSeeds && Math.random() < 0.62) {
      const seed = clusterSeeds[index % clusterSeeds.length];
      if (seed) {
        const spread = Math.min(width, height) * 0.16;
        x = Math.min(
          width,
          Math.max(0, seed.x + (Math.random() - 0.5) * spread)
        );
        y = Math.min(
          height,
          Math.max(0, seed.y + (Math.random() - 0.5) * spread)
        );
      }
    }

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.28 * depth,
      vy: (Math.random() - 0.5) * 0.28 * depth,
      r: clustered ? 0.85 + depth * 1.85 : 0.6 + depth * 1.6,
      depth,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function centerClarity(
  x: number,
  y: number,
  width: number,
  height: number,
  enabled: boolean
): number {
  if (!enabled) return 1;
  const cx = width * 0.5;
  const cy = height * 0.38;
  const dx = (x - cx) / (width * 0.28);
  const dy = (y - cy) / (height * 0.34);
  const d = Math.sqrt(dx * dx + dy * dy);
  return Math.min(1, 0.28 + d * 0.72);
}

function distSq(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function cellKey(col: number, row: number): number {
  return col * 100_000 + row;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const stateRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    nodes: [] as Node[],
    mouse: { x: -9_999, y: -9_999, tx: -9_999, ty: -9_999 },
    t: 0,
    reducedMotion: false,
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const maybeGlow = glowRef.current;
    if (!canvas || !maybeGlow) return;
    const glowEl: HTMLDivElement = maybeGlow;

    const maybeCtx = canvas.getContext("2d", { alpha: true });
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const state = stateRef.current;
    state.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      const palette = readMeshPalette();
      const isLight = document.documentElement.dataset.theme === "light";
      state.nodes = createNodes(
        resolveNodeCount(state.width, state.height, palette.density),
        state.width,
        state.height,
        isLight
      );
    };

    // ── Mouse ────────────────────────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      state.mouse.tx = e.clientX;
      state.mouse.ty = e.clientY;
    };
    const onPointerLeave = () => {
      state.mouse.tx = -9_999;
      state.mouse.ty = -9_999;
    };

    // ── Visibility ──────────────────────────────────────────────────────────
    const onVisibility = () => {
      state.visible = document.visibilityState === "visible";
      if (state.visible && !state.reducedMotion) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-theme") {
          resize();
          if (state.reducedMotion) renderStatic();
          break;
        }
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ── Static render (reduced-motion) ──────────────────────────────────────
    function renderStatic() {
      const { width, height, nodes } = state;
      const palette = readMeshPalette();
      const isLight = document.documentElement.dataset.theme === "light";
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = `rgb(${palette.lineR},${palette.lineG},${palette.lineB})`;
      ctx.lineWidth = isLight ? 0.55 : 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (!b) continue;
          const dsq = distSq(a.x, a.y, b.x, b.y);
          if (dsq >= CONN_DIST_SQ) continue;
          const t = 1 - Math.sqrt(dsq) / CONN_DIST;
          const midX = (a.x + b.x) * 0.5;
          const midY = (a.y + b.y) * 0.5;
          const clarity = centerClarity(midX, midY, width, height, isLight);
          ctx.globalAlpha =
            t * 0.12 * ((a.depth + b.depth) / 2) * palette.lineAlpha * clarity;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgb(${palette.r},${palette.g},${palette.b})`;
      for (const n of nodes) {
        const clarity = centerClarity(n.x, n.y, width, height, isLight);
        ctx.globalAlpha = 0.3 * n.depth * palette.nodeAlpha * clarity;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // ── Animated render ──────────────────────────────────────────────────────
    function draw() {
      if (!state.visible) return;

      if (state.reducedMotion) {
        renderStatic();
        return;
      }

      const { width, height, nodes, mouse } = state;
      const palette = readMeshPalette();
      const isLight = document.documentElement.dataset.theme === "light";
      const { r: meshR, g: meshG, b: meshB } = palette;
      state.t += 0.008;

      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      const hasMouse = mouse.tx > -9000;
      glowEl.style.transform = hasMouse
        ? `translate3d(${mouse.x - GLOW_RADIUS}px,${mouse.y - GLOW_RADIUS}px,0) scale(1)`
        : `translate3d(-9999px,-9999px,0)`;

      ctx.clearRect(0, 0, width, height);

      // ── Update nodes ──────────────────────────────────────────────────────
      for (const n of nodes) {
        // Organic wobble
        n.vx += Math.sin(state.t + n.phase) * 0.002;
        n.vy += Math.cos(state.t * 0.7 + n.phase * 1.3) * 0.002;

        // Mouse repulsion / subtle attraction
        if (hasMouse) {
          const dsq = distSq(n.x, n.y, mouse.x, mouse.y);
          if (dsq < MOUSE_DIST_SQ) {
            const d = Math.sqrt(dsq);
            const f = 1 - d / MOUSE_DIST;
            // repel strongly when very close, attract a bit further out
            const factor =
              d < MOUSE_DIST * 0.5
                ? -MOUSE_REPULSE * f
                : MOUSE_ATTRACT_NEAR * f * 0.3;
            n.vx += ((n.x - mouse.x) / d) * factor;
            n.vy += ((n.y - mouse.y) / d) * factor;
          }
        }

        // Damping & clamp
        n.vx *= SPEED_DAMP;
        n.vy *= SPEED_DAMP;
        const sp = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const maxSp = MAX_SPEED * n.depth;
        if (sp > maxSp) {
          n.vx = (n.vx / sp) * maxSp;
          n.vy = (n.vy / sp) * maxSp;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce
        if (n.x < 0) {
          n.vx = Math.abs(n.vx);
          n.x = 0;
        } else if (n.x > width) {
          n.vx = -Math.abs(n.vx);
          n.x = width;
        }
        if (n.y < 0) {
          n.vy = Math.abs(n.vy);
          n.y = 0;
        } else if (n.y > height) {
          n.vy = -Math.abs(n.vy);
          n.y = height;
        }
      }

      // ── Spatial grid for O(n) connection check ────────────────────────────
      const grid = new Map<number, number[]>();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!n) continue;
        const key = cellKey(
          Math.floor(n.x / GRID_CELL),
          Math.floor(n.y / GRID_CELL)
        );
        const bucket = grid.get(key);
        if (bucket) bucket.push(i);
        else grid.set(key, [i]);
      }

      // ── Draw connections ──────────────────────────────────────────────────
      ctx.strokeStyle = `rgb(${palette.lineR},${palette.lineG},${palette.lineB})`;
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!a) continue;
        const col = Math.floor(a.x / GRID_CELL);
        const row = Math.floor(a.y / GRID_CELL);

        for (let dc = -1; dc <= 1; dc++) {
          for (let dr = -1; dr <= 1; dr++) {
            const bucket = grid.get(cellKey(col + dc, row + dr));
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue;
              const b = nodes[j];
              if (!b) continue;
              const dsq = distSq(a.x, a.y, b.x, b.y);
              if (dsq >= CONN_DIST_SQ) continue;

              const t = 1 - Math.sqrt(dsq) / CONN_DIST;
              const depth = (a.depth + b.depth) * 0.5;
              const mx = (a.x + b.x) * 0.5;
              const my = (a.y + b.y) * 0.5;
              const clarity = centerClarity(mx, my, width, height, isLight);

              // Brighter near mouse
              let boost = 1;
              if (hasMouse) {
                const md = distSq(mx, my, mouse.x, mouse.y);
                if (md < MOUSE_DIST_SQ) {
                  boost = 1 + (1 - Math.sqrt(md) / MOUSE_DIST) * 2.5;
                }
              }

              ctx.globalAlpha = Math.min(
                1,
                t * 0.22 * depth * boost * palette.lineAlpha * clarity
              );
              ctx.lineWidth =
                (isLight ? 0.4 : 0.5) +
                t * depth * (isLight ? 0.55 : 0.8) * (boost > 1 ? 1.2 : 1);
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // ── Draw nodes ────────────────────────────────────────────────────────
      for (const n of nodes) {
        const pulse = 0.85 + Math.sin(state.t * 1.8 + n.phase) * 0.15;
        const clarity = centerClarity(n.x, n.y, width, height, isLight);

        // Glow halo near mouse
        if (hasMouse) {
          const dsq = distSq(n.x, n.y, mouse.x, mouse.y);
          if (dsq < MOUSE_DIST_SQ * 0.4) {
            const intensity = Math.max(
              0,
              1 - Math.sqrt(dsq) / (MOUSE_DIST * 0.632)
            );
            const haloR = Math.max(0.1, n.r * 4 * intensity);
            if (intensity > 0) {
              const grad = ctx.createRadialGradient(
                n.x,
                n.y,
                0,
                n.x,
                n.y,
                haloR
              );
              grad.addColorStop(
                0,
                `rgba(${meshR},${meshG},${meshB},${0.3 * intensity * n.depth * palette.nodeAlpha * clarity})`
              );
              grad.addColorStop(1, `rgba(${meshR},${meshG},${meshB},0)`);
              ctx.globalAlpha = 1;
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Core dot
        const r = n.r * pulse;
        ctx.globalAlpha =
          (0.35 + n.depth * 0.45) * pulse * palette.nodeAlpha * clarity;
        ctx.fillStyle = `rgb(${meshR},${meshG},${meshB})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    }

    if (state.reducedMotion) {
      renderStatic();
      glowEl.style.opacity = "0";
    } else {
      frameRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(frameRef.current);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="ds-mesh-background" aria-hidden="true">
      <canvas ref={canvasRef} className="ds-mesh-background-canvas" />
      <div ref={glowRef} className="ds-mesh-background-glow" />
      <div className="ds-mesh-background-vignette" />
    </div>
  );
}
