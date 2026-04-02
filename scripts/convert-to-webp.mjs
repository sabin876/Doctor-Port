/**
 * convert-to-webp.mjs
 * --------------------
 * Converts all PNG/JPG images in src/assets to WebP format.
 * Originals are kept — WebP versions saved alongside them.
 *
 * Usage: node scripts/convert-to-webp.mjs
 * Requires: npm install --save-dev sharp
 */

import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { resolve, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = resolve(__dirname, '../src/assets');
const QUALITY = 82; // Good balance of quality and file size

const SUPPORTED = ['.png', '.jpg', '.jpeg'];

async function convertToWebP() {
    const files = readdirSync(ASSETS_DIR).filter(f =>
        SUPPORTED.includes(extname(f).toLowerCase())
    );

    if (files.length === 0) {
        console.log('No PNG/JPG images found in src/assets.');
        return;
    }

    console.log(`\n🔄 Converting ${files.length} images to WebP...\n`);

    let converted = 0;
    let skipped = 0;
    let totalSavedKB = 0;

    for (const file of files) {
        const inputPath = resolve(ASSETS_DIR, file);
        const webpName = basename(file, extname(file)) + '.webp';
        const outputPath = resolve(ASSETS_DIR, webpName);

        // Skip if WebP already exists and is newer than source
        if (existsSync(outputPath)) {
            console.log(`  ⏭  Skipped (already exists): ${webpName}`);
            skipped++;
            continue;
        }

        try {
            const inputStat = (await import('fs')).statSync(inputPath);
            await sharp(inputPath)
                .webp({ quality: QUALITY, effort: 6 })
                .toFile(outputPath);

            const outputStat = (await import('fs')).statSync(outputPath);
            const savedKB = ((inputStat.size - outputStat.size) / 1024).toFixed(1);
            totalSavedKB += parseFloat(savedKB);

            console.log(`  ✅ ${file.padEnd(40)} → ${webpName}  (saved ${savedKB} KB)`);
            converted++;
        } catch (err) {
            console.error(`  ❌ Failed: ${file}`, err.message);
        }
    }

    console.log(`\n✨ Done!`);
    console.log(`   Converted : ${converted}`);
    console.log(`   Skipped   : ${skipped}`);
    console.log(`   Total saved: ~${totalSavedKB.toFixed(1)} KB`);
    console.log(`\n💡 Tip: Update your JSX imports to use .webp versions for smaller payloads.`);
}

convertToWebP();
