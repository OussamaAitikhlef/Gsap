import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGES_DIR = join(__dirname, "../public/images");
const WIDTHS = [320, 640, 960, 1280, 1920];

async function processImage(filePath) {
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  // Skip if not PNG or JPG
  if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) {
    return;
  }

  // Create WebP version
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(join(dir, `${baseName}.webp`));

  // Create responsive sizes
  for (const width of WIDTHS) {
    // Responsive WebP
    await sharp(filePath)
      .resize(width)
      .webp({ quality: 80 })
      .toFile(join(dir, `${baseName}-${width}.webp`));

    // Responsive original format
    await sharp(filePath)
      .resize(width)
      .toFile(join(dir, `${baseName}-${width}${ext}`));
  }
}

async function processAllImages() {
  const files = await fs.readdir(IMAGES_DIR);

  for (const file of files) {
    const filePath = join(IMAGES_DIR, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile()) {
      console.log(`Processing ${file}...`);
      await processImage(filePath).catch((err) => {
        console.error(`Error processing ${file}:`, err);
      });
    }
  }
}

processAllImages().catch(console.error);
