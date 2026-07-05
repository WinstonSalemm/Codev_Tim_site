import type { ProjectArchitectureLayer } from "@/lib/content/types";

/** Canonical vertical System Blueprint layer order — docs/12_CONTENT_SCHEMA.md §9 */
export const ARCHITECTURE_LAYER_ORDER: readonly ProjectArchitectureLayer[] = [
  "Client",
  "Gateway",
  "API",
  "Services",
  "Database",
  "Infrastructure",
] as const;

export const ARCHITECTURE_LAYER_ROLES: Record<
  ProjectArchitectureLayer,
  string
> = {
  Client: "User-facing interface and client runtime",
  Gateway: "Edge routing, TLS termination, and request ingress",
  API: "Application boundary, contracts, and request orchestration",
  Services: "Domain logic, workflows, and service coordination",
  Database: "Persistent storage and transactional data",
  Infrastructure: "Deployment, observability, and platform operations",
};

export type ArchitectureDiagramNode = {
  id: string;
  layer: ProjectArchitectureLayer;
  label: string;
  role: string;
  technology?: string;
  order: number;
};

export type ArchitectureDiagramEdge = {
  id: string;
  from: string;
  to: string;
};

export type ArchitectureDiagramModel = {
  nodes: ArchitectureDiagramNode[];
  edges: ArchitectureDiagramEdge[];
};

function isArchitectureLayer(value: string): value is ProjectArchitectureLayer {
  return (ARCHITECTURE_LAYER_ORDER as readonly string[]).includes(value);
}

function toNodeId(layer: ProjectArchitectureLayer): string {
  return layer.toLowerCase().replace(/\s+/g, "-");
}

export function buildArchitectureDiagramModel(input: {
  layers: string[];
  technologies?: Record<string, string>;
  descriptions?: Record<string, string>;
}): ArchitectureDiagramModel {
  for (const layer of input.layers) {
    if (!isArchitectureLayer(layer)) {
      throw new Error(`ArchitectureDiagram: unknown layer "${layer}".`);
    }
  }

  const activeLayers = ARCHITECTURE_LAYER_ORDER.filter((layer) =>
    input.layers.some((entry) => entry === layer)
  );

  if (activeLayers.length < 2) {
    throw new Error(
      "ArchitectureDiagram requires at least two canonical layers."
    );
  }

  const nodes: ArchitectureDiagramNode[] = activeLayers.map((layer, index) => ({
    id: toNodeId(layer),
    layer,
    label: layer,
    role: input.descriptions?.[layer] ?? ARCHITECTURE_LAYER_ROLES[layer],
    technology: input.technologies?.[layer],
    order: index,
  }));

  const edges: ArchitectureDiagramEdge[] = [];

  for (let index = 0; index < nodes.length - 1; index += 1) {
    const from = nodes[index];
    const to = nodes[index + 1];

    if (!from || !to) {
      continue;
    }

    edges.push({
      id: `${from.id}-to-${to.id}`,
      from: from.id,
      to: to.id,
    });
  }

  return { nodes, edges };
}

export function getArchitectureDiagramHighlightIds(
  activeNodeId: string | null,
  model: ArchitectureDiagramModel
): Set<string> {
  if (!activeNodeId) {
    return new Set(model.nodes.map((node) => node.id));
  }

  const highlighted = new Set<string>([activeNodeId]);

  for (const edge of model.edges) {
    if (edge.to === activeNodeId) {
      highlighted.add(edge.from);
    }

    if (edge.from === activeNodeId) {
      highlighted.add(edge.to);
    }
  }

  return highlighted;
}

export function getArchitectureDiagramActiveEdgeIds(
  activeNodeId: string | null,
  model: ArchitectureDiagramModel
): Set<string> {
  if (!activeNodeId) {
    return new Set(model.edges.map((edge) => edge.id));
  }

  return new Set(
    model.edges
      .filter((edge) => edge.from === activeNodeId || edge.to === activeNodeId)
      .map((edge) => edge.id)
  );
}
