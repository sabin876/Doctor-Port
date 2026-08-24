/**
 * generate-sitemap.mjs
 * ---------------------
 * Generates dynamic sitemap.xml by querying the API (or fallback)
 * and writing to public/sitemap.xml (and dist/sitemap.xml if dist exists).
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const SITE_URL = (process.env.VITE_SITE_URL || 'https://drulhasorthopedic.com').replace(/\/+$/, '');
const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, '');

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { path: '/gallery/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/physiotherapy/', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog/', priority: '0.8', changefreq: 'weekly' },
  { path: '/report-access/', priority: '0.5', changefreq: 'monthly' },
  { path: '/sitemap/', priority: '0.5', changefreq: 'monthly' },
  { path: '/social-media/', priority: '0.5', changefreq: 'monthly' },
  { path: '/thank-you/', priority: '0.4', changefreq: 'monthly' },
];

const fallbackServices = [
  'knee-replacement-knee-preservation-surgery',
  'robotic-knee-replacement-surgery',
  'sports-injury',
  'fracture-trauma-surgery',
  'second-opinion-for-orthopaedic-surgery',
  'joint-preservation-surgery',
  'knee-shoulder-arthroscopy',
  'osteoporosis-treatment',
  'regenerative-orthopaedics-and-prp-treatment',
  'hip-replacement-surgery',
  'deformity-correction-osteotomy-surgery',
  'physiotherapy-rehabilitation-recovery-planning',
];

const fallbackArticles = [
  'alignment-concept-total-knee-replacement',
  'the-evolution-of-tkr-implants',
  'steps-in-total-knee-replacement',
  'when-to-consult-a-knee-specialist-in-pune',
  'mcl-vs-lcl-injuries',
];

async function generate() {
  console.log('Generating sitemap from API / static definitions...');
  let dynamicServices = [];
  let dynamicSubServices = [];
  let dynamicArticles = [];

  try {
    const [sRes, aRes] = await Promise.all([
      fetch(`${API_BASE_URL}/services/`).catch(() => null),
      fetch(`${API_BASE_URL}/articles/`).catch(() => null),
    ]);

    if (sRes && sRes.ok) {
      const services = await sRes.json();
      if (Array.isArray(services) && services.length > 0) {
        services.forEach((s) => {
          if (s.slug) {
            dynamicServices.push(s.slug);
            if (Array.isArray(s.sub_services)) {
              s.sub_services.forEach((sub) => {
                if (sub.slug) {
                  dynamicSubServices.push({ parent: s.slug, slug: sub.slug });
                }
              });
            }
          }
        });
      }
    }

    if (aRes && aRes.ok) {
      const articles = await aRes.json();
      if (Array.isArray(articles) && articles.length > 0) {
        articles.forEach((a) => {
          if (a.slug) dynamicArticles.push(a.slug);
        });
      }
    }
  } catch (err) {
    console.warn('Could not fetch from API for sitemap, using fallbacks:', err.message);
  }

  // Combine dynamic with fallback if dynamic is empty
  const serviceSlugs = dynamicServices.length > 0 ? dynamicServices : fallbackServices;
  const articleSlugs = dynamicArticles.length > 0 ? dynamicArticles : fallbackArticles;

  let urlEntries = '';

  // 1. Static Routes
  for (const route of staticRoutes) {
    urlEntries += `
    <url>
        <loc>${SITE_URL}${route.path}</loc>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`;
  }

  // 2. Service Pages
  for (const slug of serviceSlugs) {
    urlEntries += `
    <url>
        <loc>${SITE_URL}/services/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>`;
  }

  // 3. Sub-service Pages
  for (const sub of dynamicSubServices) {
    urlEntries += `
    <url>
        <loc>${SITE_URL}/services/${sub.parent}/${sub.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
  }

  // 4. Blog Articles
  for (const slug of articleSlugs) {
    urlEntries += `
    <url>
        <loc>${SITE_URL}/blog/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

  const publicPath = resolve(__dirname, '../public/sitemap.xml');
  const distDir = resolve(__dirname, '../dist');
  const distPath = resolve(distDir, 'sitemap.xml');

  writeFileSync(publicPath, xml, 'utf-8');
  console.log(`✅ sitemap.xml generated → ${publicPath}`);

  if (existsSync(distDir)) {
    writeFileSync(distPath, xml, 'utf-8');
    console.log(`✅ sitemap.xml synced → ${distPath}`);
  }
}

generate();
