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
  { path: '/blog',     changefreq: 'weekly',  priority: '0.8' },
  { path: '/report-access', changefreq: 'monthly', priority: '0.5' },
  { path: '/sitemap',  changefreq: 'monthly', priority: '0.4' },
];

async function generateSitemap() {
  console.log('Fetching services and articles to generate sitemap...');
  const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, "");
  
  let services = [];
  let articles = [];
  try {
    const sRes = await fetch(`${API_BASE_URL}/services/`);
    if (sRes.ok) services = await sRes.json();
  } catch (e) {
    console.error('Failed to fetch services for sitemap:', e);
  }

  try {
    const aRes = await fetch(`${API_BASE_URL}/articles/`);
    if (aRes.ok) articles = await aRes.json();
  } catch (e) {
    console.error('Failed to fetch articles for sitemap:', e);
  }

  const servicePages = [];
  if (Array.isArray(services)) {
    services.forEach(s => {
      if (s.slug) {
        servicePages.push({
          path: `/services/${s.slug}`,
          changefreq: 'monthly',
          priority: '0.85',
          comment: s.title
        });
        if (Array.isArray(s.sub_services)) {
          s.sub_services.forEach(sub => {
            if (sub.slug) {
              servicePages.push({
                path: `/services/${s.slug}/${sub.slug}`,
                changefreq: 'monthly',
                priority: '0.75',
                comment: `${s.title} -> ${sub.title}`
              });
            }
          });
        }
      }
    });
  }

  const articlePages = [];
  if (Array.isArray(articles)) {
    articles.forEach(a => {
      if (a.slug) {
        articlePages.push({
          path: `/blog/${a.slug}`,
          changefreq: 'monthly',
          priority: '0.8',
          comment: a.title
        });
      }
    });
  }

  const allPages = [...staticPages, ...servicePages, ...articlePages];

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
}

generateSitemap();
