/** [GUIDE: VALIDATION] Add required paths here when a new critical file is introduced. */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = [
  "index.html", "src/main.tsx", "src/App.tsx", "src/styles.css",
  "src/vite-env.d.ts", "src/data/fallbackContent.ts", "public/runtime-config.js",
  "google-apps-script/Code.gs", ".github/workflows/deploy.yml"
];

const failures = [];
for (const file of required) {
  if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);
}

const entry = readFileSync(join(root, "src/main.tsx"), "utf8");
if ((entry.match(/styles\.css/g) || []).length !== 1) {
  failures.push("src/main.tsx must import styles.css exactly once.");
}

const viteTypes = readFileSync(join(root, "src/vite-env.d.ts"), "utf8");
if (!viteTypes.includes('/// <reference types="vite/client" />')) {
  failures.push("src/vite-env.d.ts is missing the Vite client reference.");
}

const codeExtensions = new Set([".ts", ".tsx", ".css", ".js", ".mjs", ".gs", ".yml", ".md", ".html"]);
function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (name === "node_modules" || name === "dist" || name === ".git") return [];
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

for (const path of walk(root)) {
  if (!codeExtensions.has(extname(path))) continue;
  const source = readFileSync(path, "utf8");
  const unfinishedMarker = new RegExp("\\bTO" + "DO\\b|PLACE" + "HOLDER_(?:URL|TEXT)");
  if (unfinishedMarker.test(source)) {
    failures.push(`Unresolved temporary marker: ${path.slice(root.length + 1)}`);
  }
}

if (failures.length) {
  console.error(failures.map((message) => `- ${message}`).join("\n"));
  process.exit(1);
}

console.log(`Project validation passed (${required.length} required files checked).`);
