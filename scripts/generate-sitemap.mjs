/**
 * generate-sitemap.mjs
 * ---------------------
 * Run after build or during dev to auto-generate /public/sitemap.xml
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = 'https://orthopedic-specialist.com';
const TODAY    = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// ─── STATIC / CORE PAGES ────────────────────────────────────────────────────
const staticPages = [
  { path: '/',        changefreq: 'weekly',  priority: '1.0' },
  { path: '/about',   changefreq: 'monthly', priority: '0.9' },
  { path: '/services',changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/articles',changefreq: 'weekly',  priority: '0.8' },
  { path: '/gallery', changefreq: 'monthly', priority: '0.6' },
];

// ─── SERVICES ────────────────────────────────────────
const servicesList = [
  { slug: 'joint-pain-treatment', name: 'Total/Partial Joint Replacement' },
  { slug: 'sports-medicine', name: 'Sports / ACL Injury Management' },
  { slug: 'robotic-surgery', name: 'Robotic / Computer Assisted Surgery' },
  { slug: 'arthroscopy', name: 'Knee and Shoulder Arthroscopy' },
  { slug: 'deformity-correction', name: 'Deformity Corrections / Osteotomies' },
  { slug: 'consultation', name: 'Joint Preservation / Regeneration' },
  { slug: 'orthopedic-trauma', name: 'Fractures and Trauma Care' },
  { slug: 'physiotherapy-home-services', name: 'Physiotherapy and Rehabilitation' },
  { slug: 'knee-surgery', name: 'Knee Surgery' },
  { slug: 'hip-surgery', name: 'Hip Surgery' },
  { slug: 'shoulder-surgery', name: 'Shoulder Surgery' }
];

const servicePages = servicesList.map((service) => ({
  path: `/services/${service.slug}`,
  changefreq: 'monthly',
  priority: '0.85',
  comment: service.name,
}));

// ─── ARTICLES / BLOG ─────────────────────────────────────────────────────────
// Priority order: pillar page first (highest authority), then supporting articles
const articlePages = [
  { slug: 'knee-pain-pillar',          priority: '0.9',  title: 'Knee Pain in Professionals: The Ultimate Specialist Guide' },
  { slug: 'causes-of-knee-pain',       priority: '0.75', title: 'Understanding Common Causes of Knee Pain' },
  { slug: 'knee-pain-gym-sports',      priority: '0.75', title: 'Knee Pain After Gym or Sports in Working Professionals' },
  { slug: 'when-to-get-mri-knee',      priority: '0.75', title: 'When Knee Pain Needs a Scan: MRI, X-rays and Decision-Making' },
  { slug: 'continuing-sports-risks',   priority: '0.75', title: 'Continuing Sports with Knee Pain: Risks and Mistakes' },
  { slug: 'anterior-knee-pain-office', priority: '0.7',  title: 'Anterior Knee Pain (Patellofemoral Pain) in Office Workers' },
  { slug: 'meniscus-tear-vs-strain',   priority: '0.7',  title: 'Meniscus Tear vs. Muscle Strain – How to Tell them Apart' },
  { slug: 'knee-pain-exercises-desk',  priority: '0.7',  title: 'Best Exercises for Knee Pain (Desk Professionals)' },
  { slug: 'knee-pain-travel-flights',  priority: '0.7',  title: 'Managing Knee Pain During Travel and Long Flights' },
].map(a => ({
  path: `/blog/${a.slug}`,
  changefreq: 'monthly',
  priority: a.priority,
  comment: a.title,
}));

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
