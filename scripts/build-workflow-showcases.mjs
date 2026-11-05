import { mkdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const formatOptions = await resolveConfig(path.join(root, ".prettierrc"));
const shared = path.join(root, "public/showcases/workflows");
await mkdir(shared, { recursive: true });
for (const file of ["app.js", "styles.css"]) {
  await copyFile(
    path.join(root, "showcases/workflows", file),
    path.join(shared, file)
  );
}
for (const slug of ["codev-erp", "call-tracker"]) {
  for (const locale of ["ru", "uz", "en"]) {
    const directory = path.join(root, "public/showcases", slug, locale);
    await mkdir(directory, { recursive: true });
    const title = slug === "codev-erp" ? "Financial ERP" : "Call Tracker";
    await writeFile(
      path.join(directory, "index.html"),
      await format(
        `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><title>${title} — Codev_Tim Demo</title><link rel="stylesheet" href="../../workflows/styles.css"><script src="../../workflows/app.js" defer></script></head><body data-project="${slug}"><div id="app"></div><noscript>${locale === "ru" ? "Для интерактивной демонстрации включите JavaScript." : locale === "uz" ? "Interaktiv demo uchun JavaScript’ni yoqing." : "Enable JavaScript to use this interactive demonstration."}</noscript></body></html>\n`,
        { ...formatOptions, parser: "html" }
      )
    );
  }
}
console.log("Workflow showcases built: 2 projects × 3 locales");
