"use client";

import { useEffect, useRef } from "react";

const ACCENT = { r: 240, g: 180, b: 41 };
const CONN_DIST = 150;
const MOUSE_DIST = 200;
const MOUSE_REPULSE = 0.014;
const MAX_SPEED = 1.15;
const GLOW_RADIUS = 260;
const GRID_CELL = CONN_DIST;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function resolveNodeCount(width: number, height: number): number {
  const area = width * height;
  return Math.min(88, Math.max(42, Math.round(area / 16_000)));
}

function createNodes(count: number, width: number, height: number): Node[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    r: Math.random() * 1.2 + 0.8,
  }));
}

function cellKey(x: number, y: number): string {
  const col = Math.floor(x / GRID_CELL);
  const row = Math.floor(y / GRID_CELL);
  return `${col},${row}`;
}

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
    reducedMotion: false,
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const context = ctx;
    const glowElement = glow;

    const state = stateRef.current;
    state.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      state.nodes = createNodes(
        resolveNodeCount(state.width, state.height),
        state.width,
        state.height
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      state.mouse.tx = event.clientX;
      state.mouse.ty = event.clientY;
    };

    const onPointerLeave = () => {
      state.mouse.tx = -9_999;
      state.mouse.ty = -9_999;
    };

    const onVisibility = () => {
      state.visible = document.visibilityState === "visible";
      if (state.visible && !state.reducedMotion) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    function drawStaticMesh() {
      context.clearRect(0, 0, state.width, state.height);

      for (let index = 0; index < state.nodes.length; index += 1) {
        for (let next = index + 1; next < state.nodes.length; next += 1) {
          const left = state.nodes[index];
          const right = state.nodes[next];
          if (!left || !right) {
            continue;
          }

          const distance = Math.hypot(left.x - right.x, left.y - right.y);
          if (distance >= CONN_DIST) {
            continue;
          }

          const alpha = (1 - distance / CONN_DIST) * 0.12;
          context.beginPath();
          context.moveTo(left.x, left.y);
          context.lineTo(right.x, right.y);
          context.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${alpha})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      for (const node of state.nodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.35)`;
        context.fill();
      }
    }

    function draw() {
      if (!state.visible) {
        return;
      }

      if (state.reducedMotion) {
        drawStaticMesh();
        return;
      }

      const { width, height, nodes, mouse } = state;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;

      glowElement.style.transform = `translate3d(${mouse.x - GLOW_RADIUS}px, ${mouse.y - GLOW_RADIUS}px, 0)`;

      context.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }

        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        const mouseDistance = Math.hypot(node.x - mouse.x, node.y - mouse.y);
        if (mouseDistance < MOUSE_DIST) {
          const force = (1 - mouseDistance / MOUSE_DIST) * MOUSE_REPULSE;
          node.vx += (node.x - mouse.x) * force;
          node.vy += (node.y - mouse.y) * force;
        }

        const speed = Math.hypot(node.vx, node.vy);
        if (speed > MAX_SPEED) {
          node.vx = (node.vx / speed) * MAX_SPEED;
          node.vy = (node.vy / speed) * MAX_SPEED;
        }
      }

      const grid = new Map<string, number[]>();
      nodes.forEach((node, index) => {
        const key = cellKey(node.x, node.y);
        const bucket = grid.get(key);
        if (bucket) {
          bucket.push(index);
        } else {
          grid.set(key, [index]);
        }
      });

      context.lineWidth = 1;
      for (let index = 0; index < nodes.length; index += 1) {
        const node = nodes[index];
        if (!node) {
          continue;
        }

        const col = Math.floor(node.x / GRID_CELL);
        const row = Math.floor(node.y / GRID_CELL);

        for (let offsetCol = -1; offsetCol <= 1; offsetCol += 1) {
          for (let offsetRow = -1; offsetRow <= 1; offsetRow += 1) {
            const bucket = grid.get(`${col + offsetCol},${row + offsetRow}`);
            if (!bucket) {
              continue;
            }

            for (const otherIndex of bucket) {
              if (otherIndex <= index) {
                continue;
              }

              const other = nodes[otherIndex];
              if (!other) {
                continue;
              }

              const distance = Math.hypot(node.x - other.x, node.y - other.y);
              if (distance >= CONN_DIST) {
                continue;
              }

              const alpha = (1 - distance / CONN_DIST) * 0.2;
              context.beginPath();
              context.moveTo(node.x, node.y);
              context.lineTo(other.x, other.y);
              context.strokeStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, ${alpha})`;
              context.stroke();
            }
          }
        }
      }

      for (const node of nodes) {
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(${ACCENT.r}, ${ACCENT.g}, ${ACCENT.b}, 0.42)`;
        context.fill();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    }

    if (state.reducedMotion) {
      drawStaticMesh();
      glowElement.style.opacity = "0";
    } else {
      frameRef.current = window.requestAnimationFrame(draw);
    }

    return () => {
      window.cancelAnimationFrame(frameRef.current);
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
    </div>
  );
}
