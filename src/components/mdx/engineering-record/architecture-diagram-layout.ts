import type { ArchitectureDiagramModel } from "@/lib/domain/projects/architecture-diagram";

export const ARCHITECTURE_DIAGRAM_LAYOUT = {
  viewWidth: 320,
  nodeWidth: 248,
  nodeHeight: 56,
  nodeGap: 40,
  arrowHeight: 28,
  paddingY: 16,
} as const;

export type ArchitectureDiagramLayoutNode = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};

export type ArchitectureDiagramLayoutEdge = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export function layoutArchitectureDiagram(model: ArchitectureDiagramModel): {
  viewHeight: number;
  nodes: ArchitectureDiagramLayoutNode[];
  edges: ArchitectureDiagramLayoutEdge[];
} {
  const { viewWidth, nodeWidth, nodeHeight, nodeGap, arrowHeight, paddingY } =
    ARCHITECTURE_DIAGRAM_LAYOUT;
  const nodeX = (viewWidth - nodeWidth) / 2;

  const nodes: ArchitectureDiagramLayoutNode[] = model.nodes.map(
    (node, index) => {
      const y = paddingY + index * (nodeHeight + nodeGap + arrowHeight);

      return {
        id: node.id,
        x: nodeX,
        y,
        width: nodeWidth,
        height: nodeHeight,
        centerX: viewWidth / 2,
        centerY: y + nodeHeight / 2,
      };
    }
  );

  const edges: ArchitectureDiagramLayoutEdge[] = model.edges.map((edge) => {
    const fromNode = nodes.find((node) => node.id === edge.from);
    const toNode = nodes.find((node) => node.id === edge.to);

    if (!fromNode || !toNode) {
      return {
        id: edge.id,
        x1: viewWidth / 2,
        y1: 0,
        x2: viewWidth / 2,
        y2: 0,
      };
    }

    return {
      id: edge.id,
      x1: fromNode.centerX,
      y1: fromNode.y + fromNode.height,
      x2: toNode.centerX,
      y2: toNode.y,
    };
  });

  const lastNode = nodes[nodes.length - 1];
  const viewHeight = lastNode
    ? lastNode.y + lastNode.height + paddingY
    : paddingY * 2;

  return { viewHeight, nodes, edges };
}
