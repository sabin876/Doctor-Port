/**
 * prerender.mjs
 * ---------------------
 * Runs after `vite build` and `vite build --ssr` to pre-render
 * 100% visible, fully populated HTML pages with dynamic SEO metadata
 * for all static and dynamic routes (services, blog posts, etc.).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolvePath('../.env') });

function resolvePath(p) {
  return path.resolve(__dirname, p);
}

const DIST_DIR = resolvePath('../dist');
const SSR_DIR = resolvePath('../dist-ssr');
const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, '');

function getAbsoluteImageUrl(imgUrl) {
  if (!imgUrl || typeof imgUrl !== 'string') return 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
  let u = imgUrl.trim();
  if (!u) return 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
  if (u.includes('localhost:8000') || u.includes('127.0.0.1:8000')) {
    u = u.replace(/http:\/\/(localhost|127\.0\.0\.1):8000/g, 'https://api.drulhasorthopedic.com');
  } else if (u.includes('localhost') || u.includes('127.0.0.1')) {
    u = u.replace(/http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/g, 'https://drulhasorthopedic.com');
  }
  if (u.startsWith('http://') || u.startsWith('https://')) {
    return u.replace('http://', 'https://');
  }
  if (u.startsWith('/media/') || u.startsWith('media/')) {
    const cleanMedia = u.startsWith('/') ? u : `/${u}`;
    return `https://api.drulhasorthopedic.com${cleanMedia}`;
  }
  const cleanPath = u.startsWith('/') ? u : `/${u}`;
  return `https://drulhasorthopedic.com${cleanPath}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function fetchFromApi(endpoint) {
  const urls = [
    `${API_BASE_URL}${endpoint}`,
    `http://127.0.0.1:8000/api${endpoint}`,
    `https://api.drulhasorthopedic.com/api${endpoint}`
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { signal: AbortSignal.timeout(6000) });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // try next
    }
  }
  return null;
}

async function prerender() {
  console.log('🚀 Starting React SSR Pre-rendering...');

  // 1. Locate entry-server.js
  let render = null;
  const jsDir = path.join(SSR_DIR, 'assets/js');
  if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir);
    const entryFile = files.find(f => f.startsWith('entry-server') && f.endsWith('.js'));
    if (entryFile) {
      const fileUrl = pathToFileURL(path.join(jsDir, entryFile)).href;
      const mod = await import(fileUrl);
      render = mod.render;
    }
  }
  if (!render && fs.existsSync(path.join(SSR_DIR, 'entry-server.js'))) {
    const fileUrl = pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href;
    const mod = await import(fileUrl);
    render = mod.render;
  }

  if (!render) {
    throw new Error(`Could not find compiled entry-server in ${SSR_DIR}. Ensure 'vite build --ssr' ran first.`);
  }

  // 2. Fetch all shared datasets
  console.log('Fetching shared datasets from API...');
  const [servicesData, articlesData, settingsData, tEn, tHi, tAr, galleryData, heroVideoData, soData] = await Promise.all([
    fetchFromApi('/services/'),
    fetchFromApi('/articles/'),
    fetchFromApi('/settings/'),
    fetchFromApi('/translations/?lang=EN'),
    fetchFromApi('/translations/?lang=HI'),
    fetchFromApi('/translations/?lang=AR'),
    fetchFromApi('/gallery/'),
    fetchFromApi('/hero-video/'),
    fetchFromApi('/second-opinions/')
  ]);

  const services = Array.isArray(servicesData) ? servicesData : [];
  const articles = Array.isArray(articlesData) ? articlesData : [];
  const settings = settingsData || {};
  const translations = {
    EN: tEn || {},
    HI: tHi || {},
    AR: tAr || {}
  };
  const gallery = Array.isArray(galleryData) ? galleryData : [];
  const heroVideo = heroVideoData || {};
  const secondOpinions = Array.isArray(soData) ? soData : [];

  console.log(`✅ Loaded ${services.length} services and ${articles.length} articles.`);

  // 3. Read template HTML
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found! Ensure 'vite build' ran before prerendering.`);
  }
  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

  // 4. Collect all routes to prerender
  const routes = [
    '/',
    '/about',
    '/contact',
    '/gallery',
    '/faq',
    '/services',
    '/blog'
  ];

  for (const s of services) {
    if (s.slug) {
      routes.push(`/services/${s.slug}`);
      if (Array.isArray(s.sub_services)) {
        for (const sub of s.sub_services) {
          if (sub.slug) {
            routes.push(`/services/${s.slug}/${sub.slug}`);
          }
        }
      }
    }
  }

  for (const a of articles) {
    if (a.slug) {
      routes.push(`/blog/${a.slug}`);
    }
  }

  console.log(`Pre-rendering ${routes.length} total routes...`);

  // 5. Render each route
  let successCount = 0;
  for (const route of routes) {
    try {
      // Find route data
      let routeData = null;
      if (route.startsWith('/blog/')) {
        const slug = route.split('/')[2];
        routeData = articles.find(a => a.slug?.toLowerCase() === slug?.toLowerCase()) || null;
      } else if (route.startsWith('/services/')) {
        const parts = route.split('/').filter(Boolean);
        if (parts.length === 2) {
          const slug = parts[1];
          routeData = services.find(s => s.slug?.toLowerCase() === slug?.toLowerCase()) || null;
        } else if (parts.length === 3) {
          const parentSlug = parts[1];
          const subSlug = parts[2];
          const parent = services.find(s => s.slug?.toLowerCase() === parentSlug?.toLowerCase());
          if (parent && Array.isArray(parent.sub_services)) {
            const sub = parent.sub_services.find(sb => sb.slug?.toLowerCase() === subSlug?.toLowerCase());
            if (sub) {
              routeData = { ...parent, subService: sub };
            }
          }
        }
      }

      const initialData = {
        services,
        articles,
        settings,
        translations,
        gallery,
        heroVideo,
        secondOpinions,
        routeData
      };

      // Call React SSR render
      const renderResult = render(route, initialData);
      const appHtml = renderResult?.html || '';
      const helmet = renderResult?.helmet || null;

      // Metadata calculations
      const cleanPath = route === '/' ? '' : route.replace(/\/+$/, '');
      const canonicalUrl = `https://drulhasorthopedic.com${cleanPath || '/'}`;
      const pageUrl = `https://drulhasorthopedic.com${cleanPath}`;

      let routeTitle = 'Dr. Ulhas Sonar | Orthopaedic Surgeon Dubai';
      let routeDescription = 'Expert orthopedic care specializing in joint replacement, sports injuries, and comprehensive rehabilitation with Dr. Ulhas Sonar in Dubai.';
      let routeOgImage = 'https://drulhasorthopedic.com/assets/images/doctor-hero.webp';
      let routeOgType = 'website';
      let ogTitle = routeTitle;
      let ogDesc = routeDescription;

      if (route.startsWith('/blog/') && routeData) {
        routeTitle = routeData.meta_title || (routeData.title ? `${routeData.title} | Dr. Ulhas Sonar` : 'Orthopedic Blog Article | Dr. Ulhas Sonar');
        routeDescription = routeData.meta_description || routeData.excerpt || routeData.title || routeDescription;
        ogTitle = routeData.og_title || routeTitle;
        ogDesc = routeData.og_description || routeDescription;
        routeOgImage = getAbsoluteImageUrl(routeData.og_image || routeData.image || routeData.featured_image);
        routeOgType = 'article';
      } else if (route === '/blog') {
        routeTitle = 'Orthopedic Articles & Insights | Dr. Ulhas Sonar';
        routeDescription = 'Read the latest articles on orthopedic conditions, treatments, and recovery from Dr. Ulhas Sonar.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
        routeOgImage = 'https://drulhasorthopedic.com/assets/images/doctor-surgery.webp';
        routeOgType = 'website';
      } else if (route.startsWith('/services/') && routeData) {
        const srv = routeData.subService || routeData;
        routeTitle = srv.meta_title || (srv.title ? `${srv.title} | Dr. Ulhas Sonar` : 'Orthopedic Service | Dr. Ulhas Sonar');
        routeDescription = srv.meta_description || srv.description || routeDescription;
        ogTitle = srv.og_title || routeTitle;
        ogDesc = srv.og_description || routeDescription;
        routeOgImage = getAbsoluteImageUrl(srv.og_image || srv.image);
        routeOgType = 'website';
      } else if (route === '/services') {
        routeTitle = 'Orthopedic Services & Procedures | Dr. Ulhas Sonar';
        routeDescription = 'Comprehensive orthopedic services including robotic knee replacement, hip surgery, and sports medicine by Dr. Ulhas Sonar.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      } else if (route === '/about') {
        routeTitle = 'About Dr. Ulhas Sonar | Orthopedic Surgeon Dubai';
        routeDescription = 'Learn more about Dr. Ulhas Sonar, a leading orthopedic surgeon specializing in robotic joint replacement and sports injuries.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      } else if (route === '/contact') {
        routeTitle = 'Contact Dr. Ulhas Sonar | Book Appointment in Dubai';
        routeDescription = 'Book an appointment with Dr. Ulhas Sonar at Canadian Specialist Hospital in Dubai.';
        ogTitle = routeTitle;
        ogDesc = routeDescription;
      }

      // Clean template
      let html = baseTemplate
        .replace(/<title[^>]*>.*?<\/title>/gi, '')
        .replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']keywords["'][^>]*>/gi, '')
        .replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi, '')
        .replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi, '');

      // Build primary meta tags
      const primaryMetaTags = `
    <!-- Primary Page SEO Metadata -->
    <title>${escapeHtml(routeTitle)}</title>
    <meta name="description" content="${escapeHtml(routeDescription)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph / Social Media Tags -->
    <meta property="og:type" content="${routeOgType}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDesc)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${routeOgImage}" />
    <meta property="og:image:secure_url" content="${routeOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Dr. Ulhas Sonar | Orthopaedic Surgeon Dubai" />

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDesc)}" />
    <meta name="twitter:image" content="${routeOgImage}" />
`;

      const inlineDataScript = `<script id="initial-data">
        window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        window.__INITIAL_SERVICES__ = ${JSON.stringify(services)};
        window.__INITIAL_ARTICLES__ = ${JSON.stringify(articles)};
        window.__INITIAL_SETTINGS__ = ${JSON.stringify(settings)};
        window.__INITIAL_TRANSLATIONS__ = ${JSON.stringify(translations)};
        window.__INITIAL_GALLERY__ = ${JSON.stringify(gallery)};
        window.__INITIAL_HERO_VIDEO__ = ${JSON.stringify(heroVideo)};
        window.__INITIAL_SECOND_OPINIONS__ = ${JSON.stringify(secondOpinions)};
      </script>`;

      let helmetHead = '';
      if (helmet && helmet.script) {
        helmetHead = helmet.script.toString() + '\n';
      }

      const headInjections = `${inlineDataScript}\n${primaryMetaTags}\n${helmetHead}`;
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${headInjections}\n</head>`);
      } else {
        html = headInjections + html;
      }
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // Write out target HTML file
      const cleanRoute = route.replace(/^\/+|\/+$/g, '');
      let outDir = DIST_DIR;
      if (cleanRoute.length > 0) {
        outDir = path.join(DIST_DIR, cleanRoute);
      }
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const filePath = path.join(outDir, 'index.html');
      fs.writeFileSync(filePath, '<!DOCTYPE html>\n' + html, 'utf-8');
      console.log(`✅ Pre-rendered: ${route} -> ${filePath}`);
      successCount++;
    } catch (routeErr) {
      console.error(`❌ Error pre-rendering ${route}:`, routeErr);
    }
  }

  // Cleanup temporary dist-ssr directory
  try {
    if (fs.existsSync(SSR_DIR)) {
      fs.rmSync(SSR_DIR, { recursive: true, force: true });
    }
  } catch (e) {}

  console.log(`\n🎉 Pre-rendering complete! ${successCount}/${routes.length} pages pre-rendered to static HTML.`);
}

prerender().catch(err => {
  console.error('Fatal pre-rendering error:', err);
  process.exit(1);
});
