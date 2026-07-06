"use client";

import { useEffect, useRef } from "react";
import { readMeshPalette } from "./mesh-palette";

const NODE_COUNT_MIN = 60;
const NODE_COUNT_MAX = 120;
const NODE_AREA_DIVISOR = 12_000;
const CONN_DIST = 170;
const CONN_DIST_SQ = CONN_DIST * CONN_DIST;
const GRID_CELL = CONN_DIST;
const MAX_SPEED = 1.25;
const SPEED_DAMP = 0.997;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
  phase: number;
};

function resolveNodeCount(width: number, height: number): number {
  const area = width * height;
  return Math.min(
    NODE_COUNT_MAX,
    Math.max(NODE_COUNT_MIN, Math.round(area / NODE_AREA_DIVISOR))
  );
}

function createNodes(count: number, width: number, height: number): Node[] {
  return Array.from({ length: count }, () => {
    const depth = 0.35 + Math.random() * 0.65;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35 * depth,
      vy: (Math.random() - 0.5) * 0.35 * depth,
      r: 0.7 + depth * 1.8,
      depth,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

function distSq(ax: number, ay: number, bx: number, by: number): number {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function cellKey(col: number, row: number): number {
  return col * 100_000 + row;
}

type IdleScreensaverMeshProps = {
  active: boolean;
};

export function IdleScreensaverMesh({ active }: IdleScreensaverMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(frameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const maybeCtx = canvas.getContext("2d", { alpha: true });
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      nodes: [] as Node[],
      t: 0,
      centerX: 0,
      centerY: 0,
    };

    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.centerX = state.width * 0.5;
      state.centerY = state.height * 0.5;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      state.nodes = createNodes(
        resolveNodeCount(state.width, state.height),
        state.width,
        state.height
      );
    };

    const draw = () => {
      const { width, height, nodes } = state;
      const { r: meshR, g: meshG, b: meshB } = readMeshPalette();
      state.t += 0.01;

      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.vx += Math.sin(state.t + n.phase) * 0.003;
        n.vy += Math.cos(state.t * 0.8 + n.phase * 1.2) * 0.003;

        const cx = state.centerX;
        const cy = state.centerY;
        const dsq = distSq(n.x, n.y, cx, cy);
        const orbit = Math.min(width, height) * 0.42;
        if (dsq < orbit * orbit) {
          const d = Math.sqrt(dsq) || 1;
          const pull = (1 - d / orbit) * 0.0025;
          n.vx += ((cx - n.x) / d) * pull;
          n.vy += ((cy - n.y) / d) * pull;
        }

        n.vx *= SPEED_DAMP;
        n.vy *= SPEED_DAMP;
        const sp = Math.hypot(n.vx, n.vy);
        const maxSp = MAX_SPEED * n.depth;
        if (sp > maxSp) {
          n.vx = (n.vx / sp) * maxSp;
          n.vy = (n.vy / sp) * maxSp;
        }

        n.x += n.vx;
        n.y += n.vy;

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

      ctx.strokeStyle = `rgb(${meshR},${meshG},${meshB})`;
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
              ctx.globalAlpha = Math.min(1, t * 0.28 * depth);
              ctx.lineWidth = 0.6 + t * depth;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      for (const n of nodes) {
        const pulse = 0.8 + Math.sin(state.t * 2 + n.phase) * 0.2;
        const r = n.r * pulse;
        ctx.globalAlpha = (0.4 + n.depth * 0.5) * pulse;
        ctx.fillStyle = `rgb(${meshR},${meshG},${meshB})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="ds-idle-screensaver-canvas"
      aria-hidden="true"
    />
  );
}
