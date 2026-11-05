import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// One Railway service, two independent Next applications. The host proxies the
// mounted application's HTML, RSC navigation, APIs and assets without rewriting
// its markup. Each application keeps its own React build and CSS pipeline.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dev = process.argv.includes("--dev");
const port = process.env.PORT || "3000";
if (port === "3101") throw new Error("PORT 3101 is reserved for the storefront");
const children = [];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill("SIGTERM");
  process.exitCode = code;
  setTimeout(() => process.exit(code), 4000).unref();
}
function launch(directory, appPort, hostname) {
  const cwd = resolve(root, directory);
  const child = spawn(process.execPath, [
    resolve(cwd, "node_modules/next/dist/bin/next"),
    dev ? "dev" : "start", "--port", appPort, "--hostname", hostname,
  ], { cwd, stdio: "inherit", env: { ...process.env, PORT: appPort, NEXT_TELEMETRY_DISABLED: "1" } });
  children.push(child);
  child.on("error", (error) => { console.error(error); stop(1); });
  child.on("exit", (code) => { if (!stopping) stop(code || 1); });
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
launch("apps/fire-safety-store", "3101", "127.0.0.1");
launch(".", port, dev ? "127.0.0.1" : "0.0.0.0");
