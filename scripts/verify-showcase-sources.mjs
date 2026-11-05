import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const baselines = JSON.parse(
  readFileSync("showcases/source-baselines.json", "utf8")
);
baselines.push({
  path: "C:\\dev\\poj-pro\\Poj-Pro",
  head: "bcd388ca3c080ac74b3d846cd3a1f57ee9bc3357",
  statusSha256: createHash("sha256").update("?? outputs/\n").digest("hex"),
});
for (const baseline of baselines) {
  const head = execFileSync("git", ["-C", baseline.path, "rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim();
  const status = execFileSync("git", [
    "-C",
    baseline.path,
    "status",
    "--porcelain",
  ]);
  assert.equal(head, baseline.head, "Source HEAD changed");
  assert.equal(
    createHash("sha256").update(status).digest("hex"),
    baseline.statusSha256,
    "Source working-tree status changed"
  );
}
console.log(
  `PASS ${baselines.length} read-only source baselines: HEAD and porcelain status match discovery. No source build or write was performed.`
);
