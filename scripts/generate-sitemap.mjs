/**
 * generate-sitemap.mjs
 * ---------------------
 * Generates dynamic sitemap.xml by querying the API (or fallback)
 * and writing to public/sitemap.xml (and dist/sitemap.xml if dist exists).
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

const SITE_URL = (process.env.VITE_SITE_URL && !process.env.VITE_SITE_URL.includes('localhost') ? process.env.VITE_SITE_URL : 'https://drulhasorthopedic.com').replace(/\/+$/, '');
const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, '');

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
  console.log('Generating sitemap.xml...');
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

  const serviceSlugs = dynamicServices.length > 0 ? dynamicServices : fallbackServices;
  const articleSlugs = dynamicArticles.length > 0 ? dynamicArticles : fallbackArticles;

  let serviceEntries = '';
  for (const slug of serviceSlugs) {
    serviceEntries += `
    <url>
        <loc>${SITE_URL}/services/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>\n`;
  }

  for (const sub of dynamicSubServices) {
    serviceEntries += `
    <url>
        <loc>${SITE_URL}/services/${sub.parent}/${sub.slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>\n`;
  }

  let articleEntries = '';
  for (const slug of articleSlugs) {
    articleEntries += `
    <url>
        <loc>${SITE_URL}/blog/${slug}</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <!-- =====================================================
         HOMEPAGE
         Priority: 1.0
    ====================================================== -->

    <url>
        <loc>${SITE_URL}/</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>


    <!-- =====================================================
         MAIN PAGES
         Priority: 0.8
    ====================================================== -->

    <url>
        <loc>${SITE_URL}/about/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>${SITE_URL}/gallery/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

    <url>
        <loc>${SITE_URL}/contact/</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>


    <!-- =====================================================
         SERVICES HUB
         Priority: 0.9
    ====================================================== -->

    <url>
        <loc>${SITE_URL}/services/</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>


    <!-- =====================================================
         ALL SERVICE PAGES
         Priority: 0.9
    ====================================================== -->
${serviceEntries}

    <!-- =====================================================
         BLOG / ARTICLES HUB
         Priority: 0.7
    ====================================================== -->

    <url>
        <loc>${SITE_URL}/blog</loc>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>


    <!-- =====================================================
         BLOG ARTICLES
         Priority: 0.7
    ====================================================== -->
${articleEntries}
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

  // Generate robots.txt
  console.log('Generating robots.txt...');
  let robotsTxtContent = `User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  try {
    const setRes = await fetch(`${API_BASE_URL}/settings/`).catch(() => null);
    if (setRes && setRes.ok) {
      const setJson = await setRes.json();
      if (setJson && setJson.robots_txt && setJson.robots_txt.trim()) {
        robotsTxtContent = setJson.robots_txt.trim();
        if (!robotsTxtContent.toLowerCase().includes('sitemap:')) {
          robotsTxtContent += `\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
        } else {
          robotsTxtContent += '\n';
        }
      }
    }
  } catch (err) {
    console.warn('Could not fetch settings for robots.txt, using default:', err.message);
  }

  const publicRobotsPath = resolve(__dirname, '../public/robots.txt');
  const distRobotsPath = resolve(distDir, 'robots.txt');

  writeFileSync(publicRobotsPath, robotsTxtContent, 'utf-8');
  console.log(`✅ robots.txt generated → ${publicRobotsPath}`);

  if (existsSync(distDir)) {
    writeFileSync(distRobotsPath, robotsTxtContent, 'utf-8');
    console.log(`✅ robots.txt synced → ${distRobotsPath}`);
  }

  // Sync root vercel.json to dist/vercel.json
  const rootVercelPath = resolve(__dirname, '../vercel.json');
  const distVercelPath = resolve(distDir, 'vercel.json');
  if (existsSync(rootVercelPath)) {
    const vercelConfig = readFileSync(rootVercelPath, 'utf-8');
    if (existsSync(distDir)) {
      writeFileSync(distVercelPath, vercelConfig, 'utf-8');
      console.log(`✅ vercel.json synced to dist → ${distVercelPath}`);
    }
  }
}

generate();
