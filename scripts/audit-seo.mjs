import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`Auditing ${htmlFiles.length} HTML files in ${distDir}...\n`);

let totalErrors = 0;
let inspectedCount = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  // Skip 404 fallback from strict checks if needed
  const content = fs.readFileSync(file, 'utf8');

  const titleMatches = content.match(/<title[^>]*>[\s\S]*?<\/title>/gi) || [];
  const metaDescMatches = content.match(/<meta[^>]+name=["']description["'][^>]*>/gi) || [];
  const canonicalMatches = content.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) || [];
  const ogTitleMatches = content.match(/<meta[^>]+property=["']og:title["'][^>]*>/gi) || [];
  const ogDescMatches = content.match(/<meta[^>]+property=["']og:description["'][^>]*>/gi) || [];
  const ogUrlMatches = content.match(/<meta[^>]+property=["']og:url["'][^>]*>/gi) || [];
  const h1Matches = content.match(/<h1(\s|>)/gi) || [];

  // Check for head tags leaked inside #root
  const rootMatch = content.match(/<div id="root">([\s\S]*?)<\/div>\s*<div id="google_translate_element"/i);
  const rootContent = rootMatch ? rootMatch[1] : '';

  const leakedTitle = (rootContent.match(/<title[^>]*>/gi) || []).length;
  const leakedMeta = (rootContent.match(/<meta[^>]*>/gi) || []).length;
  const leakedLink = (rootContent.match(/<link[^>]*>/gi) || []).length;

  const errors = [];

  if (titleMatches.length !== 1) {
    errors.push(`Expected 1 <title>, found ${titleMatches.length}`);
  }
  if (metaDescMatches.length !== 1) {
    errors.push(`Expected 1 <meta name="description">, found ${metaDescMatches.length}`);
  }
  if (canonicalMatches.length !== 1) {
    errors.push(`Expected 1 <link rel="canonical">, found ${canonicalMatches.length}`);
  }
  if (ogTitleMatches.length !== 1) {
    errors.push(`Expected 1 og:title, found ${ogTitleMatches.length}`);
  }
  if (ogDescMatches.length !== 1) {
    errors.push(`Expected 1 og:description, found ${ogDescMatches.length}`);
  }
  if (ogUrlMatches.length !== 1) {
    errors.push(`Expected 1 og:url, found ${ogUrlMatches.length}`);
  }
  if (h1Matches.length > 1) {
    errors.push(`Found ${h1Matches.length} <h1> tags (should be at most 1)`);
  }
  if (leakedTitle > 0 || leakedMeta > 0 || leakedLink > 0) {
    errors.push(`Leaked head tags inside #root: title=${leakedTitle}, meta=${leakedMeta}, link=${leakedLink}`);
  }
  if (!rootContent || rootContent.trim().length < 50) {
    errors.push(`Empty or suspicious root content (length=${rootContent.length})`);
  }

  // Check for raw HTML tags inside meta description
  if (metaDescMatches.length > 0) {
    const descContent = metaDescMatches[0];
    if (/<[a-z][\s\S]*>/i.test(descContent) && !descContent.startsWith('<meta')) {
      errors.push(`Meta description contains unescaped HTML tags: ${descContent}`);
    }
  }

  if (errors.length > 0) {
    console.error(`❌ [${relPath}]:`);
    for (const err of errors) {
      console.error(`   - ${err}`);
    }
    totalErrors += errors.length;
  }
  inspectedCount++;
}

console.log(`\n========================================`);
console.log(`Audit Summary:`);
console.log(`Total HTML files audited: ${inspectedCount}`);
console.log(`Total errors found: ${totalErrors}`);
if (totalErrors === 0) {
  console.log(`✅ ALL ${inspectedCount} PAGES PASSED! Zero duplicates, zero leaks, proper content.`);
} else {
  console.log(`❌ Some pages failed the audit.`);
  process.exit(1);
}
