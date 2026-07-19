export type MeshPalette = {
  r: number;
  g: number;
  b: number;
  lineR: number;
  lineG: number;
  lineB: number;
  nodeAlpha: number;
  lineAlpha: number;
  density: number;
};

const FALLBACK: MeshPalette = {
  r: 240,
  g: 180,
  b: 41,
  lineR: 240,
  lineG: 180,
  lineB: 41,
  nodeAlpha: 1,
  lineAlpha: 1,
  density: 1,
};

function readNumber(styles: CSSStyleDeclaration, name: string): number {
  return Number.parseFloat(styles.getPropertyValue(name));
}

export function readMeshPalette(): MeshPalette {
  if (typeof window === "undefined") {
    return FALLBACK;
  }

  const styles = getComputedStyle(document.documentElement);
  const r = readNumber(styles, "--mesh-node-r");
  const g = readNumber(styles, "--mesh-node-g");
  const b = readNumber(styles, "--mesh-node-b");

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return FALLBACK;
  }

  const lineR = readNumber(styles, "--mesh-line-r");
  const lineG = readNumber(styles, "--mesh-line-g");
  const lineB = readNumber(styles, "--mesh-line-b");
  const nodeAlpha = readNumber(styles, "--mesh-node-alpha");
  const lineAlpha = readNumber(styles, "--mesh-line-alpha");
  const density = readNumber(styles, "--mesh-density");

  return {
    r,
    g,
    b,
    lineR: Number.isNaN(lineR) ? r : lineR,
    lineG: Number.isNaN(lineG) ? g : lineG,
    lineB: Number.isNaN(lineB) ? b : lineB,
    nodeAlpha: Number.isNaN(nodeAlpha) ? 1 : nodeAlpha,
    lineAlpha: Number.isNaN(lineAlpha) ? 1 : lineAlpha,
    density: Number.isNaN(density) ? 1 : Math.min(1, Math.max(0.25, density)),
  };
}
