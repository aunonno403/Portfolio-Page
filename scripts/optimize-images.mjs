/**
 * Regenerates the optimized portrait assets in src/assets/ from the original
 * high-resolution photo in assets/.
 *
 *   node scripts/optimize-images.mjs
 *
 * The source JPEG is ~1.5 MB and must never be shipped to the browser.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "assets", "resume_photo.jpg");
const OUT = join(root, "src", "assets");

mkdirSync(OUT, { recursive: true });

const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format} orientation=${meta.orientation}`);

// The source carries EXIF orientation; `.rotate()` with no argument applies it
// and bakes the result in, so the crop operates on an upright image.
const upright = () => sharp(SRC).rotate();

// Square portrait crop at 1x and 2x, WebP with a JPEG fallback.
for (const width of [560, 1120]) {
  const suffix = width === 560 ? "" : "@2x";
  const resized = () =>
    upright().resize(width, width, { fit: "cover", position: "attention" });

  await resized().webp({ quality: 82 }).toFile(join(OUT, `profile${suffix}.webp`));
  await resized()
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, `profile${suffix}.jpg`));
}

// Portrait used when composing the Open Graph card.
await upright()
  .resize(630, 630, { fit: "cover", position: "attention" })
  .jpeg({ quality: 85, mozjpeg: true })
  .toFile(join(OUT, "og-portrait.jpg"));

console.log("done");
