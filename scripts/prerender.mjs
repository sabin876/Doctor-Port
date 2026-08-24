/**
 * prerender.mjs
 * ---------------------
 * Runs after `vite build` to crawl the generated sitemap and replace empty
 * index.html with fully rendered HTML for SEO using Puppeteer.
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
    const API_BASE_URL = (process.env.VITE_API_BASE_URL || 'https://api.drulhasorthopedic.com/api').replace(/\/+$/, "");
    
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
        fetch(`${API_BASE_URL}/second-opinions/`).catch(() => null)
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
          gallery = rawG.map(item => {
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
              span: item.span || 'col-span-1 row-span-1'
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
  </script>
`;
    
    if (indexHtml.includes('</head>')) {
      indexHtml = indexHtml.replace('</head>', `${inlineScript}\n</head>`);
    } else {
      indexHtml = inlineScript + indexHtml;
    }
    
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('✅ Injected initial-data script into dist/index.html');

    // 2. Read the sitemap to know which routes to crawl
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
      throw new Error('sitemap.xml not found in dist/. Please ensure generate-sitemap runs before prerender.');
    }
    
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Extract paths from <loc> tags
    const locRegex = /<loc>(.*?)<\/loc>/g;
    let match;
    const routes = [];
    
    while ((match = locRegex.exec(sitemapContent)) !== null) {
      const fullUrl = match[1];
      // Extract just the pathname (e.g., https://drulhasorthopedic.com/about -> /about)
      try {
        const urlObj = new URL(fullUrl);
        routes.push(urlObj.pathname);
      } catch (e) {
        // If it fails to parse as URL, just push the string directly if it starts with /
        if (fullUrl.startsWith('/')) routes.push(fullUrl);
      }
    }
    
    console.log(`Found ${routes.length} routes to pre-render.`);
    
    // 2. Launch headless browser
    browser = await puppeteer.launch({ 
      headless: 'new',
      channel: 'chrome' // Use system Chrome to avoid cache path issues on Windows
    });
    const page = await browser.newPage();
    
    // 3. Crawl each route
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`Rendering: ${route}...`);
      
      // Wait for DOM content to load and then wait a short time for React to hydrate/render
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const html = await page.evaluate(() => document.documentElement.outerHTML);
      
      // Calculate file path (e.g., /about -> dist/about/index.html)
      let outPath = path.join(DIST_DIR, route);
      if (!fs.existsSync(outPath)) {
        fs.mkdirSync(outPath, { recursive: true });
      }
      
      const filePath = path.join(outPath, 'index.html');
      
      // Inject standard doctype
      fs.writeFileSync(filePath, '<!DOCTYPE html>\n' + html);
      console.log(`✅ Saved ${route} -> ${filePath}`);
    }
    
    console.log('\n🎉 Pre-rendering complete!');
  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exitCode = 1;
  } finally {
    // 4. Shutdown browser and server
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.error('Error closing browser:', e);
      }
    }
    server.close();
  }
});
