/**
 * Composes the 1200x630 Open Graph card and the apple-touch-icon into public/.
 *
 *   node scripts/generate-og.mjs
 *
 * Run after scripts/optimize-images.mjs, which produces the portrait it uses.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORTRAIT = join(root, "src", "assets", "og-portrait.jpg");
const OUT = join(root, "public");

const W = 1200;
const H = 630;

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[c]};`);

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0b"/>
      <stop offset="100%" stop-color="#141417"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="#2dd4bf"/>

  <g font-family="Segoe UI, Helvetica, Arial, sans-serif">
    <text x="80" y="212" fill="#2dd4bf" font-size="23" font-weight="600" letter-spacing="2.5">
      ${escapeXml("AI/ML  ·  FULL-STACK  ·  PROBLEM SOLVING")}
    </text>
    <text x="80" y="300" fill="#fafafa" font-size="72" font-weight="700" letter-spacing="-2">
      Aunonno Farhan
    </text>
    <text x="80" y="368" fill="#a1a1aa" font-size="34" font-weight="400">
      Building intelligent, real-world software.
    </text>
    <text x="80" y="452" fill="#8b8b93" font-size="26" font-weight="400">
      ${escapeXml("Final-year CSE · Jahangirnagar University")}
    </text>
  </g>
</svg>`;

// Circular mask for the portrait.
const R = 190;
const mask = `<svg width="${R * 2}" height="${R * 2}"><circle cx="${R}" cy="${R}" r="${R}" fill="#fff"/></svg>`;

const portrait = await sharp(PORTRAIT)
  .resize(R * 2, R * 2, { fit: "cover" })
  .composite([{ input: Buffer.from(mask), blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(Buffer.from(card))
  .composite([{ input: portrait, top: Math.round(H / 2 - R), left: W - R * 2 - 90 }])
  .png()
  .toFile(join(OUT, "og-image.png"));

// apple-touch-icon: the same mark as favicon.svg, rasterised at 180px.
const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <rect width="180" height="180" rx="40" fill="#0f766e"/>
  <text x="50%" y="53%" dominant-baseline="central" text-anchor="middle"
        fill="#ffffff" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="80" font-weight="700" letter-spacing="-3">AF</text>
</svg>`;

await sharp(Buffer.from(icon)).png().toFile(join(OUT, "apple-touch-icon.png"));

console.log("wrote public/og-image.png and public/apple-touch-icon.png");
