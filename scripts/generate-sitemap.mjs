/**
 * generate-sitemap.mjs
 * ---------------------
 * Run after build or during dev to auto-generate /public/sitemap.xml
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from project root
dotenv.config({ path: resolve(__dirname, '../.env') });

const BASE_URL = process.env.VITE_SITE_URL || 'https://drulhasorthopedic.com';
const TODAY    = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ─── STATIC / CORE PAGES ────────────────────────────────────────────────────
const staticPages = [
  { path: '/',        changefreq: 'weekly',  priority: '1.0' },
  { path: '/about',   changefreq: 'monthly', priority: '0.9' },
  { path: '/services',changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.6' },
  { path: '/social-media', changefreq: 'monthly', priority: '0.7' },
];

// ─── SERVICES ────────────────────────────────────────
const servicesList = [
  { slug: 'physiotherapy-home-services', name: 'Physiotherapy and Rehabilitation' }
];

const servicePages = servicesList.map((service) => ({
  path: `/services/${service.slug}`,
  changefreq: 'monthly',
  priority: '0.85',
  comment: service.name,
}));

// ─── ARTICLES / BLOG ─────────────────────────────────────────────────────────
const articlePages = [];

// ─── EXCLUDED ────────────────────────────────────────────────────────────────
// /admin/*     — Admin pages
// /thank-you   — Confirmation / Thank You pages

// ─── BUILD XML ───────────────────────────────────────────────────────────────
function buildUrl({ path, changefreq, priority, comment }) {
  const commentLine = comment ? `\n  <!-- ${comment} -->` : '';
  return `${commentLine}
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const allPages = [...staticPages, ...servicePages, ...articlePages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(buildUrl).join('\n')}

  <!-- EXCLUDED: /admin/* (admin pages), /thank-you (thank you pages) -->
</urlset>
`;

const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ sitemap.xml generated → ${outputPath}`);
console.log(`   Total URLs: ${allPages.length}`);
console.log(`   Static pages : ${staticPages.length}`);
console.log(`   Service pages: ${servicePages.length}`);
console.log(`   Article pages: ${articlePages.length}`);
console.log(`   Last modified: ${TODAY}`);
