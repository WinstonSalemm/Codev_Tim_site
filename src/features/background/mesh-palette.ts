export type MeshPalette = {
  r: number;
  g: number;
  b: number;
};

const FALLBACK: MeshPalette = { r: 240, g: 180, b: 41 };

export function readMeshPalette(): MeshPalette {
  if (typeof window === "undefined") {
    return FALLBACK;
  }

  const styles = getComputedStyle(document.documentElement);
  const r = Number.parseFloat(styles.getPropertyValue("--mesh-node-r"));
  const g = Number.parseFloat(styles.getPropertyValue("--mesh-node-g"));
  const b = Number.parseFloat(styles.getPropertyValue("--mesh-node-b"));

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return FALLBACK;
  }

  return { r, g, b };
}
