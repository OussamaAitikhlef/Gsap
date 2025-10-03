import ttf2woff2 from 'ttf2woff2';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function convertFont() {
  const fontPath = join(__dirname, '../public/fonts/Modern Negra Demo.ttf');
  const outputPath = join(__dirname, '../public/fonts/ModernNegraDemo.woff2');

  try {
    const input = await readFile(fontPath);
    const output = ttf2woff2(input);
    await writeFile(outputPath, output);
    console.log('Font converted successfully!');
  } catch (error) {
    console.error('Error converting font:', error);
  }
}

convertFont();