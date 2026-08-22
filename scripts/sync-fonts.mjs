/**
 * Copies the latin variable font files out of @fontsource-variable into
 * src/assets/fonts, which globals.css declares directly.
 *
 *   node scripts/sync-fonts.mjs
 *
 * Importing the package entrypoints instead would emit every language subset
 * into dist/ — around 250 KB of files no browser requests, because each
 * @font-face carries a unicode-range the latin subset already satisfies.
 * Re-run this after upgrading either font package.
 */
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "src", "assets", "fonts");

const FILES = [
  ["@fontsource-variable/inter", "inter-latin-wght-normal.woff2"],
  ["@fontsource-variable/space-grotesk", "space-grotesk-latin-wght-normal.woff2"],
];

mkdirSync(OUT, { recursive: true });

for (const [pkg, file] of FILES) {
  copyFileSync(join(root, "node_modules", pkg, "files", file), join(OUT, file));
  console.log(`copied ${file}`);
}
