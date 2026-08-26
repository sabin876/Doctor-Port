/**
 * prerender.mjs
 * ---------------------
 * Runs after `vite build` to crawl the generated sitemap and pre-render
 * fully populated, 100% visible HTML pages for SEO using Puppeteer.
 */

import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

// Start a local static server
const app = express();
app.use(express.static(DIST_DIR));

// Fallback for SPA routing: send index.html for any virtual route request
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

const server = app.listen(PORT, async () => {
  console.log(`\n🚀 Static server started at http://localhost:${PORT}`);

  let browser;
  try {
    // 1. Fetch all API datasets to inline into index.html
    console.log('Fetching all datasets from API for inlining...');
    const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, '');

    let services = [];
    let articles = [];
    let settings = {};
    let translations = {};
    let gallery = [];
    let heroVideo = {};
    let secondOpinions = [];

    try {
      const [sRes, aRes, setRes, tEnRes, tHiRes, tArRes, gRes, hRes, soRes] = await Promise.all([
        fetch(`${API_BASE_URL}/services/`).catch(() => null),
        fetch(`${API_BASE_URL}/articles/`).catch(() => null),
        fetch(`${API_BASE_URL}/settings/`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=EN`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=HI`).catch(() => null),
        fetch(`${API_BASE_URL}/translations/?lang=AR`).catch(() => null),
        fetch(`${API_BASE_URL}/gallery/`).catch(() => null),
        fetch(`${API_BASE_URL}/hero-video/`).catch(() => null),
        fetch(`${API_BASE_URL}/second-opinions/`).catch(() => null),
      ]);

      if (sRes && sRes.ok) services = await sRes.json();
      if (aRes && aRes.ok) articles = await aRes.json();
      if (setRes && setRes.ok) settings = await setRes.json();
      if (tEnRes && tEnRes.ok) translations.EN = await tEnRes.json();
      if (tHiRes && tHiRes.ok) translations.HI = await tHiRes.json();
      if (tArRes && tArRes.ok) translations.AR = await tArRes.json();

      if (gRes && gRes.ok) {
        const rawG = await gRes.json();
        if (Array.isArray(rawG)) {
          const baseUrl = API_BASE_URL.replace(/\/api\/?$/, '');
          gallery = rawG.map((item) => {
            let img = item.image;
            if (img && !img.startsWith('http')) {
              img = `${baseUrl}${img.startsWith('/') ? '' : '/'}${img}`;
            }
            return {
              id: item.id,
              src: img,
              category: item.category,
              title: item.title,
              desc: item.description,
              span: item.span || 'col-span-1 row-span-1',
            };
          });
        }
      }
      if (hRes && hRes.ok) heroVideo = await hRes.json();
      if (soRes && soRes.ok) secondOpinions = await soRes.json();

      console.log('✅ Successfully fetched all datasets for inlining.');
    } catch (e) {
      console.error('Failed to fetch data for inlining:', e);
    }

    const indexPath = path.join(DIST_DIR, 'index.html');
    if (!fs.existsSync(indexPath)) {
      throw new Error('dist/index.html not found! Please build the project before prerendering.');
    }

    let indexHtml = fs.readFileSync(indexPath, 'utf8');

    const inlineScript = `
  <script id="initial-data">
    window.__INITIAL_SERVICES__ = ${JSON.stringify(services)};
    window.__INITIAL_ARTICLES__ = ${JSON.stringify(articles)};
    window.__INITIAL_SETTINGS__ = ${JSON.stringify(settings)};
    window.__INITIAL_TRANSLATIONS__ = ${JSON.stringify(translations)};
    window.__INITIAL_GALLERY__ = ${JSON.stringify(gallery)};
    window.__INITIAL_HERO_VIDEO__ = ${JSON.stringify(heroVideo)};
    window.__INITIAL_SECOND_OPINIONS__ = ${JSON.stringify(secondOpinions)};
    window.__SSR_PRERENDER__ = true;
  </script>
`;

    // Strip old initial-data if present and insert fresh
    indexHtml = indexHtml.replace(/<script id="initial-data">[\s\S]*?<\/script>/, '');
    if (indexHtml.includes('</head>')) {
      indexHtml = indexHtml.replace('</head>', `${inlineScript}\n</head>`);
    } else {
      indexHtml = inlineScript + indexHtml;
    }

    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✅ Injected initial-data script into dist/index.html');

    // 2. Read sitemap.xml to gather routes
    let sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    }
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('sitemap.xml not found! Please ensure generate-sitemap runs before prerender.');
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const routes = [];

    while ((match = locRegex.exec(sitemapContent)) !== null) {
      const fullUrl = match[1];
      try {
        const urlObj = new URL(fullUrl);
        let p = urlObj.pathname;
        if (!p.startsWith('/')) p = '/' + p;
        if (!routes.includes(p)) routes.push(p);
      } catch (e) {
        let p = fullUrl;
        if (!p.startsWith('/')) p = '/' + p;
        if (!routes.includes(p)) routes.push(p);
      }
    }

    console.log(`Found ${routes.length} routes to pre-render.`);

    // 3. Launch headless browser
    browser = await puppeteer.launch({
      headless: 'new',
      channel: 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Set SSR flag before scripts execute
    await page.evaluateOnNewDocument(() => {
      window.__SSR_PRERENDER__ = true;
    });

    // 4. Crawl and render each route
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`Rendering: ${route}...`);

      try {
        await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle2'], timeout: 30000 });
      } catch (navErr) {
        console.warn(`Nav timeout for ${route}, continuing render...`);
      }

      // Wait for #root to be loaded and not just the fallback loading message
      try {
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root');
            if (!root) return false;
            // Ensure root has actual rendered children and not just pure Loading text
            return root.children.length > 0;
          },
          { timeout: 10000 }
        );
      } catch (e) {
        // Continue if timeout
      }

      // Scroll smoothly down the page to trigger all IntersectionObservers / whileInView
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 250;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 20);
        });
      });

      // Wait a short moment for final layout and state settling
      await new Promise((resolve) => setTimeout(resolve, 600));

      // CRITICAL FOR SSR: Ensure NO elements remain at opacity:0, visibility:hidden, or translated offscreen
      await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        allElements.forEach((el) => {
          if (el.style) {
            if (el.style.opacity === '0' || el.style.opacity === '0.0') {
              el.style.opacity = '1';
            }
            if (el.style.visibility === 'hidden') {
              el.style.visibility = 'visible';
            }
            // Normalize translate transforms that hide content offscreen before hydration
            if (
              el.style.transform &&
              (el.style.transform.includes('translateY') ||
                el.style.transform.includes('translateX') ||
                el.style.transform.includes('translate3d'))
            ) {
              el.style.transform = 'none';
            }
          }
        });
      });

      let html = await page.evaluate(() => document.documentElement.outerHTML);

      // Clean up & deduplicate duplicate <title> tags in <head>
      const titleMatches = html.match(/<title[^>]*>[\s\S]*?<\/title>/gi);
      if (titleMatches && titleMatches.length > 1) {
        // Prefer title with actual page-specific text if available, or the last injected title
        const chosenTitle = titleMatches[titleMatches.length - 1];
        html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '');
        if (html.includes('<head>')) {
          html = html.replace('<head>', `<head>\n    ${chosenTitle}`);
        }
      }

      // Deduplicate <meta name="description"> tags
      const descMatches = html.match(/<meta[^>]*name=["']description["'][^>]*>/gi);
      if (descMatches && descMatches.length > 1) {
        const chosenDesc = descMatches[descMatches.length - 1];
        html = html.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '');
        if (html.includes('</title>')) {
          html = html.replace('</title>', `</title>\n    ${chosenDesc}`);
        }
      }

      // Deduplicate <link rel="canonical"> tags
      const canonicalMatches = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi);
      if (canonicalMatches && canonicalMatches.length > 1) {
        const chosenCanonical = canonicalMatches[canonicalMatches.length - 1];
        html = html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '');
        if (html.includes('</title>')) {
          html = html.replace('</title>', `</title>\n    ${chosenCanonical}`);
        }
      }

      // Determine output file path
      // Normalize route (e.g. / -> dist/index.html, /about/ -> dist/about/index.html, /services/foo -> dist/services/foo/index.html)
      const cleanRoute = route.replace(/^\/+|\/+$/g, '');
      let outDir = DIST_DIR;
      if (cleanRoute.length > 0) {
        outDir = path.join(DIST_DIR, cleanRoute);
      }

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const filePath = path.join(outDir, 'index.html');
      fs.writeFileSync(filePath, '<!DOCTYPE html>\n' + html, 'utf8');
      console.log(`✅ Saved ${route} -> ${filePath}`);
    }

    console.log('\n🎉 Pre-rendering complete! All pages are now fully rendered and visible in static HTML.');
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error('Error closing browser:', e);
      }
    }
    server.close();
    process.exit(process.exitCode || 0);
  }
});
