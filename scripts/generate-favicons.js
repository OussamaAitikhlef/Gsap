import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "apple-touch-icon.png": 180,
  "android-chrome-192x192.png": 192,
  "android-chrome-512x512.png": 512,
};

async function generateFavicons() {
  const input = join(__dirname, "../public/images/logo.png");

  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(input)
      .resize(size, size)
      .toFile(join(__dirname, "../public", filename));
  }

  // Generate ICO file (contains both 16x16 and 32x32)
  await sharp(input)
    .resize(32, 32)
    .toFile(join(__dirname, "../public/favicon.ico"));
}

generateFavicons().catch(console.error);
