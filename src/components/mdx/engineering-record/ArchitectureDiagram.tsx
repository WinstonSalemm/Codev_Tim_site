"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "@/components/modules/dashboard/motion/useReducedMotion";
import {
  buildArchitectureDiagramModel,
  getArchitectureDiagramActiveEdgeIds,
  getArchitectureDiagramHighlightIds,
  type ArchitectureDiagramNode,
} from "@/lib/domain/projects/architecture-diagram";
import {
  ARCHITECTURE_DIAGRAM_LAYOUT,
  layoutArchitectureDiagram,
} from "./architecture-diagram-layout";
import type { ArchitectureDiagramProps } from "./types";

function buildNodeLabel(node: ArchitectureDiagramNode): string {
  const technology = node.technology ? ` — ${node.technology}` : "";
  return `${node.label}: ${node.role}${technology}`;
}

export function ArchitectureDiagram({
  layers,
  technologies,
  descriptions,
  ariaLabel = "System Blueprint",
}: ArchitectureDiagramProps) {
  const diagramId = useId();
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);

  const model = useMemo(
    () => buildArchitectureDiagramModel({ layers, technologies, descriptions }),
    [layers, technologies, descriptions]
  );

  const layout = useMemo(() => layoutArchitectureDiagram(model), [model]);
  const highlightedNodeIds = useMemo(
    () =>
      getArchitectureDiagramHighlightIds(activeNodeId ?? focusedNodeId, model),
    [activeNodeId, focusedNodeId, model]
  );
  const highlightedEdgeIds = useMemo(
    () =>
      getArchitectureDiagramActiveEdgeIds(activeNodeId ?? focusedNodeId, model),
    [activeNodeId, focusedNodeId, model]
  );

  const tooltipNode = model.nodes.find(
    (node) => node.id === (activeNodeId ?? focusedNodeId)
  );
  const tooltipId = tooltipNode
    ? `${diagramId}-tooltip-${tooltipNode.id}`
    : undefined;

  const focusNodeAt = useCallback((index: number) => {
    const target = nodeRefs.current[index];
    target?.focus();
  }, []);

  const handleNodeKeyDown = useCallback(
    (event: React.KeyboardEvent<SVGGElement>, index: number) => {
      if (event.key === "ArrowDown" && index < model.nodes.length - 1) {
        event.preventDefault();
        focusNodeAt(index + 1);
        return;
      }

      if (event.key === "ArrowUp" && index > 0) {
        event.preventDefault();
        focusNodeAt(index - 1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        focusNodeAt(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        focusNodeAt(model.nodes.length - 1);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setActiveNodeId(null);
        (event.currentTarget as SVGGElement).blur();
      }
    },
    [focusNodeAt, model.nodes.length]
  );

  const isInteractive = activeNodeId !== null || focusedNodeId !== null;

  return (
    <figure
      className={`ds-mdx-architecture-diagram${reducedMotion ? "ds-mdx-architecture-diagram--reduced-motion" : ""}`}
      role="group"
      aria-label={ariaLabel}
    >
      <svg
        className="ds-mdx-architecture-svg"
        viewBox={`0 0 ${ARCHITECTURE_DIAGRAM_LAYOUT.viewWidth} ${layout.viewHeight}`}
        focusable="false"
      >
        <defs>
          <marker
            id={`${diagramId}-arrow`}
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" className="ds-mdx-architecture-marker" />
          </marker>
        </defs>

        {layout.edges.map((edge) => {
          const isActive = !isInteractive || highlightedEdgeIds.has(edge.id);

          return (
            <line
              key={edge.id}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              className={`ds-mdx-architecture-edge${isActive ? "ds-mdx-architecture-edge--active" : "ds-mdx-architecture-edge--dimmed"}`}
              markerEnd={`url(#${diagramId}-arrow)`}
              aria-hidden="true"
            />
          );
        })}

        {model.nodes.map((node, index) => {
          const position = layout.nodes[index];
          if (!position) {
            return null;
          }

          const isHighlighted =
            !isInteractive || highlightedNodeIds.has(node.id);
          const isActive = node.id === (activeNodeId ?? focusedNodeId);
          const nodeClassName = [
            "ds-mdx-architecture-node",
            isActive ? "ds-mdx-architecture-node--active" : "",
            isHighlighted ? "" : "ds-mdx-architecture-node--dimmed",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <g
              key={node.id}
              ref={(element) => {
                nodeRefs.current[index] = element;
              }}
              className={nodeClassName}
              role="button"
              tabIndex={0}
              aria-label={buildNodeLabel(node)}
              aria-describedby={isActive && tooltipId ? tooltipId : undefined}
              aria-pressed={activeNodeId === node.id}
              onMouseEnter={() => setActiveNodeId(node.id)}
              onMouseLeave={() => setActiveNodeId(null)}
              onFocus={() => setFocusedNodeId(node.id)}
              onBlur={() => setFocusedNodeId(null)}
              onKeyDown={(event) => handleNodeKeyDown(event, index)}
              onClick={() =>
                setActiveNodeId((current) =>
                  current === node.id ? null : node.id
                )
              }
            >
              <rect
                x={position.x}
                y={position.y}
                width={position.width}
                height={position.height}
                rx={8}
                className="ds-mdx-architecture-node-box"
              />
              <text
                x={position.centerX}
                y={position.y + 22}
                textAnchor="middle"
                className="ds-mdx-architecture-node-label"
              >
                {node.label}
              </text>
              {node.technology ? (
                <text
                  x={position.centerX}
                  y={position.y + 40}
                  textAnchor="middle"
                  className="ds-mdx-architecture-node-tech"
                >
                  {node.technology}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      {tooltipNode && tooltipId ? (
        <figcaption
          id={tooltipId}
          className="ds-mdx-architecture-tooltip"
          role="tooltip"
        >
          <span className="ds-mdx-architecture-tooltip-layer">
            {tooltipNode.label}
          </span>
          <span className="ds-mdx-architecture-tooltip-role">
            {tooltipNode.role}
          </span>
          {tooltipNode.technology ? (
            <span className="ds-mdx-architecture-tooltip-tech">
              {tooltipNode.technology}
            </span>
          ) : null}
        </figcaption>
      ) : (
        <figcaption className="ds-mdx-architecture-caption">
          {model.nodes.map((node) => node.label).join(" → ")}
        </figcaption>
      )}
    </figure>
  );
}
