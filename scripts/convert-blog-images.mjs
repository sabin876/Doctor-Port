import sharp from 'sharp';
import { readdirSync } from 'fs';
import { resolve, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = resolve(__dirname, '../public/images/blog');

const files = readdirSync(BLOG_DIR).filter(f => 
    ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
);

for (const file of files) {
    const inputPath = resolve(BLOG_DIR, file);
    const outputPath = resolve(BLOG_DIR, basename(file, extname(file)) + '.webp');
    sharp(inputPath).webp({ quality: 82 }).toFile(outputPath);
    console.log(`Converted ${file} to WebP`);
}
